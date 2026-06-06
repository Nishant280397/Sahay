import { create } from 'zustand';
import { db } from '../services/db.service';
import type { UserProfile } from '../types/user.types';
import type { ExamType } from '../types/user.types';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: (name: string, exam: ExamType, attempt: number) => Promise<void>;
  resetProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: true,

  loadProfile: async () => {
    try {
      const profile = await db.userProfile.get(1);
      set({ profile: profile || null, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates) => {
    const current = get().profile;
    if (!current) return;
    const updated = { ...current, ...updates };
    await db.userProfile.put(updated);
    set({ profile: updated });
  },

  completeOnboarding: async (name, exam, attempt) => {
    const profile: UserProfile = {
      id: 1,
      name,
      targetExam: exam,
      attemptNumber: attempt,
      languagePreference: 'en',
      theme: 'light',
      onboardingComplete: true,
      notificationsEnabled: false,
      createdAt: new Date().toISOString(),
      spiritualQuotesEnabled: true,
    };
    await db.userProfile.put(profile);
    set({ profile });
  },

  resetProfile: async () => {
    await db.userProfile.delete(1);
    await db.moodEntries.clear();
    await db.journalEntries.clear();
    await db.breathingSessions.clear();
    await db.streakData.delete(1);
    set({ profile: null });
    window.location.reload();
  },
}));

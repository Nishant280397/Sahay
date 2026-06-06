import Dexie, { type Table } from 'dexie';
import type { MoodEntry } from '../types/mood.types';
import type { JournalEntry } from '../types/journal.types';
import type { UserProfile, StreakData } from '../types/user.types';
import type { BreathingSession, StudySession } from '../types/ai.types';

export class SahayDB extends Dexie {
  userProfile!: Table<UserProfile>;
  moodEntries!: Table<MoodEntry>;
  journalEntries!: Table<JournalEntry>;
  breathingSessions!: Table<BreathingSession>;
  studySessions!: Table<StudySession>;
  streakData!: Table<StreakData>;

  constructor() {
    super('SahayDB');
    this.version(1).stores({
      userProfile: 'id',
      moodEntries: '++id, date, moodScore, *triggers',
      journalEntries: '++id, date, *tags',
      breathingSessions: '++id, date, technique',
      studySessions: '++id, date',
      streakData: 'id',
    });
  }
}

export const db = new SahayDB();

/** Initialize default data if first launch */
export async function initializeDB(): Promise<void> {
  const profile = await db.userProfile.get(1);
  if (!profile) {
    await db.userProfile.put({
      id: 1,
      name: '',
      targetExam: 'OTHER',
      attemptNumber: 1,
      languagePreference: 'en',
      theme: 'light',
      onboardingComplete: false,
      notificationsEnabled: false,
      createdAt: new Date().toISOString(),
      spiritualQuotesEnabled: true,
    });
  }

  const streak = await db.streakData.get(1);
  if (!streak) {
    await db.streakData.put({
      id: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastCheckInDate: '',
      totalCheckIns: 0,
    });
  }
}

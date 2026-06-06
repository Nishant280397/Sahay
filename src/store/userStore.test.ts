import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUserStore } from './userStore';

// Mock the db service so we don't actually hit IndexedDB in tests
vi.mock('../services/db.service', () => ({
  db: {
    userProfile: {
      get: vi.fn().mockResolvedValue(null),
      put: vi.fn().mockResolvedValue(1),
      delete: vi.fn().mockResolvedValue(undefined),
    },
    moodEntries: { clear: vi.fn() },
    journalEntries: { clear: vi.fn() },
    breathingSessions: { clear: vi.fn() },
    streakData: { delete: vi.fn() },
  },
}));

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.setState({ profile: null, isLoading: true });
    vi.clearAllMocks();
  });

  it('initializes correctly', () => {
    const state = useUserStore.getState();
    expect(state.profile).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it('completes onboarding correctly', async () => {
    await useUserStore.getState().completeOnboarding('Nishant', 'UPSC', 1);
    const state = useUserStore.getState();
    expect(state.profile).not.toBeNull();
    expect(state.profile?.name).toBe('Nishant');
    expect(state.profile?.targetExam).toBe('UPSC');
    expect(state.profile?.onboardingComplete).toBe(true);
  });

  it('updates profile correctly', async () => {
    await useUserStore.getState().completeOnboarding('Nishant', 'UPSC', 1);
    await useUserStore.getState().updateProfile({ languagePreference: 'hi' });
    const state = useUserStore.getState();
    expect(state.profile?.languagePreference).toBe('hi');
  });
});

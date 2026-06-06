import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMoodStore } from './moodStore';

// Mock DB
vi.mock('../services/db.service', () => ({
  db: {
    moodEntries: {
      toArray: vi.fn().mockResolvedValue([]),
      orderBy: vi.fn().mockReturnThis(),
      reverse: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      equals: vi.fn().mockReturnThis(),
      first: vi.fn().mockResolvedValue(null),
      add: vi.fn().mockResolvedValue(1),
      put: vi.fn().mockResolvedValue(1),
    },
    streakData: {
      get: vi.fn().mockResolvedValue({ lastCheckInDate: '', currentStreak: 0, longestStreak: 0, totalCheckIns: 0 }),
      put: vi.fn().mockResolvedValue(1),
    },
  },
}));

describe('moodStore', () => {
  beforeEach(() => {
    useMoodStore.setState({ entries: [], todayEntry: null, isLoading: false });
    vi.clearAllMocks();
  });

  it('adds entry correctly', async () => {
    await useMoodStore.getState().addEntry(4, ['study'] as any, ['headache'] as any, 'Felt okay');
    const state = useMoodStore.getState();
    expect(state.todayEntry).toBeDefined();
    expect(state.todayEntry?.moodScore).toBe(4);
    expect(state.todayEntry?.triggerNotes).toBe('Felt okay');
  });

  it('calculates consecutive low days', () => {
    useMoodStore.setState({
      entries: [
        { id: 1, date: '2023-10-02', timestamp: '', moodScore: 2, moodLabel: '', triggers: [], physicalSymptoms: [] },
        { id: 2, date: '2023-10-01', timestamp: '', moodScore: 1, moodLabel: '', triggers: [], physicalSymptoms: [] },
        { id: 3, date: '2023-09-30', timestamp: '', moodScore: 4, moodLabel: '', triggers: [], physicalSymptoms: [] },
      ]
    });
    const lowDays = useMoodStore.getState().getConsecutiveLowDays();
    expect(lowDays).toBe(2);
  });
});

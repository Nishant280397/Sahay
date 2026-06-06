import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useJournalStore } from './journalStore';

vi.mock('../services/db.service', () => ({
  db: {
    journalEntries: {
      toArray: vi.fn().mockResolvedValue([]),
      orderBy: vi.fn().mockReturnThis(),
      reverse: vi.fn().mockReturnThis(),
      add: vi.fn().mockResolvedValue(1),
      delete: vi.fn().mockResolvedValue(undefined),
    },
  },
}));

describe('journalStore', () => {
  beforeEach(() => {
    useJournalStore.setState({ entries: [], isLoading: false });
    vi.clearAllMocks();
  });

  it('adds an entry and calculates word count', async () => {
    const entry = await useJournalStore.getState().addEntry('Hello this is a test journal entry.');
    expect(entry).toBeDefined();
    expect(entry.content).toBe('Hello this is a test journal entry.');
    expect(entry.wordCount).toBe(7);
  });
});

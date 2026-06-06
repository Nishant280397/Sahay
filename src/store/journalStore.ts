import { create } from 'zustand';
import { db } from '../services/db.service';
import type { JournalEntry } from '../types/journal.types';

interface JournalState {
  entries: JournalEntry[];
  isLoading: boolean;
  loadEntries: () => Promise<void>;
  addEntry: (content: string, promptUsed?: string, tags?: string[]) => Promise<JournalEntry>;
  deleteEntry: (id: number) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set) => ({
  entries: [],
  isLoading: true,

  loadEntries: async () => {
    try {
      const entries = await db.journalEntries.orderBy('date').reverse().toArray();
      set({ entries, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addEntry: async (content, promptUsed, tags = []) => {
    const entry: JournalEntry = {
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      content,
      promptUsed,
      tags,
      isPrivate: false,
      wordCount: content.trim().split(/\s+/).filter(Boolean).length,
    };

    const id = await db.journalEntries.add(entry);
    const savedEntry = { ...entry, id };
    const entries = await db.journalEntries.orderBy('date').reverse().toArray();
    set({ entries });
    return savedEntry;
  },

  deleteEntry: async (id) => {
    await db.journalEntries.delete(id);
    const entries = await db.journalEntries.orderBy('date').reverse().toArray();
    set({ entries });
  },
}));

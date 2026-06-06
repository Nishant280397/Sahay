import { create } from 'zustand';
import { db } from '../services/db.service';
import type { MoodEntry, MoodScore, TriggerCategory, PhysicalSymptom } from '../types/mood.types';
import { MOOD_SCALE } from '../constants/moods';

interface MoodState {
  entries: MoodEntry[];
  todayEntry: MoodEntry | null;
  isLoading: boolean;
  loadEntries: () => Promise<void>;
  addEntry: (score: MoodScore, triggers?: TriggerCategory[], symptoms?: PhysicalSymptom[], note?: string) => Promise<MoodEntry>;
  getRecentEntries: (days: number) => MoodEntry[];
  getConsecutiveLowDays: () => number;
}

function getTodayDateIST(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return ist.toISOString().split('T')[0];
}

export const useMoodStore = create<MoodState>((set, get) => ({
  entries: [],
  todayEntry: null,
  isLoading: true,

  loadEntries: async () => {
    try {
      const entries = await db.moodEntries.orderBy('date').reverse().toArray();
      const today = getTodayDateIST();
      const todayEntry = entries.find((e) => e.date === today) || null;
      set({ entries, todayEntry, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addEntry: async (score, triggers = [], symptoms = [], note) => {
    const today = getTodayDateIST();
    const mood = MOOD_SCALE.find((m) => m.score === score);
    
    const existing = await db.moodEntries.where('date').equals(today).first();
    if (existing) {
      const updated: MoodEntry = {
        ...existing,
        moodScore: score,
        moodLabel: mood?.en || '',
        triggers,
        physicalSymptoms: symptoms,
        triggerNotes: note,
        timestamp: new Date().toISOString(),
      };
      await db.moodEntries.put(updated);
      const entries = await db.moodEntries.orderBy('date').reverse().toArray();
      set({ entries, todayEntry: updated });
      return updated;
    }

    const entry: MoodEntry = {
      date: today,
      timestamp: new Date().toISOString(),
      moodScore: score,
      moodLabel: mood?.en || '',
      triggers,
      triggerNotes: note,
      physicalSymptoms: symptoms,
    };

    const id = await db.moodEntries.add(entry);
    const savedEntry = { ...entry, id };
    const entries = await db.moodEntries.orderBy('date').reverse().toArray();
    set({ entries, todayEntry: savedEntry });

    // Update streak
    const streakData = await db.streakData.get(1);
    if (streakData) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const isConsecutive = streakData.lastCheckInDate === yesterdayStr || streakData.lastCheckInDate === '';
      const newStreak = isConsecutive ? streakData.currentStreak + 1 : 1;
      
      await db.streakData.put({
        id: 1,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streakData.longestStreak),
        lastCheckInDate: today,
        totalCheckIns: streakData.totalCheckIns + 1,
      });
    }

    return savedEntry;
  },

  getRecentEntries: (days) => {
    const entries = get().entries;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    return entries.filter((e) => e.date >= cutoffStr);
  },

  getConsecutiveLowDays: () => {
    const entries = get().entries;
    let count = 0;
    for (const entry of entries) {
      if (entry.moodScore <= 2) count++;
      else break;
    }
    return count;
  },
}));

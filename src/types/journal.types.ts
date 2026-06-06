export interface JournalEntry {
  id?: number;
  date: string;
  timestamp: string;
  content: string;
  promptUsed?: string;
  moodEntryId?: number;
  tags: string[];
  isPrivate: boolean;
  wordCount: number;
}

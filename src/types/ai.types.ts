export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isCrisis?: boolean;
}

export interface AIContext {
  examType: string;
  moodScore: number;
  avgMoodLast7Days: number;
  triggers: string[];
  streak: number;
  weekBeforeExam: boolean;
  spiritualQuotesEnabled?: boolean;
}

export interface BreathingSession {
  id?: number;
  date: string;
  timestamp: string;
  technique: 'box' | '4-7-8' | 'anulom-vilom' | 'belly';
  durationSeconds: number;
  cyclesCompleted: number;
  moodBefore?: 1 | 2 | 3 | 4 | 5;
  moodAfter?: 1 | 2 | 3 | 4 | 5;
}

export interface StudySession {
  id?: number;
  date: string;
  timestamp: string;
  durationMinutes: number;
  breaksTaken: number;
  wellnessChecksDone: number;
}

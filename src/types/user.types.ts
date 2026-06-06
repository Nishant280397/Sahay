export type ExamType =
  | 'NEET'
  | 'JEE_MAIN'
  | 'JEE_ADVANCED'
  | 'CUET'
  | 'CAT'
  | 'GATE'
  | 'UPSC'
  | 'CBSE_BOARDS'
  | 'STATE_BOARDS'
  | 'OTHER';

export interface UserProfile {
  id: 1;
  name: string;
  targetExam: ExamType;
  attemptNumber: number;
  examDate?: string;
  languagePreference: 'en' | 'hi';
  theme: 'light' | 'dark';
  onboardingComplete: boolean;
  notificationsEnabled: boolean;
  reminderTime?: string;
  createdAt: string;
  spiritualQuotesEnabled: boolean;
}

export interface StreakData {
  id: 1;
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string;
  totalCheckIns: number;
}

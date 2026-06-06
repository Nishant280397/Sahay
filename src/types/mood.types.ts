export type MoodScore = 1 | 2 | 3 | 4 | 5;

export type TriggerCategory =
  | 'EXAM_PRESSURE'
  | 'FAMILY_PRESSURE'
  | 'PEER_COMPARISON'
  | 'STUDY_DIFFICULTY'
  | 'FINANCIAL_STRESS'
  | 'LONELINESS'
  | 'PHYSICAL_HEALTH'
  | 'SLEEP_ISSUES'
  | 'RESULT_ANXIETY'
  | 'COACHING_PRESSURE'
  | 'SELF_DOUBT'
  | 'TIME_MANAGEMENT'
  | 'PREVIOUS_FAILURE'
  | 'RELATIONSHIP'
  | 'OTHER';

export type PhysicalSymptom =
  | 'HEADACHE'
  | 'POOR_SLEEP'
  | 'APPETITE_CHANGE'
  | 'FATIGUE'
  | 'CHEST_TIGHTNESS'
  | 'RESTLESSNESS'
  | 'NONE';

export interface MoodEntry {
  id?: number;
  date: string;
  timestamp: string;
  moodScore: MoodScore;
  moodLabel: string;
  triggers: TriggerCategory[];
  triggerNotes?: string;
  physicalSymptoms: PhysicalSymptom[];
  morningMood?: boolean;
  weekBeforeExam?: boolean;
}

export interface MoodScaleItem {
  score: MoodScore;
  emoji: string;
  en: string;
  hi: string;
  color: string;
  bgColor: string;
  description_en: string;
  description_hi: string;
  crisisCheck: boolean;
}

export interface Insight {
  type: 'warning' | 'positive' | 'insight';
  message: string;
  action: string | null;
}

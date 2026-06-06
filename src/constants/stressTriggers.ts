import type { TriggerCategory } from '../types/mood.types';

export interface TriggerOption {
  value: TriggerCategory;
  label_en: string;
  label_hi: string;
  emoji: string;
}

export const STRESS_TRIGGERS: TriggerOption[] = [
  { value: 'EXAM_PRESSURE', label_en: 'Exam Pressure', label_hi: 'परीक्षा का दबाव', emoji: '📝' },
  { value: 'FAMILY_PRESSURE', label_en: 'Family Pressure', label_hi: 'परिवार का दबाव', emoji: '👨‍👩‍👦' },
  { value: 'PEER_COMPARISON', label_en: 'Peer Comparison', label_hi: 'दूसरों से तुलना', emoji: '👥' },
  { value: 'STUDY_DIFFICULTY', label_en: 'Study Difficulty', label_hi: 'पढ़ाई में कठिनाई', emoji: '📖' },
  { value: 'FINANCIAL_STRESS', label_en: 'Financial Stress', label_hi: 'आर्थिक तनाव', emoji: '💰' },
  { value: 'LONELINESS', label_en: 'Loneliness', label_hi: 'अकेलापन', emoji: '🏠' },
  { value: 'PHYSICAL_HEALTH', label_en: 'Physical Health', label_hi: 'शारीरिक स्वास्थ्य', emoji: '🤒' },
  { value: 'SLEEP_ISSUES', label_en: 'Sleep Issues', label_hi: 'नींद की समस्या', emoji: '😴' },
  { value: 'RESULT_ANXIETY', label_en: 'Result Anxiety', label_hi: 'रिज़ल्ट की चिंता', emoji: '📊' },
  { value: 'COACHING_PRESSURE', label_en: 'Coaching Pressure', label_hi: 'कोचिंग का दबाव', emoji: '🏫' },
  { value: 'SELF_DOUBT', label_en: 'Self Doubt', label_hi: 'आत्म-संदेह', emoji: '🤔' },
  { value: 'TIME_MANAGEMENT', label_en: 'Time Management', label_hi: 'समय प्रबंधन', emoji: '⏰' },
  { value: 'PREVIOUS_FAILURE', label_en: 'Previous Attempt', label_hi: 'पिछली बार का अनुभव', emoji: '🔄' },
  { value: 'RELATIONSHIP', label_en: 'Relationships', label_hi: 'रिश्ते', emoji: '❤️' },
  { value: 'OTHER', label_en: 'Something Else', label_hi: 'कुछ और', emoji: '💭' },
];

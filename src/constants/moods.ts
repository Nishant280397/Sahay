import type { MoodScaleItem } from '../types/mood.types';

export const MOOD_SCALE: MoodScaleItem[] = [
  {
    score: 1,
    emoji: '😰',
    en: 'Very Tough Day',
    hi: 'बहुत मुश्किल दिन',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    description_en: 'Feeling overwhelmed, hopeless, or very anxious',
    description_hi: 'बहुत थका हुआ, चिंतित या उम्मीद खो रहे हैं',
    crisisCheck: true,
  },
  {
    score: 2,
    emoji: '😔',
    en: 'Not Great',
    hi: 'थोड़ा मुश्किल',
    color: '#F97316',
    bgColor: '#FFF7ED',
    description_en: 'Struggling but managing',
    description_hi: 'थोड़ी तकलीफ है, पर संभाल रहे हैं',
    crisisCheck: false,
  },
  {
    score: 3,
    emoji: '😐',
    en: 'Okay',
    hi: 'ठीक-ठाक',
    color: '#EAB308',
    bgColor: '#FEFCE8',
    description_en: 'Neutral — neither good nor bad',
    description_hi: 'न बहुत अच्छा, न बहुत बुरा',
    crisisCheck: false,
  },
  {
    score: 4,
    emoji: '🙂',
    en: 'Pretty Good',
    hi: 'अच्छा लग रहा है',
    color: '#22C55E',
    bgColor: '#F0FDF4',
    description_en: 'Feeling positive and focused',
    description_hi: 'सकारात्मक और focused महसूस हो रहा है',
    crisisCheck: false,
  },
  {
    score: 5,
    emoji: '😊',
    en: 'Feeling Great!',
    hi: 'बहुत अच्छा!',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    description_en: 'Energized, motivated, confident',
    description_hi: 'ऊर्जावान, प्रेरित और आत्मविश्वासी',
    crisisCheck: false,
  },
];

export const getMoodByScore = (score: number): MoodScaleItem | undefined =>
  MOOD_SCALE.find((m) => m.score === score);

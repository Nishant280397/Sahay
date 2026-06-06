export interface BreathingPattern {
  id: 'box' | '4-7-8' | 'anulom-vilom';
  name_en: string;
  name_hi: string;
  description_en: string;
  description_hi: string;
  phases: BreathingPhase[];
  defaultCycles: number;
  icon: string;
  color: string;
}

export interface BreathingPhase {
  name: string;
  name_hi: string;
  duration: number;
  instruction_en: string;
  instruction_hi: string;
  scale: number;
}

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: '4-7-8',
    name_en: '4-7-8 Breathing',
    name_hi: '4-7-8 श्वास',
    description_en: 'Calming technique for stress relief and better sleep',
    description_hi: 'तनाव से राहत और बेहतर नींद के लिए',
    icon: '🌙',
    color: '#6366F1',
    defaultCycles: 4,
    phases: [
      { name: 'Inhale', name_hi: 'साँस लें', duration: 4, instruction_en: 'Breathe in slowly...', instruction_hi: 'धीरे से साँस लें...', scale: 1.4 },
      { name: 'Hold', name_hi: 'रोकें', duration: 7, instruction_en: 'Hold gently...', instruction_hi: 'धीरे से रोकें...', scale: 1.4 },
      { name: 'Exhale', name_hi: 'छोड़ें', duration: 8, instruction_en: 'Release slowly...', instruction_hi: 'धीरे से छोड़ें...', scale: 1.0 },
    ],
  },
  {
    id: 'box',
    name_en: 'Box Breathing',
    name_hi: 'बॉक्स ब्रीदिंग',
    description_en: 'Equal-ratio breathing used by Indian armed forces',
    description_hi: 'भारतीय सेना द्वारा उपयोग की जाने वाली तकनीक',
    icon: '🟦',
    color: '#0EA5E9',
    defaultCycles: 4,
    phases: [
      { name: 'Inhale', name_hi: 'साँस लें', duration: 4, instruction_en: 'Breathe in...', instruction_hi: 'साँस लें...', scale: 1.3 },
      { name: 'Hold', name_hi: 'रोकें', duration: 4, instruction_en: 'Hold...', instruction_hi: 'रोकें...', scale: 1.3 },
      { name: 'Exhale', name_hi: 'छोड़ें', duration: 4, instruction_en: 'Breathe out...', instruction_hi: 'छोड़ें...', scale: 1.0 },
      { name: 'Hold', name_hi: 'रोकें', duration: 4, instruction_en: 'Hold empty...', instruction_hi: 'खाली रोकें...', scale: 1.0 },
    ],
  },
  {
    id: 'anulom-vilom',
    name_en: 'Anulom-Vilom',
    name_hi: 'अनुलोम-विलोम',
    description_en: 'Traditional Indian pranayama — alternate nostril breathing',
    description_hi: 'पारंपरिक भारतीय प्राणायाम — नाड़ी शोधन',
    icon: '🧘',
    color: '#F59E0B',
    defaultCycles: 6,
    phases: [
      { name: 'Inhale Left', name_hi: 'बाएँ से लें', duration: 4, instruction_en: 'Inhale through left nostril...', instruction_hi: 'बाएँ नासिका से साँस लें...', scale: 1.3 },
      { name: 'Hold', name_hi: 'रोकें', duration: 4, instruction_en: 'Hold...', instruction_hi: 'रोकें...', scale: 1.3 },
      { name: 'Exhale Right', name_hi: 'दाएँ से छोड़ें', duration: 4, instruction_en: 'Exhale through right nostril...', instruction_hi: 'दाएँ नासिका से छोड़ें...', scale: 1.0 },
      { name: 'Inhale Right', name_hi: 'दाएँ से लें', duration: 4, instruction_en: 'Inhale through right nostril...', instruction_hi: 'दाएँ नासिका से साँस लें...', scale: 1.3 },
      { name: 'Hold', name_hi: 'रोकें', duration: 4, instruction_en: 'Hold...', instruction_hi: 'रोकें...', scale: 1.3 },
      { name: 'Exhale Left', name_hi: 'बाएँ से छोड़ें', duration: 4, instruction_en: 'Exhale through left nostril...', instruction_hi: 'बाएँ नासिका से छोड़ें...', scale: 1.0 },
    ],
  },
];

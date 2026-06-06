export interface WellnessTip {
  tip_en: string;
  tip_hi?: string;
  action: 'BREATHE' | 'JOURNAL' | 'STUDY_TIMER' | null;
}

export const WELLNESS_TIPS: Record<number, WellnessTip[]> = {
  1: [
    { tip_en: "Take 5 deep breaths right now. One breath at a time.", tip_hi: "Abhi 5 gehri saansein lo. Ek ek karke.", action: 'BREATHE' },
    { tip_en: "Drink a glass of water. Dehydration worsens anxiety.", tip_hi: "Ek glass paani piyo. Pani peena anxiety kam karta hai.", action: null },
    { tip_en: "You don't have to study for the next 10 minutes. Just rest.", tip_hi: "Agle 10 minute padhai mat karo. Bas aaraam karo.", action: null },
    { tip_en: "Step outside for 2 minutes. Fresh air helps.", tip_hi: "2 minute ke liye baahar jao. Taazi hawa acchi lagegi.", action: null },
  ],
  2: [
    { tip_en: "Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.", tip_hi: "5-4-3-2-1 grounding try karo.", action: null },
    { tip_en: "A 10-minute walk (even indoors) can shift your mood.", tip_hi: "10 minute ki walk karo, mood accha hoga.", action: null },
    { tip_en: "Write down what's bothering you. Even 3 lines help.", tip_hi: "Jo pareshan kar raha hai, likh do. 3 line bhi kaafi hai.", action: 'JOURNAL' },
  ],
  3: [
    { tip_en: "Good time to plan your next study session.", tip_hi: "Agle study session ki planning karo.", action: 'STUDY_TIMER' },
    { tip_en: "Write down one thing you're grateful for today.", tip_hi: "Aaj ki ek acchi cheez likho.", action: 'JOURNAL' },
    { tip_en: "A short breathing exercise can boost your focus.", tip_hi: "Breathing exercise focus badhata hai.", action: 'BREATHE' },
  ],
  4: [
    { tip_en: "Great energy! Tackle your hardest topic now.", tip_hi: "Badhiya energy hai! Sabse mushkil topic aaj karo.", action: 'STUDY_TIMER' },
    { tip_en: "Share this energy — message a friend who might need it.", tip_hi: "Ye energy share karo — kisi dost ko message karo.", action: null },
  ],
  5: [
    { tip_en: "Excellent! Anchor this feeling — note what made today good.", tip_hi: "Bahut accha! Likh lo kya accha raha aaj.", action: 'JOURNAL' },
    { tip_en: "Build on this momentum. Set one goal for tomorrow.", tip_hi: "Momentum banaye rakho. Kal ke liye ek goal set karo.", action: null },
    { tip_en: "You're doing great! Keep up the positive streak! 🔥", tip_hi: "Bahut acche chal rahe ho! Aise hi aage badho! 🔥", action: null },
  ],
};

export function getRandomTip(moodScore: number): WellnessTip {
  const tips = WELLNESS_TIPS[moodScore] || WELLNESS_TIPS[3];
  return tips[Math.floor(Math.random() * tips.length)];
}

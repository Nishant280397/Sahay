export const JOURNAL_PROMPTS = [
  // Exam-specific
  "Aaj ki padhai mein sabse mushkil kya laga? Kyun?",
  "Agar rank ki chinta na hoti, toh main aaj kya karta?",
  "Mere friend ko agar ye pressure hota, toh main usse kya kehta?",
  "NEET/JEE ke alawa meri zindagi mein kya important hai?",
  "Aaj kya naya seekha? Chhoti si cheez bhi count hoti hai.",
  // Emotional processing
  "Aaj jo hua, usme main kya control kar sakta tha? Kya nahi?",
  "Ek cheez jo mujhe aaj proud feel karayi...",
  "Main apne aap ko aaj kya advice dunga?",
  "Kal subah uthunga toh pehle kya karunga?",
  "Aaj ka sabse accha moment kya tha?",
  // Gratitude (Indian framing)
  "Teen cheezein jo aaj theek rahi...",
  "Kisi ne aaj meri madad ki — kaun aur kaise?",
  "Mera ek strength jo exam mein kaam aayegi...",
  "Aaj kis cheez ke liye dhanyavad (grateful) feel kar raha hoon?",
  // Bhagavad Gita inspired
  "Apne karm par dhyan do, fal ki chinta mat karo — aaj iska kya matlab tha?",
  "Kya main apni comparison khud se kar raha hoon, ya doosron se?",
  // Self-reflection
  "Agar 5 saal baad ka main aaj ka main dekhe, toh kya kahe?",
  "Meri sabse badi darr kya hai? Kya ye darr sach mein itna bada hai?",
  "Aaj main apne aap ko kaise reward karunga?",
  "Meri energy level aaj 1-10 mein kitni thi?",
];

export function getDailyPrompt(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return JOURNAL_PROMPTS[dayOfYear % JOURNAL_PROMPTS.length];
}

export function getRandomPrompts(count: number = 3): string[] {
  const shuffled = [...JOURNAL_PROMPTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

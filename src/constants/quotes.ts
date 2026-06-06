export interface Quote {
  text: string;
  author: string;
  category: 'MOTIVATION' | 'SPIRITUAL' | 'EXAM' | 'RESILIENCE';
  examRelevant: boolean;
  spiritual?: boolean;
  isHindi?: boolean;
}

export const QUOTES: Quote[] = [
  {
    text: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: 'MOTIVATION',
    examRelevant: true,
  },
  {
    text: "Karmanye vadhikaraste Ma Phaleshu Kadachana — Your right is to work, never to its fruits.",
    author: "Bhagavad Gita, Chapter 2:47",
    category: 'SPIRITUAL',
    examRelevant: true,
    spiritual: true,
  },
  {
    text: "Mehnat itni khamoshi se karo ki success khud shor macha de.",
    author: "Indian Wisdom",
    category: 'MOTIVATION',
    examRelevant: true,
    isHindi: true,
  },
  {
    text: "If you want to shine like a sun, first burn like a sun.",
    author: "Dr. A.P.J. Abdul Kalam",
    category: 'MOTIVATION',
    examRelevant: true,
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Ratan Tata",
    category: 'RESILIENCE',
    examRelevant: true,
  },
  {
    text: "Haar ke baad jeetne waale ko baazigar kehte hain.",
    author: "Indian Wisdom",
    category: 'MOTIVATION',
    examRelevant: true,
    isHindi: true,
  },
  {
    text: "You don't have to be perfect. You just have to keep trying.",
    author: "Kalpana Chawla",
    category: 'RESILIENCE',
    examRelevant: true,
  },
  {
    text: "Udne ka hosla rakhne waalon ka koi asmaan nahi hota.",
    author: "Indian Wisdom",
    category: 'MOTIVATION',
    examRelevant: true,
    isHindi: true,
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Sundar Pichai",
    category: 'MOTIVATION',
    examRelevant: true,
  },
  {
    text: "Yoga is the journey of the self, through the self, to the self.",
    author: "Bhagavad Gita",
    category: 'SPIRITUAL',
    examRelevant: false,
    spiritual: true,
  },
  {
    text: "Mushkilon se ghabra kar na badlo kabhi iraadon ko, himmat rakhne waalon ki kabhi haar nahi hoti.",
    author: "Harivansh Rai Bachchan",
    category: 'RESILIENCE',
    examRelevant: true,
    isHindi: true,
  },
  {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Dr. Vikram Sarabhai",
    category: 'MOTIVATION',
    examRelevant: true,
  },
  {
    text: "Mann ke haare haar hai, mann ke jeete jeet.",
    author: "Indian Proverb",
    category: 'RESILIENCE',
    examRelevant: true,
    isHindi: true,
  },
  {
    text: "Education is the most powerful weapon you can use to change the world.",
    author: "Dr. B.R. Ambedkar",
    category: 'MOTIVATION',
    examRelevant: true,
  },
  {
    text: "The mind is everything. What you think, you become.",
    author: "Swami Vivekananda",
    category: 'SPIRITUAL',
    examRelevant: true,
    spiritual: true,
  },
];

export function getRandomQuote(spiritual?: boolean): Quote {
  const filtered = spiritual
    ? QUOTES
    : QUOTES.filter((q) => !q.spiritual);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getDailyQuote(spiritual?: boolean): Quote {
  const filtered = spiritual
    ? QUOTES
    : QUOTES.filter((q) => !q.spiritual);
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return filtered[dayOfYear % filtered.length];
}

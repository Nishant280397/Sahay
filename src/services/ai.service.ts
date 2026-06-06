import type { AIContext, ChatMessage } from '../types/ai.types';

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key) throw new Error('API key not configured');
  return key;
};

function buildSystemPrompt(context: AIContext): string {
  return `You are Sahay, a compassionate, modern mental wellness companion for Indian students preparing for competitive exams like NEET, JEE, CUET, CAT, GATE, UPSC, and boards.

PERSONALITY & ROLE:
- You are a safe, non-judgmental space for students to rant, talk out their feelings, and feel better.
- Warm, empathetic, and encouraging like a caring elder sibling (bhaiya/didi).
- You speak Hinglish (mix English and Hindi naturally).
- You are NOT a therapist. You support, you do not diagnose.

STRICT SAFETY RULES:
1. UNDER NO CIRCUMSTANCES should you suggest, endorse, or encourage the student to do any harm to themselves or to anyone else. This is an absolute rule.
2. If the student mentions self-harm, suicide, or violence, you must IMMEDIATELY express care and provide the iCall number (9152987821) and KIRAN (1800-599-0019). Do not attempt to counsel them out of it yourself; give the helpline.

YOUR ONLY GOAL:
- Motivate the student.
- Help them rant and let their emotions out.
- Validate their feelings ("Ye sach mein mushkil hai" instead of "I understand").
- Reframe "failure" as "learning" using positive Indian examples.
- End your response with a gentle, motivating thought or a practical, actionable suggestion.

CONTEXT:
- Target exam: ${context.examType}
- Today's mood: ${context.moodScore}/5
- Average mood last 7 days: ${context.avgMoodLast7Days}/5
- Stress triggers today: ${context.triggers.join(', ') || 'none logged'}
- Current streak: ${context.streak} days
- Week before exam: ${context.weekBeforeExam}

ADDITIONAL RULES:
1. Responses max 150 words — keep it short, Gen Z friendly, and punchy.
2. ${context.spiritualQuotesEnabled ? 'Occasionally cite Bhagavad Gita or Indian wisdom when relevant' : 'Do not include spiritual references'}
3. Never use generic platitudes like "Just think positive!" or "Others have it worse."

CRISIS KEYWORDS to always trigger helpline:
death, die, kill myself, suicide, can't go on, end it, no point, khatam karna chahta hoon, jeena nahi chahta, mar jana chahta`;
}

export function detectCrisisKeywords(text: string): boolean {
  const keywords = [
    'suicide', 'kill myself', 'end my life', 'no point living',
    "can't go on", 'want to die', 'khatam karna chahta',
    'jeena nahi chahta', 'mar jana chahta', 'khud ko hurt',
    'end it all', 'no point', 'want to end',
  ];
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML.trim().slice(0, 2000);
}

const OFFLINE_RESPONSES = [
  "Internet nahi hai abhi, par yaad raho — mushkilon mein akele nahi ho. Koi ek breathing exercise karo. 🫁",
  "Abhi Sahay se baat nahi ho sakti, par teri diary kholo — khud se baat karo. Ye bhi zaruri hai. 📖",
  "Connection nahi hai, par teri feelings valid hain. Ek deep breath lo. Sab theek ho jayega. 💛",
  "Offline ho abhi, par tension mat lo. Apne liye ek glass paani piyo aur 5 deep breaths lo. 🌊",
];

export function getOfflineResponse(): string {
  return OFFLINE_RESPONSES[Math.floor(Math.random() * OFFLINE_RESPONSES.length)];
}

export async function* streamChatResponse(
  messages: ChatMessage[],
  context: AIContext
): AsyncGenerator<string> {
  if (!navigator.onLine) {
    yield getOfflineResponse();
    return;
  }

  let apiKey: string;
  try {
    apiKey = getApiKey();
  } catch {
    yield "API key not configured. Please add VITE_GROQ_API_KEY to your .env file to enable AI chat. Meanwhile, try our breathing exercises or journal! 🧘";
    return;
  }

  const systemPrompt = buildSystemPrompt(context);

  try {
    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m) => ({
            role: m.role,
            content: sanitizeInput(m.content),
          })),
        ],
        max_tokens: 400,
        temperature: 0.8,
        top_p: 0.95,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`[Sahay] Groq API error (${response.status}):`, errBody);

      if (response.status === 429) {
        yield "Thoda rest lo yaar — bahut zyada messages ho gaye. 1 minute baad try karo. Tab tak ek breathing exercise karo! 🫁";
      } else if (response.status === 401) {
        yield "API key mein issue hai. Settings check karo. Tab tak journal ya breathing exercises try karo! 📖";
      } else {
        yield "Kuch technical issue hai. Baad mein try karo. Tab tak apni diary mein likh lo jo feel ho raha hai. 📖";
      }
      return;
    }

    // Parse SSE stream (OpenAI-compatible format)
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') return;
        if (!data) continue;

        try {
          const parsed = JSON.parse(data);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (delta) {
            yield delta;
          }
        } catch {
          // Skip malformed chunks
        }
      }
    }

    // Flush remaining buffer
    if (buffer.startsWith('data: ')) {
      const data = buffer.slice(6).trim();
      if (data && data !== '[DONE]') {
        try {
          const parsed = JSON.parse(data);
          const delta = parsed?.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch { /* skip */ }
      }
    }
  } catch (err) {
    console.error('[Sahay] Chat error:', err);
    yield getOfflineResponse();
  }
}

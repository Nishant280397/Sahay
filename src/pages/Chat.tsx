import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2, AlertTriangle } from 'lucide-react';
import { useAIChatStore } from '../store/aiChatStore';
import { useUserStore } from '../store/userStore';
import { useMoodStore } from '../store/moodStore';
import { streamChatResponse, detectCrisisKeywords, getOfflineResponse } from '../services/ai.service';
import { CRISIS_CONTACTS } from '../constants/crisisContacts';
import type { AIContext } from '../types/ai.types';
import { db } from '../services/db.service';

const SUGGESTED_PROMPTS = [
  "Padhai mein mann nahi lag raha",
  "Bahut pressure hai ghar se",
  "Dost aage nikal rahe hain",
  "Neend nahi aa rahi",
  "Result ke baare mein darr lag raha hai",
  "Ek motivation chahiye",
];

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, isStreaming, addUserMessage, appendToLastAssistant, setStreaming, clearChat } = useAIChatStore();
  const profile = useUserStore((s) => s.profile);
  const { entries } = useMoodStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const buildContext = async (): Promise<AIContext> => {
    const streak = await db.streakData.get(1);
    const recent = entries.slice(0, 7);
    const avg = recent.length > 0
      ? recent.reduce((s, e) => s + e.moodScore, 0) / recent.length
      : 3;

    return {
      examType: profile?.targetExam || 'OTHER',
      moodScore: entries[0]?.moodScore ?? 3,
      avgMoodLast7Days: Math.round(avg * 10) / 10,
      triggers: entries[0]?.triggers ?? [],
      streak: streak?.currentStreak ?? 0,
      weekBeforeExam: false,
      spiritualQuotesEnabled: profile?.spiritualQuotesEnabled,
    };
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;

    // Crisis detection
    if (detectCrisisKeywords(msg)) {
      setShowCrisisBanner(true);
    }

    addUserMessage(msg);
    setInput('');
    setStreaming(true);

    try {
      const context = await buildContext();
      const allMessages = [...messages, { id: '', role: 'user' as const, content: msg, timestamp: '' }];
      
      for await (const chunk of streamChatResponse(allMessages, context)) {
        appendToLastAssistant(chunk);
      }
    } catch {
      appendToLastAssistant(getOfflineResponse());
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="page-enter flex flex-col" style={{ height: 'calc(100dvh - 8rem)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪔</span>
          <div>
            <h1 className="text-lg font-bold text-ink-900">Sahay se baat karo</h1>
            <p className="text-xs text-ink-500">Talk to your wellness companion</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-sand-100 text-ink-400 hover:text-ink-600 transition-colors"
            aria-label="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Crisis Banner */}
      {showCrisisBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="crisis-banner mb-3 flex items-start gap-3"
        >
          <AlertTriangle size={20} className="text-primary-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-ink-800">Hum yahan hain 💛</p>
            <p className="text-xs text-ink-600 mt-1">
              Agar aapko kisi se baat karni hai, ye helplines hamesha available hain:
            </p>
            <div className="flex gap-2 mt-2">
              <a href={`tel:${CRISIS_CONTACTS[0].number}`} className="text-xs font-semibold text-primary-600 hover:underline">
                📞 KIRAN: {CRISIS_CONTACTS[0].number}
              </a>
              <a href={`tel:${CRISIS_CONTACTS[1].number}`} className="text-xs font-semibold text-primary-600 hover:underline">
                📞 iCall: {CRISIS_CONTACTS[1].number}
              </a>
            </div>
          </div>
          <button onClick={() => setShowCrisisBanner(false)} className="text-ink-400 hover:text-ink-600 text-xs">✕</button>
        </motion.div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <div className="text-center py-8 space-y-4">
            <div className="text-5xl animate-float">🪔</div>
            <p className="text-ink-600 font-medium">Namaste! Main Sahay hoon.</p>
            <p className="text-sm text-ink-500">
              Tum kuch bhi share kar sakte ho — padhai, pressure, ya bas mann ki baat.
            </p>

            {/* Suggested prompts */}
            <div className="space-y-2 mt-4">
              <p className="text-xs text-ink-400">Try asking...</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="px-3 py-1.5 rounded-full text-xs border border-sand-200 text-ink-600 hover:border-primary-300 hover:bg-primary-50 transition-all"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`chat-bubble ${msg.role}`}
          >
            {msg.content}
          </motion.div>
        ))}

        {isStreaming && (
          <div className="chat-bubble assistant">
            <span className="inline-block animate-pulse">●●●</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-ink-400 text-center py-1.5 border-t border-sand-100">
        Sahay emotional support hai, therapist nahi. Zyada zaroorat ho toh: iCall 9152987821 | KIRAN 1800-599-0019
      </p>

      {/* Input */}
      <div className="flex gap-2 pt-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Apna message likho..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/60 border border-sand-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          disabled={isStreaming}
          maxLength={1000}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isStreaming}
          className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center disabled:opacity-40 transition-all hover:bg-primary-600 active:scale-95"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

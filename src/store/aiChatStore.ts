import { create } from 'zustand';
import type { ChatMessage } from '../types/ai.types';

interface AIChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  addUserMessage: (content: string) => void;
  addAssistantMessage: (content: string) => void;
  appendToLastAssistant: (chunk: string) => void;
  setStreaming: (val: boolean) => void;
  setError: (err: string | null) => void;
  clearChat: () => void;
}

export const useAIChatStore = create<AIChatState>((set, get) => ({
  messages: [],
  isStreaming: false,
  error: null,

  addUserMessage: (content) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, msg] }));
  },

  addAssistantMessage: (content) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({ messages: [...s.messages, msg] }));
  },

  appendToLastAssistant: (chunk) => {
    const msgs = [...get().messages];
    const last = msgs[msgs.length - 1];
    if (last && last.role === 'assistant') {
      last.content += chunk;
      set({ messages: msgs });
    } else {
      const msg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: chunk,
        timestamp: new Date().toISOString(),
      };
      set((s) => ({ messages: [...s.messages, msg] }));
    }
  },

  setStreaming: (val) => set({ isStreaming: val }),
  setError: (err) => set({ error: err }),
  clearChat: () => set({ messages: [], error: null }),
}));

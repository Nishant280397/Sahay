import { create } from 'zustand';
import type { Language } from '../i18n';

interface UIState {
  language: Language;
  isDarkMode: boolean;
  activeModal: string | null;
  toastMessage: string | null;
  setLanguage: (lang: Language) => void;
  toggleDarkMode: () => void;
  showModal: (id: string) => void;
  hideModal: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  language: 'en',
  isDarkMode: false,
  activeModal: null,
  toastMessage: null,

  setLanguage: (lang) => set({ language: lang }),
  
  toggleDarkMode: () => set((s) => {
    const next = !s.isDarkMode;
    document.documentElement.classList.toggle('dark', next);
    return { isDarkMode: next };
  }),
  
  showModal: (id) => set({ activeModal: id }),
  hideModal: () => set({ activeModal: null }),
  
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => set({ toastMessage: null }), 3000);
  },
  hideToast: () => set({ toastMessage: null }),
}));

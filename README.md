# Sahay (साहय) — Mental Wellness Companion for Students 🪔

> **"Pariksha ke samay, hum hain saath"** — During exams, we are with you.

Sahay is a compassionate digital companion for Indian students navigating the emotionally turbulent journey of competitive exam preparation. It helps students track their mood, identify stress triggers, reflect on their emotions, and receive personalized wellness support.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

## ✨ Features

### 🎯 Core Features
- **Daily Mood Check-in** — 30-second daily wellness log with Hindi/English support
- **Mood History & Analytics** — Visual charts showing mood trends, trigger analysis, and auto-generated insights
- **Journal & Reflection** — Guided prompts in Hinglish for emotional processing
- **Breathing Exercises** — 4-7-8, Box Breathing, and Anulom-Vilom pranayama with animated guides
- **AI Companion Chat** — Talk to Sahay, your empathetic wellness companion (powered by Groq LLM)
- **Crisis Resources** — Indian mental health helplines (KIRAN, iCall, Vandrevala, NIMHANS) always accessible

### 🇮🇳 Indian Cultural Design
- **Hinglish UI** — Natural mix of Hindi and English
- **Indian Color Palette** — Marigold Saffron, Peacock Teal, Lotus Pink
- **Exam-Specific** — Built for NEET, JEE, CUET, CAT, GATE, UPSC, and Board exam students
- **Bhagavad Gita & Indian Wisdom** — Optional spiritual quotes from Indian traditions
- **Devanagari Typography** — Tiro Devanagari Hindi for Hindi text

### 🔒 Privacy First
- **All data stored locally** on your device using IndexedDB
- **No personal information** ever sent to any server
- **AI chat sends only** anonymized context (exam type, mood score)
- **Session-only chat** — conversations cleared on tab close

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sahay.git
cd sahay

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your Groq API key (optional, for AI chat)

# Start development server
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GROQ_API_KEY` | No* | Groq API key for AI chat feature |

*The app works fully without an API key — AI chat will show offline responses instead.

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Core framework |
| Vite 8 | Build tool |
| TailwindCSS 4 | Utility-first styling |
| Zustand | State management |
| Dexie.js | IndexedDB wrapper (offline storage) |
| Recharts | Mood trend charts |
| Framer Motion | Breathing exercise animations |
| Lucide React | Icons |
| React Router v6 | Client-side routing |

## 📱 App Structure

```
src/
├── pages/           # Route-level pages
├── components/      # Reusable components
│   └── layout/      # AppShell, BottomNav
├── store/           # Zustand stores
├── services/        # Business logic (DB, AI, etc.)
├── constants/       # Static data (moods, exams, quotes)
├── types/           # TypeScript type definitions
└── i18n/            # Hindi/English translations
```

## 🎯 Target Users

- **NEET** aspirants preparing for medical entrance
- **JEE** students preparing for IIT/NIT
- **CUET** university entrance candidates
- **CAT** MBA aspirants
- **GATE** engineering postgrad candidates
- **UPSC** civil services aspirants
- **Board exam** students (CBSE, State boards)

## 🆘 Crisis Resources

If you or someone you know needs help:

| Helpline | Number | Hours |
|---|---|---|
| **KIRAN** (Toll-Free) | 1800-599-0019 | 24/7 |
| **iCall** | 9152987821 | Mon-Sat, 8am-10pm |
| **Vandrevala Foundation** | 1860-2662-345 | 24/7 |
| **NIMHANS** | 080-46110007 | 24/7 |

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Deploy to Vercel:
1. Push to GitHub
2. Connect repository in Vercel dashboard
3. Add environment variable `VITE_GROQ_API_KEY` in Vercel settings
4. Deploy

## 📄 License

MIT License — Built with 💛 for Indian students.

---

*Sahay is emotional support, not a replacement for professional help. If you need professional mental health support, please contact the helplines listed above.*

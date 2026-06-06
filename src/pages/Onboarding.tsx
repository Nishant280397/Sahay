import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useMoodStore } from '../store/moodStore';
import { EXAM_OPTIONS } from '../constants/exams';
import { MOOD_SCALE } from '../constants/moods';
import type { ExamType } from '../types/user.types';
import type { MoodScore } from '../types/mood.types';

const steps = ['welcome', 'name', 'exam', 'mood', 'features'] as const;
type Step = typeof steps[number];

export default function Onboarding() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [exam, setExam] = useState<ExamType>('OTHER');
  const [attempt, setAttempt] = useState(1);
  const [selectedMood, setSelectedMood] = useState<MoodScore | null>(null);
  const navigate = useNavigate();
  const { completeOnboarding } = useUserStore();
  const { addEntry } = useMoodStore();

  const stepIndex = steps.indexOf(step);

  const goNext = () => {
    const next = steps[stepIndex + 1];
    if (next) setStep(next);
  };
  const goBack = () => {
    const prev = steps[stepIndex - 1];
    if (prev) setStep(prev);
  };

  const finish = async () => {
    await completeOnboarding(name || 'Friend', exam, attempt);
    if (selectedMood) {
      await addEntry(selectedMood);
    }
    navigate('/', { replace: true });
  };

  const canProceed = () => {
    switch (step) {
      case 'name': return name.trim().length > 0;
      case 'mood': return selectedMood !== null;
      default: return true;
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen min-h-dvh flex flex-col font-body-md antialiased relative overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Accents unified across steps */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary-fixed opacity-30 blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-secondary-container opacity-20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-pattern-kolam"></div>
      </div>

      {/* Header: Navigation & Progress */}
      <header className="w-full max-w-2xl mx-auto px-margin-mobile pt-8 pb-4 flex items-center justify-between sticky top-0 bg-surface/80 backdrop-blur-md z-20">
        <button 
          onClick={goBack}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface ${step === 'welcome' ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
        </button>
        
        <div className="flex-1 px-4 max-w-[300px]">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hidden md:block">Progress</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 text-right md:hidden">{stepIndex + 1}/{steps.length}</span>
          </div>
          <div className="flex gap-1.5 h-[4px] items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 relative h-full">
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${
                  i < stepIndex ? 'bg-primary' : 
                  i === stepIndex ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                {i === stepIndex && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-60 scale-y-150"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 w-10 text-right hidden md:block">{stepIndex + 1}/{steps.length}</span>
        <div className="w-10 md:hidden"></div> {/* Spacer to balance mobile */}
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 relative z-10 w-full max-w-lg md:max-w-2xl mx-auto px-margin-mobile flex flex-col pb-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col flex-1"
          >
            {/* STEP 1: Welcome */}
            {step === 'welcome' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-stack-md">
                <div className="mb-stack-lg animate-fade-in-up">
                  <div className="w-32 h-32 rounded-full shadow-[0_12px_24px_-4px_rgba(245,158,11,0.2)] bg-surface-container-lowest flex items-center justify-center border border-surface-container-highest p-2">
                    <span className="text-7xl animate-float">🪔</span>
                  </div>
                </div>
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight mb-4">
                  Namaste! 🙏<br/>
                  <span className="text-primary font-bold">Main Sahay hoon</span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Your wellness companion during exams. I'll help you track your mood, manage stress, and stay mentally strong.
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-devanagari italic opacity-80">
                  "परीक्षा के समय, हम हैं साथ"
                </p>
              </div>
            )}

            {/* STEP 2: Name */}
            {step === 'name' && (
              <div className="flex-1 flex flex-col items-center justify-center mt-stack-md text-center">
                <div className="w-16 h-16 bg-surface-container-highest rounded-2xl flex items-center justify-center mb-stack-lg shadow-[0_8px_16px_rgba(133,83,0,0.06)] border border-surface-variant transform rotate-3">
                  <span className="material-symbols-outlined text-primary text-[32px] transform -rotate-3" style={{ fontVariationSettings: "'FILL' 1" }}>sentiment_satisfied</span>
                </div>
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-lg leading-tight">
                  Aapka naam kya hai?
                </h1>
                <div className="relative mb-stack-md ledger-input group w-full max-w-sm mx-auto text-left">
                  <input 
                    type="text"
                    id="userName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-lowest border-0 px-4 pt-6 pb-4 font-title-md text-title-md text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-t-xl text-center"
                    placeholder="Apna naam likhiye..."
                    autoComplete="off"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-outline-variant"></div>
                  <div className="ledger-line absolute bottom-0 left-0 w-full h-[2px] bg-outline-variant transform scale-x-0 transition-transform duration-300 ease-out origin-center"></div>
                </div>
                <div className="flex items-start gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-variant text-left max-w-sm mx-auto w-full">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-[-2px]">
                    Ye naam sirf aapke phone par rahega.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Exam */}
            {step === 'exam' && (
              <div className="flex-1 flex flex-col items-center mt-stack-md text-center w-full max-w-xl mx-auto">
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
                  Aap kaunse exam ki<br/>
                  <span className="text-primary relative inline-block mt-2">
                    taiyari kar rahe hain?
                    <svg className="absolute -bottom-3 left-0 w-full h-3 text-primary-fixed-dim/50" preserveAspectRatio="none" viewBox="0 0 100 10">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                    </svg>
                  </span>
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-stack-sm opacity-90 mb-stack-lg">
                  Chunein apna primary goal taaki Sahay aapki behtar madad kar sake.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-stack-lg w-full">
                  {EXAM_OPTIONS.slice(0, 8).map((opt) => (
                    <label key={opt.value} className="cursor-pointer group relative">
                      <input 
                        type="radio" 
                        name="exam" 
                        value={opt.value} 
                        checked={exam === opt.value}
                        onChange={() => setExam(opt.value as ExamType)}
                        className="peer sr-only" 
                      />
                      <div className={`h-full flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ease-out ${exam === opt.value ? 'bg-primary-fixed/20 border-primary shadow-[0_8px_24px_rgba(133,83,0,0.15)] -translate-y-1' : 'bg-surface-container-lowest border-surface-container shadow-[0_4px_12px_rgba(34,26,18,0.03)] hover:border-outline-variant hover:shadow-[0_8px_16px_rgba(34,26,18,0.06)]'}`}>
                        <div className="text-3xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform" style={exam === opt.value ? {transform: 'scale(1.1)'} : {}}>
                          {opt.emoji}
                        </div>
                        <span className={`font-title-md text-title-md ${exam === opt.value ? 'text-primary' : 'text-on-surface'}`}>{opt.label}</span>
                      </div>
                      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(133,83,0,0.6)] ${exam === opt.value ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                    </label>
                  ))}
                </div>

                <h2 className="font-title-md text-title-md text-on-surface mb-stack-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                  Aapka kaunsa attempt hai?
                </h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-margin-mobile px-margin-mobile">
                  {[1, 2, 3].map((n) => (
                    <label key={n} className="cursor-pointer shrink-0 min-w-[100px]">
                      <input 
                        type="radio" 
                        name="attempt" 
                        value={n} 
                        checked={attempt === n}
                        onChange={() => setAttempt(n)}
                        className="peer sr-only" 
                      />
                      <div className={`py-3 px-5 text-center rounded-xl font-label-sm text-label-sm transition-all duration-200 hover:bg-surface-container-high ${attempt === n ? 'bg-secondary-container text-on-secondary-container border border-secondary-fixed-dim shadow-[0_4px_12px_rgba(109,245,225,0.3)]' : 'bg-surface-container border border-surface-container-highest text-on-surface-variant'}`}>
                        {n === 3 ? '3rd+ Attempt' : n === 2 ? '2nd Attempt' : '1st Attempt'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Mood */}
            {step === 'mood' && (
              <div className="flex-1 flex flex-col items-center justify-center mt-stack-md text-center">
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-stack-sm">
                  Abhi kaisa feel ho raha hai?
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
                  Select the mood that best matches your current state.
                </p>

                <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-stack-md mb-stack-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed-dim/10 rounded-bl-full -mr-4 -mt-4"></div>
                  
                  <div className="flex justify-between items-end relative z-10 w-full mb-stack-sm gap-2 overflow-x-auto no-scrollbar pb-4">
                    {MOOD_SCALE.map((mood) => (
                      <button 
                        key={mood.score}
                        onClick={() => setSelectedMood(mood.score)}
                        className={`mood-btn flex flex-col items-center gap-2 border-2 border-transparent rounded-full p-2 shrink-0 ${selectedMood === mood.score ? 'selected bg-surface-container-highest border-primary' : ''}`}
                        style={selectedMood === mood.score ? { filter: 'grayscale(0) opacity(1)', transform: 'scale(1.15)', boxShadow: '0 12px 24px -8px var(--color-primary-fixed-dim)' } : { filter: 'grayscale(0.7) opacity(0.6)', transform: 'scale(0.9)' }}
                      >
                        <span className="text-4xl md:text-5xl drop-shadow-md">{mood.emoji}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-center h-20 flex flex-col justify-center items-center mt-4 border-t border-surface-variant/50 pt-4">
                    {selectedMood ? (
                      <>
                        <h3 className="font-title-md text-title-md text-primary mb-1">{MOOD_SCALE.find(m => m.score === selectedMood)?.hi}</h3>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">{MOOD_SCALE.find(m => m.score === selectedMood)?.en}</p>
                      </>
                    ) : (
                      <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">Tap an emoji above</p>
                    )}
                  </div>
                </div>

                {selectedMood && selectedMood <= 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="crisis-banner text-left bg-surface-container-highest rounded-xl p-4 border border-outline-variant w-full">
                    <p className="font-body-md text-body-md text-on-surface mb-2">
                      💛 It's okay to feel this way. Remember, you're not alone.
                    </p>
                    <a href="tel:1800-599-0019" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                      <span className="material-symbols-outlined text-[18px] mr-1">call</span>
                      KIRAN Helpline: 1800-599-0019
                    </a>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 5: Features */}
            {step === 'features' && (
              <div className="flex-1 flex flex-col justify-center mt-stack-md text-center">
                <div className="w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mb-stack-md mx-auto shadow-[0_8px_16px_rgba(133,83,0,0.06)] border border-surface-variant">
                  <span className="text-5xl">🎉</span>
                </div>
                <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 leading-tight">
                  You're all set, {name || 'Friend'}!
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
                  Here's what Sahay can help you with:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {[
                    { emoji: '😊', title: 'Daily Mood Check-in', desc: '30-second wellness log' },
                    { emoji: '📖', title: 'Journal & Reflect', desc: 'Guided emotional processing' },
                    { emoji: '🧘', title: 'Breathing Exercises', desc: 'Pranayama to destress' },
                    { emoji: '🤖', title: 'Chat with Sahay', desc: 'Your AI wellness companion' },
                  ].map((f) => (
                    <div key={f.title} className="bg-surface-container-lowest p-4 rounded-xl border border-surface-variant shadow-sm flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0 bg-surface-container rounded-lg p-2">{f.emoji}</span>
                      <div>
                        <p className="font-title-md text-[16px] font-semibold text-on-surface">{f.title}</p>
                        <p className="font-body-md text-[13px] text-on-surface-variant mt-1">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky Footer CTA */}
      <footer className="fixed bottom-0 left-0 w-full p-margin-mobile bg-gradient-to-t from-surface via-surface/95 to-transparent pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-30 flex justify-center">
        <div className="w-full max-w-lg md:max-w-2xl pt-8">
          <button 
            onClick={step === 'features' ? finish : goNext}
            disabled={!canProceed()}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-primary-container to-primary-fixed-dim text-on-primary-container font-title-md text-title-md py-4 rounded-xl shadow-[0_8px_20px_rgba(245,158,11,0.25)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <span className="relative z-10">{step === 'features' ? 'Start Using Sahay' : "Let's start"}</span>
            {step === 'features' ? (
              <Sparkles size={20} className="relative z-10" />
            ) : (
              <span className="material-symbols-outlined relative z-10 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            )}
            {!(!canProceed()) && (
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] group-hover:animate-shine"></div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

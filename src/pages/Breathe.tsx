import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, Volume2 } from 'lucide-react';
import { BREATHING_PATTERNS, type BreathingPattern } from '../constants/breathingPatterns';

const SOUNDS = [
  { id: 'none', label: 'No Sound', url: '' },
  { id: 'birds', label: 'Forest Birds', url: 'https://actions.google.com/sounds/v1/animals/birds_in_forest.ogg' },
  { id: 'rain', label: 'Rain', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
  { id: 'waves', label: 'Ocean Waves', url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg' }
];

export default function Breathe() {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalCycles, setTotalCycles] = useState(4);
  const [selectedSound, setSelectedSound] = useState(SOUNDS[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const currentPhase = selectedPattern ? selectedPattern.phases[currentPhaseIndex] : null;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentPhaseIndex(0);
    setCountdown(0);
    setCompletedCycles(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [clearTimer]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && selectedSound.url) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, selectedSound]);

  useEffect(() => {
    if (!isPlaying || !selectedPattern) return;

    const phase = selectedPattern.phases[currentPhaseIndex];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdown(phase.duration);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const nextPhaseIndex = currentPhaseIndex + 1;
          if (nextPhaseIndex >= selectedPattern.phases.length) {
            const nextCycle = completedCycles + 1;
            if (nextCycle >= totalCycles) {
              clearTimer();
              setIsPlaying(false);
              setCompletedCycles(nextCycle);
              return 0;
            }
            setCompletedCycles(nextCycle);
            setCurrentPhaseIndex(0);
          } else {
            setCurrentPhaseIndex(nextPhaseIndex);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isPlaying, currentPhaseIndex, selectedPattern, completedCycles, totalCycles, clearTimer]);

  const isComplete = completedCycles >= totalCycles && !isPlaying;
  const circleScale = currentPhase ? currentPhase.scale : 1;

  if (!selectedPattern) {
    return (
      <div className="page-enter space-y-5">
        <h1 className="text-2xl font-bold text-ink-900">🧘 Breathing Exercises</h1>
        <p className="text-sm text-ink-500">Choose a technique to calm your mind</p>

        <div className="space-y-3">
          {BREATHING_PATTERNS.map((pattern) => (
            <motion.button
              key={pattern.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedPattern(pattern); setTotalCycles(pattern.defaultCycles); }}
              className="w-full glass-card p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{pattern.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-ink-900">{pattern.name_en}</p>
                  <p className="text-xs text-ink-500 font-devanagari">{pattern.name_hi}</p>
                  <p className="text-sm text-ink-600 mt-1">{pattern.description_en}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: pattern.color + '20', color: pattern.color }}>
                  <Play size={16} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6 text-center pt-4">
      {/* Back button */}
      <button
        onClick={() => { reset(); setSelectedPattern(null); }}
        className="flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 transition-colors"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <h2 className="text-xl font-bold text-ink-900">{selectedPattern.name_en}</h2>
      <p className="text-sm text-ink-500 font-devanagari">{selectedPattern.name_hi}</p>

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center py-8">
        <motion.div
          className="breathing-circle"
          style={{ background: `linear-gradient(135deg, ${selectedPattern.color}30, ${selectedPattern.color}10)` }}
          animate={
            isPlaying && !shouldReduceMotion
              ? { scale: circleScale, opacity: [0.7, 1, 0.7] }
              : { scale: 1 }
          }
          transition={{ duration: currentPhase?.duration || 4, ease: 'easeInOut' }}
        >
          <div className="text-center z-10">
            {isComplete ? (
              <>
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm font-medium text-ink-700">Complete!</p>
              </>
            ) : isPlaying && currentPhase ? (
              <>
                <p className="font-mono-timer text-3xl font-bold" style={{ color: selectedPattern.color }}>
                  {countdown}
                </p>
                <p className="text-sm font-semibold text-ink-700 mt-1">{currentPhase.name}</p>
                <p className="text-xs text-ink-500 font-devanagari">{currentPhase.name_hi}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-ink-500">Ready?</p>
                <p className="text-xs text-ink-400 mt-1">Tap play to begin</p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Phase instruction */}
      {isPlaying && currentPhase && (
        <div role="status" aria-live="polite" className="text-sm text-ink-600">
          {currentPhase.instruction_en}
        </div>
      )}

      {/* Cycle indicator */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < completedCycles ? 'bg-primary-500 scale-110' : 'bg-sand-200'
            }`}
          />
        ))}
        <span className="text-xs text-ink-400 ml-2">
          {completedCycles}/{totalCycles} cycles
        </span>
      </div>

      {/* Cycle & Sound selectors */}
      {!isPlaying && !isComplete && (
        <div className="flex flex-col gap-5 mt-2 mb-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm text-ink-500">Cycles:</span>
            {[2, 4, 6, 8].map((n) => (
              <button
                key={n}
                onClick={() => setTotalCycles(n)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                  totalCycles === n ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Volume2 size={16} className="text-ink-400 shrink-0" />
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
              {SOUNDS.map(sound => (
                <button
                  key={sound.id}
                  onClick={() => setSelectedSound(sound)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    selectedSound.id === sound.id 
                      ? 'bg-secondary-container text-on-secondary-container border-secondary-fixed-dim shadow-sm' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-transparent'
                  }`}
                >
                  {sound.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {isComplete ? (
          <button
            onClick={reset}
            className="px-8 py-3 rounded-xl bg-primary-500 text-white font-semibold flex items-center gap-2"
          >
            <RotateCcw size={18} /> Do Again
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all"
              style={{ background: `linear-gradient(135deg, ${selectedPattern.color}, ${selectedPattern.color}CC)` }}
              aria-label={isPlaying ? 'Pause' : 'Start'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            {(isPlaying || completedCycles > 0) && (
              <button
                onClick={reset}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-sand-100 text-ink-500 hover:bg-sand-200 transition-colors self-center"
                aria-label="Reset"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </>
        )}
      </div>

      <audio ref={audioRef} src={selectedSound.url} loop>
        <track kind="captions" />
      </audio>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { MOOD_SCALE } from '../constants/moods';
import { STRESS_TRIGGERS } from '../constants/stressTriggers';
import { useMoodStore } from '../store/moodStore';
import { useUIStore } from '../store/uiStore';
import type { MoodScore, TriggerCategory, PhysicalSymptom } from '../types/mood.types';

type Phase = 'mood' | 'triggers' | 'symptoms' | 'note' | 'done';

const SYMPTOMS: { value: PhysicalSymptom; label: string; emoji: string }[] = [
  { value: 'HEADACHE', label: 'Headache', emoji: '🤕' },
  { value: 'POOR_SLEEP', label: 'Sleep Issues', emoji: '😴' },
  { value: 'APPETITE_CHANGE', label: 'Appetite Change', emoji: '🍽️' },
  { value: 'FATIGUE', label: 'Fatigue', emoji: '😩' },
  { value: 'CHEST_TIGHTNESS', label: 'Chest Tightness', emoji: '💔' },
  { value: 'RESTLESSNESS', label: 'Restlessness', emoji: '🏃' },
  { value: 'NONE', label: 'None', emoji: '✅' },
];

export default function CheckIn() {
  const [phase, setPhase] = useState<Phase>('mood');
  const [selectedMood, setSelectedMood] = useState<MoodScore | null>(null);
  const [triggers, setTriggers] = useState<TriggerCategory[]>([]);
  const [symptoms, setSymptoms] = useState<PhysicalSymptom[]>([]);
  const [note, setNote] = useState('');
  const { addEntry, todayEntry } = useMoodStore();
  const { showToast } = useUIStore();
  const navigate = useNavigate();

  const toggleTrigger = (t: TriggerCategory) => {
    setTriggers((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 3 ? [...prev, t] : prev
    );
  };

  const toggleSymptom = (s: PhysicalSymptom) => {
    if (s === 'NONE') {
      setSymptoms(['NONE']);
      return;
    }
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev.filter((x) => x !== 'NONE'), s]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    await addEntry(selectedMood, triggers, symptoms, note);
    setPhase('done');
    showToast('Mood saved! Take care of yourself 💛');
  };

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: 'Suprabhat! Aaj kaisa feel ho raha hai?', emoji: '🌅' };
    if (h < 17) return { text: 'Dopahar mein kaisa chal raha hai?', emoji: '☀️' };
    if (h < 21) return { text: 'Shaam ko kaisa raha aaj ka din?', emoji: '🌇' };
    return { text: 'Raat ko kaisa feel ho raha hai?', emoji: '🌙' };
  };

  const greeting = getTimeGreeting();

  if (todayEntry && phase === 'mood') {
    return (
      <div className="page-enter space-y-6 text-center pt-12">
        <div className="text-6xl">✅</div>
        <h2 className="text-xl font-bold text-ink-900">Today's check-in done!</h2>
        <p className="text-ink-600">
          You logged: {MOOD_SCALE.find((m) => m.score === todayEntry.moodScore)?.emoji}{' '}
          {todayEntry.moodLabel}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6 pt-4">
      <AnimatePresence mode="wait">
        {/* Phase: Mood Selection */}
        {phase === 'mood' && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <span className="text-4xl">{greeting.emoji}</span>
              <h1 className="text-xl font-bold text-ink-900 mt-2">{greeting.text}</h1>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              {MOOD_SCALE.map((mood) => (
                <button
                  key={mood.score}
                  onClick={() => setSelectedMood(mood.score)}
                  className={`mood-btn ${selectedMood === mood.score ? 'selected' : ''}`}
                  style={{ color: mood.color }}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="text-xs font-medium text-ink-700">{mood.en}</span>
                  <span className="text-[10px] text-ink-400 font-devanagari">{mood.hi}</span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setPhase('triggers')}
                className="w-full py-3.5 rounded-xl bg-primary-500 text-white font-semibold flex items-center justify-center gap-2"
              >
                Next <ChevronRight size={18} />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Phase: Trigger Selection */}
        {phase === 'triggers' && (
          <motion.div
            key="triggers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-ink-900">Iska karan kya tha?</h2>
              <p className="text-sm text-ink-500">What caused this? (Select up to 3)</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {STRESS_TRIGGERS.map((trigger) => (
                <button
                  key={trigger.value}
                  onClick={() => toggleTrigger(trigger.value)}
                  className={`trigger-chip ${triggers.includes(trigger.value) ? 'selected' : ''}`}
                >
                  <span>{trigger.emoji}</span>
                  <span>{trigger.label_en}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setPhase('mood')} className="flex-1 py-3 rounded-xl border border-sand-200 font-medium text-ink-600">
                Back
              </button>
              <button
                onClick={() => setPhase('symptoms')}
                className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-semibold"
              >
                Next
              </button>
            </div>

            <button
              onClick={() => setPhase('note')}
              className="w-full text-center text-sm text-ink-400 hover:text-ink-600"
            >
              Skip this step →
            </button>
          </motion.div>
        )}

        {/* Phase: Physical Symptoms */}
        {phase === 'symptoms' && (
          <motion.div
            key="symptoms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-ink-900">Any physical symptoms?</h2>
              <p className="text-sm text-ink-500">Koi shareerik lakshan?</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {SYMPTOMS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => toggleSymptom(s.value)}
                  className={`trigger-chip ${symptoms.includes(s.value) ? 'selected' : ''}`}
                >
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setPhase('triggers')} className="flex-1 py-3 rounded-xl border border-sand-200 font-medium text-ink-600">
                Back
              </button>
              <button
                onClick={() => setPhase('note')}
                className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-semibold"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase: Note */}
        {phase === 'note' && (
          <motion.div
            key="note"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-5"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-ink-900">Want to add a note?</h2>
              <p className="text-sm text-ink-500">Kuch likhna chahoge? (Optional)</p>
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write something about how you feel..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-white/60 border border-sand-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-400"
              maxLength={500}
            />
            <p className="text-xs text-ink-400 text-right">{note.length}/500</p>

            <div className="flex gap-3">
              <button onClick={() => setPhase('symptoms')} className="flex-1 py-3 rounded-xl border border-sand-200 font-medium text-ink-600">
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold flex items-center justify-center gap-2"
              >
                <Check size={18} /> Save
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase: Done */}
        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 pt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-7xl"
            >
              🪔
            </motion.div>
            <h2 className="text-2xl font-bold text-ink-900">Check-in Complete!</h2>
            <p className="text-ink-600">Bahut acche! Apna khayal rakhna 💛</p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/breathe')}
                className="flex-1 py-3 rounded-xl glass-card font-medium text-ink-700"
              >
                🧘 Breathe
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-semibold"
              >
                Go Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

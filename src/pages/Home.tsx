import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SmilePlus, BookOpen, Wind, Bot, TrendingUp, Phone, Settings, Flame } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useMoodStore } from '../store/moodStore';
import { useUIStore } from '../store/uiStore';
import { t } from '../i18n';
import { getDailyQuote } from '../constants/quotes';
import { getRandomTip } from '../constants/wellnessTips';
import { CRISIS_CONTACTS } from '../constants/crisisContacts';
import { db } from '../services/db.service';
import type { StreakData } from '../types/user.types';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'home.greeting.morning';
  if (hour < 17) return 'home.greeting.afternoon';
  if (hour < 21) return 'home.greeting.evening';
  return 'home.greeting.night';
}

function getGreetingEmoji(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅';
  if (hour < 17) return '☀️';
  if (hour < 21) return '🌇';
  return '🌙';
}

export default function Home() {
  const profile = useUserStore((s) => s.profile);
  const todayEntry = useMoodStore((s) => s.todayEntry);
  const entries = useMoodStore((s) => s.entries);
  const lang = useUIStore((s) => s.language);
  const navigate = useNavigate();
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    db.streakData.get(1).then((s) => s && setStreak(s));
  }, [todayEntry]);

  const dailyQuote = getDailyQuote(profile?.spiritualQuotesEnabled);
  const consecutiveLow = entries.slice(0, 3).every((e) => e.moodScore <= 2) && entries.length >= 3;
  const tip = todayEntry ? getRandomTip(todayEntry.moodScore) : null;

  return (
    <div className="page-enter space-y-4">
      {/* Greeting Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-500">{getGreetingEmoji()} {t(getGreeting(), lang)}</p>
            <h1 className="text-2xl font-bold text-ink-900 mt-0.5" data-testid="home-greeting">
              {profile?.name || 'Friend'}!
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {streak && streak.currentStreak > 0 && (
              <div className={`streak-fire ${streak.currentStreak >= 7 ? 'hot' : ''}`}>
                <Flame size={16} /> {streak.currentStreak}
              </div>
            )}
            <Link to="/settings" className="p-2 rounded-lg hover:bg-sand-100 transition-colors" aria-label="Settings">
              <Settings size={20} className="text-ink-500" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Mood Check-In Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {todayEntry ? (
          <div className="glass-card p-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {todayEntry.moodScore === 1 ? '😰' : todayEntry.moodScore === 2 ? '😔' : todayEntry.moodScore === 3 ? '😐' : todayEntry.moodScore === 4 ? '🙂' : '😊'}
              </span>
              <div>
                <p className="font-semibold text-ink-900">{t('home.checkin.done', lang)}</p>
                <p className="text-sm text-ink-500">{todayEntry.moodLabel}</p>
              </div>
            </div>
            {tip && (
              <div className="mt-3 p-3 rounded-lg bg-primary-50/50 border border-primary-100">
                <p className="text-sm text-ink-700">💡 {tip.tip_en}</p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/checkin')}
            className="w-full glass-card p-5 text-left hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-500">{t('home.checkin.prompt', lang)}</p>
                <p className="font-semibold text-primary-600 mt-1 group-hover:text-primary-700">
                  {t('home.checkin.cta', lang)} →
                </p>
              </div>
              <div className="text-4xl animate-float">😊</div>
            </div>
          </button>
        )}
      </motion.div>

      {/* Crisis Banner (only if consecutive low mood) */}
      {consecutiveLow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="crisis-banner"
        >
          <p className="font-semibold text-ink-800">💛 Hum yahan hain (We are here)</p>
          <p className="text-sm text-ink-600 mt-1">
            We've noticed you've been having some tough days. It's okay to ask for help.
          </p>
          <div className="flex gap-2 mt-3">
            <a
              href={`tel:${CRISIS_CONTACTS[0].number}`}
              className="flex-1 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold text-center"
            >
              📞 {t('crisis.call', lang)}
            </a>
            <Link
              to="/crisis"
              className="flex-1 py-2 rounded-lg border border-primary-300 text-primary-700 text-sm font-semibold text-center"
            >
              More Help
            </Link>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-sm font-semibold text-ink-500 mb-3">{t('home.quick_actions', lang)}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { path: '/checkin', icon: SmilePlus, label: 'Mood Check-in', color: 'from-orange-400 to-amber-500', emoji: '😊' },
            { path: '/journal', icon: BookOpen, label: 'Write in Journal', color: 'from-emerald-400 to-teal-500', emoji: '📖' },
            { path: '/breathe', icon: Wind, label: 'Breathing Exercise', color: 'from-blue-400 to-indigo-500', emoji: '🧘' },
            { path: '/chat', icon: Bot, label: 'Chat with Sahay', color: 'from-violet-400 to-purple-500', emoji: '🤖' },
            { path: '/history', icon: TrendingUp, label: 'Mood History', color: 'from-cyan-400 to-sky-500', emoji: '📊' },
            { path: '/crisis', icon: Phone, label: 'Get Help', color: 'from-pink-400 to-rose-500', emoji: '🆘' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="glass-card p-4 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-sm font-semibold text-ink-800 mt-2 group-hover:text-primary-600 transition-colors">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <p className="text-xs text-ink-400 mb-2">✨ Daily Inspiration</p>
        <blockquote className="text-sm text-ink-700 italic leading-relaxed">
          "{dailyQuote.text}"
        </blockquote>
        <p className="text-xs text-ink-500 mt-2 font-medium">— {dailyQuote.author}</p>
      </motion.div>
    </div>
  );
}

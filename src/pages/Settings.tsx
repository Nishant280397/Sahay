import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Trash2, Shield, ChevronLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useUIStore } from '../store/uiStore';

export default function Settings() {
  const profile = useUserStore((s) => s.profile);
  const { updateProfile, resetProfile } = useUserStore();
  const { language, isDarkMode, toggleDarkMode, setLanguage } = useUIStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="page-enter space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 rounded-lg hover:bg-sand-100 transition-colors">
          <ChevronLeft size={20} className="text-ink-600" />
        </Link>
        <h1 className="text-2xl font-bold text-ink-900">⚙️ Settings</h1>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-2xl text-white font-bold">
            {profile?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold text-lg text-ink-900">{profile?.name || 'Student'}</p>
            <p className="text-sm text-ink-500">
              {profile?.targetExam || 'Exam'} · Attempt {profile?.attemptNumber || 1}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings List */}
      <div className="space-y-2">
        {/* Language */}
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-ink-500" />
            <div>
              <p className="font-medium text-ink-800">Language</p>
              <p className="text-xs text-ink-500">Switch between English & Hindi</p>
            </div>
          </div>
          <div className="flex gap-1 bg-sand-100 p-0.5 rounded-lg">
            {(['en', 'hi'] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLanguage(l);
                  updateProfile({ languagePreference: l });
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  language === l ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
                }`}
              >
                {l === 'en' ? 'EN' : 'हि'}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon size={20} className="text-ink-500" /> : <Sun size={20} className="text-ink-500" />}
            <div>
              <p className="font-medium text-ink-800">Dark Mode</p>
              <p className="text-xs text-ink-500">For late-night study sessions</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-7 rounded-full p-0.5 transition-all ${
              isDarkMode ? 'bg-primary-500' : 'bg-sand-200'
            }`}
            role="switch"
            aria-checked={isDarkMode}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
              isDarkMode ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Spiritual Quotes */}
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-ink-500" />
            <div>
              <p className="font-medium text-ink-800">Spiritual Quotes</p>
              <p className="text-xs text-ink-500">Bhagavad Gita & Indian wisdom</p>
            </div>
          </div>
          <button
            onClick={() => updateProfile({ spiritualQuotesEnabled: !profile?.spiritualQuotesEnabled })}
            className={`w-12 h-7 rounded-full p-0.5 transition-all ${
              profile?.spiritualQuotesEnabled ? 'bg-primary-500' : 'bg-sand-200'
            }`}
            role="switch"
            aria-checked={profile?.spiritualQuotesEnabled}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
              profile?.spiritualQuotesEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="glass-card p-4 flex items-start gap-3">
        <Shield size={20} className="text-secondary-500 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-ink-800">Privacy First 🔒</p>
          <p className="text-xs text-ink-500 leading-relaxed mt-1">
            All your data stays on this device. No personal information is ever sent to any server.
            Your mood, journal, and conversations are 100% private.
          </p>
        </div>
      </div>

      {/* Reset */}
      <div className="glass-card p-4">
        {showResetConfirm ? (
          <div className="space-y-3">
            <p className="text-sm text-ink-700 font-medium">⚠️ This will delete ALL your data permanently.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-lg border border-sand-200 text-sm font-medium text-ink-600"
              >
                Cancel
              </button>
              <button
                onClick={resetProfile}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-3 w-full text-left"
          >
            <Trash2 size={20} className="text-red-400" />
            <div>
              <p className="font-medium text-red-600">Reset App Data</p>
              <p className="text-xs text-ink-500">Delete all data and start fresh</p>
            </div>
          </button>
        )}
      </div>

      {/* About */}
      <div className="text-center text-xs text-ink-400 pb-4 space-y-1">
        <p>Sahay (साहय) v1.0.0</p>
        <p>"Pariksha ke samay, hum hain saath"</p>
        <p>Made with 💛 for Indian students</p>
      </div>
    </div>
  );
}

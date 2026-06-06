import { motion } from 'framer-motion';
import { Phone, Heart, ExternalLink, Shield } from 'lucide-react';
import { CRISIS_CONTACTS } from '../constants/crisisContacts';

export default function Crisis() {
  return (
    <div className="page-enter space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="text-5xl">💛</div>
        <h1 className="text-2xl font-bold text-ink-900">You're Not Alone</h1>
        <p className="text-ink-600 text-sm leading-relaxed">
          Tum akele nahi ho. Madad hamesha available hai. Kisi se baat karna strength hai, kamzori nahi.
        </p>
      </motion.div>

      {/* Helplines */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-ink-500 flex items-center gap-2">
          <Phone size={14} /> Helpline Numbers
        </h2>

        {CRISIS_CONTACTS.map((contact, i) => (
          <motion.a
            key={contact.name}
            href={`tel:${contact.number}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex items-center gap-4 hover:shadow-md transition-all group block"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              contact.type === 'CRISIS' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
            }`}>
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink-900">{contact.name}</p>
                {contact.isTollFree && (
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
                    TOLL-FREE
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-600">{contact.description}</p>
              <p className="text-xs text-ink-400 font-devanagari">{contact.hindi}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-primary-600">{contact.number}</span>
                <span className="text-xs text-ink-400">· {contact.hours}</span>
              </div>
            </div>
            <ExternalLink size={16} className="text-ink-300 group-hover:text-primary-500 transition-colors" />
          </motion.a>
        ))}
      </div>

      {/* Coping Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5 space-y-4"
      >
        <h2 className="font-semibold text-ink-900 flex items-center gap-2">
          <Heart size={16} className="text-accent-500" /> If you're feeling overwhelmed...
        </h2>

        <div className="space-y-3">
          {[
            { step: '1', text: 'Take 5 deep breaths, slowly. Count each one.', emoji: '🫁' },
            { step: '2', text: 'Drink a glass of water. Stay hydrated.', emoji: '💧' },
            { step: '3', text: 'Tell someone you trust how you feel — a friend, family member, or call a helpline.', emoji: '📞' },
            { step: '4', text: "Remember: This feeling is temporary. You've faced hard things before.", emoji: '⭐' },
            { step: '5', text: 'Your worth is not defined by any exam score or rank.', emoji: '💛' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shrink-0">
                {item.step}
              </span>
              <p className="text-sm text-ink-700 leading-relaxed">
                {item.emoji} {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2 text-xs text-ink-400"
      >
        <Shield size={14} className="shrink-0 mt-0.5" />
        <p>
          Your data stays on your device. Sahay does not share your information with anyone.
          We're here to help, not judge.
        </p>
      </motion.div>
    </div>
  );
}

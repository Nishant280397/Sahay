import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenLine, Trash2 } from 'lucide-react';
import { useJournalStore } from '../store/journalStore';
import { useUIStore } from '../store/uiStore';
import { getRandomPrompts, getDailyPrompt } from '../constants/journalPrompts';

export default function Journal() {
  const { entries, addEntry, deleteEntry } = useJournalStore();
  const { showToast } = useUIStore();
  const [isWriting, setIsWriting] = useState(false);
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [prompts] = useState(getRandomPrompts(3));

  const handleSave = async () => {
    if (content.trim().length < 3) return;
    await addEntry(content, selectedPrompt || undefined);
    setContent('');
    setSelectedPrompt(null);
    setIsWriting(false);
    showToast('Entry saved! 📖');
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="page-enter space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-900">📖 My Journal</h1>
        {!isWriting && (
          <button
            onClick={() => setIsWriting(true)}
            className="px-4 py-2 rounded-xl bg-primary-500 text-white font-semibold text-sm flex items-center gap-1.5"
          >
            <PenLine size={16} /> New Entry
          </button>
        )}
      </div>

      {/* Writing Mode */}
      {isWriting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 space-y-4"
        >
          {/* Daily Prompt */}
          <div className="p-3 rounded-lg bg-secondary-50 border border-secondary-100">
            <p className="text-xs text-secondary-600 font-medium mb-1">✨ Today's Prompt</p>
            <p className="text-sm text-ink-700 italic">{getDailyPrompt()}</p>
          </div>

          {/* Quick Prompts */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedPrompt(p);
                  setContent(p + '\n\n');
                }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs border transition-all ${
                  selectedPrompt === p
                    ? 'border-primary-400 bg-primary-50 text-primary-700'
                    : 'border-sand-200 text-ink-600 hover:border-primary-300'
                }`}
              >
                💭 {p.slice(0, 35)}...
              </button>
            ))}
          </div>

          {/* Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Apne thoughts yahan likho... (Write your thoughts here...)"
            className="w-full h-48 px-4 py-3 rounded-xl bg-white/50 border border-sand-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 leading-relaxed"
            maxLength={2000}
          />

          <div className="flex items-center justify-between">
            <span className={`text-xs ${wordCount >= 50 ? 'text-secondary-600' : 'text-ink-400'}`}>
              {wordCount} words {wordCount < 50 && '(try for 50+)'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setIsWriting(false); setContent(''); }}
                className="px-4 py-2 rounded-lg text-sm text-ink-600 hover:bg-sand-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={content.trim().length < 3}
                className="px-5 py-2 rounded-lg bg-primary-500 text-white font-semibold text-sm disabled:opacity-40"
              >
                Save Entry
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Entry List */}
      {entries.length === 0 && !isWriting ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-4">📝</div>
          <p className="text-ink-600 font-medium">No entries yet</p>
          <p className="text-sm text-ink-400 mt-1">Start writing to reflect on your journey</p>
          <button
            onClick={() => setIsWriting(true)}
            className="mt-4 px-6 py-2.5 rounded-xl bg-primary-500 text-white font-semibold text-sm"
          >
            Write First Entry
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-ink-400">
                    {new Date(entry.timestamp).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    {' · '}{entry.wordCount} words
                  </p>
                  <p className="text-sm text-ink-800 mt-1.5 line-clamp-3 leading-relaxed">
                    {entry.content}
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => entry.id && deleteEntry(entry.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-ink-400 hover:text-red-500 transition-colors"
                  aria-label="Delete entry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

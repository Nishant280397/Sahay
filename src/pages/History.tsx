import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useMoodStore } from '../store/moodStore';
import { MOOD_SCALE } from '../constants/moods';

type ViewRange = '7' | '30';

export default function History() {
  const { entries } = useMoodStore();
  const [range, setRange] = useState<ViewRange>('7');

  const filteredEntries = useMemo(() => {
    const days = range === '7' ? 7 : 30;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];
    return entries
      .filter((e) => e.date >= cutoffStr)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [entries, range]);

  const chartData = useMemo(() =>
    filteredEntries.map((e) => ({
      date: new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      mood: e.moodScore,
      fill: MOOD_SCALE.find((m) => m.score === e.moodScore)?.color || '#EAB308',
    })),
    [filteredEntries]
  );

  const distributionData = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filteredEntries.forEach((e) => { counts[e.moodScore]++; });
    return MOOD_SCALE.map((m) => ({
      name: m.en,
      value: counts[m.score],
      fill: m.color,
      emoji: m.emoji,
    })).filter((d) => d.value > 0);
  }, [filteredEntries]);

  const triggerData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEntries.forEach((e) => {
      e.triggers.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name: name.replace(/_/g, ' ').toLowerCase(), count }));
  }, [filteredEntries]);

  const avgMood = useMemo(() => {
    if (filteredEntries.length === 0) return 0;
    return Math.round((filteredEntries.reduce((s, e) => s + e.moodScore, 0) / filteredEntries.length) * 10) / 10;
  }, [filteredEntries]);

  // Insights
  const insights = useMemo(() => {
    const msgs: { type: 'positive' | 'warning' | 'insight'; msg: string }[] = [];
    const recent3 = entries.slice(0, 3);
    
    if (recent3.length >= 3 && recent3.every((e) => e.moodScore <= 2)) {
      msgs.push({ type: 'warning', msg: 'Teen din se mood low hai. Thoda rest lo aur kisi se baat karo. 💛' });
    }
    
    if (filteredEntries.length >= 5) {
      const last5 = filteredEntries.slice(-5);
      if (last5[4]?.moodScore > last5[0]?.moodScore) {
        msgs.push({ type: 'positive', msg: 'Tumhari mood improve ho rahi hai! Keep it up! 🌟' });
      }
    }

    if (triggerData.length > 0) {
      msgs.push({ type: 'insight', msg: `Sabse zyada trigger: ${triggerData[0].name}. Is par dhyan do. 🎯` });
    }

    return msgs;
  }, [entries, filteredEntries, triggerData]);

  if (entries.length === 0) {
    return (
      <div className="page-enter text-center py-16">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-bold text-ink-900">No mood data yet</h2>
        <p className="text-sm text-ink-500 mt-2">Start checking in daily to see your mood trends!</p>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-5">
      <h1 className="text-2xl font-bold text-ink-900">📊 Mood History</h1>

      {/* Range Toggle */}
      <div className="flex gap-2 bg-sand-100 p-1 rounded-xl">
        {(['7', '30'] as ViewRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              range === r ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'
            }`}
          >
            {r === '7' ? '7 Days' : '30 Days'}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="glass-card p-3 text-center">
          <p className="text-2xl font-bold text-primary-600">{filteredEntries.length}</p>
          <p className="text-xs text-ink-500">Check-ins</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-2xl font-bold text-secondary-600">{avgMood}</p>
          <p className="text-xs text-ink-500">Avg Mood</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-2xl font-bold text-calm-600">
            {MOOD_SCALE.find((m) => m.score === Math.round(avgMood))?.emoji || '😐'}
          </p>
          <p className="text-xs text-ink-500">Overall</p>
        </div>
      </div>

      {/* Bar Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <p className="text-sm font-semibold text-ink-700 mb-3">Mood Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value: any) => [MOOD_SCALE.find((m) => m.score === value)?.en || value, 'Mood']}
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="mood" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Distribution */}
      {distributionData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <p className="text-sm font-semibold text-ink-700 mb-3">Mood Distribution</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie data={distributionData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
                  {distributionData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5">
              {distributionData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.fill }} />
                  <span>{d.emoji} {d.name}</span>
                  <span className="text-ink-400">({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Triggers */}
      {triggerData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <p className="text-sm font-semibold text-ink-700 mb-3">Top Stress Triggers</p>
          <div className="space-y-2">
            {triggerData.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-xs font-mono text-ink-400 w-4">{i + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-ink-700 capitalize">{t.name}</span>
                    <span className="text-xs text-ink-400">{t.count}x</span>
                  </div>
                  <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-400 rounded-full transition-all"
                      style={{ width: `${(t.count / (triggerData[0]?.count || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <p className="text-sm font-semibold text-ink-700">💡 Insights</p>
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`glass-card p-3 border-l-4 ${
                insight.type === 'warning'
                  ? 'border-l-orange-400'
                  : insight.type === 'positive'
                  ? 'border-l-green-400'
                  : 'border-l-blue-400'
              }`}
            >
              <p className="text-sm text-ink-700">{insight.msg}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

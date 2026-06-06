export const EXAM_CALENDAR = [
  { exam: 'JEE_MAIN', name: 'JEE Main (Session 1)', date: '2026-01-22', resultDate: '2026-02-12', icon: '🔬', color: '#3B82F6' },
  { exam: 'JEE_MAIN', name: 'JEE Main (Session 2)', date: '2026-04-02', resultDate: '2026-04-25', icon: '🔬', color: '#3B82F6' },
  { exam: 'GATE', name: 'GATE 2026', date: '2026-02-01', resultDate: '2026-03-19', icon: '⚙️', color: '#8B5CF6' },
  { exam: 'CBSE_BOARDS', name: 'CBSE Class 12', date: '2026-02-15', resultDate: '2026-05-20', icon: '📚', color: '#059669' },
  { exam: 'CUET', name: 'CUET UG 2026', date: '2026-05-15', resultDate: '2026-06-30', icon: '🎓', color: '#D97706' },
  { exam: 'NEET', name: 'NEET UG 2026', date: '2026-05-03', resultDate: '2026-06-10', icon: '🩺', color: '#DC2626' },
  { exam: 'JEE_ADVANCED', name: 'JEE Advanced 2026', date: '2026-05-24', resultDate: '2026-06-10', icon: '🚀', color: '#2563EB' },
  { exam: 'UPSC', name: 'UPSC Prelims 2026', date: '2026-05-24', resultDate: '2026-07-01', icon: '🏛️', color: '#7C3AED' },
  { exam: 'CAT', name: 'CAT 2026', date: '2026-11-29', resultDate: '2027-01-05', icon: '📊', color: '#0891B2' },
];

export const EXAM_OPTIONS = [
  { value: 'NEET', label: 'NEET', emoji: '🩺', description: 'Medical entrance' },
  { value: 'JEE_MAIN', label: 'JEE Main', emoji: '🔬', description: 'Engineering entrance' },
  { value: 'JEE_ADVANCED', label: 'JEE Advanced', emoji: '🚀', description: 'IIT entrance' },
  { value: 'CUET', label: 'CUET', emoji: '🎓', description: 'University entrance' },
  { value: 'CAT', label: 'CAT', emoji: '📊', description: 'MBA entrance' },
  { value: 'GATE', label: 'GATE', emoji: '⚙️', description: 'PG engineering' },
  { value: 'UPSC', label: 'UPSC', emoji: '🏛️', description: 'Civil services' },
  { value: 'CBSE_BOARDS', label: 'CBSE Boards', emoji: '📚', description: 'Board exams' },
  { value: 'STATE_BOARDS', label: 'State Boards', emoji: '📖', description: 'State board exams' },
  { value: 'OTHER', label: 'Other', emoji: '📝', description: 'Other exam' },
];

export function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function isExamSoon(examDate?: string): boolean {
  if (!examDate) return false;
  const days = getDaysUntil(examDate);
  return days >= 0 && days <= 14;
}

import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import { useMoodStore } from './store/moodStore';
import { useJournalStore } from './store/journalStore';
import { useUIStore } from './store/uiStore';
import AppShell from './components/layout/AppShell';

const Onboarding = lazy(() => import('./pages/Onboarding'));
const Home = lazy(() => import('./pages/Home'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const Journal = lazy(() => import('./pages/Journal'));
const Breathe = lazy(() => import('./pages/Breathe'));
const Chat = lazy(() => import('./pages/Chat'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));
const Crisis = lazy(() => import('./pages/Crisis'));

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in">
        <div className="text-5xl mb-4 animate-float">🪔</div>
        <p className="text-lg font-semibold text-primary-700">Sahay</p>
        <p className="text-sm text-ink-500 mt-1">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const { profile, isLoading, loadProfile } = useUserStore();
  const { loadEntries: loadMood } = useMoodStore();
  const { loadEntries: loadJournal } = useJournalStore();
  const toastMessage = useUIStore((s) => s.toastMessage);

  useEffect(() => {
    loadProfile();
    loadMood();
    loadJournal();
  }, [loadProfile, loadMood, loadJournal]);

  if (isLoading) return <LoadingScreen />;

  const isOnboarded = profile?.onboardingComplete;

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {!isOnboarded ? (
            <>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/onboarding" replace />} />
            </>
          ) : (
            <>
              <Route element={<AppShell />}>
                <Route path="/" element={<Home />} />
                <Route path="/checkin" element={<CheckIn />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/breathe" element={<Breathe />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/crisis" element={<Crisis />} />
              </Route>
              <Route path="/onboarding" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>

      {/* Global Toast */}
      {toastMessage && (
        <div className="toast">{toastMessage}</div>
      )}
    </>
  );
}

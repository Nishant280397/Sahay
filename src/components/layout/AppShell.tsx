import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppShell() {
  return (
    <div className="w-full flex flex-col min-h-screen min-h-dvh">
      <main className="flex-1 safe-bottom w-full">
        <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 py-4 md:py-8">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

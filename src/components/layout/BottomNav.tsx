import { NavLink } from 'react-router-dom';
import { Home, SmilePlus, BookOpen, Wind, Bot } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { t } from '../../i18n';

const navItems = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/checkin', icon: SmilePlus, labelKey: 'nav.checkin' },
  { path: '/journal', icon: BookOpen, labelKey: 'nav.journal' },
  { path: '/breathe', icon: Wind, labelKey: 'nav.breathe' },
  { path: '/chat', icon: Bot, labelKey: 'nav.chat' },
];

export default function BottomNav() {
  const lang = useUIStore((s) => s.language);

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map(({ path, icon: Icon, labelKey }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
          aria-label={t(labelKey, lang)}
        >
          <Icon size={22} strokeWidth={2} />
          <span className="text-[0.625rem] font-medium text-center">{t(labelKey, lang)}</span>
        </NavLink>
      ))}
    </nav>
  );
}

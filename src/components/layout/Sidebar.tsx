import React from 'react';
import { Home, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home, bg: 'var(--neu-pink)' },
    { path: '/league', label: 'Leagues', icon: Trophy, bg: 'var(--neu-yellow)' },
    { path: '/profile', label: 'Profile', icon: User, bg: 'var(--neu-blue)' },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 lg:w-64 bg-[var(--neu-bg)] z-40 py-6">
      <div className="neu-puck bg-white mx-auto mb-10 w-12 h-12">
        <span className="font-data font-black text-sm text-[var(--ink)]">QA</span>
      </div>
      
      <nav className="flex flex-col gap-4 w-full px-4 lg:px-6">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 font-bold uppercase text-sm tracking-wide transition-all justify-center lg:justify-start ${
                isActive ? 'neu-panel' : 'hover:bg-white/50 rounded-2xl'
              }`}
              style={{ background: isActive ? item.bg : 'transparent' }}
            >
              <item.icon size={20} className={isActive ? 'text-[var(--ink)]' : 'text-[var(--ink)]/50'} />
              <span className={`hidden lg:inline ${isActive ? 'text-[var(--ink)]' : 'text-[var(--ink)]/50'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
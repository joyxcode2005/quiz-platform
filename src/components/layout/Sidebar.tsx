import React from 'react';
import { Home, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/league', label: 'Leagues', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 lg:w-64 bg-white border-r-4 border-[var(--ink)] z-40 py-6">
      <div className="stamp text-[var(--ink)] font-data font-black text-sm px-3 py-1.5 bg-white mb-10 mx-auto">
        QA
      </div>
      <nav className="flex flex-col gap-2 w-full px-3">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-3 font-bold uppercase text-sm tracking-wide transition-colors brutal-border justify-center lg:justify-start ${
                isActive ? 'bg-[var(--signal)] text-white' : 'bg-white hover:bg-[var(--bone)]'
              }`}
            >
              <item.icon size={20} />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
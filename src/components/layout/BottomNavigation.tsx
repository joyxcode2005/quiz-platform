import React from 'react';
import { Home, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/league', label: 'Leagues', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden h-20 bg-white border-t-[3px] border-[var(--ink)] fixed bottom-0 left-0 w-full flex justify-around items-stretch px-2 z-50">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path !== '/' && location.pathname.startsWith(item.path));

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="relative flex flex-col items-center justify-center w-full h-full gap-1"
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[var(--signal)]" />
            )}
            <item.icon
              size={22}
              color={isActive ? '#FF3B0A' : '#0D0D0D'}
              strokeWidth={isActive ? 3 : 2}
            />
            <span
              className={`text-[10px] font-bold uppercase tracking-wide font-data ${
                isActive ? 'text-[var(--signal)]' : 'text-[var(--ink)]'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
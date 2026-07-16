import React from 'react';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/home';

  const getTitle = () => {
    if (location.pathname.includes('/league/leaderboard')) return 'Leaderboard';
    if (location.pathname.includes('/league/results')) return 'Match Results';
    if (location.pathname.includes('/league/read/schedule')) return 'Read Schedule';
    if (location.pathname.includes('/league/read/open')) return 'Interest to Read';
    if (location.pathname.includes('/league')) return 'Draw League';
    if (location.pathname.includes('/profile')) return 'Profile';
    return 'Quiz Arena';
  };

  return (
    <div className="sticky top-0 z-10 bg-white">
      <header className="h-16 border-b-[3px] border-[var(--ink)] flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          {isHome ? (
            <button className="p-1.5 brutal-border brutal-shadow-sm brutal-press bg-white">
              <Menu size={22} color="#0D0D0D" />
            </button>
          ) : (
            <button onClick={() => navigate(-1)} className="p-1.5 brutal-border brutal-shadow-sm brutal-press bg-white">
              <ChevronLeft size={22} color="#0D0D0D" />
            </button>
          )}
          <h1 className="font-black text-base uppercase tracking-tight">{getTitle()}</h1>
        </div>

        {isHome ? (
          <button className="p-1.5 brutal-border brutal-shadow-sm brutal-press bg-white">
            <Bell size={22} color="#0D0D0D" />
          </button>
        ) : location.pathname.includes('/profile') ? (
          <button className="p-1.5 brutal-border brutal-shadow-sm brutal-press bg-white">
            <Menu size={22} color="#0D0D0D" />
          </button>
        ) : (
          <span className="w-9" />
        )}
      </header>
      <div className="hazard-stripe" />
    </div>
  );
};
import React from 'react';
import { Menu, Bell, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/home' || location.pathname === '/';

  const getTitle = () => {
    if (location.pathname.includes('/league/leaderboard')) return 'Leaderboard';
    if (location.pathname.includes('/league/results')) return 'Match Results';
    if (location.pathname.includes('/league/read/schedule')) return 'Read Schedule';
    if (location.pathname.includes('/league/read/open')) return 'Open Games';
    if (location.pathname.includes('/league/draws')) return 'Weekly Draws';
    if (location.pathname.includes('/league/season')) return 'Season Standings';
    if (location.pathname.includes('/league')) return 'League Menu';
    if (location.pathname.includes('/profile')) return 'Profile';
    return 'FLQL';
  };

  const NavButton = ({ onClick, children }: { onClick?: () => void, children: React.ReactNode }) => (
    <motion.button 
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
    >
      {children}
    </motion.button>
  );

  return (
    <header className="h-20 bg-[#141414]/80 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {isHome ? (
          <NavButton><Menu size={20} strokeWidth={2.5} /></NavButton>
        ) : (
          <NavButton onClick={() => navigate(-1)}><ChevronLeft size={20} strokeWidth={2.5} /></NavButton>
        )}
        <h1 className="font-black uppercase text-xl tracking-wide text-white drop-shadow-sm">{getTitle()}</h1>
      </div>
      
      {isHome ? (
        <NavButton><Bell size={20} strokeWidth={2.5} /></NavButton>
      ) : location.pathname.includes('/profile') ? (
        <NavButton><Menu size={20} strokeWidth={2.5} /></NavButton>
      ) : null}
    </header>
  );
};
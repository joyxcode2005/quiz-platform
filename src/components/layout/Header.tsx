import React from 'react';
import { Menu, Bell, ChevronLeft, Home, Trophy, User } from 'lucide-react';
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
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 shrink-0"
    >
      {children}
    </motion.button>
  );

  const desktopNavItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/league', label: 'Leagues', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="h-20 bg-[#141414]/80 backdrop-blur-2xl border-b border-white/10 flex items-center px-4 sticky top-0 z-50">
      
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between w-full">
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
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <div className="hidden md:flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div 
          onClick={() => navigate('/home')}
          className="font-data font-black text-xl text-white px-3.5 py-1.5 border-[2px] border-dashed border-white/50 transform -rotate-3 bg-black shadow-[3px_3px_0_rgba(255,255,255,0.1)] tracking-widest cursor-pointer hover:scale-105 transition-transform"
        >
          FLQL
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-3">
          {desktopNavItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                  isActive 
                    ? 'bg-[#FF7A1A] text-[#141414] shadow-[0_0_15px_rgba(255,122,26,0.4)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={16} strokeWidth={isActive ? 3 : 2.5} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <NavButton><Bell size={20} strokeWidth={2.5} /></NavButton>
        </div>
      </div>

    </header>
  );
};
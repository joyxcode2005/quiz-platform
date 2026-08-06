import React from 'react';
import { ChevronLeft, Gamepad2, Home, Trophy, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from "../../assets/logo.png"

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

  const navItems = [
    { path: '/home', label: 'Home', icon: Home, color: '#FF4D1C' },
    { path: '/league', label: 'Leagues', icon: Trophy, color: '#FFC800' },
    { path: '/profile', label: 'Profile', icon: User, color: '#FF7A1A' },
  ];

  return (
    <>
      <header className="bg-[#141414]/80 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 px-4 md:bg-transparent md:backdrop-blur-none md:border-b-0">

        {/* ================= MOBILE HEADER (single row) ================= */}
        <div className="md:hidden flex items-center justify-between w-full py-3">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 min-w-0"
          >
            {!isHome && (
              <span
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="w-8 h-8 -ml-1 mr-0.5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0"
              >
                <ChevronLeft size={16} strokeWidth={2.5} color="#FFFFFF" />
              </span>
            )}
            <span className="relative shrink-0 w-10 h-10 rounded-full p-[2px] bg-gradient-to-br from-[#FF7A1A] to-[#FFC800] shadow-[0_0_16px_rgba(255,122,26,0.35)]">
              <img
                src={logo}
                alt="FLQL"
                className="w-full h-full rounded-full object-cover border-2 border-[#141414]"
              />
            </span>
            <h1 className="font-black uppercase text-lg tracking-wide text-white drop-shadow-sm truncate">
              {getTitle()}
            </h1>
          </button>

          {/* Bare nav icons, no rectangular container — active state is a circular puck */}
          <div className="flex items-center gap-4 shrink-0">
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <motion.button
                  key={item.path}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate(item.path)}
                  className="relative flex items-center justify-center w-9 h-9"
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-nav-puck"
                      className="absolute inset-0 rounded-full"
                      style={{ background: item.color }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon
                    size={18}
                    strokeWidth={isActive ? 2.5 : 2}
                    color={isActive ? '#141414' : '#FFFFFF'}
                    className={`relative z-10 ${!isActive ? 'opacity-50' : ''}`}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ================= DESKTOP NAVBAR ================= */}
        <div className="hidden md:flex items-center justify-between w-full max-w-7xl mx-auto h-20">
          {/* Left spacer — the big background blob is the brand mark on desktop now, no header logo needed */}
          <div className="w-11" />

          {/* Nav Links — its own floating capsule, since the header itself is transparent on desktop now */}
          <nav className="flex items-center gap-3 bg-[#141414]/80 backdrop-blur-2xl border border-white/10 rounded-full px-2 py-2 shadow-lg">
            {navItems.map((item) => {
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

          {/* Right side intentionally empty now — see floating live-game button below */}
          <div className="w-11" />
        </div>

      </header>

      {/* ================= FLOATING LIVE-GAME BUTTON ================= */}
      {/* Replaces the old notification bell. Hovers just under the header, pinned right. */}
      {/* TODO: wire onClick to route the player into their scheduled live game, if any */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/live')}
        aria-label="Go to live game"
        className="fixed top-[68px] right-4 md:top-[92px] md:right-8 z-40 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#141414]/90 backdrop-blur-xl border border-[#FF7A1A]/50 shadow-[0_4px_20px_rgba(0,0,0,0.45)] flex items-center justify-center text-[#FF7A1A] hover:bg-[#FF7A1A] hover:text-[#141414] transition-colors"
      >
        <Gamepad2 size={20} strokeWidth={2.5} />
      </motion.button>
    </>
  );
};
import React from 'react';
import { Home, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tapTransition } from '../../lib/animations';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: 'HOME', icon: Home },
    { path: '/league', label: 'LEAGUES', icon: Trophy },
    { path: '/profile', label: 'PROFILE', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col h-full w-20 lg:w-64 bg-[#141414] border-r border-white/10 z-40 overflow-hidden shrink-0 relative">
      {/* Ambient Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#FF7A1A]/20 blur-[70px] rounded-full pointer-events-none" />

      {/* FLQL Logo */}
      <div className="relative z-10 w-fit mt-8 mb-10 mx-auto lg:mx-0 lg:ml-8">
        <div className="font-data font-black text-xl text-white px-3.5 py-2 border-[2px] border-dashed border-white/50 transform -rotate-6 bg-black shadow-[4px_4px_0_rgba(255,255,255,0.1)] tracking-widest">
          FLQL
        </div>
      </div>

      {/* Edge-to-Edge Navigation */}
      <nav className="relative z-10 flex flex-col w-full">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path || location.pathname.startsWith(item.path);
            
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.98, transition: tapTransition }}
              onClick={() => navigate(item.path)}
              className={`flex items-center justify-center lg:justify-start gap-4 py-4 lg:px-8 font-black uppercase text-sm tracking-widest transition-colors w-full outline-none ${
                isActive
                  ? 'bg-[#FF7A1A] text-[#141414]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} strokeWidth={2.5} className="shrink-0" />
              <span className="hidden lg:block mt-0.5">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};
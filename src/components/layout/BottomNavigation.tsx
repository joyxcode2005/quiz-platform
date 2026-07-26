import React from 'react';
import { Home, Trophy, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home, color: '#FF4D1C' },
    { path: '/league', label: 'Leagues', icon: Trophy, color: '#FFC800' },
    { path: '/profile', label: 'Profile', icon: User, color: '#FF7A1A' },
  ];

  return (
    <nav className="h-24 bg-[#141414]/80 backdrop-blur-2xl border-t border-white/10 fixed bottom-0 left-0 w-full flex justify-around items-center px-4 z-50 pb-4 pt-2">
      {navItems.map((item) => {
        const isActive = location.pathname.includes(item.path);
        
        return (
          <motion.button 
            key={item.path}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center gap-1 relative w-16"
          >
            {isActive ? (
              <motion.div 
                layoutId="nav-puck"
                className="absolute top-0 z-0 w-12 h-12 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                style={{ background: item.color }}
              />
            ) : null}
            <div className="relative z-10 h-11 flex items-center justify-center">
              <item.icon 
                size={22} 
                color={isActive ? '#141414' : '#FFFFFF'} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={!isActive ? 'opacity-50' : ''}
              />
            </div>
            <span className={`text-[9px] font-black uppercase font-data tracking-widest relative z-10 ${isActive ? 'text-white' : 'text-white/50'}`}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
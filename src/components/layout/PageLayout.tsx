import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { pageVariants } from '../../lib/animations';

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-dvh w-full bg-[#141414] overflow-hidden text-white relative">
      
      {/* ================= GLOBAL FIXED STATIC BACKGROUND ================= */}
      {/* Sitting safely outside the AnimatePresence block so it never moves! */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10 mix-blend-screen" style={{ backgroundImage: NOISE_TEXTURE }} />
        <div className="absolute -top-32 -left-32 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#FF7A1A]" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full bg-[#1F1F1F]" />
        <div className="absolute top-[30%] -right-10 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-[#FFC800] opacity-80" />
        <div className="absolute bottom-[10%] -left-10 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full bg-[#FF4D1C] opacity-70" />
        <div className="absolute -top-10 right-[20%] w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] rounded-full bg-[#FFD700] opacity-60" />
      </div>

      <Sidebar />

      {/* Z-10 ensures content glides OVER the background */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative scroll-smooth bg-transparent z-10">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 w-full pb-24 md:pb-8 flex flex-col"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>

      <div className="block md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};
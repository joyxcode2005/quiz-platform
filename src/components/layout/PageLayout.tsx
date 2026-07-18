import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { pageVariants } from '../../lib/animations';

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="w-full bg-[var(--bone)] min-h-screen relative flex flex-col">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 w-full pb-24 md:pb-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Hides the mobile bottom nav on desktop views */}
      <div className="block md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};
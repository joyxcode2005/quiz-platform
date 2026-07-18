import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';
import { pageVariants } from '../../lib/animations';

export const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="w-full bg-[var(--bone)] min-h-screen relative flex">
      <Sidebar />

      {/* 
        FIXED: Removed the hardcoded margins (md:ml-20 lg:ml-64).
        The layout is now structurally glued to the Sidebar. 
      */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
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

        <div className="block md:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};
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
    // Outer container locked to exactly the screen size, preventing body scroll
    <div className="flex h-dvh w-full bg-(--bone) overflow-hidden">
      
      {/* Sidebar sits here naturally, never scrolling */}
      <Sidebar />

      {/* Main content takes the remaining space and handles its own vertical scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden relative scroll-smooth">
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

      {/* Mobile bottom navigation */}
      <div className="block md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavigation />
      </div>
    </div>
  );
};
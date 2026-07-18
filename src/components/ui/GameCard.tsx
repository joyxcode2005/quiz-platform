import React from 'react';
import { motion } from 'framer-motion';
import { brutalTransition, tapTransition } from '../../lib/animations';

interface GameCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  interactive = true 
}) => {
  const content = (
    <>
      <div className="absolute inset-0 bg-[var(--ink)] translate-x-[4px] translate-y-[4px] z-0" />
      <motion.div
        className={`relative z-10 bg-white border-[3px] border-[var(--ink)] p-5 h-full w-full ${className}`}
        variants={interactive ? {
          initial: { x: 0, y: 0 },
          hover: { x: -2, y: -2, transition: brutalTransition },
          tap: { x: 4, y: 4, transition: tapTransition }
        } : {}}
      >
        {children}
      </motion.div>
    </>
  );

  if (interactive) {
    return (
      <motion.div
        onClick={onClick}
        className="relative cursor-pointer w-full h-full"
        whileHover="hover"
        whileTap="tap"
        initial="initial"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {content}
    </div>
  );
};
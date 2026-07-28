import type { Variants } from 'framer-motion';

export const brutalTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
} as const;

export const tapTransition = {
  type: "spring",
  stiffness: 600,
  damping: 15,
} as const;

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: brutalTransition },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.98 },
  show: { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    transition: brutalTransition 
  },
};
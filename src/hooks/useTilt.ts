import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface TiltOptions {
  /** Max rotation in degrees */
  max?: number;
  /** Hover scale */
  scale?: number;
  /** How far the drop-shadow travels, in px */
  shadowReach?: number;
}

/**
 * "Living Shadow" — a pointer-driven 3D tilt whose hard brutalist
 * drop-shadow physically shifts as the card rotates, like a punch-card
 * tile catching light on a table. Works for mouse (hover/move) and touch
 * (drag) via unified Pointer Events. Falls back gracefully — with no
 * pointer movement, cards just sit flat with their static shadow.
 */
export function useTilt({ max = 7, scale = 1.015, shadowReach = 10 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springCfg = { stiffness: 260, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), springCfg);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), springCfg);
  const scaleMV = useSpring(1, springCfg);

  const shadowX = useTransform(rotateY, [-max, max], [-shadowReach, shadowReach]);
  const shadowY = useTransform(rotateX, [-max, max], [shadowReach, -shadowReach]);
  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 0px var(--ink))`;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerEnter = () => scaleMV.set(scale);
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    scaleMV.set(1);
  };

  return {
    ref,
    containerStyle: { perspective: 1000 } as React.CSSProperties,
    motionStyle: { rotateX, rotateY, scale: scaleMV, filter, transformStyle: 'preserve-3d' as const },
    handlers: { onPointerMove, onPointerEnter, onPointerLeave, onPointerUp: onPointerLeave },
  };
}
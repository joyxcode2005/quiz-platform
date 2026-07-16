import { useEffect, useRef, useState } from 'react';

/**
 * Ties an element's vertical offset to how far it sits from the vertical
 * center of the viewport as the page scrolls. Higher `speed` = moves more =
 * reads as closer / less "anchored". Near 0 = barely moves = reads as the
 * grounded foreground layer.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.2) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      setOffset(distanceFromCenter * speed * -0.12);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return { ref, offset };
}
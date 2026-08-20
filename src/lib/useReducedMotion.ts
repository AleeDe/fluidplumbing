'use client';

import { useEffect, useState } from 'react';

/**
 * Single source of truth for motion preference.
 * Returns true when the user has asked for reduced motion.
 * Lenis, GSAP and all Motion entrances must respect this.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

'use client';

import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Lenis smooth scroll. Disabled entirely under prefers-reduced-motion,
 * and never mounted on touch devices where native momentum is better.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia('(hover: none)').matches) return;

    // Lenis is imported dynamically so it stays out of the initial chunk.
    // Smooth scroll is a post-LCP nicety; loading it eagerly delays first paint.
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

/**
 * Adapted from Magic UI `number-ticker` (1 of 2 permitted Magic UI components).
 * Retoned to FPS: spring damping raised and stiffness lowered so the count
 * settles ~35% slower than the original, matching the calm brand tone.
 *
 * Renders the final value in the server HTML so the figure is present without
 * JS and never flashes as zero; the animation only replaces it once in view.
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const format = (n: number) =>
    n.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const motionValue = useMotionValue(0);
  // Deliberately slower than Magic UI's default (damping 60 / stiffness 100).
  const spring = useSpring(motionValue, { damping: 90, stiffness: 70 });

  // Start at the final value so SSR output and no-JS both show the real figure.
  const [display, setDisplay] = useState(() => format(value));

  // Subscribe first, so no change event can be missed.
  useEffect(() => {
    if (reduced) return;
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(format(latest as number));
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spring, decimals, reduced]);

  // Then drive it: reset to 0 and animate up once the element scrolls into view.
  useEffect(() => {
    if (reduced || !inView) return;
    motionValue.set(0);
    spring.jump(0);
    setDisplay(format(0));
    const id = requestAnimationFrame(() => motionValue.set(value));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

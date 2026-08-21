'use client';

/**
 * Vendored from React Bits (github.com/DavidHDev/react-bits), ts-tailwind
 * variant, then modified for this project:
 *
 *   1. Added the 'use client' directive. Upstream ships none, which breaks
 *      the Next.js App Router build.
 *   2. Added a prefers-reduced-motion guard. Upstream has none, and this
 *      site disables all motion under that preference.
 *   3. Retoned to the FPS palette at the call site.
 *
 * Do not re-download over this file without reapplying the above.
 */

import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  // MODIFIED: no cursor-tracking spotlight under prefers-reduced-motion.
  const prefersReduced = useReducedMotion();

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (prefersReduced || !divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (prefersReduced) return;
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    if (prefersReduced) return;
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;

'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Aqua spark burst on click, drawn on a viewport-sized fixed canvas.
 *
 * Written from scratch rather than using React Bits' ClickSpark directly:
 * that component sizes its canvas to its parent, so wrapping the layout gave
 * a 1440x8996 canvas (~52MB of GPU memory) for a decorative effect. This
 * pins the canvas to the viewport instead, so it stays 1440x900 regardless
 * of page length, and listens on the document rather than wrapping children.
 *
 * Silent under prefers-reduced-motion. `pointer-events: none` throughout, so
 * it can never intercept a click on a real control.
 */

type Spark = { x: number; y: number; angle: number; start: number };

const SPARK_COLOR = '#2DD4BF';
const COUNT = 7;
const SIZE = 9;
const RADIUS = 16;
const DURATION = 420;

export function ClickSparkLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  // useReducedMotion() returns null on first render, before the media query
  // has resolved. Mount the canvas only once we positively know motion is
  // allowed, so a reduced-motion user never gets one at all.
  const [motionAllowed, setMotionAllowed] = useState(false);
  useEffect(() => {
    setMotionAllowed(prefersReduced === false);
  }, [prefersReduced]);

  useEffect(() => {
    if (!motionAllowed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      sparksRef.current = sparksRef.current.filter((s) => {
        const elapsed = now - s.start;
        if (elapsed >= DURATION) return false;

        const p = easeOut(elapsed / DURATION);
        const dist = p * RADIUS * 2;
        const len = SIZE * (1 - p);

        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);

        ctx.strokeStyle = SPARK_COLOR;
        ctx.globalAlpha = 1 - p;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const onClick = (e: MouseEvent) => {
      // Coordinates are viewport-relative because the canvas is fixed.
      const now = performance.now();
      for (let i = 0; i < COUNT; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / COUNT,
          start: now,
        });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('click', onClick);
    };
  }, [motionAllowed]);

  if (!motionAllowed) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}

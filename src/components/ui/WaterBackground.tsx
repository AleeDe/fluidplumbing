'use client';

import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * HAND-BUILT hero water background. Not from any registry.
 *
 * Three layered sine-wave paths at different amplitudes and speeds
 * (18s / 26s / 34s), each translating a full wavelength so the loop
 * is seamless. Deep water, not cartoon: low amplitude, dark navy
 * fills, very low opacity aqua on the topmost crest only.
 */

/** Builds one full sine period, tiled twice so translateX(-50%) loops seamlessly. */
function wavePath(amplitude: number, baseline: number, width = 1440) {
  const w = width;
  const q = w / 4;
  // Two identical periods laid end to end across 2x width.
  return [
    `M0 ${baseline}`,
    `C ${q} ${baseline - amplitude}, ${q * 3} ${baseline + amplitude}, ${w} ${baseline}`,
    `C ${w + q} ${baseline - amplitude}, ${w + q * 3} ${baseline + amplitude}, ${w * 2} ${baseline}`,
    `L ${w * 2} 800 L 0 800 Z`,
  ].join(' ');
}

const layers = [
  { amp: 26, base: 330, fill: '#0A1F33', opacity: 0.55, duration: 34 },
  { amp: 20, base: 400, fill: '#0D2942', opacity: 0.6, duration: 26 },
  { amp: 14, base: 470, fill: '#12354F', opacity: 0.5, duration: 18 },
];

export function WaterBackground() {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Depth glow behind the waves */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 70% 15%, rgba(14,165,233,0.16) 0%, rgba(4,18,31,0) 60%)',
        }}
      />

      <svg
        className="absolute bottom-0 left-0 h-[52%] w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        role="presentation"
      >
        {layers.map((l, i) => (
          <g key={i}>
            <path
              d={wavePath(l.amp, l.base)}
              fill={l.fill}
              opacity={l.opacity}
              style={
                reduced
                  ? undefined
                  : {
                      animation: `fps-wave ${l.duration}s linear infinite`,
                      animationDelay: `-${i * 4}s`,
                    }
              }
            />
          </g>
        ))}
        {/* Aqua highlight on the topmost crest only — kept very low */}
        <path
          d={wavePath(26, 330)}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="1.5"
          opacity="0.14"
          style={
            reduced
              ? undefined
              : { animation: 'fps-wave 34s linear infinite' }
          }
        />
      </svg>

      {/* Fade the waves into the section floor */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-fps-navy-950 to-transparent" />

      <style>{`
        @keyframes fps-wave {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes fps-wave { from { transform: none; } to { transform: none; } }
        }
      `}</style>
    </div>
  );
}

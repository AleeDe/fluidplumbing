import { Wrench } from 'lucide-react';

/**
 * Service icons.
 *
 * Drawn on lucide-react's grid so they sit consistently beside the lucide
 * icons used elsewhere: 24x24 viewBox, 1.5-1.75px stroke, round caps and
 * joins, `currentColor`, no fills.
 *
 * Three are hand-authored because the stock lucide options were too generic
 * for the service they represent (`siren` reads as a police car, `search`
 * says nothing about water). Maintenance uses lucide's own `Wrench` — it is
 * already well drawn, with the open jaw that makes a wrench readable at
 * 24px, and redrawing it would only make it worse.
 */

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

/** Emergency — a pipe with a clear break and a falling drip. */
export function EmergencyIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M3 8h7" />
      <path d="M14 8h7" />
      <path d="M10 5.5v5" />
      <path d="M14 5.5v5" />
      <path d="M12 12.5c0 0-1.5 1.8-1.5 2.8a1.5 1.5 0 0 0 3 0c0-1-1.5-2.8-1.5-2.8Z" />
    </svg>
  );
}

/** Bathroom fitting — a bath with a tap. */
export function BathroomIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 2-2h1" />
      <path d="M9 3v2.5" />
      <path d="M6.5 21.5 8 19" />
      <path d="M17.5 21.5 16 19" />
    </svg>
  );
}

/** Leak detection — a droplet under a magnifier. */
export function LeakIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg {...base} strokeWidth={strokeWidth} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
      <path d="M10.5 7.5S8 10 8 11.4a2.5 2.5 0 0 0 5 0C13 10 10.5 7.5 10.5 7.5Z" />
    </svg>
  );
}

/** Maintenance — lucide's Wrench, unmodified. */
export function MaintenanceIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return <Wrench className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** Keyed by the `icon` field in src/data/services.ts. */
export const serviceIcons = {
  siren: EmergencyIcon,
  bath: BathroomIcon,
  search: LeakIcon,
  wrench: MaintenanceIcon,
} as const;

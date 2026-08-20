import { cn } from '@/lib/utils';

/**
 * Inline SVG lockup so it inherits currentColor for the wordmark and
 * never causes a layout shift or an extra request.
 */
export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  const gradId = markOnly ? 'fpsLogoMark' : 'fpsLogoFull';
  return (
    <svg
      viewBox={markOnly ? '0 0 64 64' : '0 0 300 64'}
      className={cn(className)}
      fill="none"
      role="img"
      aria-label="Fluid Plumbing Solutions"
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      <path
        d="M17 57V26a12 12 0 0 1 12-12h9"
        stroke={`url(#${gradId})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 38h15" stroke={`url(#${gradId})`} strokeWidth="6.5" strokeLinecap="round" />
      <path
        d="M44 4.5c0 0-7.5 7.2-7.5 11.5a7.5 7.5 0 0 0 15 0c0-4.3-7.5-11.5-7.5-11.5Z"
        fill={`url(#${gradId})`}
      />
      {!markOnly && (
        <>
          <text
            x="70"
            y="30"
            fontFamily="var(--font-sora), ui-sans-serif, system-ui, sans-serif"
            fontWeight="700"
            fontSize="25"
            letterSpacing="-0.5"
            fill="currentColor"
          >
            FLUID
          </text>
          <text
            x="71"
            y="47"
            fontFamily="var(--font-inter), ui-sans-serif, system-ui, sans-serif"
            fontWeight="500"
            fontSize="8.5"
            letterSpacing="1.53"
            fill="currentColor"
            opacity="0.6"
          >
            PLUMBING SOLUTIONS
          </text>
        </>
      )}
    </svg>
  );
}

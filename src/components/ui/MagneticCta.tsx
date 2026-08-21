'use client';

import Magnet from '@/components/reactbits/Magnet';

/**
 * Wraps a CTA so it drifts subtly toward the cursor.
 *
 * Kept as a small client island so the hero itself stays a server component:
 * the hero contains the LCP element and must not be gated on hydration.
 *
 * `magnetStrength` is deliberately weak (upstream default is 2, which is a
 * lot of travel). At 6 the button moves a few pixels, which reads as
 * responsive craft rather than a toy.
 *
 * Disabled entirely on touch devices, where there is no cursor to track and
 * the transform only causes a jump on tap.
 */
export function MagneticCta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Magnet
      padding={60}
      magnetStrength={6}
      activeTransition="transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)"
      inactiveTransition="transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
      wrapperClassName={className}
      innerClassName="[@media(hover:none)]:!transform-none"
    >
      {children}
    </Magnet>
  );
}

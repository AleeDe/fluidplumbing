import { OptimisedImage } from '@/components/ui/OptimisedImage';
import type { OptimisedImageName } from '@/data/image-placeholders';
import { areas } from '@/data/areas';

/**
 * Area page header background.
 *
 * DELIBERATELY NOT A PHOTOGRAPH OF THE TOWN.
 *
 * Generating imagery of real places and presenting it as local context is
 * both a legal risk (it asserts something specific about a named location)
 * and an SEO liability — Google's helpful-content systems treat fabricated
 * location imagery on programmatic location pages as a quality signal
 * against the page. These 18 pages are the site's largest SEO asset.
 *
 * Instead each area gets one of the existing plumbing photographs, assigned
 * deterministically from its slug. A photograph of a pipe makes no claim
 * about a place, so every town looks distinct with no risk attached.
 *
 * The contour field is kept on top of the image for brand texture.
 */

/** Deterministic hash so a given slug always yields the same background. */
function seedFrom(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Backgrounds in rotation. Chosen for being dark, texture-led and abstract
 * enough that no viewer would read them as "this is your town".
 * Faces, vans and anything place-specific are excluded on purpose.
 */
const BACKGROUNDS: OptimisedImageName[] = [
  'emergency-bg',
  'stopcock',
  'service-emergency',
  'hero',
  'service-leak',
  'water-meter',
  'service-maintenance',
  'pressure-gauge',
];

/** Alt is empty: these are decorative, and the page states its own location. */
export function AreaHeaderPattern({ slug }: { slug: string }) {
  const seed = seedFrom(slug);

  // Assigned by position in the areas list rather than by hash, so the eight
  // backgrounds spread evenly instead of clustering. Still deterministic:
  // a given town always gets the same image.
  const areaIndex = areas.findIndex((a) => a.slug === slug);
  const bg = BACKGROUNDS[(areaIndex < 0 ? seed : areaIndex) % BACKGROUNDS.length];

  // Six contour lines, phase and amplitude varied by the seed.
  const lines = Array.from({ length: 6 }, (_, i) => {
    const phase = ((seed >> (i * 3)) % 60) - 30;
    const amp = 14 + ((seed >> (i * 2)) % 18);
    const y = 60 + i * 34;
    return {
      d: `M-40 ${y} C 200 ${y - amp + phase}, 420 ${y + amp}, 660 ${y - amp / 2} S 1100 ${y + amp + phase / 2}, 1360 ${y - amp / 3}`,
      o: 0.26 - i * 0.03,
    };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Photographic backdrop */}
      <OptimisedImage
        name={bg}
        alt=""
        sizes="100vw"
        className="h-full"
        imgClassName="h-full w-full object-cover brightness-[1.25] contrast-[1.05]"
      />

      {/* Heavy scrim: the header text must stay at AA over any of the
          rotated backgrounds, so this is deliberately strong on the left. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(4,18,31,0.96) 0%, rgba(4,18,31,0.92) 42%, rgba(4,18,31,0.68) 70%, rgba(4,18,31,0.48) 100%)',
        }}
      />
      {/* Vertical fade so the section floor blends into the page below */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(4,18,31,0.55) 0%, rgba(4,18,31,0.15) 40%, rgba(4,18,31,0.92) 100%)',
        }}
      />

      {/* Brand contour texture on top */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1320 280"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id={`ah-${slug}`} x1="0" y1="0" x2="1320" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#2DD4BF" />
          </linearGradient>
          <linearGradient id={`ahfade-${slug}`} x1="0" y1="0" x2="1320" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`ahm-${slug}`}>
            <rect width="1320" height="280" fill={`url(#ahfade-${slug})`} />
          </mask>
        </defs>
        <g mask={`url(#ahm-${slug})`} fill="none" strokeWidth="1.5">
          {lines.map((l, i) => (
            <path key={i} d={l.d} stroke={`url(#ah-${slug})`} opacity={l.o} />
          ))}
        </g>
      </svg>
    </div>
  );
}

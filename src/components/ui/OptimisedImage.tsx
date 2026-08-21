import { optimisedImages, type OptimisedImageName } from '@/data/image-placeholders';
import { cn } from '@/lib/utils';

/**
 * Serves AVIF first with a WebP fallback, via a native <picture> element.
 *
 * `next/image` is not used here: `images.unoptimized` is set (required for
 * static export) so next/image would emit a single unprocessed <img> and
 * ignore the derivatives entirely. A <picture> with explicit srcSets lets the
 * browser pick both the best format and the right width.
 *
 * Every instance carries explicit width/height so nothing shifts on load.
 */

/** Widths generated per image — must match PLAN in scripts/optimise-images.mjs */
const WIDTHS: Record<OptimisedImageName, number[]> = {
  'hero': [640, 1024],
  'emergency-bg': [640, 1024, 1440, 1920],
  'service-emergency': [480, 800, 1200],
  'service-bathroom': [480, 800, 1200],
  'service-leak': [480, 800, 1200],
  'service-maintenance': [480, 800, 1200],
  'water-meter': [480, 800, 1200],
  'stopcock': [480, 800, 1200],
  'damp-stain': [480, 800, 1200],
  'pressure-gauge': [480, 800, 1200],
  'about-placeholder': [480, 800],
  // Page hero backgrounds
  'hero-emergency': [640, 1024, 1440, 1920],
  'hero-bathroom': [640, 1024, 1440, 1920],
  'hero-leak': [640, 1024, 1440, 1920],
  'hero-maintenance': [640, 1024, 1440, 1920],
  'hero-contact': [640, 1024, 1440, 1920],
  'hero-services': [640, 1024, 1440, 1920],
  'hero-areas': [640, 1024, 1440, 1920],
  'hero-gallery': [640, 1024, 1440, 1920],
  'hero-about': [640, 1024, 1440, 1920],
  // Comparison pairs — both halves must match exactly.
  'leak-before': [640, 1024, 1400],
  'leak-after': [640, 1024, 1400],
  'radiator-before': [640, 1024, 1400],
  'radiator-after': [640, 1024, 1400],
  // Optimised but deliberately unused — not a matched pair.
  'bathroom-before': [640, 1024, 1400],
  'bathroom-after': [640, 1024, 1400],
};

export function OptimisedImage({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  imgClassName,
}: {
  name: OptimisedImageName;
  /**
   * Describe what the image SHOWS. Never who produced the work, never a
   * location, never a possessive. These are illustrative images, not
   * photographs of this business's jobs. See IMAGE_MANIFEST.md.
   */
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const img = optimisedImages[name];
  const widths = WIDTHS[name];

  const srcSet = (ext: 'avif' | 'webp') =>
    widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`${img.base}-${widths[widths.length - 1]}.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={cn('h-auto w-full', imgClassName)}
        style={priority ? undefined : { backgroundColor: img.placeholderColor }}
      />
    </picture>
  );
}

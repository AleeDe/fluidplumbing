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
  // Real client job photographs, all normalised to 3:4 portrait.
  'jobA-before-1': [480, 800, 1200],
  'jobA-before-2': [480, 800, 1200],
  'jobA-before-3': [480, 800, 1200],
  'jobA-after-1': [480, 800, 1200],
  'jobA-after-2': [480, 800, 1200],
  'jobA-after-3': [480, 800, 1200],
  'jobB-after-1': [480, 800, 1200],
  'jobB-after-2': [480, 800, 1200],
  'jobC-after-1': [480, 800, 1200],
  'jobD-after-1': [480, 800, 1200],
  'jobE-before-1': [480, 800, 1200],
  'jobE-before-2': [480, 800, 1200],
  'jobE-after-1': [480, 800, 1200],
  'jobE-after-2': [480, 800, 1200],
  'jobE-after-3': [480, 800, 1200],
  'detail-stopcock': [480, 800],
  'hero-services': [640, 1024, 1440, 1920],
  'hero-areas': [640, 1024, 1440, 1920],
  'hero-gallery': [640, 1024, 1440, 1920],
  'hero-about': [640, 1024, 1440, 1920],
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

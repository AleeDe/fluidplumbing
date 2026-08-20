import { OptimisedImage } from '@/components/ui/OptimisedImage';
import type { OptimisedImageName } from '@/data/image-placeholders';
import { cn } from '@/lib/utils';

/**
 * An educational figure: a photograph of a thing the reader may need to find
 * or read in their own home, with a caption explaining it.
 *
 * These are the safest images on the site — genuinely generic, and no
 * ownership or authorship claim is possible or implied. The caption explains
 * the object, never who worked on it.
 */
export function Explainer({
  name,
  alt,
  caption,
  tone = 'light',
  className,
}: {
  name: OptimisedImageName;
  alt: string;
  caption: string;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-fps border',
        dark ? 'border-fps-navy-700 bg-fps-navy-900/60' : 'border-fps-ink-900/10 bg-white',
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden bg-fps-navy-900">
        <OptimisedImage
          name={name}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="h-full"
          imgClassName="h-full w-full object-cover"
        />
      </div>
      <figcaption
        className={cn(
          'px-5 py-4 text-sm leading-relaxed',
          dark ? 'text-white/65' : 'text-fps-ink-600',
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

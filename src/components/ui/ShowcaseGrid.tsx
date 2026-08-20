'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { showcase, showcaseCategories } from '@/data/showcase';
import { optimisedImages } from '@/data/image-placeholders';
import { OptimisedImage } from '@/components/ui/OptimisedImage';
import { cn } from '@/lib/utils';

/**
 * Masonry showcase of ILLUSTRATIVE imagery.
 *
 * Every tile carries a visible "Illustrative" badge, and the lightbox caption
 * repeats it. Captions describe the situation or the standard — never
 * authorship, never a location. See src/data/showcase.ts.
 */
export function ShowcaseGrid() {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState<string>('All');

  const visible =
    filter === 'All' ? showcase : showcase.filter((i) => i.category === filter);

  const slides = visible.map((i) => {
    const img = optimisedImages[i.name];
    return {
      src: `${img.base}-1200.webp`,
      alt: i.alt,
      width: img.width,
      height: img.height,
      title: i.caption,
      description: 'Illustrative example — not a photograph of a past job',
    };
  });

  return (
    <>
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {showcaseCategories.map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setFilter(c);
                setIndex(-1);
              }}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-all duration-250',
                active
                  ? 'border-fps-aqua-400 bg-fps-aqua-400/10 text-fps-aqua-400'
                  : 'border-fps-navy-700 bg-fps-navy-900/60 text-white/70 hover:border-fps-aqua-400/50 hover:text-fps-aqua-400',
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {visible.map((item, i) => (
          <li key={item.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-fps border border-fps-navy-700 bg-fps-navy-900 text-left"
              aria-label={`View larger: ${item.caption}`}
            >
              <div className={cn('overflow-hidden', item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]')}>
                <OptimisedImage
                  name={item.name}
                  alt={item.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>

              {/* Persistent disclosure — visible without hover. Do not remove. */}
              <span className="absolute right-3 top-3 rounded-full bg-fps-navy-950/85 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
                Illustrative
              </span>

              <span className="block border-t border-fps-navy-700 px-5 py-4">
                <span className="block text-sm leading-relaxed text-white/75">
                  {item.caption}
                </span>
                <span className="mt-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fps-aqua-400">
                  {item.category}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Captions]}
        animation={{ fade: 300, swipe: 400 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        captions={{ descriptionTextAlign: 'center' }}
        styles={{
          container: { backgroundColor: 'rgba(4, 18, 31, 0.96)' },
          captionsTitle: { color: '#ffffff' },
          captionsDescription: { color: 'rgba(255,255,255,0.55)' },
        }}
      />
    </>
  );
}

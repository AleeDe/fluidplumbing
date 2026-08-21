'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { workImages } from '@/data/gallery';

/**
 * HAND-BUILT masonry grid. The lightbox itself is
 * yet-another-react-lightbox, retoned to FPS navy via CSS variables.
 */
export function GalleryGrid() {
  const [index, setIndex] = useState(-1);

  const slides = workImages.map((i) => ({
    src: i.src,
    alt: i.alt,
    width: i.width,
    height: i.height,
    title: i.caption,
    description: `${i.service}, ${i.area}`,
  }));

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {workImages.map((img, i) => (
          <li key={img.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-fps border border-fps-navy-700 bg-fps-navy-900 text-left"
              aria-label={`View larger: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading={i < 3 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-fps-navy-950 via-fps-navy-950/85 to-transparent px-5 pb-4 pt-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block font-sora text-sm font-semibold text-white">
                  {img.caption}
                </span>
                <span className="mt-0.5 block text-xs text-fps-aqua-400">{img.service}</span>
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
        plugins={[Zoom, Thumbnails]}
        animation={{ fade: 300, swipe: 400 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        thumbnails={{ border: 0, borderRadius: 10, width: 96, height: 64, gap: 10 }}
        styles={{
          container: { backgroundColor: 'rgba(4, 18, 31, 0.96)' },
          thumbnailsContainer: { backgroundColor: 'rgba(4, 18, 31, 0.96)' },
          thumbnail: { backgroundColor: '#0A1F33', border: '1px solid #12354F' },
        }}
      />
    </>
  );
}

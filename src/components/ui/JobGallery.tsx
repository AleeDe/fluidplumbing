'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { jobs, detailPhotos } from '@/data/jobs';
import { optimisedImages } from '@/data/image-placeholders';
import { OptimisedImage } from '@/components/ui/OptimisedImage';
import type { OptimisedImageName } from '@/data/image-placeholders';
import { cn } from '@/lib/utils';

/**
 * Gallery of REAL completed work, grouped by job.
 *
 * Each job renders as its own block so the before and after shots sit
 * together and read as one project, rather than dissolving into an
 * undifferentiated grid. Job E's before and after appear side by side here
 * because their crops do not align well enough for a slider.
 *
 * No disclosure badges: this is genuinely this business's work.
 */

/** Skip any key with no matching optimised file, so a missing image
 *  degrades to nothing rather than a broken tile. */
const exists = (name: string) => name in optimisedImages;

export function JobGallery() {
  const [index, setIndex] = useState(-1);

  // Flat list in display order, so the lightbox index lines up with the grid.
  const ordered = [
    ...jobs.flatMap((j) => [
      ...j.before.filter((p) => exists(p.name)).map((p) => ({ ...p, job: j, stage: 'Before' as const })),
      ...j.after.filter((p) => exists(p.name)).map((p) => ({ ...p, job: j, stage: 'After' as const })),
    ]),
    ...detailPhotos.filter((p) => exists(p.name)).map((p) => ({ ...p, job: null, stage: null })),
  ];

  const slides = ordered.map((p) => {
    const img = optimisedImages[p.name as OptimisedImageName];
    return {
      src: `${img.base}-1200.webp`,
      alt: p.alt,
      width: img.width,
      height: img.height,
      title: p.job ? `${p.stage}: ${p.job.title}` : 'Detail',
      description: p.alt,
    };
  });

  /**
   * Index lookup by image name.
   *
   * A mutable counter incremented during render does not work here: every
   * onClick closure ends up capturing the final value, so each tile opened
   * the last slide. Deriving the index from the same `ordered` array the
   * lightbox uses keeps the two in step.
   *
   * Image names are unique across all jobs, so no two tiles collapse onto
   * the same Map entry. If a name is ever reused, key the lookup on
   * `${job.id}-${stage}-${name}` instead.
   */
  const indexOf = new Map(ordered.map((p, i) => [p.name, i]));

  return (
    <>
      <div className="space-y-14">
        {jobs.map((job) => {
          const photos = [
            ...job.before.filter((p) => exists(p.name)).map((p) => ({ ...p, stage: 'Before' as const })),
            ...job.after.filter((p) => exists(p.name)).map((p) => ({ ...p, stage: 'After' as const })),
          ];
          if (photos.length === 0) return null;

          return (
            <article key={job.id}>
              <header className="mb-5 max-w-2xl">
                <h3 className="font-sora text-xl font-semibold text-white">{job.title}</h3>
                <p className="mt-2 text-white/65">{job.summary}</p>
              </header>

              {/* Single-photo jobs get a narrower grid so the row does not
                  sit two-thirds empty. */}
              <ul
                className={cn(
                  'grid gap-4',
                  photos.length === 1
                    ? 'max-w-sm'
                    : photos.length === 2
                      ? 'sm:grid-cols-2 lg:max-w-2xl'
                      : 'sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {photos.map((p) => {
                  const i = indexOf.get(p.name) ?? 0;
                  return (
                    <li key={p.name}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`View larger: ${p.stage} of ${job.title}`}
                        className="group relative block w-full overflow-hidden rounded-fps border border-fps-navy-700 bg-fps-navy-900 text-left"
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <OptimisedImage
                            name={p.name as OptimisedImageName}
                            alt={p.alt}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="h-full"
                            imgClassName="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                          />
                        </div>
                        <span
                          className={cn(
                            'absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] backdrop-blur-sm',
                            p.stage === 'Before'
                              ? 'bg-fps-navy-950/85 text-white/75'
                              : 'bg-fps-aqua-400/90 text-fps-navy-950',
                          )}
                        >
                          {p.stage}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}

        {/* Not finished work. Set apart with a rule and an eyebrow so this
            repair detail does not read as the tail end of the bathroom
            galleries above it. */}
        {detailPhotos.filter((p) => exists(p.name)).length > 0 && (
          <article className="mt-6 border-t border-fps-navy-700 pt-12">
            <header className="mb-5 max-w-2xl">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fps-aqua-400">
                Maintenance and repairs
              </p>
              <h3 className="mt-3 font-sora text-xl font-semibold text-white">
                The sort of thing we find
              </h3>
              <p className="mt-2 text-white/65">
                Not a finished bathroom. These are faults we come across on call outs,
                worth knowing about before they become an emergency.
              </p>
            </header>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detailPhotos.filter((p) => exists(p.name)).map((p) => {
                const i = indexOf.get(p.name) ?? 0;
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`View larger: ${p.alt}`}
                      className="group relative block w-full overflow-hidden rounded-fps border border-fps-navy-700 bg-fps-navy-900 text-left"
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <OptimisedImage
                          name={p.name as OptimisedImageName}
                          alt={p.alt}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full"
                          imgClassName="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </article>
        )}
      </div>

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

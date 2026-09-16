'use client';

import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider';
import { optimisedImages } from '@/data/image-placeholders';
import type { Job } from '@/data/jobs';
import { cn } from '@/lib/utils';

/**
 * Before and after slider for a REAL job.
 *
 * Unlike the illustrative sliders this replaced, these are photographs of
 * work this business actually carried out, so the caption says so plainly
 * and no disclosure badge is needed.
 *
 * Only used for jobs listed in SLIDER_JOB_IDS, where both halves share a
 * crop ratio. A mismatched pair reveals two differently framed rooms as the
 * handle moves, which undermines the whole point.
 */

const WIDTHS = [480, 800, 1200];

function Half({ name, alt }: { name: string; alt: string }) {
  const img = optimisedImages[name as keyof typeof optimisedImages];
  if (!img) return null;

  const srcSet = (ext: 'avif' | 'webp') =>
    WIDTHS.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture className="block h-full w-full">
      <source type="image/avif" srcSet={srcSet('avif')} sizes="(max-width: 1024px) 100vw, 50vw" />
      <source type="image/webp" srcSet={srcSet('webp')} sizes="(max-width: 1024px) 100vw, 50vw" />
      <img
        src={`${img.base}-800.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ backgroundColor: img.placeholderColor }}
      />
    </picture>
  );
}

export function JobSlider({
  job,
  tone = 'light',
  className,
}: {
  job: Job;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const before = job.before[0];
  const after = job.after[0];
  if (!before || !after) return null;

  const dark = tone === 'dark';

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-fps border',
        dark ? 'border-fps-navy-700 bg-fps-navy-900' : 'border-fps-ink-900/10 bg-white',
        className,
      )}
    >
      <ReactCompareSlider
        className="aspect-[3/4] w-full sm:aspect-[4/3]"
        transition="0.25s cubic-bezier(0.22, 1, 0.36, 1)"
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backgroundColor: '#2DD4BF',
              color: '#04121F',
              border: 0,
              boxShadow: '0 4px 16px -4px rgba(4,18,31,0.7)',
              height: 44,
              width: 44,
            }}
            linesStyle={{ background: '#2DD4BF', width: 2, opacity: 0.9 }}
          />
        }
        itemOne={<Half name={before.name} alt={before.alt} />}
        itemTwo={<Half name={after.name} alt={after.alt} />}
      />
      <figcaption
        className={cn(
          'border-t px-5 py-4',
          dark ? 'border-fps-navy-700' : 'border-fps-ink-900/10',
        )}
      >
        <span
          className={cn(
            'block font-sora text-base font-semibold',
            dark ? 'text-white' : 'text-fps-ink-900',
          )}
        >
          {job.title}
        </span>
        <span
          className={cn('mt-1 block text-sm', dark ? 'text-white/65' : 'text-fps-ink-600')}
        >
          {job.summary}
        </span>
        {job.location && (
          <span className="mt-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fps-aqua-400">
            {job.location}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

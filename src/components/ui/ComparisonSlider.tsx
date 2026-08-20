'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from 'react-compare-slider';
import { optimisedImages } from '@/data/image-placeholders';
import type { Comparison } from '@/data/comparisons';
import { cn } from '@/lib/utils';

/**
 * Before/after comparison for ILLUSTRATIVE imagery.
 *
 * The caption must never imply this depicts work the business carried out,
 * and must never carry a location. See src/data/comparisons.ts.
 *
 * Both halves are served as <picture> with AVIF then WebP, at identical
 * widths and quality so no seam appears as the handle moves.
 */

const WIDTHS = [640, 1024, 1400];

function Half({
  name,
  alt,
  eager,
}: {
  name: Comparison['before']['name'];
  alt: string;
  eager?: boolean;
}) {
  const img = optimisedImages[name];
  const srcSet = (ext: 'avif' | 'webp') =>
    WIDTHS.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture className="block h-full w-full">
      <source type="image/avif" srcSet={srcSet('avif')} sizes="(max-width: 1024px) 100vw, 50vw" />
      <source type="image/webp" srcSet={srcSet('webp')} sizes="(max-width: 1024px) 100vw, 50vw" />
      <img
        src={`${img.base}-1024.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
        style={{ backgroundColor: img.placeholderColor }}
      />
    </picture>
  );
}

export function ComparisonSlider({
  item,
  tone = 'light',
  className,
}: {
  item: Comparison;
  tone?: 'dark' | 'light';
  className?: string;
}) {
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
        className="aspect-[4/3] w-full"
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
        itemOne={<Half name={item.before.name} alt={item.before.alt} />}
        itemTwo={<Half name={item.after.name} alt={item.after.alt} />}
      />
      <figcaption
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-t px-5 py-4',
          dark ? 'border-fps-navy-700' : 'border-fps-ink-900/10',
        )}
      >
        <span className={cn('text-sm', dark ? 'text-white/75' : 'text-fps-ink-600')}>
          {item.label}
        </span>
        {/* Persistent, unmissable disclosure. Do not remove or soften. */}
        <span
          className={cn(
            'font-mono text-[0.68rem] uppercase tracking-[0.14em]',
            dark ? 'text-white/40' : 'text-fps-ink-500',
          )}
        >
          Illustrative example
        </span>
      </figcaption>
    </figure>
  );
}

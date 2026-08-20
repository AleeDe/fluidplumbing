'use client';

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';
import type { BeforeAfter as BeforeAfterType } from '@/data/gallery';
import { cn } from '@/lib/utils';

/**
 * react-compare-slider, retoned to FPS.
 * Default handle colours replaced with brand aqua; the stock version ships
 * a stark white handle with a heavy shadow that reads cheap on dark.
 */
export function BeforeAfter({
  item,
  tone = 'dark',
}: {
  item: BeforeAfterType;
  tone?: 'dark' | 'light';
}) {
  const dark = tone === 'dark';
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-fps border',
        dark
          ? 'border-fps-navy-700 bg-fps-navy-900'
          : 'border-fps-ink-900/10 bg-white',
      )}
    >
      <ReactCompareSlider
        className="aspect-[16/11] w-full"
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
        itemOne={
          <ReactCompareSliderImage
            src={item.before.src}
            alt={item.before.alt}
            width={item.width}
            height={item.height}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={item.after.src}
            alt={item.after.alt}
            width={item.width}
            height={item.height}
          />
        }
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
        <span
          className={cn(
            'font-mono text-xs uppercase tracking-[0.14em]',
            dark ? 'text-fps-aqua-400' : 'text-fps-cyan-700',
          )}
        >
          {item.area}
        </span>
      </figcaption>
    </figure>
  );
}

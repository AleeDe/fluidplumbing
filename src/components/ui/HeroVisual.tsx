import { OptimisedImage } from '@/components/ui/OptimisedImage';

/**
 * Hero visual — the LCP element.
 *
 * Rendered as a plain <picture> (AVIF + WebP), eager, fetchPriority high.
 * Deliberately NOT animated by Motion and NOT faded in: an element at
 * opacity 0 is not an LCP candidate, so a fade defers the LCP timestamp.
 *
 * NOTE ON THIS IMAGE: it is an illustrative stock-style photograph, not a
 * photograph of work this business carried out. Its alt text describes only
 * what is visible. Do not caption it, alt-text it, or surround it with copy
 * implying it depicts a Fluid Plumbing job. See IMAGE_MANIFEST.md.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[32px] opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 40%, rgba(45,212,191,0.45) 0%, rgba(14,165,233,0.16) 45%, transparent 75%)',
        }}
      />
      {/* Portrait crop: the source is 16:9 but the column is tall, so the
          image is cropped to 4:5 and anchored right where the subject sits. */}
      <div className="relative aspect-[4/5] -rotate-2 overflow-hidden rounded-[24px] border border-white/12 bg-fps-navy-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
        <OptimisedImage
          name="hero"
          alt="Gloved hands using an adjustable spanner on a copper compression joint"
          sizes="(max-width: 1024px) 90vw, 40vw"
          priority
          className="h-full"
          imgClassName="h-full w-full object-cover object-[70%_center] brightness-[1.35] contrast-[1.05]"
        />
        {/* Aqua tint to tie the photograph to the palette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: 'linear-gradient(160deg, rgba(14,165,233,0.18) 0%, rgba(45,212,191,0.10) 100%)' }}
        />
      </div>
    </div>
  );
}

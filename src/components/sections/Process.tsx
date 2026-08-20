'use client';

import { useEffect, useRef } from 'react';
import { processSteps } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * GSAP SEQUENCE 1 of 2 on this site.
 * ScrollTrigger draws the connecting line through the four steps.
 * Fully skipped under prefers-reduced-motion (line renders complete).
 */
export function Process() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = lineRef.current;
    const scope = sectionRef.current;
    if (!el || !scope) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/dist/ScrollTrigger');
      if (cancelled) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: scope,
              start: 'top 72%',
              end: 'bottom 68%',
              scrub: 0.8,
            },
          },
        );
      }, scope);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <Section tone="light">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="03" tone="light">
            How it works
          </Eyebrow>
          <h2 className="text-fps-ink-900">Four steps, no surprises.</h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-14">
          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-6 hidden lg:block"
            style={{ left: '12.5%', right: '12.5%' }}
          >
            <svg className="h-0.5 w-full" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="#CBD5E1" strokeWidth="2" />
              <line
                ref={lineRef}
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="url(#processGrad)"
                strokeWidth="2"
                style={reduced ? undefined : { transform: 'scaleX(0)' }}
              />
              <defs>
                <linearGradient id="processGrad" x1="0" y1="0" x2="100" y2="0"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0EA5E9" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((p) => (
              <li key={p.step}>
                <span
                  aria-hidden="true"
                  className="fps-gradient-bg tabular relative z-10 inline-flex size-12 items-center justify-center rounded-2xl font-sora text-base font-bold text-fps-navy-950"
                >
                  {p.step}
                </span>
                <h3 className="mt-5 font-sora text-lg font-semibold text-fps-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fps-ink-600">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

import { Phone, TriangleAlert } from 'lucide-react';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Grain } from '@/components/ui/Grain';
import { Reveal } from '@/components/ui/Reveal';
import { OptimisedImage } from '@/components/ui/OptimisedImage';
import { Explainer } from '@/components/ui/Explainer';

/**
 * HAND-BUILT. Not from any registry.
 * Practical, genuinely useful copy first; the call button second.
 * Amber appears here and nowhere else on the page.
 */
const steps = [
  {
    n: '1',
    title: 'Find the stopcock',
    body: 'Usually under the kitchen sink. In older Hull terraces, try the cellar head or under the front bay window.',
  },
  {
    n: '2',
    title: 'Turn it clockwise',
    body: 'Keep turning until it stops. If it is seized, do not force it — call us and we will talk you through it.',
  },
  {
    n: '3',
    title: 'Open the cold taps',
    body: 'This drains the pipes down and stops water still sitting in the system from carrying on out.',
  },
  {
    n: '4',
    title: 'Water near electrics?',
    body: 'Switch the electricity off at the consumer unit and do not touch anything wet.',
  },
];

export function EmergencyBand() {
  return (
    <section
      aria-labelledby="emergency-heading"
      className="relative overflow-hidden bg-fps-navy-950 py-16 md:py-24"
    >
      <Grain />

      {/* Background photograph. Illustrative only - see IMAGE_MANIFEST.md.
          Pinned right so the headline sits over the dark left two-thirds. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <OptimisedImage
          name="emergency-bg"
          alt=""
          sizes="100vw"
          className="h-full"
          imgClassName="h-full w-full object-cover object-right"
        />
        {/* Legibility scrim: opaque at the left, clearing to the right. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(4,18,31,0.97) 0%, rgba(4,18,31,0.94) 42%, rgba(4,18,31,0.72) 70%, rgba(4,18,31,0.55) 100%)',
          }}
        />
      </div>

      {/* Amber wash, kept low so it reads as urgency rather than decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 100% at 12% 0%, rgba(245,158,11,0.14) 0%, rgba(4,18,31,0) 62%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fps-amber-500/50 to-transparent"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-fps-amber-500/30 bg-fps-amber-500/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-fps-amber-500">
              <TriangleAlert aria-hidden="true" className="size-3.5" />
              Emergency
            </p>

            <h2 id="emergency-heading" className="text-white">
              Burst pipe? Don&apos;t wait.
            </h2>

            <p className="fps-measure mt-5 text-lg text-white/70">
              Every minute the water runs is more damage. Do these four things now,
              then call. If you are not sure about any of it, call first and we will
              talk you through it on the phone.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.phone.href} variant="emergency" size="lg">
                <Phone aria-hidden="true" className="size-[18px]" />
                Call {site.phone.display}
              </Button>
            </div>

            <p className="mt-4 text-sm text-white/45">
              {site.hours.emergency} · No call-out fee
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Explainer
                tone="dark"
                name="stopcock"
                alt="A brass gate valve on copper pipe inside an under-sink cupboard"
                caption="This is what a stopcock looks like. Turn the handle clockwise until it stops."
              />
              <Explainer
                tone="dark"
                name="water-meter"
                alt="A water meter inside an outdoor ground chamber with the lid lifted"
                caption="If there is no stopcock indoors, check the meter chamber near the boundary."
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="grid gap-4 sm:grid-cols-2">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="rounded-fps border border-fps-navy-700 bg-fps-navy-900/60 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="tabular mb-3 inline-flex size-8 items-center justify-center rounded-lg border border-fps-amber-500/30 bg-fps-amber-500/10 font-sora text-sm font-semibold text-fps-amber-500"
                  >
                    {s.n}
                  </span>
                  <h3 className="font-sora text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

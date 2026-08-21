import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { site } from '@/data/site';
import { reasons } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OptimisedImage } from '@/components/ui/OptimisedImage';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Fluid Plumbing Solutions is run by Zack Gibson from Hull, covering the East Riding. Insured, guaranteed, and straightforward to deal with.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about/' },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about/' },
        ]}
        eyebrow="About"
        title="A local plumber you can actually get hold of."
        intro={`${site.name} is run by ${site.owner} from Kingston upon Hull, covering the city and the East Riding of Yorkshire.`}
      />

      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-fps-ink-900">How we work</h2>
                <p className="fps-measure mt-5 text-fps-ink-600">
                  When you message Fluid Plumbing Solutions, you are messaging Zack.
                  Not a call centre, not a lead-generation site that sells your details
                  on to whoever pays most. That matters more than it should have to,
                  because a lot of what looks like a local plumber online is not one.
                </p>
                <p className="fps-measure mt-5 text-fps-ink-600">
                  The approach is simple. Turn up when we said we would. Explain what is
                  wrong in plain terms. Give a fixed price before starting rather than a
                  day rate that grows. Clean up properly at the end.
                </p>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="text-fps-ink-900">What we will not do</h2>
                <p className="fps-measure mt-5 text-fps-ink-600">
                  We will not quote for work that does not need doing. If a tap needs a
                  washer rather than replacing, we will tell you that, even though it is
                  the smaller job.
                </p>
                <p className="fps-measure mt-5 text-fps-ink-600">
                  We also will not take on work we should not be doing. Gas appliances,
                  boilers and gas pipework must be handled by a Gas Safe registered
                  engineer. That is not us, so we will point you to one rather than
                  pretend otherwise.
                </p>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="text-fps-ink-900">Insurance and guarantees</h2>
                <p className="fps-measure mt-5 text-fps-ink-600">
                  We carry public liability insurance, and we are happy to show you the
                  certificate before any work starts. Workmanship is guaranteed, and
                  parts we supply come with the manufacturer&apos;s warranty on top.
                </p>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal className="mb-6">
                {/* Illustrative photograph, not a picture of the owner.
                    Replace with a real photo of Zack - see IMAGE_MANIFEST.md. */}
                <div className="overflow-hidden rounded-fps border border-fps-ink-900/10">
                  <OptimisedImage
                    name="about-placeholder"
                    alt="A work van with its rear doors open and a tool bag on the driveway beside it"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </Reveal>
              <Reveal>
                <div className="rounded-fps border border-fps-ink-900/10 bg-white p-7">
                  <Eyebrow tone="light">In short</Eyebrow>
                  <ul className="mt-5 space-y-3.5">
                    {reasons.map((r) => (
                      <li
                        key={r.title}
                        className="flex items-start gap-2.5 text-sm text-fps-ink-600"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-fps-aqua-400"
                        />
                        <span>
                          <span className="font-medium text-fps-ink-900">{r.title}</span>
                          {': '}
                          {r.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

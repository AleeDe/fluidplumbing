import type { Metadata } from 'next';
import { workImages, beforeAfter } from '@/data/gallery';
import { comparisons } from '@/data/comparisons';
import { showcase, SHOWCASE_HEADING, SHOWCASE_EYEBROW } from '@/data/showcase';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { AreaHeaderPattern } from '@/components/ui/AreaHeaderPattern';
import { Reveal } from '@/components/ui/Reveal';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { ShowcaseGrid } from '@/components/ui/ShowcaseGrid';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { ComparisonSlider } from '@/components/ui/ComparisonSlider';
import { WorkEmptyState } from '@/components/ui/WorkEmptyState';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, imageObjectSchema } from '@/lib/schema';

const hasRealWork = workImages.length > 0;
const hasRealPairs = beforeAfter.length > 0;

export const metadata: Metadata = {
  title: 'Standard of Work',
  description:
    'Illustrative examples of the standard of plumbing work we deliver across Hull and the East Riding. Ask us for photographs of real jobs that match yours.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Standard of work', href: '/gallery/' },
        ])}
      />
      {/* ImageGallery schema is emitted ONLY for real client photographs.
          Illustrative imagery must never be marked up as portfolio work. */}
      {hasRealWork && <JsonLd data={imageObjectSchema(workImages)} />}

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Standard of work', href: '/gallery/' },
        ]}
        pattern={<AreaHeaderPattern slug="gallery" image="service-leak" />}
        eyebrow={SHOWCASE_EYEBROW}
        title={hasRealWork ? 'Jobs we have finished.' : SHOWCASE_HEADING}
        intro={
          hasRealWork
            ? 'Real work in real houses across Hull and the East Riding.'
            : 'These images illustrate the standard we work to and the problems we deal with. They are not photographs of past jobs. Ask and we will send photos of real work that matches what you are planning.'
        }
      />

      {/* Real client work, when it exists, always leads. */}
      {hasRealPairs && (
        <Section tone="darker">
          <Container>
            <Reveal>
              <Eyebrow number="01">Before and after</Eyebrow>
              <h2 className="text-white">Drag to compare.</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {beforeAfter.map((item) => (
                <Reveal key={item.id}>
                  <BeforeAfter item={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {hasRealWork && (
        <Section tone="dark">
          <Container>
            <Reveal>
              <Eyebrow number={hasRealPairs ? '02' : '01'}>Completed work</Eyebrow>
              <h2 className="text-white">Select a photo to view it larger.</h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <GalleryGrid />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Illustrative comparison sliders */}
      {comparisons.length > 0 && (
        <Section tone="darker">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow number={hasRealWork ? '03' : '01'}>Before and after</Eyebrow>
              <h2 className="text-white">Illustrative examples: drag to compare.</h2>
              <p className="fps-measure mt-5 text-white/70">
                Two common repairs, shown before and after. These are
                illustrative examples of the standard we work to, not
                photographs of past jobs.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {comparisons.map((item) => (
                <Reveal key={item.id}>
                  <ComparisonSlider item={item} tone="dark" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Illustrative showcase grid */}
      {showcase.length > 0 && (
        <Section tone="dark">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow number={hasRealWork ? '04' : '02'}>Examples</Eyebrow>
              <h2 className="text-white">
                Illustrative examples of what we deal with.
              </h2>
              <p className="fps-measure mt-5 text-white/70">
                Filter by the kind of job. Select any image to view it larger.
                Every image here is an illustration, not a photograph of a
                completed job.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <ShowcaseGrid />
            </Reveal>
          </Container>
        </Section>
      )}

      {!hasRealWork && (
        <Section tone="darker" className="!pt-0">
          <Container>
            <Reveal>
              <WorkEmptyState tone="dark" />
            </Reveal>
          </Container>
        </Section>
      )}

      <FinalCta />
    </>
  );
}

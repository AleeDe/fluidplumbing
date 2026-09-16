import type { Metadata } from 'next';
import { jobs, jobsWithPairs, detailPhotos } from '@/data/jobs';
import { optimisedImages } from '@/data/image-placeholders';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { AreaHeaderPattern } from '@/components/ui/AreaHeaderPattern';
import { Reveal } from '@/components/ui/Reveal';
import { JobGallery } from '@/components/ui/JobGallery';
import { JobSlider } from '@/components/ui/JobSlider';
import { WorkEmptyState } from '@/components/ui/WorkEmptyState';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, imageObjectSchema } from '@/lib/schema';
import { site } from '@/data/site';

/** Photos that have a matching optimised file. */
const livePhotos = [
  ...jobs.flatMap((j) => [...j.before, ...j.after]),
  ...detailPhotos,
].filter((p) => p.name in optimisedImages);

const hasWork = livePhotos.length > 0;

export const metadata: Metadata = {
  title: hasWork ? 'Our Work' : 'See Work Like Yours',
  description: hasWork
    ? 'Photographs of bathrooms we have fitted across Hull and the East Riding, including a full Victorian rebuild. Drag the slider to see before and after.'
    : 'Ask us for photographs of recent bathroom, leak and repair work across Hull and the East Riding. We send real job photos, not stock images.',
  alternates: { canonical: '/gallery/' },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Our work', href: '/gallery/' },
        ])}
      />
      {/* Real work, so it may legitimately be marked up as this business's
          own portfolio. */}
      {hasWork && (
        <JsonLd
          data={imageObjectSchema(
            livePhotos.map((p) => {
              const img = optimisedImages[p.name as keyof typeof optimisedImages];
              return {
                src: `${img.base}-1200.webp`,
                alt: p.alt,
                caption: p.alt,
                width: img.width,
                height: img.height,
              };
            }),
          )}
        />
      )}

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Our work', href: '/gallery/' },
        ]}
        pattern={<AreaHeaderPattern slug="gallery" image="hero-gallery" />}
        eyebrow="Our work"
        title={hasWork ? 'Bathrooms we have fitted.' : 'See work like yours.'}
        intro={
          hasWork
            ? 'Real jobs across Hull and the East Riding, photographed before we started and after we finished. No stock photography.'
            : 'We do not put stock photography on this page. Tell us what you are planning and we will send photographs of recent jobs that actually match it.'
        }
      />

      {jobsWithPairs.length > 0 && (
        <Section tone="darker">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow number="01">Before and after</Eyebrow>
              <h2 className="text-white">Drag to compare.</h2>
              <p className="fps-measure mt-5 text-white/70">
                The same room, the same spot, before and after. Taken back to
                brick and joists, then rebuilt.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {jobsWithPairs.map((job) => (
                <Reveal key={job.id}>
                  <JobSlider job={job} tone="dark" />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {hasWork && (
        <Section tone="dark">
          <Container>
            <Reveal className="max-w-2xl">
              <Eyebrow number={jobsWithPairs.length > 0 ? '02' : '01'}>
                Completed jobs
              </Eyebrow>
              <h2 className="text-white">Every bathroom, job by job.</h2>
              <p className="fps-measure mt-5 text-white/70">
                Select any photograph to view it larger.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-12">
              <JobGallery />
            </Reveal>
          </Container>
        </Section>
      )}

      {!hasWork && (
        <Section tone="darker" className="!pt-0">
          <Container>
            <Reveal>
              <WorkEmptyState tone="dark" />
            </Reveal>
          </Container>
        </Section>
      )}

      <Section tone="light">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-fps-ink-900">Want something like this?</h2>
            <p className="fps-measure mx-auto mt-5 text-lg text-fps-ink-600">
              Send a photo of your bathroom on WhatsApp and we will tell you
              what is involved and roughly what it should cost.
            </p>
            <a
              href={site.whatsapp.href(
                'Hi Fluid Plumbing, I saw your bathroom work and would like a quote.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-fps-navy-950 px-7 font-medium text-white transition-colors duration-250 hover:bg-fps-navy-800"
            >
              Message on WhatsApp
            </a>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

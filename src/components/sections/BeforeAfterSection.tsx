import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { jobsWithPairs } from '@/data/jobs';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { JobSlider } from '@/components/ui/JobSlider';
import { WorkEmptyState } from '@/components/ui/WorkEmptyState';

/**
 * Homepage before-and-after slot.
 *
 * Now backed by REAL client photographs, so the heading says what it is.
 * The previous "illustrative examples" framing and its disclosure badges
 * are gone, because they are no longer needed or true.
 *
 * Only jobs in SLIDER_JOB_IDS appear here. Jobs whose before and after
 * crops do not align are shown side by side in the gallery instead.
 */
export function BeforeAfterSection() {
  if (jobsWithPairs.length === 0) {
    return (
      <Section tone="light">
        <Container>
          <Reveal>
            <WorkEmptyState tone="light" />
          </Reveal>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="light">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="05" tone="light">
            Our work
          </Eyebrow>
          <h2 className="text-fps-ink-900">Before and after.</h2>
          <p className="fps-measure mt-5 text-lg text-fps-ink-600">
            Drag the handle to see the difference. This is a real bathroom we
            took back to brick and rebuilt, photographed from the same spot
            before we started and after we finished.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {jobsWithPairs.map((job) => (
            <Reveal key={job.id}>
              <JobSlider job={job} tone="light" />
            </Reveal>
          ))}

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-fps border border-fps-ink-900/10 bg-white p-8">
              <h3 className="font-sora text-xl font-semibold text-fps-ink-900">
                Five finished bathrooms
              </h3>
              <p className="mt-3 text-fps-ink-600">
                From a full Victorian rebuild back to brick, to navy metro
                tile with a roll top bath. All of it our own work, with the
                before shots to prove it.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-fps-ink-900/8 pt-6 text-sm text-fps-ink-600">
                <li>Victorian bathroom stripped and rebuilt</li>
                <li>Dated suite replaced with a full refit</li>
                <li>Navy metro tile with a roll top bath</li>
                <li>Pink zellige and a black roll top</li>
                <li>Rustic bathroom with a timber vanity</li>
              </ul>
              <Link
                href="/gallery/"
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fps-cyan-700"
              >
                See the gallery
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

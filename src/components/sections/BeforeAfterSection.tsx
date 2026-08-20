import { comparisons, APPROVED_COMPARISON_HEADING } from '@/data/comparisons';
import { workImages, beforeAfter } from '@/data/gallery';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ComparisonSlider } from '@/components/ui/ComparisonSlider';
import { WorkEmptyState } from '@/components/ui/WorkEmptyState';

/**
 * Occupies the homepage slot where testimonials would sit.
 *
 * THE HEADING IS FIXED. It comes from APPROVED_COMPARISON_HEADING and reads
 * "Illustrative examples of the standard we work to".
 *
 * Do NOT change it to "Our work", "Recent jobs", "Completed projects", or
 * anything possessive, and do NOT add a location. These are AI-generated
 * illustrative images; captioning them as completed client work is a
 * misleading action under the DMCC Act 2024. See src/data/comparisons.ts.
 *
 * When real client photos land in `workImages` / `beforeAfter`, this section
 * switches to presenting them as genuine work, and the heading changes too.
 */
export function BeforeAfterSection() {
  const hasRealWork = workImages.length > 0 || beforeAfter.length > 0;
  const hasIllustrative = comparisons.length > 0;

  if (!hasIllustrative && !hasRealWork) {
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
            Standard of work
          </Eyebrow>
          <h2 className="text-fps-ink-900">{APPROVED_COMPARISON_HEADING}</h2>
          <p className="fps-measure mt-5 text-lg text-fps-ink-600">
            Drag the handle to see the difference a proper repair makes. These
            are illustrative examples showing the standard we work to, not
            photographs of past jobs. Ask and we will send photos of real work
            that matches what you are planning.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {comparisons.map((item) => (
            <Reveal key={item.id}>
              <ComparisonSlider item={item} tone="light" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

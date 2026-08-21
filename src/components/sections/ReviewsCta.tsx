import { Star, ExternalLink } from 'lucide-react';
import { site } from '@/data/site';
import { testimonials } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/**
 * Social proof slot.
 *
 * Renders real testimonials when `testimonials` in src/data/content.ts holds
 * genuine, attributable reviews. Until then it renders an honest alternative
 * rather than fabricated quotes: a statement that the business is new,
 * paired with the guarantees that stand in place of a review history.
 *
 * Publishing invented reviews breaches the fake-review provisions of the
 * Digital Markets, Competition and Consumers Act 2024, and the liability
 * sits with the business, not the agency. Do not populate `testimonials`
 * with anything the client has not actually received.
 *
 * TO ENABLE REAL REVIEWS: set `site.googleReviewUrl` and replace every entry
 * in `testimonials` with a real one. Both sections switch automatically.
 */

const guarantees = [
  {
    title: 'Fixed price before we start',
    body: 'The number on the quote is the number on the invoice. No day rate that grows.',
  },
  {
    title: 'No call-out fee',
    body: 'You are not charged for us turning up. Look at the job, get a price, decide.',
  },
  {
    title: 'Workmanship guaranteed',
    body: 'If something we fitted fails within the guarantee period, we come back and put it right.',
  },
];

export function ReviewsCta() {
  const hasReviews = testimonials.length > 0;

  if (hasReviews) {
    return (
      <Section tone="light">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow number="06" tone="light">
              What people say
            </Eyebrow>
            <h2 className="text-fps-ink-900">Reviews from around Hull.</h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.name} as="article">
                <figure className="flex h-full flex-col rounded-fps border border-fps-ink-900/10 bg-white p-7">
                  <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className="size-4 fill-fps-aqua-400 text-fps-aqua-400"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-fps-ink-900">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-fps-ink-900/8 pt-5 text-sm">
                    <span className="font-medium text-fps-ink-900">
                      {t.name}, {t.area}
                    </span>
                    <span className="mt-0.5 block text-fps-ink-600">{t.job}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    );
  }

  // No reviews yet. Say so plainly and give the reader something better than
  // a fabricated quote: the terms that protect them.
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow number="06" tone="light">
              Straight about this
            </Eyebrow>
            <h2 className="text-fps-ink-900">
              We would rather earn a review than borrow one.
            </h2>
            <p className="fps-measure mt-5 text-lg text-fps-ink-600">
              This is a new business, so there is no long list of reviews here
              yet. Plenty of trade sites fill that gap with quotes nobody can
              check. We would rather tell you what you are actually promised,
              and let the work speak for itself.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.whatsapp.href(
                  'Hi Fluid Plumbing, could you tell me a bit about recent work you have done?',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fps-navy-950 px-6 font-medium text-white transition-colors duration-250 hover:bg-fps-navy-800"
              >
                <WhatsAppIcon className="size-[18px]" />
                Ask about recent jobs
              </a>
              {site.googleReviewUrl && (
                <a
                  href={site.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-fps-ink-900/20 px-6 font-medium text-fps-ink-900 transition-colors duration-250 hover:border-fps-cyan-700 hover:text-fps-cyan-700"
                >
                  Reviews on Google
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid gap-4">
              {guarantees.map((g) => (
                <li
                  key={g.title}
                  className="rounded-fps border border-fps-ink-900/10 bg-white p-6"
                >
                  <h3 className="font-sora text-base font-semibold text-fps-ink-900">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fps-ink-600">
                    {g.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

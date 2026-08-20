import { Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

export function Testimonials() {
  return (
    <Section tone="light">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="05" tone="light">
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

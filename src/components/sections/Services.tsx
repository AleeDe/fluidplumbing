import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { serviceIcons } from '@/components/ui/ServiceIcons';
import { services } from '@/data/services';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal';
import { OptimisedImage } from '@/components/ui/OptimisedImage';

export function Services() {
  return (
    <Section tone="light" id="services">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="01" tone="light">
            What we do
          </Eyebrow>
          <h2 className="text-fps-ink-900">
            Four things, done to a standard.
          </h2>
          <p className="fps-measure mt-5 text-lg text-fps-ink-600">
            Most of what goes wrong with plumbing falls into one of these. Whichever
            it is, you get the same fixed price up front and the same tidy finish.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <RevealItem key={s.slug} as="article">
                <Link
                  href={`/services/${s.slug}/`}
                  className="fps-card-hover group flex h-full flex-col overflow-hidden rounded-fps border border-fps-ink-900/10 bg-white"
                >
                  <div className="relative aspect-[16/7] overflow-hidden bg-fps-navy-900">
                    <OptimisedImage
                      name={s.image}
                      alt={s.imageAlt}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7 md:p-8">
                  <span
                    aria-hidden="true"
                    className="fps-gradient-bg mb-6 inline-flex size-13 items-center justify-center rounded-2xl p-[1.5px]"
                  >
                    <span className="flex size-full items-center justify-center rounded-[14px] bg-white">
                      <Icon className="size-6 text-fps-cyan-700" strokeWidth={1.75} />
                    </span>
                  </span>

                  <h3 className="text-fps-ink-900">{s.title}</h3>
                  <p className="mt-3 text-fps-ink-600">{s.cardBlurb}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-fps-ink-900/8 pt-6">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-fps-ink-600"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-fps-aqua-400"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fps-cyan-700">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                    />
                  </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}

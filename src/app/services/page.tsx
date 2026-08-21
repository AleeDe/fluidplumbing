import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { serviceIcons } from '@/components/ui/ServiceIcons';
import { services } from '@/data/services';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { AreaHeaderPattern } from '@/components/ui/AreaHeaderPattern';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { OptimisedImage } from '@/components/ui/OptimisedImage';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Plumbing Services in Hull',
  description:
    'Emergency plumbing, bathroom fitting, leak detection and repairs across Hull and the East Riding. Fixed prices, no call-out fee, work guaranteed.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services/' },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services/' },
        ]}
        pattern={<AreaHeaderPattern slug="services" image="hero-services" />}
        eyebrow="Services"
        title="What we do, and how we do it."
        intro="Four services, covered properly across Hull and the East Riding. Whichever you need, the price is agreed before work starts and the workmanship is guaranteed."
      />

      <Section tone="light">
        <Container>
          <RevealGroup className="grid gap-5 md:grid-cols-2">
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
                    <h2 className="font-sora text-xl font-semibold text-fps-ink-900">
                      {s.title}
                    </h2>
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

          <Reveal className="mt-12">
            <p className="fps-measure text-fps-ink-600">
              Not sure which one you need? Describe the problem on WhatsApp and we
              will tell you. If it is something we do not cover, we will say so
              rather than waste your time.
            </p>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

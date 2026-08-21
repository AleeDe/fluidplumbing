import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { areas } from '@/data/areas';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { AreaHeaderPattern } from '@/components/ui/AreaHeaderPattern';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Areas We Cover',
  description:
    'Plumbers covering Hull, Beverley, Cottingham, Hessle, Bridlington and across the East Riding of Yorkshire. Find your area.',
  alternates: { canonical: '/areas/' },
};

export default function AreasPage() {
  const hull = areas.filter((a) => a.county === 'Kingston upon Hull');
  const eastRiding = areas.filter((a) => a.county !== 'Kingston upon Hull');

  const Group = ({ title, list }: { title: string; list: typeof areas }) => (
    <div className="mb-14 last:mb-0">
      <h2 className="font-sora text-sm font-semibold uppercase tracking-[0.14em] text-fps-cyan-700">
        {title}
      </h2>
      <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => (
          <RevealItem key={a.slug}>
            <Link
              href={`/areas/${a.slug}/`}
              className="fps-card-hover group flex h-full flex-col rounded-fps border border-fps-ink-900/10 bg-white p-6"
            >
              <h3 className="font-sora text-lg font-semibold text-fps-ink-900">{a.name}</h3>
              <p className="tabular mt-1 font-mono text-xs uppercase tracking-[0.12em] text-fps-ink-500">
                {a.postcodes.join(' · ')}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-fps-ink-600">
                {a.intro[0].split('. ')[0]}.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fps-cyan-700">
                Plumber in {a.name}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Areas', href: '/areas/' },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Areas', href: '/areas/' },
        ]}
        pattern={<AreaHeaderPattern slug="areas" image="stopcock" />}
        eyebrow="Coverage"
        title="Where we work."
        intro={`We cover ${areas.length} towns and districts across Hull and the East Riding of Yorkshire. Pick yours to see what we do locally, or message us if you are just outside.`}
      />

      <Section tone="light">
        <Container>
          <Group title="Kingston upon Hull" list={hull} />
          <Group title="East Riding of Yorkshire" list={eastRiding} />
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Phone, MapPin, ArrowRight, Info } from 'lucide-react';
import { areas, getArea } from '@/data/areas';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { AreaHeaderPattern } from '@/components/ui/AreaHeaderPattern';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { areaServiceSchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: `/areas/${area.slug}/` },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `/areas/${area.slug}/`,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const nearby = areas.filter((a) => a.slug !== area.slug).slice(0, 6);

  return (
    <>
      <JsonLd data={areaServiceSchema(area.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Areas', href: '/areas/' },
          { name: area.name, href: `/areas/${area.slug}/` },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Areas', href: '/areas/' },
          { name: area.name, href: `/areas/${area.slug}/` },
        ]}
        pattern={<AreaHeaderPattern slug={area.slug} />}
        eyebrow={area.postcodes.join(' · ')}
        title={area.h1}
        intro={area.intro[0]}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            href={site.whatsapp.href(`Hi Fluid Plumbing, I am in ${area.name} and need a plumber.`)}
            variant="primary"
            size="lg"
          >
            <WhatsAppIcon className="size-[18px]" />
            Message on WhatsApp
          </Button>
          <Button href={site.phone.href} variant="ghost" size="lg">
            <Phone aria-hidden="true" className="size-[18px]" />
            {site.phone.display}
          </Button>
        </div>
      </PageHero>

      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-fps-ink-900">
                  Plumbing work in {area.name}
                </h2>
                {area.intro.slice(1).map((p) => (
                  <p key={p} className="fps-measure mt-5 text-fps-ink-600">
                    {p}
                  </p>
                ))}
              </Reveal>

              <Reveal className="mt-10">
                <div className="rounded-fps border border-fps-cyan-700/20 bg-white p-6">
                  <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-fps-cyan-700">
                    <Info aria-hidden="true" className="size-3.5" />
                    Local note
                  </p>
                  <p className="fps-measure text-fps-ink-600">{area.localNote}</p>
                </div>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="text-fps-ink-900">
                  What we cover in {area.name}
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}/`}
                      className="fps-card-hover group rounded-fps border border-fps-ink-900/10 bg-white p-5"
                    >
                      <h3 className="font-sora text-base font-semibold text-fps-ink-900">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fps-ink-600">
                        {s.cardBlurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fps-cyan-700">
                        Learn more
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="rounded-fps border border-fps-ink-900/10 bg-white p-7">
                  <p className="flex items-center gap-2 font-sora text-lg font-semibold text-fps-ink-900">
                    <MapPin aria-hidden="true" className="size-5 text-fps-aqua-400" />
                    {area.name}
                  </p>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="text-fps-ink-600">Postcodes</dt>
                      <dd className="tabular mt-0.5 font-medium text-fps-ink-900">
                        {area.postcodes.join(', ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-fps-ink-600">Area</dt>
                      <dd className="mt-0.5 font-medium text-fps-ink-900">{area.county}</dd>
                    </div>
                    <div>
                      <dt className="text-fps-ink-600">Emergency cover</dt>
                      <dd className="mt-0.5 font-medium text-fps-ink-900">
                        {site.hours.emergency}
                      </dd>
                    </div>
                  </dl>
                  <Button
                    href={site.whatsapp.href(
                      `Hi Fluid Plumbing, I am in ${area.name} and would like a quote.`,
                    )}
                    variant="primary"
                    className="mt-6 w-full"
                  >
                    <WhatsAppIcon className="size-[18px]" />
                    Get a free quote
                  </Button>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="darker">
        <Container>
          <Reveal>
            <h2 className="text-white">We also cover</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {nearby.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}/`}
                    className="inline-block rounded-full border border-fps-navy-700 bg-fps-navy-900/60 px-4 py-2 text-sm text-white/75 transition-all duration-250 hover:border-fps-aqua-400/50 hover:bg-fps-aqua-400/8 hover:text-fps-aqua-400"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas/"
                  className="inline-block rounded-full border border-fps-aqua-400/40 px-4 py-2 text-sm font-medium text-fps-aqua-400 transition-colors hover:bg-fps-aqua-400/10"
                >
                  All areas →
                </Link>
              </li>
            </ul>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight, Phone } from 'lucide-react';
import { services, getService } from '@/data/services';
import { site } from '@/data/site';
import { beforeAfter } from '@/data/gallery';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Explainer } from '@/components/ui/Explainer';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const showSlider = service.slug === 'bathroom-fitting';

  return (
    <>
      <JsonLd data={serviceSchema(service.slug)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services/' },
          { name: service.title, href: `/services/${service.slug}/` },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services/' },
          { name: service.title, href: `/services/${service.slug}/` },
        ]}
        title={service.h1}
        intro={service.intro}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            href={site.whatsapp.href(`Hi Fluid Plumbing, I need help with ${service.title.toLowerCase()}.`)}
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

      {/* Body */}
      <Section tone="light">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div>
              {service.body.map((block) => (
                <Reveal key={block.heading} className="mb-12 last:mb-0">
                  <h2 className="text-fps-ink-900">{block.heading}</h2>
                  {block.paragraphs.map((p) => (
                    <p key={p} className="fps-measure mt-5 text-fps-ink-600">
                      {p}
                    </p>
                  ))}
                </Reveal>
              ))}

              {service.explainer && (
                <Reveal className="mt-4">
                  <Explainer
                    tone="light"
                    name={service.explainer.name}
                    alt={service.explainer.alt}
                    caption={service.explainer.caption}
                    className="max-w-lg"
                  />
                </Reveal>
              )}

              {showSlider && (
                <Reveal className="mt-14">
                  <h2 className="text-fps-ink-900">Before and after</h2>
                  <p className="fps-measure mt-5 text-fps-ink-600">
                    Drag the handle to see the difference. These are real jobs, not
                    showroom photography.
                  </p>
                  <div className="mt-8 space-y-6">
                    {beforeAfter.map((item) => (
                      <BeforeAfter key={item.id} item={item} />
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="rounded-fps border border-fps-ink-900/10 bg-white p-7">
                  <h2 className="font-sora text-lg font-semibold text-fps-ink-900">
                    What you get
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {service.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-fps-ink-600">
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-fps-aqua-400"
                        />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-fps-ink-900/8 pt-5 text-sm font-medium text-fps-ink-900">
                    {service.priceNote}
                  </p>
                  <Button
                    href={site.whatsapp.href(
                      `Hi Fluid Plumbing, I would like a quote for ${service.title.toLowerCase()}.`,
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

      {/* Other services */}
      <Section tone="darker">
        <Container>
          <Reveal>
            <h2 className="text-white">Other things we do</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Reveal key={o.slug}>
                <Link
                  href={`/services/${o.slug}/`}
                  className="fps-card-hover group flex h-full flex-col justify-between rounded-fps border border-fps-navy-700 bg-fps-navy-900/60 p-6"
                >
                  <div>
                    <h3 className="font-sora text-base font-semibold text-white">{o.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                      {o.cardBlurb}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fps-aqua-400">
                    Learn more
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-250 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

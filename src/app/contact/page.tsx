import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { site } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/ui/ContactForm';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Fluid Plumbing Solutions in Hull. Message on WhatsApp for the fastest answer, or call. No call-out fee and free quotes.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact/' },
        ])}
      />

      <PageHero
        trail={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact/' },
        ]}
        eyebrow="Contact"
        title="Tell us what has gone wrong."
        intro="WhatsApp is the quickest way to reach us. Send a photo of the problem and you will usually get an answer within minutes, along with a rough idea of cost."
      />

      <Section tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2 className="text-white">Get in touch</h2>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={site.whatsapp.href(site.whatsapp.defaultMessage)}
                  variant="primary"
                  size="lg"
                >
                  <WhatsAppIcon className="size-[18px]" />
                  Message on WhatsApp
                </Button>
                <Button href={site.phone.href} variant="ghost" size="lg">
                  <Phone aria-hidden="true" className="size-[18px]" />
                  Call now
                </Button>
              </div>

              <address className="mt-10 space-y-5 not-italic">
                <div className="flex items-start gap-3.5">
                  <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-fps-aqua-400" />
                  <div>
                    <p className="text-sm text-white/50">Phone</p>
                    <a
                      href={site.phone.href}
                      className="tabular inline-flex min-h-11 items-center text-lg text-white transition-colors hover:text-fps-aqua-400"
                    >
                      {site.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-fps-aqua-400" />
                  <div className="min-w-0">
                    <p className="text-sm text-white/50">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex min-h-11 items-center break-all text-lg text-white transition-colors hover:text-fps-aqua-400"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-fps-aqua-400" />
                  <div>
                    <p className="text-sm text-white/50">Based in</p>
                    <p className="text-lg text-white">
                      {site.address.locality}, {site.address.region}
                    </p>
                    <p className="mt-1 text-sm text-white/55">
                      Covering Hull and the East Riding
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-fps-aqua-400" />
                  <div>
                    <p className="text-sm text-white/50">Hours</p>
                    <p className="text-lg text-white">{site.hours.summary}</p>
                    <p className="mt-1 text-sm text-fps-amber-500">{site.hours.emergency}</p>
                  </div>
                </div>
              </address>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

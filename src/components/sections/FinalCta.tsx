import { Phone, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { ContactForm } from '@/components/ui/ContactForm';

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-fps-navy-950 py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="fps-gradient-bg pointer-events-none absolute inset-0 opacity-[0.14]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fps-aqua-400/45 to-transparent"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 id="final-cta-heading" className="text-white">
              Get a free quote today.
            </h2>
            <p className="fps-measure mt-5 text-lg text-white/75">
              Send a photo on WhatsApp and we will tell you what is likely wrong and
              what it should cost. No call-out fee, and no obligation to book.
            </p>

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
                {site.phone.display}
              </Button>
            </div>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 break-all py-2 text-sm text-white/55 transition-colors hover:text-fps-aqua-400"
            >
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import { Phone, Check } from 'lucide-react';
import { site } from '@/data/site';
import { trustChips } from '@/data/content';
import { HeroVisual } from '@/components/ui/HeroVisual';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { WaterBackground } from '@/components/ui/WaterBackground';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { Grain } from '@/components/ui/Grain';
import { MagneticCta } from '@/components/ui/MagneticCta';

/**
 * SERVER COMPONENT - deliberately.
 *
 * The <h1> here is the LCP element. Entrance animation is done with CSS
 * (.fps-rise) rather than Motion so the hero paints straight from the static
 * HTML instead of waiting for the JS bundle to hydrate. Motion is still used
 * below the fold, where hydration cost is off the critical path.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden bg-fps-navy-950 pt-28 pb-16 md:pt-32 md:pb-24">
      <WaterBackground />
      <Grain />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="fps-rise mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-fps-aqua-400">
              Hull &amp; East Riding &middot; Insured &amp; guaranteed
            </p>

            <h1 className="fps-rise text-balance text-white" style={{ animationDelay: '0.08s' }}>
              <span className="whitespace-nowrap">Plumbing in Hull,</span>{' '}
              <span className="relative inline-block">
                done properly.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full md:-bottom-2 md:h-[7px]"
                  style={{ backgroundImage: 'linear-gradient(90deg, #0EA5E9 0%, #2DD4BF 100%)' }}
                />
              </span>
            </h1>

            <p className="fps-rise fps-measure mt-8 text-lg text-white/70" style={{ animationDelay: '0.16s' }}>
              Emergency callouts answered fast, and bathrooms finished to a standard
              you would be happy to show people. Message on WhatsApp and you will get
              a straight answer, usually within minutes.
            </p>

            <div className="fps-rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.24s' }}>
              <MagneticCta>
                <Button href={site.whatsapp.href(site.whatsapp.defaultMessage)} variant="primary" size="lg">
                  <WhatsAppIcon className="size-[18px]" />
                  Message on WhatsApp
                </Button>
              </MagneticCta>
              <MagneticCta>
                <Button href={site.phone.href} variant="ghost" size="lg">
                  <Phone aria-hidden="true" className="size-[18px]" />
                  Call 24/7
                </Button>
              </MagneticCta>
            </div>

            <ul className="fps-rise mt-9 flex flex-wrap gap-x-6 gap-y-3" style={{ animationDelay: '0.32s' }}>
              {trustChips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-sm text-white/65">
                  <Check aria-hidden="true" className="size-4 shrink-0 text-fps-aqua-400" />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="fps-rise" style={{ animationDelay: '0.2s' }}>
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

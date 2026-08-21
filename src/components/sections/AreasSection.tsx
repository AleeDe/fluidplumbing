import Link from 'next/link';
import { areas } from '@/data/areas';
import { site } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function AreasSection() {
  return (
    <Section tone="dark">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="06">Where we work</Eyebrow>
          <h2 className="text-white">Covering Hull and the East Riding.</h2>
          <p className="fps-measure mt-5 text-lg text-white/70">
            Based in Hull and out across the East Riding daily. If your town is on
            this list, we are already working near you.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <nav aria-label="Areas we cover" className="mt-12">
            <ul className="flex flex-wrap gap-2.5">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}/`}
                    className="inline-block rounded-full border border-fps-navy-700 bg-fps-navy-900/60 px-4 py-2 text-sm text-white/75 transition-all duration-250 hover:border-fps-aqua-400/50 hover:bg-fps-aqua-400/8 hover:text-fps-aqua-400"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-10 text-white/60">
            Not sure if we cover you?{' '}
            <a
              href={site.whatsapp.href('Hi Fluid Plumbing, do you cover my area?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-fps-aqua-400 underline-offset-4 hover:underline"
            >
              <WhatsAppIcon className="size-4" />
              Message us and ask
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

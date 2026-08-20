import { Zap, Receipt, Shield, Sparkles, BadgeCheck, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { reasons } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  receipt: Receipt,
  shield: Shield,
  sparkles: Sparkles,
  'badge-check': BadgeCheck,
  'map-pin': MapPin,
};

export function WhyUs() {
  return (
    <Section tone="dark">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow number="02">Why choose us</Eyebrow>
          <h2 className="text-white">
            The things that actually matter when you let someone into your house.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => {
            const Icon = icons[r.icon];
            return (
              <RevealItem key={r.title}>
                <Icon
                  aria-hidden="true"
                  className="size-6 text-fps-aqua-400"
                  strokeWidth={1.75}
                />
                <h3 className="mt-4 font-sora text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/60">
                  {r.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}

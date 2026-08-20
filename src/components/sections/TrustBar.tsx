import { Check } from 'lucide-react';
import { stats, trustClaims, TRUST_BAR_MODE } from '@/data/content';
import { Container } from '@/components/ui/Container';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Grain } from '@/components/ui/Grain';

/**
 * Two modes, switched by TRUST_BAR_MODE in src/data/content.ts.
 * Defaults to 'qualitative' because the numeric figures are still invented.
 * See DECISIONS.md item 3.
 */
export function TrustBar() {
  const numeric = TRUST_BAR_MODE === 'numeric';

  return (
    <section
      aria-label={numeric ? 'Track record' : 'What you get'}
      className="relative border-y border-fps-navy-700 bg-fps-navy-900 py-12 md:py-14"
    >
      <Grain />
      <Container className="relative">
        {numeric ? (
          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {stats.map((s) => (
              <RevealItem key={s.label} className="text-center lg:text-left">
                <p className="tabular font-sora text-4xl font-bold text-white md:text-5xl">
                  <NumberTicker
                    value={s.value}
                    decimals={s.decimals ?? 0}
                    prefix={s.prefix ?? ''}
                    suffix={s.suffix ?? ''}
                  />
                </p>
                <p className="mt-2 text-sm text-white/55">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {trustClaims.map((c) => (
              <RevealItem key={c.title} className="flex items-start gap-3">
                <Check
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 text-fps-aqua-400"
                  strokeWidth={2.25}
                />
                <div>
                  <p className="font-sora text-lg font-semibold leading-snug text-white">
                    {c.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{c.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Container>
    </section>
  );
}

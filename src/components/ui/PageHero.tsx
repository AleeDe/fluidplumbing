import { Container } from '@/components/ui/Container';
import { Grain } from '@/components/ui/Grain';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  pattern,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  trail: { name: string; href: string }[];
  /** Optional decorative background layer, e.g. <AreaHeaderPattern /> on area pages. */
  pattern?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-fps-navy-950 pt-32 pb-16 md:pt-40 md:pb-20">
      <Grain />
      {pattern}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 70% at 75% 0%, rgba(14,165,233,0.14) 0%, rgba(4,18,31,0) 62%)',
        }}
      />
      <Container className="relative">
        <Breadcrumbs trail={trail} />
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl text-white">{title}</h1>
        {intro && <p className="fps-measure mt-6 text-lg text-white/70">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

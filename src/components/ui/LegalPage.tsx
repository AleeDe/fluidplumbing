import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';

export function LegalPage({
  title,
  updated,
  trail,
  sections,
}: {
  title: string;
  updated: string;
  trail: { name: string; href: string }[];
  sections: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <>
      <PageHero trail={trail} title={title} />
      <Section tone="light">
        <Container>
          <p className="text-sm text-fps-ink-500">Last updated: {updated}</p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-sora text-xl font-semibold text-fps-ink-900">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="fps-measure mt-4 text-fps-ink-600">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

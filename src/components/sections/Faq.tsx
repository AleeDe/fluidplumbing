import { faqs } from '@/data/content';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

export function Faq() {
  return (
    <Section tone="light" id="faq">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow number="07" tone="light">
              Questions
            </Eyebrow>
            <h2 className="text-fps-ink-900">Straight answers.</h2>
            <p className="fps-measure mt-5 text-fps-ink-600">
              If what you want to know is not here, message us and ask. You will get
              a proper answer rather than a sales pitch.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="w-full border-t border-fps-ink-900/12">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Services } from '@/components/sections/Services';
import { EmergencyBand } from '@/components/sections/EmergencyBand';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection';
import { AreasSection } from '@/components/sections/AreasSection';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  // absolute: bypasses the layout template, which would double the brand name
  title: { absolute: 'Plumber in Hull | Fluid Plumbing Solutions' },
  description:
    'Plumbers in Hull and the East Riding. Emergency callouts, bathroom fitting, leak detection and repairs. No call-out fee. Message on WhatsApp.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', href: '/' }])} />

      <Hero />
      <TrustBar />
      <Services />
      <EmergencyBand />
      <WhyUs />
      <Process />
      <GalleryPreview />
      <BeforeAfterSection />
      <AreasSection />
      <Faq />
      <FinalCta />
    </>
  );
}

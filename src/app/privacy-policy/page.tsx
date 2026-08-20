import type { Metadata } from 'next';
import { site } from '@/data/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Fluid Plumbing Solutions collects, uses and stores your personal information, and your rights under UK GDPR.',
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="21 August 2026"
      trail={[
        { name: 'Home', href: '/' },
        { name: 'Privacy policy', href: '/privacy-policy/' },
      ]}
      sections={[
        {
          heading: 'Who we are',
          paragraphs: [
            `${site.legalName} is a plumbing business based in ${site.address.locality}, ${site.address.region}, operating across Hull and the East Riding of Yorkshire.`,
            `For any question about this policy or about your personal data, contact us at ${site.email} or on ${site.phone.display}.`,
          ],
        },
        {
          heading: 'What we collect',
          paragraphs: [
            'When you submit the enquiry form on this website we collect your name, phone number, the service you are asking about, and the details you write in the message box. Providing an email address is optional.',
            'If you contact us by WhatsApp, by phone or by email, we hold whatever you choose to send us in the course of that conversation. WhatsApp messages are also processed by Meta under their own privacy terms.',
            'This website does not use analytics, advertising or tracking cookies. We do not build a profile of you and we do not track you across other websites.',
          ],
        },
        {
          heading: 'Why we hold it, and on what basis',
          paragraphs: [
            'We use your information for one purpose: to respond to your enquiry, quote for the work, carry it out, and keep a record of the job afterwards. The lawful basis is legitimate interest for responding to an enquiry you initiated, and performance of a contract once you engage us to do work.',
            'We do not sell your details, and we do not pass them to lead-generation companies or to other trades for marketing.',
          ],
        },
        {
          heading: 'Who processes it',
          paragraphs: [
            'The enquiry form is delivered by Web3Forms, which passes the submission to our email inbox. Our email is provided by Google. WhatsApp messages are processed by Meta. Each of these providers processes data under their own terms and applicable UK data protection law.',
          ],
        },
        {
          heading: 'How long we keep it',
          paragraphs: [
            'Enquiries that do not become jobs are kept for up to 12 months and then deleted. Records relating to completed work, including invoices, are kept for six years to meet HMRC requirements and to support the workmanship guarantee.',
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            'Under UK GDPR you can ask us for a copy of the personal data we hold about you, ask us to correct it if it is wrong, ask us to delete it, or object to how we are using it. Contact us and we will respond within one calendar month.',
            'If you are not satisfied with how we have handled your data, you can complain to the Information Commissioner’s Office at ico.org.uk.',
          ],
        },
      ]}
    />
  );
}

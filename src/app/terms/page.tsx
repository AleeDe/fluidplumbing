import type { Metadata } from 'next';
import { site } from '@/data/site';
import { LegalPage } from '@/components/ui/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms on which Fluid Plumbing Solutions provides quotes, carries out plumbing work, and guarantees workmanship.',
  alternates: { canonical: '/terms/' },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="21 August 2026"
      trail={[
        { name: 'Home', href: '/' },
        { name: 'Terms', href: '/terms/' },
      ]}
      sections={[
        {
          heading: 'These terms',
          paragraphs: [
            `These terms apply to work carried out by ${site.legalName}. They sit alongside your written quote. Where a quote says something different from these terms, the quote takes precedence.`,
            'Nothing in these terms affects your statutory rights as a consumer under the Consumer Rights Act 2015.',
          ],
        },
        {
          heading: 'Quotes and pricing',
          paragraphs: [
            'Quotes are free and are valid for 30 days from the date issued. A quote is a fixed price for the work described in it.',
            'If work is needed that was not visible or reasonably foreseeable when we quoted, for example corroded pipework found once a floor is lifted, we will stop, explain the position, and agree a revised price with you before continuing. We will not carry out additional chargeable work without your agreement.',
            'We do not charge a call-out fee.',
          ],
        },
        {
          heading: 'Payment',
          paragraphs: [
            'Payment is by bank transfer or card. For repairs and callouts, payment is due on completion. For larger installations such as full bathrooms, payment is staged, and the stages are set out in your quote.',
            'Materials we supply remain our property until they are paid for in full.',
          ],
        },
        {
          heading: 'Access and appointments',
          paragraphs: [
            'You are responsible for providing safe access to the work area at the agreed time, and for clearing personal belongings from it where practical.',
            'If you need to cancel or rearrange, please give us as much notice as you can. If nobody is present at the agreed time and we have not been told in advance, we may charge for the wasted visit.',
          ],
        },
        {
          heading: 'Guarantee',
          paragraphs: [
            'Our workmanship is guaranteed. If something we installed or repaired fails because of how we did the work, we will return and put it right at no cost to you.',
            'Parts and materials we supply carry the manufacturer’s warranty. Where you have supplied the materials yourself, our guarantee covers our workmanship but not the item.',
            'The guarantee does not cover fair wear and tear, damage caused by misuse or by someone else working on the installation afterwards, blockages caused by items that should not have been put down a waste, or pre-existing faults elsewhere in the system that we did not quote to address.',
          ],
        },
        {
          heading: 'Work we do not carry out',
          paragraphs: [
            'We do not work on gas appliances, boilers or gas pipework. That work must be carried out by a Gas Safe registered engineer, and we will tell you if what you need falls into that category.',
          ],
        },
        {
          heading: 'Liability',
          paragraphs: [
            'We hold public liability insurance and will provide the certificate on request.',
            'We are responsible for loss or damage that is a foreseeable result of our breaking these terms or failing to use reasonable care and skill. We are not responsible for loss or damage that was not foreseeable, or for pre-existing defects that our work did not cause. Nothing here limits our liability for death or personal injury caused by negligence, or for fraud.',
          ],
        },
        {
          heading: 'Complaints',
          paragraphs: [
            `If something is not right, contact us first at ${site.email} or on ${site.phone.display}. We would rather hear about it and fix it. These terms are governed by the law of England and Wales.`,
          ],
        },
      ]}
    />
  );
}

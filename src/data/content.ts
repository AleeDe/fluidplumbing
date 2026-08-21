
/* ---------------------------------------------------------------- FAQs */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Do you charge a call-out fee?',
    a: 'No. You are not charged simply for us turning up. We look at the job, tell you what it will cost, and you decide from there. If you would rather not go ahead, that is fine and there is nothing to pay.',
  },
  {
    q: 'How quickly can you get to an emergency?',
    a: 'For genuine emergencies in Hull and the immediate surrounding area we aim to be with you the same day, and usually within a couple of hours. Message us on WhatsApp with a photo and we will give you a straight answer on timing rather than a vague one.',
  },
  {
    q: 'Are you available outside normal working hours?',
    a: 'Emergency callouts are available outside standard hours. Routine work such as bathroom fitting and non-urgent repairs is booked during normal working hours so the job gets the time it needs.',
  },
  {
    q: 'How do I pay, and when?',
    a: 'Bank transfer or card. Payment is due on completion for repairs and callouts. Larger jobs such as full bathrooms are staged, with the terms set out in writing in your quote before any work starts.',
  },
  {
    q: 'Is your work guaranteed?',
    a: 'Yes. Workmanship is guaranteed, and any parts we supply carry the manufacturer’s warranty on top of that. If something we fitted fails within the guarantee period, we come back and put it right.',
  },
  {
    q: 'Are you insured?',
    a: 'Yes, we carry public liability insurance. We are happy to provide the certificate and cover details on request before work begins, and landlords and letting agents are welcome to ask for it as standard.',
  },
  {
    q: 'How long does a full bathroom take to fit?',
    a: 'Most complete bathrooms take between five and ten working days. The variables are the amount of tiling, whether anything is moving position, and how much remedial work appears once the old suite is out. Your quote will give a realistic timeframe rather than an optimistic one.',
  },
  {
    q: 'Do you supply the materials, or do I?',
    a: 'Either. We can supply everything through trade accounts, or fit a suite you have bought yourself. If you are supplying it, tell us before the quote so we can check it is complete and suitable, because missing waste kits and wrong-size trays are the usual cause of delays.',
  },
];

/* -------------------------------------------------------- Testimonials */
/**
 * NOT CURRENTLY RENDERED ANYWHERE.
 *
 * These are invented placeholders. Publishing invented reviews breaches the
 * fake-review provisions of the Digital Markets, Competition and Consumers
 * Act 2024, so the homepage slot they were written for now carries the
 * before/after comparison instead (`BeforeAfterSection`).
 *
 * TO ENABLE: replace every entry below with a real, attributable review —
 * then render <Testimonials /> in src/app/page.tsx. Do not ship this data
 * as-is. See DECISIONS.md item 4.
 */

export type Testimonial = {
  quote: string;
  name: string;
  area: string;
  job: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Pipe went under the kitchen floor on a Sunday morning. Sent a message and had a reply in minutes with what to turn off. Sorted the same day and left the place clean.',
    name: 'Sarah M.',
    area: 'Cottingham',
    job: 'Emergency callout',
  },
  {
    quote:
      'Quoted a full bathroom in writing and the final bill was the same number. That alone puts them ahead of the last two trades we used. Tidy work and the tiling is spot on.',
    name: 'David R.',
    area: 'Willerby',
    job: 'Bathroom fitting',
  },
  {
    quote:
      'Had a damp patch on the ceiling for months and two people had guessed at it. Found the actual leak in under an hour without pulling the ceiling down.',
    name: 'Joanne T.',
    area: 'Hessle',
    job: 'Leak detection',
  },
];

/* ------------------------------------------------------------- Process */

export const processSteps = [
  {
    step: '01',
    title: 'Get in touch',
    body: 'Message on WhatsApp with a photo, or call. You get a real answer from Zack, not a call centre.',
  },
  {
    step: '02',
    title: 'Free quote',
    body: 'We look at the job properly and give you a fixed price. No call-out fee and no obligation.',
  },
  {
    step: '03',
    title: 'We do the work',
    body: 'Booked for a time that suits you. If anything unexpected turns up, you hear about it before we act on it.',
  },
  {
    step: '04',
    title: 'Guaranteed and tidy',
    body: 'The job is finished, the site is cleaned, and the workmanship is guaranteed.',
  },
];

/* ---------------------------------------------------------- Why choose */

export type Reason = { icon: string; title: string; body: string };

export const reasons: Reason[] = [
  {
    icon: 'zap',
    title: 'Fast to answer',
    body: 'WhatsApp gets you a reply quickly, usually with practical advice before we have even set off.',
  },
  {
    icon: 'receipt',
    title: 'Fixed, transparent pricing',
    body: 'You are told the price before work starts. The number on the quote is the number on the invoice.',
  },
  {
    icon: 'shield',
    title: 'Fully insured',
    body: 'Public liability cover in place, and we will show you the certificate before we start if you want to see it.',
  },
  {
    icon: 'sparkles',
    title: 'Tidy workmanship',
    body: 'Dust sheets down, site cleaned at the end of every day, and the old suite taken away rather than left in your garden.',
  },
  {
    icon: 'badge-check',
    title: 'Work guaranteed',
    body: 'Workmanship guaranteed and parts covered by manufacturer warranty. If it fails, we come back.',
  },
  {
    icon: 'map-pin',
    title: 'Local to Hull',
    body: 'Based in Hull, working across the East Riding. You are dealing with the person doing the job.',
  },
];

/* --------------------------------------------------------- Trust stats */
/**
 * The trust bar has two modes. Flip `TRUST_BAR_MODE` to switch.
 *
 *  'qualitative'  (CURRENT DEFAULT) — claims that are true on day one and need
 *                 no numbers to back them up. Safe to ship immediately.
 *
 *  'numeric'      — the counting stat bar. DO NOT ENABLE until every figure in
 *                 `stats` is a real number Zack has confirmed. Publishing
 *                 invented figures as fact is a CPR 2008 misleading-action
 *                 risk. The review score is the most dangerous: it implies
 *                 aggregate review data and needs a real Google Business
 *                 Profile behind it.
 *
 * See DECISIONS.md item 3.
 */
export const TRUST_BAR_MODE: 'qualitative' | 'numeric' = 'qualitative';

/** Shown when TRUST_BAR_MODE === 'qualitative'. True from day one. */
export const trustClaims = [
  { title: '24/7 emergency callouts', body: 'Confirmed, we answer out of hours' },
  { title: 'Free quotes', body: 'Fixed price agreed before we start' },
  { title: 'Hull & East Riding', body: 'Local, and out across the region daily' },
  { title: 'WhatsApp first', body: 'Send a photo, get a straight answer' },
];

/**
 * Shown when TRUST_BAR_MODE === 'numeric'.
 * EVERY VALUE BELOW IS INVENTED AND MUST BE REPLACED BEFORE ENABLING.
 */
export const stats = [
  { value: 12, suffix: '+', label: 'Years on the tools' },
  { value: 1400, suffix: '+', label: 'Jobs completed' },
  { value: 90, prefix: '<', suffix: ' min', label: 'Average emergency response' },
  { value: 5.0, decimals: 1, suffix: '★', label: 'Average review score' },
];

export const trustChips = [
  '24/7 emergencies',
  'Fully insured',
  'Free quotes',
  'No call-out fee',
];

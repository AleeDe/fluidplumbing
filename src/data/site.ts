/**
 * SINGLE SOURCE OF TRUTH.
 * Change the phone or WhatsApp number HERE and it updates across the entire site.
 * See DECISIONS.md for every value that still needs confirming with the client.
 */

/** PLACEHOLDER — replace with Zack's real number. E.164, no spaces. */
const PHONE_E164 = '+447000000000';
/** Human-readable form shown on screen. */
const PHONE_DISPLAY = '07000 000000';

export const site = {
  name: 'Fluid Plumbing Solutions',
  shortName: 'Fluid Plumbing',
  legalName: 'Fluid Plumbing Solutions',
  owner: 'Zack Gibson',
  url: 'https://fluidplumbingsolutions.co.uk',
  description:
    'Plumbers in Hull and the East Riding. Emergency callouts, bathroom fitting, leak detection and repairs. Message on WhatsApp for a fast answer.',

  phone: {
    e164: PHONE_E164,
    display: PHONE_DISPLAY,
    href: `tel:${PHONE_E164}`,
  },

  whatsapp: {
    /** wa.me requires the number without the leading +. */
    number: PHONE_E164.replace('+', ''),
    href: (message?: string) =>
      `https://wa.me/${PHONE_E164.replace('+', '')}${
        message ? `?text=${encodeURIComponent(message)}` : ''
      }`,
    defaultMessage:
      'Hi Zack, I found you on your website and would like a quote please.',
  },

  email: 'Fluidplumbingsolutions@gmail.com',

  address: {
    locality: 'Kingston upon Hull',
    region: 'East Riding of Yorkshire',
    country: 'GB',
    countryName: 'United Kingdom',
    postalCodeArea: 'HU',
  },

  geo: { latitude: 53.7457, longitude: -0.3367 },

  /**
   * Trading hours.
   *
   * `emergency` — 24/7 availability was CONFIRMED BY THE CLIENT on the intake
   * form. It was previously hedged while unverified; that hedge is now lifted.
   *
   * If this ever stops being true, change it back immediately. An unanswered
   * 3am call on a published 24/7 promise is a CPR 2008 misleading action and,
   * more practically, a 1-star review a new business will carry for months.
   *
   * `summary` (Mon-Sat trading hours) is still UNCONFIRMED — see DECISIONS.md.
   */
  hours: {
    summary: 'Monday to Saturday, 8am to 6pm',
    emergency: '24/7 for emergency callouts',
    spec: [
      { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
      { days: ['Saturday'], opens: '08:00', closes: '16:00' },
    ],
  },

  priceRange: '££',

  /** No social profiles supplied yet — see DECISIONS.md. */
  sameAs: [] as string[],

  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',

  builtBy: { name: 'ShiftDeploy', url: 'https://shiftdeploy.com' },
} as const;

export type Site = typeof site;

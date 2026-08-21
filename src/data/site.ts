/**
 * SINGLE SOURCE OF TRUTH.
 * Change the phone or WhatsApp number HERE and it updates across the entire site.
 * See DECISIONS.md for every value that still needs confirming with the client.
 */

/**
 * Client's real mobile. E.164, no spaces.
 * Changing this one constant updates every call link, every WhatsApp link
 * and the LocalBusiness schema across the whole site.
 */
const PHONE_E164 = '+447581213828';
/** Human-readable form shown on screen (UK national format). */
const PHONE_DISPLAY = '07581 213828';

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
    /**
     * Pre-filled opening message. Kept short and specific so the enquiry is
     * already useful before Zack replies. Deliberately does NOT include a
     * dash character (see the site-wide punctuation rule).
     */
    defaultMessage:
      'Hi Fluid Plumbing, I found you on your website and I am looking for a plumber.',
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

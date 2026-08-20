export type Service = {
  slug: string;
  /** Key into optimisedImages. Illustrative photography, NOT this business's work. */
  image: 'service-emergency' | 'service-bathroom' | 'service-leak' | 'service-maintenance';
  /**
   * Describes only what the photograph SHOWS. No location, no possessive,
   * no implied authorship. See IMAGE_MANIFEST.md for the rule.
   */
  imageAlt: string;
  /** Optional educational figure shown in the page body. */
  explainer?: { name: 'damp-stain' | 'pressure-gauge'; alt: string; caption: string };
  title: string;
  navLabel: string;
  icon: 'siren' | 'bath' | 'search' | 'wrench';
  cardBlurb: string;
  bullets: string[];
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: { heading: string; paragraphs: string[] }[];
  includes: string[];
  priceNote: string;
};

export const services: Service[] = [
  {
    slug: 'emergency-plumbing',
    image: 'service-emergency',
    imageAlt: 'Water dripping from a loosened compression fitting on a copper pipe',
    title: 'Emergency plumbing',
    navLabel: 'Emergency plumbing',
    icon: 'siren',
    cardBlurb:
      'Burst pipes, major leaks and no water. We answer quickly and get the water stopped.',
    bullets: ['Burst and frozen pipes', 'Sudden leaks and flooding', 'Loss of water supply'],
    h1: 'Emergency plumber in Hull',
    metaTitle: 'Emergency Plumber Hull',
    metaDescription:
      'Burst pipe or major leak in Hull or the East Riding? Message on WhatsApp for a fast response. No call-out fee, fully insured, work guaranteed.',
    intro:
      'Water is going somewhere it should not, and every minute counts. Message us on WhatsApp with a photo and we will tell you what to do first, then how soon we can be there.',
    body: [
      {
        heading: 'Before we arrive',
        paragraphs: [
          'Turn off your stopcock. In most Hull houses it sits under the kitchen sink, though in older terraces around Newland Avenue and the Avenues it is often in the cellar head or beneath the front bay window. Turn it clockwise until it stops.',
          'Then open every cold tap in the house to drain the pipes down. If water is anywhere near sockets, the consumer unit or light fittings, switch the electricity off at the board and do not touch anything wet.',
        ],
      },
      {
        heading: 'What we do when we get there',
        paragraphs: [
          'We find the source rather than guessing at it, make the situation safe, and give you a clear price before any work starts. If it is a repair we can complete on the spot, we do it there and then.',
          'If a part needs ordering, we make a sound temporary fix so you have water back on, and we tell you honestly how long the permanent repair will take.',
        ],
      },
    ],
    includes: [
      'Rapid response across Hull and the East Riding',
      'Water made safe before anything else',
      'A fixed price agreed before work starts',
      'Temporary fix if a part has to be ordered',
    ],
    priceNote: 'No call-out fee. You are told the price before we start.',
  },
  {
    slug: 'bathroom-fitting',
    image: 'service-bathroom',
    imageAlt: 'A spirit level held against tiling beside a basin during a bathroom fit',
    title: 'Bathroom fitting',
    navLabel: 'Bathroom fitting',
    icon: 'bath',
    cardBlurb:
      'Full bathroom installations, finished properly and tidied up at the end of every day.',
    bullets: ['Full bathroom installs', 'Shower and bath replacement', 'Tiling and sealing'],
    h1: 'Bathroom fitting in Hull and the East Riding',
    metaTitle: 'Bathroom Fitting Hull',
    metaDescription:
      'Complete bathroom installations across Hull and the East Riding. Clear fixed quotes, tidy work, and a finish that lasts. See before and after photos.',
    intro:
      'A bathroom is the room people notice, and the one most likely to be fitted badly. Silicone that peels within a year, tiles that lip, a shower tray that never quite drains. We fit bathrooms so those things do not happen.',
    body: [
      {
        heading: 'How a bathroom job runs',
        paragraphs: [
          'We visit, measure properly and talk through what you actually want, then give you a written fixed quote. No day rate that quietly grows.',
          'Most full bathrooms take between five and ten working days depending on the amount of tiling and whether anything structural is moving. We tell you which days are noisy and which days you will be without a working toilet, so you can plan around it.',
        ],
      },
      {
        heading: 'The details that decide whether it lasts',
        paragraphs: [
          'Falls set correctly so water goes to the waste rather than sitting in a corner. Boards behind tiles that can cope with moisture. Sealant applied to a dry, clean joint and tooled properly.',
          'We clean up at the end of every day rather than leaving the room as a building site until the last afternoon.',
        ],
      },
    ],
    includes: [
      'Written fixed quote after a proper measure',
      'Removal and disposal of the old suite',
      'Tiling, sealing and finishing',
      'Site cleaned at the end of every working day',
    ],
    priceNote: 'Free quotes. Fixed price agreed in writing before we start.',
  },
  {
    slug: 'leak-detection',
    image: 'service-leak',
    explainer: {
      name: 'damp-stain',
      alt: 'A brown-edged damp stain spreading across a painted ceiling',
      caption:
        'A stain like this is rarely directly beneath the leak. Water tracks along joists and pipe runs before it shows.',
    },
    imageAlt: 'A spreading damp stain on a painted wall above a skirting board',
    title: 'Leak detection',
    navLabel: 'Leak detection',
    icon: 'search',
    cardBlurb:
      'A damp patch with no obvious cause. We find the leak without taking your house apart.',
    bullets: ['Hidden and underground leaks', 'Rising water bills', 'Damp walls and ceilings'],
    h1: 'Leak detection in Hull',
    metaTitle: 'Leak Detection Hull',
    metaDescription:
      'Damp patch, rising water bill or a leak you cannot find? Non-destructive leak detection across Hull and the East Riding. Fully insured, work guaranteed.',
    intro:
      'A stain on a ceiling is rarely directly under the leak. Water runs along joists and pipe runs before it shows itself, which is why guessing usually means lifting the wrong floor.',
    body: [
      {
        heading: 'Finding it without wrecking the place',
        paragraphs: [
          'We narrow down the location before anything is opened up, using pressure testing and moisture readings to work out where water is actually coming from rather than where it happens to be showing.',
          'That normally means one small, deliberate access point instead of a lifted floor and a stripped ceiling.',
        ],
      },
      {
        heading: 'Common causes around here',
        paragraphs: [
          'In the older housing stock across Hull, failed compression joints under floors and corroded copper in solid floors are the usual culprits. In newer estates it is more often a pushfit connector that was never fully seated.',
          'If your water bill has climbed with no change in usage, you may have an underground supply leak between the boundary stopcock and the house. That is worth checking early, because it is billed to you.',
        ],
      },
    ],
    includes: [
      'Non-destructive detection first',
      'Clear explanation of what is leaking and why',
      'Repair quoted before it is carried out',
      'Written findings if you need them for insurance',
    ],
    priceNote: 'No call-out fee. Detection quoted up front.',
  },
  {
    slug: 'maintenance-and-repairs',
    image: 'service-maintenance',
    explainer: {
      name: 'pressure-gauge',
      alt: 'A pressure gauge on copper pipework beneath a wall-mounted boiler',
      caption:
        'Most systems should sit between 1 and 1.5 bar when cold. Repeated pressure loss usually means a leak somewhere.',
    },
    imageAlt: 'An adjustable spanner, PTFE tape and a tool bag on a wooden floor',
    title: 'Maintenance and repairs',
    navLabel: 'Maintenance & repairs',
    icon: 'wrench',
    cardBlurb:
      'The everyday jobs, done once and done right. Taps, toilets, radiators and waste.',
    bullets: ['Taps, toilets and cisterns', 'Blocked sinks and waste', 'Radiators and valves'],
    h1: 'Plumbing repairs and maintenance in Hull',
    metaTitle: 'Plumbing Repairs Hull',
    metaDescription:
      'Dripping taps, running toilets, blocked waste and cold radiators across Hull and the East Riding. Fixed properly first time. Fully insured.',
    intro:
      'Most of what we do is the ordinary work: a toilet that will not stop filling, a tap that has dripped for two years, a radiator that stays cold at the top. Small jobs, done properly.',
    body: [
      {
        heading: 'Fixed once, not patched',
        paragraphs: [
          'A dripping tap usually needs the right washer or cartridge, not a tighter grip on the handle. A constantly filling cistern usually needs the valve replacing rather than adjusting.',
          'We carry the common parts, so most repairs are finished on the first visit rather than becoming a second appointment.',
        ],
      },
      {
        heading: 'Landlords and letting agents',
        paragraphs: [
          'We work with landlords across Hull and the East Riding on reactive repairs between tenancies and during them. Clear invoices, photographs of completed work, and direct contact with tenants to arrange access if you would rather not be in the middle of it.',
        ],
      },
    ],
    includes: [
      'Common parts carried on the van',
      'Most repairs completed on the first visit',
      'Clear pricing before work starts',
      'Landlord and letting agent work welcome',
    ],
    priceNote: 'No call-out fee. Price confirmed before work begins.',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

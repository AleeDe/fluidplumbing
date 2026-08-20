import type { OptimisedImageName } from '@/data/image-placeholders';

/**
 * GALLERY SHOWCASE — AI-GENERATED ILLUSTRATIVE IMAGERY.
 * =====================================================
 *
 * These are NOT photographs of work Fluid Plumbing Solutions carried out.
 *
 * HARD RULES — identical to src/data/comparisons.ts:
 *
 *  1. Every heading on the gallery page MUST contain "illustrative" or
 *     "examples". The approved headings are exported below.
 *
 *  2. NEVER use: "Our work" · "Recent jobs" · "Completed projects" ·
 *     "Our recent work" · anything possessive.
 *
 *  3. NEVER attach a location. No Beverley, Hull, Cottingham, postcodes,
 *     or "in the East Riding". A place name turns an illustration into a
 *     claim about a specific job.
 *
 *  4. Captions describe the SITUATION or the STANDARD, never authorship.
 *     "A corroded joint replaced" — not "a joint we replaced in Hessle".
 *
 *  5. Every tile carries a visible "Illustrative" badge.
 *
 * Presenting generated imagery as a trader's completed work is a misleading
 * action under the DMCC Act 2024 and CPR 2008.
 *
 * WHEN REAL CLIENT PHOTOS ARRIVE: populate `workImages` in
 * src/data/gallery.ts, which carries none of these restrictions, and this
 * showcase becomes secondary or is retired entirely.
 */

export const SHOWCASE_HEADING = 'Illustrative examples of the standard we work to';
export const SHOWCASE_EYEBROW = 'Standard of work';

export type ShowcaseItem = {
  id: string;
  name: OptimisedImageName;
  alt: string;
  /** Describes the situation or standard. Never authorship, never a place. */
  caption: string;
  category: 'Emergency' | 'Bathrooms' | 'Leaks' | 'Repairs' | 'Know your home';
  /** Tall tiles get more vertical space in the masonry grid. */
  tall?: boolean;
};

export const showcase: ShowcaseItem[] = [
  {
    id: 'sc-emergency',
    name: 'service-emergency',
    alt: 'Water dripping from a loosened compression fitting on a copper pipe',
    caption: 'A failed compression joint — the most common cause of a sudden leak',
    category: 'Emergency',
  },
  {
    id: 'sc-stopcock',
    name: 'stopcock',
    alt: 'A brass gate valve on copper pipe inside an under-sink cupboard',
    caption: 'What a stopcock looks like. Turn it clockwise to shut the water off',
    category: 'Know your home',
    tall: true,
  },
  {
    id: 'sc-bathroom',
    name: 'service-bathroom',
    alt: 'A spirit level held against tiling beside a basin during a bathroom fit',
    caption: 'Levels checked as tiling goes on, not corrected afterwards',
    category: 'Bathrooms',
  },
  {
    id: 'sc-damp',
    name: 'damp-stain',
    alt: 'A brown-edged damp stain spreading across a painted ceiling',
    caption: 'A ceiling stain is rarely directly beneath the leak causing it',
    category: 'Leaks',
  },
  {
    id: 'sc-leak-detail',
    name: 'service-leak',
    alt: 'A spreading damp stain on a painted wall above a skirting board',
    caption: 'Damp tracking down a wall, traced before anything is opened up',
    category: 'Leaks',
    tall: true,
  },
  {
    id: 'sc-meter',
    name: 'water-meter',
    alt: 'A water meter inside an outdoor ground chamber with the lid lifted',
    caption: 'A meter chamber near the boundary — useful if there is no stopcock indoors',
    category: 'Know your home',
  },
  {
    id: 'sc-maintenance',
    name: 'service-maintenance',
    alt: 'An adjustable spanner, PTFE tape and a tool bag on a wooden floor',
    caption: 'Dust sheets down, tools off the floor, site cleared at the end of the day',
    category: 'Repairs',
  },
  {
    id: 'sc-gauge',
    name: 'pressure-gauge',
    alt: 'A pressure gauge on copper pipework beneath a wall-mounted boiler',
    caption: 'Most systems sit between 1 and 1.5 bar cold. Repeated loss means a leak',
    category: 'Know your home',
    tall: true,
  },
  {
    id: 'sc-emergency-scene',
    name: 'emergency-bg',
    alt: 'A brass stopcock and copper pipe lit dimly inside a cupboard',
    caption: 'Knowing where your stopcock is saves more damage than anything else',
    category: 'Emergency',
  },
  {
    id: 'sc-hero-detail',
    name: 'hero',
    alt: 'Gloved hands using an adjustable spanner on a copper compression joint',
    caption: 'Joints made up properly and tested before anything is boxed back in',
    category: 'Repairs',
  },
  {
    id: 'sc-van',
    name: 'about-placeholder',
    alt: 'A work van with its rear doors open and a tool bag on the driveway beside it',
    caption: 'Common parts carried, so most repairs finish on the first visit',
    category: 'Repairs',
    tall: true,
  },
];

/** Filter chips shown above the grid. */
export const showcaseCategories = [
  'All',
  'Emergency',
  'Bathrooms',
  'Leaks',
  'Repairs',
  'Know your home',
] as const;

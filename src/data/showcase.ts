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

export const showcase: ShowcaseItem[] = [];

/**
 * EMPTIED DELIBERATELY.
 *
 * These eleven AI-generated tiles stood in while the client had supplied no
 * photographs. Real work now lives in src/data/jobs.ts. Do NOT repopulate.
 */

/** Filter chips shown above the grid. */
export const showcaseCategories = [
  'All',
  'Emergency',
  'Bathrooms',
  'Leaks',
  'Repairs',
  'Know your home',
] as const;

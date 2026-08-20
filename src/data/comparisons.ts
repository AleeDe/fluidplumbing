import type { OptimisedImageName } from '@/data/image-placeholders';

/**
 * ILLUSTRATIVE BEFORE/AFTER COMPARISONS — AI-GENERATED IMAGERY.
 * =============================================================
 *
 * These are NOT photographs of work Fluid Plumbing Solutions carried out.
 * They exist to show the standard of finish being described, nothing more.
 *
 * HARD RULES — do not relax any of these:
 *
 *  1. The section heading MUST contain "illustrative" or "examples".
 *     The approved heading is:
 *         "Illustrative examples of the standard we work to"
 *
 *  2. NEVER use any of these headings or captions:
 *         "Our work"  ·  "Recent jobs"  ·  "Completed projects"
 *         "Our recent work"  ·  anything possessive
 *
 *  3. NEVER attach a location. No Beverley, no Hull, no Cottingham, no
 *     postcode, no "in the East Riding". A place name turns an illustration
 *     into a claim about a specific job.
 *
 *  4. Alt text describes only what is visible in the frame.
 *
 * Presenting generated imagery as a trader's completed work is a misleading
 * action under the DMCC Act 2024 and CPR 2008 — the same risk category as the
 * fabricated testimonials already removed from this site.
 *
 * WHEN REAL CLIENT PHOTOS ARRIVE: move them into `workImages` /
 * `beforeAfter` in src/data/gallery.ts, which carries no such restriction,
 * and retire this file.
 */

export type Comparison = {
  id: string;
  /** Neutral label describing the change. No location, no possessive. */
  label: string;
  before: { name: OptimisedImageName; alt: string };
  after: { name: OptimisedImageName; alt: string };
};

export const comparisons: Comparison[] = [
  {
    id: 'leak-joint',
    label: 'A corroded joint replaced and the leak stopped',
    before: {
      name: 'leak-before',
      alt: 'A corroded compression joint dripping onto the base of a sink cupboard',
    },
    after: {
      name: 'leak-after',
      alt: 'The same pipe run with a clean replacement compression joint and no water',
    },
  },
  {
    id: 'radiator-valve',
    label: 'A seized valve swapped for a new thermostatic one',
    before: {
      name: 'radiator-before',
      alt: 'A corroded radiator valve with limescale and staining on the floor beneath',
    },
    after: {
      name: 'radiator-after',
      alt: 'The same radiator with a new chrome thermostatic valve and clean pipework',
    },
  },
];

/**
 * bathroom-before / bathroom-after are NOT included, and must not be added.
 *
 * They are not a matched pair. The "before" is a square bathroom with a
 * pedestal basin; the "after" is a narrow corridor WC with different tiling,
 * a different layout and a different window position. The "after" is also a
 * two-up composite with a visible vertical seam down the middle, which in a
 * compare slider would reveal half of one photograph and half of another.
 *
 * A mismatched pair reads as a stock-photo trick and does more damage than
 * showing no comparison at all.
 */

export const APPROVED_COMPARISON_HEADING =
  'Illustrative examples of the standard we work to';

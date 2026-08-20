/**
 * IMAGE MANIFEST — REAL CLIENT PHOTOS ONLY.
 * ------------------------------------------------------------------
 * `workImages` and `beforeAfter` are INTENTIONALLY EMPTY.
 *
 * The client has job photographs but has not supplied them yet. These arrays
 * must only ever contain real photographs of work Fluid Plumbing Solutions
 * actually carried out. Do NOT populate them with AI-generated, stock, or
 * illustrative imagery: presenting such an image as a trader's completed work
 * is a misleading action under the DMCC Act 2024 and CPR 2008.
 *
 * The gallery and the before/after sliders detect the empty arrays and render
 * a designed empty state instead. Adding entries turns those sections back on
 * automatically — nothing else needs changing.
 *
 * TO ADD A REAL PHOTO:
 *   1. Drop the file into /public/images/work/  (jpg or webp, >=1600px wide)
 *   2. Add an entry below with its TRUE pixel width/height
 *   3. Write alt text describing the actual job and its location
 *
 * See IMAGE_MANIFEST.md for what is generated vs real across the whole site.
 */

export type WorkImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  service: string;
  area: string;
  width: number;
  height: number;
  /** true while this is a stand-in rather than a real client photo */
  placeholder: boolean;
};

export const workImages: WorkImage[] = [];

/**
 * BEFORE / AFTER PAIRS
 * These MUST be genuinely matched pairs: same room, same angle, same lens.
 * A mismatched pair is worse than no slider at all.
 */
export type BeforeAfter = {
  id: string;
  label: string;
  area: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  width: number;
  height: number;
  placeholder: boolean;
};

export const beforeAfter: BeforeAfter[] = [];

/**
 * Hero image. `src` is empty until a real photograph is supplied — the hero
 * renders a designed SVG treatment in the meantime (see HeroVisual).
 */
export const heroImage = {
  src: '',
  alt: '',
  width: 1200,
  height: 1500,
  placeholder: true,
};

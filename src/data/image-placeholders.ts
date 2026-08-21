/**
 * GENERATED FILE — do not edit by hand.
 * Written by scripts/optimise-images.mjs (npm run optimise:images).
 *
 * Dominant colour and intrinsic dimensions for each optimised image.
 * The colour fills the frame while the image loads; dimensions keep CLS
 * at zero. See the note in scripts/optimise-images.mjs on why this is a
 * flat colour rather than a base64 blur-up placeholder.
 */

export type OptimisedImage = {
  /** Base path without width/extension, e.g. /images/optimised/hero */
  base: string;
  width: number;
  height: number;
  /** Dominant colour, e.g. #1b2a33 */
  placeholderColor: string;
};

export const optimisedImages = {
  'about-placeholder': {
    base: '/images/optimised/about-placeholder',
    width: 800,
    height: 993,
    placeholderColor: '#c8d8d8',
  },
  'damp-stain': {
    base: '/images/optimised/damp-stain',
    width: 1200,
    height: 896,
    placeholderColor: '#b8b8c8',
  },
  'emergency-bg': {
    base: '/images/optimised/emergency-bg',
    width: 1920,
    height: 1072,
    placeholderColor: '#080818',
  },
  'hero': {
    base: '/images/optimised/hero',
    width: 1024,
    height: 572,
    placeholderColor: '#080808',
  },
  'hero-about': {
    base: '/images/optimised/hero-about',
    width: 1920,
    height: 1072,
    placeholderColor: '#080808',
  },
  'hero-areas': {
    base: '/images/optimised/hero-areas',
    width: 1920,
    height: 1072,
    placeholderColor: '#080808',
  },
  'hero-bathroom': {
    base: '/images/optimised/hero-bathroom',
    width: 1920,
    height: 1072,
    placeholderColor: '#081818',
  },
  'hero-contact': {
    base: '/images/optimised/hero-contact',
    width: 1920,
    height: 1072,
    placeholderColor: '#081818',
  },
  'hero-emergency': {
    base: '/images/optimised/hero-emergency',
    width: 1920,
    height: 1072,
    placeholderColor: '#080818',
  },
  'hero-gallery': {
    base: '/images/optimised/hero-gallery',
    width: 1920,
    height: 1072,
    placeholderColor: '#080818',
  },
  'hero-leak': {
    base: '/images/optimised/hero-leak',
    width: 1920,
    height: 1072,
    placeholderColor: '#081818',
  },
  'hero-maintenance': {
    base: '/images/optimised/hero-maintenance',
    width: 1920,
    height: 1072,
    placeholderColor: '#081818',
  },
  'hero-services': {
    base: '/images/optimised/hero-services',
    width: 1920,
    height: 1072,
    placeholderColor: '#080818',
  },
  'leak-after': {
    base: '/images/optimised/leak-after',
    width: 1400,
    height: 1045,
    placeholderColor: '#081818',
  },
  'leak-before': {
    base: '/images/optimised/leak-before',
    width: 1400,
    height: 1045,
    placeholderColor: '#081818',
  },
  'pressure-gauge': {
    base: '/images/optimised/pressure-gauge',
    width: 1200,
    height: 896,
    placeholderColor: '#081818',
  },
  'radiator-after': {
    base: '/images/optimised/radiator-after',
    width: 1400,
    height: 1045,
    placeholderColor: '#888888',
  },
  'radiator-before': {
    base: '/images/optimised/radiator-before',
    width: 1400,
    height: 1045,
    placeholderColor: '#888888',
  },
  'service-bathroom': {
    base: '/images/optimised/service-bathroom',
    width: 1200,
    height: 896,
    placeholderColor: '#081818',
  },
  'service-emergency': {
    base: '/images/optimised/service-emergency',
    width: 1200,
    height: 896,
    placeholderColor: '#081818',
  },
  'service-leak': {
    base: '/images/optimised/service-leak',
    width: 1200,
    height: 896,
    placeholderColor: '#081818',
  },
  'service-maintenance': {
    base: '/images/optimised/service-maintenance',
    width: 1200,
    height: 896,
    placeholderColor: '#080808',
  },
  'stopcock': {
    base: '/images/optimised/stopcock',
    width: 1200,
    height: 896,
    placeholderColor: '#182838',
  },
  'water-meter': {
    base: '/images/optimised/water-meter',
    width: 1200,
    height: 896,
    placeholderColor: '#081818',
  },
} as const satisfies Record<string, OptimisedImage>;

export type OptimisedImageName = keyof typeof optimisedImages;

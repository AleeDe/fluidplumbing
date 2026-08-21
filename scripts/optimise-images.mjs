/**
 * Image optimisation pipeline.
 *
 *   npm run optimise:images
 *
 * Reads source images from assets-source/ (OUTSIDE public/, so the ~40MB of
 * originals are never copied into the static export) and writes optimised
 * AVIF + WebP derivatives to public/images/optimised/. Sources are never
 * modified, so the script can be re-run with different settings at any time.
 *
 * Also writes src/data/image-placeholders.ts containing a tiny base64 AVIF
 * per image for next/image's `blurDataURL`.
 *
 * Budgets are enforced. If a derivative exceeds its budget the quality is
 * stepped down by 5 and retried, down to a floor. The final quality used for
 * each image is reported so nothing oversized ships silently.
 */

import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC = 'assets-source';
const OUT = 'public/images/optimised';
const PLACEHOLDER_FILE = 'src/data/image-placeholders.ts';

const AVIF_Q_START = 55;
const AVIF_EFFORT = 6;
const WEBP_Q = 78;
const Q_FLOOR = 30;
const Q_STEP = 5;

/** widths + the budget (KB) applied to the LARGEST avif derivative */
const PLAN = {
  // hero source is only 1024px wide, so larger widths would be duplicates.
  // `withoutEnlargement` caps them anyway; listing them would just ship
  // identical files under misleading names. See IMAGE_MANIFEST.md.
  'hero':                { widths: [640, 1024], budgetKB: 120 },
  'emergency-bg':        { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'emergency-alt':       { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'service-emergency':   { widths: [480, 800, 1200], budgetKB: 80 },
  'service-bathroom':    { widths: [480, 800, 1200], budgetKB: 80 },
  'service-leak':        { widths: [480, 800, 1200], budgetKB: 80 },
  'service-maintenance': { widths: [480, 800, 1200], budgetKB: 80 },
  'water-meter':         { widths: [480, 800, 1200], budgetKB: 80 },
  'stopcock':            { widths: [480, 800, 1200], budgetKB: 80 },
  'damp-stain':          { widths: [480, 800, 1200], budgetKB: 80 },
  'pressure-gauge':      { widths: [480, 800, 1200], budgetKB: 80 },
  'about-placeholder':   { widths: [480, 800], budgetKB: 60 },

  // Page hero backgrounds. 16:9, purpose-shot with the subject on the right
  // and dark space on the left for the headline. Full-bleed, so they need
  // the widest ladder.
  'hero-emergency':      { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-bathroom':       { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-leak':           { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-maintenance':    { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-contact':        { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-services':       { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-areas':          { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-gallery':        { widths: [640, 1024, 1440, 1920], budgetKB: 120 },
  'hero-about':          { widths: [640, 1024, 1440, 1920], budgetKB: 120 },

  // Before/after comparison pairs. Both halves of a pair MUST use identical
  // widths and quality, or the slider reveals a visible quality seam as the
  // handle moves.
  'leak-before':         { widths: [640, 1024, 1400], budgetKB: 90 },
  'leak-after':          { widths: [640, 1024, 1400], budgetKB: 90 },
  'radiator-before':     { widths: [640, 1024, 1400], budgetKB: 90 },
  'radiator-after':      { widths: [640, 1024, 1400], budgetKB: 90 },

};

const kb = (bytes) => bytes / 1024;
const fmtKB = (bytes) => `${kb(bytes).toFixed(0)}KB`;

/** Encode one width at a given quality, return the buffer. */
async function encodeAvif(src, width, quality) {
  return sharp(src)
    .resize({ width, withoutEnlargement: true })
    .toColourspace('srgb')
    .avif({ quality, effort: AVIF_EFFORT })
    .withMetadata({})
    .toBuffer();
}

/**
 * Find the highest quality at or below AVIF_Q_START whose LARGEST derivative
 * fits the budget. Returns { quality, buffers: Map<width, Buffer> }.
 */
async function encodeWithinBudget(src, widths, budgetKB, name) {
  const maxW = Math.max(...widths);
  let quality = AVIF_Q_START;

  while (quality >= Q_FLOOR) {
    const largest = await encodeAvif(src, maxW, quality);
    if (kb(largest.length) <= budgetKB) {
      const buffers = new Map([[maxW, largest]]);
      for (const w of widths.filter((w) => w !== maxW)) {
        buffers.set(w, await encodeAvif(src, w, quality));
      }
      return { quality, buffers, overBudget: false };
    }
    quality -= Q_STEP;
  }

  // Floor reached and still over budget — encode at the floor and flag it.
  const buffers = new Map();
  for (const w of widths) buffers.set(w, await encodeAvif(src, w, Q_FLOOR));
  return { quality: Q_FLOOR, buffers, overBudget: true };
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Source directory not found: ${SRC}`);
    process.exit(1);
  }
  mkdirSync(OUT, { recursive: true });

  const sources = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (sources.length === 0) {
    console.error(`No source images in ${SRC}`);
    process.exit(1);
  }

  let srcTotal = 0;
  let outTotal = 0;
  const failures = [];
  const placeholders = {};
  const dimensions = {};

  console.log(`\nOptimising ${sources.length} images from ${SRC}\n`);
  console.log(
    'image'.padEnd(22) + 'source'.padStart(9) + '  →' +
    'avif max'.padStart(10) + '  q'.padStart(4) + '  widths',
  );
  console.log('-'.repeat(74));

  for (const file of sources.sort()) {
    const name = file.replace(/\.(jpe?g|png)$/i, '');
    const plan = PLAN[name];
    const srcPath = join(SRC, file);
    const srcSize = statSync(srcPath).size;
    srcTotal += srcSize;

    if (!plan) {
      console.log(`${name.padEnd(22)}${fmtKB(srcSize).padStart(9)}   (no plan entry — skipped)`);
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    // Record the intrinsic size of the LARGEST derivative for width/height props.
    const maxW = Math.min(Math.max(...plan.widths), meta.width);
    const ratio = meta.height / meta.width;
    dimensions[name] = { width: maxW, height: Math.round(maxW * ratio) };

    const { quality, buffers, overBudget } = await encodeWithinBudget(
      srcPath, plan.widths, plan.budgetKB, name,
    );

    for (const [w, buf] of buffers) {
      writeFileSync(join(OUT, `${name}-${w}.avif`), buf);
      outTotal += buf.length;
    }

    // WebP fallback at every width
    for (const w of plan.widths) {
      const buf = await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .toColourspace('srgb')
        .webp({ quality: WEBP_Q })
        .withMetadata({})
        .toBuffer();
      writeFileSync(join(OUT, `${name}-${w}.webp`), buf);
      outTotal += buf.length;
    }

    // Dominant colour, used as a flat background while the image loads.
    //
    // A base64 blur-up placeholder was tried and reverted: 14 inline AVIF
    // data-URIs added 20KB to the homepage HTML and each one forced a
    // separate main-thread decode, pushing main-thread work from 2.3s to
    // 4.0s and TBT from 40ms to 360ms. The real images are only 15-35KB,
    // so a flat colour is both cheaper and visually sufficient.
    const { dominant } = await sharp(srcPath).stats();
    const hex = '#' + [dominant.r, dominant.g, dominant.b]
      .map((c) => c.toString(16).padStart(2, '0')).join('');
    placeholders[name] = hex;

    const largestBuf = buffers.get(Math.max(...plan.widths)) ?? [...buffers.values()].pop();
    const flag = overBudget ? '  ** OVER BUDGET **' : '';
    console.log(
      name.padEnd(22) +
      fmtKB(srcSize).padStart(9) + '  →' +
      fmtKB(largestBuf.length).padStart(10) +
      String(quality).padStart(4) + '  ' +
      plan.widths.join(',') + flag,
    );

    if (overBudget) {
      failures.push(`${name}: ${fmtKB(largestBuf.length)} exceeds ${plan.budgetKB}KB budget even at quality ${Q_FLOOR}`);
    }
  }

  // Typed placeholder + dimension file
  const lines = [
    '/**',
    ' * GENERATED FILE — do not edit by hand.',
    ' * Written by scripts/optimise-images.mjs (npm run optimise:images).',
    ' *',
    ' * Dominant colour and intrinsic dimensions for each optimised image.',
    ' * The colour fills the frame while the image loads; dimensions keep CLS',
    ' * at zero. See the note in scripts/optimise-images.mjs on why this is a',
    ' * flat colour rather than a base64 blur-up placeholder.',
    ' */',
    '',
    'export type OptimisedImage = {',
    '  /** Base path without width/extension, e.g. /images/optimised/hero */',
    '  base: string;',
    '  width: number;',
    '  height: number;',
    '  /** Dominant colour, e.g. #1b2a33 */',
    '  placeholderColor: string;',
    '};',
    '',
    'export const optimisedImages = {',
  ];
  for (const name of Object.keys(placeholders).sort()) {
    const d = dimensions[name];
    lines.push(`  '${name}': {`);
    lines.push(`    base: '/images/optimised/${name}',`);
    lines.push(`    width: ${d.width},`);
    lines.push(`    height: ${d.height},`);
    lines.push(`    placeholderColor: '${placeholders[name]}',`);
    lines.push('  },');
  }
  lines.push('} as const satisfies Record<string, OptimisedImage>;');
  lines.push('');
  lines.push('export type OptimisedImageName = keyof typeof optimisedImages;');
  lines.push('');
  writeFileSync(PLACEHOLDER_FILE, lines.join('\n'));

  console.log('-'.repeat(74));
  console.log(`source total   ${fmtKB(srcTotal).padStart(10)}`);
  console.log(`optimised total${fmtKB(outTotal).padStart(10)}   (all formats, all widths)`);
  console.log(`reduction      ${((1 - outTotal / srcTotal) * 100).toFixed(1).padStart(9)}%`);
  console.log(`\nwrote ${PLACEHOLDER_FILE}`);

  if (failures.length) {
    console.error('\nBUDGET FAILURES:');
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log('\nAll budgets met.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

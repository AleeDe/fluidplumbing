/**
 * Prepares the client's supplied logo for use on the site.
 *
 *   node scripts/prepare-client-logo.mjs
 *
 * Reads:  assets-source/client-logo.png   (transparent PNG, any size)
 * Writes: public/brand/logo-client.png     header lockup, 2x for retina
 *         public/brand/logo-client.webp    smaller fallback
 *         public/brand/mark-client.png     the droplet alone, square
 *         public/brand/favicon-client.png  32x32
 *         public/brand/apple-touch-icon.png 180x180 on navy
 *
 * The client's logo is orange on transparent. The site is navy and aqua.
 * That mismatch is a deliberate client decision, recorded in DECISIONS.md.
 *
 * The mark is cropped from the left portion of the lockup, since the droplet
 * and ripple sit there. If the supplied file has a different layout, adjust
 * MARK_CROP_FRACTION below.
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';

const SRC = 'assets-source/client-logo.png';
const OUT = 'public/brand';

/** Left fraction of the lockup that contains the droplet mark. */
const MARK_CROP_FRACTION = 0.33;

/** Site background, used behind the square icons. */
const NAVY = '#04121F';

if (!existsSync(SRC)) {
  console.error(`\nSource not found: ${SRC}`);
  console.error('Save the client logo there as a transparent PNG, then re-run.\n');
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const meta = await sharp(SRC).metadata();
console.log(`\nsource: ${meta.width}x${meta.height} ${meta.format}, alpha: ${meta.hasAlpha}`);

if (!meta.hasAlpha) {
  console.warn('WARNING: no alpha channel. A white or black box will show behind the logo.');
}

// Trim surrounding transparency so the logo sits tight in its box. Without
// this, baked-in margin makes the logo look small in a fixed-height header.
const trimmed = await sharp(SRC).trim({ threshold: 10 }).toBuffer();
const tMeta = await sharp(trimmed).metadata();
console.log(`trimmed: ${tMeta.width}x${tMeta.height}`);

// ---- Header lockup -------------------------------------------------------
// Rendered at 40px tall, so 2x = 80px for retina. Width follows the ratio.
const lockupH = 80;
const lockupW = Math.round(lockupH * (tMeta.width / tMeta.height));

await sharp(trimmed)
  .resize({ height: lockupH })
  .png({ compressionLevel: 9 })
  .withMetadata({})
  .toFile(`${OUT}/logo-client.png`);

await sharp(trimmed)
  .resize({ height: lockupH })
  .webp({ quality: 92 })
  .withMetadata({})
  .toFile(`${OUT}/logo-client.webp`);

console.log(`\nlockup:   ${lockupW}x${lockupH} (renders at ${lockupW / 2}x40)`);

// ---- Mark only -----------------------------------------------------------
const markW = Math.round(tMeta.width * MARK_CROP_FRACTION);
const markSrc = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: markW, height: tMeta.height })
  .trim({ threshold: 10 })
  .toBuffer();
const mMeta = await sharp(markSrc).metadata();
console.log(`mark crop: ${mMeta.width}x${mMeta.height}`);

// Square canvas, transparent, mark centred with a little breathing room.
const square = async (size, background) => {
  const inner = Math.round(size * 0.78);
  const resized = await sharp(markSrc)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .withMetadata({})
    .toBuffer();
};

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

await sharp(await square(512, transparent)).toFile(`${OUT}/mark-client.png`);
await sharp(await square(32, transparent)).toFile(`${OUT}/favicon-client.png`);

// Apple touch icon must be opaque, so it goes on navy.
const navyBg = { r: 4, g: 18, b: 31, alpha: 1 };
await sharp(await square(180, navyBg)).toFile(`${OUT}/apple-touch-icon.png`);
await sharp(await square(192, navyBg)).toFile(`${OUT}/icon-192.png`);
await sharp(await square(512, navyBg)).toFile(`${OUT}/icon-512.png`);

console.log(`\nwrote to ${OUT}/:`);
console.log('  logo-client.png / .webp   header lockup');
console.log('  mark-client.png           512 square, transparent');
console.log('  favicon-client.png        32 square, transparent');
console.log('  apple-touch-icon.png      180 on navy');
console.log('  icon-192.png / icon-512.png  on navy');
console.log(`\nNote: the header renders this at 40px tall. Check the wordmark`);
console.log(`is legible at that size before shipping.\n`);

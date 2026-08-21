# Swapping in Zack's real job photos

Everything on this site currently marked "illustrative" is AI-generated
placeholder imagery. This is the checklist for replacing it with the client's
own photographs after the sale.

**The code already handles the switch.** Populate two arrays and the gallery,
the homepage comparison slot and the gallery preview all change behaviour
automatically. No component edits needed.

---

## Step 1. Get the photos

Message to send:

> Hi Zack, could you send me 10 to 15 photos of jobs you have done?
> Before/after pairs are the most valuable: same room, same angle, one shot
> before you start and one when you are finished. Phone photos are fine.

**What makes a usable before/after pair:**

- Same room, same camera position, roughly the same framing
- Both shots the same orientation (both landscape or both portrait)
- Ideally similar lighting

A mismatched pair is worse than no pair at all. One supplied during the build
was rejected for exactly this: the "before" was a square bathroom and the
"after" was a corridor WC, so the slider would have revealed two different
rooms. See the note at the bottom of `src/data/comparisons.ts`.

---

## Step 2. Add them to the pipeline

1. Drop the originals into **`assets-source/`**, never into `public/`.
   That directory is gitignored, so the large originals never reach the repo
   or the deploy. Putting them in `public/` was a real bug during the build
   that shipped 40MB of unoptimised images.

2. Add an entry per image to `PLAN` in `scripts/optimise-images.mjs`:

```js
'job-bathroom-01':  { widths: [640, 1024, 1400], budgetKB: 90 },
```

Use the same widths and budget for **both halves of a before/after pair**, or
a quality seam appears as the slider handle moves.

3. Run it:

```bash
npm run optimise:images
```

This writes AVIF and WebP derivatives, strips metadata, converts to sRGB, and
regenerates `src/data/image-placeholders.ts`. It fails loudly if an image
exceeds its budget.

4. Add the new names to the `WIDTHS` map in
   `src/components/ui/OptimisedImage.tsx`. TypeScript will error until you do,
   which is intentional.

---

## Step 3. Populate the arrays

In **`src/data/gallery.ts`**:

```ts
export const workImages: WorkImage[] = [
  {
    id: 'bathroom-cottingham',
    src: '/images/optimised/job-bathroom-01-1400.webp',
    alt: 'Fitted bathroom with walk-in shower completed in Cottingham',
    caption: 'Full bathroom installation, Cottingham',
    service: 'Bathroom fitting',
    area: 'Cottingham',
    width: 1400,
    height: 1050,
    placeholder: false,
  },
];

export const beforeAfter: BeforeAfter[] = [
  {
    id: 'ba-cottingham',
    label: 'Dated suite replaced with a walk-in shower',
    area: 'Cottingham',
    before: { src: '/images/optimised/job-bath-before-1400.webp', alt: '...' },
    after:  { src: '/images/optimised/job-bath-after-1400.webp',  alt: '...' },
    width: 1400,
    height: 1050,
    placeholder: false,
  },
];
```

`width` and `height` must be the **true** pixel dimensions. They reserve the
layout space that keeps CLS at zero.

**Alt text becomes honest at this point.** Once an image really is a
Cottingham job, "Fitted bathroom completed in Cottingham" is accurate. Never
apply that phrasing to an image that is not one.

---

## Step 4. What changes on its own

| Slot | Now | After |
|---|---|---|
| Gallery H1 | "Illustrative examples of the standard we work to" | "Jobs we have finished." |
| Gallery tiles | `ILLUSTRATIVE` badge on all 11 | Real work, no badge |
| Homepage slot | Illustrative comparison sliders | Real before/after sliders |
| Gallery preview | Hidden | Masonry of real work |
| `ImageGallery` schema | Not emitted | Emitted, indexed by Google |
| Lightbox caption | "not a photograph of a past job" | Real caption |

Real work always takes priority: the components check `workImages.length` and
`beforeAfter.length` and promote genuine photographs above the illustrative
sections.

---

## Step 5. Retire the illustrative content

Once there is enough real work, delete:

- `src/data/comparisons.ts` and `src/components/ui/ComparisonSlider.tsx`
- `src/data/showcase.ts` and `src/components/ui/ShowcaseGrid.tsx`
- The illustrative sections from `src/app/gallery/page.tsx`
- The corresponding entries from `PLAN` in the optimise script, then re-run

Then update `IMAGE_MANIFEST.md` to record what is now genuine.

**Until then, do not remove the disclosures.** The approved heading is
exported as `APPROVED_COMPARISON_HEADING` specifically so it cannot drift, and
every tile carries a visible badge. Presenting generated imagery as a
tradesperson's completed work is a misleading action under the DMCC Act 2024
and CPR 2008, the same category of risk as a fabricated review.

---

## Why this matters commercially

Industry research on UK trade websites was consistent on this point: real
photographs of the actual van, the actual crew and the actual finished work
build familiarity in a way that stock and generated imagery cannot. Reviews
and click-to-call speed were the other two factors. Animation and visual
effects did not appear as conversion factors at all.

The site is fast and its call-to-action is one tap. Real photographs and
Google reviews are the two things still missing, and neither can be solved
in code.

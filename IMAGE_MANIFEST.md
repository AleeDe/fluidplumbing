# Image Manifest

Every visual asset on the site, what it is, and what should replace it.

**Governing rule:** no image on this site may imply it depicts work Fluid
Plumbing Solutions carried out unless it is a real photograph of that work.
Presenting generated or stock imagery as a trader's completed jobs is a
misleading action under the DMCC Act 2024 and CPR 2008, the same category of
risk as a fabricated review.

---

## Summary

| | Count | Status |
|---|---|---|
| Hand-authored SVG (brand, icons, pattern) | 13 | **Final**, no replacement needed |
| AI-generated photography | **11** | Illustrative only, see below |
| AI-generated comparison pairs | **2 live, 1 rejected** | Illustrative only, heading-locked |
| Gallery showcase tiles | **11** | Same 11 images, badged + filterable |
| Real client photographs | **0** | **Awaiting client** |

Total shipped image weight: **2.4MB** across all formats and widths, down from
**56.4MB** of sources, a **95.8% reduction**.

---

## AI-generated photography, 11 images

Generated manually in the Gemini app by the client-side operator, then vetted,
optimised and wired in. **None of these depicts work this business carried
out.** They are illustrative trade photography. Every alt text describes only
what is visible, no location, no possessive, no implied authorship.

Source files live in `assets-source/` (gitignored, ~40MB, outside `public/` so
they are never copied into the static export). Optimised AVIF + WebP
derivatives are written to `public/images/optimised/` by
`npm run optimise:images`.

| File | Used on | AVIF max | Quality | Replace with |
|---|---|---|---|---|
| `hero.jpg` | Homepage hero (LCP) | 12KB @1024 | 55 | A real job photo, portrait or 4:5 crop |
| `emergency-bg.jpg` | Emergency band background | 18KB @1920 | 55 | Optional, works indefinitely as-is |
| `service-emergency.jpg` | Emergency service card | 16KB @1200 | 55 | A real burst-pipe callout photo |
| `service-bathroom.jpg` | Bathroom service card | 16KB @1200 | 55 | A real finished bathroom |
| `service-leak.jpg` | Leak detection card | 25KB @1200 | 55 | A real traced leak |
| `service-maintenance.jpg` | Maintenance card | 35KB @1200 | 55 | A real repair in progress |
| `stopcock.jpg` | Emergency band explainer | 30KB @1200 | 55 | **Never**, generic by design |
| `water-meter.jpg` | Emergency band explainer | 67KB @1200 | **45** | **Never**, generic by design |
| `damp-stain.jpg` | Leak detection page | 15KB @1200 | 55 | **Never**, generic by design |
| `pressure-gauge.jpg` | Maintenance page | 18KB @1200 | 55 | **Never**, generic by design |
| `about-placeholder.jpg` | About page sidebar | 41KB @800 | 55 | **A real photo of Zack** |

`water-meter` is the only image that needed quality stepped down (55 → 45) to
meet its 80KB budget. Every other image passed at 55.

### The four explainers are permanent

`stopcock`, `water-meter`, `damp-stain` and `pressure-gauge` exist to help a
homeowner find or read something in their own house. No ownership claim is
possible, so they never need replacing. They are the safest images on the site
and arguably the most useful.

### Note on the hero resolution

The hero source is only **1024x572**. Derivatives are capped there
(`withoutEnlargement`), so there are no 1440 or 1920 variants, listing them
would ship byte-identical duplicates under misleading names. On displays wider
than ~1024 CSS px the hero will be slightly soft. A higher-resolution
replacement is worth taking when Zack's photos arrive.

### `emergency-alt.jpg` was not supplied

The brief listed it as an unused backup. It is not in `assets-source/`. Nothing
references it, so nothing is broken.

---

## Before/after comparison pairs, ILLUSTRATIVE ONLY

> **AI-generated illustrative imagery.**
> **Must NOT be captioned as actual completed client work.**
> **Section heading must include "illustrative" or "examples".**
> **Replace with real client before/after photos when available.**

Wired in via `src/data/comparisons.ts`. The approved section heading is
exported as a constant so it cannot drift:

```
APPROVED_COMPARISON_HEADING = "Illustrative examples of the standard we work to"
```

Each slider also carries a persistent `Illustrative example` label in its
caption bar, independent of the section heading.

### Banned language, enforced and verified in the built output

| Never use | Why |
|---|---|
| "Our work" | Possessive, claims authorship |
| "Recent jobs" | Implies these are past jobs |
| "Completed projects" | Same |
| Any location (Beverley, Hull, Cottingham, a postcode) | Turns an illustration into a claim about a specific job |

The gallery eyebrow, footer link and 404 nav label were all renamed during
this pass to remove "Our work" and "Recent jobs". The only surviving match in
the output is the word *workmanship* in the Terms guarantee, which is a
legitimate warranty statement.

### Wired in

| Pair | AVIF max | Quality | Status |
|---|---|---|---|
| `leak-before` / `leak-after` | 33KB / 34KB @1400 | 55 | **Live** |
| `radiator-before` / `radiator-after` | 46KB / 42KB @1400 | 55 | **Live** |

Both halves of each pair are encoded at identical widths and quality, so no
quality seam appears as the slider handle moves.

### NOT wired in, `bathroom-before` / `bathroom-after`

**These are not a matched pair and must not be added to `comparisons`.**

1. **Different rooms.** The "before" is a square bathroom with a pedestal
   basin and small white square tiles. The "after" is a narrow corridor WC
   with large grey format tiles, a different layout and a different window
   position. No refit turns one into the other.
2. **The "after" is a two-up composite**, two separate views side by side
   with a visible vertical seam. In a compare slider, dragging the handle
   would reveal half of one photograph and half of another.

They are optimised (so the file set stays consistent) but excluded from
`comparisons`. A mismatched pair reads as a stock-photo trick and does more
damage than showing no comparison at all.

**Replace with:** a genuine matched pair from Zack, same room, same angle,
same spot, one shot before starting and one after finishing.

---

## Gallery showcase, ILLUSTRATIVE ONLY

> **AI-generated illustrative imagery.**
> **Must NOT be captioned as actual completed client work.**
> **Section heading must include "illustrative" or "examples".**
> **Replace with real client before/after photos when available.**

All 11 illustrative images also appear on `/gallery/` via
`src/data/showcase.ts`, in a filterable masonry grid with a lightbox.

**Every tile carries a visible `ILLUSTRATIVE` badge**, shown without hover, and
the lightbox caption repeats: *"Illustrative example, not a photograph of a
past job."*

### Headings on that page, all three contain "Illustrative"

1. "Illustrative examples of the standard we work to" (page H1)
2. "Illustrative examples: drag to compare." (comparison sliders)
3. "Illustrative examples of what we deal with." (showcase grid)

The previous page copy said *"No showroom photography and no stock images"* -
**that line was removed**, because it is no longer true now that illustrative
imagery appears on the page.

### Schema

`ImageGallery` / `ImageObject` markup is emitted **only** when `workImages`
contains real client photographs. Illustrative imagery is never marked up as
portfolio work, because that would assert authorship to search engines.

### When real photos arrive

Real work takes priority automatically: populating `workImages` /
`beforeAfter` in `src/data/gallery.ts` promotes genuine photographs to the top
of the page under honest headings, and the illustrative sections drop below
them. No component changes needed.

---

## Hand-authored assets, final, no replacement needed

### Brand

| File | Notes |
|---|---|
| `public/brand/logo.svg` | Full lockup, gradient mark + wordmark |
| `public/brand/logo-mono-light.svg` | Single-colour white, for dark backgrounds and van livery |
| `public/brand/logo-mono-dark.svg` | Single-colour ink, for invoices and print |
| `public/brand/mark.svg` | Mark alone, square safe area |
| `public/brand/favicon.svg` | Mark in rounded navy square, scaled 0.78 for padding |
| `public/brand/apple-touch-icon.png` | 180×180, generated from the favicon SVG |
| `public/brand/og.png` | 1200×630 social card |

**Current mark: pipe-elbow "F" with a fused droplet.**

Chosen from six AI-explored concept directions, then hand-authored as SVG (the
concepts were reference only, a logo must be vector).

The winning concept as drawn had the droplet **detached** at the top right.
That was corrected: at 24px a detached droplet shrinks to a stray dot that
reads as screen dirt. Fusing it into the terminal of the upper arm keeps it
legible at every size.

Verified before shipping:

| Test | Result |
|---|---|
| 16px / 24px / 32px / 48px favicon | Droplet stays distinct, counters stay open |
| Filled solid black on white | Still unmistakably an "F", the gradient is not doing the work |
| Filled solid white on navy | Same, safe for van livery and invoices |

Geometry: 6.5px stroke, 12px elbow radius, droplet fused at the arm terminal.
**Do not thicken the stroke or detach the droplet**, both fail at favicon size.

The logo is vector-authored, not raster-generated, as specified.

### Icons

| File | Notes |
|---|---|
| `src/components/ui/ServiceIcons.tsx` | 4 service icons on lucide's 24×24 / 1.75px grid |

Three are hand-drawn (emergency, bathroom, leak). **Maintenance uses lucide's
own `Wrench`**, three hand-drawn attempts all read as a hollow tube because a
wrench needs its open jaw to be legible at 24px, and lucide's is already
correct. Redrawing it would only have made it worse.

### Illustration and pattern

| File | Notes |
|---|---|
| `src/components/ui/AreaHeaderPattern.tsx` | Deterministic contour field, seeded from the area slug |
| `src/components/ui/WaterBackground.tsx` | Three layered sine waves, 18s / 26s / 34s |
| `src/components/ui/Grain.tsx` | 3% `feTurbulence` overlay |

**On area headers specifically:** 18 photographs of real Yorkshire towns were
*not* generated, deliberately. Fabricated imagery of a real place is both a
legal risk and an SEO liability, Google treats it as a quality signal against
the page, and a resident spots a wrong-looking Beverley immediately.

Instead each area header carries **one of the existing plumbing photographs**
as a background, assigned by position in `areas.ts` so the eight backgrounds
spread evenly and no two adjacent towns match. A photograph of a pipe makes no
claim about a place, so every town looks distinct with zero risk attached. The
seeded contour field is retained on top for brand texture.

Verified:
- **Contrast across all 18 headers**: worst case 6.70:1 (requirement 4.5:1)
- **Cost**: +8KB and +3 requests versus a page with no background image
- Area pages score at or above the image-free control page in the same
  Lighthouse window

---

## Awaiting real client photographs

These arrays in `src/data/gallery.ts` are **intentionally empty**. The
components detect this and render designed empty states. Adding entries turns
the sections back on automatically, no other code changes needed.

| Slot | Data location | Currently renders | Needs |
|---|---|---|---|
| Hero visual | `HeroVisual.tsx` | AI hero photo (1024px, slightly soft) | 1 strong vertical job photo |
| Gallery grid | `workImages[]` | "Want to see work like yours?" card | 6-10 job photos |
| Before/after sliders | `beforeAfter[]` | Same card, on the homepage slot | 2+ **matched** pairs |
| About portrait | `about/page.tsx` | AI van + toolbag photo | **1 photo of Zack** |

### What to ask Zack for

> 10-15 job photos. Before/after pairs are the most valuable, same room, same
> angle, same spot, one shot before starting and one after finishing.

**Matched pairs matter.** A before/after slider with a mismatched pair looks
like a stock-photo trick and does more damage than having no slider at all.

### How to add them

1. Optimise first, resize to ~1600px long edge, JPEG q80 or WebP.
   `images.unoptimized` is set, so **Next will not compress anything for you.**
2. Drop into `public/images/work/`
3. Add entries to `workImages` / `beforeAfter` in `src/data/gallery.ts` with
   **true** pixel dimensions (these keep CLS at zero)
4. Write alt text describing what the photo shows and where

**Alt text rule:** describe the work and the location factually. "Fitted
bathroom with walk-in shower completed in Cottingham" is correct once it is a
real Cottingham job. Never apply that phrasing to an image that is not one.

---

## If AI imagery is ever added

Should generated imagery be introduced later, for a blog, or genuinely
generic explainers, it must be:

- Stored in `public/images/generated/`, never `public/images/work/`
- Listed in this file with its prompt and the note that it is AI-generated
- Excluded from `ImageObject` / `ImageGallery` schema
- Alt-texted descriptively and never possessively, "a stopcock under a kitchen
  sink", never "our plumber turning off a stopcock in Hull"
- Never placed in the gallery, the before/after sliders, or anywhere the
  surrounding copy claims it depicts Fluid Plumbing's work

The safest category is educational explainers with no ownership claim: a water
meter, a stopcock, a damp stain, a pressure gauge. Those were specced for this
pass and remain a reasonable future addition.

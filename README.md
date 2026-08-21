# Fluid Plumbing Solutions

Marketing website for Fluid Plumbing Solutions, Kingston upon Hull.
Static site, no server, no database, no CMS.

**Read [DECISIONS.md](DECISIONS.md) before launching.** It lists every
placeholder that still needs a real answer from the client, including several
that are legal or credibility blockers.

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to /out
npm run lint
```

`npm run build` writes a fully static site to `/out`. There is no server
runtime, the output is plain HTML, CSS, JS and images.

### Environment

Create `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
```

Without it the contact form renders a visible setup warning and submits
nothing. The rest of the site is unaffected.

---

## The one file that matters most

**`src/data/site.ts`** is the single source of truth for the phone number,
WhatsApp number, email, address, opening hours and canonical URL.

Change the phone number **here and nowhere else**, it propagates to the nav,
hero, emergency band, every service and area page, the footer, the mobile
action bar, and the `LocalBusiness` schema.

```ts
const PHONE_E164   = '+447000000000';   // E.164, no spaces. WhatsApp strips the +
const PHONE_DISPLAY = '07000 000000';   // what a human sees
```

Both are currently placeholders. Every WhatsApp button is non-functional until
they are replaced.

---

## Adding a job photo

All images run through **`src/data/gallery.ts`**. Nothing is hardcoded in JSX.

1. Optimise the photo first, resize to ~1600px on the long edge, save as JPEG
   at quality 80 or WebP. `images.unoptimized` is set (required for static
   export), so **Next will not resize or compress anything for you**. An
   unoptimised 4MB phone photo will wreck the LCP.

2. Drop it in `public/images/work/`.

3. Edit the entry in `src/data/gallery.ts`:

```ts
{
  id: 'bathroom-cottingham',
  src: '/images/work/bathroom-cottingham.jpg',  // your file
  alt: 'Fitted bathroom with walk-in shower completed in Cottingham, Hull',
  caption: 'Full bathroom installation, Cottingham',
  service: 'Bathroom fitting',
  area: 'Cottingham',
  width: 1600,     // TRUE pixel dimensions, these prevent layout shift
  height: 1200,
  placeholder: false,
}
```

`width` and `height` must be the file's **real** dimensions. They reserve the
space that keeps CLS at zero. Getting them wrong reintroduces layout shift.

Write real `alt` text describing the actual job and where it was, it is both
an accessibility requirement and a local-SEO signal.

### Before/after pairs

`beforeAfter` in the same file. These must be **genuinely matched pairs**:
same room, same angle, same lens, ideally same time of day. A mismatched pair
looks like a stock-photo trick and does more harm than having no slider.

---

## Adding an area page

Area pages are generated from **`src/data/areas.ts`**. Add an entry and the
page, its metadata, its schema, its sitemap entry, and its links in the footer
and areas hub all appear automatically.

```ts
{
  slug: 'preston',                      // becomes /areas/preston/
  name: 'Preston',
  county: 'East Riding of Yorkshire',
  postcodes: ['HU12'],
  geo: { latitude: 53.7419, longitude: -0.1889 },
  metaTitle: 'Plumber in Preston',        // NO brand suffix, layout adds it
  metaDescription: '...',                 // <=155 chars
  h1: 'Plumber in Preston',
  intro: ['First paragraph...', 'Second paragraph...'],
  localNote: 'Something specifically true about plumbing here.',
}
```

**Write the copy by hand.** The entire point of these pages is that they are
not templated, each one references a genuine local landmark and a real
characteristic of the housing stock. Google discounts near-duplicate location
pages, and a homeowner spots filler instantly. If you cannot say something
specific about a town, do not add it.

Removing an area is just deleting its entry.

---

## Adding or editing a service

`src/data/services.ts`. Same pattern, the page, nav dropdown, footer links,
schema and sitemap all follow from the data.

The before/after slider only renders on `bathroom-fitting`; that is controlled
by a slug check in `src/app/services/[slug]/page.tsx`.

---

## Where the content lives

| File | Contains |
|---|---|
| `src/data/site.ts` | Phone, WhatsApp, email, address, hours, URL |
| `src/data/services.ts` | 4 services, full page copy |
| `src/data/areas.ts` | 18 area pages |
| `src/data/content.ts` | FAQs, testimonials, process, reasons, stats, trust bar mode |
| `src/data/gallery.ts` | Every image on the site |

No copy is hardcoded in components.

---

## Imagery

Two distinct categories, and the distinction is legal, not cosmetic:

**Illustrative photography (11 images).** AI-generated, wired into the hero,
emergency band, service cards, explainers and About sidebar. None of it depicts
work this business carried out, and no alt text or caption implies otherwise.

**Client job photography (0 images).** `workImages` and `beforeAfter` in
`src/data/gallery.ts` are intentionally empty. The gallery and the homepage
before/after slot detect this and render an "ask us for photos of work like
yours" card instead.

**Never put an illustrative image into those two arrays.** Presenting generated
imagery as a trader's completed work is a misleading action under the DMCC Act
2024. Full inventory and reasoning in [IMAGE_MANIFEST.md](IMAGE_MANIFEST.md).

### The optimisation pipeline

```bash
npm run optimise:images
```

Reads `assets-source/` (gitignored, outside `public/` so the ~40MB of originals
never enter the static export) and writes AVIF + WebP derivatives at multiple
widths to `public/images/optimised/`, plus a typed
`src/data/image-placeholders.ts` with dimensions and dominant colours.

**Budgets are enforced and the script exits non-zero if one is missed**, hero
120KB, cards and explainers 80KB, About 60KB. If an image overruns, quality
steps down in 5s and the final value is reported rather than silently shipped.

Result: **40.2MB → 1.4MB, a 96.6% reduction.**

To add or replace an image: drop it in `assets-source/`, add a `PLAN` entry in
`scripts/optimise-images.mjs`, re-run, then reference it by name through
`<OptimisedImage>`.

### Serving

`<OptimisedImage>` emits a native `<picture>` with AVIF first and WebP
fallback. `next/image` is **not** used for these: `images.unoptimized` is set
for static export, so it would emit a single unprocessed `<img>` and ignore the
derivatives entirely.

Every image carries explicit `width`/`height`, CLS is 0 and must stay there.

### Brand assets

`public/brand/` holds the logo in full-colour, mono-light and mono-dark, plus
the mark, favicon, apple-touch-icon and OG card. The mark is legibility-tested
at 24/48/320px, **do not thicken the 6.5px stroke**, it fails at favicon size.

---

## Two content switches

Two sections are deliberately running in a "safe" mode because the real content
does not exist yet. Both are one-line changes when it does.

### Trust bar

`src/data/content.ts` → `TRUST_BAR_MODE`

- `'qualitative'` (current), four claims true from day one, no numbers
- `'numeric'`, the counting stat bar

**Do not switch to `'numeric'` until every figure in `stats` is a real number
Zack has confirmed.** They are currently invented. See DECISIONS.md item 3.

### Testimonials

Not rendered. That homepage slot carries `<BeforeAfterSection />` instead.

To enable once real Google reviews exist: replace every entry in
`src/data/content.ts` → `testimonials` with a real attributable review, then
render `<Testimonials />` in `src/app/page.tsx`. The component is still there
and still wired up. See DECISIONS.md item 4.

---

## Deploying

The build output is a plain static directory, so any static host works.

### Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 20 or later |

Add `NEXT_PUBLIC_WEB3FORMS_KEY` under Settings → Environment variables, then
redeploy. Compression is on by default.

### Vercel

Vercel detects Next.js automatically. Because `output: 'export'` is set it
deploys as a static site. Add the environment variable in Project Settings.

### Anywhere else

Upload `/out`. Two requirements:
- **Serve gzip or brotli.** Uncompressed, the JS payload is ~927KB and
  Lighthouse performance drops from 95 to around 71. Compressed it is ~384KB.
- `trailingSlash: true` is set, so `/about/` is canonical. Configure the host
  to match rather than redirecting between the two forms.

---

## Web3Forms setup

1. Go to [web3forms.com](https://web3forms.com), enter
   `Fluidplumbingsolutions@gmail.com`, and collect the access key from email.
2. Add it as `NEXT_PUBLIC_WEB3FORMS_KEY` in your host's environment variables.
3. **Redeploy with the build cache cleared**, then send a test submission.

### Why the setup warning can persist after you set the variable

`NEXT_PUBLIC_*` variables are **inlined into the JavaScript at build time**,
not read at runtime. An existing build has the old (empty) value compiled in,
so adding the variable changes nothing until the site is rebuilt.

On Netlify: **Deploys → Trigger deploy → Clear cache and deploy site**.
Plain "Deploy site" may reuse the cached build.

Also confirm, under Site configuration → Environment variables:

- the variable's **Scopes** include **Builds** (not just Functions/Runtime)
- it is set for the **deploy context** you are testing (Production vs preview)

To verify locally that a key is being picked up:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY="your-key" npm run build
grep -roh 'web3formsKey:"[^"]*"' out/_next/static/chunks/*.js
```

That should print your key, not an empty string.

The key is public by design, it only permits submissions to the address it was
issued for. A honeypot field is already wired in for spam.

Note the form is the *secondary* channel. WhatsApp is the primary CTA
throughout, and is where most enquiries should arrive.

---

## Stack

Next.js 15 (App Router, `output: 'export'`) · TypeScript · Tailwind CSS v4 ·
Motion · Lenis · GSAP ScrollTrigger · lucide-react · Radix (Accordion,
DropdownMenu, Dialog) · react-compare-slider · yet-another-react-lightbox ·
Web3Forms

Design tokens are CSS custom properties in `src/app/globals.css` under
`@theme`. Base element styles sit inside `@layer base`, **keep them there**,
or the fluid `h1`/`h2` clamps will override Tailwind's `text-*` utilities on
any heading.

### Animation

- Entrances: `opacity 0→1`, `y 24→0`, 0.6s, ease `[0.22, 1, 0.36, 1]`,
  0.08s stagger, `whileInView` with `once: true`.
- The hero animates with **CSS, not Motion**, because it contains the LCP
  element. Do not convert it back to a client component.
- **`.fps-rise` animates transform only, never opacity.** An element at
  `opacity: 0` is not an LCP candidate, so fading the hero in defers the LCP
  timestamp until the fade completes. Adding an opacity fade back cost 1.3s of
  LCP when measured. This applies to anything above the fold.
- Lenis and GSAP are both behind dynamic imports so they stay out of the
  initial chunk. Keep them that way.
- GSAP is used for exactly one sequence: the process line draw.
- Everything is disabled under `prefers-reduced-motion`, including Lenis and
  GSAP. Use Motion's `useReducedMotion()`, not a custom `useEffect` hook,
  which resolves too late and leaves content invisible on first paint.

---

## Accessibility notes

Verified at 100 in Lighthouse, but a few constraints are easy to break:

- **`#0EA5E9` (cyan-500) must never be text on a light background**, 2.53:1.
  Use `text-fps-cyan-700` (`#0A6E9B`, 5.16:1).
- **`#64748B` (ink-500) must never be body text on `slate-100`**, 4.34:1.
  Use `text-fps-ink-600` (`#5A6779`, 5.25:1).
- **Never put white text on the signature gradient**, as low as 1.86:1.
  Use `text-fps-navy-950`.
- Aqua `#2DD4BF` on navy `#04121F` is 10.15:1 and safe anywhere.

Any element carrying `aria-label` needs a role that permits it, a bare `<div>`
does not.

---

Built by [ShiftDeploy](https://shiftdeploy.com).

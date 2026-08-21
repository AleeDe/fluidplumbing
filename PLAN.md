# Fluid Plumbing Solutions, Build Plan

## Positioning
The most credible, fastest-to-contact plumber in Hull. Not cheapest, not chummy.
Every design and copy decision serves credibility + speed of contact.

## Constraints locked before build
- No job photos supplied. Image layer sits behind a typed manifest (`src/data/gallery.ts`)
  with correctly-dimensioned generated SVG placeholders. Swapping in real photos is a data edit.
- WhatsApp/phone use the `+44 7000 000000` placeholder, centralised in `src/data/site.ts`.
- **Not Gas Safe registered.** The term "Gas Safe" appears nowhere on the site.
  Trust copy leans on insurance, guarantees, tidiness and response time instead.

## Stack
Next 15 App Router · TypeScript · Tailwind v4 · `output: 'export'` · `images.unoptimized`
motion/react · lenis · gsap+ScrollTrigger (2 sequences only) · next/font (Sora + Inter) · lucide-react
Web3Forms (static) · no CMS, no DB, no auth.

## Borrowed components, hard cap 5
1. react-compare-slider  (before/after, bathroom page + gallery)
2. yet-another-react-lightbox (gallery)
3. shadcn Accordion (FAQ)
4. shadcn DropdownMenu (nav services)
5. Magic UI number-ticker (stats)
Magic UI border-beam is the 6th, evaluate at build; drop if cap is hit or if it reads SaaS.
Hand-built, never borrowed: hero water background, emergency band, gallery grid.

## File tree
```
src/
  app/
    layout.tsx  page.tsx  sitemap.ts  robots.ts  not-found.tsx
    services/page.tsx  services/[slug]/page.tsx
    areas/page.tsx     areas/[slug]/page.tsx
    about/  gallery/  contact/  privacy-policy/  terms/
  data/
    site.ts       # single source: NAP, phone, whatsapp, hours, socials
    services.ts   # 4 services, full page copy
    areas.ts      # 18 towns, hand-written intro + landmark
    faqs.ts  testimonials.ts  gallery.ts  process.ts  trust.ts
  components/
    layout/    Nav Footer MobileActionBar SkipLink SmoothScroll
    sections/  Hero TrustBar Services EmergencyBand WhyUs Process
               GalleryPreview Testimonials Areas Faq FinalCta
    ui/        Button Container Eyebrow SectionHeading Card Reveal
               Grain WaterBackground NumberTicker CompareSlider
    seo/       JsonLd Breadcrumbs
  lib/  motion.ts  useReducedMotion.ts  schema.ts  utils.ts
public/brand/  logo.svg mark.svg favicon.svg apple-touch-icon.png og.png
public/images/work/
```

## Build order
1. Scaffold, config, tokens in globals.css, fonts
2. Brand SVGs (logo, mark, favicon, og)
3. Data files, copy written first, so JSX stays content-free
4. UI primitives + motion guard + Lenis
5. Nav / Footer / MobileActionBar
6. Homepage sections in order 1-14
7. Inner pages: services (4) → areas (18) → about, gallery, contact, legal
8. SEO: generateMetadata, JSON-LD, sitemap, robots
9. `npm run build` → clean /out, zero TS errors
10. Playwright: screenshot every route at 360/768/1024/1440/1920, review, fix, repeat
11. README.md + DECISIONS.md

## Accessibility gate
aqua #2DD4BF on navy #04121F must be audited for 4.5:1. If body-size text fails,
darken to a token `--fps-aqua-500` for text use and keep 400 for large/graphical only.
Full keyboard nav, visible aqua focus rings, reduced-motion kills Lenis + GSAP + Motion.

## Definition of done
Clean static export · Lighthouse >=95 mobile x4 · LCP <2.0s · CLS <0.05 ·
no dead `#` links · no lorem · every page unique H1 + meta · 18 area pages hand-written.

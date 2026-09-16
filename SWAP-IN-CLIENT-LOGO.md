# Swapping in the client's logo

The site currently ships a hand-authored SVG mark in navy/aqua. The client
has supplied his own logo, which is orange. This is how to swap it.

## 1. Save the file

```
assets-source/client-logo.png
```

Transparent PNG. Any size, but at least 600px wide so the header stays sharp.

## 2. Generate the assets

```bash
npm run logo:prepare
```

Trims surrounding transparency, then writes:

| File | Purpose |
|---|---|
| `logo-client.png` / `.webp` | header lockup, 80px tall for retina |
| `mark-client.png` | droplet alone, 512 square, transparent |
| `favicon-client.png` | 32 square |
| `apple-touch-icon.png` | 180 square on navy |
| `icon-192.png` / `icon-512.png` | on navy |

The script prints the real dimensions. Copy the lockup width into `LOGO` in
`src/components/ui/ClientLogo.tsx` so there is no layout shift.

## 3. Swap the component

Three places use the logo:

- `src/components/layout/Nav.tsx` line 62 (header)
- `src/components/layout/Nav.tsx` line 154 (mobile menu)
- `src/components/layout/Footer.tsx` line 20 (footer)

Replace `<Logo ... />` with `<ClientLogo ... />` in each, and change the
import. Keep the existing `className` so the sizes stay the same.

## 4. Point the favicon at the new icons

In `src/app/layout.tsx`, update the `icons` block in `metadata` to use
`/brand/favicon-client.png` and `/brand/apple-touch-icon.png`.

## 5. Check it at real size

The header renders the logo at **40px tall on desktop, 36px on mobile**.
Look at it there, not at full size. Two things to confirm:

- Is "PLUMBING SOLUTIONS" legible, or has it turned to mush?
- Are the artefacts in the "Fluid" lettering visible?

If either is a problem, the usual fix is to use the mark alone in the header
and keep the full lockup for the footer, where it renders larger.

## Known issues with the supplied file

Recorded so nobody rediscovers them later:

1. **Orange on a navy site.** The palette was chosen deliberately to look
   unlike other Hull plumbers. The client's logo does not match it. Using it
   anyway is his call.
2. **Artefacts in the wordmark.** The white "Fluid" lettering has black
   speckles and holes punched through it, most likely from a poor background
   removal. They will be visible at header size.
3. **Raster, not vector.** A 2172x724 PNG is fine for the site but cannot be
   used for van livery, signage or print without looking soft. Worth asking
   whoever designed it for the original SVG, AI or EPS.

## Keeping the old mark

Do not delete `src/components/ui/Logo.tsx` or the SVGs in `public/brand/`.
They are legibility-tested at 24, 48 and 320px and have mono-light and
mono-dark variants. If the client's logo proves unusable at small sizes, the
fallback is already there.

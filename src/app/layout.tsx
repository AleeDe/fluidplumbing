import type { Metadata, Viewport } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

import { site } from '@/data/site';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SkipLink } from '@/components/layout/SkipLink';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ClickSparkLayer } from '@/components/ui/ClickSparkLayer';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  // Only the Latin subset is ever used. Without this, next/font emits nine
  // per-unicode-range woff2 files (one 85KB) and the browser cannot tell
  // which it needs until the text is laid out.
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Plumber in Hull | Fluid Plumbing Solutions',
    template: '%s | Fluid Plumbing Solutions',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: 'Plumber in Hull | Fluid Plumbing Solutions',
    description: site.description,
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber in Hull | Fluid Plumbing Solutions',
    description: site.description,
    images: ['/brand/og.png'],
  },
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#04121F',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sora.variable} ${inter.variable} no-js`}>
      <head>
        {/* Removes .no-js before paint, so the reveal fallback only applies
            when JavaScript genuinely is not running. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <SkipLink />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Aqua spark on click. Viewport-sized canvas, silent under
            prefers-reduced-motion, never intercepts pointer events. */}
        <ClickSparkLayer />
      </body>
    </html>
  );
}

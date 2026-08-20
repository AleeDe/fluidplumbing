import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Grain } from '@/components/ui/Grain';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page does not exist. Find our services, areas covered and contact details here.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-fps-navy-950 pt-32 pb-20">
      <Grain />
      <Container className="relative">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-fps-aqua-400">
          Error 404
        </p>
        <h1 className="max-w-3xl text-white">This page has gone down the drain.</h1>
        <p className="fps-measure mt-6 text-lg text-white/70">
          The page you were after does not exist. It may have moved, or the link may
          have been mistyped. Everything else is still where it should be.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="primary" size="lg">
            Back to home
          </Button>
          <Button
            href={site.whatsapp.href(site.whatsapp.defaultMessage)}
            variant="ghost"
            size="lg"
          >
            <WhatsAppIcon className="size-[18px]" />
            Message on WhatsApp
          </Button>
        </div>
        <nav aria-label="Useful links" className="mt-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {[
              { href: '/services/', label: 'Services' },
              { href: '/areas/', label: 'Areas we cover' },
              { href: '/gallery/', label: 'Standard of work' },
              { href: '/contact/', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 underline-offset-4 transition-colors hover:text-fps-aqua-400 hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

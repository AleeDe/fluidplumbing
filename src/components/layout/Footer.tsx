import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Grain } from '@/components/ui/Grain';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-fps-navy-700 bg-fps-navy-950 text-white">
      <Grain />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* NAP */}
          <div>
            <Logo className="h-10 w-auto text-white" />
            <p className="fps-measure mt-5 text-sm leading-relaxed text-white/60">
              Plumbers based in Hull, working across the East Riding of Yorkshire.
              Emergency callouts, bathroom fitting, leak detection and repairs.
            </p>

            <address className="mt-6 space-y-3 text-sm not-italic">
              <a
                href={site.phone.href}
                className="flex min-h-11 items-center gap-3 text-white/80 transition-colors hover:text-fps-aqua-400"
              >
                <Phone aria-hidden="true" className="size-4 shrink-0 text-fps-aqua-400" />
                <span className="tabular">{site.phone.display}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex min-h-11 items-center gap-3 break-all py-2 text-white/80 transition-colors hover:text-fps-aqua-400"
              >
                <Mail aria-hidden="true" className="size-4 shrink-0 text-fps-aqua-400" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-white/80">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-fps-aqua-400" />
                {site.address.locality}, {site.address.region}
              </p>
            </address>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="font-sora text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="inline-flex min-h-9 items-center text-white/60 transition-colors hover:text-fps-aqua-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/gallery/"
                  className="inline-flex min-h-9 items-center text-white/60 transition-colors hover:text-fps-aqua-400"
                >
                  Examples of our standard
                </Link>
              </li>
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-label="Areas covered">
            <h2 className="font-sora text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Areas
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {areas.slice(0, 8).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}/`}
                    className="inline-flex min-h-9 items-center text-white/60 transition-colors hover:text-fps-aqua-400"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas/"
                  className="inline-flex min-h-11 items-center font-medium text-fps-aqua-400 transition-colors hover:text-fps-aqua-300"
                >
                  All areas →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className="font-sora text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Hours
            </h2>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <p className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-fps-aqua-400" />
                <span>{site.hours.summary}</span>
              </p>
              <p className="rounded-xl border border-fps-amber-500/25 bg-fps-amber-500/8 px-3 py-2.5 text-fps-amber-500">
                {site.hours.emergency}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-fps-navy-700 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy/" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms/" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
              Terms
            </Link>
            <p>
              Website by{' '}
              <a
                href={site.builtBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-fps-aqua-400 transition-colors hover:text-fps-aqua-300"
              >
                {site.builtBy.name}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

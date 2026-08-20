'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '/areas/', label: 'Areas' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? 'rgba(4,18,31,0.86)' : 'rgba(4,18,31,0)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)',
        boxShadow: scrolled
          ? '0 8px 32px -16px rgba(0,0,0,0.7)'
          : '0 0px 0px 0px rgba(0,0,0,0)',
      }}
      transition={
        reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 32 }
      }
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b',
        // backdrop-blur must persist through the transition, not toggle with it,
        // otherwise the bar reads as a flat grey slab over light sections.
        'supports-[backdrop-filter]:backdrop-blur-xl',
      )}
    >
      <Container>
        <nav aria-label="Main" className="flex h-18 items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="shrink-0 rounded-md"
            aria-label={`${site.name} home`}
          >
            <Logo className="h-9 w-auto md:h-10" />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] text-white/80 transition-colors duration-250 hover:bg-white/5 hover:text-white data-[state=open]:text-white">
                  Services
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-250 group-data-[state=open]:rotate-180"
                  />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={10}
                  align="start"
                  className="animate-fps-dropdown z-50 w-80 rounded-2xl border border-fps-navy-700 bg-fps-navy-900/95 p-2 shadow-2xl backdrop-blur-xl"
                >
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/services/"
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-fps-aqua-400 outline-none transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                    >
                      All services
                    </Link>
                  </DropdownMenu.Item>
                  <div className="my-1 h-px bg-fps-navy-700" />
                  {services.map((s) => (
                    <DropdownMenu.Item key={s.slug} asChild>
                      <Link
                        href={`/services/${s.slug}/`}
                        className="block rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-white/5 focus-visible:bg-white/5"
                      >
                        <span className="block text-sm font-medium text-white">
                          {s.navLabel}
                        </span>
                        <span className="mt-0.5 block text-xs text-white/55">
                          {s.bullets[0]}
                        </span>
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[0.95rem] text-white/80 transition-colors duration-250 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phone.href}
              className="tabular rounded-full px-2 text-[0.95rem] font-medium text-white/80 transition-colors hover:text-fps-aqua-400"
            >
              {site.phone.display}
            </a>
            <Button href={site.phone.href} variant="emergency" size="sm">
              <Phone aria-hidden="true" className="size-4" />
              Emergency? Call now
            </Button>
          </div>

          {/* Mobile trigger */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-fps-navy-950/80 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,380px)] flex-col overflow-y-auto border-l border-fps-navy-700 bg-fps-navy-950 p-6">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Site navigation and contact options
                </Dialog.Description>

                <div className="mb-8 flex items-center justify-between">
                  <Logo className="h-9 w-auto" />
                  <Dialog.Close asChild>
                    <button
                      className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white"
                      aria-label="Close menu"
                    >
                      <X aria-hidden="true" className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-fps-aqua-400">
                  Services
                </p>
                <ul className="mb-6 space-y-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/`}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl py-2.5 text-lg text-white/85 transition-colors hover:text-fps-aqua-400"
                      >
                        {s.navLabel}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="mb-8 space-y-1 border-t border-fps-navy-700 pt-6">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl py-2.5 text-lg text-white/85 transition-colors hover:text-fps-aqua-400"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3">
                  <Button
                    href={site.whatsapp.href(site.whatsapp.defaultMessage)}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Message on WhatsApp
                  </Button>
                  <Button href={site.phone.href} variant="ghost" size="lg" className="w-full">
                    <Phone aria-hidden="true" className="size-4" />
                    {site.phone.display}
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </nav>
      </Container>
    </motion.header>
  );
}

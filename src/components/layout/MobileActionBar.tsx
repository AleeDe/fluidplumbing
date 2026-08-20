'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Phone } from 'lucide-react';
import { site } from '@/data/site';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/** Mobile-only floating bar. Appears after 300px of scroll. */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? false : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 90, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-fps-navy-700 bg-fps-navy-950/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
        >
          <div className="flex gap-3">
            <a
              href={site.phone.href}
              className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-fps-amber-500 font-semibold text-fps-ink-900"
            >
              <Phone aria-hidden="true" className="size-[18px]" />
              Call now
            </a>
            <a
              href={site.whatsapp.href(site.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-fps-aqua-400 font-semibold text-fps-navy-950"
            >
              <WhatsAppIcon className="size-[18px]" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

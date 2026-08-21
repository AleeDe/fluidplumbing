import { MessageCircle, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { cn } from '@/lib/utils';

/**
 * Shown wherever job photography would go, while `workImages` / `beforeAfter`
 * are empty.
 *
 * Deliberately not a "coming soon" notice. It makes an offer instead — photos
 * of relevant recent work, sent directly — which is both more useful to the
 * visitor and a stronger reason to open WhatsApp than a gallery would be.
 */
export function WorkEmptyState({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'rounded-fps border p-8 md:p-12',
        dark
          ? 'border-fps-navy-700 bg-fps-navy-900/50'
          : 'border-fps-ink-900/10 bg-white',
        className,
      )}
    >
      <div className="mx-auto max-w-xl text-center">
        <span
          aria-hidden="true"
          className={cn(
            'mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl',
            dark ? 'bg-fps-aqua-400/10' : 'bg-fps-cyan-700/8',
          )}
        >
          <MessageCircle
            className={cn('size-6', dark ? 'text-fps-aqua-400' : 'text-fps-cyan-700')}
            strokeWidth={1.75}
          />
        </span>

        <h3
          className={cn(
            'font-sora text-xl font-semibold',
            dark ? 'text-white' : 'text-fps-ink-900',
          )}
        >
          Want to see work like yours?
        </h3>

        <p
          className={cn(
            'mx-auto mt-3 max-w-md',
            dark ? 'text-white/65' : 'text-fps-ink-600',
          )}
        >
          Tell us what you are planning and we will send photos of recent jobs
          that match: the same suite, the same kind of room, the same problem.
          Straight to your phone, no obligation.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={site.whatsapp.href(
              'Hi Zack, could you send me some photos of recent work?',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fps-aqua-400 px-6 font-medium text-fps-navy-950 transition-colors duration-250 hover:bg-fps-aqua-300"
          >
            <WhatsAppIcon className="size-[18px]" />
            Ask for photos
          </a>
          <a
            href={site.phone.href}
            className={cn(
              'inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 font-medium transition-colors duration-250',
              dark
                ? 'border-white/20 text-white hover:border-fps-aqua-400 hover:text-fps-aqua-400'
                : 'border-fps-ink-900/20 text-fps-ink-900 hover:border-fps-cyan-700 hover:text-fps-cyan-700',
            )}
          >
            <Phone aria-hidden="true" className="size-[18px]" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

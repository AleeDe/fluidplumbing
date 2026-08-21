'use client';

import { useState } from 'react';
import { Send, CircleCheck, TriangleAlert } from 'lucide-react';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full rounded-xl border border-fps-navy-700 bg-fps-navy-950/60 px-4 py-3 text-white ' +
  'placeholder:text-white/35 transition-colors duration-250 ' +
  'focus:border-fps-aqua-400 focus:outline-none focus-visible:outline-3 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-fps-aqua-400';

const label = 'mb-2 block text-sm font-medium text-white/80';

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const keyMissing = !site.web3formsKey;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (keyMissing) {
      setStatus('error');
      setMessage(
        'This form is not connected yet. Please use WhatsApp or call instead.',
      );
      return;
    }

    setStatus('sending');
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', site.web3formsKey);
    formData.append('subject', 'New enquiry from fluidplumbingsolutions.co.uk');
    formData.append('from_name', site.name);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setMessage('Thanks. We have got your message and will come back to you shortly.');
        e.currentTarget.reset();
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please call or message us on WhatsApp.');
      }
    } catch {
      setStatus('error');
      setMessage('Could not send. Please call or message us on WhatsApp.');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'rounded-fps border border-fps-navy-700 bg-fps-navy-900/70 p-6 backdrop-blur-sm md:p-7',
        className,
      )}
    >
      <h3 className="font-sora text-lg font-semibold text-white">Request a quote</h3>
      <p className="mt-1.5 text-sm text-white/55">
        Tell us what is wrong and we will come back to you.
      </p>

      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="cf-name" className={label}>
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
            placeholder="Jane Smith"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-phone" className={label}>
              Phone
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={field}
              placeholder="e.g. 07700 900123"
            />
          </div>
          <div>
            <label htmlFor="cf-email" className={label}>
              Email <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              className={field}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cf-service" className={label}>
            What do you need?
          </label>
          <select id="cf-service" name="service" required className={field} defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title} className="bg-fps-navy-950">
                {s.title}
              </option>
            ))}
            <option value="Something else" className="bg-fps-navy-950">
              Something else
            </option>
          </select>
        </div>

        <div>
          <label htmlFor="cf-message" className={label}>
            Details
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={4}
            required
            className={cn(field, 'resize-y')}
            placeholder="Tell us what is happening, and roughly where you are."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-fps-aqua-400 font-medium text-fps-navy-950 transition-all duration-250 hover:bg-fps-aqua-300 disabled:opacity-60"
      >
        {status === 'sending' ? (
          'Sending…'
        ) : (
          <>
            <Send aria-hidden="true" className="size-[18px]" />
            Send enquiry
          </>
        )}
      </button>

      {keyMissing && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-fps-amber-500/25 bg-fps-amber-500/8 px-3.5 py-3 text-sm text-fps-amber-500">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            Setup step: this form needs{' '}
            <code className="font-mono">NEXT_PUBLIC_WEB3FORMS_KEY</code>.
            {' '}
            <strong className="font-semibold">
              If you have already set it, redeploy with the cache cleared
            </strong>{' '}
            . The value is baked in at build time, so an existing build will not
            pick it up. See README.
          </span>
        </p>
      )}

      <p
        role="status"
        aria-live="polite"
        className={cn(
          'mt-4 flex items-start gap-2 text-sm',
          status === 'sent' && 'text-fps-aqua-400',
          status === 'error' && 'text-fps-amber-500',
          (status === 'idle' || status === 'sending') && 'sr-only',
        )}
      >
        {status === 'sent' && (
          <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        )}
        {status === 'error' && (
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
        )}
        {message}
      </p>
    </form>
  );
}

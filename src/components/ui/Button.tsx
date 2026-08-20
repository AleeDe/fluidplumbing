import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-250 ' +
    'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-fps-aqua-400 ' +
    'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        /** Primary WhatsApp / main action. */
        primary:
          'bg-fps-aqua-400 text-fps-navy-950 hover:bg-fps-aqua-300 ' +
          'shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] hover:shadow-[0_8px_24px_-8px_rgba(45,212,191,0.5)]',
        /** EMERGENCY ONLY. Amber is reserved. */
        emergency:
          'bg-fps-amber-500 text-fps-ink-900 hover:brightness-108 font-semibold ' +
          'hover:shadow-[0_8px_24px_-8px_rgba(245,158,11,0.55)]',
        /** Ghost on dark backgrounds. */
        ghost:
          'border border-white/20 text-white hover:border-fps-aqua-400 hover:text-fps-aqua-400 hover:bg-white/5',
        /** Ghost on light backgrounds. */
        ghostLight:
          'border border-fps-ink-900/20 text-fps-ink-900 hover:border-fps-cyan-700 hover:text-fps-cyan-700 hover:bg-fps-ink-900/5',
        /** Solid dark, used on light sections. */
        solid: 'bg-fps-navy-950 text-white hover:bg-fps-navy-800',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-[0.95rem]',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type ButtonProps = VariantProps<typeof button> & {
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button({
  href,
  external,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(button({ variant, size }), className);

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

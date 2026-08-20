import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Breadcrumbs({
  trail,
  tone = 'dark',
  className,
}: {
  trail: { name: string; href: string }[];
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('mb-6', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.href} className="flex items-center gap-1.5">
              {last ? (
                <span
                  aria-current="page"
                  className={tone === 'dark' ? 'text-white/50' : 'text-fps-ink-600'}
                >
                  {t.name}
                </span>
              ) : (
                <>
                  <Link
                    href={t.href}
                    className={cn(
                      'inline-flex min-h-9 items-center transition-colors',
                      tone === 'dark'
                        ? 'text-white/70 hover:text-fps-aqua-400'
                        : 'text-fps-ink-600 hover:text-fps-cyan-700',
                    )}
                  >
                    {t.name}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className={cn(
                      'size-3.5',
                      tone === 'dark' ? 'text-white/30' : 'text-fps-ink-500',
                    )}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

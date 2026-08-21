import { cn } from '@/lib/utils';

/** Section eyebrow: aqua monospace uppercase — "— 02 / SERVICES" */
export function Eyebrow({
  number,
  children,
  tone = 'dark',
  className,
}: {
  number?: string;
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em]',
        tone === 'dark' ? 'text-fps-aqua-400' : 'text-fps-cyan-700',
        className,
      )}
    >
      {number ? `${number} / ` : ''}
      {children}
    </p>
  );
}

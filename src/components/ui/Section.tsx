import { cn } from '@/lib/utils';
import { Grain } from './Grain';

type Tone = 'dark' | 'darker' | 'light';

const tones: Record<Tone, string> = {
  darker: 'bg-fps-navy-950 text-white',
  dark: 'bg-fps-navy-900 text-white',
  light: 'bg-fps-slate-100 text-fps-ink-900',
};

export function Section({
  tone = 'darker',
  id,
  className,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isDark = tone !== 'light';
  return (
    <section
      id={id}
      className={cn('relative py-16 md:py-24', tones[tone], className)}
    >
      {isDark && <Grain />}
      <div className="relative">{children}</div>
    </section>
  );
}

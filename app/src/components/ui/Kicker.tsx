import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type KickerProps = {
  children: ReactNode;
  /** Light-on-dark version for the navy bands. */
  dark?: boolean;
  /** Replaces the default bottom margin (mb-4) when given. */
  className?: string;
};

/** Small pill label above a heading. */
export function Kicker({ children, dark = false, className }: KickerProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[13px] font-semibold',
        dark ? 'bg-white/12 text-[#bfe8fa]' : 'bg-tint text-blue-deep',
        className ?? 'mb-4',
      )}
    >
      <i className='block size-1.5 rounded-full bg-blue' />
      {children}
    </span>
  );
}

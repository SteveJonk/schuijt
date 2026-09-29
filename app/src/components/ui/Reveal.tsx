'use client';

import type { ReactNode } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Position among its revealing siblings; staggers the entrance by `step` ms, capped at `max` steps. */
  index?: number;
  step?: number;
  max?: number;
};

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, className, index = 0, step = 90, max = 5 }: RevealProps) {
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={index ? { transitionDelay: `${Math.min(index, max) * step}ms` } : undefined}
      className={cn(
        'transition-[opacity,translate] duration-700 ease-brand',
        'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

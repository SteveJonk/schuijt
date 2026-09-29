'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Category filter whose buttons and items live in different sections (buttons
 * in the page intro, items in the grid below). Wrap both in <FilterScope>.
 */
const FilterContext = createContext<[string, (value: string) => void]>(['alle', () => {}]);

export function FilterScope({ children }: { children: ReactNode }) {
  const state = useState('alle');
  return <FilterContext.Provider value={state}>{children}</FilterContext.Provider>;
}

export function FilterButtons({
  options,
  className,
}: {
  options: { value: string; label: string }[];
  className?: string;
}) {
  const [active, setActive] = useContext(FilterContext);

  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          aria-pressed={active === option.value}
          onClick={() => setActive(option.value)}
          className={cn(
            'cursor-pointer rounded-full border-[1.5px] px-5 py-2.5 font-display text-[14px] leading-[normal] font-semibold transition duration-200',
            active === option.value
              ? 'border-ink bg-ink text-white'
              : 'border-line bg-white text-ink-soft hover:border-[#cfe6f3]',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** Renders its children only while the active filter is 'alle' or `category`. */
export function FilterItem({ category, children }: { category: string; children: ReactNode }) {
  const [active] = useContext(FilterContext);
  return active === 'alle' || active === category ? children : null;
}

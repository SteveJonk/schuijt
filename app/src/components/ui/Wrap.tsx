import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type WrapProps = {
  children: ReactNode;
  className?: string;
};

/** Site content width shell. */
export function Wrap({ children, className }: WrapProps) {
  return <div className={cn('mx-auto max-w-site px-[26px]', className)}>{children}</div>;
}

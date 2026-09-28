import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Kicker } from './Kicker';
import { Reveal } from './Reveal';

type SectionHeadProps = {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
};

export function SectionHead({ kicker, title, lead, align = 'center', className }: SectionHeadProps) {
  return (
    <Reveal
      className={cn(
        'mb-[52px] max-w-[660px]',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className='text-[38px]'>{title}</h2>
      {lead ? <p className='mt-4 text-[17px] text-muted'>{lead}</p> : null}
    </Reveal>
  );
}

import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Wrap } from '@/components/ui/Wrap';
import type { WerkwijzeData } from '@/sanity/types';

type WerkwijzeProps = {
  werkwijze: WerkwijzeData | null;
  /** Wave into the next section. */
  divider?: ReactNode;
};

export function Werkwijze({ werkwijze, divider }: WerkwijzeProps) {
  if (!werkwijze) return null;

  return (
    <section id='werkwijze' className='relative bg-linear-180 from-[#fbfdfe] to-[#f2f9fd] py-24'>
      <Wrap>
        <SectionHead head={werkwijze} />
        <div className='grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-xs:grid-cols-1'>
          {(werkwijze.steps ?? []).map((step, index) => (
            <Reveal key={step._key} index={index}>
              <div className='h-full rounded-card border border-line bg-white px-6 py-7 transition-[translate,box-shadow] duration-350 ease-brand hover:-translate-y-[7px] hover:shadow-soft'>
                <div className='flex size-[42px] items-center justify-center rounded-[14px] bg-linear-135 from-blue to-blue-light font-display text-[17px] font-bold text-white shadow-[0_10px_20px_-10px_rgb(6_159_223/0.9)]'>
                  {index + 1}
                </div>
                <h3 className='mt-[18px] text-[17px]'>{step.title}</h3>
                <p className='mt-[9px] text-[14.5px] text-muted'>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
      {divider}
    </section>
  );
}

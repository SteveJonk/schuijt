import type { ReactNode } from 'react';
import { Kicker } from '@/components/ui/Kicker';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import type { IntroData } from '@/sanity/types';

type PageIntroProps = {
  intro: IntroData | null;
  /** Below the text, e.g. filter buttons or badges. */
  children?: ReactNode;
  /** Right-hand column (reviews score card). Widens the intro to the full site width. */
  aside?: ReactNode;
  /** /contact/ has a slightly larger heading and more room underneath. */
  variant?: 'default' | 'contact';
};

/** The light gradient header of overview pages (projecten, blog, reviews, contact). */
export function PageIntro({ intro, children, aside, variant = 'default' }: PageIntroProps) {
  if (!intro) return null;
  const contact = variant === 'contact';

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-linear-170 from-[#fbfdff] via-[#eef7fc] via-55% to-[#e4f2fa] pt-11',
        contact ? 'pb-[60px]' : 'pb-[30px]',
      )}
    >
      <span className='pointer-events-none absolute -top-[180px] -right-[100px] size-[460px] animate-float-1 rounded-full bg-[#bfe6f8] opacity-50 blur-[70px] motion-reduce:animate-none' />
      <div
        className={cn(
          'relative z-[2] mx-auto px-[26px]',
          aside
            ? 'grid max-w-site grid-cols-[1.1fr_.9fr] items-center gap-[50px] max-sm:grid-cols-1'
            : 'max-w-[680px]',
        )}
      >
        <Reveal>
          {intro.kicker ? <Kicker>{intro.kicker}</Kicker> : null}
          <h1 className={cn(contact ? 'text-[42px]' : 'text-[40px]', Boolean(aside) && 'max-w-[520px]')}>{intro.title}</h1>
          <p
            className={cn(
              'text-muted',
              contact ? 'mt-[18px] text-[17.5px]' : 'mt-4 text-[17px]',
              Boolean(aside) && 'max-w-[460px]',
            )}
          >
            {intro.text}
          </p>
          {children}
        </Reveal>
        {aside ? <Reveal index={1}>{aside}</Reveal> : null}
      </div>
    </section>
  );
}

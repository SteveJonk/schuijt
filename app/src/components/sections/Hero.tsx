import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconCheck } from '@/components/ui/icons';
import { Kicker } from '@/components/ui/Kicker';
import { HeroArt, type HeroSize } from '@/components/sections/HeroArt';
import { cn } from '@/lib/cn';
import { telHref } from '@/lib/site';
import { getLayout } from '@/sanity/fetch';
import type { HeroData } from '@/sanity/types';

const VARIANTS = {
  home: {
    section: 'pt-[76px] pb-[150px] max-xl:pt-12 max-xl:pb-[110px]',
    blob: '-top-[180px]',
    h1: 'text-[52px] max-xl:text-[34px]',
  },
  page: {
    section: 'pt-9 pb-[130px] max-xl:pt-5 max-xl:pb-[90px]',
    blob: '-top-[200px]',
    h1: 'text-[48px] max-xl:text-[32px]',
  },
  hub: {
    section: 'pt-[76px] pb-[130px] max-xl:pt-[52px] max-xl:pb-[70px]',
    blob: '-top-[200px]',
    h1: 'text-[46px] max-xl:text-[30px]',
  },
} as const;

/** Gradient hero with photo composition. Variants differ only in spacing and type size. */
export async function Hero({ hero, variant = 'page' }: { hero: HeroData | null; variant?: HeroSize }) {
  if (!hero) return null;
  const { site, ui } = await getLayout();
  const v = VARIANTS[variant];
  const primary = hero.primaryCta?.href
    ? { href: hero.primaryCta.href, label: hero.primaryCta.label }
    : { href: '#contact', label: ui.heroPrimaryCta };

  return (
    <section className={cn('relative overflow-hidden bg-linear-170 from-[#fbfdff] via-[#eef7fc] via-42% to-[#e4f2fa]', v.section)}>
      <span
        className={cn(
          'pointer-events-none absolute -right-[120px] size-[560px] animate-float-1 rounded-full bg-[#bfe6f8] opacity-50 blur-[70px] motion-reduce:animate-none',
          v.blob,
        )}
      />
      <span className='pointer-events-none absolute -bottom-[160px] -left-[140px] size-[420px] animate-float-2 rounded-full bg-[#d9edfb] opacity-50 blur-[70px] motion-reduce:animate-none' />

      <div className='relative z-[2] mx-auto grid max-w-site grid-cols-[1.02fr_.98fr] items-center gap-14 px-[26px] max-xl:grid-cols-1 max-xl:gap-9'>
        <div>
          {hero.kicker ? <Kicker>{hero.kicker}</Kicker> : null}
          <h1 className={cn('tracking-[-0.03em]', v.h1)}>
            {hero.titleBefore}
            <span className='relative whitespace-nowrap text-blue-deep max-xl:whitespace-normal'>
              {hero.titleHighlight}
              <svg
                viewBox='0 0 300 12'
                preserveAspectRatio='none'
                aria-hidden='true'
                className='absolute inset-x-0 -bottom-2 h-3 w-full overflow-visible'
              >
                <path
                  d='M3 8 C 70 2, 150 2, 297 6'
                  className='animate-draw fill-none stroke-blue stroke-5 [stroke-dasharray:420] [stroke-dashoffset:420] [stroke-linecap:round]'
                />
              </svg>
            </span>
            {hero.titleAfter}
          </h1>
          <p className='mt-6 max-w-[480px] text-[18px] text-muted'>{hero.lead}</p>
          <div className='mt-[34px] flex flex-wrap gap-3.5'>
            {primary.label ? <Button href={primary.href}>{primary.label}</Button> : null}
            {site?.phone ? (
              <Button href={telHref(site.phone)} variant='soft'>
                {[ui.callPrefix, site.phone].filter(Boolean).join(' ')}
              </Button>
            ) : null}
          </div>
          {hero.usps?.length ? (
            <div className='mt-10 flex flex-wrap gap-2.5'>
              {hero.usps.map((usp) => (
                <span
                  key={usp}
                  className='inline-flex items-center gap-2 rounded-full border border-[#dceaf3] bg-white/75 px-4 py-[9px] text-[14px] font-medium text-ink-soft backdrop-blur-[6px]'
                >
                  <IconCheck size={15} className='text-blue' />
                  {usp}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <HeroArt hero={hero} size={variant} />
      </div>

      {/* The zakelijk hub runs straight into its floating stats row instead. */}
      {variant === 'hub' ? null : (
        <Divider
          height={110}
          fill='#ffffff'
          path='M0,64 C240,110 420,18 720,42 C1020,66 1200,110 1440,58 L1440,110 L0,110 Z'
        />
      )}
    </section>
  );
}

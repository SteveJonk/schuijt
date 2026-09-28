import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { IconCheck } from '@/components/ui/icons';
import { HeroArt } from '@/components/sections/HeroArt';
import { HERO_USPS } from '@/lib/content/home';
import { SITE, telHref } from '@/lib/site';

export function HomeHero() {
  return (
    <section className='relative overflow-hidden bg-linear-170 from-[#fbfdff] via-[#eef7fc] via-42% to-[#e4f2fa] pt-[76px] pb-[150px] max-xl:pt-12 max-xl:pb-[110px]'>
      <span className='pointer-events-none absolute -top-[180px] -right-[120px] size-[560px] animate-float-1 rounded-full bg-[#bfe6f8] opacity-50 blur-[70px] motion-reduce:animate-none' />
      <span className='pointer-events-none absolute -bottom-[160px] -left-[140px] size-[420px] animate-float-2 rounded-full bg-[#d9edfb] opacity-50 blur-[70px] motion-reduce:animate-none' />

      <div className='relative z-[2] mx-auto grid max-w-site grid-cols-[1.02fr_.98fr] items-center gap-14 px-[26px] max-xl:grid-cols-1 max-xl:gap-9'>
        <div>
          <h1 className='text-[52px] tracking-[-0.03em] max-xl:text-[34px]'>
            Vakwerk in{' '}
            <span className='relative whitespace-nowrap text-blue-deep max-xl:whitespace-normal'>
              bestrating
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
            , schuttingen en tuinaanleg
          </h1>
          <p className='mt-6 max-w-[480px] text-[18px] text-muted'>
            Van een compleet nieuwe tuin tot het herbestraten van een heel binnenterrein. Eén
            aanspreekpunt, een strakke planning en werk dat jarenlang meegaat.
          </p>
          <div className='mt-[34px] flex flex-wrap gap-3.5'>
            <Button href='#contact'>Vraag vrijblijvend een offerte aan</Button>
            <Button href={telHref(SITE.phone)} variant='soft'>
              Bel {SITE.phone}
            </Button>
          </div>
          <div className='mt-10 flex flex-wrap gap-2.5'>
            {HERO_USPS.map((usp) => (
              <span
                key={usp}
                className='inline-flex items-center gap-2 rounded-full border border-[#dceaf3] bg-white/75 px-4 py-[9px] text-[14px] font-medium text-ink-soft backdrop-blur-[6px]'
              >
                <IconCheck size={15} className='text-blue' />
                {usp}
              </span>
            ))}
          </div>
        </div>
        <HeroArt
          images={['/images/tuin-verdiepte-trampoline.jpg', '/images/dakterras-kunstgras.jpg']}
          alt='Complete tuinaanleg met verdiepte trampoline'
          badge={{ value: '700 m²', label: 'Zakelijk bestraat in 2026' }}
        />
      </div>

      <Divider
        height={110}
        fill='#ffffff'
        path='M0,64 C240,110 420,18 720,42 C1020,66 1200,110 1440,58 L1440,110 L0,110 Z'
      />
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClass } from '@/components/ui/Button';
import { useMobileNav } from '@/hooks/useMobileNav';
import { useStickyTopbar } from '@/hooks/useStickyTopbar';
import { MAIN_NAV } from '@/lib/chrome';
import { cn } from '@/lib/cn';
import { SITE, telHref } from '@/lib/site';

function isActivePath(pathname: string, href: string) {
  if (href.includes('#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const stuck = useStickyTopbar();
  const { open, toggle, close } = useMobileNav();
  const tel = telHref(SITE.phone);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-white/82 backdrop-blur-[14px] backdrop-saturate-[180%] transition-shadow duration-300',
          stuck && 'shadow-[0_8px_30px_-18px_rgb(13_42_58/0.35)]',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-site items-center justify-between gap-5 px-[26px] transition-[height] duration-300',
            stuck ? 'h-[68px]' : 'h-[82px] max-sm:h-[66px]',
          )}
        >
          <Link href='/' onClick={close}>
            <Image
              src='/images/logo.png'
              alt={SITE.name}
              width={520}
              height={174}
              priority
              className={cn('w-auto transition-[height] duration-300', stuck ? 'h-[34px]' : 'h-10')}
            />
          </Link>

          <nav className='flex gap-1.5 font-display text-[15px] font-medium max-nav:hidden'>
            {MAIN_NAV.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 transition-[color,background-color] duration-250',
                    active
                      ? 'bg-tint text-blue-deep'
                      : cn(
                          'text-ink-soft hover:text-ink',
                          'after:absolute after:inset-x-3.5 after:bottom-1 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-blue',
                          'after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100',
                        ),
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className='flex items-center gap-3.5 max-nav:ml-auto max-sm:hidden'>
            <a
              href={tel}
              className='font-display text-[15px] font-semibold whitespace-nowrap text-ink-soft transition-colors duration-200 hover:text-blue-deep'
            >
              {SITE.phone}
            </a>
            <Link href='#contact' className={buttonClass('primary', 'sm')}>
              Offerte aanvragen
            </Link>
          </div>

          <button
            type='button'
            onClick={toggle}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            aria-controls='mnav'
            className={cn(
              'relative hidden size-11 flex-none cursor-pointer rounded-full transition-colors duration-250 max-nav:block',
              open ? 'bg-blue' : 'bg-tint',
            )}
          >
            {[
              open ? 'top-[15px] translate-y-1.5 rotate-45' : 'top-[15px]',
              open ? 'top-[21px] scale-x-0 opacity-0' : 'top-[21px]',
              open ? 'top-[27px] -translate-y-1.5 -rotate-45' : 'top-[27px]',
            ].map((position, index) => (
              <span
                key={index}
                className={cn(
                  'absolute inset-x-[13px] h-0.5 rounded-[2px] transition-[translate,rotate,scale,opacity] duration-350 ease-[cubic-bezier(.7,0,.3,1)]',
                  'motion-reduce:transition-none',
                  open ? 'bg-white' : 'bg-ink',
                  position,
                )}
              />
            ))}
          </button>
        </div>
      </header>

      <div
        id='mnav'
        className={cn(
          // Top padding clears the header: its height + 20px.
          'fixed inset-0 z-49 flex flex-col overflow-y-auto bg-white px-6 pb-8 min-nav:hidden',
          stuck ? 'pt-[88px]' : 'pt-[102px] max-sm:pt-[86px]',
          'transition-[clip-path,visibility] duration-550 ease-[cubic-bezier(.7,0,.2,1)] motion-reduce:transition-none',
          open
            ? 'visible [clip-path:inset(0_0_0_0_round_0)]'
            : 'invisible delay-[0s,550ms] [clip-path:inset(0_0_100%_0_round_0_0_28px_28px)]',
        )}
      >
        <nav className='flex flex-col border-t border-line'>
          {MAIN_NAV.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              style={open ? { transitionDelay: `${150 + index * 50}ms` } : undefined}
              className={cn(
                'flex items-center justify-between border-b border-line px-1 py-[17px] font-display text-[22px] font-semibold',
                'after:text-[18px] after:text-blue after:transition-transform after:duration-250 after:content-["→"] hover:after:translate-x-1',
                'motion-reduce:transition-none',
                isActivePath(pathname, link.href) ? 'text-blue-deep' : 'text-ink',
                open
                  ? 'translate-y-0 opacity-100 transition-[opacity,translate] duration-450 ease-[cubic-bezier(.2,.7,.2,1)]'
                  : 'translate-y-3.5 opacity-0 transition-[opacity,translate] duration-250',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div
          className={cn(
            'mt-7 grid gap-2.5 motion-reduce:transition-none',
            open
              ? 'translate-y-0 opacity-100 transition-[opacity,translate] delay-450 duration-450 ease-[cubic-bezier(.2,.7,.2,1)]'
              : 'translate-y-3.5 opacity-0 transition-[opacity,translate] duration-250',
          )}
        >
          <a href={tel} onClick={close} className={buttonClass('soft', 'md', 'w-full justify-center')}>
            {SITE.phone}
          </a>
          <Link href='#contact' onClick={close} className={buttonClass('primary', 'md', 'w-full justify-center')}>
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </>
  );
}

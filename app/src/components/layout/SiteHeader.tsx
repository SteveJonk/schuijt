'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { buttonClass } from '@/components/ui/Button';
import { useMobileNav } from '@/hooks/useMobileNav';
import { useStickyTopbar } from '@/hooks/useStickyTopbar';
import { cn } from '@/lib/cn';
import { telHref, type NavItem } from '@/lib/site';

function isActivePath(pathname: string, href: string) {
  if (href.includes('#')) return false;
  const path = pathname.replace(/\/$/, '');
  const target = href.replace(/\/$/, '');
  return path === target || path.startsWith(`${target}/`);
}

function isActiveItem(pathname: string, item: NavItem) {
  return (item.href ? isActivePath(pathname, item.href) : false) || item.children.some((c) => isActivePath(pathname, c.href));
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox='0 0 12 12'
      aria-hidden='true'
      className={cn('size-3 flex-none transition-transform duration-250', open && 'rotate-180')}
    >
      <path d='M2 4.25 6 8l4-3.75' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

export type SiteHeaderProps = {
  siteName: string;
  logo: { src: string; width: number; height: number } | null;
  phone: string | null;
  links: NavItem[];
  ctaLabel: string | null;
  menuOpen: string | null;
  menuClose: string | null;
};

export function SiteHeader({ siteName, logo, phone, links, ctaLabel, menuOpen, menuClose }: SiteHeaderProps) {
  const pathname = usePathname();
  const stuck = useStickyTopbar();
  const { open, toggle, close } = useMobileNav();
  const tel = phone ? telHref(phone) : null;

  // Menu items with sub-items open on click only (no hover). One open at a time:
  // the desktop dropdown and the mobile accordion each track their own.
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [accordion, setAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!dropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setDropdown(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropdown(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dropdown]);

  // "Offerte aanvragen" jumps to the page's own offerte form (#contact); pages
  // without one (privacy, 404) send it to /contact/ instead.
  const [ctaHref, setCtaHref] = useState('#contact');
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCtaHref(document.getElementById('contact') ? '#contact' : '/contact/');
  }, [pathname]);

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
          <Link href='/' onClick={close} aria-label={logo ? undefined : siteName}>
            {logo ? (
              <Image
                src={logo.src}
                alt={siteName}
                width={logo.width}
                height={logo.height}
                priority
                className={cn('w-auto transition-[height] duration-300', stuck ? 'h-[34px]' : 'h-10')}
              />
            ) : (
              <span className='font-display text-[18px] font-bold'>{siteName}</span>
            )}
          </Link>

          <nav ref={navRef} className='flex gap-1.5 font-display text-[15px] font-medium max-nav:hidden'>
            {links.map((link) => {
              const active = isActiveItem(pathname, link);
              const itemClass = cn(
                'relative rounded-full px-3.5 py-2 transition-[color,background-color] duration-250',
                active
                  ? 'bg-tint text-blue-deep'
                  : 'text-ink-soft hover:text-ink',
              );
              if (!link.children.length) {
                return (
                  <Link
                    key={link.label}
                    href={link.href ?? '#'}
                    className={cn(
                      itemClass,
                      !active &&
                        cn(
                          'after:absolute after:inset-x-3.5 after:bottom-1 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-blue',
                          'after:transition-transform after:duration-300 after:ease-brand hover:after:scale-x-100',
                        ),
                    )}
                  >
                    {link.label}
                  </Link>
                );
              }
              const expanded = dropdown === link.label;
              return (
                <div key={link.label} className='relative'>
                  <button
                    type='button'
                    aria-expanded={expanded}
                    onClick={() => setDropdown(expanded ? null : link.label)}
                    className={cn(itemClass, 'inline-flex cursor-pointer items-center gap-1.5', expanded && !active && 'bg-tint text-ink')}
                  >
                    {link.label}
                    <Chevron open={expanded} />
                  </button>
                  {expanded ? (
                    <ul className='absolute left-0 top-full mt-2 min-w-[230px] rounded-2xl border border-line bg-white p-1.5 shadow-[0_18px_40px_-18px_rgb(13_42_58/0.35)]'>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setDropdown(null)}
                            className={cn(
                              'block rounded-xl px-3.5 py-2.5 whitespace-nowrap transition-colors duration-200',
                              isActivePath(pathname, child.href)
                                ? 'bg-tint text-blue-deep'
                                : 'text-ink-soft hover:bg-tint hover:text-ink',
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className='flex items-center gap-3.5 max-nav:ml-auto max-sm:hidden'>
            {tel ? (
              <a
                href={tel}
                className='font-display text-[15px] font-semibold whitespace-nowrap text-ink-soft transition-colors duration-200 hover:text-blue-deep'
              >
                {phone}
              </a>
            ) : null}
            {ctaLabel ? (
              <Link href={ctaHref} className={buttonClass('primary', 'sm')}>
                {ctaLabel}
              </Link>
            ) : null}
          </div>

          <button
            type='button'
            onClick={toggle}
            aria-label={(open ? menuClose : menuOpen) ?? undefined}
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
          {links.map((link, index) => {
            const rowClass = cn(
              'flex w-full items-center justify-between border-b border-line px-1 py-[17px] text-left font-display text-[22px] font-semibold',
              'motion-reduce:transition-none',
              isActiveItem(pathname, link) ? 'text-blue-deep' : 'text-ink',
              open
                ? 'translate-y-0 opacity-100 transition-[opacity,translate] duration-450 ease-[cubic-bezier(.2,.7,.2,1)]'
                : 'translate-y-3.5 opacity-0 transition-[opacity,translate] duration-250',
            );
            const delay = open ? { transitionDelay: `${150 + index * 50}ms` } : undefined;
            if (!link.children.length) {
              return (
                <Link
                  key={link.label}
                  href={link.href ?? '#'}
                  onClick={close}
                  style={delay}
                  className={cn(
                    rowClass,
                    'after:text-[18px] after:text-blue after:transition-transform after:duration-250 after:content-["→"] hover:after:translate-x-1',
                  )}
                >
                  {link.label}
                </Link>
              );
            }
            const expanded = accordion === link.label;
            return (
              <div key={link.label}>
                <button
                  type='button'
                  aria-expanded={expanded}
                  onClick={() => setAccordion(expanded ? null : link.label)}
                  style={delay}
                  className={cn(rowClass, 'cursor-pointer')}
                >
                  {link.label}
                  <span className='text-blue'>
                    <Chevron open={expanded} />
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-brand motion-reduce:transition-none',
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                  inert={!expanded}
                >
                  <ul className='min-h-0 overflow-hidden bg-tint/60'>
                    {link.children.map((child) => (
                      <li key={child.href} className='border-b border-line last:border-b-0'>
                        <Link
                          href={child.href}
                          onClick={close}
                          className={cn(
                            'block py-3.5 pr-1 pl-5 font-display text-[18px] font-medium',
                            isActivePath(pathname, child.href) ? 'text-blue-deep' : 'text-ink-soft',
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        <div
          className={cn(
            'mt-7 grid gap-2.5 motion-reduce:transition-none',
            open
              ? 'translate-y-0 opacity-100 transition-[opacity,translate] delay-450 duration-450 ease-[cubic-bezier(.2,.7,.2,1)]'
              : 'translate-y-3.5 opacity-0 transition-[opacity,translate] duration-250',
          )}
        >
          {tel ? (
            <a href={tel} onClick={close} className={buttonClass('soft', 'md', 'w-full justify-center')}>
              {phone}
            </a>
          ) : null}
          {ctaLabel ? (
            <Link href={ctaHref} onClick={close} className={buttonClass('primary', 'md', 'w-full justify-center')}>
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}

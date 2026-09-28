import type { FooterLinkGroup, NavLink } from '@/lib/site';

/** Scroll threshold (px) before the header gets the stuck state. */
export const TOPBAR_STUCK_OFFSET = 20;

/** Viewport width above which the mobile nav should close. */
export const MOBILE_NAV_BREAKPOINT = 1060;

export const MAIN_NAV: NavLink[] = [
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Projecten', href: '/projecten' },
  { label: 'Zakelijk', href: '/zakelijk' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Diensten',
    links: [
      { label: 'Sierbestrating', href: '/diensten/sierbestrating' },
      { label: 'Schuttingbouw', href: '/diensten/schuttingbouw' },
      { label: 'Tuinaanleg', href: '/diensten/tuinaanleg' },
      { label: 'Terrasreiniging', href: '/diensten/terrasreiniging' },
    ],
  },
  {
    title: 'Zakelijk',
    links: [
      { label: 'VvE & vastgoedbeheer', href: '/zakelijk/vve-vastgoedbeheer' },
      { label: 'Woningcorporaties', href: '/zakelijk/woningcorporaties' },
      { label: 'Bedrijven & instellingen', href: '/zakelijk' },
      { label: 'Zakelijke projecten', href: '/zakelijk/projecten' },
    ],
  },
];

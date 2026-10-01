/**
 * The site's own details, as the structured data needs them. They come from
 * the `siteSettings` singleton in Sanity (see `getLayout()`); nothing here is
 * content.
 */

/**
 * The site's public origin, without a trailing slash. Environment, not CMS: it
 * differs per deploy and is needed before any CMS round trip. Set
 * NEXT_PUBLIC_SITE_URL in production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

export type SiteInformation = {
  name: string;
  description: string;
  language: string;
  phone: string;
  email: string;
  address: string[];
  addressCountry: string;
  badges: string[];
  socialLinks: string[];
  logoUrl: string | null;
};

/** What the CMS hands over: every field optional, any of them blank. */
export type SiteInformationDocument = {
  name?: string | null;
  description?: string | null;
  language?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: Array<string | null> | null;
  addressCountry?: string | null;
  socialLinks?: Array<string | null> | null;
  logoUrl?: string | null;
} | null;

const list = (value: Array<string | null> | null | undefined) =>
  (value ?? []).map((item) => item?.trim()).filter(Boolean) as string[];

/** Normalises the CMS document: blanks become empty strings and lists. */
export function resolveSiteInformation(doc: SiteInformationDocument): SiteInformation {
  return {
    name: doc?.name?.trim() ?? '',
    description: doc?.description?.trim() ?? '',
    language: doc?.language?.trim() || 'nl',
    phone: doc?.phone?.trim() ?? '',
    email: doc?.email?.trim() ?? '',
    address: list(doc?.address),
    addressCountry: doc?.addressCountry?.trim() || 'NL',
    badges: [],
    socialLinks: list(doc?.socialLinks),
    logoUrl: doc?.logoUrl?.trim() || null,
  };
}

/** `06 46 87 49 92` -> `tel:0646874992`. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

export type NavLink = { href: string; label: string };

/** A menu item. With `children` it expands on click instead of navigating. */
export type NavItem = { label: string; href: string | null; children: NavLink[] };

import type { Metadata } from 'next';
/*
 * FONTS — change these two imports to change the site's typefaces.
 * Keep the `variable` names: `globals.css` maps them to `font-display` / `font-sans`.
 */
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { TrackingScriptsBody, TrackingScriptsHead } from '@/components/TrackingScripts';
import { siteJsonLd } from '@/lib/json-ld';
import { SITE_URL, resolveSiteInformation, type NavItem } from '@/lib/site';
import { getLayout } from '@/sanity/fetch';
import { imageUrl } from '@/sanity/image';
import './globals.css';

const display = Plus_Jakarta_Sans({
  variable: '--font-display-src',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const sans = Inter({
  variable: '--font-sans-src',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getLayout();
  const name = site?.name ?? '';

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: name, template: `%s - ${name}` },
    description: site?.description ?? undefined,
    openGraph: { type: 'website', siteName: name },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { site, navigation } = await getLayout();
  const logoSrc = imageUrl(site?.logo);
  const dims = site?.logo?.dimensions;
  const info = resolveSiteInformation({ ...site, logoUrl: logoSrc });

  return (
    <html
      lang={info.language}
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <head>
        <meta name='apple-mobile-web-app-title' content='Schuijt' />
        <TrackingScriptsHead />
      </head>
      <body>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        {/* The organisation and the site belong on every page. */}
        <JsonLd data={siteJsonLd(info)} />
        <SiteHeader
          siteName={info.name}
          logo={
            logoSrc && dims
              ? { src: logoSrc, width: dims.width, height: dims.height }
              : null
          }
          phone={site?.phone ?? null}
          links={(navigation?.links ?? []).flatMap((link): NavItem[] => {
            const children = (link.children ?? []).flatMap((child) =>
              child.href && child.label
                ? [{ href: child.href, label: child.label }]
                : [],
            );
            // An item needs a target, or sub-items to expand.
            if (!link.label || (!link.href && !children.length)) return [];
            return [{ label: link.label, href: link.href, children }];
          })}
          ctaLabel={navigation?.ctaLabel ?? null}
          menuOpen={navigation?.menuOpen ?? null}
          menuClose={navigation?.menuClose ?? null}
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

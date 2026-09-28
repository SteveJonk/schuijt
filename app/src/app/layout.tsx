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
import { SITE, SITE_URL } from '@/lib/site';
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Sierbestrating, schuttingbouw en tuinaanleg`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.language}
      data-scroll-behavior='smooth'
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <head>
        <TrackingScriptsHead />
      </head>
      <body>
        {/* Vendor-specified position: first element inside <body>. */}
        <TrackingScriptsBody />
        {/* The organisation and the site belong on every page. */}
        <JsonLd data={siteJsonLd(SITE)} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

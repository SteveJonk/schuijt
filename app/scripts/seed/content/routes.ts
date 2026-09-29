/**
 * Every URL that lives at the site root, carried over 1:1 from the WordPress
 * sitemap (post-sitemap.xml + page-sitemap.xml). `app/[slug]` renders exactly
 * these and 404s everything else. Routes with their own folder (/projecten,
 * /reviews, /contact, /zakelijk/*, /blog/*) are not listed here.
 */

export type ServiceCategory = 'sierbestrating' | 'schuttingbouw' | 'tuinaanleg' | 'terrasreiniging';
export type ProjectCategory = ServiceCategory | 'zakelijk';

/** Service landing pages (the dienst template). */
export const SERVICE_SLUGS = [
  'sierbestrating',
  'schuttingbouw',
  'tuinaanleg',
  'terrasreiniging',
  'tuin-uitgraven',
  'tuintegels-schoonmaken-tips-en-professionele-diensten',
] as const;

/** Local SEO pages (the "dienst in plaats" template). */
export const LOCAL_SLUGS = [
  'sierbestrating-noord-holland',
  'sierbestrating-alkmaar',
  'tuinaanleg-noord-holland-creeer-een-groene-oase-met-schuijt-klussenbedrijf',
  'schutting-plaatsen-castricum',
  'schutting-plaatsen-in-heemskerk',
  'schutting-plaatsen-in-beverwijk',
  'schutting-plaatsen-in-haarlem',
  'schutting-plaatsen-in-castricum',
  'houten-schutting-heemskerk',
  'houten-schutting-plaatsen-in-beverwijk',
  'houten-schutting-plaatsen-in-haarlem',
  'houten-schutting-plaatsen-in-castricum',
  'schutting-laten-plaatsen-in-beverwijk',
  'schutting-laten-plaatsen-in-castricum',
  'schutting-laten-plaatsen-in-haarlem',
  'schutting-laten-plaatsen-in-heemskerk',
  'hout-beton-schutting-plaatsen-in-heemskerk',
  'hout-beton-schutting-plaatsen-in-beverwijk',
  'hout-beton-schutting-plaatsen-in-haarlem',
  'hout-beton-schutting-plaatsen-in-castricum',
  'betonschutting-plaatsen-in-beverwijk',
  'betonschutting-plaatsen-in-heemskerk',
  'betonschutting-plaatsen-in-haarlem',
  'betonschutting-plaatsen-in-castricum',
] as const;

/** Plain text pages. */
export const TEXT_SLUGS = ['privacy-policy'] as const;

/** WordPress posts: one project each, with the category that picks its style. */
export const PROJECT_POSTS: [slug: string, category: ProjectCategory][] = [
  ['voortuin-compleet-opnieuw-aangelegd-in-heemskerk', 'tuinaanleg'],
  ['vve-heemskerk-herbestrating-535m2', 'zakelijk'],
  ['project-vve-amsterdam-aanleg-parkeerterrein-nieuwbouw', 'zakelijk'],
  ['oprit-en-terras-vernieuwd-met-geoceramica-in-heerhugowaard', 'sierbestrating'],
  ['hout-beton-schutting-vervangen-in-wormerveer', 'schuttingbouw'],
  ['hout-beton-schutting-met-zwarte-schermen-in-heemskerk', 'schuttingbouw'],
  ['hout-beton-schutting-met-douglas-schermen-in-heerhugowaard', 'schuttingbouw'],
  ['hout-beton-schutting-met-douglas-schermen-in-beinsdorp', 'schuttingbouw'],
  ['voortuin-renovatie-met-plantenbakken-en-kliko-ombouw-in-velserbroek', 'tuinaanleg'],
  ['terras-professioneel-gereinigd-in-zandvoort', 'terrasreiniging'],
  ['douglas-schutting-met-schanskorven-en-maatwerk-lamellen-in-alkmaar', 'schuttingbouw'],
  ['hout-beton-schutting-in-krommenie', 'schuttingbouw'],
  ['hout-beton-schutting-met-witte-betonpalen-in-ijmuiden', 'schuttingbouw'],
  ['terras-en-vlonder-reinigen-in-amsterdam-68-m²-professioneel-gereinigd', 'terrasreiniging'],
  ['voortuin-vernieuwd-in-heemskerk-met-strakke-bestrating', 'sierbestrating'],
  ['oprit-bestraten-in-krommenie-met-schellevis-tegels', 'sierbestrating'],
  ['bestrating-herstellen-en-opnieuw-leggen-in-krommenie-verzakte-tuin-weer-strak', 'sierbestrating'],
  ['bestrating-heerhugowaard-met-60x60-tegels-strak-gelegd-zonder-kleine-passtukken', 'sierbestrating'],
  ['hout-beton-schutting-geplaatst-in-wormer-met-douglas-schermen-en-brede-poort', 'schuttingbouw'],
  ['voor-en-achtertuin-aangelegd-in-velserbroek', 'tuinaanleg'],
  ['hout-beton-schutting-geplaatst-in-haarlem-noord', 'schuttingbouw'],
  ['hout-beton-schutting-geplaatst-in-castricum', 'schuttingbouw'],
  ['terrasreiniging-bij-fysiofit-zandvoort', 'terrasreiniging'],
  ['hout-beton-schutting-geplaatst-in-assendelft', 'schuttingbouw'],
  ['hardhouten-schutting-op-dakterras-krommenie', 'schuttingbouw'],
  ['terras-aanleggen-in-heerhugowaard', 'sierbestrating'],
  ['strakke-nieuwe-erfafscheiding-in-santpoort-noord', 'schuttingbouw'],
  ['hout-beton-schutting-in-wormer', 'schuttingbouw'],
  ['reiniging-vlonder-bestrating-heemskerk', 'terrasreiniging'],
  ['moderne-tuin-in-akersloot', 'tuinaanleg'],
  ['onderhoudsvrije-buitenruime-in-alkmaar', 'sierbestrating'],
  ['hout-beton-schutting-in-heerhugowaard', 'schuttingbouw'],
  ['tuinaanleg-medemblik', 'tuinaanleg'],
  ['terrasreiniging-beverwijk', 'terrasreiniging'],
  ['oprit-bestraten-in-egmond-binnen', 'sierbestrating'],
  ['achtertuin-bestraten-in-heemskerk', 'sierbestrating'],
  ['hout-beton-schutting-met-rotsmotief', 'schuttingbouw'],
  ['hout-beton-schutting-beverwijk-3', 'schuttingbouw'],
  ['terras-aangelegd-heemstede', 'sierbestrating'],
  ['dakterras-heemskerk-2', 'tuinaanleg'],
  ['tuin-aanleg-heiloo', 'tuinaanleg'],
  ['verticale-schutting', 'schuttingbouw'],
  ['tuin-aanleg-haarlem', 'tuinaanleg'],
  ['pergola-plaatsing-alkmaar', 'tuinaanleg'],
  ['terras-en-vlonder-reinigen-nieuw-vennep', 'terrasreiniging'],
  ['overkapping-castricum', 'tuinaanleg'],
  ['terras-reinigen-beverwijk', 'terrasreiniging'],
  ['rhombus-profielschutting', 'schuttingbouw'],
  ['hout-beton-schutting-alkmaar-2', 'schuttingbouw'],
  ['achtertuin-ijmuiden-2', 'tuinaanleg'],
  ['achtertuin-ijmuiden', 'tuinaanleg'],
  ['riante-voortuin-heemskerk', 'tuinaanleg'],
  ['voortuin-heemskerk', 'tuinaanleg'],
  ['hout-beton-schutting-zaandam', 'schuttingbouw'],
  ['hout-beton-schutting-castricum-2', 'schuttingbouw'],
  ['hout-beton-schutting-heemskerk-3', 'schuttingbouw'],
  ['houten-schutting-santpoort-noord', 'schuttingbouw'],
  ['oprit-reinigen-in-beverwijk', 'terrasreiniging'],
  ['grenen-deens-rabat-schutting-heemstede', 'schuttingbouw'],
  ['hout-beton-schutting-castricum', 'schuttingbouw'],
  ['hout-beton-schutting-heemskerk-2', 'schuttingbouw'],
  ['hout-beton-schutting-in-schoorl', 'schuttingbouw'],
  ['terras-reinigen-hoofddorp', 'terrasreiniging'],
  ['terras-reinigen-heiloo', 'terrasreiniging'],
  ['betowood-schutting-met-deur', 'schuttingbouw'],
  ['hout-beton-schutting-heemskerk', 'schuttingbouw'],
  ['hout-beton-schutting-dubbele-deur', 'schuttingbouw'],
  ['zweeds-rabat-heemstede', 'schuttingbouw'],
  ['beschoeiing-geplaatst-zaandam', 'tuinaanleg'],
  ['vlonder-reinigen-amsterdam-2', 'terrasreiniging'],
  ['vlonder-reinigen-amsterdam', 'terrasreiniging'],
  ['tuinaanleg-haarlem', 'tuinaanleg'],
  ['unieke-tuin-heemskerk', 'tuinaanleg'],
  ['mooie-tuin-beverwijk', 'tuinaanleg'],
  ['zweeds-rabat-schutting-assendelft', 'schuttingbouw'],
  ['zweeds-rabat-schutting-heemskerk', 'schuttingbouw'],
  ['schutting-met-douglas-planken-in-assendelft', 'schuttingbouw'],
  ['oprit-reinigen-amsterdam', 'terrasreiniging'],
  ['dakterras-beverwijk', 'terrasreiniging'],
  ['voortuin-haarlem', 'sierbestrating'],
  ['hout-beton-schutting-met-zweeds-rabat-motief', 'schuttingbouw'],
  ['hout-beton-schutting-haarlem', 'schuttingbouw'],
  ['nieuwe-voortuin-in-beverwijk', 'sierbestrating'],
  ['gezamenlijke-oprit-velserbroek', 'sierbestrating'],
  ['hout-beton-schutting-beverwijk-2', 'schuttingbouw'],
  ['hout-beton-schutting-alkmaar', 'schuttingbouw'],
  ['zwart-grenen-schutting-beverwijk', 'schuttingbouw'],
  ['hout-beton-schutting-beverwijk', 'schuttingbouw'],
  ['15-planks-hardhouten-schutting', 'schuttingbouw'],
  ['voortuin-met-siergrind-heemskerk', 'sierbestrating'],
  ['oprit-bestraat-met-zwarte-betonklinkers-heerhugowaard', 'sierbestrating'],
  ['gezamenlijke-oprit-in-beverwijk', 'sierbestrating'],
  ['achtertuin-met-wildverband', 'sierbestrating'],
  ['achtertuin-met-hergebruik-oude-bestrating', 'sierbestrating'],
  ['oude-gebakken-waaltjes-reinigen', 'terrasreiniging'],
  ['koppelstones-reinigen-in-beverwijk', 'terrasreiniging'],
  ['houten-vlonder-amsterdam', 'terrasreiniging'],
  ['nieuwe-voortuin-in-heemskerk', 'tuinaanleg'],
  ['nieuwe-voortuin-in-heemskerk-voor-jan', 'tuinaanleg'],
  ['nieuwe-tuin-in-beverwijk-voor-jim', 'tuinaanleg'],
  ['nieuwe-tuin-in-heemskerk-agnes', 'tuinaanleg'],
  ['nieuwe-tuin-in-heemskerk-piet', 'tuinaanleg'],
];

export type RootPage =
  | { kind: 'service'; slug: (typeof SERVICE_SLUGS)[number] }
  | { kind: 'local'; slug: (typeof LOCAL_SLUGS)[number] }
  | { kind: 'text'; slug: (typeof TEXT_SLUGS)[number] }
  | { kind: 'project'; slug: string; category: ProjectCategory };

const ROOT_PAGES = new Map<string, RootPage>([
  ...SERVICE_SLUGS.map((slug) => [slug, { kind: 'service', slug }] as const),
  ...LOCAL_SLUGS.map((slug) => [slug, { kind: 'local', slug }] as const),
  ...TEXT_SLUGS.map((slug) => [slug, { kind: 'text', slug }] as const),
  ...PROJECT_POSTS.map(([slug, category]) => [slug, { kind: 'project', slug, category }] as const),
]);

export const ROOT_SLUGS = [...ROOT_PAGES.keys()];

/** Params arrive percent-encoded for non-ASCII slugs (m²), so decode first. */
export function rootPage(slug: string): RootPage | undefined {
  return ROOT_PAGES.get(decodeURIComponent(slug));
}

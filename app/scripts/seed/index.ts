/**
 * Fills Sanity with the site's current content: every page, project, blog
 * post, form and setting, plus all images. Reviews come from Google instead
 * (see src/lib/google-reviews.ts); only the Google-koppeling settings are seeded.
 *
 *   npm run seed              create what is missing, leave existing documents alone
 *   npm run seed -- --force   overwrite every seeded document (discards studio edits!)
 *   npm run seed -- --reset   like --force, then delete the old documents whose id
 *                             contains a dot (private in Sanity), e.g. page.privacy-policy
 *   npm run seed:dry          no Sanity at all: writes the dataset to
 *                             scripts/seed/dataset.ndjson for `npm run check:queries`
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (Editor) in
 * app/.env, except for --dry. Form settings are never overwritten: they may
 * hold mail credentials entered in the studio.
 */
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { BLOG_POSTS } from './content/blog';
import {
  HERO,
  PATHS,
  PROJECTS as HOME_TILES,
  SERVICES,
  STEPS,
  ZAKELIJK_PHOTOS,
  ZAKELIJK_POINTS,
  ZAKELIJK_STATS,
} from './content/home';
import { getLocalPage } from './content/local';
import { PRIVACY } from './content/privacy';
import { PROJECTS, ZAKELIJK_CARDS, getProject } from './content/projects';
import { LOCAL_SLUGS, SERVICE_SLUGS } from './content/routes';
import { SERVICE_PAGES } from './content/services';
import { PLACES, type HeroContent, type ServicePage } from './content/types';
import {
  HUB_AUDIENCES,
  HUB_FAQ,
  HUB_HERO,
  HUB_SERVICES,
  HUB_STATS,
  HUB_STEPS,
  HUB_TRUST,
} from './content/zakelijk-hub';
import { ZAKELIJK_PAGES } from './content/zakelijk-pages';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(DIR, 'images');
const DRY = process.argv.includes('--dry');
const RESET = process.argv.includes('--reset');
const FORCE = RESET || process.argv.includes('--force');

type Doc = { _id: string; _type: string; [key: string]: unknown };
const docs: Doc[] = [];
const add = (doc: Doc) => docs.push(doc);

// --- Helpers -----------------------------------------------------------------

const ASSET = '__asset__:';
const usedImages = new Set<string>();

/** `/images/foo.jpg` or `foo.jpg` -> image field; resolved to an asset on upload. */
function image(file: string, alt = '') {
  const name = path.basename(file);
  if (!existsSync(path.join(IMAGES_DIR, name))) throw new Error(`Missing image ${name}`);
  usedImages.add(name);
  return { _type: 'image', asset: { _type: 'reference', _ref: ASSET + name }, alt };
}

const ref = (id: string) => ({ _type: 'reference', _ref: id });
const internal = (label: string | undefined, id: string) => ({
  _type: 'link',
  label,
  linkType: 'internal',
  internalLink: ref(id),
});
/** A menu item with a submenu: expands on click, so its own link is only a fallback. */
const navItem = (link: ReturnType<typeof internal> | ReturnType<typeof external>, children: unknown[] = []) => ({
  ...link,
  _type: 'navItem',
  children,
});
const external = (label: string | undefined, href: string) => ({
  _type: 'link',
  label,
  linkType: 'external',
  href,
});

function block(text: string, style = 'normal', extra: Record<string, unknown> = {}) {
  return {
    _type: 'block',
    style,
    markDefs: [],
    children: [{ _type: 'span', text, marks: [] }],
    ...extra,
  };
}

/** Deterministic, id-safe version of a slug (one post has "m²" in it). */
const idSafe = (slug: string) =>
  /^[a-z0-9-]+$/.test(slug)
    ? slug
    : `${slug.replace(/[^a-z0-9-]/g, '')}-${createHash('sha1').update(slug).digest('hex').slice(0, 6)}`;

const slug = (current: string) => ({ _type: 'slug', current });

/** Maps an old in-code href to a studio link. */
function linkTo(label: string, href: string) {
  const fixed: Record<string, string> = {
    '/projecten/': 'projectsPage',
    '/zakelijk/': 'zakelijkPage',
    '/zakelijk/projecten/': 'zakelijkProjectsPage',
    '/contact/': 'contactPage',
    '/reviews/': 'reviewsPage',
    '/blog/': 'blogPage',
  };
  const normalised = href.endsWith('/') || href.includes('#') ? href : `${href}/`;
  if (fixed[normalised]) return internal(label, fixed[normalised]);
  const zakelijk = normalised.match(/^\/zakelijk\/([a-z-]+)\/$/);
  if (zakelijk) return internal(label, `zakelijk.${zakelijk[1]}`);
  const service = normalised.match(/^\/([a-z-]+)\/$/);
  if (service && (SERVICE_SLUGS as readonly string[]).includes(service[1])) {
    return internal(label, `service.${service[1]}`);
  }
  return external(label, href);
}

const hero = (content: HeroContent) => ({
  kicker: content.kicker,
  titleBefore: content.title[0] || undefined,
  titleHighlight: content.title[1],
  titleAfter: content.title[2] || undefined,
  lead: content.lead,
  primaryCta: content.cta ? linkTo(content.cta.label, content.cta.href) : undefined,
  usps: content.usps,
  image: image(content.images[0], content.title.join('')),
  imageSmall: image(content.images[1]),
  badge: content.badge,
});

const DEFAULT_CTA_TEXT =
  'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.';

// --- Forms ---------------------------------------------------------------------

const field = (props: Record<string, unknown>) => ({ _type: 'formField', width: 'full', ...props });

const REQUESTER_PARTICULIER = [
  'Ik ben particulier',
  'Ik vraag aan namens een VvE of beheerder',
  'Ik vraag aan namens een bedrijf',
];
const SERVICE_OPTIONS = [
  'Sierbestrating',
  'Schuttingbouw',
  'Tuinaanleg',
  'Terrasreiniging',
  'Groter zakelijk project',
];

/**
 * All four carry the design's heading "Offerte aanvragen" (the form creator
 * uses the title as heading); the mail subject says which one was used.
 */
function offerteForm(id: string, variant: string, fields: Record<string, unknown>[]) {
  add({
    _id: id,
    _type: 'form',
    title: 'Offerte aanvragen',
    showTitle: true,
    mode: 'simple',
    fields: fields.map(field),
    submitButtonText: 'Verstuur aanvraag',
    successTitle: 'Bedankt voor uw aanvraag',
    successBody: 'We reageren doorgaans binnen één werkdag.',
    redirectAfterSubmit: false,
    mailSubject: `Nieuwe offerteaanvraag (${variant})`,
    mailMessage: 'Er is een nieuwe aanvraag binnengekomen via de website.',
    sendCopyToSubmitter: false,
  });
}

const nameAndPhone = [
  { label: 'Naam', name: 'name', type: 'text', width: 'half', placeholder: 'Naam', isRequired: true },
  { label: 'Telefoonnummer', name: 'phone', type: 'tel', width: 'half', placeholder: 'Telefoonnummer' },
  { label: 'E-mailadres', name: 'email', type: 'email', placeholder: 'E-mailadres', isRequired: true },
];
const hiddenContext = [
  { label: 'Dienst', name: 'service', type: 'hidden', defaultValue: '{{service}}' },
  { label: 'Verstuurd vanaf', name: 'page', type: 'hidden', defaultValue: '{{path}}' },
];
const message = (placeholder: string) => ({
  label: 'Omschrijving',
  name: 'message',
  type: 'textarea',
  placeholder,
});

offerteForm('form.offerte', 'standaard', [
  ...nameAndPhone,
  { label: 'Ik ben', name: 'requesterType', type: 'select', selectOptions: REQUESTER_PARTICULIER },
  message('Vertel kort over uw situatie'),
  ...hiddenContext,
]);
offerteForm('form.offerte-dienstkeuze', 'homepage', [
  ...nameAndPhone,
  { label: 'Ik ben', name: 'requesterType', type: 'select', selectOptions: REQUESTER_PARTICULIER },
  {
    label: 'Waar gaat het om?',
    name: 'service',
    type: 'select',
    placeholder: 'Waar gaat het om?',
    selectOptions: SERVICE_OPTIONS,
  },
  message('Korte omschrijving van het werk'),
  hiddenContext[1],
]);
offerteForm('form.offerte-zakelijk', 'zakelijk', [
  ...nameAndPhone,
  {
    label: 'Ik ben',
    name: 'requesterType',
    type: 'select',
    selectOptions: [REQUESTER_PARTICULIER[1], REQUESTER_PARTICULIER[2], REQUESTER_PARTICULIER[0]],
  },
  message('Vertel kort over het project'),
  ...hiddenContext,
]);
offerteForm('form.contact', 'contactpagina', [
  {
    label: 'Ik ben',
    name: 'requesterType',
    type: 'select',
    selectOptions: ['Particulier', 'VvE of vastgoedbeheerder', 'Bedrijf of instelling'],
  },
  ...nameAndPhone,
  {
    label: 'Waar gaat het om?',
    name: 'service',
    type: 'select',
    placeholder: 'Waar gaat het om?',
    selectOptions: SERVICE_OPTIONS,
  },
  message('Vertel kort over uw situatie of project'),
  hiddenContext[1],
]);

const ZAKELIJK_FORM = ref('form.offerte-zakelijk');

// --- Settings ------------------------------------------------------------------

const SITE_NAME = 'L. Schuijt Klussenbedrijf';

add({
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: SITE_NAME,
  description:
    "Klussenbedrijf gespecialiseerd in sierbestrating, schuttingbouw en tuinaanleg. Voor particulieren, VvE's en bedrijven in Noord-Holland.",
  logo: image('logo.png', SITE_NAME),
  language: 'nl',
  phone: '06 46 87 49 92',
  email: 'info@schuijtklussenbedrijf.nl',
  address: ['Heemskerk'],
  addressCountry: 'NL',
  places: PLACES,
  googleReviewUrl: 'https://www.google.com/search?q=L.+Schuijt+Klussenbedrijf+Heemskerk+reviews',
});

add({
  _id: 'navigation',
  _type: 'navigation',
  links: [
    navItem(
      external('Diensten', '/#diensten'),
      SERVICE_SLUGS.map((s) => internal(SERVICE_PAGES[s].crumb, `service.${s}`)),
    ),
    navItem(internal('Projecten', 'projectsPage')),
    navItem(internal('Zakelijk', 'zakelijkPage'), [
      internal('Algemeen', 'zakelijkPage'),
      internal('VvE', 'zakelijk.vve-vastgoedbeheer'),
      internal('Woningcorporaties', 'zakelijk.woningcorporaties'),
    ]),
    navItem(internal('Reviews', 'reviewsPage')),
    navItem(internal('Blog', 'blogPage')),
    navItem(internal('Contact', 'contactPage')),
  ],
  ctaLabel: 'Offerte aanvragen',
  menuOpen: 'Menu openen',
  menuClose: 'Menu sluiten',
});

add({
  _id: 'footer',
  _type: 'footer',
  groups: [
    {
      title: 'Diensten',
      links: ['sierbestrating', 'schuttingbouw', 'tuinaanleg', 'terrasreiniging'].map((s) =>
        internal(SERVICE_PAGES[s as keyof typeof SERVICE_PAGES].crumb, `service.${s}`),
      ),
    },
    {
      title: 'Zakelijk',
      links: [
        internal('VvE & vastgoedbeheer', 'zakelijk.vve-vastgoedbeheer'),
        internal('Woningcorporaties', 'zakelijk.woningcorporaties'),
        internal('Bedrijven & instellingen', 'zakelijkPage'),
        internal('Zakelijke projecten', 'zakelijkProjectsPage'),
      ],
    },
  ],
  contactTitle: 'Contact',
  legalText: 'KvK-nummer · Algemene voorwaarden',
  legalLinks: [internal('Privacyverklaring', 'page.privacy-policy')],
});

add({
  _id: 'uiText',
  _type: 'uiText',
  breadcrumbHome: 'Home',
  breadcrumbServices: external('Diensten', '/#diensten'),
  heroPrimaryCta: 'Vraag vrijblijvend een offerte aan',
  callPrefix: 'Bel',
  ctaKicker: 'Contact',
  ctaText: DEFAULT_CTA_TEXT,
  starsLabel: '{score} van 5 sterren',
  viewProject: 'Bekijk dit project',
  reviewReadMore: 'Lees meer',
  reviewClose: 'Sluiten',
  formNote: 'We reageren doorgaans binnen één werkdag.',
  formSending: 'Versturen…',
  formError: 'Versturen is mislukt. Probeer het later opnieuw.',
  formRecaptchaMissing: 'Bevestig dat u geen robot bent.',
  formStep: 'Stap {n} van {totaal}',
  projectKickerParticulier: 'Particulier project',
  projectKickerZakelijk: 'Zakelijk project',
  projectAbout: 'Over dit project',
  projectWorks: 'Uitgevoerde werkzaamheden',
  projectGalleryKicker: 'In beeld',
  projectGalleryTitle: 'Foto’s van dit project',
  projectRelatedLabel: 'Gerelateerde dienst',
  projectRelatedButton: 'Bekijk de dienst',
  projectCtaParticulier: 'Ook zo’n tuin in gedachten?',
  projectCtaZakelijk: 'Vergelijkbaar project bij uw VvE of complex?',
  blogAuthorInitials: 'LS',
  blogCtaTitle: 'Benieuwd naar de prijs voor uw eigen project?',
  blogCtaText: 'We komen vrijblijvend langs en geven een offerte met vaste prijs.',
  blogCtaButton: 'Offerte aanvragen',
  blogRelatedKicker: 'Verder lezen',
  blogRelatedTitle: 'Gerelateerde artikelen',
  notFoundKicker: '404',
  notFoundTitle: 'Deze pagina bestaat niet',
  notFoundText:
    'De link is verlopen, verplaatst of heeft nooit bestaan. Ga terug naar de homepage of neem contact met ons op.',
  notFoundButton: 'Terug naar home',
});

// --- Service pages -------------------------------------------------------------

function servicePage(
  id: string,
  kind: 'dienst' | 'lokaal' | 'zakelijk',
  pageSlug: string,
  page: ServicePage,
  extra: Record<string, unknown> = {},
) {
  add({
    _id: id,
    _type: 'servicePage',
    kind,
    title: page.metaTitle,
    slug: slug(pageSlug),
    breadcrumb: page.crumb !== page.metaTitle ? page.crumb : undefined,
    hero: hero(page.hero),
    nearby: page.nearby ? { kicker: 'Werkgebied', ...page.nearby } : undefined,
    types: {
      head: { kicker: page.types.kicker, title: page.types.title, lead: page.types.lead },
      items: page.types.items.map((item) => ({
        _type: 'card',
        image: image(item.image, item.title),
        title: item.title,
        text: item.text,
      })),
    },
    werkwijze: { kicker: 'Werkwijze', ...page.werkwijze },
    materials: {
      kicker: page.materials.kicker,
      title: page.materials.title,
      text: page.materials.text,
      points: page.materials.points,
      ctaLabel: page.materials.cta,
      photos: page.materials.photos.map((photo) => image(photo)),
    },
    projects: {
      head: { kicker: page.projects.kicker, title: page.projects.title, lead: page.projects.lead },
      tiles: page.projects.items.map((tile) => ({
        _type: 'photoTile',
        image: image(tile.image, tile.title),
        title: tile.title,
        text: tile.text,
        size: tile.size ?? 'normal',
      })),
      link: page.projects.link ? linkTo(page.projects.link.label, page.projects.link.href) : undefined,
    },
    faq: page.faq,
    cta: {
      title: page.cta.title,
      text: page.cta.text !== DEFAULT_CTA_TEXT ? page.cta.text : undefined,
      messagePlaceholder: page.cta.messagePlaceholder,
      form: kind === 'zakelijk' ? ZAKELIJK_FORM : undefined,
    },
    seo: { description: page.metaDescription },
    ...extra,
  });
}

for (const s of SERVICE_SLUGS) servicePage(`service.${s}`, 'dienst', s, SERVICE_PAGES[s]);

for (const s of LOCAL_SLUGS) {
  const { page, crumbs } = getLocalPage(s);
  const base = crumbs[1].href!.replaceAll('/', '');
  servicePage(`local.${s}`, 'lokaal', s, page, { parent: ref(`service.${base}`) });
}

for (const [s, page] of Object.entries(ZAKELIJK_PAGES)) {
  servicePage(`zakelijk.${s}`, 'zakelijk', s, page as ServicePage);
}

// --- Categories, projects ------------------------------------------------------

const CATEGORIES = [
  ['sierbestrating', 'Sierbestrating', 'service.sierbestrating'],
  ['schuttingbouw', 'Schuttingbouw', 'service.schuttingbouw'],
  ['tuinaanleg', 'Tuinaanleg', 'service.tuinaanleg'],
  ['terrasreiniging', 'Terrasreiniging', 'service.terrasreiniging'],
  ['zakelijk', 'Zakelijk', 'zakelijk.vve-vastgoedbeheer'],
] as const;

CATEGORIES.forEach(([id, title, related], index) =>
  add({
    _id: `category.${id}`,
    _type: 'category',
    title,
    isZakelijk: id === 'zakelijk',
    relatedPage: ref(related),
    order: index + 1,
  }),
);

const cards = new Map(ZAKELIJK_CARDS.map((card) => [card.href, card]));

for (const summary of PROJECTS) {
  const project = getProject(summary.slug);
  const card = cards.get(summary.href);
  add({
    _id: `project.${idSafe(summary.slug)}`,
    _type: 'project',
    title: project.title,
    slug: slug(summary.slug),
    date: summary.date,
    category: ref(`category.${summary.category}`),
    image: image(project.image, project.title),
    subline: project.subline,
    meta: project.meta,
    intro: project.intro.map((text) => block(text)),
    works: project.works,
    gallery: project.gallery.map((item) => ({ image: image(item.image), wide: Boolean(item.wide) })),
    ...(card
      ? {
          cardTag: card.tag,
          cardTitle: card.title,
          cardText: card.text,
          cardImage: image(card.photo, card.title),
          cardStats: card.stats,
        }
      : {}),
    seo: { description: project.subline },
  });
}

// --- Blog, reviews, text pages -------------------------------------------------

const blogId = (s: string) => `blog.${String(BLOG_POSTS.findIndex((p) => p.slug === s) + 1).padStart(2, '0')}-${s}`;

for (const post of BLOG_POSTS) {
  add({
    _id: blogId(post.slug),
    _type: 'blogPost',
    title: post.title,
    slug: slug(post.slug),
    category: ref(`category.${post.category}`),
    date: post.date ? '2026-09-24' : undefined,
    readTime: post.readTime,
    featured: post === BLOG_POSTS[0],
    image: image(post.image),
    excerpt: post.excerpt,
    body: (post.body ?? [{ type: 'p' as const, text: post.excerpt }]).flatMap((b): unknown[] => {
      switch (b.type) {
        case 'p':
          return [block(b.text)];
        case 'h2':
          return [block(b.text, 'h2')];
        case 'ul':
          return b.items.map((item) => block(item, 'normal', { listItem: 'bullet', level: 1 }));
        case 'callout':
          return [{ _type: 'callout', title: b.title, text: b.text }];
      }
    }),
    ctaTitle: post.ctaTitle,
    related: post.related?.map((s) => ref(blogId(s))),
    seo: { description: post.excerpt },
  });
}

add({
  _id: 'page.privacy-policy',
  _type: 'textPage',
  title: 'Privacyverklaring',
  slug: slug('privacy-policy'),
  body: [
    ...PRIVACY.map((b) => block(b.text, b.type === 'p' ? 'normal' : b.type)),
    {
      _type: 'block',
      style: 'normal',
      markDefs: [
        { _key: 'contact', _type: 'link', href: '/contact/' },
        { _key: 'google', _type: 'link', href: 'https://policies.google.com/technologies/partner-sites' },
      ],
      children: [
        { _type: 'span', marks: [], text: 'Op regelmatige basis controleren we of er aan dit privacybeleid voldaan wordt. Bij vragen over ons privacybeleid kun je ' },
        { _type: 'span', marks: ['contact'], text: 'contact met ons opnemen' },
        { _type: 'span', marks: [], text: '. Meer informatie over hoe Google gegevens gebruikt van sites of apps? ' },
        { _type: 'span', marks: ['google'], text: 'Klik hier' },
        { _type: 'span', marks: [], text: '.' },
      ],
    },
  ],
});

// --- Page singletons -----------------------------------------------------------

add({
  _id: 'homePage',
  _type: 'homePage',
  hero: hero(HERO),
  paths: PATHS.map((p) => ({
    image: image(p.image),
    tag: p.tag,
    title: p.title,
    text: p.text,
    link: linkTo(p.cta, p.href),
  })),
  services: {
    head: {
      kicker: 'Diensten',
      title: 'Alles voor de buitenkant van uw woning',
      lead: 'Vier specialismen die we dagelijks uitvoeren, los te bestellen of als één compleet project.',
    },
    cards: SERVICES.map((s) => ({
      _type: 'card',
      image: image(s.image, s.title),
      title: s.title,
      text: s.text,
      link: linkTo('Meer hierover', s.href),
    })),
  },
  werkwijze: {
    kicker: 'Werkwijze',
    title: 'Van eerste gesprek tot opgeleverd werk',
    lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
    steps: STEPS,
  },
  zakelijk: {
    kicker: 'Zakelijk',
    title: "Ook voor VvE's, vastgoedbeheerders en bedrijven",
    text: 'Grotere oppervlaktes vragen om planning en om oog voor de mensen die er wonen of werken. Wij voeren uit terwijl uw complex of terrein gewoon in gebruik blijft.',
    points: ZAKELIJK_POINTS,
    stats: ZAKELIJK_STATS,
    primaryCta: external('Zakelijke aanvraag doen', '#contact'),
    secondaryCta: internal('Bekijk de projecten', 'zakelijkProjectsPage'),
    photos: ZAKELIJK_PHOTOS.map((photo) => image(photo)),
  },
  projects: {
    head: {
      kicker: 'Projecten',
      title: 'Recent opgeleverd werk',
      lead: 'Een greep uit de tuinen, terrassen en terreinen die we de afgelopen periode hebben aangepakt.',
    },
    tiles: HOME_TILES.map((tile) => ({
      _type: 'photoTile',
      image: image(tile.image, tile.title),
      title: tile.title,
      text: tile.text,
      size: tile.size ?? 'normal',
    })),
  },
  reviews: {
    // No picks: the section shows the three newest synced Google reviews.
    head: { kicker: 'Reviews', title: 'Wat klanten over ons zeggen' },
  },
  werkgebied: {
    kicker: 'Werkgebied',
    title: 'Actief in Heemskerk en de hele regio',
    text: 'Particuliere klussen doen we binnen ongeveer 25 kilometer rond Heemskerk. Voor grotere zakelijke projecten rijden we verder door Noord-Holland.',
    image: image('zakelijk-terrein.jpg', 'Werkgebied rond Heemskerk'),
  },
  cta: { title: 'Benieuwd wat uw project kost?', form: ref('form.offerte-dienstkeuze') },
  seo: {
    title: `${SITE_NAME} — Sierbestrating, schuttingbouw en tuinaanleg`,
    description: HERO.lead,
  },
});

add({
  _id: 'zakelijkPage',
  _type: 'zakelijkPage',
  title: 'Zakelijk',
  hero: hero(HUB_HERO),
  stats: HUB_STATS,
  audiences: {
    head: {
      kicker: 'Voor wie',
      title: 'Voor beheerders en organisaties die grip willen houden op hun buitenruimte',
      lead: 'Of het nu gaat om een gezamenlijke tuin, een straat vol stoepen of een bedrijfsterrein: wij denken mee over de uitvoering én over de mensen die er dagelijks gebruik van maken.',
    },
    cards: HUB_AUDIENCES.map((a) => ({
      _type: 'card',
      image: image(a.image, a.title),
      title: a.title,
      text: a.text,
      link: linkTo(a.link.label, a.link.href),
    })),
  },
  services: {
    head: { kicker: 'Wat we doen', title: 'Zes soorten werk, van losse klus tot terugkerend onderhoud' },
    items: HUB_SERVICES,
  },
  werkwijze: { kicker: 'Werkwijze', title: 'Hoe een project met ons verloopt', steps: HUB_STEPS },
  projects: {
    head: { kicker: 'Recent opgeleverd', title: 'Twee zakelijke projecten' },
    items: ZAKELIJK_CARDS.map((card) => ref(`project.${card.href.replaceAll('/', '')}`)),
    link: internal('Bekijk alle zakelijke projecten', 'zakelijkProjectsPage'),
  },
  trust: HUB_TRUST.map((t) => ({ ...t })),
  faq: HUB_FAQ,
  cta: {
    title: 'Een vergelijkbaar project in gedachten?',
    messagePlaceholder: 'Vertel kort over het project (locatie, oppervlakte, planning)',
    form: ZAKELIJK_FORM,
  },
  seo: { description: HUB_HERO.lead },
});

add({
  _id: 'projectsPage',
  _type: 'projectsPage',
  title: 'Projecten',
  intro: {
    kicker: 'Projecten',
    title: 'Ons werk in beeld',
    text: 'Een overzicht van tuinen, terrassen, schuttingen en opritten die we de afgelopen periode hebben aangepakt.',
  },
  filterAll: 'Alle projecten',
  cta: { title: 'Zelf een project in gedachten?' },
});

add({
  _id: 'zakelijkProjectsPage',
  _type: 'zakelijkProjectsPage',
  title: 'Zakelijke projecten',
  breadcrumb: 'Projecten',
  intro: {
    kicker: 'Zakelijke projecten',
    title: 'Ons zakelijke werk in beeld',
    text: 'Van herbestrating bij een VvE tot de aanleg van een compleet parkeerterrein. Een overzicht van de zakelijke projecten die we hebben opgeleverd.',
  },
  filterAll: 'Alle projecten',
  soonTitle: 'Meer zakelijke projecten volgen',
  soonText:
    'Momenteel zijn dit onze twee actieve VvE-projecten. Zodra er werk voor woningcorporaties of bedrijven wordt opgeleverd, komt dat hier bij te staan.',
  cta: {
    title: 'Zelf een zakelijk project in gedachten?',
    messagePlaceholder: 'Vertel kort over het project',
    form: ZAKELIJK_FORM,
  },
});

add({
  _id: 'reviewsPage',
  _type: 'reviewsPage',
  title: 'Reviews',
  intro: {
    kicker: 'Reviews',
    title: 'Wat klanten over ons zeggen',
    text: "Van particuliere tuinen tot zakelijke projecten voor VvE's en bedrijven: dit vinden onze klanten van het resultaat.",
  },
  scoreCaption: 'Gebaseerd op {aantal} Google Reviews',
  googleLabel: 'Google Reviews',
  leave: {
    kicker: 'Uw ervaring',
    title: 'Tevreden over ons werk?',
    text: 'We vinden het fijn om te horen hoe we het gedaan hebben. Een review op Google helpt andere klanten in Heemskerk en omstreken bij hun keuze.',
    button: 'Schrijf een Google Review',
  },
  cta: { title: 'Benieuwd wat uw project kost?' },
});

add({
  _id: 'blogPage',
  _type: 'blogPage',
  title: 'Blog',
  intro: {
    kicker: 'Blog',
    title: 'Tips, uitleg en inspiratie',
    text: "Praktische artikelen over bestrating, schuttingen, tuinaanleg en onderhoud, voor particulieren en voor VvE's en bedrijven.",
  },
  filterAll: 'Alle artikelen',
  readMore: 'Lees het artikel',
  cta: { title: 'Vraag over uw eigen project?' },
});

add({
  _id: 'contactPage',
  _type: 'contactPage',
  title: 'Contact',
  intro: {
    kicker: 'Contact',
    title: 'Laten we uw project bespreken',
    text: 'Particulier, VvE of bedrijf: vul het formulier in of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
  },
  badges: ['Reactie binnen 1 werkdag', 'Vrijblijvende schouw', 'Particulier én zakelijk welkom'],
  infoCards: [
    { icon: 'phone', title: 'Bellen', text: 'Het snelste antwoord, ook voor spoed.', show: 'phone' },
    { icon: 'mail', title: 'E-mailen', text: 'Voor uitgebreide vragen of bijlagen.', show: 'email' },
    { icon: 'pin', title: 'Werkgebied', text: 'Heemskerk en omstreken, zakelijk verder door Noord-Holland.', show: 'none' },
  ],
  hours: {
    title: 'Bereikbaarheid',
    rows: [
      { day: 'Maandag – vrijdag', time: '08:00 – 17:00' },
      { day: 'Zaterdag', time: 'Op afspraak' },
      { day: 'Zondag', time: 'Gesloten' },
    ],
  },
  form: ref('form.contact'),
  formLead: 'Vul het formulier in, we reageren doorgaans binnen één werkdag.',
  werkgebied: {
    kicker: 'Werkgebied',
    title: 'Actief in Heemskerk en de hele regio',
    text: 'Particuliere klussen doen we binnen ongeveer 25 kilometer rond Heemskerk. Voor zakelijke projecten rijden we verder door Noord-Holland.',
  },
  faq: {
    kicker: 'Veelgestelde vragen',
    title: 'Over het aanvragen van een offerte',
    items: [
      { question: 'Hoe snel krijg ik een reactie?', answer: 'We reageren doorgaans binnen één werkdag, per telefoon of e-mail, om een afspraak voor een vrijblijvende schouw in te plannen.', open: true },
      { question: 'Is de offerte echt vrijblijvend?', answer: 'Ja. We komen langs, bekijken de situatie en sturen daarna een offerte met vaste prijs. Daar zit geen verplichting aan vast.' },
      { question: 'Kan ik ook aanvragen namens een VvE of bedrijf?', answer: 'Zeker, kies dat bij "Ik ben" in het formulier. We vragen dan iets meer informatie zodat we de aanvraag direct goed kunnen inschatten.' },
      { question: 'Werken jullie buiten Heemskerk?', answer: 'Voor particuliere klussen rijden we tot ongeveer 25 kilometer rond Heemskerk. Voor grotere zakelijke projecten kijken we breder in Noord-Holland.' },
    ],
  },
});

/** Created only when missing, and only these keys: it may hold mail secrets. */
/** Never overwritten: the sync writes its score and status into it. Place ID still to fill in. */
const GOOGLE_REVIEWS = {
  _id: 'googleReviews',
  _type: 'googleReviews',
  languageCode: 'nl',
  enabled: true,
};

const FORM_SETTINGS = {
  _id: 'formGeneralSettings',
  _type: 'formGeneralSettings',
  defaultForm: ref('form.offerte'),
  adminEmail: 'info@schuijtklussenbedrijf.nl',
  fromName: SITE_NAME,
  confirmationSubject: 'Nieuwe aanvraag via de website',
  confirmationMessage: 'Er is een nieuwe aanvraag binnengekomen via de website.',
  primaryColor: '#069fdf',
  textColor: '#16202b',
  recaptchaEnabled: false,
};

// --- Finishing ----------------------------------------------------------------

/** Every object in an array needs a stable `_key`; derive it from its position. */
function withKeys(value: unknown, trail = ''): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => {
      const next = withKeys(item, `${trail}.${index}`);
      return next && typeof next === 'object' && !Array.isArray(next) && !('_key' in next)
        ? { _key: createHash('sha1').update(`${trail}.${index}`).digest('hex').slice(0, 12), ...next }
        : next;
    });
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, withKeys(v, `${trail}.${k}`)]),
    );
  }
  return value;
}

/**
 * Sanity treats ids containing a dot as private (unreadable without a token, even
 * in a public dataset), so ids and references use dashes instead: review-1.
 * Asset placeholders keep their dots (file names).
 */
function undot<T>(value: T): T {
  return JSON.parse(JSON.stringify(value), (key, v) =>
    (key === '_id' || key === '_ref') && typeof v === 'string' && !v.startsWith(ASSET) ? v.replaceAll('.', '-') : v,
  );
}

function resolveAssets(value: unknown, assets: Map<string, string>): unknown {
  return JSON.parse(JSON.stringify(value), (_, v) =>
    typeof v === 'string' && v.startsWith(ASSET) ? assets.get(v.slice(ASSET.length)) : v,
  );
}

async function main() {
  const all = [...docs, FORM_SETTINGS, GOOGLE_REVIEWS].map((doc) => undot(withKeys(doc, doc._id)) as Doc);
  const unused = readdirSync(IMAGES_DIR).filter((file) => !usedImages.has(file));
  console.log(`${all.length} documents, ${usedImages.size} images${unused.length ? ` (unused: ${unused.join(', ')})` : ''}`);

  if (DRY) {
    // Fake assets so groq-js can dereference asset->metadata offline.
    const assets = new Map([...usedImages].map((file) => [file, `image-${createHash('sha1').update(file).digest('hex')}-1600x1067-jpg`]));
    const assetDocs = [...assets.values()].map((id) => ({
      _id: id,
      _type: 'sanity.imageAsset',
      metadata: { dimensions: { width: 1600, height: 1067 } },
    }));
    const out = path.join(DIR, 'dataset.ndjson');
    writeFileSync(out, [...assetDocs, ...(resolveAssets(all, assets) as Doc[])].map((d) => JSON.stringify(d)).join('\n'));
    console.log(`Dry run: wrote ${out}`);
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in app/.env');
  }
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-26',
    token,
    useCdn: false,
  });

  console.log('Uploading images…');
  const assets = new Map<string, string>();
  for (const file of usedImages) {
    const existing = await client.fetch<string | null>(
      `*[_type == "sanity.imageAsset" && originalFilename == $file][0]._id`,
      { file },
    );
    assets.set(
      file,
      existing ??
        (await client.assets.upload('image', createReadStream(path.join(IMAGES_DIR, file)), { filename: file }))._id,
    );
    process.stdout.write(existing ? '↻' : '↑');
  }
  console.log('');

  const resolved = resolveAssets(all, assets) as Doc[];
  const tx = client.transaction();
  for (const doc of resolved) {
    if (doc._id === 'formGeneralSettings' || doc._id === 'googleReviews') tx.createIfNotExists(doc);
    else if (FORCE) tx.createOrReplace(doc);
    else tx.createIfNotExists(doc);
  }
  // Form settings hold studio-entered credentials, so only repoint its reference.
  if (RESET) tx.patch('formGeneralSettings', (p) => p.set({ defaultForm: ref('form-offerte') }));
  await tx.commit();

  if (RESET) {
    // The new documents exist now. Sanity refuses to delete a document that is still
    // referenced, so remove them in passes: first those nothing else in the set points to.
    let left = await client.fetch<string[]>(
      `*[count(string::split(_id, ".")) > 1 && !(_type match "sanity.*") && !(_type match "system.*") && !(_id in path("_.**"))]._id`,
    );
    const total = left.length;
    while (left.length) {
      const leaves = await client.fetch<string[]>(
        `*[_id in $ids && count(*[_id in $ids && _id != ^._id && references(^._id)]) == 0]._id`,
        { ids: left },
      );
      if (!leaves.length) throw new Error(`Cannot delete (circular references): ${left.join(', ')}`);
      const del = client.transaction();
      leaves.forEach((id) => del.delete(id));
      await del.commit();
      left = left.filter((id) => !leaves.includes(id));
    }
    console.log(`Deleted ${total} old documents with a dot in their id.`);
  }
  console.log(`Done: ${resolved.length} documents ${FORCE ? 'written' : 'created where missing'}.`);
}

main().catch((error) => {
  console.error('\nSeed failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});

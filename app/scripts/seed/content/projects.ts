import { POST_META } from './wp-posts';
import { PROJECT_POSTS, type ProjectCategory, type ServiceCategory } from './routes';

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  sierbestrating: 'Sierbestrating',
  schuttingbouw: 'Schuttingbouw',
  tuinaanleg: 'Tuinaanleg',
  terrasreiniging: 'Terrasreiniging',
  zakelijk: 'Zakelijk',
};

/**
 * ponytail: stand-in photos per category until each post's own photos are
 * scraped. Projects rotate through their category's pool so the overview
 * doesn't show the same picture a hundred times.
 */
const POOL: Record<ServiceCategory, string[]> = {
  sierbestrating: [
    'sierbestrating-oprit-grind', 'sierbestrating-terras-trap', 'sierbestrating-oprit',
    'sierbestrating-tuinpad', 'sierbestrating-gras', 'sierbestrating-voortuin-plantvak',
    'sierbestrating-terras-kunstgras', 'sierbestrating-oprit-baksteenrand',
  ],
  schuttingbouw: [
    'schutting-schanskorven', 'schutting-stalen-frame', 'schutting-hout-schanskorven',
    'schutting-zwart-gecoat', 'schutting-antraciet-poort', 'schutting-modern-systeem',
    'schutting-kinderkopjes', 'schutting-zwart-gecoat-2',
  ],
  tuinaanleg: [
    'tuin-lounge-terras', 'tuin-pergola-boomstammetjes', 'tuin-complete-aanleg',
    'tuin-gazon-kunstgras', 'tuin-vlonder-pergola', 'tuin-beplanting-borders',
    'tuin-voortuin-zitbank', 'tuin-trampoline',
  ],
  terrasreiniging: [
    'reiniging-grootformaat-terras', 'reiniging-terras-vlonder', 'reiniging-oprit',
    'reiniging-patroonbestrating', 'reiniging-grootformaat-tegels', 'reiniging-relief',
    'reiniging-voor',
  ],
};

const img = (name: string) => `/images/${name}.jpg`;

export type ProjectSummary = {
  slug: string;
  href: string;
  title: string;
  date: string;
  category: ProjectCategory;
  image: string;
};

type ProjectDetail = {
  subline: string;
  meta: { label: string; value: string }[];
  intro: string[];
  works: string[];
  gallery: { image: string; wide?: boolean }[];
};

/** The two zakelijk posts have real content in the designs. */
const ZAKELIJK: Record<string, ProjectDetail & { image: string; card: ZakelijkCardContent }> = {
  'vve-heemskerk-herbestrating-535m2': {
    image: img('vve-heemskerk-herbestrating'),
    subline:
      '535 m² verzakte bestrating rond een appartementencomplex opnieuw op hoogte gebracht, met hergebruik van bestaand materiaal.',
    meta: [
      { label: 'Locatie', value: 'Heemskerk' },
      { label: 'Opdrachtgever', value: 'VvE' },
      { label: 'Oppervlakte', value: '535 m²' },
      { label: 'Uitvoering', value: 'Gefaseerd' },
    ],
    intro: [
      'Rond dit appartementencomplex in Heemskerk was de bestrating op meerdere plekken verzakt en ongelijk geworden. In opdracht van de VvE hebben we de volledige gemeenschappelijke buitenruimte opnieuw bestraat.',
      'Omdat het complex tijdens de werkzaamheden bewoond en bereikbaar moest blijven, is het project in fases uitgevoerd. Waar mogelijk is het bestaande materiaal hergebruikt.',
    ],
    works: [
      'Opbreken en herstellen van de fundering op verzakte plekken',
      'Herbestrating van paden en gemeenschappelijke buitenruimte',
      'Hergebruik van bestaand materiaal waar mogelijk',
      'Gefaseerde uitvoering, complex bleef bereikbaar',
    ],
    gallery: [{ image: img('vve-heemskerk-535m2'), wide: true }, { image: img('vve-heemskerk-herbestrating') }],
    card: {
      tag: 'VvE — Heemskerk',
      title: 'Herbestrating gezamenlijke buitenruimte',
      text: 'Verzakte en ongelijke bestrating rondom een appartementencomplex opnieuw op hoogte gebracht, met hergebruik van het bestaande materiaal.',
      photo: img('vve-heemskerk-535m2'),
      stats: [
        { value: '535 m²', label: 'omvang' },
        { value: 'Gefaseerd', label: 'bewoond complex' },
      ],
    },
  },
  'project-vve-amsterdam-aanleg-parkeerterrein-nieuwbouw': {
    image: img('vve-amsterdam-parkeerterrein'),
    subline:
      'Grastegels en betonklinkers voor een waterdoorlatend parkeerterrein, inclusief grondwerk en voorbereiding voor een laadpaal.',
    meta: [
      { label: 'Locatie', value: 'Amsterdam' },
      { label: 'Opdrachtgever', value: 'VvE' },
      { label: 'Oppervlakte', value: '165 m²' },
      { label: 'Ontwerp', value: 'Waterdoorlatend' },
    ],
    intro: [
      'Grastegels en betonklinkers voor een waterdoorlatend parkeerterrein, inclusief grondwerk en voorbereiding voor een laadpaal.',
    ],
    works: [
      'Grondwerk en fundering',
      'Aanleg van grastegels en betonklinkers',
      'Voorbereiding voor een laadpaal',
    ],
    gallery: [
      { image: img('vve-amsterdam-parkeervakken'), wide: true },
      { image: img('vve-amsterdam-parkeerterrein') },
    ],
    card: {
      tag: 'VvE — Amsterdam',
      title: 'Aanleg parkeerterrein nieuwbouw',
      text: 'Grastegels en betonklinkers voor een waterdoorlatend parkeerterrein, inclusief grondwerk en voorbereiding voor een laadpaal.',
      photo: img('vve-amsterdam-parkeervakken'),
      stats: [
        { value: '165 m²', label: 'omvang' },
        { value: 'Waterdoorlatend', label: 'ontwerp' },
      ],
    },
  },
};

/** ponytail: the particulier example from the design, shown on every particulier post until scraped. */
const PARTICULIER_EXAMPLE: Omit<ProjectDetail, 'gallery'> = {
  subline:
    'Achtertuin in Heemskerk volledig heringericht met sierbestrating, nieuwe schutting en een verdiepte trampoline.',
  meta: [
    { label: 'Locatie', value: 'Heemskerk' },
    { label: 'Type tuin', value: 'Achtertuin' },
    { label: 'Oppervlakte', value: '± 45 m²' },
    { label: 'Doorlooptijd', value: '1 week' },
  ],
  intro: [
    'De achtertuin van deze woning in Heemskerk was toe aan een complete make-over. In overleg met de bewoners kozen we voor grootformaat sierbestrating, een nieuwe houten schutting rondom en een verdiepte trampoline als middelpunt van de tuin.',
    'Door de trampoline verdiept te plaatsen blijft de tuin overzichtelijk en veilig voor de kinderen, zonder dat het speeltoestel het beeld overheerst. De borders zijn opnieuw ingericht met vaste beplanting.',
  ],
  works: [
    'Grondwerk en voorbereiding voor de verdiepte trampoline',
    'Leggen van grootformaat sierbestrating met opsluitband',
    'Plaatsen van een nieuwe houten schutting rondom de tuin',
    'Aanleg van borders en beplanting',
  ],
};

const categoryOf = new Map(PROJECT_POSTS);
const seen: Partial<Record<ServiceCategory, number>> = {};

/** Every project post, newest first. */
export const PROJECTS: ProjectSummary[] = POST_META.map(([slug, title, date]) => {
  const category = categoryOf.get(slug)!;
  let image: string;
  if (category === 'zakelijk') {
    image = ZAKELIJK[slug].image;
  } else {
    const n = (seen[category] = (seen[category] ?? -1) + 1);
    image = img(POOL[category][n % POOL[category].length]);
  }
  return { slug, href: `/${slug}/`, title, date, category, image };
});

const BY_SLUG = new Map(PROJECTS.map((project) => [project.slug, project]));

export function getProject(slug: string) {
  const summary = BY_SLUG.get(slug)!;
  const { category } = summary;

  if (category === 'zakelijk') {
    return { ...summary, ...ZAKELIJK[slug] };
  }

  const pool = POOL[category];
  const start = pool.indexOf(summary.image.slice('/images/'.length, -'.jpg'.length));
  const pick = (offset: number) => img(pool[(start + offset) % pool.length]);
  return {
    ...summary,
    ...PARTICULIER_EXAMPLE,
    gallery: [
      { image: pick(1), wide: true },
      { image: pick(2) },
      { image: pick(3) },
      { image: pick(4) },
      { image: pick(5), wide: true },
    ],
  };
}

export type ZakelijkCardContent = {
  tag: string;
  title: string;
  text: string;
  photo: string;
  stats: { value: string; label: string }[];
  /** Filter on /zakelijk/projecten/. */
};

export const ZAKELIJK_CARDS = Object.entries(ZAKELIJK).map(([slug, project]) => ({
  href: `/${slug}/`,
  ...project.card,
}));

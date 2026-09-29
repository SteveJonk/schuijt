import type { ServicePage } from './types';
import { PLACES } from './types';
import { SERVICE_PAGES } from './services';
import type { LOCAL_SLUGS, ServiceCategory } from './routes';

type LocalBase = Exclude<ServiceCategory, 'terrasreiniging'>;

const VERB: Record<LocalBase, string> = {
  schuttingbouw: 'geplaatst',
  sierbestrating: 'gelegd',
  tuinaanleg: 'aangelegd',
};

const LABEL: Record<LocalBase, string> = {
  schuttingbouw: 'Schuttingbouw',
  sierbestrating: 'Sierbestrating',
  tuinaanleg: 'Tuinaanleg',
};

/**
 * Builds a local landing page from its service, the way the
 * "Schuttingbouw in Heemskerk" design does. ponytail: placeholder copy until
 * the WordPress content is scraped in; swap for real per-page content then.
 */
function localPage(base: LocalBase, topic: string, place: string): ServicePage {
  const service = SERVICE_PAGES[base];
  const lower = topic.toLowerCase();

  return {
    ...service,
    metaTitle: `${topic} in ${place}`,
    metaDescription: `Op zoek naar ${lower} in ${place}? Wij zijn actief in ${place} en de wijken eromheen, met een vaste prijs vooraf en een nette oplevering.`,
    crumb: place,
    hero: {
      ...service.hero,
      kicker: `${topic} in ${place}`,
      title: [`${topic} in `, place, `, vakkundig ${VERB[base]}`],
      lead: `Op zoek naar ${lower} in ${place}? Wij zijn actief in ${place} en de wijken eromheen, met een vaste prijs vooraf en een nette oplevering.`,
      usps: [`Actief in ${place} en omstreken`, service.hero.usps[1], 'Ook grotere/zakelijke projecten'],
      badge: { value: place, label: 'En de wijken eromheen' },
    },
    nearby: {
      title: `Ook actief rond ${place}`,
      text: `Naast ${place} zelf rijden we ook naar de omliggende plaatsen voor ${lower}.`,
      places: PLACES.filter((p) => p !== place).slice(0, 5),
    },
    projects: { ...service.projects, title: `${service.projects.title} in de regio` },
    faq: {
      ...service.faq,
      items: [
        {
          question: `Werken jullie ook in ${place}?`,
          answer: `Ja, ${place} en de omliggende wijken horen bij ons vaste werkgebied. We komen er regelmatig voor ${lower} en andere klussen.`,
          open: true,
        },
        ...service.faq.items,
      ],
    },
    cta: { ...service.cta, title: `Benieuwd wat ${lower} in ${place} kost?` },
  };
}

const LOCAL: Record<(typeof LOCAL_SLUGS)[number], [LocalBase, string, string]> = {
  'sierbestrating-noord-holland': ['sierbestrating', 'Sierbestrating', 'Noord-Holland'],
  'sierbestrating-alkmaar': ['sierbestrating', 'Sierbestrating', 'Alkmaar'],
  'tuinaanleg-noord-holland-creeer-een-groene-oase-met-schuijt-klussenbedrijf': ['tuinaanleg', 'Tuinaanleg', 'Noord-Holland'],
  'schutting-plaatsen-castricum': ['schuttingbouw', 'Schutting plaatsen', 'Castricum'],
  'schutting-plaatsen-in-heemskerk': ['schuttingbouw', 'Schutting plaatsen', 'Heemskerk'],
  'schutting-plaatsen-in-beverwijk': ['schuttingbouw', 'Schutting plaatsen', 'Beverwijk'],
  'schutting-plaatsen-in-haarlem': ['schuttingbouw', 'Schutting plaatsen', 'Haarlem'],
  'schutting-plaatsen-in-castricum': ['schuttingbouw', 'Schutting plaatsen', 'Castricum'],
  'houten-schutting-heemskerk': ['schuttingbouw', 'Houten schutting', 'Heemskerk'],
  'houten-schutting-plaatsen-in-beverwijk': ['schuttingbouw', 'Houten schutting plaatsen', 'Beverwijk'],
  'houten-schutting-plaatsen-in-haarlem': ['schuttingbouw', 'Houten schutting plaatsen', 'Haarlem'],
  'houten-schutting-plaatsen-in-castricum': ['schuttingbouw', 'Houten schutting plaatsen', 'Castricum'],
  'schutting-laten-plaatsen-in-beverwijk': ['schuttingbouw', 'Schutting laten plaatsen', 'Beverwijk'],
  'schutting-laten-plaatsen-in-castricum': ['schuttingbouw', 'Schutting laten plaatsen', 'Castricum'],
  'schutting-laten-plaatsen-in-haarlem': ['schuttingbouw', 'Schutting laten plaatsen', 'Haarlem'],
  'schutting-laten-plaatsen-in-heemskerk': ['schuttingbouw', 'Schutting laten plaatsen', 'Heemskerk'],
  'hout-beton-schutting-plaatsen-in-heemskerk': ['schuttingbouw', 'Hout-beton schutting plaatsen', 'Heemskerk'],
  'hout-beton-schutting-plaatsen-in-beverwijk': ['schuttingbouw', 'Hout-beton schutting plaatsen', 'Beverwijk'],
  'hout-beton-schutting-plaatsen-in-haarlem': ['schuttingbouw', 'Hout-beton schutting plaatsen', 'Haarlem'],
  'hout-beton-schutting-plaatsen-in-castricum': ['schuttingbouw', 'Hout-beton schutting plaatsen', 'Castricum'],
  'betonschutting-plaatsen-in-beverwijk': ['schuttingbouw', 'Betonschutting plaatsen', 'Beverwijk'],
  'betonschutting-plaatsen-in-heemskerk': ['schuttingbouw', 'Betonschutting plaatsen', 'Heemskerk'],
  'betonschutting-plaatsen-in-haarlem': ['schuttingbouw', 'Betonschutting plaatsen', 'Haarlem'],
  'betonschutting-plaatsen-in-castricum': ['schuttingbouw', 'Betonschutting plaatsen', 'Castricum'],
};

export function getLocalPage(slug: keyof typeof LOCAL) {
  const [base, topic, place] = LOCAL[slug];
  return {
    page: localPage(base, topic, place),
    crumbs: [
      { label: 'Diensten', href: '/#diensten' },
      { label: LABEL[base], href: `/${base}/` },
    ],
  };
}

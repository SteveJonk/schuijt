import type { FaqContent } from './types';
import type { HeroContent } from './types';
import type { Step } from './types';

export const HUB_HERO: HeroContent = {
  kicker: 'Zakelijk',
  title: ['Bestrating en terreinonderhoud voor ', "VvE's", ', beheerders en bedrijven'],
  lead: 'Van herbestrating van gezamenlijke paden tot de aanleg van een compleet parkeerterrein. Eén aanspreekpunt, een duidelijke planning en oog voor de mensen die er wonen of werken.',
  usps: ['Eén vast aanspreekpunt', 'Gefaseerd, bewoond blijft bereikbaar'],
  images: ['/images/vve-amsterdam-parkeerterrein.jpg', '/images/zakelijk-terrein-2.jpg'],
  cta: { label: 'Offerte aanvragen', href: '/contact/' },
};

export const HUB_STATS = [
  { value: '535 m²', label: 'Herbestraat voor een VvE in Heemskerk, met hergebruik van bestaand materiaal' },
  { value: '165 m²', label: 'Parkeerterrein aangelegd voor een VvE in Amsterdam, waterdoorlatend' },
  { value: '2', label: 'Actieve zakelijke projecten, met meer in de pijplijn' },
];

export const HUB_AUDIENCES = [
  {
    image: '/images/vve-heemskerk-herbestrating.jpg',
    title: 'VvE & Vastgoedbeheer',
    text: 'Onderhoud en herbestrating van gezamenlijke buitenruimtes, uitgevoerd terwijl het complex gewoon in gebruik blijft.',
    link: { label: 'Bekijk voor VvE & vastgoedbeheer', href: '/zakelijk/vve-vastgoedbeheer/' },
  },
  {
    image: '/images/voortuinen-nieuwbouw.jpg',
    title: 'Woningcorporaties',
    text: 'Herbestrating van stoepen en paden en groot onderhoud aan de buitenruimte, in overleg gepland rond de bewoners.',
    link: { label: 'Bekijk voor woningcorporaties', href: '/zakelijk/woningcorporaties/' },
  },
  {
    image: '/images/zakelijk-terrein.jpg',
    title: 'Bedrijven & Instellingen',
    text: 'Aanleg en onderhoud van parkeerterreinen, bedrijfsterreinen en de afwatering daarvan.',
    // No /zakelijk/bedrijven-instellingen/ page (yet): point at the form on this page.
    link: { label: 'Vraag een offerte aan', href: '#contact' },
  },
];

export const HUB_SERVICES = [
  'Grotere bestratingsprojecten',
  'Herbestrating van stoepen en paden',
  'Aanleg van parkeerterreinen',
  'Terreinonderhoud',
  'Afwatering',
  'Grotere schuttingprojecten',
];

export const HUB_STEPS: Step[] = [
  { title: 'Eén aanspreekpunt', text: 'U regelt het project met één persoon, van de eerste schouw tot de oplevering.' },
  { title: 'Heldere offerte en planning', text: 'Vooraf een duidelijk plan van aanpak inclusief planning, zodat er geen verrassingen zijn.' },
  { title: 'Rekening met bewoners', text: 'De werkzaamheden zijn zo ingericht dat het complex of bedrijf bereikbaar en in gebruik blijft.' },
  { title: 'Gefaseerd waar nodig', text: 'Bij grotere oppervlaktes werken we in fases, zodat de hinder voor gebruikers beperkt blijft.' },
];

export const HUB_TRUST = [
  {
    icon: 'pin',
    title: 'Werkgebied',
    text: 'Actief in Heemskerk en omstreken, met ruimte om voor zakelijke projecten verder te rijden in Noord-Holland.',
  },
  {
    icon: 'check',
    title: 'Ingeschreven en verzekerd',
    text: 'Ingeschreven bij de KvK en verzekerd voor aansprakelijkheid tijdens de uitvoering van werkzaamheden.',
  },
  {
    icon: 'clock',
    title: 'Van schouw tot oplevering',
    text: 'Eerst een vrijblijvend gesprek ter plaatse, dan een offerte op maat en een planning die past bij uw situatie.',
  },
] as const;

export const HUB_FAQ: FaqContent = {
  kicker: 'Veelgestelde vragen',
  title: 'Vragen die beheerders ons vaak stellen',
  items: [
    {
      question: 'Werken jullie ook via aanbestedingen?',
      answer: 'Op dit moment richten we ons vooral op grotere losse opdrachten en terugkerend werk. Voor formele aanbestedingstrajecten kunt u contact opnemen, dan bespreken we samen wat er nodig is.',
      open: true,
    },
    {
      question: 'Kan de VvE of het bedrijf tijdens de werkzaamheden gewoon in gebruik blijven?',
      answer: 'Ja, we plannen grotere projecten standaard gefaseerd, zodat het complex of terrein bereikbaar blijft voor bewoners of medewerkers.',
    },
    {
      question: 'Wat hebben jullie nodig om een offerte te kunnen maken?',
      answer: 'Een korte omschrijving van het project en het liefst een moment voor een vrijblijvende schouw ter plaatse. Daarna volgt een offerte met vaste prijs.',
    },
    {
      question: 'Doen jullie ook onderhoud, of alleen eenmalige projecten?',
      answer: "Beide. We werken graag toe naar terugkerend onderhoud voor VvE's en bedrijven, naast losse projecten zoals herbestrating of de aanleg van een parkeerterrein.",
    },
  ],
};

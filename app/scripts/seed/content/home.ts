import type { HeroContent } from './types';
import type { Project } from './types';
import type { Step } from './types';

export const HERO: HeroContent = {
  title: ['Vakwerk in ', 'bestrating', ', schuttingen en tuinaanleg'],
  lead: 'Van een compleet nieuwe tuin tot het herbestraten van een heel binnenterrein. Eén aanspreekpunt, een strakke planning en werk dat jarenlang meegaat.',
  usps: ['Vaste prijs vooraf', 'Particulier én zakelijk', 'Nette oplevering'],
  images: ['/images/tuin-verdiepte-trampoline.jpg', '/images/dakterras-kunstgras.jpg'],
  badge: { value: '700 m²', label: 'Zakelijk bestraat in 2026' },
};

export const PATHS = [
  {
    href: '/#diensten',
    image: '/images/particulier-tuin.jpg',
    tag: 'Voor particulieren',
    title: 'Uw tuin, terras of oprit',
    text: 'Sierbestrating, schuttingbouw, complete tuinaanleg en terrasreiniging. Van ontwerp tot de laatste tegel.',
    cta: 'Bekijk de diensten',
  },
  {
    href: '/zakelijk/',
    image: '/images/vve-heemskerk-herbestrating.jpg',
    tag: "Voor VvE's, beheerders en bedrijven",
    title: 'Grotere terreinen en projecten',
    text: 'Herbestrating van paden en stoepen, parkeerterreinen, terreinonderhoud en afwatering.',
    cta: 'Bekijk zakelijke projecten',
  },
];

export const SERVICES = [
  {
    href: '/sierbestrating/',
    image: '/images/voortuin-bergingskast.jpg',
    title: 'Sierbestrating',
    text: 'Terrassen, opritten en paden in keramiek, beton of gebakken klinkers, strak gelegd op een stevige fundering.',
  },
  {
    href: '/schuttingbouw/',
    image: '/images/achtertuin-schutting.jpg',
    title: 'Schuttingbouw',
    text: 'Houten schuttingen, tuinpoorten en bergingen, geplaatst met betonpalen zodat ze recht blijven staan.',
  },
  {
    href: '/tuinaanleg/',
    image: '/images/voortuinen-nieuwbouw.jpg',
    title: 'Tuinaanleg',
    text: 'Van grondwerk en borders tot kunstgras en beplanting. We leggen de hele tuin aan, inclusief afwatering.',
  },
  {
    href: '/terrasreiniging/',
    image: '/images/terrasreiniging-dienst.jpg',
    title: 'Terrasreiniging',
    text: 'Groene aanslag en vuil eraf, voegen bijgewerkt. Uw terras ziet er weer uit als nieuw.',
  },
];

export const STEPS: Step[] = [
  {
    title: 'Vrijblijvend langskomen',
    text: 'We bekijken de situatie ter plaatse en denken mee over materiaal en indeling.',
  },
  {
    title: 'Duidelijke offerte',
    text: 'Een vaste prijs met een specificatie van het werk, zodat er achteraf geen verrassingen zijn.',
  },
  {
    title: 'Vakkundige uitvoering',
    text: 'We werken in één doorlopende planning en houden de werkplek netjes.',
  },
  {
    title: 'Oplevering en nazorg',
    text: 'We lopen het werk samen na en ruimen alles op. Vragen achteraf? We blijven bereikbaar.',
  },
];

export const ZAKELIJK_POINTS = [
  'Herbestrating van stoepen, paden en binnenterreinen',
  'Aanleg en onderhoud van parkeerterreinen',
  'Terreinonderhoud en afwatering',
  'Grotere schuttingprojecten',
];

export const ZAKELIJK_STATS = [
  { value: 535, suffix: ' m²', label: 'Herbestrating voor een VvE in Heemskerk' },
  { value: 165, suffix: ' m²', label: 'Parkeerterrein voor een VvE in Amsterdam' },
];

export const ZAKELIJK_PHOTOS = [
  '/images/vve-amsterdam-parkeerterrein.jpg',
  '/images/zakelijk-terrein.jpg',
  '/images/zakelijk-terrein-2.jpg',
];

export const PROJECTS: Project[] = [
  {
    image: '/images/tuin-verdiepte-trampoline.jpg',
    title: 'Complete tuinaanleg met verdiepte trampoline',
    text: 'Sierbestrating, borders en schutting',
    size: 'wide',
  },
  {
    image: '/images/vve-amsterdam-parkeerterrein.jpg',
    title: 'Parkeerterrein VvE Amsterdam',
    text: '165 m² grastegels en betonklinkers',
    size: 'tall',
  },
  {
    image: '/images/voortuin-bergingskast.jpg',
    title: 'Voortuin met bergingskast',
    text: 'Sierbestrating en plantvakken',
  },
  {
    image: '/images/achtertuin-schutting.jpg',
    title: 'Achtertuin met nieuwe schutting',
    text: 'Schuttingbouw en terrastegels',
  },
  {
    image: '/images/dakterras-kunstgras.jpg',
    title: 'Dakterras met kunstgras',
    text: 'Bestrating, schermen en plantenbakken',
  },
  {
    image: '/images/voortuinen-nieuwbouw.jpg',
    title: 'Voortuinen nieuwbouwwoningen',
    text: 'Bestrating, grind en zitbank',
  },
  {
    image: '/images/vve-heemskerk-herbestrating.jpg',
    title: 'Herbestrating VvE Heemskerk',
    text: '535 m² paden en parkeervakken',
    size: 'wide',
  },
];

export const REVIEWS = [
  {
    text: 'Netjes gewerkt, goede communicatie en precies opgeleverd zoals afgesproken. De tuin ligt er strak bij.',
    initials: 'MV',
    name: 'M. de Vries',
    meta: 'Particulier, Heemskerk',
  },
  {
    text: 'Vooraf duidelijk over de planning en de kosten. Tijdens het werk bleef het terrein gewoon bereikbaar voor de bewoners.',
    initials: 'VE',
    name: 'Bestuur VvE',
    meta: 'Heemskerk',
  },
  {
    text: 'Snelle reactie op de aanvraag en een eerlijke prijs. De schutting staat kaarsrecht en ziet er prachtig uit.',
    initials: 'JB',
    name: 'J. Bakker',
    meta: 'Particulier, Beverwijk',
  },
];

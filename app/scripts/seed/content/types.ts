/** The shapes the seed content was written in (the pre-Sanity component props). */
export type Step = { title: string; text: string };

export type HeroContent = {
  kicker?: string;
  title: [string, string, string];
  lead: string;
  usps: string[];
  images: [string, string];
  badge?: { value: string; label: string };
  cta?: { label: string; href: string };
};

export type Project = { image: string; title: string; text?: string; size?: 'wide' | 'tall' };

export type FaqContent = {
  kicker: string;
  title: string;
  items: { question: string; answer: string; open?: boolean }[];
};

export type PlacesContent = { title: string; text: string; places: string[] };

export type ServicePage = {
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  hero: HeroContent;
  types: { kicker: string; title: string; lead?: string; items: { image: string; title: string; text: string }[] };
  werkwijze: { title: string; lead?: string; steps: Step[] };
  materials: {
    kicker: string;
    title: string;
    text: string;
    points: string[];
    cta: string;
    photos: [string, string, string];
  };
  projects: {
    kicker: string;
    title: string;
    lead?: string;
    items: Project[];
    link?: { label: string; href: string };
  };
  nearby?: PlacesContent;
  faq: FaqContent;
  cta: { title: string; text: string; messagePlaceholder: string };
};

export const PLACES = [
  'Heemskerk',
  'Beverwijk',
  'Castricum',
  'Uitgeest',
  'Limmen',
  'Velsen',
  'Alkmaar',
  'Haarlem',
  'Amsterdam',
];

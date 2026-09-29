export type Review = {
  category: 'particulier' | 'zakelijk';
  text: string;
  initials: string;
  name: string;
  meta: string;
};

/** ponytail: the design's example reviews; replace with the real Google reviews. */
export const REVIEWS: Review[] = [
  { category: 'particulier', text: 'Netjes gewerkt, goede communicatie en precies opgeleverd zoals afgesproken. De tuin ligt er strak bij.', initials: 'MV', name: 'M. de Vries', meta: 'Heemskerk · Tuinaanleg' },
  { category: 'zakelijk', text: 'Vooraf duidelijk over de planning en de kosten. Tijdens het werk bleef het complex gewoon bereikbaar voor de bewoners.', initials: 'VE', name: 'Bestuur VvE', meta: 'Heemskerk · Herbestrating' },
  { category: 'particulier', text: 'Snelle reactie op de aanvraag en een eerlijke prijs. De schutting staat kaarsrecht en ziet er prachtig uit.', initials: 'JB', name: 'J. Bakker', meta: 'Beverwijk · Schuttingbouw' },
  { category: 'particulier', text: 'Het terras zag er weer als nieuw uit na de reiniging. Binnen een paar uur klaar en meteen goed voegwerk erbij gedaan.', initials: 'SK', name: 'S. Kramer', meta: 'Castricum · Terrasreiniging' },
  { category: 'zakelijk', text: 'Duidelijke offerte en het grondwerk voor het parkeerterrein is precies volgens planning uitgevoerd. Goede afstemming vooraf.', initials: 'VA', name: 'VvE Amsterdam', meta: 'Amsterdam · Parkeerterrein' },
  { category: 'particulier', text: 'Vriendelijk, kwam afspraken na en dacht goed mee over de indeling van de tuin. Zeker een aanrader.', initials: 'RT', name: 'R. Timmer', meta: 'Uitgeest · Sierbestrating' },
];

export const SCORE = { value: '4,9', count: 47 };

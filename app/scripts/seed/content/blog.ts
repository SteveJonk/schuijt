export type BlogCategory = 'sierbestrating' | 'schuttingbouw' | 'tuinaanleg' | 'terrasreiniging' | 'zakelijk';

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; title: string; text: string };

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  date?: string;
  /** Heading of the offerte box under the article. */
  ctaTitle?: string;
  /** Slugs for "Gerelateerde artikelen"; defaults to the three newest others. */
  related?: string[];
  /** Without a body the excerpt stands in (see the ponytail note below). */
  body?: Block[];
};

/**
 * ponytail: the design's example articles. Only the first has a full text;
 * the blog workflow (n8n/Notion) is on hold, so the others show their excerpt
 * until real articles replace this list.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'sierbestrating-kosten-per-m2',
    category: 'sierbestrating',
    title: 'Hoeveel kost sierbestrating per m²? Dit bepaalt de prijs',
    excerpt:
      'Materiaal, oppervlakte en de staat van de ondergrond: dit zijn de belangrijkste factoren die de prijs van uw nieuwe terras of oprit bepalen.',
    readTime: '6 min leestijd',
    image: '/images/sierbestrating-oprit-grind.jpg',
    date: '24 september 2026',
    ctaTitle: 'Benieuwd naar de prijs voor uw eigen terras of oprit?',
    related: ['schutting-plaatsen-vergunning', 'complete-tuin-laten-aanleggen', 'terras-reinigen-frequentie'],
    body: [
      { type: 'p', text: 'Wie een offerte aanvraagt voor sierbestrating merkt al snel dat de prijs per vierkante meter flink kan verschillen. Dat is geen toeval: een paar factoren bepalen samen het grootste deel van de kosten. In dit artikel lopen we ze langs, zodat u weet waar u op moet letten.' },
      { type: 'h2', text: 'De drie belangrijkste kostenfactoren' },
      { type: 'p', text: 'Materiaal is meestal de grootste kostenpost. Keramische tegels liggen doorgaans hoger in prijs dan beton, terwijl gebakken klinkers weer ergens daartussenin zitten. Daarnaast telt het formaat mee: grootformaat tegels ogen rustiger, maar vragen om een vlakkere ondergrond en dus vaak meer voorbereiding.' },
      { type: 'p', text: 'Ook de staat van de ondergrond speelt een grote rol. Ligt er al bestrating die opgebroken en afgevoerd moet worden? Of is er sprake van een oneffen of slecht doorlatende bodem? Beide verhogen de hoeveelheid grondwerk, en daarmee de prijs.' },
      { type: 'callout', title: 'Vuistregel', text: 'Reken bij een gemiddeld terras op een prijs die grofweg tussen de kosten van beton (laag) en keramiek (hoog) in ligt, afhankelijk van de staat van de ondergrond. Een exacte prijs per m² geven we pas na een schouw ter plaatse.' },
      { type: 'h2', text: 'Wat verder nog meetelt' },
      { type: 'p', text: 'Naast materiaal en ondergrond zijn er een paar kleinere factoren die de einduitkomst beïnvloeden:' },
      { type: 'ul', items: [
        'De vorm van het oppervlak: veel hoeken en bochten betekent meer zaagwerk en dus meer arbeidsuren',
        'Of er een opsluitband of contrasterende rand bij komt',
        'De bereikbaarheid van de tuin voor materiaal en machines',
      ] },
      { type: 'h2', text: 'Waarom wij liever langskomen dan een prijs per m² noemen' },
      { type: 'p', text: 'Een prijs per vierkante meter zonder de situatie gezien te hebben, is eigenlijk altijd een slag in de lucht. Daarom komen we het liefst eerst vrijblijvend langs. Zo krijgt u een offerte met een vaste prijs, gebaseerd op uw eigen tuin of terras, in plaats van een schatting die achteraf toch kan tegenvallen.' },
    ],
  },
  {
    slug: 'schutting-plaatsen-vergunning',
    category: 'schuttingbouw',
    title: 'Schutting plaatsen: wat mag zonder vergunning?',
    excerpt: 'De regels rond hoogte en plaatsing op een rij, zodat u niet voor verrassingen komt te staan.',
    readTime: '4 min leestijd',
    image: '/images/schutting-schanskorven.jpg',
  },
  {
    slug: 'verzakte-bestrating-vve-voorkomen',
    category: 'zakelijk',
    title: 'Zo voorkomt u verzakte bestrating bij uw VvE',
    excerpt: 'Een goede fundering en tijdig onderhoud schelen op termijn een hoop herstelwerk.',
    readTime: '5 min leestijd',
    image: '/images/vve-heemskerk-herbestrating.jpg',
  },
  {
    slug: 'terras-reinigen-frequentie',
    category: 'terrasreiniging',
    title: 'Terras laten reinigen: hoe vaak is nodig?',
    excerpt: 'Groene aanslag komt sneller terug dan u denkt. Dit bepaalt hoe vaak reinigen zinvol is.',
    readTime: '3 min leestijd',
    image: '/images/reiniging-grootformaat-terras.jpg',
  },
  {
    slug: 'complete-tuin-laten-aanleggen',
    category: 'tuinaanleg',
    title: 'Complete tuin laten aanleggen: dit kunt u verwachten',
    excerpt: 'Van eerste schouw tot de laatste plant: zo ziet het traject van een complete tuinaanleg eruit.',
    readTime: '6 min leestijd',
    image: '/images/tuin-lounge-terras.jpg',
  },
  {
    slug: 'herbestrating-woningcorporatie-aanpak',
    category: 'zakelijk',
    title: 'Herbestrating bij een woningcorporatie: zo pakken we dit aan',
    excerpt: 'Werken in een bewoonde straat vraagt om een andere planning. Dit is onze aanpak.',
    readTime: '5 min leestijd',
    image: '/images/voortuinen-nieuwbouw.jpg',
  },
  {
    slug: 'schuttingbouw-hout-of-composiet',
    category: 'schuttingbouw',
    title: 'Hout of een onderhoudsarme schutting: wat past bij u?',
    excerpt: 'De voor- en nadelen van naturel hout tegenover een onderhoudsarme afwerking op een rij.',
    readTime: '4 min leestijd',
    image: '/images/schutting-antraciet-poort.jpg',
  },
];

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  sierbestrating: 'Sierbestrating',
  schuttingbouw: 'Schuttingbouw',
  tuinaanleg: 'Tuinaanleg',
  terrasreiniging: 'Terrasreiniging',
  zakelijk: 'Zakelijk',
};

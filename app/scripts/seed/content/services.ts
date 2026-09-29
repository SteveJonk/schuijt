import type { ServicePage } from './types';
import type { SERVICE_SLUGS } from './routes';

const DESIGNED = {
  sierbestrating: {
    metaTitle: 'Sierbestrating',
    metaDescription: 'Terras, oprit of tuinpad: strak gelegd op een stevige fundering, met de juiste afwatering zodat het jarenlang mooi blijft liggen.',
    crumb: 'Sierbestrating',
    hero: {
      kicker: 'Dienst',
      title: [
        'Sierbestrating die ',
        'strak',
        ' blijft liggen',
      ],
      lead: 'Terras, oprit of tuinpad: strak gelegd op een stevige fundering, met de juiste afwatering zodat het jarenlang mooi blijft liggen.',
      usps: [
        'Stevige fundering en juiste afschot',
        'Vaste prijs vooraf',
        'Ook grotere/zakelijke bestratingsprojecten',
      ],
      images: [
        '/images/sierbestrating-oprit-grind.jpg',
        '/images/sierbestrating-oprit-baksteenrand.jpg',
      ],
      badge: {
        value: 'Op maat',
        label: 'Elk formaat en elke kleur mogelijk',
      },
    },
    types: {
      kicker: 'Toepassingen',
      title: 'Voor elk deel van uw buitenruimte',
      lead: 'Van een terras achter de deur tot een complete oprit. Onderstaand een greep uit wat we vaak leggen.',
      items: [
        {
          image: '/images/sierbestrating-terras-trap.jpg',
          title: 'Terrassen',
          text: 'Grootformaat keramische of betontegels, strak gelegd met smalle voegen en het juiste afschot.',
        },
        {
          image: '/images/sierbestrating-oprit.jpg',
          title: 'Opritten',
          text: 'Berijdbare bestrating die tegen een stootje kan, met een stevige fundering onder de tegels.',
        },
        {
          image: '/images/sierbestrating-tuinpad.jpg',
          title: 'Tuinpaden',
          text: 'Paden die de tuin verbinden, in een formaat en kleur die past bij de rest van de bestrating.',
        },
        {
          image: '/images/sierbestrating-gras.jpg',
          title: 'Combinaties met gras',
          text: 'Bestrating gecombineerd met kunstgras of borders voor een afgewerkt totaalbeeld.',
        },
      ],
    },
    werkwijze: {
      title: 'Van eerste gesprek tot een strak terras',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Opmeten en advies',
          text: 'We meten de situatie op en adviseren over formaat, kleur en het benodigde afschot.',
        },
        {
          title: 'Duidelijke offerte',
          text: 'Een vaste prijs inclusief materiaal, grondwerk, fundering en afvoer van de oude bestrating.',
        },
        {
          title: 'Vakkundig gelegd',
          text: 'Stevige fundering, strakke lijnen en de juiste afwatering, zodat het jarenlang goed blijft liggen.',
        },
        {
          title: 'Oplevering en nazorg',
          text: 'We lopen het werk samen na en ruimen alles netjes op.',
        },
      ],
    },
    materials: {
      kicker: 'Materiaal & formaat',
      title: 'Kies uw tegel en kleur',
      text: 'We werken met keramische tegels, beton en gebakken klinkers in verschillende formaten en kleuren, inclusief bijpassende opsluitbanden.',
      points: [
        'Keramische tegels in grote formaten',
        'Betontegels en gebakken klinkers',
        'Contrasterende opsluitbanden mogelijk',
        'Waterdoorlatende bestrating mogelijk',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/sierbestrating-materiaal-1.jpg',
        '/images/sierbestrating-voortuin-plantvak.jpg',
        '/images/sierbestrating-materiaal-3.jpg',
      ],
    },
    projects: {
      kicker: 'Projecten',
      title: 'Recent gelegde bestrating',
      items: [
        {
          image: '/images/sierbestrating-oprit-grind.jpg',
          title: 'Moderne oprit, gedeeltelijk grind',
          size: 'wide',
        },
        {
          image: '/images/sierbestrating-terras-trap.jpg',
          title: 'Grootformaat terras met trap',
        },
        {
          image: '/images/sierbestrating-terras-kunstgras.jpg',
          title: 'Terras met kunstgras en borders',
        },
        {
          image: '/images/sierbestrating-voortuin-plantvak.jpg',
          title: 'Voortuin met plantvak',
        },
        {
          image: '/images/sierbestrating-oprit-baksteenrand.jpg',
          title: 'Oprit met rode baksteenrand',
          size: 'wide',
        },
      ],
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Waarom zakt bestrating soms na een tijdje?',
          answer: 'Dat komt bijna altijd door een fundering die niet stevig genoeg is aangelegd. Wij werken met voldoende puinfundering en het juiste zand, zodat de tegels vlak blijven liggen.',
        },
        {
          question: 'Kunnen jullie ook de oude bestrating afvoeren?',
          answer: 'Ja, we breken de oude bestrating op en voeren deze netjes af, dat nemen we standaard mee in de offerte.',
        },
        {
          question: 'Welk formaat tegel past bij mijn tuin?',
          answer: 'Dat hangt af van de grootte van het terras en uw persoonlijke smaak. We adviseren hier graag in tijdens de schouw, met voorbeelden van formaten en kleuren.',
        },
        {
          question: 'Doen jullie ook grotere of zakelijke bestratingsprojecten?',
          answer: 'Zeker, denk aan het herbestraten van paden en stoepen voor een VvE of de aanleg van een compleet parkeerterrein voor een bedrijf. Neem contact op voor de mogelijkheden.',
        },
      ],
    },
    cta: {
      title: 'Benieuwd wat uw bestrating kost?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Oppervlakte, gewenst formaat en kleur (indien bekend)',
    },
  },
  schuttingbouw: {
    metaTitle: 'Schuttingbouw',
    metaDescription: 'Van een klassieke houten schutting tot een moderne combinatie met schanskorven of een strak zwart stalen frame. Stevig geplaatst, netjes afgewerkt en jarenlang mooi.',
    crumb: 'Schuttingbouw',
    hero: {
      kicker: 'Dienst',
      title: [
        'Schuttingen die ',
        'recht',
        ' blijven staan',
      ],
      lead: 'Van een klassieke houten schutting tot een moderne combinatie met schanskorven of een strak zwart stalen frame. Stevig geplaatst, netjes afgewerkt en jarenlang mooi.',
      usps: [
        'Geplaatst op betonpoeren',
        'Vaste prijs vooraf',
        'Ook grotere/zakelijke schuttingprojecten',
      ],
      images: [
        '/images/schutting-schanskorven.jpg',
        '/images/schutting-stalen-frame.jpg',
      ],
      badge: {
        value: 'Op maat',
        label: 'Elke schutting is maatwerk',
      },
    },
    types: {
      kicker: 'Soorten schuttingen',
      title: 'Voor elke tuin de juiste uitstraling',
      lead: 'We werken met verschillende materialen en afwerkingen. Onderstaand een greep uit wat we vaak plaatsen.',
      items: [
        {
          image: '/images/schutting-hout-schanskorven.jpg',
          title: 'Hout met schanskorven',
          text: 'Een combinatie van houten delen en gevulde schanskorven voor een robuuste, moderne look.',
        },
        {
          image: '/images/schutting-zwart-gecoat.jpg',
          title: 'Zwart gecoate schutting',
          text: 'Een naturel schutting die zwart is gebeitst of gecoat, strak en onderhoudsarm.',
        },
        {
          image: '/images/schutting-antraciet-poort.jpg',
          title: 'Antraciet met poort',
          text: 'Volledig antraciet geschilderde schutting inclusief een op maat gemaakte toegangspoort.',
        },
        {
          image: '/images/schutting-stalen-frame.jpg',
          title: 'Stalen frame met hout',
          text: 'Een onderhoudsvriendelijk stalen frame gevuld met houten delen, extra stevig en strak.',
        },
      ],
    },
    werkwijze: {
      title: 'Van eerste gesprek tot een rechte schutting',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Opmeten en advies',
          text: 'We meten de situatie op en adviseren over hoogte, materiaal en eventuele erfgrensregels.',
        },
        {
          title: 'Duidelijke offerte',
          text: 'Een vaste prijs inclusief materiaal, plaatsing en afvoer van het oude hekwerk.',
        },
        {
          title: 'Stevig geplaatst',
          text: 'Palen op betonpoeren gezet, zodat de schutting recht blijft staan, ook na jaren.',
        },
        {
          title: 'Oplevering en nazorg',
          text: 'We lopen het werk samen na en ruimen alles netjes op.',
        },
      ],
    },
    materials: {
      kicker: 'Materiaal & afwerking',
      title: 'Kies uw hout en kleur',
      text: 'We werken met verschillende houtsoorten en kleuren, van natuurlijk hout tot volledig dichtgezette privacyschermen.',
      points: [
        'Naturel hardhout, blijft mooi verweren',
        'Zwart of antraciet gebeitst voor een strakke look',
        'Stalen of houten palen, op betonpoeren',
        'Poorten en deuren op maat gemaakt',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/schutting-materiaal-1.jpg',
        '/images/schutting-materiaal-2.jpg',
        '/images/schutting-materiaal-3.jpg',
      ],
    },
    projects: {
      kicker: 'Projecten',
      title: 'Recent geplaatste schuttingen',
      items: [
        {
          image: '/images/schutting-schanskorven.jpg',
          title: 'Schutting met schanskorven',
          size: 'wide',
        },
        {
          image: '/images/schutting-antraciet-poort.jpg',
          title: 'Antracietschutting met poort',
        },
        {
          image: '/images/schutting-modern-systeem.jpg',
          title: 'Modern schuttingsysteem',
        },
        {
          image: '/images/schutting-kinderkopjes.jpg',
          title: 'Schutting op kinderkopjes',
        },
        {
          image: '/images/schutting-zwart-gecoat-2.jpg',
          title: 'Zwart gecoate schutting',
          size: 'wide',
        },
      ],
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Heb ik een vergunning nodig voor een nieuwe schutting?',
          answer: 'Voor een schutting tot 1 meter hoogte aan de voorkant of tot 2 meter achter de voorgevellijn is meestal geen vergunning nodig. We denken hier graag in mee.',
        },
        {
          question: 'Hoe lang gaat een schutting mee?',
          answer: 'Met goed hout, betonpoeren en de juiste afwerking gaat een schutting normaal gesproken vele jaren mee. De levensduur hangt af van het gekozen materiaal.',
        },
        {
          question: 'Kunnen jullie ook de oude schutting afvoeren?',
          answer: 'Ja, we breken de oude schutting af en voeren deze netjes af, dat nemen we standaard mee in de offerte.',
        },
        {
          question: 'Doen jullie ook grotere of zakelijke schuttingprojecten?',
          answer: 'Zeker, denk aan een lange erfafscheiding bij een bedrijf of een compleet terrein voor een VvE. Neem contact op voor de mogelijkheden.',
        },
      ],
    },
    cta: {
      title: 'Benieuwd wat uw schutting kost?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Lengte, gewenste hoogte en materiaal (indien bekend)',
    },
  },
  tuinaanleg: {
    metaTitle: 'Tuinaanleg',
    metaDescription: 'Van grondwerk en afwatering tot gazon, borders, kunstgras en vlonders. Wij denken mee over het ontwerp en leggen de complete tuin aan.',
    crumb: 'Tuinaanleg',
    hero: {
      kicker: 'Dienst',
      title: [
        'Een tuin die helemaal ',
        'klopt',
        '',
      ],
      lead: 'Van grondwerk en afwatering tot gazon, borders, kunstgras en vlonders. Wij denken mee over het ontwerp en leggen de complete tuin aan.',
      usps: [
        'Van ontwerp tot laatste plant',
        'Vaste prijs vooraf',
        'Ook grotere/zakelijke terreinen',
      ],
      images: [
        '/images/tuin-lounge-terras.jpg',
        '/images/tuin-pergola-boomstammetjes.jpg',
      ],
      badge: {
        value: 'Op maat',
        label: 'Ontwerp dat past bij uw tuin',
      },
    },
    types: {
      kicker: 'Onderdelen',
      title: 'De bouwstenen van uw nieuwe tuin',
      lead: 'Elke tuin is anders. Onderstaand een greep uit de onderdelen die we vaak combineren.',
      items: [
        {
          image: '/images/tuin-complete-aanleg.jpg',
          title: 'Complete tuinaanleg',
          text: 'Grondwerk, bestrating, gazon en beplanting in één doorlopend project, van schets tot oplevering.',
        },
        {
          image: '/images/tuin-gazon-kunstgras.jpg',
          title: 'Gazon & kunstgras',
          text: 'Een nieuw grasveld of onderhoudsvrij kunstgras, strak afgewerkt met een nette rand.',
        },
        {
          image: '/images/tuin-vlonder-pergola.jpg',
          title: 'Vlonders & overkappingen',
          text: 'Een houten vlonder of pergola die binnen en buiten met elkaar verbindt.',
        },
        {
          image: '/images/tuin-beplanting-borders.jpg',
          title: 'Beplanting & borders',
          text: 'Borders met vaste planten en struiken die de tuin meteen een afgewerkte uitstraling geven.',
        },
      ],
    },
    werkwijze: {
      title: 'Van ontwerp tot een afgewerkte tuin',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Schouw en ontwerp',
          text: 'We bekijken de tuin en denken mee over indeling, materialen en beplanting.',
        },
        {
          title: 'Duidelijke offerte',
          text: 'Een vaste prijs voor het hele project, van grondwerk tot de laatste plant.',
        },
        {
          title: 'Stap voor stap aangelegd',
          text: 'Grondwerk en afwatering eerst, dan bestrating, gazon en beplanting.',
        },
        {
          title: 'Oplevering en nazorg',
          text: 'We lopen de tuin samen na en geven advies over het eerste onderhoud.',
        },
      ],
    },
    materials: {
      kicker: 'Ontwerp & materiaal',
      title: 'Een tuin die bij u past',
      text: 'Van strak en modern tot juist groen en organisch. We combineren bestrating, hout, gras en beplanting tot één geheel.',
      points: [
        'Grondwerk en goede afwatering als basis',
        'Gazon, kunstgras of een combinatie',
        'Vlonders, pergola\'s en border-afwerking',
        'Beplantingsplan op maat',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/tuin-voortuin-zitbank.jpg',
        '/images/tuin-materiaal-2.jpg',
        '/images/tuin-materiaal-3.jpg',
      ],
    },
    projects: {
      kicker: 'Projecten',
      title: 'Recent aangelegde tuinen',
      items: [
        {
          image: '/images/tuin-lounge-terras.jpg',
          title: 'Tuin met lounge-terras en gazon',
          size: 'wide',
        },
        {
          image: '/images/tuin-vlonder-pergola.jpg',
          title: 'Vlonder met pergola aan het water',
        },
        {
          image: '/images/tuin-trampoline.jpg',
          title: 'Tuin met verdiepte trampoline',
        },
        {
          image: '/images/tuin-voortuin-zitbank.jpg',
          title: 'Voortuin met zitbank en border',
        },
        {
          image: '/images/tuin-pergola-boomstammetjes.jpg',
          title: 'Tuin met pergola en pad van boomstammetjes',
          size: 'wide',
        },
      ],
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Helpen jullie ook met het ontwerp?',
          answer: 'Ja, tijdens de schouw denken we mee over indeling, materiaalkeuze en beplanting, passend bij uw wensen en budget.',
        },
        {
          question: 'Hoe lang duurt een complete tuinaanleg?',
          answer: 'Dat hangt af van de omvang, maar een gemiddelde tuin ronden we meestal binnen enkele weken af, inclusief grondwerk en beplanting.',
        },
        {
          question: 'Regelen jullie ook de afwatering?',
          answer: 'Ja, een goede afwatering nemen we standaard mee in het ontwerp, zodat er geen plassen blijven staan na regen.',
        },
        {
          question: 'Doen jullie ook grotere of zakelijke tuinprojecten?',
          answer: 'Zeker, denk aan terreinonderhoud voor een VvE of de aanleg van groen rond een bedrijfspand. Neem contact op voor de mogelijkheden.',
        },
      ],
    },
    cta: {
      title: 'Benieuwd wat uw tuin kost?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Grootte van de tuin en uw wensen (indien bekend)',
    },
  },
  terrasreiniging: {
    metaTitle: 'Terrasreiniging',
    metaDescription: 'Groene aanslag, mos en vuil eruit, voegen bijgewerkt waar nodig. Grondig gereinigd zonder de bestrating te beschadigen.',
    crumb: 'Terrasreiniging',
    hero: {
      kicker: 'Dienst',
      title: [
        'Uw terras weer ',
        'stralend',
        ' schoon',
      ],
      lead: 'Groene aanslag, mos en vuil eruit, voegen bijgewerkt waar nodig. Grondig gereinigd zonder de bestrating te beschadigen.',
      usps: [
        'Professionele hogedrukreiniging',
        'Vaste prijs vooraf',
        'Ook grotere/zakelijke terreinen',
      ],
      images: [
        '/images/reiniging-grootformaat-terras.jpg',
        '/images/reiniging-terras-vlonder.jpg',
      ],
      badge: {
        value: 'Direct resultaat',
        label: 'Zichtbaar verschil binnen één dag',
      },
    },
    types: {
      kicker: 'Voor elke ondergrond',
      title: 'Reiniging op maat van uw bestrating',
      lead: 'Elke ondergrond vraagt een andere aanpak en druk. Onderstaand een greep uit wat we vaak reinigen.',
      items: [
        {
          image: '/images/reiniging-oprit.jpg',
          title: 'Terrassen en opritten',
          text: 'Beton, klinkers of tegels grondig gereinigd, zonder de voegen te beschadigen.',
        },
        {
          image: '/images/reiniging-patroonbestrating.jpg',
          title: 'Sierbestrating met patroon',
          text: 'Ook bestrating met contrasterende accenten reinigen we zorgvuldig, zonder kleurverschil te veroorzaken.',
        },
        {
          image: '/images/reiniging-grootformaat-tegels.jpg',
          title: 'Grootformaat tegels',
          text: 'Grote tegelvlakken weer gelijkmatig schoon, inclusief de voegen ertussen.',
        },
        {
          image: '/images/reiniging-relief.jpg',
          title: 'Sierbestrating met reliëf',
          text: 'Ook bestrating met een reliëf of imitatie-natuursteen patroon reinigen we tot in de groeven.',
        },
      ],
    },
    werkwijze: {
      title: 'Van inspectie tot een stralend resultaat',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Inspectie ter plaatse',
          text: 'We bekijken het type bestrating en bepalen de juiste druk en reinigingsmethode.',
        },
        {
          title: 'Duidelijke offerte',
          text: 'Een vaste prijs op basis van het oppervlak en de staat van de bestrating.',
        },
        {
          title: 'Grondig gereinigd',
          text: 'Hogedrukreiniging waarbij we de voegen sparen, gevolgd door eventueel opnieuw invoegen.',
        },
        {
          title: 'Oplevering en advies',
          text: 'We laten het resultaat zien en geven advies over onderhoud of eventueel impregneren.',
        },
      ],
    },
    materials: {
      kicker: 'Reiniging & nazorg',
      title: 'Meer dan alleen spuiten',
      text: 'Goede terrasreiniging is precisiewerk: de juiste druk per ondergrond, en waar nodig voegen herstellen of impregneren tegen nieuwe aanslag.',
      points: [
        'Professionele hogedrukapparatuur',
        'Voegen opnieuw vullen waar nodig',
        'Impregneren tegen nieuwe groene aanslag',
        'Ook houten vlonders en terrassen',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/reiniging-materiaal-1.jpg',
        '/images/reiniging-voor.jpg',
        '/images/reiniging-materiaal-3.jpg',
      ],
    },
    projects: {
      kicker: 'Resultaten',
      title: 'Recent gereinigde terrassen',
      items: [
        {
          image: '/images/reiniging-grootformaat-terras.jpg',
          title: 'Grootformaat terras, net gereinigd',
          size: 'wide',
        },
        {
          image: '/images/reiniging-oprit.jpg',
          title: 'Oprit na hogedrukreiniging',
        },
        {
          image: '/images/reiniging-voor.jpg',
          title: 'Sierbestrating voor reiniging',
        },
        {
          image: '/images/reiniging-patroonbestrating.jpg',
          title: 'Patroonbestrating, na behandeling',
        },
        {
          image: '/images/reiniging-terras-vlonder.jpg',
          title: 'Terras met vlonder, na reiniging',
          size: 'wide',
        },
      ],
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Beschadigt hogedrukreiniging mijn bestrating niet?',
          answer: 'Niet als het goed gebeurt. We stemmen de druk af op het type materiaal, zodat het oppervlak en de voegen intact blijven.',
        },
        {
          question: 'Moeten de voegen daarna opnieuw ingevoegd worden?',
          answer: 'Vaak spoelt er wat voegzand of -mortel mee. Waar nodig vullen we de voegen na reiniging weer netjes aan.',
        },
        {
          question: 'Hoe voorkom ik dat de groene aanslag snel terugkomt?',
          answer: 'Na reiniging kunnen we de bestrating impregneren. Dat vertraagt nieuwe aanslag aanzienlijk en houdt het terras langer schoon.',
        },
        {
          question: 'Doen jullie ook grotere of zakelijke terreinen?',
          answer: 'Zeker, denk aan gemeenschappelijke paden bij een VvE of een bedrijfsterrein. Neem contact op voor de mogelijkheden.',
        },
      ],
    },
    cta: {
      title: 'Benieuwd wat reiniging kost?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Oppervlakte en type bestrating (indien bekend)',
    },
  },
} satisfies Record<string, ServicePage>;

/**
 * Content per service slug. The last two WordPress pages have no design of
 * their own yet: they borrow the closest service until the scraped content lands.
 */
export const SERVICE_PAGES: Record<(typeof SERVICE_SLUGS)[number], ServicePage> = {
  ...DESIGNED,
  'tuin-uitgraven': { ...DESIGNED.tuinaanleg, metaTitle: 'Tuin uitgraven', crumb: 'Tuin uitgraven' },
  'tuintegels-schoonmaken-tips-en-professionele-diensten': {
    ...DESIGNED.terrasreiniging,
    metaTitle: 'Tuintegels schoonmaken',
    crumb: 'Tuintegels schoonmaken',
  },
};

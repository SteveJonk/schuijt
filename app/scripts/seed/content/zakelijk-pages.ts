import type { ServicePage } from './types';

/** /zakelijk/<slug>/ audience pages; same template as the services. */
export const ZAKELIJK_PAGES = {
  'woningcorporaties': {
    metaTitle: 'Woningcorporaties',
    metaDescription: 'Versleten stoepen, gedateerde paden bij een wooncomplex of onderhoud dat over meerdere straten verspreid ligt. Wij pakken het gefaseerd aan, met oog voor de bewoners.',
    crumb: 'Woningcorporaties',
    hero: {
      kicker: 'Zakelijk',
      title: [
        'Herbestrating en onderhoud voor ',
        'woningcorporaties',
        '',
      ],
      lead: 'Versleten stoepen, gedateerde paden bij een wooncomplex of onderhoud dat over meerdere straten verspreid ligt. Wij pakken het gefaseerd aan, met oog voor de bewoners.',
      usps: [
        'Eén aanspreekpunt voor de corporatie',
        'Vaste prijs vooraf',
        'Gefaseerd per straat of blok',
      ],
      images: [
        '/images/voortuinen-nieuwbouw.jpg',
        '/images/vve-heemskerk-herbestrating.jpg',
      ],
      badge: {
        value: 'Op maat',
        label: 'Per straat of complex een passend plan',
      },
    },
    types: {
      kicker: 'Herkenbaar?',
      title: 'Situaties die we vaak tegenkomen bij woningcorporaties',
      lead: 'Bestrating bij huurwoningen slijt net zo hard als overal, maar het onderhoud raakt al snel verspreid over meerdere straten en complexen.',
      items: [
        {
          image: '/images/voortuinen-nieuwbouw.jpg',
          title: 'Verzakte of ongelijke stoepen',
          text: 'Trottoirs die over een hele straat zijn gaan verzakken, met struikelgevaar voor bewoners tot gevolg.',
        },
        {
          image: '/images/vve-heemskerk-herbestrating.jpg',
          title: 'Gedateerde paden bij een complex',
          text: 'Bestrating rond een wooncomplex die niet meer bij de rest van de opknapbeurt past.',
        },
        {
          image: '/images/zakelijk-terrein.jpg',
          title: 'Onderhoud over meerdere locaties',
          text: 'Werk dat verspreid ligt over meerdere straten of complexen en lastig in te plannen is.',
        },
        {
          image: '/images/vve-heemskerk-535m2.jpg',
          title: 'Bewoners die op de hoogte willen zijn',
          text: 'Huurders die willen weten wanneer er gewerkt wordt en hoe lang de overlast duurt.',
        },
      ],
    },
    werkwijze: {
      title: 'Van eerste gesprek tot een afgerond project',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Eén aanspreekpunt',
          text: 'U regelt het project met één persoon bij ons, ook als het om meerdere straten of complexen gaat.',
        },
        {
          title: 'Heldere offerte per locatie',
          text: 'Een duidelijk plan van aanpak per straat of complex, zodat u het onderhoud makkelijk kunt inplannen.',
        },
        {
          title: 'Bewoners tijdig geïnformeerd',
          text: 'We stemmen met u af hoe en wanneer bewoners over de werkzaamheden worden geïnformeerd.',
        },
        {
          title: 'Gefaseerd per straat of blok',
          text: 'We werken in fases, zodat niet de hele buurt tegelijk in de overlast zit.',
        },
      ],
    },
    materials: {
      kicker: 'Wat we doen',
      title: 'Voor woningcorporaties',
      text: 'Van een losse herbestrating van één straat tot terugkerend onderhoud over meerdere complexen.',
      points: [
        'Herbestrating van stoepen en trottoirs',
        'Groot onderhoud aan de buitenruimte bij complexen',
        'Gefaseerde uitvoering per straat of bouwblok',
        'Afstemming met bewoners en de corporatie',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/voortuinen-nieuwbouw.jpg',
        '/images/vve-heemskerk-herbestrating.jpg',
        '/images/vve-amsterdam-parkeervakken.jpg',
      ],
    },
    projects: {
      kicker: 'In beeld',
      title: 'Dit soort werk voeren we uit',
      lead: 'Nog geen afgeronde case specifiek voor een woningcorporatie, wel ervaring met dit type bestrating en onderhoud bij vergelijkbare complexen.',
      items: [
        {
          image: '/images/voortuinen-nieuwbouw.jpg',
          title: 'Herbestrating stoep en trottoir',
          size: 'wide',
        },
        {
          image: '/images/vve-heemskerk-herbestrating.jpg',
          title: 'Gezamenlijke buitenruimte bij een complex',
        },
        {
          image: '/images/vve-amsterdam-parkeervakken.jpg',
          title: 'Aanleg en herstel van parkeervakken',
        },
      ],
      link: {
        label: 'Bekijk alle zakelijke projecten',
        href: '/zakelijk/projecten/',
      },
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Kunnen jullie meerdere straten of complexen tegelijk aanpakken?',
          answer: 'Ja, we plannen dat in overleg gefaseerd in, zodat het werk behapbaar blijft en niet de hele buurt tegelijk overlast heeft.',
        },
        {
          question: 'Hoe gaan jullie om met communicatie naar huurders?',
          answer: 'We stemmen met de corporatie af hoe en wanneer bewoners worden geïnformeerd, bijvoorbeeld via een brief vooraf met de planning.',
        },
        {
          question: 'Werken jullie met raamovereenkomsten of alleen losse opdrachten?',
          answer: 'Op dit moment vooral losse, grotere opdrachten. We denken graag mee als dat richting terugkerend onderhoud kan groeien.',
        },
        {
          question: 'Werken jullie ook via formele aanbestedingen?',
          answer: 'Nog niet op dit moment. Neem contact op om te bespreken wat er voor uw situatie nodig is.',
        },
      ],
    },
    cta: {
      title: 'Herkenbaar voor uw straten of complexen?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Vertel kort over het project (locatie, oppervlakte, planning)',
    },
  },
  'vve-vastgoedbeheer': {
    metaTitle: 'VvE & Vastgoedbeheer',
    metaDescription: 'Verzakte paden, een verwaarloosde gemeenschappelijke tuin of groot onderhoud dat blijft liggen. Wij voeren het uit terwijl het complex gewoon bewoond en bereikbaar blijft.',
    crumb: 'VvE & Vastgoedbeheer',
    hero: {
      kicker: 'Zakelijk',
      title: [
        'Bestrating en onderhoud voor ',
        'VvE\'s',
        ' en beheerders',
      ],
      lead: 'Verzakte paden, een verwaarloosde gemeenschappelijke tuin of groot onderhoud dat blijft liggen. Wij voeren het uit terwijl het complex gewoon bewoond en bereikbaar blijft.',
      usps: [
        'Eén aanspreekpunt voor bestuur of beheerder',
        'Vaste prijs vooraf',
        'Gefaseerd, bewoond blijft bereikbaar',
      ],
      images: [
        '/images/vve-heemskerk-herbestrating.jpg',
        '/images/vve-heemskerk-535m2.jpg',
      ],
      badge: {
        value: '535 m²',
        label: 'Herbestraat voor een VvE in Heemskerk',
      },
    },
    types: {
      kicker: 'Herkenbaar?',
      title: 'Situaties die we vaak tegenkomen bij VvE\'s',
      lead: 'Buitenruimte die gedeeld eigendom is, vraagt om een andere aanpak dan een particuliere tuin. Onderstaand een greep uit wat we vaak zien.',
      items: [
        {
          image: '/images/vve-heemskerk-herbestrating.jpg',
          title: 'Verzakte bestrating',
          text: 'Paden en parkeervakken die door de jaren heen zijn gaan verzakken, met struikelgevaar en wateroverlast tot gevolg.',
        },
        {
          image: '/images/voortuinen-nieuwbouw.jpg',
          title: 'Onderhoud dat blijft liggen',
          text: 'Groot onderhoud dat steeds wordt uitgesteld, omdat niemand goed weet wie het oppakt en wat het gaat kosten.',
        },
        {
          image: '/images/zakelijk-terrein.jpg',
          title: 'Bewoners die overlast willen beperken',
          text: 'Werkzaamheden waarbij het complex bereikbaar moet blijven en de hinder zo klein mogelijk moet zijn.',
        },
        {
          image: '/images/vve-heemskerk-535m2.jpg',
          title: 'Een offerte voor de ALV',
          text: 'Een heldere, onderbouwde offerte die het bestuur zo kan voorleggen aan de leden.',
        },
      ],
    },
    werkwijze: {
      title: 'Van eerste gesprek tot een afgerond project',
      lead: 'U weet vooraf wat er gebeurt, wat het kost en wanneer we klaar zijn.',
      steps: [
        {
          title: 'Eén aanspreekpunt',
          text: 'U regelt het project met één persoon, of dat nu het bestuur of de beheerder is, van schouw tot oplevering.',
        },
        {
          title: 'Offerte geschikt voor de ALV',
          text: 'Een duidelijk plan van aanpak inclusief planning, onderbouwd genoeg om voor te leggen aan het bestuur of de leden.',
        },
        {
          title: 'Rekening met bewoners',
          text: 'De werkzaamheden zijn zo ingericht dat het complex bereikbaar en in gebruik blijft.',
        },
        {
          title: 'Gefaseerd waar nodig',
          text: 'Bij grotere oppervlaktes werken we in fases, zodat de hinder voor bewoners beperkt blijft.',
        },
      ],
    },
    materials: {
      kicker: 'Wat we doen',
      title: 'Voor VvE\'s en vastgoedbeheerders',
      text: 'Van een losse herbestrating tot terugkerend onderhoud aan de gemeenschappelijke buitenruimte.',
      points: [
        'Herbestrating van paden en gemeenschappelijke buitenruimtes',
        'Aanleg en herstel van parkeervakken en -terreinen',
        'Terreinonderhoud, ook op terugkerende basis',
        'Afwatering en erfafscheidingen rond het complex',
      ],
      cta: 'Bespreek de mogelijkheden',
      photos: [
        '/images/vve-heemskerk-herbestrating.jpg',
        '/images/vve-heemskerk-535m2.jpg',
        '/images/zakelijk-terrein.jpg',
      ],
    },
    projects: {
      kicker: 'Projecten',
      title: 'VvE-projecten die we hebben uitgevoerd',
      items: [
        {
          image: '/images/vve-heemskerk-535m2.jpg',
          title: 'Herbestrating VvE Heemskerk — 535 m²',
          size: 'wide',
        },
        {
          image: '/images/vve-heemskerk-herbestrating.jpg',
          title: 'Gezamenlijke buitenruimte, Heemskerk',
        },
        {
          image: '/images/vve-amsterdam-parkeervakken.jpg',
          title: 'Parkeerterrein VvE Amsterdam — 165 m²',
        },
      ],
      link: {
        label: 'Bekijk alle zakelijke projecten',
        href: '/zakelijk/projecten/',
      },
    },
    faq: {
      kicker: 'Veelgestelde vragen',
      title: 'Wat klanten ons vaak vragen',
      items: [
        {
          question: 'Wie is bij u het aanspreekpunt: het bestuur of de beheerder?',
          answer: 'Allebei kan. We stemmen af met wie namens de VvE het project regelt, of dat nu een bestuurslid is of een externe vastgoedbeheerder.',
        },
        {
          question: 'Kan de offerte gebruikt worden voor een ALV?',
          answer: 'Ja, we maken een heldere offerte met een duidelijke prijs en planning, geschikt om voor te leggen aan de leden of het bestuur.',
        },
        {
          question: 'Blijft het complex tijdens de werkzaamheden bereikbaar?',
          answer: 'Ja, we plannen grotere projecten standaard gefaseerd, zodat het complex bereikbaar blijft en de overlast voor bewoners beperkt blijft.',
        },
        {
          question: 'Werken jullie ook via formele aanbestedingen?',
          answer: 'Op dit moment richten we ons vooral op grotere losse opdrachten en terugkerend onderhoud. Voor een formeel aanbestedingstraject kunt u contact opnemen, dan bespreken we samen wat er nodig is.',
        },
      ],
    },
    cta: {
      title: 'Herkenbaar voor uw VvE of complex?',
      text: 'Laat uw gegevens achter of bel direct. We komen vrijblijvend langs en u ontvangt een duidelijke offerte met vaste prijs.',
      messagePlaceholder: 'Vertel kort over het project (locatie, oppervlakte, planning)',
    },
  },
} satisfies Record<string, ServicePage>;

export type ZakelijkSlug = keyof typeof ZAKELIJK_PAGES;

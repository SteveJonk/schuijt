import {defineArrayMember, defineField, defineType} from 'sanity'
import {img, str, strList, txt} from '../fields'

/** Kicker + heading + intro above a section. */
export const sectionHeadType = defineType({
  name: 'sectionHead',
  title: 'Sectiekop',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('title', 'Titel', {required: true}),
    txt('lead', 'Introtekst', {rows: 2}),
  ],
})

/** The big gradient hero with two photos. */
export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('titleBefore', 'Titel: begin'),
    str('titleHighlight', 'Titel: onderstreept woord', {required: true}),
    str('titleAfter', 'Titel: einde'),
    txt('lead', 'Introtekst', {required: true}),
    defineField({
      name: 'primaryCta',
      title: 'Hoofdknop',
      type: 'link',
      description: 'Leeg = de standaardknop naar het offerteformulier onderaan de pagina.',
    }),
    strList('usps', 'Voordelen (pillen onder de knoppen)'),
    img('image', 'Grote foto', {required: true}),
    img('imageSmall', 'Kleine foto', {required: true, decorative: true}),
    defineField({
      name: 'badge',
      title: 'Zwevend label',
      type: 'object',
      options: {collapsible: true},
      fields: [str('value', 'Groot'), str('label', 'Klein')],
    }),
  ],
})

export const stepType = defineType({
  name: 'step',
  title: 'Stap',
  type: 'object',
  fields: [str('title', 'Titel', {required: true}), txt('text', 'Tekst', {rows: 2})],
})

/** "Werkwijze": four numbered steps. */
export const werkwijzeType = defineType({
  name: 'werkwijze',
  title: 'Werkwijze',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('title', 'Titel', {required: true}),
    txt('lead', 'Introtekst', {rows: 2}),
    defineField({name: 'steps', title: 'Stappen', type: 'array', of: [defineArrayMember({type: 'step'})]}),
  ],
})

export const faqItemType = defineType({
  name: 'faqItem',
  title: 'Vraag',
  type: 'object',
  fields: [
    str('question', 'Vraag', {required: true}),
    txt('answer', 'Antwoord', {required: true}),
    defineField({name: 'open', title: 'Standaard opengeklapt', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

export const faqType = defineType({
  name: 'faq',
  title: 'Veelgestelde vragen',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('title', 'Titel', {required: true}),
    defineField({name: 'items', title: 'Vragen', type: 'array', of: [defineArrayMember({type: 'faqItem'})]}),
  ],
})

/** The contact band with the offerte form that closes most pages. */
export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Contactblok onderaan',
  type: 'object',
  fields: [
    str('title', 'Titel', {required: true}),
    txt('text', 'Tekst', {description: 'Leeg = de standaardtekst uit Vaste teksten.'}),
    defineField({
      name: 'form',
      title: 'Formulier',
      type: 'reference',
      to: [{type: 'form'}],
      description: 'Leeg = het standaardformulier uit Formulierinstellingen.',
    }),
    str('messagePlaceholder', 'Voorbeeldtekst in het berichtveld', {
      description: 'Vervangt de voorbeeldtekst van het tekstvak in het formulier. Leeg = die uit het formulier.',
    }),
  ],
})

/** Photo tile with caption, as in the project grids. */
export const photoTileType = defineType({
  name: 'photoTile',
  title: 'Fototegel',
  type: 'object',
  fields: [
    img('image', 'Foto', {required: true}),
    str('title', 'Bijschrift', {required: true}),
    str('text', 'Tweede regel'),
    defineField({
      name: 'size',
      title: 'Formaat',
      type: 'string',
      options: {
        list: [
          {title: 'Normaal', value: 'normal'},
          {title: 'Breed', value: 'wide'},
          {title: 'Hoog', value: 'tall'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'size', media: 'image'}},
})

/** Card with photo, title, text and optional link (services, audiences). */
export const cardType = defineType({
  name: 'card',
  title: 'Kaart',
  type: 'object',
  fields: [
    img('image', 'Foto', {required: true}),
    str('title', 'Titel', {required: true}),
    txt('text', 'Tekst', {rows: 2}),
    defineField({name: 'link', title: 'Link', type: 'link'}),
  ],
  preview: {select: {title: 'title', subtitle: 'text', media: 'image'}},
})

/** Centered "werkgebied" band with place chips. */
export const placesType = defineType({
  name: 'places',
  title: 'Werkgebied',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('title', 'Titel', {required: true}),
    txt('text', 'Tekst', {rows: 2}),
    strList('places', 'Plaatsen', {description: 'Leeg = de plaatsen uit Website-instellingen.'}),
  ],
})

/** Page intro on overview pages (projecten, blog, reviews, contact). */
export const introType = defineType({
  name: 'intro',
  title: 'Intro',
  type: 'object',
  fields: [
    str('kicker', 'Label boven de titel'),
    str('title', 'Titel', {required: true}),
    txt('text', 'Tekst', {required: true}),
  ],
})


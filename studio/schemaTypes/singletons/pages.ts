import {HomeIcon} from '@sanity/icons/Home'
import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {img, imgList, str, strList, txt} from '../fields'

const seo = defineField({name: 'seo', title: 'SEO', type: 'seo'})
const cta = defineField({name: 'cta', title: 'Contactblok onderaan', type: 'ctaSection'})
const title = (description: string) =>
  str('title', 'Paginanaam', {required: true, description})

const statArray = (name: string, titleText: string, withSuffix = false) =>
  defineField({
    name,
    title: titleText,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'stat',
        fields: withSuffix
          ? [
              defineField({name: 'value', title: 'Getal', type: 'number', validation: (r) => r.required()}),
              str('suffix', 'Achter het getal', {description: 'Bijv. " m²".'}),
              str('label', 'Label', {required: true}),
            ]
          : [str('value', 'Waarde', {required: true}), str('label', 'Label', {required: true})],
        preview: {select: {title: 'value', subtitle: 'label'}},
      }),
    ],
  })

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'top', title: 'Boven', default: true},
    {name: 'sections', title: 'Secties'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'hero', group: 'top'}),
    defineField({
      name: 'paths',
      title: 'Twee instapkaarten',
      type: 'array',
      group: 'top',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pathCard',
          fields: [
            img('image', 'Foto', {required: true, decorative: true}),
            str('tag', 'Label'),
            str('title', 'Titel', {required: true}),
            txt('text', 'Tekst', {rows: 2}),
            defineField({name: 'link', title: 'Link', type: 'link'}),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        }),
      ],
      validation: (r) => r.max(2),
    }),
    defineField({
      name: 'services',
      title: 'Diensten',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        defineField({name: 'cards', title: 'Kaarten', type: 'array', of: [defineArrayMember({type: 'card'})]}),
      ],
    }),
    defineField({name: 'werkwijze', title: 'Werkwijze', type: 'werkwijze', group: 'sections'}),
    defineField({
      name: 'zakelijk',
      title: 'Zakelijk',
      type: 'object',
      group: 'sections',
      fields: [
        str('kicker', 'Label boven de titel'),
        str('title', 'Titel'),
        txt('text', 'Tekst'),
        strList('points', 'Punten'),
        statArray('stats', 'Cijfers (tellen op)', true),
        defineField({name: 'primaryCta', title: 'Knop 1', type: 'link'}),
        defineField({name: 'secondaryCta', title: 'Knop 2', type: 'link'}),
        imgList('photos', 'Foto’s (3)', {max: 3}),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projecten',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        defineField({name: 'tiles', title: 'Fototegels', type: 'array', of: [defineArrayMember({type: 'photoTile'})]}),
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
      ],
      description: 'Toont automatisch de drie nieuwste reviews met 4 of 5 sterren.',
    }),
    defineField({
      name: 'werkgebied',
      title: 'Werkgebied',
      type: 'object',
      group: 'sections',
      description: 'De plaatsen komen uit Website-instellingen.',
      fields: [str('kicker', 'Label boven de titel'), str('title', 'Titel'), txt('text', 'Tekst'), img('image', 'Foto')],
    }),
    {...cta, group: 'sections'},
    {...seo, group: 'seo'},
  ],
  preview: {prepare: () => ({title: 'Home'})},
})

export const zakelijkPageType = defineType({
  name: 'zakelijkPage',
  title: 'Zakelijk',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'top', title: 'Boven', default: true},
    {name: 'sections', title: 'Secties'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    {...title('In menu en kruimelpad, bijv. "Zakelijk".'), group: 'top'},
    defineField({name: 'hero', title: 'Hero', type: 'hero', group: 'top'}),
    {...statArray('stats', 'Cijfers'), group: 'top'},
    defineField({
      name: 'audiences',
      title: 'Voor wie',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        defineField({name: 'cards', title: 'Kaarten', type: 'array', of: [defineArrayMember({type: 'card'})]}),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Wat we doen',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        strList('items', 'Werkzaamheden'),
      ],
    }),
    defineField({name: 'werkwijze', title: 'Werkwijze', type: 'werkwijze', group: 'sections'}),
    defineField({
      name: 'projects',
      title: 'Projecten',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        defineField({
          name: 'items',
          title: 'Projecten',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
        }),
        defineField({name: 'link', title: 'Knop', type: 'link'}),
      ],
    }),
    defineField({
      name: 'trust',
      title: 'Vertrouwen',
      type: 'array',
      group: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icoon',
              type: 'string',
              options: {
                list: [
                  {title: 'Locatie', value: 'pin'},
                  {title: 'Vinkje', value: 'check'},
                  {title: 'Klok', value: 'clock'},
                ],
              },
            }),
            str('title', 'Titel', {required: true}),
            txt('text', 'Tekst', {rows: 2}),
          ],
        }),
      ],
    }),
    defineField({name: 'faq', title: 'Veelgestelde vragen', type: 'faq', group: 'sections'}),
    {...cta, group: 'sections'},
    {...seo, group: 'seo'},
  ],
  preview: {prepare: () => ({title: 'Zakelijk'})},
})

export const projectsPageType = defineType({
  name: 'projectsPage',
  title: 'Projecten-overzicht',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    title('In het kruimelpad, bijv. "Projecten".'),
    defineField({name: 'intro', title: 'Intro', type: 'intro'}),
    str('filterAll', 'Filterknop "alle"'),
    cta,
    seo,
  ],
  preview: {prepare: () => ({title: 'Projecten-overzicht'})},
})

export const zakelijkProjectsPageType = defineType({
  name: 'zakelijkProjectsPage',
  title: 'Zakelijke projecten',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    title('Kruimelpad op projectpagina’s, bijv. "Zakelijke projecten".'),
    str('breadcrumb', 'Kruimelpad op deze pagina', {description: 'Bijv. "Projecten".'}),
    defineField({name: 'intro', title: 'Intro', type: 'intro'}),
    str('filterAll', 'Filter: alle'),
    str('filterVve', 'Filter: VvE'),
    str('filterCorporatie', 'Filter: woningcorporaties'),
    str('filterBedrijf', 'Filter: bedrijven'),
    str('soonTitle', 'Blok "meer volgt": titel'),
    txt('soonText', 'Blok "meer volgt": tekst', {rows: 2}),
    cta,
    seo,
  ],
  preview: {prepare: () => ({title: 'Zakelijke projecten'})},
})

export const reviewsPageType = defineType({
  name: 'reviewsPage',
  title: 'Reviews',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    title('In het kruimelpad.'),
    defineField({name: 'intro', title: 'Intro', type: 'intro'}),
    str('scoreCaption', 'Onder de score', {description: 'Gebruik {aantal} voor het aantal reviews.'}),
    str('googleLabel', 'Google-label'),
    defineField({
      name: 'leave',
      title: 'Blok "schrijf een review"',
      type: 'object',
      fields: [str('kicker', 'Label'), str('title', 'Titel'), txt('text', 'Tekst'), str('button', 'Knop')],
    }),
    cta,
    seo,
  ],
  preview: {prepare: () => ({title: 'Reviews'})},
})

export const blogPageType = defineType({
  name: 'blogPage',
  title: 'Blog-overzicht',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    title('In het kruimelpad.'),
    defineField({name: 'intro', title: 'Intro', type: 'intro'}),
    str('filterAll', 'Filter: alle'),
    str('readMore', 'Link op het uitgelichte artikel'),
    cta,
    seo,
  ],
  preview: {prepare: () => ({title: 'Blog-overzicht'})},
})

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    title('In het kruimelpad.'),
    defineField({name: 'intro', title: 'Intro', type: 'intro'}),
    strList('badges', 'Pillen onder de intro'),
    defineField({
      name: 'infoCards',
      title: 'Contactkaarten',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'infoCard',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icoon',
              type: 'string',
              options: {
                list: [
                  {title: 'Telefoon', value: 'phone'},
                  {title: 'E-mail', value: 'mail'},
                  {title: 'Locatie', value: 'pin'},
                ],
              },
            }),
            str('title', 'Titel', {required: true}),
            txt('text', 'Tekst', {rows: 2}),
            defineField({
              name: 'show',
              title: 'Toon eronder',
              type: 'string',
              options: {
                list: [
                  {title: 'Niets', value: 'none'},
                  {title: 'Telefoonnummer', value: 'phone'},
                  {title: 'E-mailadres', value: 'email'},
                ],
              },
              initialValue: 'none',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Bereikbaarheid',
      type: 'object',
      fields: [
        str('title', 'Titel'),
        defineField({
          name: 'rows',
          title: 'Regels',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'hoursRow',
              fields: [str('day', 'Dag', {required: true}), str('time', 'Tijd', {required: true})],
              preview: {select: {title: 'day', subtitle: 'time'}},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'form',
      title: 'Formulier',
      type: 'reference',
      to: [{type: 'form'}],
      validation: (r) => r.required(),
    }),
    txt('formLead', 'Intro boven het formulier', {rows: 2}),
    defineField({name: 'werkgebied', title: 'Werkgebied', type: 'places'}),
    defineField({name: 'faq', title: 'Veelgestelde vragen', type: 'faq'}),
    seo,
  ],
  preview: {prepare: () => ({title: 'Contact'})},
})

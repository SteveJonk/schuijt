import {DocumentIcon} from '@sanity/icons/Document'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {imgList, str, strList, txt} from '../fields'

const KIND_LABEL: Record<string, string> = {
  dienst: 'Dienst',
  lokaal: 'Lokale pagina',
  zakelijk: 'Zakelijk',
}

/**
 * Every page built on the "dienst" design: the services (/sierbestrating/),
 * their local variants (/schutting-plaatsen-in-haarlem/) and the zakelijk
 * audience pages (/zakelijk/woningcorporaties/). `kind` decides the URL and
 * which list in the studio it appears in.
 */
export const servicePageType = defineType({
  name: 'servicePage',
  title: 'Dienstpagina',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'page', title: 'Pagina', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'sections', title: 'Secties'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'kind',
      title: 'Soort pagina',
      type: 'string',
      group: 'page',
      options: {
        list: Object.entries(KIND_LABEL).map(([value, title]) => ({value, title})),
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'dienst',
      description: 'Zakelijk: de URL wordt /zakelijk/<slug>/. De rest: /<slug>/.',
      validation: (r) => r.required(),
    }),
    str('title', 'Paginatitel', {required: true, group: 'page'}),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      group: 'page',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    str('breadcrumb', 'Kruimelpad-naam', {
      group: 'page',
      description: 'Kort, bijv. "Haarlem". Leeg = de paginatitel.',
    }),
    defineField({
      name: 'parent',
      title: 'Hoort bij dienst',
      type: 'reference',
      to: [{type: 'servicePage'}],
      group: 'page',
      options: {filter: 'kind == "dienst"'},
      description: 'Voor lokale pagina’s: verschijnt in het kruimelpad.',
      hidden: ({document}) => document?.kind !== 'lokaal',
    }),
    defineField({name: 'hero', title: 'Hero', type: 'hero', group: 'hero'}),
    defineField({
      name: 'nearby',
      title: 'Werkgebied in de buurt',
      type: 'places',
      group: 'sections',
      hidden: ({document}) => document?.kind !== 'lokaal',
    }),
    defineField({
      name: 'types',
      title: 'Toepassingen',
      type: 'object',
      group: 'sections',
      fields: [
        defineField({name: 'head', title: 'Sectiekop', type: 'sectionHead'}),
        defineField({
          name: 'items',
          title: 'Kaarten',
          type: 'array',
          of: [defineArrayMember({type: 'card'})],
        }),
      ],
    }),
    defineField({name: 'werkwijze', title: 'Werkwijze', type: 'werkwijze', group: 'sections'}),
    defineField({
      name: 'materials',
      title: 'Materiaal',
      type: 'object',
      group: 'sections',
      fields: [
        str('kicker', 'Label boven de titel'),
        str('title', 'Titel'),
        txt('text', 'Tekst'),
        strList('points', 'Punten'),
        str('ctaLabel', 'Knoptekst'),
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
        defineField({
          name: 'tiles',
          title: 'Fototegels',
          type: 'array',
          of: [defineArrayMember({type: 'photoTile'})],
        }),
        defineField({name: 'link', title: 'Knop onder de tegels', type: 'link'}),
      ],
    }),
    defineField({name: 'faq', title: 'Veelgestelde vragen', type: 'faq', group: 'sections'}),
    defineField({name: 'cta', title: 'Contactblok onderaan', type: 'ctaSection', group: 'sections'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', slug: 'slug.current', media: 'hero.image'},
    prepare: ({title, kind, slug, media}) => ({
      title,
      subtitle: `${KIND_LABEL[kind] ?? ''} · /${kind === 'zakelijk' ? 'zakelijk/' : ''}${slug ?? ''}/`,
      media,
    }),
  },
})


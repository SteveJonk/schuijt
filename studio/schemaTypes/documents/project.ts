import {ImagesIcon} from '@sanity/icons/Images'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {img, str, strList, txt} from '../fields'

/** A project (a WordPress post): /<slug>/. */
export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImagesIcon,
  groups: [
    {name: 'content', title: 'Inhoud', default: true},
    {name: 'zakelijk', title: 'Zakelijke kaart'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    str('title', 'Titel', {required: true, group: 'content'}),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date',
      group: 'content',
      description: 'Bepaalt de volgorde in het overzicht (nieuwste eerst).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'content',
      validation: (r) => r.required(),
    }),
    img('image', 'Hoofdfoto', {required: true, group: 'content'}),
    txt('subline', 'Ondertitel', {group: 'content', rows: 2}),
    defineField({
      name: 'meta',
      title: 'Kenmerken',
      type: 'array',
      group: 'content',
      description: 'De strook onder de foto, bijv. Locatie · Heemskerk.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'metaItem',
          fields: [str('label', 'Label', {required: true}), str('value', 'Waarde', {required: true})],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'intro',
      title: 'Over dit project',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'block', styles: [], lists: []})],
    }),
    strList('works', 'Uitgevoerde werkzaamheden', {group: 'content'}),
    defineField({
      name: 'gallery',
      title: 'Foto’s',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            img('image', 'Foto', {required: true, decorative: true}),
            defineField({name: 'wide', title: 'Breed', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {media: 'image', wide: 'wide'}, prepare: ({media, wide}) => ({title: wide ? 'Breed' : 'Normaal', media})},
        }),
      ],
    }),
    str('cardTag', 'Label', {group: 'zakelijk', description: 'Bijv. "VvE — Heemskerk".'}),
    str('cardTitle', 'Titel op de kaart', {group: 'zakelijk'}),
    txt('cardText', 'Samenvatting', {group: 'zakelijk', rows: 3}),
    img('cardImage', 'Foto op de kaart', {group: 'zakelijk'}),
    defineField({
      name: 'cardStats',
      title: 'Kerncijfers',
      type: 'array',
      group: 'zakelijk',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [str('value', 'Waarde', {required: true}), str('label', 'Label', {required: true})],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (r) => r.max(2),
    }),
    defineField({
      name: 'audience',
      title: 'Doelgroep (filter)',
      type: 'string',
      group: 'zakelijk',
      options: {
        list: [
          {title: 'VvE & vastgoedbeheer', value: 'vve'},
          {title: 'Woningcorporaties', value: 'corporatie'},
          {title: 'Bedrijven & instellingen', value: 'bedrijf'},
        ],
      },
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  orderings: [{title: 'Nieuwste eerst', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'category.title', media: 'image'},
  },
})

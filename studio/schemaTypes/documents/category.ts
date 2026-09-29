import {TagIcon} from '@sanity/icons/Tag'
import {defineField, defineType} from 'sanity'
import {str} from '../fields'

/** Sierbestrating, Schuttingbouw, … and Zakelijk. Groups projects and blog posts. */
export const categoryType = defineType({
  name: 'category',
  title: 'Categorie',
  type: 'document',
  icon: TagIcon,
  fields: [
    str('title', 'Naam', {required: true}),
    defineField({
      name: 'isZakelijk',
      title: 'Zakelijke categorie',
      type: 'boolean',
      initialValue: false,
      description: 'Projecten in deze categorie krijgen de zakelijke opmaak en staan op /zakelijk/projecten/.',
    }),
    defineField({
      name: 'relatedPage',
      title: 'Gerelateerde dienst',
      type: 'reference',
      to: [{type: 'servicePage'}],
      description: 'Getoond onderaan elk project in deze categorie.',
    }),
    defineField({name: 'order', title: 'Volgorde in filters', type: 'number'}),
  ],
  orderings: [{title: 'Volgorde', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
})

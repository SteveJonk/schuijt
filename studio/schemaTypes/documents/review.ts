import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType} from 'sanity'
import {str, txt} from '../fields'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    str('name', 'Naam', {required: true}),
    str('initials', 'Initialen', {required: true, description: 'In het rondje, bijv. "MV".'}),
    defineField({
      name: 'audience',
      title: 'Soort klant',
      type: 'string',
      options: {
        list: [
          {title: 'Particulier', value: 'particulier'},
          {title: 'Zakelijk', value: 'zakelijk'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'particulier',
      validation: (r) => r.required(),
    }),
    str('location', 'Plaats'),
    str('service', 'Uitgevoerd werk', {description: 'Bijv. "Tuinaanleg".'}),
    txt('text', 'Review', {required: true, rows: 4}),
    defineField({name: 'order', title: 'Volgorde', type: 'number'}),
  ],
  orderings: [{title: 'Volgorde', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'text'}},
})

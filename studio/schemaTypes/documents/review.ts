import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType, type ConditionalPropertyCallbackContext} from 'sanity'
import {str, txt} from '../fields'

/** Fields the Google sync owns: read-only on a synced review, it would overwrite them anyway. */
const fromGoogle = ({document}: ConditionalPropertyCallbackContext) => document?.source === 'google'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Bron',
      type: 'string',
      options: {
        list: [
          {title: 'Handmatig', value: 'manual'},
          {title: 'Google', value: 'google'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'manual',
      readOnly: true,
      description: 'Google-reviews worden elk uur bijgewerkt via de Google-koppeling.',
    }),
    defineField({
      name: 'hidden',
      title: 'Verbergen op de website',
      type: 'boolean',
      initialValue: false,
    }),
    {...str('name', 'Naam', {required: true}), readOnly: fromGoogle},
    str('initials', 'Initialen', {description: 'In het rondje, bijv. "MV". Leeg = uit de naam.'}),
    defineField({
      name: 'rating',
      title: 'Sterren',
      type: 'number',
      readOnly: fromGoogle,
      initialValue: 5,
      options: {list: [5, 4, 3, 2, 1]},
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
    defineField({name: 'publishedAt', title: 'Datum', type: 'datetime', readOnly: fromGoogle}),
    str('location', 'Plaats'),
    str('service', 'Uitgevoerd werk', {description: 'Bijv. "Tuinaanleg".'}),
    {...txt('text', 'Review', {required: true, rows: 4}), readOnly: fromGoogle},
    defineField({
      name: 'google',
      title: 'Google',
      type: 'object',
      readOnly: true,
      hidden: ({document}) => document?.source !== 'google',
      options: {collapsible: true, collapsed: true},
      fields: [
        str('reviewId', 'Review-id'),
        defineField({name: 'authorUrl', title: 'Profiel van de schrijver', type: 'url'}),
        defineField({name: 'authorPhotoUrl', title: 'Profielfoto', type: 'url'}),
        defineField({name: 'reviewUrl', title: 'Review op Google Maps', type: 'url'}),
        str('language', 'Taal'),
        defineField({name: 'syncedAt', title: 'Laatst bijgewerkt', type: 'datetime'}),
      ],
    }),
  ],
  orderings: [
    {title: 'Nieuwste eerst', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]},
    {title: 'Hoogste score', name: 'rating', by: [{field: 'rating', direction: 'desc'}]},
  ],
  preview: {
    select: {name: 'name', text: 'text', rating: 'rating', date: 'publishedAt', source: 'source', hidden: 'hidden'},
    prepare: ({name, text, rating, date, source, hidden}) => ({
      title: `${hidden ? '🚫 ' : ''}${name ?? 'Zonder naam'}`,
      subtitle: [
        rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : null,
        date ? new Date(date).toLocaleDateString('nl-NL') : null,
        source === 'google' ? 'Google' : 'Handmatig',
        text,
      ]
        .filter(Boolean)
        .join(' · '),
    }),
  },
})

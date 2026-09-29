import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {ComposeIcon} from '@sanity/icons/Compose'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {img, str, txt} from '../fields'

/** /blog/<slug>/ */
export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blogartikel',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    str('title', 'Titel', {required: true}),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (r) => r.required(),
    }),
    defineField({name: 'date', title: 'Datum', type: 'date'}),
    str('readTime', 'Leestijd', {description: 'Bijv. "6 min leestijd".'}),
    defineField({
      name: 'featured',
      title: 'Uitgelicht in het overzicht',
      type: 'boolean',
      initialValue: false,
    }),
    img('image', 'Foto', {required: true, decorative: true}),
    txt('excerpt', 'Samenvatting', {required: true}),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normaal', value: 'normal'},
            {title: 'Kop', value: 'h2'},
          ],
          lists: [{title: 'Opsomming', value: 'bullet'}],
        }),
        defineArrayMember({
          type: 'object',
          name: 'callout',
          title: 'Kader',
          icon: BlockquoteIcon,
          fields: [str('title', 'Titel'), txt('text', 'Tekst', {required: true})],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    str('ctaTitle', 'Titel van het offerteblok onder het artikel', {
      description: 'Leeg = de standaardtitel uit Vaste teksten.',
    }),
    defineField({
      name: 'related',
      title: 'Gerelateerde artikelen',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'blogPost'}]})],
      description: 'Leeg = de drie nieuwste andere artikelen.',
      validation: (r) => r.max(3),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [{title: 'Nieuwste eerst', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category.title', media: 'image'}},
})

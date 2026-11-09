import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
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
        // Not the shared `faq` type: blog answers carry links, so they are rich text.
        defineArrayMember({
          type: 'object',
          name: 'faqBlock',
          title: 'Veelgestelde vragen',
          icon: HelpCircleIcon,
          fields: [
            str('title', 'Titel', {description: 'Bijv. "Veelgestelde vragen".'}),
            defineField({
              name: 'items',
              title: 'Vragen',
              type: 'array',
              validation: (r) => r.required().min(1),
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'faqBlockItem',
                  title: 'Vraag',
                  fields: [
                    str('question', 'Vraag', {required: true}),
                    defineField({
                      name: 'answer',
                      title: 'Antwoord',
                      type: 'array',
                      validation: (r) => r.required(),
                      of: [
                        defineArrayMember({
                          type: 'block',
                          styles: [{title: 'Normaal', value: 'normal'}],
                          lists: [],
                        }),
                      ],
                    }),
                  ],
                  preview: {select: {title: 'question'}},
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', items: 'items'},
            prepare: ({title, items}) => ({
              title: title || 'Veelgestelde vragen',
              subtitle: `${items?.length ?? 0} vragen`,
            }),
          },
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

import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {str} from '../fields'

/** Plain text pages such as /privacy-policy/. */
export const textPageType = defineType({
  name: 'textPage',
  title: 'Tekstpagina',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    str('title', 'Titel', {required: true}),
    defineField({
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    str('breadcrumb', 'Kruimelpad-naam', {description: 'Leeg = de titel.'}),
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
            {title: 'Subkop', value: 'h3'},
          ],
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})

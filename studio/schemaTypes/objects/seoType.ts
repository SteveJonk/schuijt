import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Metatitel',
      type: 'string',
      description: 'Leeg = de titel van de pagina.',
      validation: (r) => r.max(65).warning('Kan worden afgekapt in zoekresultaten'),
    }),
    defineField({
      name: 'description',
      title: 'Metabeschrijving',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Kan worden afgekapt in zoekresultaten'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Deelafbeelding',
      type: 'image',
      description: 'Getoond bij delen op sociale media.',
    }),
    defineField({name: 'noIndex', title: 'Niet indexeren', type: 'boolean', initialValue: false}),
  ],
})

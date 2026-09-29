import {LinkIcon} from '@sanity/icons/Link'
import {defineField, defineType} from 'sanity'
import {LINKABLE_TYPES} from '../fields'

/**
 * A link with its own label: either to a page in the studio (keeps working when
 * a slug changes) or to a URL / anchor such as `/#diensten` or `#contact`.
 */
export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Tekst',
      type: 'string',
      description: 'Leeg laten waar de link geen eigen tekst heeft (bijv. doorsturen na een formulier).',
    }),
    defineField({
      name: 'linkType',
      title: 'Soort link',
      type: 'string',
      options: {
        list: [
          {title: 'Pagina in de studio', value: 'internal'},
          {title: 'URL of anker', value: 'external'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'internalLink',
      title: 'Pagina',
      type: 'reference',
      to: LINKABLE_TYPES,
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (r) =>
        r.custom((value, ctx) =>
          (ctx.parent as {linkType?: string})?.linkType === 'internal' && !value
            ? 'Kies een pagina'
            : true,
        ),
    }),
    defineField({
      name: 'href',
      title: 'URL of anker',
      type: 'string',
      description: 'Bijvoorbeeld /#diensten, #contact, https://… of tel:…',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (r) =>
        r.custom((value, ctx) =>
          (ctx.parent as {linkType?: string})?.linkType === 'external' && !value?.trim()
            ? 'Vul een URL of anker in'
            : true,
        ),
    }),
  ],
  preview: {
    select: {title: 'label', href: 'href', page: 'internalLink.title'},
    prepare: ({title, href, page}) => ({title: title || 'Link', subtitle: page || href}),
  },
})

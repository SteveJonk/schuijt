import {defineArrayMember, defineField} from 'sanity'

/**
 * Small field helpers so the schema files read as a list of what an editor
 * fills in, not as boilerplate. All titles are Dutch: the client edits here.
 */

type Opts = {
  description?: string
  required?: boolean
  group?: string
  hidden?: any
  initialValue?: any
}

type AnyRule = any

/** Splits our `required` flag off the options Sanity understands. */
const split = ({required, ...rest}: Opts) => ({
  ...rest,
  ...(required ? {validation: (rule: AnyRule) => rule.required()} : {}),
})

export const str = (name: string, title: string, opts: Opts = {}) =>
  defineField({name, title, type: 'string', ...split(opts)})

export const txt = (name: string, title: string, {rows = 3, ...opts}: Opts & {rows?: number} = {}) =>
  defineField({name, title, type: 'text', rows, ...split(opts)})

/** Image with hotspot and an alt text. */
export const img = (
  name: string,
  title: string,
  {decorative, ...opts}: Opts & {decorative?: boolean} = {},
) =>
  defineField({
    name,
    title,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternatieve tekst',
        type: 'string',
        description: decorative
          ? 'Mag leeg blijven als de foto puur sfeer is.'
          : 'Beschrijf wat er op de foto staat, voor schermlezers en Google.',
      }),
    ],
    ...split(opts),
  })

export const strList = (name: string, title: string, opts: Opts = {}) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: 'string'})], ...split(opts)})

export const imgList = (name: string, title: string, {max, ...opts}: Opts & {max?: number} = {}) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'image',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Alternatieve tekst', type: 'string'})],
      }),
    ],
    ...split(opts),
    ...(max ? {validation: (rule: AnyRule) => rule.max(max)} : {}),
  })

/** Every document type a link can point at; the app maps each to its URL. */
export const LINKABLE_TYPES = [
  'homePage',
  'servicePage',
  'project',
  'blogPost',
  'textPage',
  'zakelijkPage',
  'projectsPage',
  'zakelijkProjectsPage',
  'reviewsPage',
  'blogPage',
  'contactPage',
].map((type) => ({type}))

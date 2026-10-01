import {CogIcon} from '@sanity/icons/Cog'
import {ComposeIcon} from '@sanity/icons/Compose'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {ImagesIcon} from '@sanity/icons/Images'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {MediaLibrary} from './tools/MediaTool'

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

/** Dienstpagina's of one kind, created with that kind preset. */
const servicePages = (S: StructureBuilder, kind: string, title: string) =>
  S.listItem()
    .title(title)
    .id(`servicePage-${kind}`)
    .schemaType('servicePage')
    .child(
      S.documentTypeList('servicePage')
        .title(title)
        .filter('_type == "servicePage" && kind == $kind')
        .params({kind})
        .defaultOrdering([{field: 'title', direction: 'asc'}])
        .initialValueTemplates([S.initialValueTemplateItem(`servicePage-${kind}`)]),
    )

/** Reviews, newest first, narrowed by a GROQ filter. */
const reviewList = (S: StructureBuilder, id: string, title: string, filter: string) =>
  S.listItem()
    .title(title)
    .id(`reviews-${id}`)
    .schemaType('review')
    .child(
      S.documentTypeList('review')
        .title(title)
        .filter(filter)
        .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhoud')
    .items([
      S.listItem()
        .title('Pagina’s')
        .id('pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pagina’s')
            .items([
              S.listItem()
                .title('Algemeen')
                .id('general')
                .child(
                  S.list()
                    .title('Algemeen')
                    .items([
                      singleton(S, 'homePage', 'Home'),
                      singleton(S, 'zakelijkPage', 'Zakelijk'),
                      singleton(S, 'projectsPage', 'Projecten-overzicht'),
                      singleton(S, 'zakelijkProjectsPage', 'Zakelijke projecten'),
                      singleton(S, 'reviewsPage', 'Reviews'),
                      singleton(S, 'blogPage', 'Blog-overzicht'),
                      singleton(S, 'contactPage', 'Contact'),
                      S.documentTypeListItem('textPage').title('Tekstpagina’s'),
                    ]),
                ),
              servicePages(S, 'dienst', 'Diensten'),
              servicePages(S, 'lokaal', 'Lokale pagina’s'),
              servicePages(S, 'zakelijk', 'Zakelijk'),
            ]),
        ),
      S.documentTypeListItem('project')
        .title('Projecten')
        .child(
          S.documentTypeList('project')
            .title('Projecten')
            .defaultOrdering([{field: 'date', direction: 'desc'}]),
        ),
      S.documentTypeListItem('blogPost').title('Blog').icon(ComposeIcon),
      S.listItem()
        .title('Reviews')
        .id('reviews')
        .icon(StarIcon)
        .child(
          S.list()
            .title('Reviews')
            .items([
              singleton(S, 'googleReviews', 'Google-koppeling'),
              S.divider(),
              reviewList(S, 'all', 'Alle reviews', '_type == "review"'),
              reviewList(S, 'google', 'Van Google', '_type == "review" && source == "google"'),
              reviewList(S, 'manual', 'Handmatig', '_type == "review" && source != "google"'),
              reviewList(S, 'hidden', 'Verborgen', '_type == "review" && hidden == true'),
            ]),
        ),
      S.documentTypeListItem('category').title('Categorieën').icon(TagIcon),
      S.divider(),
      S.listItem()
        .title('Formulieren')
        .id('forms')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Formulieren')
            .items([
              S.documentTypeListItem('form').title('Formulieren').icon(EnvelopeIcon),
              singleton(S, 'formGeneralSettings', 'Formulierinstellingen'),
            ]),
        ),
      S.listItem()
        .title('Instellingen')
        .id('settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Instellingen')
            .items([
              singleton(S, 'siteSettings', 'Website'),
              singleton(S, 'navigation', 'Navigatie'),
              singleton(S, 'footer', 'Footer'),
              singleton(S, 'uiText', 'Vaste teksten'),
            ]),
        ),
      S.divider(),
      // Not a document type but a panel of its own: Sanity's asset browser only
      // opens from a field on a document. See `tools/MediaTool.tsx`.
      S.listItem()
        .title('Media')
        .id('media')
        .icon(ImagesIcon)
        .child(S.component(MediaLibrary).title('Media').id('media')),
    ])

import {StarIcon} from '@sanity/icons/Star'
import {defineField, defineType} from 'sanity'
import {str} from '../fields'
import {GoogleReviewsSync} from '../../tools/GoogleReviewsSync'

/**
 * Settings for the Google reviews sync, plus the figures the last run wrote
 * back (score, count, status). The sync itself lives in the app at
 * `/api/google-reviews`; a Netlify scheduled function calls it every hour and
 * the panel at the top of this page can call it on demand.
 *
 * The Google API key and the sync secret are NOT stored here: a dataset can be
 * read by anyone who knows the project id. They live in the Netlify
 * environment (GOOGLE_PLACES_API_KEY, GOOGLE_REVIEWS_SYNC_SECRET).
 */
export const googleReviewsType = defineType({
  name: 'googleReviews',
  title: 'Google-koppeling',
  type: 'document',
  icon: StarIcon,
  groups: [
    {name: 'settings', title: 'Instellingen', default: true},
    {name: 'status', title: 'Laatste synchronisatie'},
  ],
  fields: [
    defineField({
      name: 'sync',
      title: 'Synchroniseren',
      type: 'string',
      group: 'settings',
      // Not data: a panel with the dry-run and sync buttons. Nothing is ever
      // written to this field.
      components: {field: GoogleReviewsSync},
    }),
    str('placeId', 'Google Place ID', {
      group: 'settings',
      required: true,
      description:
        'Begint meestal met "ChIJ". Op te zoeken met de Place ID Finder van Google: https://developers.google.com/maps/documentation/places/web-service/place-id',
    }),
    str('languageCode', 'Taal', {
      group: 'settings',
      initialValue: 'nl',
      description: 'Taal van de bedrijfsnaam en vertaalde teksten, bijv. nl.',
    }),
    defineField({
      name: 'enabled',
      title: 'Elk uur automatisch ophalen',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Uit = de geplande taak doet niets. Handmatig synchroniseren blijft werken.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Website-adres',
      type: 'url',
      group: 'settings',
      description:
        'Waar de knoppen hierboven de synchronisatie aanroepen, bijv. https://schuijtklussenbedrijf.nl. Leeg = SANITY_STUDIO_SITE_URL.',
    }),
    // Written by the sync, read by the website.
    str('placeName', 'Bedrijfsnaam op Google', {group: 'status'}),
    defineField({
      name: 'rating',
      title: 'Gemiddelde score',
      type: 'number',
      group: 'status',
      description: 'Over álle Google-reviews, niet alleen de opgehaalde.',
    }),
    defineField({name: 'userRatingCount', title: 'Aantal reviews', type: 'number', group: 'status'}),
    defineField({name: 'googleMapsUri', title: 'Google Maps', type: 'url', group: 'status'}),
    defineField({
      name: 'lastSync',
      title: 'Laatste synchronisatie',
      type: 'object',
      group: 'status',
      fields: [
        defineField({name: 'at', title: 'Tijdstip', type: 'datetime'}),
        str('trigger', 'Gestart door'),
        defineField({name: 'ok', title: 'Gelukt', type: 'boolean'}),
        str('message', 'Melding'),
        defineField({name: 'created', title: 'Nieuw', type: 'number'}),
        defineField({name: 'updated', title: 'Bijgewerkt', type: 'number'}),
      ],
    }),
  ].map((field) => (field.group === 'status' ? {...field, readOnly: true} : field)),
  preview: {prepare: () => ({title: 'Google-koppeling'})},
})

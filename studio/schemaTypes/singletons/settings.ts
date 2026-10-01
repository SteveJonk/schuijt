import {BlockElementIcon} from '@sanity/icons/BlockElement'
import {CogIcon} from '@sanity/icons/Cog'
import {MenuIcon} from '@sanity/icons/Menu'
import {TranslateIcon} from '@sanity/icons/Translate'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {img, str, strList, txt} from '../fields'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Website',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'identity', title: 'Bedrijf', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'reviews', title: 'Reviews'},
  ],
  fields: [
    str('name', 'Bedrijfsnaam', {required: true, group: 'identity'}),
    txt('description', 'Omschrijving', {
      group: 'identity',
      description: 'In de footer en als standaard metabeschrijving.',
    }),
    img('logo', 'Logo', {required: true, group: 'identity'}),
    str('language', 'Taal', {group: 'identity', initialValue: 'nl', description: 'Bijv. nl.'}),
    str('phone', 'Telefoonnummer', {group: 'contact'}),
    str('email', 'E-mailadres', {group: 'contact'}),
    strList('address', 'Adres (één regel per rij)', {group: 'contact'}),
    str('addressCountry', 'Landcode', {group: 'contact', initialValue: 'NL'}),
    strList('places', 'Werkgebied (plaatsen)', {group: 'contact'}),
    defineField({
      name: 'socialLinks',
      title: 'Social media',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'url'})],
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Link "Schrijf een Google Review"',
      type: 'url',
      group: 'reviews',
    }),
    str('reviewScore', 'Gemiddelde score', {group: 'reviews', description: 'Bijv. 4,9'}),
    defineField({name: 'reviewCount', title: 'Aantal Google reviews', type: 'number', group: 'reviews'}),
  ],
  preview: {prepare: () => ({title: 'Website'})},
})

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigatie',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({name: 'links', title: 'Menu', type: 'array', of: [defineArrayMember({type: 'navItem'})]}),
    str('ctaLabel', 'Knop rechtsboven', {description: 'Springt naar het offerteformulier.'}),
    str('menuOpen', 'Menuknop: openen (schermlezer)'),
    str('menuClose', 'Menuknop: sluiten (schermlezer)'),
  ],
  preview: {prepare: () => ({title: 'Navigatie'})},
})

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'groups',
      title: 'Linkgroepen',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'linkGroup',
          fields: [
            str('title', 'Titel', {required: true}),
            defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'link'})]}),
          ],
        }),
      ],
    }),
    str('contactTitle', 'Titel contactkolom'),
    str('legalText', 'Tekst onderaan', {description: 'Bijv. "KvK-nummer · Algemene voorwaarden".'}),
    defineField({name: 'legalLinks', title: 'Links onderaan', type: 'array', of: [defineArrayMember({type: 'link'})]}),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})

/** Every short interface text that is not part of one page's content. */
export const uiTextType = defineType({
  name: 'uiText',
  title: 'Vaste teksten',
  type: 'document',
  icon: TranslateIcon,
  groups: [
    {name: 'general', title: 'Algemeen', default: true},
    {name: 'project', title: 'Projectpagina'},
    {name: 'blog', title: 'Blogartikel'},
    {name: 'notFound', title: '404'},
  ],
  fields: [
    str('breadcrumbHome', 'Kruimelpad: eerste stap', {group: 'general'}),
    defineField({
      name: 'breadcrumbServices',
      title: 'Kruimelpad: diensten',
      type: 'link',
      group: 'general',
      description: 'De tussenstap op dienst- en lokale pagina’s.',
    }),
    str('heroPrimaryCta', 'Standaard hoofdknop in de hero', {group: 'general'}),
    str('callPrefix', 'Belknop: tekst vóór het nummer', {group: 'general'}),
    str('ctaKicker', 'Contactblok: label', {group: 'general'}),
    txt('ctaText', 'Contactblok: standaardtekst', {group: 'general'}),
    str('starsLabel', 'Sterren (schermlezer)', {group: 'general'}),
    str('particulierLabel', 'Label particulier', {group: 'general'}),
    str('zakelijkLabel', 'Label zakelijk', {group: 'general'}),
    str('viewProject', 'Link op projectkaart', {group: 'general'}),
    str('projectKickerParticulier', 'Label particulier project', {group: 'project'}),
    str('projectKickerZakelijk', 'Label zakelijk project', {group: 'project'}),
    str('projectAbout', 'Titel omschrijving', {group: 'project'}),
    str('projectWorks', 'Titel werkzaamheden', {group: 'project'}),
    str('projectGalleryKicker', 'Foto’s: label', {group: 'project'}),
    str('projectGalleryTitle', 'Foto’s: titel', {group: 'project'}),
    str('projectRelatedLabel', 'Gerelateerde dienst: label', {group: 'project'}),
    str('projectRelatedButton', 'Gerelateerde dienst: knop', {group: 'project'}),
    str('projectCtaParticulier', 'Contactblok particulier project', {group: 'project'}),
    str('projectCtaZakelijk', 'Contactblok zakelijk project', {group: 'project'}),
    str('blogAuthorInitials', 'Initialen auteur', {group: 'blog'}),
    str('blogCtaTitle', 'Offerteblok: standaardtitel', {group: 'blog'}),
    str('blogCtaText', 'Offerteblok: tekst', {group: 'blog'}),
    str('blogCtaButton', 'Offerteblok: knop', {group: 'blog'}),
    str('blogRelatedKicker', 'Gerelateerd: label', {group: 'blog'}),
    str('blogRelatedTitle', 'Gerelateerd: titel', {group: 'blog'}),
    str('formNote', 'Formulier: kleine tekst onder de knop', {group: 'general'}),
    str('formSending', 'Formulier: knop tijdens versturen', {group: 'general'}),
    str('formError', 'Formulier: fout bij versturen', {group: 'general'}),
    str('formRecaptchaMissing', 'Formulier: reCAPTCHA niet aangevinkt', {group: 'general'}),
    str('formStep', 'Formulier: stapteller', {
      group: 'general',
      description: 'Bij formulieren met stappen. {n} = huidige stap, {totaal} = aantal stappen.',
    }),
    str('notFoundKicker', 'Label', {group: 'notFound'}),
    str('notFoundTitle', 'Titel', {group: 'notFound'}),
    txt('notFoundText', 'Tekst', {group: 'notFound'}),
    str('notFoundButton', 'Knop', {group: 'notFound'}),
  ],
  preview: {prepare: () => ({title: 'Vaste teksten'})},
})

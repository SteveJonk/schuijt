import {blogPostType} from './documents/blogPost'
import {categoryType} from './documents/category'
import {formType} from './documents/formType'
import {projectType} from './documents/project'
import {reviewType} from './documents/review'
import {servicePageType} from './documents/servicePage'
import {textPageType} from './documents/textPage'
import {formFieldType} from './objects/formFieldType'
import {linkType} from './objects/linkType'
import {
  cardType,
  ctaSectionType,
  faqItemType,
  faqType,
  heroType,
  introType,
  photoTileType,
  placesType,
  sectionHeadType,
  stepType,
  werkwijzeType,
} from './objects/sections'
import {seoType} from './objects/seoType'
import {formGeneralSettingsType} from './singletons/formGeneralSettingsType'
import {
  blogPageType,
  contactPageType,
  homePageType,
  projectsPageType,
  reviewsPageType,
  zakelijkPageType,
  zakelijkProjectsPageType,
} from './singletons/pages'
import {
  footerType,
  navigationType,
  siteSettingsType,
  uiTextType,
} from './singletons/settings'

/** Singletons: one document each, with `_id` equal to the type name. */
export const SINGLETON_TYPES = [
  'siteSettings',
  'navigation',
  'footer',
  'uiText',
  'formGeneralSettings',
  'homePage',
  'zakelijkPage',
  'projectsPage',
  'zakelijkProjectsPage',
  'reviewsPage',
  'blogPage',
  'contactPage',
]

export const schemaTypes = [
  // Singletons
  siteSettingsType,
  navigationType,
  footerType,
  uiTextType,
  formGeneralSettingsType,
  homePageType,
  zakelijkPageType,
  projectsPageType,
  zakelijkProjectsPageType,
  reviewsPageType,
  blogPageType,
  contactPageType,
  // Documents
  servicePageType,
  projectType,
  blogPostType,
  reviewType,
  categoryType,
  textPageType,
  formType,
  // Objects
  seoType,
  linkType,
  formFieldType,
  sectionHeadType,
  heroType,
  stepType,
  werkwijzeType,
  faqItemType,
  faqType,
  ctaSectionType,
  photoTileType,
  cardType,
  placesType,
  introType,
]

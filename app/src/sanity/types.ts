/**
 * Short names for the query result shapes components render. All derived
 * from the generated `sanity.types.ts`, so a schema or query change shows up
 * here as a type error instead of a blank on the page.
 */
import type {
  BLOG_PAGE_QUERY_RESULT,
  BLOG_POST_QUERY_RESULT,
  CONTACT_PAGE_QUERY_RESULT,
  HOME_QUERY_RESULT,
  PROJECTS_PAGE_QUERY_RESULT,
  ROOT_PAGE_QUERY_RESULT,
  ZAKELIJK_PROJECTS_PAGE_QUERY_RESULT,
} from '@/sanity/sanity.types';

type Home = NonNullable<HOME_QUERY_RESULT>;
type Root = NonNullable<ROOT_PAGE_QUERY_RESULT>;

export type HeroData = NonNullable<Home['hero']>;
export type LinkData = NonNullable<HeroData['primaryCta']>;
export type SectionHeadData = NonNullable<NonNullable<Home['services']>['head']>;
export type CardData = NonNullable<NonNullable<Home['services']>['cards']>[number];
export type WerkwijzeData = NonNullable<Home['werkwijze']>;
export type TileData = NonNullable<NonNullable<Home['projects']>['tiles']>[number];
export type ReviewData = NonNullable<NonNullable<Home['reviews']>['items']>[number];
export type CtaData = NonNullable<Home['cta']>;
export type FormData = NonNullable<CtaData['form']>;
export type FormFieldData = NonNullable<FormData['fields']>[number];

export type ServicePageData = Extract<Root, { _type: 'servicePage' }>;
export type ProjectPageData = Extract<Root, { _type: 'project' }>;
export type TextPageData = Extract<Root, { _type: 'textPage' }>;
export type FaqData = NonNullable<ServicePageData['faq']>;
export type PlacesData = NonNullable<ServicePageData['nearby']>;

export type IntroData = NonNullable<NonNullable<PROJECTS_PAGE_QUERY_RESULT['page']>['intro']>;
export type ProjectCardData = PROJECTS_PAGE_QUERY_RESULT['projects'][number];
export type ZakelijkCardData = ZAKELIJK_PROJECTS_PAGE_QUERY_RESULT['projects'][number];
export type BlogCardData = BLOG_PAGE_QUERY_RESULT['posts'][number];
export type BlogPostData = NonNullable<BLOG_POST_QUERY_RESULT>;
export type ContactPageData = NonNullable<CONTACT_PAGE_QUERY_RESULT>;

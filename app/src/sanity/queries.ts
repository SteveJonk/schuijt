import { defineQuery } from 'next-sanity';

/*
 * Every GROQ query the app runs. Fragments are plain strings so typegen can
 * inline them; run `npm run typegen` after changing a query or a schema.
 *
 * URLs are routing, not content: the fixed paths below mirror the route
 * folders in `src/app`. A link picked in the studio resolves to its URL here,
 * so components only ever see a ready-to-use `href`.
 */

const IMAGE = /* groq */ `{
  asset,
  hotspot,
  crop,
  alt,
  "dimensions": asset->metadata.dimensions{ width, height }
}`;

const LINK = /* groq */ `{
  label,
  "href": select(
    linkType == "external" => href,
    internalLink->_type == "homePage" => "/",
    internalLink->_type == "zakelijkPage" => "/zakelijk/",
    internalLink->_type == "projectsPage" => "/projecten/",
    internalLink->_type == "zakelijkProjectsPage" => "/zakelijk/projecten/",
    internalLink->_type == "reviewsPage" => "/reviews/",
    internalLink->_type == "blogPage" => "/blog/",
    internalLink->_type == "contactPage" => "/contact/",
    internalLink->_type == "blogPost" => "/blog/" + internalLink->slug.current + "/",
    internalLink->_type == "servicePage" && internalLink->kind == "zakelijk" =>
      "/zakelijk/" + internalLink->slug.current + "/",
    defined(internalLink->slug.current) => "/" + internalLink->slug.current + "/"
  )
}`;

/** Path of a servicePage in the current scope. */
const SERVICE_PATH = /* groq */ `select(
  kind == "zakelijk" => "/zakelijk/" + slug.current + "/",
  "/" + slug.current + "/"
)`;

const SEO = /* groq */ `{ title, description, noIndex, ogImage ${IMAGE} }`;

const SECTION_HEAD = /* groq */ `{ kicker, title, lead }`;

const HERO = /* groq */ `{
  kicker,
  titleBefore,
  titleHighlight,
  titleAfter,
  lead,
  primaryCta ${LINK},
  usps,
  image ${IMAGE},
  imageSmall ${IMAGE},
  badge
}`;

const WERKWIJZE = /* groq */ `{ kicker, title, lead, steps[]{ _key, title, text } }`;

const FAQ = /* groq */ `{ kicker, title, items[]{ _key, question, answer, open } }`;

const CARD = /* groq */ `{ _key, image ${IMAGE}, title, text, link ${LINK} }`;

const TILE = /* groq */ `{ _key, image ${IMAGE}, title, text, size }`;

const PLACES = /* groq */ `{ kicker, title, text, places }`;

const INTRO = /* groq */ `{ kicker, title, text }`;

const FORM_FIELD = /* groq */ `{
  label,
  name,
  type,
  isRequired,
  width,
  placeholder,
  helpText,
  defaultValue,
  selectOptions,
  radioOptions,
  checkboxOptions
}`;

/** A form as the renderer draws it. */
const FORM = /* groq */ `{
  _id,
  title,
  showTitle,
  mode,
  fields[] ${FORM_FIELD},
  steps[]{ title, fields[] ${FORM_FIELD} },
  submitButtonText,
  nextButtonText,
  backButtonText,
  successTitle,
  successBody,
  redirectAfterSubmit,
  redirectLink ${LINK}
}`;

/** The contact band; falls back to the default form from the form settings. */
const CTA = /* groq */ `{
  title,
  text,
  messagePlaceholder,
  "form": coalesce(form, *[_type == "formGeneralSettings"][0].defaultForm)-> ${FORM}
}`;

const REVIEW = /* groq */ `{ _id, name, initials, audience, location, service, text }`;

const PROJECT_CARD = /* groq */ `{
  _id,
  title,
  "href": "/" + slug.current + "/",
  image ${IMAGE},
  "category": category->{ _id, title }
}`;

const ZAKELIJK_CARD = /* groq */ `{
  _id,
  "href": "/" + slug.current + "/",
  "title": coalesce(cardTitle, title),
  "tag": cardTag,
  "text": cardText,
  "image": coalesce(cardImage, image) ${IMAGE},
  "stats": cardStats[]{ _key, value, label },
  audience
}`;

// ---------------------------------------------------------------------------
// Chrome: header, footer, labels. Fetched once per request (see `layout.ts`).
// ---------------------------------------------------------------------------

export const LAYOUT_QUERY = defineQuery(`{
  "site": *[_type == "siteSettings"][0]{
    name,
    description,
    logo ${IMAGE},
    language,
    phone,
    email,
    address,
    addressCountry,
    places,
    socialLinks,
    googleReviewUrl,
    reviewScore,
    reviewCount
  },
  "navigation": *[_type == "navigation"][0]{ links[] ${LINK}, ctaLabel, menuOpen, menuClose },
  "footer": *[_type == "footer"][0]{
    groups[]{ _key, title, links[] ${LINK} },
    contactTitle,
    legalText,
    legalLinks[] ${LINK}
  },
  "ui": *[_type == "uiText"][0]{ ..., breadcrumbServices ${LINK} },
  "recaptcha": *[_type == "formGeneralSettings"][0]{ recaptchaEnabled, recaptchaSiteKey },
  "zakelijkTitle": *[_type == "zakelijkPage"][0].title,
  "projectsTitle": *[_type == "projectsPage"][0].title,
  "zakelijkProjectsTitle": *[_type == "zakelijkProjectsPage"][0].title
}`);

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero ${HERO},
  paths[]{ _key, image ${IMAGE}, tag, title, text, link ${LINK} },
  services{ head ${SECTION_HEAD}, cards[] ${CARD} },
  werkwijze ${WERKWIJZE},
  zakelijk{
    kicker,
    title,
    text,
    points,
    stats[]{ _key, value, suffix, label },
    primaryCta ${LINK},
    secondaryCta ${LINK},
    photos[] ${IMAGE}
  },
  projects{ head ${SECTION_HEAD}, tiles[] ${TILE} },
  reviews{ head ${SECTION_HEAD}, items[defined(@->_id)]-> ${REVIEW} },
  werkgebied{ kicker, title, text, image ${IMAGE} },
  cta ${CTA},
  seo ${SEO}
}`);

const SERVICE_PAGE = /* groq */ `{
  _type,
  kind,
  title,
  breadcrumb,
  "path": ${SERVICE_PATH},
  parent->{ title, breadcrumb, "path": ${SERVICE_PATH} },
  hero ${HERO},
  nearby ${PLACES},
  types{ head ${SECTION_HEAD}, items[] ${CARD} },
  werkwijze ${WERKWIJZE},
  materials{ kicker, title, text, points, ctaLabel, photos[] ${IMAGE} },
  projects{ head ${SECTION_HEAD}, tiles[] ${TILE}, link ${LINK} },
  faq ${FAQ},
  cta ${CTA},
  seo ${SEO}
}`;

const PROJECT_PAGE = /* groq */ `{
  _type,
  title,
  date,
  image ${IMAGE},
  subline,
  meta[]{ _key, label, value },
  intro,
  works,
  gallery[]{ _key, image ${IMAGE}, wide },
  category->{
    title,
    isZakelijk,
    relatedPage->{ title, breadcrumb, "path": ${SERVICE_PATH} }
  },
  "cta": *[_type == "formGeneralSettings"][0]{ "form": defaultForm-> ${FORM} },
  seo ${SEO}
}`;

const TEXT_PAGE = /* groq */ `{ _type, title, breadcrumb, body, seo ${SEO} }`;

/** Everything that lives at /<slug>/: services, local pages, projects, text pages. */
export const ROOT_PAGE_QUERY = defineQuery(`*[
  slug.current == $slug &&
  (_type in ["project", "textPage"] || (_type == "servicePage" && kind != "zakelijk"))
][0]{
  _type == "servicePage" => ${SERVICE_PAGE},
  _type == "project" => ${PROJECT_PAGE},
  _type == "textPage" => ${TEXT_PAGE}
}`);

export const ROOT_SLUGS_QUERY = defineQuery(`*[
  defined(slug.current) &&
  (_type in ["project", "textPage"] || (_type == "servicePage" && kind != "zakelijk"))
].slug.current`);

export const ZAKELIJK_SERVICE_QUERY = defineQuery(
  `*[_type == "servicePage" && kind == "zakelijk" && slug.current == $slug][0] ${SERVICE_PAGE}`,
);

export const ZAKELIJK_SLUGS_QUERY = defineQuery(
  `*[_type == "servicePage" && kind == "zakelijk" && defined(slug.current)].slug.current`,
);

export const ZAKELIJK_PAGE_QUERY = defineQuery(`*[_type == "zakelijkPage"][0]{
  title,
  hero ${HERO},
  stats[]{ _key, value, label },
  audiences{ head ${SECTION_HEAD}, cards[] ${CARD} },
  services{ head ${SECTION_HEAD}, items },
  werkwijze ${WERKWIJZE},
  projects{ head ${SECTION_HEAD}, items[defined(@->_id)]-> ${ZAKELIJK_CARD}, link ${LINK} },
  trust[]{ _key, icon, title, text },
  faq ${FAQ},
  cta ${CTA},
  seo ${SEO}
}`);

export const PROJECTS_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "projectsPage"][0]{ title, intro ${INTRO}, filterAll, cta ${CTA}, seo ${SEO} },
  "categories": *[_type == "category" && isZakelijk != true] | order(order asc){ _id, title },
  "projects": *[_type == "project" && category->isZakelijk != true] | order(date desc) ${PROJECT_CARD}
}`);

export const ZAKELIJK_PROJECTS_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "zakelijkProjectsPage"][0]{
    title,
    breadcrumb,
    intro ${INTRO},
    filterAll,
    filterVve,
    filterCorporatie,
    filterBedrijf,
    soonTitle,
    soonText,
    cta ${CTA},
    seo ${SEO}
  },
  "projects": *[_type == "project" && category->isZakelijk == true] | order(date desc) ${ZAKELIJK_CARD}
}`);

export const REVIEWS_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "reviewsPage"][0]{
    title,
    intro ${INTRO},
    scoreCaption,
    googleLabel,
    filterAll,
    leave,
    cta ${CTA},
    seo ${SEO}
  },
  "reviews": *[_type == "review"] | order(order asc) ${REVIEW}
}`);

const BLOG_CARD = /* groq */ `{
  _id,
  title,
  "href": "/blog/" + slug.current + "/",
  excerpt,
  readTime,
  image ${IMAGE},
  "category": category->{ _id, title }
}`;

export const BLOG_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "blogPage"][0]{ title, intro ${INTRO}, filterAll, readMore, cta ${CTA}, seo ${SEO} },
  "categories": *[_type == "category"] | order(order asc){ _id, title },
  "posts": *[_type == "blogPost"] | order(featured desc, date desc) ${BLOG_CARD}
}`);

export const BLOG_POST_QUERY = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  date,
  readTime,
  excerpt,
  image ${IMAGE},
  "category": category->{ title },
  body,
  ctaTitle,
  "related": coalesce(
    related[defined(@->_id)]-> ${BLOG_CARD},
    *[_type == "blogPost" && slug.current != $slug] | order(date desc)[0...3] ${BLOG_CARD}
  ),
  "blogTitle": *[_type == "blogPage"][0].title,
  "cta": *[_type == "blogPage"][0].cta ${CTA},
  seo ${SEO}
}`);

export const BLOG_SLUGS_QUERY = defineQuery(
  `*[_type == "blogPost" && defined(slug.current)].slug.current`,
);

export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage"][0]{
  title,
  intro ${INTRO},
  badges,
  infoCards[]{ _key, icon, title, text, show },
  hours{ title, rows[]{ _key, day, time } },
  "form": form-> ${FORM},
  formLead,
  werkgebied ${PLACES},
  faq ${FAQ},
  seo ${SEO}
}`);

/** Every routable document, for the sitemap. */
export const SITEMAP_QUERY = defineQuery(`*[
  _type in ["servicePage", "project", "textPage", "blogPost"] && defined(slug.current) && seo.noIndex != true
]{
  _type,
  _updatedAt,
  "path": select(
    _type == "blogPost" => "/blog/" + slug.current + "/",
    _type == "servicePage" && kind == "zakelijk" => "/zakelijk/" + slug.current + "/",
    "/" + slug.current + "/"
  )
}`);

// ---------------------------------------------------------------------------
// Forms (server side, /api/submit-form)
// ---------------------------------------------------------------------------

/**
 * The fields of one form, flattened: a stepped form contributes every field of
 * every step. This list is the server's allow-list — a key the browser posts
 * that is not in it never reaches the mail.
 */
export const FORM_QUERY = defineQuery(`
  *[_id == $formId && _type == "form"][0]{
    _id,
    title,
    mailRecipients,
    mailSubject,
    mailMessage,
    sendCopyToSubmitter,
    copySubject,
    copyMessage,
    "fields": select(
      mode == "steps" => steps[].fields[]{label, name, type, isRequired},
      fields[]{label, name, type, isRequired}
    )
  }
`);

/** Shared mail and spam settings. Server-side only — it carries secrets. */
export const FORM_SETTINGS_QUERY = defineQuery(`
  *[_type == "formGeneralSettings"][0]{
    adminEmail,
    fromEmail,
    fromName,
    mailLogo,
    primaryColor,
    textColor,
    mailjetApiKey,
    mailjetApiSecret,
    confirmationSubject,
    confirmationMessage,
    recaptchaEnabled,
    recaptchaSecretKey,
    "siteName": *[_type == "siteSettings"][0].name
  }
`);

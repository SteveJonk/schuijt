# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-29T10:00:00.157Z
> Files: 173 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2732 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~705 tok)

## .claude/

- `launch.json` (~121 tok)
- `settings.json` (~514 tok)

## .claude/commands/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .claude/rules/

- `openwolf.md` (~328 tok)

## .cursor/rules/

- `openwolf.mdc` (~87 tok)

## .github/workflows/

- `build-app-image.yml` — CI: Build App Image (~887 tok)
- `deploy-sanity-studio.yml` — CI: Deploy Sanity Studio (~748 tok)

## .opencode/command/

- `reframe.md` — Mode: migrate [framework] (~551 tok)
- `security-audit.md` — Layer 1 — Dependencies (~510 tok)

## .opencode/plugin/

- `openwolf.ts` — OpenWolf plugin entry — installed by `openwolf init --agent opencode`. (~74 tok)

## .opencode/plugin/openwolf/

- `anatomy.ts` — Exports parseAnatomy, serializeAnatomy, extractDescription, STORE_FILE + 12 more (~2922 tok)
  - fn `parseAnatomy` L5-28 (~207 tok)
  - fn `serializeAnatomy` L29-53 (~240 tok)
  - fn `extractDescription` L54-106 (~577 tok)
  - fn `sha256` L107-110 (~33 tok)
  - section `StoreFileEntry` L111-121 (~83 tok)
  - section `AnatomyStoreData` L122-127 (~63 tok)
  - fn `newStore` L128-132 (~64 tok)
  - fn `loadStore` L133-142 (~92 tok)
  - fn `saveStore` L143-157 (~162 tok)
  - fn `renderStore` L158-188 (~380 tok)
  - fn `renderToFile` L189-202 (~146 tok)
  - fn `importFromMarkdown` L203-227 (~305 tok)
  - fn `loadStoreReconciled` L228-240 (~137 tok)
  - fn `lockSleep` L241-244 (~31 tok)
  - fn `withAnatomyLock` L245-276 (~373 tok)
- `fs.ts` — Exports getWolfDir, wolfDirExists, readJSON, writeJSON + 6 more (~538 tok)
  - fn `getWolfDir` L5-8 (~28 tok)
  - fn `wolfDirExists` L9-12 (~31 tok)
  - fn `readJSON` L13-20 (~50 tok)
  - fn `writeJSON` L21-33 (~144 tok)
  - fn `readMarkdown` L34-41 (~41 tok)
  - fn `appendMarkdown` L42-47 (~64 tok)
  - fn `timeShort` L48-52 (~46 tok)
  - fn `timestamp` L53-56 (~22 tok)
  - fn `normalizePath` L57-60 (~24 tok)
  - fn `estimateTokens` L61-64 (~60 tok)
- `index.ts` — Exports OpenWolf (~1081 tok)
- `post-read.ts` — Exports handlePostRead (~629 tok)
  - fn `handlePostRead` L7-57 (~553 tok)
- `post-write.ts` — Exports handlePostWrite, summarizeEdit, autoDetectBugFix, detectFixPattern (~3226 tok)
  - fn `handlePostWrite` L8-39 (~302 tok)
  - fn `updateAnatomy` L40-86 (~473 tok)
  - fn `appendToMemory` L87-114 (~302 tok)
  - fn `trackSession` L115-150 (~338 tok)
  - fn `summarizeEdit` L151-184 (~471 tok)
  - fn `autoDetectBugFix` L185-228 (~523 tok)
  - fn `detectFixPattern` L229-265 (~610 tok)
  - fn `extractChangedLines` L266-270 (~88 tok)
- `pre-read.ts` — Exports handlePreRead (~685 tok)
  - fn `handlePreRead` L7-63 (~613 tok)
- `pre-write.ts` — Exports handlePreWrite (~1167 tok)
  - fn `tokenize` L14-21 (~63 tok)
  - fn `handlePreWrite` L22-35 (~132 tok)
  - fn `checkCerebrum` L36-65 (~369 tok)
  - section `BugEntry` L66-74 (~37 tok)
  - fn `checkBugLog` L75-105 (~399 tok)
- `session.ts` — Exports getSessionState, setSessionState, deleteSession, handleSessionStart (~952 tok)
  - fn `getSessionState` L8-11 (~33 tok)
  - fn `setSessionState` L12-15 (~33 tok)
  - fn `deleteSession` L16-19 (~26 tok)
  - fn `handleSessionStart` L20-89 (~783 tok)
- `stop.ts` — Exports handleStop (~1444 tok)
  - fn `handleStop` L6-35 (~262 tok)
  - fn `checkForMissingBugLogs` L36-50 (~165 tok)
  - fn `buildLedgerEntry` L51-114 (~743 tok)
  - fn `appendSessionSummary` L115-126 (~218 tok)
- `types.ts` — Exports FileRead, FileWrite, SessionState, PartialSessionState + 2 more (~217 tok)

## app/

- `.DS_Store` (~2186 tok)
- `.gitignore` — Git ignore rules (~164 tok)
- `Dockerfile` — Docker container definition (~294 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `netlify.toml` — Netlify publish dir + SECRETS_SCAN_OMIT_KEYS (Sanity + Sentry public vars) (~200 tok)
- `next-env.d.ts` — / <reference types="next" /> (~72 tok)
- `next.config.ts` — Next.js configuration (~570 tok)
- `package-lock.json` — npm lock file (~208491 tok)
- `package.json` — Node.js package manifest (~321 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `sentry.edge.config.ts` — Sentry for the edge runtime (middleware, edge routes). Imported by (~74 tok)
- `sentry.options.ts` — One source of Sentry settings for the client, the server and the edge (~281 tok)
- `sentry.server.config.ts` — Sentry for the Node.js server runtime. Imported by `src/instrumentation.ts`, (~69 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~83166 tok)

## app/design/

- `blog-artikel-voorbeeld.html` — Hoeveel kost sierbestrating per m²? Dit bepaalt de prijs — L. Schuijt Klussenbedrijf (~246659 tok)
- `contact.html` — Contact — L. Schuijt Klussenbedrijf (~10150 tok)
- `index.html` — Preview — L. Schuijt Klussenbedrijf (~1348 tok)
- `project-zakelijk-voorbeeld.html` — Herbestrating gezamenlijke buitenruimte, VvE Heemskerk — L. Schuijt Klussenbedrijf (~81225 tok)
- `reviews.html` — Reviews — L. Schuijt Klussenbedrijf (~10066 tok)
- `zakelijk-hub-v2.html` — Zakelijk — L. Schuijt Klussenbedrijf (~205635 tok)
- `zakelijk-projecten.html` — Zakelijke projecten — L. Schuijt Klussenbedrijf (~9315 tok)
- `zakelijk-vve-vastgoedbeheer.html` — VvE &amp; Vastgoedbeheer — L. Schuijt Klussenbedrijf (~265317 tok)

## app/scripts/

- `check-jsonld.ts` — The smallest thing that fails when the structured data quietly changes. (~2422 tok)
  - fn `node` L37-220 (~2077 tok)
- `check-links.mjs` — Crawls every path in /sitemap.xml and checks that each internal link, image (~657 tok)
  - fn `check` L12-51 (~523 tok)
- `check-queries.ts` — Runs every GROQ query in src/sanity/queries.ts against the seed dataset, (~1412 tok)
  - fn `run` L19-23 (~70 tok)
  - fn `assertLinks` L24-34 (~140 tok)
  - fn `check` L35-42 (~78 tok)
  - fn `main` L43-108 (~922 tok)

## app/scripts/seed/

- `dataset.ndjson` (~154069 tok)
- `index.ts` — Fills Sanity with the site's current content: every page, project, blog (~9357 tok)
  - fn `add` L58-65 (~80 tok)
  - fn `image` L66-72 (~80 tok)
  - fn `ref` L73-73 (~18 tok)
  - fn `internal` L74-79 (~41 tok)
  - fn `external` L80-86 (~37 tok)
  - fn `block` L87-97 (~84 tok)
  - fn `idSafe` L98-102 (~51 tok)
  - fn `slug` L103-105 (~33 tok)
  - fn `linkTo` L106-125 (~233 tok)
  - fn `hero` L126-143 (~197 tok)
  - fn `field` L144-162 (~154 tok)
  - fn `offerteForm` L163-189 (~322 tok)
  - fn `message` L190-353 (~1490 tok)
  - fn `servicePage` L354-477 (~1144 tok)
  - fn `blogId` L478-794 (~3345 tok)
  - fn `withKeys` L795-818 (~247 tok)
  - fn `undot` L819-824 (~61 tok)
  - fn `resolveAssets` L825-830 (~66 tok)
  - fn `main` L831-917 (~1039 tok)

## app/scripts/seed/content/

- `blog.ts` — Heading of the offerte box under the article. (~1707 tok)
- `home.ts` — Exports HERO, PATHS, SERVICES, STEPS + 5 more (~1471 tok)
- `local.ts` — Builds a local landing page from its service, the way the (~1459 tok)
  - fn `localPage` L25-89 (~1165 tok)
  - fn `getLocalPage` L90-100 (~80 tok)
- `privacy.ts` — /privacy-policy/, carried over from the WordPress page. (~996 tok)
- `projects.ts` — ponytail: stand-in photos per category until each post's own photos are (~2301 tok)
  - fn `img` L40-169 (~1560 tok)
  - fn `getProject` L170-208 (~285 tok)
- `reviews.ts` — ponytail: the design's example reviews; replace with the real Google reviews. (~470 tok)
- `routes.ts` — Every URL that lives at the site root, carried over 1:1 from the WordPress (~2586 tok)
  - fn `rootPage` L174-177 (~34 tok)
- `services.ts` — Declares DESIGNED (~6698 tok)
- `types.ts` — The shapes the seed content was written in (the pre-Sanity component props). (~439 tok)
- `wp-posts.ts` — Titles and publish dates of the WordPress posts (from wp-json/wp/v2/posts), (~3228 tok)
- `zakelijk-hub.ts` — Exports HUB_HERO, HUB_STATS, HUB_AUDIENCES, HUB_SERVICES + 3 more (~1316 tok)
- `zakelijk-pages.ts` — /zakelijk/<slug>/ audience pages; same template as the services. (~3496 tok)

## app/src/

- `instrumentation-client.ts` — Sentry in the browser. (~279 tok)
- `instrumentation.ts` — Server-side instrumentation hook. Without `NEXT_PUBLIC_SENTRY_DSN` both (~207 tok)

## app/src/app/

- `global-error.tsx` — Last-resort error boundary: it replaces the root layout, so it renders its (~239 tok)
- `globals.css` — Styles: 4 rules, 33 vars, 1 media queries, 5 animations, 1 layers (~918 tok)
- `layout.tsx` — display (~763 tok)
  - fn `generateMetadata` L29-40 (~99 tok)
  - fn `RootLayout` L41-82 (~382 tok)
- `manifest.json` (~46 tok)
- `not-found.tsx` — NotFound (~204 tok)
- `page.tsx` — generateMetadata (~594 tok)
  - fn `generateMetadata` L19-23 (~50 tok)
  - fn `HomePage` L24-57 (~286 tok)
- `robots.ts` — Served at `/robots.txt`. (~150 tok)
- `sitemap.ts` — Fixed routes (their content lives in singletons) plus every published document. (~246 tok)

## app/src/app/[slug]/

- `page.tsx` — Everything that lived at the WordPress root renders here — services, local (~488 tok)

## app/src/app/api/google-reviews/

- `route.ts` — POST: Google reviews sync (header x-sync-secret = GOOGLE_REVIEWS_SYNC_SECRET, ?dryRun=1, ?trigger=schedule|studio), CORS for the studio. (~700 tok)

## app/src/app/api/submit-form/

- `route.ts` — Bigger uploads are rejected rather than silently dropped from the mail. (~2564 tok)
  - fn `verifyRecaptcha` L13-27 (~156 tok)
  - fn `fail` L28-32 (~57 tok)
  - fn `splitEmails` L33-45 (~109 tok)
  - fn `sendViaMailjet` L46-91 (~396 tok)
  - fn `POST` L92-257 (~1708 tok)

## app/src/app/blog/

- `page.tsx` — generateMetadata (~1417 tok)
  - fn `generateMetadata` L15-19 (~48 tok)
  - fn `BlogPage` L20-103 (~1174 tok)

## app/src/app/blog/[slug]/

- `page.tsx` — generateStaticParams (~1913 tok)
  - fn `generateStaticParams` L19-23 (~42 tok)
  - fn `getPost` L24-26 (~34 tok)
  - fn `generateMetadata` L27-33 (~92 tok)
  - fn `BlogArticlePage` L34-150 (~1516 tok)

## app/src/app/contact/

- `page.tsx` — ICONS — renders form (~1281 tok)
  - fn `generateMetadata` L18-22 (~48 tok)
  - fn `ContactPage` L23-106 (~998 tok)

## app/src/app/projecten/

- `page.tsx` — generateMetadata (~908 tok)
  - fn `generateMetadata` L14-18 (~49 tok)
  - fn `ProjectenPage` L19-68 (~678 tok)

## app/src/app/reviews/

- `page.tsx` — generateMetadata (~1859 tok)
  - fn `generateMetadata` L14-18 (~49 tok)
  - fn `GoogleLogo` L19-29 (~204 tok)
  - fn `ScoreCard` L30-45 (~204 tok)
  - fn `ReviewsPage` L46-136 (~1210 tok)

## app/src/app/zakelijk/

- `page.tsx` — TRUST_ICONS (~2172 tok)
  - fn `generateMetadata` L23-27 (~48 tok)
  - fn `ZakelijkPage` L28-164 (~1799 tok)

## app/src/app/zakelijk/[slug]/

- `page.tsx` — generateStaticParams (~306 tok)

## app/src/app/zakelijk/projecten/

- `page.tsx` — generateMetadata (~768 tok)
  - fn `generateMetadata` L13-17 (~52 tok)
  - fn `ZakelijkProjectenPage` L18-64 (~531 tok)

## app/src/components/

- `JsonLd.tsx` — Put one graph into the page. (~98 tok)
- `TextPageView.tsx` — Plain text pages such as /privacy-policy/, in the blog article's column and type. (~462 tok)
- `TrackingScripts.tsx` — Google Tag Manager and the Meta (Facebook) pixel, both opt-in. (~866 tok)
  - fn `TrackingScriptsHead` L21-62 (~399 tok)
  - fn `TrackingScriptsBody` L63-92 (~222 tok)

## app/src/components/form/

- `fields.tsx` — `compact` is the card in a page's contact band, `stacked` the full card on /contact/. (~1391 tok)
  - fn `linkify` L15-37 (~204 tok)
  - fn `FormField` L38-145 (~994 tok)
- `FormCard.tsx` — For hidden fields: `{{service}}` on service pages. (~461 tok)
- `FormRenderer.tsx` — Public half of the reCAPTCHA settings — the secret stays server-side. (~2879 tok)
  - fn `IconArrowRight` L46-63 (~194 tok)
  - fn `FormRenderer` L64-294 (~2265 tok)

## app/src/components/home/

- `Paths.tsx` — The two entry cards (particulier / zakelijk) overlapping the hero. (~700 tok)
  - fn `Paths` L11-52 (~571 tok)
- `Reviews.tsx` — Reviews (~602 tok)
  - fn `Reviews` L7-44 (~526 tok)
- `Services.tsx` — Services (~656 tok)
  - fn `Services` L9-48 (~554 tok)
- `ZakelijkBand.tsx` — ZakelijkBand (~1074 tok)
  - fn `ZakelijkBand` L14-79 (~908 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — SiteFooter (~964 tok)
  - fn `SiteFooter` L7-98 (~906 tok)
- `SiteHeader.tsx` — isActivePath — uses useState, useEffect (~2239 tok)
  - fn `isActivePath` L13-29 (~140 tok)
  - fn `SiteHeader` L30-199 (~1979 tok)

## app/src/components/project/

- `ProjectGallery.tsx` — Client: project photo grid; click opens photo in native <dialog> lightbox (←/→, Esc, backdrop click). (~900 tok)
- `ProjectDetailView.tsx` — A project (a former WordPress post), particulier or zakelijk. (~1866 tok)
  - fn `ProjectDetailView` L15-141 (~1676 tok)
- `ZakelijkProjectCard.tsx` — ZakelijkProjectCard (~533 tok)
  - fn `ZakelijkProjectCard` L6-41 (~477 tok)

## app/src/components/sections/

- `ContactCta.tsx` — Heading scale: home 36px, service pages 34px, everything else 32px. (~897 tok)
  - fn `ContactCta` L30-77 (~563 tok)
- `Faq.tsx` — Accordion of <details>. `tinted` sits on the pale-blue band (services, zakelijk); (~704 tok)
  - fn `Faq` L13-64 (~576 tok)
- `Hero.tsx` — Gradient hero with photo composition. Variants differ only in spacing and type size. (~1244 tok)
  - fn `Hero` L30-106 (~957 tok)
- `HeroArt.tsx` — Two overlapping, gently bobbing photos with an optional floating badge. (~719 tok)
  - fn `HeroArt` L30-69 (~466 tok)
- `PageIntro.tsx` — Below the text, e.g. filter buttons or badges. (~591 tok)
  - fn `PageIntro` L18-57 (~401 tok)
- `PlacesStrip.tsx` — Centred "werkgebied" band with place chips. `contact` is the roomier /contact/ version. (~504 tok)
  - fn `PlacesStrip` L9-53 (~412 tok)
- `ProjectGrid.tsx` — Masonry-ish photo grid with captions that lift on hover. (~487 tok)
- `Werkgebied.tsx` — Homepage werkgebied: text with place chips beside a photo. Places come from the site settings. (~560 tok)
  - fn `Werkgebied` L11-46 (~418 tok)
- `Werkwijze.tsx` — Wave into the next section. (~450 tok)

## app/src/components/service/

- `ServicePageView.tsx` — One template for every service-shaped page: the services themselves (~1823 tok)
  - fn `Types` L21-51 (~391 tok)
  - fn `Materials` L52-106 (~651 tok)
  - fn `ServicePageView` L107-156 (~489 tok)

## app/src/components/ui/

- `ReviewText.tsx` — Client: review text clipped at 150 chars + "Lees meer" button opening the full review in a native <dialog>. (~600 tok)
- `Stars.tsx` — Five stars filled to a (fractional) rating; `formatScore` -> "4,6". (~300 tok)
- `Button.tsx` — Class string for anything that should look like a button (links, submits). (~456 tok)
- `Breadcrumb.tsx` — Home / … / current page, above a page hero. The last item is the current page. (~368 tok)
- `Button.tsx` — Class string for anything that should look like a button (links, submits). (~451 tok)
- `CountUp.tsx` — Counts from 0 to `value` (ease-out) the first time it is half in view. (~369 tok)
- `Divider.tsx` — Wavy SVG edge pinned to the bottom of a section, filled with the next section's colour. (~154 tok)
- `Filter.tsx` — Category filter whose buttons and items live in different sections (buttons (~504 tok)
  - fn `FilterScope` L12-16 (~54 tok)
  - fn `FilterButtons` L17-48 (~280 tok)
  - fn `FilterItem` L49-53 (~61 tok)
- `icons.tsx` — Stroke icons from the design. Colour follows `currentColor`. (~649 tok)
  - fn `Svg` L8-31 (~125 tok)
  - fn `IconCheck` L32-39 (~42 tok)
  - fn `IconArrow` L40-47 (~45 tok)
  - fn `IconStar` L48-55 (~55 tok)
  - fn `IconPhone` L56-63 (~109 tok)
  - fn `IconMail` L64-72 (~59 tok)
  - fn `IconPin` L73-81 (~62 tok)
  - fn `IconCheckCircle` L82-90 (~56 tok)
  - fn `IconClock` L91-99 (~53 tok)
- `Kicker.tsx` — Light-on-dark version for the navy bands. (~216 tok)
- `LinkButton.tsx` — A studio link rendered as a button; renders nothing without a URL or label. (~131 tok)
- `Reveal.tsx` — Position among its revealing siblings; staggers the entrance by `step` ms, capped at `max` steps. (~306 tok)
- `SanityImage.tsx` — Overrides the alt text from the studio (e.g. '' for purely decorative use). (~238 tok)
- `SectionHead.tsx` — Light text for the navy bands. (~313 tok)
- `Wrap.tsx` — Site content width shell. (~93 tok)

## app/src/hooks/

- `useMobileNav.ts` — Exports useMobileNav (~282 tok)
- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~134 tok)

## app/src/lib/

- `google-reviews.ts` — syncGoogleReviews: Places API (New) -> upsert `review` docs (id googleReview-<id>) + score/count/lastSync on `googleReviews` singleton; patches drafts too. (~2300 tok)
- `reviews.ts` — initials(name), reviewMeta(review) for review cards. (~200 tok)
- `chrome.ts` — Scroll threshold (px) before the header gets the stuck state. (~368 tok)
- # `chrome.ts` — Scroll threshold (px) before the header gets the stuck state. (~368 tok)
- `chrome.ts` — Scroll threshold (px) before the header gets the stuck state. (~62 tok)
- `cn.ts` — Exports cn (~37 tok)
- `env.ts` — Sanity connection details and analytics ids, read from the environment. (~403 tok)
- `form-fields.ts` — Shape and layout rules for CMS-authored forms. No React in here, so the (~1679 tok)
  - fn `toRedirect` L79-93 (~152 tok)
  - fn `toSteps` L94-105 (~123 tok)
  - fn `fillTokens` L106-117 (~126 tok)
  - fn `toFieldRows` L118-136 (~182 tok)
  - fn `toFormDefinition` L137-180 (~444 tok)
- `form-mail.ts` — The mails `POST /api/submit-form` sends. (~1688 tok)
  - fn `escapeHtml` L16-27 (~92 tok)
  - fn `color` L28-32 (~62 tok)
  - fn `tint` L33-50 (~156 tok)
  - fn `renderText` L51-82 (~230 tok)
  - fn `renderFormMail` L83-169 (~990 tok)
- `json-ld.ts` — Structured data (schema.org JSON-LD), built from what is in the CMS. (~2937 tok)
  - fn `absoluteUrl` L32-42 (~123 tok)
  - fn `prune` L43-67 (~295 tok)
  - fn `serializeJsonLd` L68-72 (~54 tok)
  - fn `jsonLdGraph` L73-96 (~278 tok)
  - fn `postalAddress` L97-123 (~280 tok)
  - fn `organizationJsonLd` L124-138 (~129 tok)
  - fn `websiteJsonLd` L139-150 (~82 tok)
  - fn `siteJsonLd` L151-161 (~126 tok)
  - fn `breadcrumbJsonLd` L162-180 (~154 tok)
  - fn `faqQuestions` L181-198 (~192 tok)
  - fn `pageFaqs` L199-215 (~188 tok)
  - fn `pageBreadcrumbLabel` L216-242 (~257 tok)
  - fn `webPageJsonLd` L243-269 (~336 tok)
  - fn `pageJsonLd` L270-276 (~59 tok)
- `site.ts` — The site's own details, as the structured data needs them. They come from (~612 tok)
  - fn `list` L43-46 (~61 tok)
  - fn `resolveSiteInformation` L47-62 (~156 tok)
  - fn `telHref` L63-66 (~29 tok)
  - fn `mailtoHref` L67-72 (~42 tok)

## app/src/sanity/

- `client.ts` — Fetch that degrades instead of throwing. (~301 tok)
- `fetch.ts` — Every page fetch goes through here. Pages are cached and refreshed at most (~365 tok)
- `image-loader.ts` — global `next/image` loader: Sanity CDN renders each width (q=85, auto=format, fit=max); SVGs unscaled (~380 tok)
- `image.ts` — An image as the queries project it (see IMAGE in queries.ts). (~419 tok)
- `metadata.ts` — A page's metadata from its `seo` fields, falling back to the page title. (~248 tok)
- `queries.ts` — Path of a servicePage in the current scope. (~3358 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~47867 tok)
- `schema.json` (~44587 tok)
- `types.ts` — Short names for the query result shapes components render. All derived (~578 tok)

## docs/

- `handleiding-sanity.md` — Handleiding: de website beheren in Sanity (~3174 tok)

## studio/

- `.gitignore` — Git ignore rules (~143 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171490 tok)
- `package.json` — Node.js package manifest (~301 tok)
- `README.md` — Project documentation (~431 tok)
- `sanity.cli.ts` — Typegen runs from the studio — the CLI needs a studio project root — but (~270 tok)
- `sanity.config.ts` — Project id and dataset come from the environment so the studio and the app (~498 tok)
- `structure.ts` — Dienstpagina's of one kind, created with that kind preset. (~1176 tok)
  - fn `singleton` L11-18 (~80 tok)
  - fn `servicePages` L19-113 (~966 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)
- `tsconfig.tsbuildinfo` (~36550 tok)

## studio/.sanity/runtime/

- `app.js` — This file is auto-generated on 'sanity dev' (~88 tok)
- `index.html` — Sanity Studio (~2316 tok)

## studio/schemaTypes/

- `fields.ts` — Small field helpers so the schema files read as a list of what an editor (~680 tok)
  - fn `split` L19-23 (~39 tok)
  - fn `str` L24-26 (~38 tok)
  - fn `txt` L27-53 (~213 tok)
  - fn `strList` L54-56 (~51 tok)
  - fn `imgList` L57-87 (~220 tok)
- `index.ts` — Singletons: one document each, with `_id` equal to the type name. (~564 tok)

## studio/schemaTypes/documents/

- `blogPost.ts` — /blog/<slug>/ (~711 tok)
- `category.ts` — Sierbestrating, Schuttingbouw, … and Zakelijk. Groups projects and blog posts. (~295 tok)
- `formType.ts` — Multi-step forms keep their fields under `steps`, simple ones under `fields`. (~2578 tok)
  - fn `isSteps` L5-274 (~2520 tok)
- `project.ts` — A project (a WordPress post): /<slug>/. (~1148 tok)
- `review.ts` — Exports reviewType (~335 tok)
- `servicePage.ts` — Every page built on the "dienst" design: the services (/sierbestrating/), (~1215 tok)
- `textPage.ts` — Plain text pages such as /privacy-policy/. (~299 tok)

## studio/schemaTypes/objects/

- `formFieldType.ts` — Hide a setting unless the field's input type is one of these. (~1306 tok)
- `linkType.ts` — A link with its own label: either to a page in the studio (keeps working when (~583 tok)
- `sections.ts` — Kicker + heading + intro above a section. (~1518 tok)
- `seoType.ts` — Exports seoType (~258 tok)

## studio/schemaTypes/singletons/

- `formGeneralSettingsType.ts` — Mail and spam settings shared by every `form`. A singleton. (~1516 tok)
- `pages.ts` — Exports homePageType, zakelijkPageType, projectsPageType, zakelijkProjectsPageType + 3 more (~3368 tok)
  - fn `title` L8-10 (~29 tok)
  - fn `statArray` L11-377 (~3232 tok)
- `settings.ts` — Every short interface text that is not part of one page's content. (~1859 tok)

## studio/tools/

- `GoogleReviewsSync.tsx` — Field component on Google-koppeling: secret (localStorage), dry-run / sync buttons, result table. (~1700 tok)
- `mediaData.ts` — Queries, types and formatting helpers for the Media panel (`MediaTool.tsx`). (~2006 tok)
  - fn `typeLabel` L113-116 (~25 tok)
  - fn `isImage` L117-121 (~71 tok)
  - fn `uploadKind` L122-125 (~38 tok)
  - fn `formatBytes` L126-134 (~103 tok)
  - fn `formatDate` L135-141 (~74 tok)
  - fn `formatDimensions` L142-147 (~70 tok)
  - fn `displayName` L148-159 (~95 tok)
  - fn `matchesSearch` L160-185 (~213 tok)
  - fn `matchesFilter` L186-201 (~136 tok)
  - fn `dedupeUsage` L202-217 (~165 tok)
  - fn `thumbnailUrl` L218-221 (~36 tok)
- `mediaStyles.ts` — The Media panel's own styles, on top of `panelStyles.ts`. Same approach — (~1416 tok)
- `MediaTool.tsx` — The media library in the studio: every upload in one place, searchable, with (~4572 tok)
  - fn `MediaLibrary` L63-313 (~2237 tok)
  - fn `MediaCard` L314-349 (~284 tok)
  - fn `MediaDetail` L350-521 (~1435 tok)
- `panelStyles.ts` — Shared inline styles for custom studio panels — the parts that any panel (~335 tok)

## app/netlify/functions/

- `keep-warm.mts` — pings site every 10 min. (~200 tok)
- `google-reviews-sync.mts` — @hourly POST /api/google-reviews?trigger=schedule. (~250 tok)

## studio/schemaTypes/singletons/ (addition)

- `googleReviews.ts` — Google-koppeling singleton: placeId, languageCode, enabled, siteUrl; sync-written rating/userRatingCount/lastSync. (~800 tok)

## app/scripts/ (addition)

- `delete-manual-reviews.ts` — deletes non-Google reviews (+drafts), skips referenced ones; `--dry` lists only. (~700 tok)
- `backfill-google-reviews.ts` — one-off: all Google reviews via SerpApi (syncGoogleReviews all:true), create-only; `--dry` lists only. (~350 tok)
- `update-navigation.ts` — patches only `links` of the navigation doc (Diensten submenu per service page, Zakelijk → Algemeen/VvE/Woningcorporaties); `--dry` prints. (~600 tok)
- `projects/fetch-wp.ts` — `npm run projects:fetch`: all WP posts (paginated) → `projects/wp-projects.json` (slug, title, date, category, featured + gallery original URLs, paragraphs with <strong>). (~1000 tok)
- `projects/wp-projects.json` — 102 scraped WordPress projects. (~25k tok)
- `projects/ai-fields.json` — per slug: subline, meta (Kenmerken pairs), works, card (zakelijk only); written by Claude from the post text. (~20k tok)
- `projects/seed-projects.ts` — `npm run projects:seed[:dry]`: uploads photos (dedup via asset source.id = WP URL), createOrReplace `project-<slug>`, discards project drafts, deletes projects not on WP. (~1500 tok)

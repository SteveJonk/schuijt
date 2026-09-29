# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-28T10:00:00.114Z
> Files: 156 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.DS_Store` (~2186 tok)
- `AGENTS.md` — OpenWolf (~68 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `README.md` — Project documentation (~6932 tok)

## .claude/

- `launch.json` (~48 tok)
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

- `.DS_Store` (~1640 tok)
- `.gitignore` — Git ignore rules (~150 tok)
- `Dockerfile` — Docker container definition (~294 tok)
- `eslint.config.mjs` — ESLint flat configuration (~124 tok)
- `next-env.d.ts` — / <reference types="next" /> (~72 tok)
- `next.config.ts` — Next.js configuration (~526 tok)
- `package-lock.json` — npm lock file (~208491 tok)
- `package.json` — Node.js package manifest (~260 tok)
- `postcss.config.mjs` — Declares config (~26 tok)
- `sentry.edge.config.ts` — Sentry for the edge runtime (middleware, edge routes). Imported by (~74 tok)
- `sentry.options.ts` — One source of Sentry settings for the client, the server and the edge (~281 tok)
- `sentry.server.config.ts` — Sentry for the Node.js server runtime. Imported by `src/instrumentation.ts`, (~69 tok)
- `tsconfig.json` — TypeScript configuration (~192 tok)
- `tsconfig.tsbuildinfo` (~80606 tok)

## app/design/

- `blog-artikel-voorbeeld.html` — Hoeveel kost sierbestrating per m²? Dit bepaalt de prijs — L. Schuijt Klussenbedrijf (~246659 tok)
- `contact.html` — Contact — L. Schuijt Klussenbedrijf (~10150 tok)
- `index.html` — Preview — L. Schuijt Klussenbedrijf (~1348 tok)
- `project-zakelijk-voorbeeld.html` — Herbestrating gezamenlijke buitenruimte, VvE Heemskerk — L. Schuijt Klussenbedrijf (~81225 tok)
- `reviews.html` — Reviews — L. Schuijt Klussenbedrijf (~10066 tok)
- `zakelijk-hub-v2.html` — Zakelijk — L. Schuijt Klussenbedrijf (~205635 tok)
- `zakelijk-projecten.html` — Zakelijke projecten — L. Schuijt Klussenbedrijf (~9315 tok)
- `zakelijk-vve-vastgoedbeheer.html` — VvE &amp; Vastgoedbeheer — L. Schuijt Klussenbedrijf (~265317 tok)

## app/public/__design/

- `blog-artikel-voorbeeld.html` — Hoeveel kost sierbestrating per m²? Dit bepaalt de prijs — L. Schuijt Klussenbedrijf (~6229 tok)
- `blog-overzicht.html` — Blog — L. Schuijt Klussenbedrijf (~6688 tok)
- `contact.html` — Contact — L. Schuijt Klussenbedrijf (~6889 tok)
- `homepage.html` — L. Schuijt Klussenbedrijf — Sierbestrating, schuttingbouw en tuinaanleg (~11896 tok)
- `particulier-projecten.html` — Projecten — L. Schuijt Klussenbedrijf (~6632 tok)
- `project-particulier-voorbeeld.html` — Complete tuinaanleg met verdiepte trampoline — L. Schuijt Klussenbedrijf (~6504 tok)
- `project-zakelijk-voorbeeld.html` — Herbestrating gezamenlijke buitenruimte, VvE Heemskerk — L. Schuijt Klussenbedrijf (~6427 tok)
- `reviews.html` — Reviews — L. Schuijt Klussenbedrijf (~6805 tok)
- `schuttingbouw.html` — Schuttingbouw — L. Schuijt Klussenbedrijf (~9455 tok)
- `seo-schuttingbouw-heemskerk.html` — Schuttingbouw in Heemskerk — L. Schuijt Klussenbedrijf (~9839 tok)
- `sierbestrating.html` — Sierbestrating — L. Schuijt Klussenbedrijf (~9483 tok)
- `terrasreiniging.html` — Terrasreiniging — L. Schuijt Klussenbedrijf (~9439 tok)
- `tuinaanleg.html` — Tuinaanleg — L. Schuijt Klussenbedrijf (~9399 tok)
- `zakelijk-hub-v2.html` — Zakelijk — L. Schuijt Klussenbedrijf (~10654 tok)
- `zakelijk-projecten.html` — Zakelijke projecten — L. Schuijt Klussenbedrijf (~6054 tok)
- `zakelijk-vve-vastgoedbeheer.html` — VvE &amp; Vastgoedbeheer — L. Schuijt Klussenbedrijf (~9580 tok)
- `zakelijk-woningcorporaties.html` — Woningcorporaties — L. Schuijt Klussenbedrijf (~9560 tok)

## app/scripts/

- `check-jsonld.ts` — The smallest thing that fails when the structured data quietly changes. (~2615 tok)
  - fn `node` L37-230 (~2266 tok)

## app/src/

- `instrumentation-client.ts` — Sentry in the browser. (~279 tok)
- `instrumentation.ts` — Server-side instrumentation hook. Without `NEXT_PUBLIC_SENTRY_DSN` both (~207 tok)

## app/src/app/

- `global-error.tsx` — Last-resort error boundary: it replaces the root layout, so it renders its (~239 tok)
- `globals.css` — Styles: 4 rules, 33 vars, 1 media queries, 5 animations, 1 layers (~918 tok)
- `layout.tsx` — display (~521 tok)
  - fn `RootLayout` L40-66 (~184 tok)
- `manifest.json` (~46 tok)
- `not-found.tsx` — NotFound (~193 tok)
- `page.tsx` — HomePage (~494 tok)
- `robots.ts` — Served at `/robots.txt`. (~150 tok)
- `sitemap.ts` — Every CMS page, listed from the CMS itself. (~313 tok)

## app/src/app/api/submit-form/

- `route.ts` — Google's siteverify. Returns false on any doubt — this gate fails closed. (~1540 tok)
  - fn `verifyRecaptcha` L9-23 (~156 tok)
  - fn `fail` L24-33 (~102 tok)
  - fn `sendViaMailjet` L34-73 (~310 tok)
  - fn `POST` L74-166 (~880 tok)

## app/src/components/

- `JsonLd.tsx` — Put one graph into the page. (~98 tok)
- `OfferteForm.tsx` — `cta` is the short card in every page's contact band; `contact` the full one on /contact. (~2342 tok)
  - fn `Input` L34-51 (~96 tok)
  - fn `Extra` L52-63 (~130 tok)
  - fn `OfferteForm` L64-239 (~1733 tok)
- `TrackingScripts.tsx` — Google Tag Manager and the Meta (Facebook) pixel, both opt-in. (~866 tok)
  - fn `TrackingScriptsHead` L21-62 (~399 tok)
  - fn `TrackingScriptsBody` L63-92 (~222 tok)

## app/src/components/home/

- `HomeHero.tsx` — HomeHero (~949 tok)
  - fn `HomeHero` L8-71 (~863 tok)
- `Paths.tsx` — The two entry cards (particulier / zakelijk) overlapping the hero. (~603 tok)
  - fn `Paths` L9-45 (~510 tok)
- `Reviews.tsx` — Reviews (~492 tok)
- `Services.tsx` — Services (~650 tok)
  - fn `Services` L9-50 (~561 tok)
- `ZakelijkBand.tsx` — ZakelijkBand (~1099 tok)
  - fn `ZakelijkBand` L12-87 (~957 tok)

## app/src/components/layout/

- `SiteFooter.tsx` — SiteFooter (~660 tok)
  - fn `SiteFooter` L6-66 (~613 tok)
- `SiteHeader.tsx` — isActivePath (~1900 tok)
  - fn `isActivePath` L13-17 (~46 tok)
  - fn `SiteHeader` L18-167 (~1737 tok)

## app/src/components/sections/

- `ContactCta.tsx` — The contact band with the offerte form that closes every page. (~614 tok)
  - fn `ContactCta` L14-56 (~485 tok)
- `HeroArt.tsx` — Service pages use a slightly smaller composition than the homepage. (~640 tok)
  - fn `HeroArt` L14-57 (~527 tok)
- `ProjectGrid.tsx` — Masonry-ish photo grid with captions that lift on hover. (~512 tok)
  - fn `ProjectGrid` L17-45 (~408 tok)
- `Werkgebied.tsx` — PLACES (~533 tok)
  - fn `Werkgebied` L18-55 (~439 tok)
- `Werkwijze.tsx` — Wave into the next section. (~451 tok)

## app/src/components/ui/

- `Button.tsx` — Class string for anything that should look like a button (links, submits). (~456 tok)
- `CountUp.tsx` — Counts from 0 to `value` (ease-out) the first time it is half in view. (~369 tok)
- `Divider.tsx` — Wavy SVG edge pinned to the bottom of a section, filled with the next section's colour. (~154 tok)
- `icons.tsx` — Stroke icons from the design. Colour follows `currentColor`. (~478 tok)
- `Kicker.tsx` — Light-on-dark version for the navy bands. (~196 tok)
- `Reveal.tsx` — Position among its revealing siblings; staggers the entrance by 90ms a step (max 5). (~286 tok)
- `SectionHead.tsx` — SectionHead (~211 tok)
- `Wrap.tsx` — Site content width shell. (~93 tok)

## app/src/hooks/

- `useMobileNav.ts` — Exports useMobileNav (~282 tok)
- `useRevealOnScroll.ts` — Exports useRevealOnScroll (~259 tok)
- `useStickyTopbar.ts` — Exports useStickyTopbar (~134 tok)

## app/src/lib/

- `chrome.ts` — Scroll threshold (px) before the header gets the stuck state. (~368 tok)
- `cn.ts` — Exports cn (~37 tok)
- `env.ts` — Sanity connection details and analytics ids, read from the environment. (~403 tok)
- `form-mail.ts` — The mails `POST /api/submit-form` sends. (~1688 tok)
  - fn `escapeHtml` L16-27 (~92 tok)
  - fn `color` L28-32 (~62 tok)
  - fn `tint` L33-50 (~156 tok)
  - fn `renderText` L51-82 (~230 tok)
  - fn `renderFormMail` L83-169 (~990 tok)
- `forms.ts` — The offerte form's fields — the server's allow-list. `POST /api/submit-form` (~351 tok)
- `json-ld.ts` — Structured data (schema.org JSON-LD), built from what is in the CMS. (~2953 tok)
  - fn `absoluteUrl` L32-42 (~123 tok)
  - fn `prune` L43-67 (~295 tok)
  - fn `serializeJsonLd` L68-72 (~54 tok)
  - fn `jsonLdGraph` L73-96 (~278 tok)
  - fn `postalAddress` L97-123 (~287 tok)
  - fn `organizationJsonLd` L124-138 (~129 tok)
  - fn `websiteJsonLd` L139-150 (~82 tok)
  - fn `siteJsonLd` L151-161 (~126 tok)
  - fn `breadcrumbJsonLd` L162-180 (~154 tok)
  - fn `faqQuestions` L181-198 (~192 tok)
  - fn `pageFaqs` L199-215 (~188 tok)
  - fn `pageBreadcrumbLabel` L216-242 (~257 tok)
  - fn `webPageJsonLd` L243-269 (~341 tok)
  - fn `pageJsonLd` L270-276 (~59 tok)
- `links.ts` — The slug of the page that renders at `/`. (~446 tok)
- `site.ts` — Site-wide details, and the defaults they fall back to. (~1274 tok)
  - fn `text` L72-75 (~33 tok)
  - fn `list` L76-90 (~154 tok)
  - fn `resolveSiteInformation` L91-106 (~201 tok)
  - fn `telHref` L107-110 (~29 tok)
  - fn `mailtoHref` L111-127 (~113 tok)

## app/src/lib/content/

- `home.ts` — Exports HERO_USPS, PATHS, SERVICES, STEPS + 5 more (~1366 tok)

## app/src/sanity/

- `client.ts` — Fetch that degrades instead of throwing. (~301 tok)
- `image.ts` — Exports SanityImage, urlFor, imageSrc, toImage (~293 tok)
- `metadata.ts` — The OG image for a page's `seo` object, sized for social cards. (~635 tok)
  - fn `seoImageUrl` L18-39 (~228 tok)
  - fn `pageMetadata` L40-68 (~280 tok)
- `queries.ts` — Resolve internal page references on link/cta objects. (~1362 tok)
- `sanity.types.ts` — --------------------------------------------------------------------------------- (~9726 tok)
- `schema.json` (~25734 tok)
- `site-information.ts` — The site's details, with defaults filled in where the CMS is empty. (~308 tok)

## studio/

- `.gitignore` — Git ignore rules (~143 tok)
- `eslint.config.mjs` — ESLint flat configuration (~21 tok)
- `package-lock.json` — npm lock file (~171738 tok)
- `package.json` — Node.js package manifest (~301 tok)
- `README.md` — Project documentation (~427 tok)
- `sanity.cli.ts` — Typegen runs from the studio — the CLI needs a studio project root — but (~270 tok)
- `sanity.config.ts` — Project id and dataset come from the environment so the studio and the app (~267 tok)
- `structure.ts` — Documents that exist exactly once. They get a fixed `_id` and a top-level (~717 tok)
- `tsconfig.json` — TypeScript configuration (~120 tok)

## studio/schemaTypes/

- `faqType.ts` — Exports faqType (~238 tok)
- `footerType.ts` — Exports footerType (~584 tok)
- `formGeneralSettingsType.ts` — Mail and spam settings shared by every `form`. A singleton. (~1444 tok)
- `formType.ts` — Multi-step forms keep their fields under `steps`, simple ones under `fields`. (~2578 tok)
  - fn `isSteps` L5-274 (~2520 tok)
- `index.ts` — Every schema type the studio knows about. (~527 tok)
- `navigationType.ts` — Exports navigationType (~363 tok)
- `pageBuilderType.ts` — The block list editors can insert on a page. (~238 tok)
- `pageType.ts` — Exports pageType (~213 tok)
- `siteInformationType.ts` — Who the site belongs to: the details that appear in the header, the footer (~1013 tok)

## studio/schemaTypes/blocks/

- `benefitsType.ts` — Exports benefitsType (~638 tok)
- `contactFormType.ts` — A form from Forms, with a contact panel beside it. (~798 tok)
- `crossLinksType.ts` — Exports crossLinksType (~319 tok)
- `ctaBandType.ts` — Exports ctaBandType (~334 tok)
- `faqsType.ts` — Exports faqsType (~264 tok)
- `heroType.ts` — Exports heroType (~625 tok)
- `introType.ts` — Exports introType (~682 tok)
- `mediaTextType.ts` — Exports mediaTextType (~341 tok)
- `pageHeroType.ts` — Exports pageHeroType (~479 tok)
- `servicesType.ts` — Exports servicesType (~681 tok)
- `stepsType.ts` — Exports stepsType (~452 tok)

## studio/schemaTypes/objects/

- `ctaType.ts` — Exports ctaType (~94 tok)
- `formFieldType.ts` — Hide a setting unless the field's input type is one of these. (~1306 tok)
- `linkFields.ts` — Shared internal/external link fields for `link` and `cta` objects. (~407 tok)
- `linkType.ts` — Exports linkType (~54 tok)
- `seoType.ts` — Exports seoType (~231 tok)

## studio/tools/

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

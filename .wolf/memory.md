# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## Session: 2026-09-29 09:02

| Time  | Action                                                                                                                                    | File(s)                                                                                                                                     | Outcome                               | ~Tokens |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------- |
| 21:20 | Added Sanity webhook tag revalidation (/api/revalidate, tag sanity, 3600s fallback) + Netlify keep-warm scheduled function (every 10 min) | app/src/app/api/revalidate/route.ts, app/netlify/functions/keep-warm.mts, app/src/sanity/fetch.ts, app/src/app/sitemap.ts, app/.env.example | typecheck ok, unsigned webhook -> 401 | ~4000   |

## Session: 2026-10-01 16:00

| Time  | Action                                                                                                                                                    | File(s)                                                                                                                                | Outcome                                                 | ~Tokens |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| 16:08 | Two-level navbar: navItem schema (children), GROQ, click-to-expand SiteHeader (desktop dropdown + mobile accordion), seed with Diensten/Zakelijk children | studio/schemaTypes/objects/linkType.ts, app/src/components/layout/SiteHeader.tsx, app/scripts/seed/index.ts, app/src/sanity/queries.ts | typecheck/lint/seed:dry OK; real seed not run (no .env) | ~15000  |

## Session: 2026-10-01 17:03

| Time  | Action                                                                                                                                          | File(s)                                                                           | Outcome                                                  | ~Tokens |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- | ------- |
| 18:30 | Google reviews sync: route, lib, Netlify hourly fn, studio singleton + panel, review schema (no audience), frontend stars/average, seed cleanup | app/src/lib/google-reviews.ts, app/src/app/api/google-reviews/route.ts, studio/\* | tsc/lint ok, studio build ok, sync logic tested w/ fakes | ~60k    |
| 19:10 | Added app/scripts/delete-manual-reviews.ts + npm scripts reviews:delete-manual(:dry); branch restarted from main after PR #3 merge              | app/scripts/delete-manual-reviews.ts, app/package.json, README.md                 | tsc/lint ok, GROQ tested with groq-js                    | ~8k     |

## Session: 2026-09-29 11:03

| Time | Action | File(s) | Outcome | ~Tokens |
| ---- | ------ | ------- | ------- | ------- |

## Session: 2026-10-02 09:02

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:03 | navigation update script (Diensten submenu + Zakelijk Algemeen/VvE/Woco) | app/scripts/update-navigation.ts, app/package.json | dry run + tsc OK, not run live | ~1500 |

## Session: 2026-10-02 09:53

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:54 | all-reviews backfill via SerpApi | app/src/lib/google-reviews.ts, app/scripts/backfill-google-reviews.ts, package.json, .env.example | typecheck+lint ok, dry run reaches SerpApi key check | ~6k |

## Session: 2026-10-02 09:56

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:57 | Home reviews block: removed manual picks, always 3 newest (≥4★) | app/src/sanity/queries.ts, studio/schemaTypes/singletons/pages.ts, sanity.types.ts | tsc ok | ~3k |

## Session: 2026-10-02 10:23

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 10:23 | Fix studio google-reviews CORS: trailingSlash 308 on preflight; call /api/google-reviews/ | studio/tools/GoogleReviewsSync.tsx, app/netlify/functions/google-reviews-sync.mts | fixed | ~2k |

## Session: 2026-10-05 08:28

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 08:30 | Review text clipped at 150 chars + 'Lees meer' native <dialog> (home + /reviews); uiText reviewReadMore/reviewClose fields | app/src/components/ui/ReviewText.tsx, app/src/app/reviews/page.tsx, app/src/components/home/Reviews.tsx, studio settings.ts, seed | verified in browser | ~6k |
| 10:50 | Fix: revalidateTag 'max' -> { expire: 0 } (stale page re-cached at Netlify edge for an hour) | app/src/app/api/revalidate/route.ts, app/src/app/api/google-reviews/route.ts | tsc+eslint clean, pushed to claude/revalidate-expire-now | ~30k |

## Session: 2026-10-05 09:40

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 10:30 | Project seed from live WordPress: fetch script, AI fields for 102 posts, seed script + npm scripts | app/scripts/projects/*, app/package.json | dry run OK, 361 photo URLs 200; real seed not run yet | ~90k |

## Session: 2026-10-05 10:34

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 12:00 | zakelijk projecten filter → category instead of audience; removed audience + filterVve/Corporatie/Bedrijf | queries.ts, zakelijk/projecten/page.tsx, studio project.ts/pages.ts, seed | ok | ~6k |

## Session: 2026-10-05 10:49

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 12:00 | Nav: only most specific child link active (Algemeen + Projecten both highlighted on /zakelijk/projecten) | app/src/components/layout/SiteHeader.tsx | fixed, tsc ok | ~2k |
| 12:30 | Revalidate webhook: drop parseBody wait (3s/call queued bulk publishes, later 30s timeouts); webhook URL needs trailing slash | app/src/app/api/revalidate/route.ts | done, tsc ok | ~3k |

## Session: 2026-10-05 11:06

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 10:00 | Project gallery lightbox: native <dialog>, arrows/Esc/backdrop close; grid moved into client ProjectGallery | app/src/components/project/ProjectGallery.tsx, ProjectDetailView.tsx | verified in browser | ~3k |
| 19:30 | Ported starter PR #8 image quality: loader q 75→85, SVGs unscaled, crop h kept to aspect, rect commas kept (global loader kept, no ui/Image wrapper needed) | app/src/sanity/image-loader.ts | tsc+eslint clean | ~4k |
| 19:45 | Ported starter PR #8 media panel 'Delete unused images' (refetch, batches of 50, one-by-one fallback, PDFs kept) | studio/tools/MediaTool.tsx, mediaData.ts | patch applied cleanly; tsc+eslint clean | ~3k |
| 18:13 | Sentry prep: Sentry DSN/sample rate/org/project added to Netlify SECRETS_SCAN_OMIT_KEYS (en-jonk: netlify.toml created) | app/netlify.toml | done, not committed | ~2k |
| 12:00 | Sentry test page /sentry-test/ (noindex) + always-failing /api/sentry-test/ + client SentryTest buttons | app/src/app/sentry-test/page.tsx, app/src/app/api/sentry-test/route.ts, app/src/components/SentryTest.tsx | tsc+eslint clean; dev: API 500 + error logged (page needs Sanity, not renderable in sandbox) | ~6k |
| 13:00 | Sentry test page gated by SENTRY_TEST_SECRET: ?secret= on the page, x-sentry-test-secret header on the API, 404 otherwise/unset; secret stripped from URL; no-referrer | app/src/lib/sentry-test.ts, sentry-test page/route, SentryTest.tsx, .env.example | tsc+eslint clean; dev: API 404/404/404/500, page 404/404/200 (en-jonk; schuijt API only, layout needs Sanity) | ~8k |

## Session: 2026-10-09 09:00

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 09:04 | Mail provider select (Mailjet/SMTP via nodemailer), schema+query+typegen+env example+README; tested vs local SMTP sink | app/src/app/api/submit-form/route.ts, studio/schemaTypes/singletons/formGeneralSettingsType.ts, app/src/sanity/queries.ts, app/.env.example, README.md | ok | ~25k |
| 09:11 | Send test mail button: lib/mail.ts extracted, lib/secret.ts shared, /api/test-mail route, studio MailTest panel; tested vs SMTP sink | app/src/lib/mail.ts, app/src/lib/secret.ts, app/src/app/api/test-mail/route.ts, studio/tools/MailTest.tsx, formGeneralSettingsType.ts | ok | ~30k |
| 09:11 | SMTP password field: validation warning when filled (dataset is public) | studio/schemaTypes/singletons/formGeneralSettingsType.ts | ok | ~1k |

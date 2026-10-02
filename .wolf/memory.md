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

# Memory

> Chronological action log. Hooks and AI append to this file automatically.
> Old sessions are consolidated by the daemon weekly.

## Session: 2026-09-29 09:02

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 21:20 | Added Sanity webhook tag revalidation (/api/revalidate, tag sanity, 3600s fallback) + Netlify keep-warm scheduled function (every 10 min) | app/src/app/api/revalidate/route.ts, app/netlify/functions/keep-warm.mts, app/src/sanity/fetch.ts, app/src/app/sitemap.ts, app/.env.example | typecheck ok, unsigned webhook -> 401 | ~4000 |

## Session: 2026-10-01 16:00

| Time | Action | File(s) | Outcome | ~Tokens |
|------|--------|---------|---------|--------|
| 16:08 | Two-level navbar: navItem schema (children), GROQ, click-to-expand SiteHeader (desktop dropdown + mobile accordion), seed with Diensten/Zakelijk children | studio/schemaTypes/objects/linkType.ts, app/src/components/layout/SiteHeader.tsx, app/scripts/seed/index.ts, app/src/sanity/queries.ts | typecheck/lint/seed:dry OK; real seed not run (no .env) | ~15000 |

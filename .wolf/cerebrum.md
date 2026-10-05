# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-09-28

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings
- Project filters (/projecten/ and /zakelijk/projecten/) both key on `category->_id`; filter buttons come from category docs (isZakelijk splits them). No separate audience field.

- **Project:** schuijt
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

- **Caching:** all page Sanity reads use tag `sanity` (src/sanity/fetch.ts); Sanity webhook POSTs /api/revalidate (secret SANITY_REVALIDATE_SECRET) -> revalidateTag('sanity','max'). Next 16 revalidateTag needs 2nd arg. `npm ci` fails on lockfile sync; use `npm install --no-package-lock`.

- **Google reviews:** Places API (New) `places/{id}` with FieldMask incl. `reviews` returns rating + userRatingCount over all reviews but max 5 review texts; no manager access needed (Business Profile API would need it). Show Google's aggregate, never average the 5. Full history: one-off `npm run reviews:backfill` via SerpApi (`syncGoogleReviews({all:true})`, create-only; SerpApi review_id == Places review id).
- **Studio secrets:** never put secrets in the dataset or SANITY_STUDIO_* env (bundle is public); studio panel keeps the sync secret in localStorage.
- **Seed** `undot()` turns `.` in _id/_ref into `-` (dotted ids are private in Sanity). `npm run check:queries` already fails on main at HOME cta form id (pre-existing).
- **Typegen:** `cd studio && SANITY_STUDIO_PROJECT_ID=dummy123 npm run typegen`; studio build offline needs `--no-auto-updates`.
- **Sync writes** to Sanity must also patch `drafts.<id>` if it exists, or publishing the draft reverts them.

- **Projects** come from `app/scripts/projects/` (real WP content), not `scripts/seed/content/projects.ts` (stand-ins). Main seed `--force`/`--reset` reverts them; run `npm run projects:seed` afterwards. WP REST: `per_page=100` max, `x-wp-totalpages` header; posts repeat galleries in `mobile-only` columns (dedupe img URLs); strip `-WxH` for originals.
- groq-js `evaluate(...).get()` returns a Promise — await it in ad-hoc query tests.

## Do-Not-Repeat
- [2026-10-02] app has `trailingSlash: true` — always call API routes with a trailing slash (`/api/x/`). Cross-origin calls without it get a 308 on the preflight → CORS error.

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

- [2026-09-30] One global cache tag instead of per-type tags: queries join layout/references across types, so per-type tags could leave pages stale. Netlify ISR pages go through the function, so a keep-warm scheduled function (every 10 min, cache-busting query) hides cold starts.

- [2026-10-02] All-reviews backfill uses SerpApi (local SERPAPI_API_KEY), not Business Profile API (needs manager access + API approval).
- [2026-10-01] Reviews: 'zakelijk/particulier' distinction removed from reviews only (the Zakelijk site section/projects stay). Average = Google's rating/userRatingCount, fallback avg of visible Sanity reviews. Sync never deletes reviews (texts accumulate); editors hide via `hidden`.

- [2026-10-05] Project AI fields (Kenmerken etc.) generated once by Claude in-session and committed as ai-fields.json, not via API at seed time: deterministic, reviewable, no key/cost. Replace projects by same id (not delete+create) so home-page references survive.
<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

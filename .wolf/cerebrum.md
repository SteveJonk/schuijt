# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-09-28

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings

- **Project:** schuijt
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

- **Caching:** all page Sanity reads use tag `sanity` (src/sanity/fetch.ts); Sanity webhook POSTs /api/revalidate (secret SANITY_REVALIDATE_SECRET) -> revalidateTag('sanity','max'). Next 16 revalidateTag needs 2nd arg. `npm ci` fails on lockfile sync; use `npm install --no-package-lock`.

- **Google reviews:** Places API (New) `places/{id}` with FieldMask incl. `reviews` returns rating + userRatingCount over all reviews but max 5 review texts; no manager access needed (Business Profile API would need it). Show Google's aggregate, never average the 5.
- **Studio secrets:** never put secrets in the dataset or SANITY_STUDIO_* env (bundle is public); studio panel keeps the sync secret in localStorage.
- **Seed** `undot()` turns `.` in _id/_ref into `-` (dotted ids are private in Sanity). `npm run check:queries` already fails on main at HOME cta form id (pre-existing).
- **Typegen:** `cd studio && SANITY_STUDIO_PROJECT_ID=dummy123 npm run typegen`; studio build offline needs `--no-auto-updates`.
- **Sync writes** to Sanity must also patch `drafts.<id>` if it exists, or publishing the draft reverts them.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

- [2026-09-30] One global cache tag instead of per-type tags: queries join layout/references across types, so per-type tags could leave pages stale. Netlify ISR pages go through the function, so a keep-warm scheduled function (every 10 min, cache-busting query) hides cold starts.

- [2026-10-01] Reviews: 'zakelijk/particulier' distinction removed from reviews only (the Zakelijk site section/projects stay). Average = Google's rating/userRatingCount, fallback avg of visible Sanity reviews. Sync never deletes reviews (texts accumulate); editors hide via `hidden`.

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

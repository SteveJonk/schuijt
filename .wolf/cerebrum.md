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

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

- [2026-09-30] One global cache tag instead of per-type tags: queries join layout/references across types, so per-type tags could leave pages stale. Netlify ISR pages go through the function, so a keep-warm scheduled function (every 10 min, cache-busting query) hides cold starts.

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

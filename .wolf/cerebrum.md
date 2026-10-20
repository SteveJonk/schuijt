# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-10-07

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

## Key Learnings
- [2026-10-20] /bedankt/ (or any thank-you page) is NOT seeded: it only exists if a textPage with that slug is published in the studio; `[slug]` 404s every unknown slug. Seed `--reset` deletes every _id containing a dot, which includes `drafts.*` and `versions.*` (unpublished studio drafts).
- Mail config errors: `resolveMailSettings().missing` lists missing env var names; routes return them in the JSON `message` (FormRenderer still shows the studio text to visitors, so the detail is only in the Network tab and logs).
- `/api/submit-form` returns 502 itself when sendMail throws (not a gateway error). Live mail = SMTP smtp.transip.email:465 ssl; SMTP_USER/SMTP_PASSWORD only in env, not in the studio.
- Hosting is Vercel (migrated from Netlify, 2026-10). Crons live in `app/vercel.json`; Vercel cron sends GET with `Authorization: Bearer $CRON_SECRET` and does not follow redirects, so cron paths need the trailing slash (`trailingSlash: true`).

- [2026-10-07] Sentry test: `/sentry-test` page + `/api/sentry-test` (identical across starter, schuijt, en-jonk). Next 16 GET route handlers are dynamic by default (no `force-dynamic` needed; only `force-static` opts into caching) — Next ships its docs in `node_modules/next/dist/docs/`. Client test error is thrown in a `setTimeout` so React doesn't catch it and Sentry's global handler must.
- Project filters (/projecten/ and /zakelijk/projecten/) both key on `category->_id`; filter buttons come from category docs (isZakelijk splits them). No separate audience field.

- **Project:** schuijt
- **Description:** A block-based website scaffold: Next.js 16 (App Router, React 19, Tailwind v4)

- **Caching:** all page Sanity reads use tag `sanity` (src/sanity/fetch.ts); Sanity webhook POSTs /api/revalidate (secret SANITY_REVALIDATE_SECRET) -> revalidateTag('sanity',{expire:0}). parseBody runs WITHOUT the wait arg (Sanity delivers webhooks serially; 3s wait per call backed up bulk publishes). Webhook URL must end in /api/revalidate/. Next 16 revalidateTag needs 2nd arg. `npm ci` fails on lockfile sync; use `npm install --no-package-lock`.

- **Google reviews:** Places API (New) `places/{id}` with FieldMask incl. `reviews` returns rating + userRatingCount over all reviews but max 5 review texts; no manager access needed (Business Profile API would need it). Show Google's aggregate, never average the 5. Full history: one-off `npm run reviews:backfill` via SerpApi (`syncGoogleReviews({all:true})`, create-only; SerpApi review_id == Places review id).
- **Studio secrets:** never put secrets in the dataset or SANITY_STUDIO_* env (bundle is public); studio panel keeps the sync secret in localStorage.
- **Seed** `undot()` turns `.` in _id/_ref into `-` (dotted ids are private in Sanity). `npm run check:queries` already fails on main at HOME cta form id (pre-existing).
- **Typegen:** `cd studio && SANITY_STUDIO_PROJECT_ID=dummy123 npm run typegen`; studio build offline needs `--no-auto-updates`.
- **Sync writes** to Sanity must also patch `drafts.<id>` if it exists, or publishing the draft reverts them.

- **Projects** come from `app/scripts/projects/` (real WP content), not `scripts/seed/content/projects.ts` (stand-ins). Main seed `--force`/`--reset` reverts them; run `npm run projects:seed` afterwards. WP REST: `per_page=100` max, `x-wp-totalpages` header; posts repeat galleries in `mobile-only` columns (dedupe img URLs); strip `-WxH` for originals.
- **Images:** schuijt uses a GLOBAL `images.loaderFile` (src/sanity/image-loader.ts) since every image is from Sanity — unlike the starter, which wraps next/image in a client `ui/Image` (it has local public/ images). Loader: q=85 default (Next passes quality undefined when no prop), auto=format, fit=max, SVGs pass through unscaled, keeps `rect` commas. Ports from the starter's image components need adapting, not copying.
- **Studio media panel** (studio/tools/MediaTool.tsx, mediaData.ts) is identical to the starter's (only API_VERSION differs), so starter patches apply with `git format-patch | git apply --3way`.
- groq-js `evaluate(...).get()` returns a Promise — await it in ad-hoc query tests.

## Do-Not-Repeat
- [2026-10-09] `tsx -e` evaluates as CJS: no top-level await — wrap ad-hoc scripts in `(async () => {...})()`.
- [2026-10-02] app has `trailingSlash: true` — always call API routes with a trailing slash (`/api/x/`). Cross-origin calls without it get a 308 on the preflight → CORS error.

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

- [2026-10-07] Sentry test page is gated by server-only SENTRY_TEST_SECRET (user asked for a secret in the URL): page takes `?secret=`, client strips it from the address bar (history.replaceState) and sends it to the API as header `x-sentry-test-secret`; unset/wrong → 404 (not 401, so the page's existence isn't revealed). Not in Netlify SECRETS_SCAN_OMIT_KEYS: it's a real secret and never inlined into the bundle.
- [2026-10-07] Test/utility pages are kept out of search with `metadata.robots` noindex/nofollow only, NOT a robots.txt Disallow: a disallowed URL is never crawled, so Google can't see the noindex and may still index the bare URL from links.

- [2026-09-30] One global cache tag instead of per-type tags: queries join layout/references across types, so per-type tags could leave pages stale. Netlify ISR pages go through the function, so a keep-warm scheduled function (every 10 min, cache-busting query) hides cold starts.

- [2026-10-02] All-reviews backfill uses SerpApi (local SERPAPI_API_KEY), not Business Profile API (needs manager access + API approval).
- [2026-10-01] Reviews: 'zakelijk/particulier' distinction removed from reviews only (the Zakelijk site section/projects stay). Average = Google's rating/userRatingCount, fallback avg of visible Sanity reviews. Sync never deletes reviews (texts accumulate); editors hide via `hidden`.

- [2026-10-05] Project AI fields (Kenmerken etc.) generated once by Claude in-session and committed as ai-fields.json, not via API at seed time: deterministic, reviewable, no key/cost. Replace projects by same id (not delete+create) so home-page references survive.
- [2026-10-09] Mail: provider switch Mailjet | SMTP (nodemailer) in submit-form route, `sendMail()` dispatches. No "serverless/no-server" option like WordPress's PHP mail(): that just hands off to the host's sendmail; Netlify functions have none and port 25 is blocked on Lambda, and direct-to-MX from AWS IPs fails SPF/DKIM. SMTP secrets follow the env-wins-over-studio pattern; SMTP timeouts 8s so failure lands inside the function limit.
- [2026-10-09] Test-mail button: own secret MAIL_TEST_SECRET (not the reviews sync secret — not every site has reviews); recipient may be any address (behind the secret), default admin. Tests PUBLISHED settings like the reviews panel. Shared constant-time compare in app/src/lib/secret.ts.
<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-10-16] Next metadata merge (16.x) iterates child keys incl. explicit `undefined` → it wipes the parent/layout value. Never return `key: undefined` from generateMetadata; spread conditionally. Child `openGraph` replaces the layout's openGraph wholesale (no deep merge).
- [2026-10-16] Vercel usage: no Sentry tunnelRoute (each browser event would be a function call), traces sample default 0.1, ISR safety-net REVALIDATE = 1 day (webhook + cron expire the tag on real changes). Dashboard-side still recommended: firewall rule for /wp-* and *.php, ignored build step for app/, region fra1.
- [2026-10-16] Manual cache clear: studio panel reuses SANITY_REVALIDATE_SECRET via x-revalidate-secret header on /api/revalidate (no new env var, no new route); webhook path unchanged (signature).

# STATUS — schuijt

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-10-09 (SMTP mail provider)

---

## ✅ Done

<!-- Move items here from "🚀 Next phase" when finished. Group by area. -->

- Mail provider choice (2026-10-09, uncommitted on main): Formulierinstellingen → Mail provider = Mailjet | SMTP (host, encryption starttls/ssl/none, port, user, password) via nodemailer in `/api/submit-form`. Env overrides: MAIL_PROVIDER, SMTP_HOST/PORT/SECURITY/USER/PASSWORD, MAIL_FROM_EMAIL (MAILJET_FROM_EMAIL still read). Mail code lives in `app/src/lib/mail.ts` (resolveMailSettings + sendMail). "Send test mail" panel (studio/tools/MailTest.tsx) → `POST /api/test-mail/` guarded by MAIL_TEST_SECRET (localStorage in studio, like the reviews secret); uses published settings, site URL from SANITY_STUDIO_SITE_URL or googleReviews.siteUrl. Verified against a local SMTP sink. **Pending:** set MAIL_TEST_SECRET on Netlify, deploy app + studio; per SMTP client set SMTP_PASSWORD on Netlify (not in studio) and press Send test mail.

- Sentry test page (2026-10-07, branch `claude/sentry-test-page-route-acohz1`): `/sentry-test/` (noindex/nofollow, not in sitemap) with buttons for a client error and `/api/sentry-test/` (always throws → onRequestError). Gated by `SENTRY_TEST_SECRET`: open with `?secret=<value>`, otherwise 404. Same in en-jonk and the starter. **Pending:** set SENTRY_TEST_SECRET on Netlify, deploy with NEXT_PUBLIC_SENTRY_DSN, open /sentry-test/?secret=…, press both, check Sentry → Issues.

- Sharper images (2026-10-05): Sanity loader now q=85, SVGs unscaled, `rect` crops preserved (ported from starter PR #8). Studio media panel: "Delete unused images" button (also from PR #8). Branch `claude/image-quality-improvements-3uywyn`.

- Real project content (2026-10-05): `app/scripts/projects/` fetches all 102 WP posts and seeds them (photos, text, AI-written subline/Kenmerken/werkzaamheden/zakelijke kaart, zakelijk → audience `vve`). **Pending:** `cd app && npm run projects:seed`. Note: main `npm run seed -- --force/--reset` would overwrite projects with the old stand-ins again — re-run `projects:seed` after it.

- Google reviews sync (2026-10-01): `/api/google-reviews` (secret header, dryRun), Netlify `@hourly` function, `googleReviews` singleton with sync panel, review overview lists in studio, real average from Google on /reviews/, star ratings per review. Removed zakelijk/particulier from reviews (schema `audience`, ui labels, filter, seed mocks).
- Navbar submenus: `navItem` type (link + `children[]`), click-to-expand header (desktop dropdown, mobile accordion, no hover). Seed updated (Diensten → 6 service pages, Zakelijk → Algemeen/VvE/Woningcorporaties). **Pending:** run `npm run seed` in app/ with .env (token) — and re-run once so existing nav doc switches from `link` to `navItem` members.

---

## 🚀 Next phase

**Goal:** Go live with the Google reviews sync (manual setup, no code).

### Acceptance criteria
1. Netlify env has GOOGLE_PLACES_API_KEY, GOOGLE_REVIEWS_SYNC_SECRET, SANITY_API_WRITE_TOKEN.
2. Studio → Reviews → Google-koppeling: Place ID + Website-adres filled and published; dry run OK, then sync.
3. Old mock reviews deleted: `cd app && npm run reviews:delete-manual:dry`, then `npm run reviews:delete-manual` (or delete in the studio).
4. Vaste teksten → "Sterren (schermlezer)" set to "{score} van 5 sterren".

### Open decisions
- All review texts: after the first sync, set SERPAPI_API_KEY in app/.env, run `npm run reviews:backfill:dry` (the newest 5 should say `unchanged`), then `npm run reviews:backfill`.

---

## 📁 Active architecture

- **Stack:** _<frameworks, libraries, runtime>_
- **Key tables / modules:** _<list>_
- **Patterns:** _<conventions enforced project-wide>_

---

## ⚠️ External blockers (don't block coding)

- _<env vars, secrets, external accounts, manual steps>_

---

## 🔧 Useful commands

```bash
# add the most-used commands here so the next session has them ready
```

---

## 📚 References (read IF needed)

- `.wolf/cerebrum.md` — User Preferences + Do-Not-Repeat + Decision Log
- `.wolf/anatomy.md` — token-efficient file index
- `.wolf/buglog.json` — known bugs + fixes

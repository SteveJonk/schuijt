# STATUS — schuijt

> Single source of truth for resuming work. Read this FIRST when starting a session.
> Update this file at the end of every work phase so the next `/clear` resumes in 1 read.
> Last updated: 2026-10-01

---

## ✅ Done

<!-- Move items here from "🚀 Next phase" when finished. Group by area. -->

- Google reviews sync (2026-10-01): `/api/google-reviews` (secret header, dryRun), Netlify `@hourly` function, `googleReviews` singleton with sync panel, review overview lists in studio, real average from Google on /reviews/, star ratings per review. Removed zakelijk/particulier from reviews (schema `audience`, ui labels, filter, seed mocks).
- Navbar submenus: `navItem` type (link + `children[]`), click-to-expand header (desktop dropdown, mobile accordion, no hover). Seed updated (Diensten → 6 service pages, Zakelijk → Algemeen/VvE/Woningcorporaties). **Pending:** run `npm run seed` in app/ with .env (token) — and re-run once so existing nav doc switches from `link` to `navItem` members.

---

## 🚀 Next phase

**Goal:** Go live with the Google reviews sync (manual setup, no code).

### Acceptance criteria
1. Netlify env has GOOGLE_PLACES_API_KEY, GOOGLE_REVIEWS_SYNC_SECRET, SANITY_API_WRITE_TOKEN.
2. Studio → Reviews → Google-koppeling: Place ID + Website-adres filled and published; dry run OK, then sync.
3. Old mock reviews (review-1..6) deleted in the studio (they have no rating, so already hidden on the site).
4. Vaste teksten → "Sterren (schermlezer)" set to "{score} van 5 sterren".

### Open decisions
- Need more than 5 review texts? Only via a paid third-party scraper API (SerpApi/Outscraper) or Business Profile API (needs manager access).

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

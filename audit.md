# Change Audit Log

Per organization policy: production systems must not be modified; development
changes are recorded here.

## 2026-08-11 — Brand landing pages for local SEO (Claude Code session)

**Environment:** local development repository only (working tree, `master`, uncommitted).
**Production impact:** none. No deploy was performed. Firebase RTDB was accessed
read-only (GET on `PAGE_DATA.json`) to verify brand logo alt-text values — no writes.
Deploying these changes to the production site is a separate, user-initiated action
and should be recorded here when it happens.

**Changes made (all local files):**
- `components/seo.tsx` — consolidated duplicated site constants to import from `helper/structured-data.ts` (audit F15).
- `helper/structured-data.ts` — LocalBusiness schema upgraded: `['LocalBusiness','ElectronicsStore']` type, `geo` (40.8693424, -73.4257658, geocoded via OpenStreetMap), `hasMap`, removed misleading Sunday `00:00–00:00` hours (audit F4); added `buildBrandSchema` and `buildBrandWebPageSchema`.
- `components/logoGrid.tsx` + `components/styles/ui.module.css` — fixed 120×48 logo box to eliminate CLS (audit F6); optional per-item `href` linking.
- `data/brands.ts` — NEW: brand data model + 5 seed brands (KEF, Paradigm, Marantz, Sonos, Control4) with DRAFT copy pending client review; `authorizedDealer` is `false` for all brands until client confirms per line.
- `components/brandPageLayout.tsx` + `components/styles/brandPageLayout.module.css` — NEW: brand page template.
- `pages/brands/[slug].tsx` — NEW: dynamic route, SSG + ISR (revalidate 3600), `fallback: false`.
- `pages/products.tsx`, `pages/services/audio.tsx`, `pages/services/video.tsx` — brand logos now link to matching `/brands/[slug]` pages.
- `next-sitemap.config.js` — NEW; `package.json` — added `next-sitemap` devDependency + `postbuild` script; deleted hand-maintained `public/sitemap.xml` (now generated at build).

**Verification:** `next lint` clean; `npm run build` green (5 brand routes SSG'd,
sitemap generated); local `next start` checks: `/brands` still 308→`/products#brands`,
`/brands/kef` 200 with correct title/canonical/4 JSON-LD blocks, unknown slug 404.

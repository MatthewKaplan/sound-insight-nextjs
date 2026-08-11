# SEO Audit Report — sound-insight-nextjs

Date: 2026-08-06
Auditor: Technical SEO review (full repository)
Scope: all pages, components, helpers, config, crawl files, structured data, build/deploy setup

> Context: this audit follows the Phase 1–2 remediation documented in
> `WIP/seo-analysis-and-remediation-plan-2026-08-06.md`. The critical issues from that
> plan (global homepage canonical, missing robots/sitemap, broken links, orphaned
> security page, failing build) are confirmed **fixed** in the current tree. This
> report covers what remains.

---

## 1. Executive Summary

The site is now on a solid technical SEO foundation: every customer-facing page is
statically generated with ISR (`revalidate: 3600`), emits a self-referential
canonical, correct `property=` Open Graph tags, and appropriate JSON-LD
(`Organization`, `LocalBusiness`, `ContactPage`, `BreadcrumbList`, `Service`).
`robots.txt` and `sitemap.xml` exist and match the route set. Redirects preserve
legacy URLs (`/services/phoneSystems`, `/brands`, `/careers`). Semantic HTML is
strong: one `<h1>` per page, `<main>` landmark, skip link, labeled navs, breadcrumb
UI, meaningful alt text.

What remains falls into four buckets:

1. **Metadata quality** — several titles/descriptions are legacy copy: brand-first,
   pipe-stuffed titles; Title-Case descriptions; an unverifiable "#1" claim; a
   "Piece Of Mind" typo; one description that mentions a service ("IT solutions")
   the site doesn't offer.
2. **Social/sharing presentation** — the default OG/Twitter image is the company
   logo JPG, which renders badly as a `summary_large_image` card; `twitter:site`
   points to a personal account.
3. **Local-SEO schema depth** — `LocalBusiness` lacks `sameAs`, `geo`, `hasMap`,
   and a more specific `@type`; there is no `WebSite` schema for site-name display.
4. **Performance/CWV micro-optimizations** — no preconnect to the Cloudinary origin
   that serves every LCP hero image, dimensionless `<img>` tags in the logo grids
   (CLS risk), two `priority` images competing per page, no AVIF.

Plus housekeeping: a dead `security.txt` React component tracked at the repo root,
a stale `out/` static export containing an outdated sitemap, no custom 404 page,
invalid Dublin Core meta tags, and a duplicated `SITE_URL` constant.

**No Critical-severity issues remain.**

## 2. SEO Score: 82 / 100

| Category | Score | Notes |
| --- | --- | --- |
| Indexability & crawlability | 95 | Canonicals, robots, sitemap, redirects all correct |
| Metadata implementation | 70 | Mechanics right; copy quality drags it down |
| Structured data | 80 | Right types present; missing local-SEO depth |
| Social sharing | 60 | Logo used as share image; personal Twitter handle |
| Performance / CWV | 78 | SSG+ISR, next/font, next/image; missing preconnect, CLS risk in logo grids |
| Semantic HTML & a11y | 92 | Excellent structure |
| Content & internal linking | 75 | Good nav/footer graph; no cross-links between sibling services, no FAQ content |

---

## 3. Detailed Findings

### F1 — Default social share image is the logo JPG · **High**

**Why it matters:** every page declares `twitter:card = summary_large_image` but the
fallback image (`WIgvnFB_swl61h.jpg`) is a small logo. Large-image cards expect
~1200×630. Shares on X, Facebook, LinkedIn, iMessage, Slack will render a stretched
or letterboxed logo — hurting CTR from social and messaging apps.

**Files:** `components/seo.tsx:20`, `helper/structured-data.ts:12`

**Current:**
```ts
const DEFAULT_IMAGE = 'https://res.cloudinary.com/sound-insight/image/upload/v1640911039/WIgvnFB_swl61h.jpg';
```

**Recommended:** produce a branded 1200×630 social card (showroom/home-cinema photo
with logo overlay), upload to Cloudinary, and use it as `DEFAULT_IMAGE` /
`DEFAULT_SOCIAL_IMAGE`. Keep the logo URL as a separate `LOGO_URL` constant for the
`Organization.logo` schema property (a logo *is* correct there). Also add
`og:image:width`/`og:image:height` (1200/630) and `twitter:image:alt`.

Per-page: pass each page's hero image via the existing `images` prop so shares show
the relevant room/service photo rather than the generic card.

---

### F2 — Legacy, low-quality meta descriptions · **High**

**Why it matters:** descriptions are your SERP ad copy. Title-Case sentences, ALL-CAPS
shouting, unverifiable superlatives, and inaccurate service claims depress CTR and
can trip Google's rewrite heuristics (Google then substitutes its own snippet).

**Instances:**

| File | Problem |
| --- | --- |
| `pages/contact.tsx:30` | "FREE ESTIMATES! #1 AV on Long Island." — all-caps + unverifiable superlative |
| `pages/services/index.tsx:52` | 199 chars (will truncate), claims "IT solutions" not offered anywhere on the site, "New York's #1" puffery |
| `pages/services/audio.tsx:22` | Title Case Throughout ("Whether You Wish to Spin Vinyl…") |
| `pages/services/automation.tsx:18` | Title Case + typo **"Piece Of Mind"** → "peace of mind" |
| `pages/services/video.tsx:20` | Only ~75 chars — too thin; wastes the snippet |

**Recommended pattern** (140–160 chars, sentence case, local qualifier, CTA):

```tsx
// pages/services/automation.tsx
description="Smart home automation on Long Island — lighting, shades, climate,
audio, and security on one simple interface. Designed and installed by Sound
Insight in Huntington, NY."
```

Apply the same treatment to all five instances above.

---

### F3 — Brand-first, pipe-stuffed title tags · **High**

**Why it matters:** every title leads with "Sound Insight - " and appends pipe-separated
keyword lists (`TVs | Speakers | Amplifiers | Turntables | Streamers`). Google
truncates at ~580px (~60 chars), so the differentiating keywords fall off, every
SERP entry looks identical, and pipe-lists read as keyword stuffing (a common
trigger for title rewrites). Primary keywords should lead; brand should trail.

**Files & current → recommended:**

| File | Current | Recommended |
| --- | --- | --- |
| `pages/index.tsx:61` | `Sound Insight - Custom AV Solution & Design \| Huntington, NY` | `Custom Audio, Video & Smart Home Installation — Huntington, NY \| Sound Insight` |
| `pages/products.tsx:32` | `Sound Insight - TVs \| Speakers \| Amplifiers \| Turntables \| Streamers` | `Hi-Fi Speakers, TVs & Turntables You Can Demo \| Sound Insight` |
| `pages/services/index.tsx:51` | `Sound Insight - Services \| Audio \| Video \| Home Automation \| Security` | `AV Design & Installation Services on Long Island \| Sound Insight` |
| `pages/services/audio.tsx:21` | `Sound Insight - Home Audio \| Analog \| Digital` | `Home Audio Systems & Hi-Fi Installation, Long Island \| Sound Insight` |
| `pages/services/video.tsx` | `Sound Insight - Video Systems \| Home Theater \| Televisions` | `Home Theater Design & Installation, Long Island \| Sound Insight` |
| `pages/services/automation.tsx` | `Sound Insight - Home Automation \| Smart Home Solutions` | `Smart Home Automation Installation, Long Island \| Sound Insight` |
| `pages/services/security.tsx:16` | `Sound Insight - Security Systems \| Alarms \| Cameras` | `Security Camera & Surveillance Installation, Long Island \| Sound Insight` |
| `pages/services/phone-systems.tsx:16` | `Sound Insight - Phone Systems \| Office Phones \| VoIP Phones` | `Business VoIP & Office Phone Systems, Long Island \| Sound Insight` |
| `pages/gallery.tsx:78` | `Sound Insight - Project Gallery \| Home Theaters \| Outdoor TVs` | `Project Gallery: Home Theaters & AV Installations \| Sound Insight` |
| `pages/about.tsx:42` | fine shape, just reorder | `About Sound Insight — Long Island AV Specialists Since 2002` |
| `pages/contact.tsx:29` | `Sound Insight - Contact Us \| Audio & Video Demos \| Free Estimates` | `Contact Sound Insight — Showroom Visits & Free Estimates, Huntington NY` |

(Adjust wording to real search demand; the structural change — keyword first,
brand last, no pipe-lists — is the point.)

---

### F4 — LocalBusiness schema missing local-SEO essentials · **Medium**

**Why it matters:** for a showroom business, `geo`, `hasMap`, `sameAs`, and a specific
business type are the highest-leverage schema properties — they corroborate the
Google Business Profile and strengthen local pack association. Generic
`LocalBusiness` is valid but weaker than a specific subtype.

**File:** `helper/structured-data.ts:60-95`

**Recommended additions:**
```ts
export const buildLocalBusinessSchema = (path = '/'): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectronicsStore'],   // or HomeAndConstructionBusiness for install focus
  // ...existing properties...
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.8687,      // verify against Google Business Profile pin
    longitude: -73.4257
  },
  hasMap: 'https://maps.google.com/?q=382+New+York+Ave+Huntington+NY+11743',
  sameAs: [
    // real profile URLs — Facebook, Instagram, YouTube, Yelp, GBP short link
  ]
});
```
Add the same `sameAs` array to `buildOrganizationSchema()`. Only include profiles
that actually exist.

Also (Low): the Sunday `OpeningHoursSpecification` with `opens: '00:00', closes:
'00:00'` signals **closed all day** in Google's interpretation, and the
`description: 'By appointment only'` is not surfaced. Either drop the Sunday entry
(footer text already says "By appointment") or leave it knowing it reads as closed.

---

### F5 — No preconnect to the image CDN serving every LCP element · **Medium**

**Why it matters:** every hero image (the LCP element on every page) is served from
`res.cloudinary.com` via the Next image optimizer, and the header logo is fetched
from Cloudinary too. Preconnecting shaves DNS+TLS setup off the critical path.
(If the optimizer proxies images through the same origin, the preconnect still
helps any direct Cloudinary fetches like the `LogoGrid` `<img>` tags.)

**File:** `pages/_document.tsx`

**Recommended:**
```tsx
<Head>
  <link rel="preconnect" href="https://res.cloudinary.com" />
</Head>
```

---

### F6 — `LogoGrid` renders dimensionless `<img>` tags → CLS risk · **Medium**

**Why it matters:** `/products` renders dozens of `<img loading="lazy">` without
`width`/`height`. Unless the CSS fully fixes each cell's box, late-loading logos
shift layout — a direct Cumulative Layout Shift hit on a key commercial page.

**File:** `components/logoGrid.tsx:34`

**Current:**
```tsx
<img src={src} alt={alt ?? ''} loading="lazy" />
```

**Recommended:** add intrinsic dimensions (any consistent box works; CSS scales
within it) so the browser reserves space:
```tsx
<img src={src} alt={alt ?? ''} loading="lazy" width={160} height={80} />
```
…and ensure `.logoCell img { width:100%; height:auto; object-fit:contain; }` (or
verify the existing CSS already fixes cell height — if it does, downgrade this to Low).

---

### F7 — No `WebSite` schema · **Medium**

**Why it matters:** a `WebSite` node with `name`/`alternateName` is Google's
documented input for choosing the **site name** shown above URLs in mobile SERPs.
Cheap to add, sitewide benefit.

**File:** `helper/structured-data.ts` (new builder), emitted from `pages/index.tsx`.

```ts
export const buildWebSiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` }
});
```

---

### F8 — `twitter:site` points to a personal account · **Medium-Low**

**File:** `components/seo.tsx:22` — `const TWITTER_SITE = '@matthewkaplan92';`

Attribution of all site content to a personal developer handle is a branding/trust
issue on every share. Point it at a business account, or remove the tag entirely
(cards render fine without it).

---

### F9 — Invalid Dublin Core meta tags · **Low**

**File:** `components/seo.tsx:83-84`

```tsx
<meta property="dc:title" content={title} />
<meta property="dc:description" content={description} />
```

Dublin Core uses `name="DC.title"` with a profile link, and no search engine uses it
for ranking either way. These two tags are dead weight duplicating `<title>` and the
description on every page — remove them.

---

### F10 — Obsolete `keywords` meta support · **Low**

**File:** `components/seo.tsx:9,72`. No page currently passes `keywords`, but the
prop invites regressions. Google has ignored `meta keywords` since 2009 (and it
leaks keyword strategy to competitors). Remove the prop.

---

### F11 — Missing minor OG/Twitter tags · **Low**

**File:** `components/seo.tsx`

Add:
```tsx
<meta property="og:locale" content="en_US" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:image:alt" content={imageAlt} />
```
(width/height once F1's properly-sized default image exists).

---

### F12 — Single-item BreadcrumbList on the homepage · **Low**

**File:** `pages/index.tsx:67` — `buildBreadcrumbSchema([{ name: 'Home', path: '/' }])`

Google ignores single-item breadcrumb lists; it's schema noise on the most
important page. Remove it (keep breadcrumbs on interior pages, where they're
correct and useful).

---

### F13 — No custom 404 page · **Low-Medium**

**Evidence:** no `pages/404.tsx`. Next's default 404 returns the correct status code
(so no soft-404 risk) but is an unbranded dead end. A custom 404 with links to
services/gallery/contact recovers users and internal link equity from mistyped or
stale URLs.

```tsx
// pages/404.tsx — static, zero data deps
export default function NotFound() {
  return (/* branded page linking to /, /services, /gallery, /contact */);
}
```

---

### F14 — Static sitemap with no lastmod, manually maintained · **Low**

**File:** `public/sitemap.xml`

Coverage is currently complete (all 11 canonical routes, no redirect targets — the
stale `out/sitemap.xml` still lists `/brands` and `/careers` but that file isn't
deployed). Risks: it will silently drift when routes change, and no `<lastmod>`
means Google gets no recrawl hints. Recommend `next-sitemap` (generates at build,
adds lastmod, regenerates robots.txt) or at minimum a checklist rule that route
changes touch the sitemap.

---

### F15 — Duplicated `SITE_URL` / site constants · **Low** (maintainability)

**Files:** `components/seo.tsx:18-21` and `helper/structured-data.ts:10-12` both
define `SITE_NAME`, `SITE_URL`, the default image, and `normalizePath`/
`getAbsoluteUrl`. They agree today; nothing enforces that tomorrow. Canonical vs
schema URL drift is exactly the class of bug the earlier remediation fixed. Have
`components/seo.tsx` import from `helper/structured-data.ts` (or move all site
constants to a `helper/site.ts`).

---

### F16 — Dead files: root `security.txt` and stale `out/` export · **Low**

- `security.txt` (repo root, **tracked in git**) is the old React page component —
  it imports `components/backButton`, which no longer exists, and duplicates
  `pages/services/security.tsx`. It also collides conceptually with RFC 9116
  (`/.well-known/security.txt`), which is a *real* file some scanners request.
  Delete it (git history preserves it).
- `out/` is a stale static export (gitignored, local only) whose `sitemap.xml`
  still lists `/brands` and `/careers`. Harmless unless someone deploys it by
  accident — delete locally to remove the foot-gun.

---

### F17 — Two `priority` images on every page · **Low**

**Files:** `components/header.tsx:72` (logo, `priority`) and `components/hero.tsx:25`
(hero, `priority`). Both are above the fold, but the hero is the LCP element and
the logo competes with it for early bandwidth on every page. The logo is tiny;
drop `priority` from it (it will still load promptly) and reserve preload budget
for the LCP hero.

---

### F18 — Image pipeline: no AVIF · **Low**

**File:** `next.config.js:29-34`. Default output is WebP only. Adding
`formats: ['image/avif', 'image/webp']` typically cuts hero image bytes 20–40%,
directly improving LCP, at the cost of slower first-hit optimization.

---

### F19 — Header hygiene affecting analytics/referrals · **Low** (not directly ranking)

**File:** `next.config.js:18-25`

- `Referrer-Policy: same-origin` sends **no referrer** on outbound cross-origin
  navigation and strips referral data others' analytics would credit you for;
  the standard recommendation is `strict-origin-when-cross-origin`.
- `Permissions-Policy: geolocation=*` grants geolocation to any embedded origin;
  the site never uses geolocation — `geolocation=()` is the correct value.

---

### F20 — Content & internal linking gaps · **Medium** (biggest long-term lever)

- **No cross-links between sibling service pages.** `/services/audio` never links
  to `/services/automation` etc. except via header/footer. A short "Related
  services" block in `components/servicePageLayout.tsx` strengthens the topical
  cluster.
- **No FAQ content/schema.** High-intent questions ("What does a home theater
  cost?", "Do you service systems you didn't install?") are unanswered — the
  natural next content phase, with `FAQPage` schema once real FAQs exist.
- **Gallery items are unindexable as entities.** Captions are good, but projects
  could become case-study content later (already noted as Phase 5 in the prior plan).
- **CMS-sourced `<h1>`s** (`SplashTitle`, `AudioTitle1`, …) can't be audited from
  the repo. Verify in Firebase that each page's h1 contains its primary keyword
  (e.g. the audio page h1 says something like "Home audio, done properly" rather
  than a generic slogan).
- **Anchor text** is generally good ("Explore home automation" etc.); the
  `aria-hidden` "Learn more →" spans in `serviceCard.tsx` are fine since the card
  title is the real link.

---

### F21 — Operational: analytics & Search Console not verifiable in repo · **Info**

- GA4 is correctly gated on `NEXT_PUBLIC_GA_ID` (`pages/_app.tsx:17`) — confirm the
  env var is set in Vercel, otherwise the site ships with zero analytics.
- No Search Console verification artifact found (fine if verified via DNS — confirm).
- Confirm Vercel domain settings enforce a single canonical host
  (www → apex or vice versa, matching `SITE_URL = https://sound-insight.com`).
- Formspree fallback endpoint (`components/inquiryForm.tsx:12`) is flagged in the
  README as possibly non-delivering — a lead-loss risk, not an SEO one, but it's
  the site's whole conversion path. Test it.

### Explicit non-issues (checked, fine)

- hreflang: single-locale English site — not needed.
- Pagination: no paginated archives — not applicable.
- Middleware: none — no crawl interference.
- JS-rendering risk: all content is in the SSG HTML payload; client JS only adds
  interactivity (gallery filter/lightbox, menus). Crawlers see full content.
- Robots directives: no stray `noindex`; default indexable everywhere — correct.
- Canonicals/og:url: self-referential on every page via `components/seo.tsx` — correct.
- Redirects: 3 permanent redirects in `next.config.js` — correct, and redirect
  targets are (correctly) absent from the live sitemap.
- Duplicate content: no parameterized or alternate routes — low risk.
- Fonts: `next/font` with `display: swap` — correct.
- E-commerce schema (Product/Review/AggregateRating): not applicable — no products
  with prices or genuine reviews on-site; do **not** add rating schema without real reviews.

---

## 4. Top 20 Highest-Priority Fixes

| # | Fix | Severity | Ref |
| --- | --- | --- | --- |
| 1 | Branded 1200×630 default social image; per-page hero images for OG | High | F1 |
| 2 | Rewrite 5 legacy meta descriptions (incl. "Piece Of Mind" typo, "IT solutions" claim) | High | F2 |
| 3 | Retitle all 11 pages keyword-first, drop pipe-stuffing | High | F3 |
| 4 | Add `sameAs` + `geo` + `hasMap` + specific `@type` to LocalBusiness/Organization | Medium | F4 |
| 5 | Verify CMS-sourced h1s contain primary keywords | Medium | F20 |
| 6 | Preconnect to `res.cloudinary.com` in `_document` | Medium | F5 |
| 7 | Width/height on `LogoGrid` images (CLS) | Medium | F6 |
| 8 | Add `WebSite` schema | Medium | F7 |
| 9 | "Related services" cross-links in `servicePageLayout` | Medium | F20 |
| 10 | FAQ sections + `FAQPage` schema on service pages | Medium | F20 |
| 11 | Custom `pages/404.tsx` | Low-Med | F13 |
| 12 | Fix/replace `twitter:site` personal handle | Low-Med | F8 |
| 13 | Confirm GA4 env var, Search Console, canonical host on Vercel | Med (ops) | F21 |
| 14 | Consolidate `SITE_URL` constants into one module | Low | F15 |
| 15 | Remove `dc:*` metas and `keywords` prop | Low | F9/F10 |
| 16 | Add `og:locale`, `og:image` dimensions, `twitter:image:alt` | Low | F11 |
| 17 | Remove single-item breadcrumb schema from homepage | Low | F12 |
| 18 | Adopt `next-sitemap` (lastmod, auto-regeneration) | Low | F14 |
| 19 | Delete root `security.txt` + stale `out/`; drop logo `priority`; AVIF | Low | F16/F17/F18 |
| 20 | `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=()` | Low | F19 |

## 5. Quick Wins (< 1 day, mostly < 1 hour each)

- All metadata rewrites (F2, F3) — pure string edits in 11 files
- Preconnect tag (F5) — one line
- Remove `dc:*` / `keywords` / homepage breadcrumb (F9, F10, F12) — deletions
- `og:locale`, `twitter:image:alt` (F11)
- LogoGrid dimensions (F6)
- Delete `security.txt`, `out/` (F16); drop logo `priority` (F17); AVIF config (F18)
- Header values (F19)
- `WebSite` schema (F7)
- Consolidate SITE_URL (F15)
- Custom 404 (F13)

## 6. Medium Improvements (1–5 days)

- Branded OG image production + per-page share images (F1 — needs a designed asset)
- LocalBusiness enrichment (F4 — needs verified coordinates + real profile URLs)
- Related-services cross-linking block (F9/F20)
- `next-sitemap` integration (F14)
- CMS h1/copy review in Firebase (F20)
- Ops verification: GA4, Search Console, canonical host, Formspree delivery (F21)

## 7. Long-Term Improvements

- FAQ content program per service + `FAQPage` schema
- Case-study pages derived from gallery projects (indexable long-tail local content)
- Genuine review acquisition (Google Business Profile first; only add review schema
  when real on-site reviews exist)
- Local landing content strategy (only where unique content justifies it — avoid
  thin town pages)
- Consider App Router migration eventually for the Metadata API and streaming, but
  it is **not** an SEO necessity — the Pages Router implementation here is sound

## 8. Automated Fix Candidates

Safe for scripted/PR automation with lint+build as the gate:

1. Title/description string replacements (F2, F3)
2. `components/seo.tsx` cleanup: remove `dc:*`, `keywords`, add `og:locale` etc. (F9–F11)
3. `_document` preconnect (F5)
4. `next.config.js` header values + `formats` (F18, F19)
5. LogoGrid width/height (F6)
6. Delete dead files (F16)
7. `WebSite` schema builder + homepage wiring (F7)
8. SITE_URL consolidation (F15)
9. `pages/404.tsx` scaffold (F13)
10. `next-sitemap` install + config (F14)

Human-required: OG image design (F1), `sameAs`/geo facts (F4), FAQ copy, CMS
content review, Vercel/Search Console/GA settings.

## 9. Prioritized Remediation Roadmap

**Sprint 1 (½–1 day) — metadata & mechanical quick wins**
F2, F3, F9, F10, F11, F12, F5, F6, F7, F15, F16, F17, F18, F19, F13.
Gate: `npm run lint && npm run build`, spot-check rendered `<head>` on 3 pages.

**Sprint 2 (1–3 days) — sharing & local signals**
F1 (design + wire OG image), F4 (geo/sameAs), F8 (Twitter handle decision),
F14 (next-sitemap). Validate with Rich Results Test + a share-debugger pass
(Facebook Sharing Debugger / X Card Validator).

**Sprint 3 (2–5 days) — linking & ops**
F20 cross-links block, CMS h1 review, F21 ops checklist (GA4 env var, Search
Console property + sitemap submission, canonical host, Formspree test).

**Ongoing — content program**
FAQs per service → case studies from gallery → review acquisition. Measure via
Search Console query/CTR data once verified.

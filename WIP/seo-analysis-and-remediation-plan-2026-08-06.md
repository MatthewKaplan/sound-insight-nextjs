# SEO Analysis and Remediation Plan

Date: 2026-08-06  
Repository: `sound-insight-nextjs`

## Purpose

This document captures the current SEO findings for the repository and a concrete phased execution plan so the team can reference and implement improvements later.

---

## Executive Summary

The site has a decent baseline for SEO because most customer-facing pages are statically generated and render meaningful HTML content at build time. However, there are several important technical SEO issues that should be addressed before deeper content optimization work:

1. All pages currently canonicalize to the homepage.
2. There is no `robots.txt` or `sitemap.xml`.
3. There is at least one broken internal link and one inconsistent route slug.
4. A security service page exists in code but is not actually routable.
5. The current build pipeline fails on `next export` because of `next/image` usage.
6. Structured data / schema markup is missing.
7. Some implementation choices likely hurt Core Web Vitals.

The highest-priority issue is the canonical setup, because it can cause inner pages to be treated as duplicates of the homepage.

---

## Scope Reviewed

Reviewed areas included:

- `package.json`
- `next.config.js`
- `pages/_app.tsx`
- `pages/_document.js`
- primary page routes under `pages/`
- service routes under `pages/services/`
- shared layout and navigation components
- generated HTML under `.next/server/pages`
- build behavior via `npm run build`

---

## What Is Already Working Well

### Static generation is used on core pages
Most pages use `getStaticProps`, which is good for crawlability and initial HTML rendering.

Examples:
- `pages/index.tsx`
- `pages/about.tsx`
- `pages/contact.tsx`
- `pages/products.tsx`
- `pages/gallery.tsx`
- `pages/services/*.tsx`

### Most pages include basic metadata
Most pages have:
- a `<title>`
- a meta description
- visible textual content
- heading structure
- image `alt` text

### Language is declared
`pages/_document.js` sets:
- `<Html lang="en">`

This is positive for accessibility and search engines.

---

## Detailed Findings

## 1. Critical: All pages canonicalize to the homepage

### Evidence
File: `pages/_app.tsx`

```tsx
<link rel="canonical" href="https://sound-insight.com/" />
<meta property="og:url" content="https://sound-insight.com/" />
```

Because this is in `_app.tsx`, every page inherits the same canonical URL and Open Graph URL.

### Why this matters
This tells search engines that the homepage is the preferred version of all pages, including:
- `/about`
- `/contact`
- `/gallery`
- `/products`
- `/services`
- `/services/audio`
- `/services/video`
- etc.

This can suppress or weaken indexing of internal pages.

### Severity
Critical

### Recommendation
Move canonical and page URL metadata to page-level SEO handling so every route emits its own canonical and `og:url`.

---

## 2. High: Open Graph tags are incorrectly declared on many pages

### Evidence
Examples from multiple page files:
- `pages/index.tsx`
- `pages/about.tsx`
- `pages/contact.tsx`
- `pages/products.tsx`
- `pages/services/audio.tsx`
- `pages/services/video.tsx`
- `pages/services/automation.tsx`
- `pages/services/phoneSystems.tsx`

Pattern used:

```tsx
<meta name="og:title" content="..." />
<meta name="og:description" content="..." />
```

### Why this matters
Open Graph tags should use `property`, not `name`:

```tsx
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

With the current setup, social platforms may ignore page-specific values and fall back to the generic sitewide OG tags.

### Severity
High

### Recommendation
Normalize Open Graph metadata across the site and centralize metadata generation.

---

## 3. High: No `robots.txt`

### Evidence
No `public/robots.txt` was found.

### Why this matters
Search engines should have an explicit crawl policy and a pointer to the sitemap.

### Severity
High

### Recommendation
Add `public/robots.txt` with at minimum:

```txt
User-agent: *
Allow: /

Sitemap: https://sound-insight.com/sitemap.xml
```

---

## 4. High: No `sitemap.xml`

### Evidence
No sitemap file was found in `public/` or generated output.

### Why this matters
A sitemap improves discovery of key pages and helps search engines understand the intended indexable URL set.

### Severity
High

### Recommendation
Generate a sitemap covering all real marketing/service routes.

Suggested entries:
- `/`
- `/about`
- `/brands`
- `/careers`
- `/contact`
- `/gallery`
- `/products`
- `/services`
- `/services/audio`
- `/services/video`
- `/services/automation`
- `/services/phone-systems` (preferred normalized slug)
- `/services/security` if restored

---

## 5. High: Broken internal link in the footer

### Evidence
File: `components/footer.tsx`

```tsx
<Link href="/services/phone-systems">
```

Actual route in repo:
- `pages/services/phoneSystems.tsx` → `/services/phoneSystems`

### Why this matters
This creates an internal link to a non-existent route.

### Severity
High

### Recommendation
Either:
- rename the page file to `pages/services/phone-systems.tsx`, or
- change the footer link to the current route

Preferred long-term fix is the kebab-case slug.

---

## 6. High: Non-standard slug for phone systems page

### Evidence
File: `pages/services/phoneSystems.tsx`

Current route:
- `/services/phoneSystems`

### Why this matters
Kebab-case URLs are cleaner and more standard for SEO and users.

### Severity
High

### Recommendation
Rename to:
- `pages/services/phone-systems.tsx`

Then optionally redirect the old route if it has existing backlinks or has already been indexed.

---

## 7. High: Security page exists in code but is not routable

### Evidence
File: `security.txt`

This file contains a React/Next page component, but it is not inside `pages/` and is not a route.

### Why this matters
The site appears to have content for a security service page, but search engines and users cannot reach it as a normal route.

This is a missed opportunity for service-related search visibility.

### Severity
High

### Recommendation
Move the file into the page tree as:
- `pages/services/security.tsx`

Then link to it from:
- `pages/services/index.tsx`
- `components/footer.tsx`
- optionally homepage or header if the business still offers this service

---

## 8. High: The `brands` page appears orphaned

### Evidence
File exists:
- `pages/brands.tsx`

But internal links to `/brands` were not found in shared nav/footer components.

### Why this matters
Orphan pages are harder for crawlers to discover and receive less internal link equity.

### Severity
High

### Recommendation
Add internal links to `/brands` from at least one of:
- main header navigation
- footer navigation
- products page
- about page

---

## 9. High: Build currently fails

### Evidence
`npm run build` currently runs:

```json
"build": "next build && next export"
```

Build failure:

> Image Optimization using Next.js' default loader is not compatible with `next export`.

### Why this matters
A broken build blocks safe deployment of SEO improvements and creates operational risk.

### Related issue
`next export` also ignores custom headers from `next.config.js`, and Next warns about this.

### Severity
High

### Recommendation
Pick one deployment model:

#### Option A: standard Next deployment
Use:
```json
"build": "next build"
"start": "next start"
```

#### Option B: true static export
Keep `next export`, but set:
```js
images: {
  unoptimized: true
}
```
or otherwise remove incompatible image optimization behavior.

---

## 10. High: No structured data / schema markup

### Evidence
No JSON-LD / `application/ld+json` structured data was found.

### Why this matters
Structured data can help search engines better understand:
- business identity
- location
- opening hours
- contact information
- services
- navigation hierarchy

### Severity
High

### Recommendation
Add structured data in phases:

#### Priority schema types
- `LocalBusiness` or `Store` / `ProfessionalService`
- `Organization`
- `BreadcrumbList`
- `Service` on service pages

#### Best initial pages
- homepage
- contact page
- each service page

---

## 11. Medium-High: Performance issues likely impacting Core Web Vitals

### 11a. Storybook knobs imported into production carousel code

#### Evidence
File: `components/carousel.tsx`

```tsx
import { boolean, number, text } from '@storybook/addon-knobs';
```

### Why this matters
This is unnecessary production runtime weight on SEO-relevant pages such as:
- `/products`
- `/services/audio`
- `/services/video`

### Severity
Medium-High

### Recommendation
Remove Storybook knob usage from production components.

---

### 11b. Heavy carousel usage on important pages

#### Evidence
File: `components/carousel.tsx`

### Why this matters
Carousels can negatively affect:
- Largest Contentful Paint
- JavaScript execution cost
- mobile usability

### Severity
Medium-High

### Recommendation
Reduce JS weight, lazy-load non-critical slides, and consider simpler static image grids where appropriate.

---

### 11c. Multiple priority images

#### Evidence
Examples:
- `components/header.tsx`
- `components/splashImage.tsx`
- `pages/index.tsx`

### Why this matters
Overusing `priority` can compete for bandwidth and slow the actual LCP image.

### Severity
Medium

### Recommendation
Use `priority` only for the single most important above-the-fold image per page.

---

### 11d. Google Analytics is injected twice

#### Evidence
- `pages/_app.tsx`
- `pages/_document.js`

### Why this matters
This is mostly a performance/tracking hygiene issue, but unnecessary script duplication is not ideal.

### Severity
Medium

### Recommendation
Load analytics once, preferably using `next/script`.

---

## 12. Medium: Metadata quality can be improved

### Evidence
Generated HTML showed several overly long descriptions, including:
- `/about`
- `/services`
- `/contact`
- `/gallery`
- `/`

### Why this matters
Overlong descriptions are often truncated in search results.

### Severity
Medium

### Recommendation
Optimize toward:
- titles roughly 50–60 characters when practical
- descriptions roughly 140–160 characters when practical

Also note:
- `meta keywords` is used throughout the site, but Google does not use it for ranking.

Focus should be on:
- title quality
- descriptions
- heading structure
- content relevance
- internal links
- schema

---

## 13. Medium: Minor metadata/content correctness issues

### Example
File: `pages/careers.tsx`

```tsx
<title>Sound Insight - Careers | We&aposre Hiring in Huntington, NY</title>
```

This should be:

```tsx
We&apos;re
```

### Severity
Low-Medium

### Recommendation
Fix minor title and copy issues while normalizing metadata.

---

## 14. Medium: Semantic HTML can be improved

### Evidence
- `containers/main.tsx` does not render a `<main>` element
- nav lists in `components/header.tsx` use anchors directly under `<ul>` rather than `<li>` wrappers

### Why this matters
This is more about semantics and accessibility than direct ranking, but stronger HTML structure is still beneficial.

### Severity
Medium

### Recommendation
- wrap primary page content with `<main>`
- use valid list structure in navigation
- consider visible breadcrumbs on inner pages

---

## 15. Medium: Local SEO content strategy is underused

### Evidence
The site clearly targets local business intent around Huntington / Long Island / New York, but the architecture does not fully capitalize on it.

### Opportunity areas
- service-specific local landing content
- stronger gallery-to-service linking
- richer contact/location content
- FAQs by service type
- project/case-study pages derived from gallery content

### Severity
Medium

### Recommendation
Expand only with unique, useful content. Avoid thin location pages.

---

## Recommended Phased Execution Plan

## Phase 1 — Fix indexing blockers and route correctness

### Goal
Ensure search engines can discover, crawl, and index the correct URLs.

### Tasks
1. Create a reusable SEO helper/component for page-level metadata.
2. Remove canonical and fixed `og:url` from `pages/_app.tsx`.
3. Add per-page canonical URLs.
4. Add per-page `og:url` values.
5. Correct all Open Graph tags from `name=` to `property=`.
6. Add `public/robots.txt`.
7. Add `public/sitemap.xml` or generated sitemap tooling.
8. Normalize the phone systems route to `/services/phone-systems`.
9. Fix all references to the phone systems route.
10. Move `security.txt` into `pages/services/security.tsx` if the service is still active.
11. Reinstate internal links to the security page if active.
12. Add at least one real internal link to `/brands`.

### Deliverables
- corrected canonical strategy
- crawlable route set
- `robots.txt`
- `sitemap.xml`
- corrected internal links

### Success criteria
- each page has a self-referential canonical
- no important page canonicalizes to `/`
- no broken internal links to service pages
- sitemap includes all intended indexable pages
- brands and security pages are discoverable internally

---

## Phase 2 — Add structured data and local business signals

### Goal
Help Google better understand the business, its location, and services.

### Tasks
1. Add homepage JSON-LD for `Organization` and `LocalBusiness`.
2. Add contact page JSON-LD with address, phone, hours, and URL.
3. Add `BreadcrumbList` JSON-LD for interior pages.
4. Add `Service` schema to each service page.
5. Ensure consistent NAP information across pages.

### Deliverables
- JSON-LD on homepage
- JSON-LD on contact page
- structured data on service pages

### Success criteria
- schema validates in Google-rich-results tooling / schema validators
- business identity is explicit in page source
- service pages clearly describe offered services structurally

---

## Phase 3 — Improve metadata and internal link architecture

### Goal
Strengthen relevance and internal crawl pathways.

### Tasks
1. Rewrite titles and descriptions to target search intent more precisely.
2. Trim overly long descriptions.
3. Add internal links between related service pages.
4. Add links from products and gallery to relevant services.
5. Add links from service pages to contact and consultation CTAs.
6. Add a visible breadcrumb UI if desired.

### Deliverables
- normalized titles/descriptions
- improved internal cross-linking
- better service discovery path

### Success criteria
- no orphaned marketing pages
- stronger internal link graph between services/products/gallery/contact
- metadata is unique and intentional per page

---

## Phase 4 — Improve performance and Core Web Vitals

### Goal
Reduce speed-related SEO drag, especially on media-heavy pages.

### Tasks
1. Remove Storybook dependencies from runtime page components.
2. Simplify carousel behavior and lazy-load where possible.
3. Reduce `priority` image usage.
4. Load analytics once with `next/script`.
5. Resolve the `next build` vs `next export` deployment model.
6. Re-test production build and page performance.

### Deliverables
- leaner runtime JS
- cleaner script strategy
- successful build pipeline

### Success criteria
- `npm run build` succeeds consistently
- reduced JS on carousel-heavy pages
- improved LCP and page responsiveness

---

## Phase 5 — Expand content depth for search growth

### Goal
Capture more non-brand search demand over time.

### Tasks
1. Expand service pages with richer explanatory copy.
2. Add FAQ sections to high-intent service pages.
3. Turn gallery/project examples into indexable case-study content where appropriate.
4. Add manufacturer/brand-supporting content on products and brands pages.
5. Create unique local-intent supporting content only where justified.

### Deliverables
- deeper service content
- FAQ content
- project/case-study content

### Success criteria
- broader keyword footprint
- stronger support for service-specific and local-intent queries

---

## Concrete Execution Checklist

## Immediate priority checklist
- [ ] Remove global canonical from `pages/_app.tsx`
- [ ] Remove global fixed `og:url` from `pages/_app.tsx`
- [ ] Create reusable page SEO metadata helper/component
- [ ] Add self-referential canonical to each page
- [ ] Fix OG tags to use `property=`
- [ ] Add `public/robots.txt`
- [ ] Add `public/sitemap.xml`
- [ ] Rename `pages/services/phoneSystems.tsx` to `pages/services/phone-systems.tsx`
- [ ] Update all links pointing to phone systems page
- [ ] Move `security.txt` to `pages/services/security.tsx` if service is still active
- [ ] Re-enable security links if service is active
- [ ] Add links to `/brands`
- [ ] Fix duplicate GA injection
- [ ] Resolve build/export compatibility

## Secondary checklist
- [ ] Add `LocalBusiness` schema
- [ ] Add `Organization` schema
- [ ] Add `BreadcrumbList` schema
- [ ] Add `Service` schema to service pages
- [ ] Add `<main>` in shared layout
- [ ] Normalize metadata lengths
- [ ] Remove Storybook knob imports from production
- [ ] Reassess carousel implementation

---

## Suggested File Targets for Future Implementation

### Metadata / SEO infrastructure
- `pages/_app.tsx`
- new helper/component, e.g. `helper/seo.tsx` or `components/seo.tsx`
- all page files under `pages/`
- all service page files under `pages/services/`

### Crawl/index files
- `public/robots.txt`
- `public/sitemap.xml` or sitemap generator config

### Routing / linking
- `components/footer.tsx`
- `pages/services/index.tsx`
- `components/header.tsx`
- `pages/products.tsx`
- `pages/about.tsx`

### Security service route
- move `security.txt` → `pages/services/security.tsx`

### Performance / scripts
- `components/carousel.tsx`
- `pages/_app.tsx`
- `pages/_document.js`
- `next.config.js`
- `package.json`

---

## Risks / Open Questions

1. **Is the Security service still an active offering?**  
   If yes, it should be restored as a route and linked. If not, the dormant file should be removed to avoid confusion.

2. **What is the intended deployment model?**  
   The current build script suggests static export, but the image setup is incompatible without additional changes.

3. **Should `phoneSystems` preserve legacy URL compatibility?**  
   If the route has been indexed or linked externally, a redirect plan may be needed.

4. **Should metadata be standardized via a single SEO component?**  
   Recommended, because it reduces inconsistency and future drift.

---

## Recommended Order of Work

### First
1. Canonical fix
2. Sitemap and robots
3. Broken links and route normalization
4. Restore or remove dormant security page intentionally
5. Fix build pipeline

### Next
6. Schema / structured data
7. Internal linking improvements
8. Metadata rewrite and cleanup

### Then
9. Performance optimization
10. Content expansion

---

## Conclusion

This repository already has a crawlable static-page foundation, but several high-impact technical SEO issues are limiting performance. The most important fixes are the global homepage canonical problem, missing crawl files, broken route/link issues, and the failing build/export setup. Addressing those items first will create a stable technical base for deeper on-page and local SEO improvements.

---

## Phase 1 Execution Status — 2026-08-06

### Completed in repository
- [x] Removed global canonical from `pages/_app.tsx`
- [x] Removed global fixed `og:url` from `pages/_app.tsx`
- [x] Created reusable page SEO component at `components/seo.tsx`
- [x] Added self-referential canonical handling to customer-facing pages
- [x] Centralized Open Graph tags using `property=`
- [x] Added `public/robots.txt`
- [x] Added `public/sitemap.xml`
- [x] Added canonical route page at `pages/services/phone-systems.tsx`
- [x] Updated internal links to prefer `/services/phone-systems`
- [x] Added compatibility route `pages/services/phoneSystems.tsx` to preserve the old URL while canonicalizing to the new one
- [x] Moved dormant security page source into `pages/services/security.tsx`
- [x] Re-enabled security links in `pages/services/index.tsx` and `components/footer.tsx`
- [x] Added crawlable `/brands` link in `components/footer.tsx`

### Validation status
- [x] `npm run lint` passes with warnings only
- [ ] `npm run build` passes
- [ ] Fresh production/exported HTML validation completed
- [ ] Browser validation completed

### Current blocker
`npm run build` still fails because of an existing TypeScript/dependency compatibility issue unrelated to the Phase 1 SEO edits:

- `node_modules/@types/babel__traverse/index.d.ts:1467`
- error: `Type error: '?' expected.`

This means the source-level Phase 1 work is implemented, but full production build/export validation is still blocked until the repository's existing TypeScript dependency issue is resolved.

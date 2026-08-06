# Sound Insight Next.js Site

Marketing site for Sound Insight built with Next.js and deployed using the standard Next/Vercel model.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

This runs `next build` and produces the production-ready `.next/` output used by Vercel and other Next-compatible hosts.

To run the production build locally:

```bash
npm run start
```

## Deployment notes

- Deploy the app as a normal Next.js application on Vercel.
- Sitewide security headers are configured in `next.config.js` via `headers()`.
- The legacy `/services/phoneSystems` URL is permanently redirected to `/services/phone-systems` via `redirects()` in `next.config.js`.
- `next/image` optimization is enabled again for the allowed remote domains in `next.config.js`.

## Validation

Before deploy, run:

```bash
npm run lint
npm run build
```

For a local production smoke test, run `npm run start` after building and verify expected headers and redirects.

## Content/data

Build-time page data is read from the Firebase endpoint configured in `next.config.js` via `env.firebasedb_link`.

## Configuration (2026 redesign)

Two optional environment variables activate integrations:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). Analytics is disabled until set — the old `UA-*` property stopped collecting in 2023. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form hash (the `xyzabcde` in `formspree.io/f/xyzabcde`). Create a form in the Formspree dashboard and set this; until then the inquiry form falls back to the account's legacy email endpoint, which may no longer deliver. **Verify with a test submission.** |

Content still lives in the Firebase Realtime Database (`PAGE_DATA`); pages
revalidate hourly (ISR), so content edits appear without a redeploy.

`/brands` and `/careers` now permanently redirect to `/products#brands` and
`/about#careers`.

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

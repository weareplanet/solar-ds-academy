This PR makes `basePath` conditional so the dev server serves the site at `/` during development and `/solar-ds-academy` only in production. This avoids confusion when previewing locally.

Change summary:
- `next.config.js`: use `process.env.NODE_ENV === 'production'` to set `basePath` only in production.

Verification steps:
- `npm run build` — succeeded
- `npm run dev` — site loads at http://localhost:3001/ for local dev

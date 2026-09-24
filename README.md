# kallist portfolio

An evidence-led static portfolio for AI engineering, context systems and visual practice. `kallist` is the public brand; the public resume retains Wei Zhuojie's real identity. The source is Next.js 16 + TypeScript; `next build` produces a deployable `out/` directory for GitHub Pages. No backend, database, analytics or runtime GitHub requests.

## Local commands

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
npm run e2e
```

`npm test` and `npm run e2e` run against the completed static export; build first. The E2E suite starts a local static server. Install Playwright Chromium with `npx playwright install chromium` if the browser is missing.

## Content and assets

Project facts are in `src/content/projects.ts`. Source references, decisions and asset origins are in `docs/`. Images in `public/projects/` are copied from pinned public repository commits. The original supplied self portrait is in `assets/`; a WebP encoding of the same drawing is served in `public/portrait/`. The public resume is an HTML route with browser print styling and an inspected, phone-free PDF download. The private/source resume PDFs are deliberately excluded.

## Deployment

The site is configured for the root GitHub Pages address `https://kallist.github.io` with static trailing-slash routes. CI validates pull requests. The Pages workflow deploys only on `main` or manual dispatch after repository Pages is configured to use GitHub Actions. A Draft PR alone does not deploy the site.

## Boundaries

Repository images that depict demo fixtures are captioned as such. Site copy does not imply clinical fitness, real provider coverage, generalized performance gains, commercial users or current hosted deployment. Confirm current repository evidence before updating a claim.

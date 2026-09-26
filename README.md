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

The V2 homepage uses fixed measurement rails, a chapter overlay, transparent character fields and a numeric drawing of the university gate. V2.2 replaces the static layered background tree with an original, deterministic Canvas 2D character tree; see its [design](docs/V22_LIVING_TREE_DESIGN.md), [review](docs/V22_LIVING_TREE_REVIEW.md) and [visual QA](docs/visual-qa/v22/README.md). The [V2 design system](docs/V2_DESIGN_SYSTEM.md), [reference audit](docs/V2_REFERENCE_AUDIT.md), [asset inventory](docs/ASSET_INVENTORY.md) and [V2 visual QA](docs/visual-qa/v2/README.md) remain as history.

## Deployment

The site is configured for the root GitHub Pages address `https://kallist.github.io` with static trailing-slash routes. CI validates pull requests. The Pages workflow deploys only on `main` or manual dispatch after repository Pages is configured to use GitHub Actions. A Draft PR alone does not deploy the site.

## Boundaries

Repository images that depict demo fixtures are captioned as such. Site copy does not imply clinical fitness, real provider coverage, generalized performance gains, commercial users or current hosted deployment. Confirm current repository evidence before updating a claim.

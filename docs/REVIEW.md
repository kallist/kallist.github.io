# Independent engineering review — 2026-09-24

Second-pass review of the implementation from correctness, privacy, accessibility, static hosting and content-evidence perspectives. This is a self-review, not a separate human review.

## Findings fixed

| Severity | Finding | Resolution |
| --- | --- | --- |
| Important | Native mobile menu remained open after same-page navigation. | Small client enhancement closes `<details>` on link selection; regression scenario checks the Work anchor. Native menu and links still render without JavaScript. |
| Important | The first public PDF print produced three pages and split project items into unintended grid columns. | Wrapped the project list in the content column, shortened redundant copy and tuned print styles. Regenerated a one-page A4 PDF; rendered and inspected the page. |
| Important | Next.js static export rejected dynamic metadata routes for robots and sitemap. | Both routes explicitly use `force-static`; export now includes the files. |
| Important | Original 3.59 MB portrait was heavy for the first screen. | Kept the original in `assets/` and served an inspected same-size WebP encoding at 0.83 MB. |
| Nit | Wide source screenshots were too small to inspect on a phone. | Cropped the homepage image composition on narrow screens and added an accessible link to the complete original image. |

## Review results

- **Architecture:** Static Next.js export; no server API, database, browser GitHub fetch or runtime external service dependency. Content is centralized in a typed project module.
- **Claims:** Four project summaries and evaluation figures are linked to public source artifacts in `EVIDENCE_MATRIX.md`. Demo screenshots and stored evaluation limits are visibly captioned. User supplied education and internship dates are identified as such in the matrix.
- **Security/privacy:** Static export text scan found no Chinese mobile number, local private path or credential-shaped value. Original resume files remain outside the site. External new-tab links use `rel="noopener noreferrer"`.
- **Accessibility:** Semantic headings, skip link, keyboard-operable navigation, visible focus, text alternatives and reduced-motion CSS. Chromium E2E covers keyboard and reduced motion. A separate screen-reader session was not run.
- **Visual QA:** Reviewed the exported site at 1440px desktop, 768px tablet and 390px phone; also checked width/overflow at 375, 430, 844 landscape, 1024 and 1280px. Portrait crop, case page hierarchy and phone metrics remained readable. UI UX Pro Max guidance was reapplied during this review for focus, image scaling, touch targets and reduced motion.
- **PDF QA:** Chromium print from the exported `/resume/` route; Poppler reported one A4 page. Rendered PNG was visually inspected. Extracted text contains the four projects and no Chinese mobile number. The PDF is in `public/resume/`.

## Remaining limits

- Only one user supplied artwork is available, so Visual Practice is a single-piece presentation rather than a multi-work gallery.
- Public project evidence was inspected, but the four project applications and Skin Lesion external model inference were not rerun for this portfolio.
- Local Chromium on Windows verifies the site path here. Hosted GitHub Actions, GitHub Pages deployment, Firefox/Safari and assistive-technology behavior need separate evidence.
- ESLint 9 emits a deprecation warning from the current registry, while Next's bundled plugins still declare ESLint 9 peer compatibility. Clean install reported zero vulnerabilities; no unsupported ESLint 10 override was retained.

## Final local gate record

After `npm ci` (359 packages; audit reported 0 vulnerabilities), the following completed on this Windows host:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; 11 static outputs including four case-study routes, sitemap, robots and favicon |
| `npm test` | PASS; 3 export/privacy checks |
| `npm run e2e` | PASS; 8 Chromium tests against the exported site |

Docker is not part of the static-site architecture and was not run. Hosted CI and production Pages deployment remain **NOT TESTED** at the time of this local review.

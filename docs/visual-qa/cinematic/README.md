# Living archive — visual and interaction verification

Local static-export verification, 2026-10-23. These are automated Chromium viewport checks and independent visual reviews, not production, physical-phone or cross-browser verification.

## Direction and reference learning

Three independent initial audits examined the two references, recruiter reading paths and supplied media. The reference audit actually loaded the completed pages and Daniel's Work/hover states. A later visual reviewer encountered incomplete reference loading and did not infer unseen behavior. [bleibtgleich](https://bleibtgleich.dev/) informed hierarchy and alternating density; [Daniel Spatzek](https://www.danielspatzek.com/home/) informed the connection between a selected title, metadata and displayed work. No reference assets were copied.

The baseline lacked an immediate role and recruitment path, repeated monumental sections and left key UI details small. The chosen response keeps the ink portrait, paper, rails and Möbius identity, but introduces a direct opening, a linked five-case overview, quieter reading zones and a contrasting film stage. [Three opening studies](../../design/cinematic/directions/index.html) document the autonomous direction choice. This is a design judgment; no hiring uplift or world ranking was measured.

## Captures

`node scripts/capture-cinematic.mjs` captures the built site at `http://127.0.0.1:4173/`. Still captures use reduced motion for reproducibility; `film-playing-1440.webp` shows actual video playback after seeking to 15 seconds. Source files and factual evidence boundaries remain readable in the site.

| Width | Opening | Work overview | Films | Education | Full page |
| --- | --- | --- | --- | --- | --- |
| 1440 | [EN](hero-1440.webp) / [中文](hero-zh-1440.webp) | [Default](work-index-1440.webp) / [Hover](work-index-hover-1440.webp) | [Stage](films-heading-1440.webp) / [Playing](film-playing-1440.webp) | [View](education-1440.webp) | [View](full-1440.webp) |
| 768 | [EN](hero-768.webp) / [中文](hero-zh-768.webp) | [View](work-index-768.webp) | [View](films-heading-768.webp) | [View](education-768.webp) | [View](full-768.webp) |
| 390 | [EN](hero-390.webp) / [中文](hero-zh-390.webp) | [View](work-index-390.webp) | [中文](films-zh-390.webp) | [View](education-390.webp) | [View](full-390.webp) |
| 360 | [EN](hero-360.webp) / [中文](hero-zh-360.webp) | [View](work-index-360.webp) | [中文](films-zh-360.webp) | [View](education-360.webp) | [View](full-360.webp) |

All four widths: homepage and VowEdit detail overflow **0 CSS px**; hero actions inside the viewport; **0 MP4 requests before Play**; **0 uncaught page errors**. Machine-readable observations: [capture-results.json](capture-results.json). This does not establish performance on a constrained mobile connection.

## Independent review and repairs

- First visual review: **8/10**, no verified blocker. Requested semantic university-name wrapping, less repeated/technical film copy on phones, removal of visible rectangular paper masks, and timely rail/language arrival. All four were revised and viewed again. Scores describe the reviewed prototype, not a competitive ranking.
- Second independent visual review: **9/10** in the task's scope; all four findings closed, no new blocker. Actual no-preference entry samples, wheel scrolling, hover, all three Play actions, switching and expanded attribution were inspected. Remaining refinement: finer attention sequencing within the opening fade. Discrete time samples are not a full normal-speed motion-film review.
- Independent code review reproduced two playback defects: an old pending retry could show an error over a newly selected film, and keyboard retry could lose focus. Generation and element identity now reject stale failures, retry restores video focus, and both behaviors have regression coverage. A second source review found both fixes correct and no new substantive issue.
- Pixel comparison initially exposed a single-column Chromium compositing seam when hiding the background canvas. Opaque project screenshots now retain original colors and their own compositing surface. The original exact screenshot-equality assertion remains in place and passes.
- A repeated hover test exposed smooth-scroll setup racing the pointer target. Setup now places the overview instantly, waits for reveal completion and focuses without scrolling. Preview and route assertions remain intact; three complete repetitions pass.

## Executed validation

| Command / check | Result |
| --- | --- |
| `npm ci` | PASS; unchanged lockfile reports 8 high-severity audit entries |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; static export |
| `npm test` | 12 passed; 0 failed, skipped or cancelled |
| `npm run e2e` | 33 passed; 0 failed |
| `npx playwright test tests/films.spec.ts --repeat-each=3` | 21 passed; 0 failed |
| Three web films, complete video/audio decode | PASS; details and hashes in [film assets](../../FILM_ASSETS.md) |

The browser suite covers all three real local media files, deliberate loading, playback progress, seek, switching, keyboard selection, failure recovery, stale retry isolation, HTTP ranges, responsive navigation, reduced motion, privacy and existing case/gallery behavior. Media decode is not independent audio audition, semantic assessment or provider testing.

Reading-scale check: [720×500 CSS viewport](reading-reflow-720.webp), the layout-equivalent size of a 1440×1000 window at 200% browser zoom, reflows without overflow; opening, film controls, expanded attribution and education remain readable. Native browser zoom was **NOT TESTED**. A separate artificial CSS `zoom:2` experiment clips the viewport-unit wordmark while retaining desktop media breakpoints; it is recorded as a limitation of that experiment, not hidden or promoted to a native-zoom result.

## Limits

Physical phone, Safari, Firefox, screen reader, complete three-film audio/sync audition, constrained-network performance and production deployment: **NOT TESTED**. This feature is prepared as a Draft PR, without merge or deployment. Existing case pages remain English; the homepage has a visible Chinese switch. Captions are embedded in supplied videos; separate accessible transcripts/subtitle tracks were not created. Copyrights, music rights and source model execution were not independently established. Existing npm audit findings were not changed by this design task. No API, database, dependency or deployment configuration changed.

# Context Theatre — verification

This iteration replaces the previous Hero portrait with a dark typographic stage for the existing Möbius context surface. The source portrait and all five engineering cases, five artwork items and three supplied films remain preserved. Base main: `f3a662683c754710e2684f997ef58d295317fa49`. The prior PR #13 was already merged before this work began.

## Motion inventory

1. A one-shot opening aperture, with projected wordmark and sequential role/statement/actions. It does not block navigation or play sound.
2. A shared Möbius glyph surface with structural contours, slow spatial precession and pointer-responsive perspective.
3. A reversible native-scroll camera that moves the opening surface into the quieter global background; wordmark and surface use the same scroll progress.
4. Two oversized chapter bands with opposing scroll-linked text tracks.
5. Depth-shifted project titles and a one-shot registration sweep.
6. Project screenshots revealed by a shutter and shallow perspective, keeping their source pixels and full-image links.
7. Linked project-selection preview wipes and a selected-row fill.
8. Film poster projection reveals; actual video behavior remains native and starts on Play.
9. Bounded magnetic feedback on recruitment, case and contact links.
10. A final signature and arrow that respond to chapter progress.

The single Canvas 2D renderer and existing static-export architecture are retained. No dependency or rendering engine was added. Native scrolling is not intercepted. Reduced motion presents static complete states; the ambient pause button stops the surface and scroll choreography. The artwork gallery has its own separate motion control.

## Viewed evidence

| Area | Desktop | Tablet / phone |
| --- | --- | --- |
| Opening | [1440](hero-1440.webp), [normal-motion frame](entry-2.webp) | [768 中文](hero-zh-768.webp), [390 中文](hero-zh-390.webp), [360](hero-360.webp) |
| Engineering transition | [Moving band](work-band-motion.webp), [linked preview](work-index-hover-1440.webp) | [Work 390](work-index-390.webp) |
| Film transition | [Moving band](film-band-motion.webp), [actual playback](film-playing-1440.webp) | [Films 中文 390](films-zh-390.webp) |
| Education / ending | [Education](education-1440.webp), [ending](ending-motion.webp) | [Education 390](education-390.webp), [contact 390](contact-390.webp) |
| Full page | [1440](full-1440.webp) | [768](full-768.webp), [390](full-390.webp), [360](full-360.webp) |

[Normal-motion browser recording](motion-preview.webm) includes the opening, pointer/scroll interaction, chapter progression and pause/resume. It is an automated real-time recording with capture overhead, not a frame-rate benchmark or an independent full-video audition. [Frame timing record](motion-captures.json). [Paused opening](paused-opening.webp). Still captures use reduced motion unless named as a normal-motion capture.

Reproduce after build, with `node tests/static-server.mjs` running:

```powershell
$env:QA_VARIANT='theatre'
node scripts/capture-cinematic.mjs
node scripts/capture-theatre-motion.mjs
```

All four capture widths: homepage and case-page horizontal overflow **0 CSS px**, Hero recruitment actions within viewport, **0 video requests before Play**, **0 uncaught page errors**. [Capture observations](capture-results.json).

## Independent review

An independent reviewer browsed the normal-motion site, two chapter bands, project preview and screenshot reveal, all three films, native scroll, resume, 390 Chinese and 768 layouts. The first review found a real overlap: the old ambient-motion button covered part of the gallery Next button and could activate the wrong control. It was moved to the right measurement rail. A hard-reload recheck found a 2 px gap at 390, actual Next clicks advancing artwork, and independent pause/resume. A regression now clicks the artwork control near its right edge, rather than checking only bounding boxes.

Review score: **7/10 before the interaction repair, 8/10 after**. These are internal design judgments, not industry rankings. Remaining suggestions were quieter symbol projection in later chapters and quicker text readability; background strengths were reduced and evidence text no longer waits for its decorative reveal. Opening photography is absent by the user's explicit request.

Independent code review: **0 BLOCKING / 0 IMPORTANT**. It checked listener/RAF cleanup, pause vs system preference, pointer safety and actual SPA navigation away/back. Canvas drawing stopped after leaving the page; manual pause state was cleared and one renderer returned. Dynamic reduced-motion preference changes were also exercised. No source changes were made by that reviewer.

## Validation record

Executed local gates:

| Exact command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS, static export |
| `npm test` | 12 passed, 0 failed/skipped/cancelled |
| `npm run e2e` | 39 passed, 0 failed |
| `npx playwright test tests/theatre.spec.ts --repeat-each=3` | 18 passed, 0 failed |
| `git diff --check` | PASS |

The suite keeps all applicable project/gallery/media/privacy tests. Only the former Hero-photo requirement was replaced by no-Hero-image and actual drawn-pixel checks; project screenshot occlusion remains an exact equality assertion. New motion tests isolate pointer input at identical animation times, exercise actual scroll/camera changes, sample rendered pause/resume frames, verify reduced motion, recruitment actions and gallery-control separation. The legacy hover setup now waits for the real finite entrance animation to finish before moving onto the text; its feedback assertion remains unchanged. Hosted CI is reported separately in the Draft PR and must match the final pushed commit.

## Limits

Physical phone/tablet, Safari, Firefox, screen reader, native browser zoom, constrained-network performance and production deployment: **NOT TESTED**. No complete three-film audio/sync audition or complete normal-speed recorded-motion critique was performed. Automated viewport and sampled rendering evidence must not be reported as these layers. Music/model/award provenance remains bounded as documented in [film assets](../../FILM_ASSETS.md). No API, DB, secret storage or deployment change. Existing dependency audit findings were not addressed in this visual task.

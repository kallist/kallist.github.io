# V2.3 visual QA captures

`node scripts/capture-v23.mjs` uses Chromium on the locally built static export (`http://127.0.0.1:4173/`). It records the opening sequence, live Canvas layer, motion interval, section samples and full pages. `capture-results.json` holds viewport glyph counts, overflow and the local timing sample. The `loop-isolated-*` images are the Canvas layer alone on the site's paper color; the live content-aware masks still apply to those frames.

| View | Evidence |
| --- | --- |
| 1440 intro | `intro-early-1440.webp`, `intro-loop-1440.webp`, `intro-page-1440.webp` |
| 1440 loop and interaction | `loop-isolated-0.webp`, `loop-isolated-5s.webp`, `loop-pointer.webp` |
| 1440 chapters | `hero-1440.webp`, `repobound-1440.webp`, `agent-studio-1440.webp`, `education-1440.webp`, `method-1440.webp`, `visual-practice-1440.webp`, `contact-1440.webp`, `full-1440.webp` |
| 768 | `hero-768.webp`, `repobound-768.webp`, `education-768.webp`, `visual-practice-768.webp`, `full-768.webp` |
| 390 | `intro-loop-390.webp`, `intro-resolved-390.webp`, `hero-390.webp`, `repobound-390.webp`, `education-390.webp`, `visual-practice-390.webp`, `full-390.webp` |

The screenshots are browser viewport simulations. They are not evidence of a physical phone or another browser engine.

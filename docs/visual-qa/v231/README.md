# V2.3.1 visual QA captures

`QA_SERIES=v231 node scripts/capture-v23.mjs` uses Chromium on the locally built static export at `http://127.0.0.1:4173/`. The output in this folder is a browser viewport simulation, not physical phone evidence or production QA.

| View | Evidence |
| --- | --- |
| Opening | `intro-early-1440.webp`, `intro-loop-1440.webp`, `intro-page-1440.webp`, `intro-loop-390.webp`, `intro-resolved-390.webp` |
| Isolated surface and motion | `loop-isolated-0.webp`, `loop-isolated-5s.webp`, `loop-pointer.webp`, `capture-results.json` |
| 1440 | `hero-1440.webp`, `education-1440.webp`, `visual-practice-1440.webp`, `full-1440.webp` |
| 768 | `hero-768.webp`, `education-768.webp`, `visual-practice-768.webp`, `full-768.webp` |
| 390 | `hero-390.webp`, `education-390.webp`, `visual-practice-390.webp`, `full-390.webp` |

The folder also includes project, method and contact samples. `loop-isolated-*` is the Canvas layer composited over the site's paper color; the live content masks still apply. `capture-results.json` records viewport glyph counts, horizontal overflow and the local 5.5-second motion sample. Changed-pixel counts prove that the Canvas frame changes; the surface-coordinate code and model tests establish that glyphs travel along the strip rather than the entire object rotating.

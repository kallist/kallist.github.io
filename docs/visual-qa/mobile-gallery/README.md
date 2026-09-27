# Mobile Visual Practice QA

`node scripts/capture-mobile-gallery.mjs` captures the built static export in Chromium at `http://127.0.0.1:4173/`. These are browser viewport captures, not physical phone or production evidence.

The mobile patch applies at 640px and below. The original two-track desktop artwork band remains in place at 768px and 1440px. A separate phone reel reads the same five works from `src/content/gallery.ts`. It uses native horizontal scrolling and CSS snap; a copy of the last and first works at the boundaries gives continuity, then the scroll position silently returns to the corresponding real work. The live index is calculated from the item nearest the viewport center. The phone reel has no automatic movement, including when reduced motion is requested. Keyboard arrows and 44px previous/next controls supplement touch swipe.

| View | Files |
| --- | --- |
| 360 / 375 / 430 | `visual-practice-360.webp`, `visual-practice-375.webp`, `visual-practice-430.webp` |
| 390 and artwork states | `visual-practice-390.webp`, `visual-practice-390-item-02.webp`, `visual-practice-390-item-03.webp`, `visual-practice-390-item-05.webp` |
| Tablet and desktop | `visual-practice-768.webp`, `visual-practice-1440.webp` |
| Full pages | `full-390.webp`, `full-768.webp`, `full-1440.webp` |

`capture-results.json` records document overflow for each width. The E2E suite checks the single mobile reel, distinct images, centered card, adjacent peek, caption, live index, boundary wrap, keyboard, reduced motion, touch gestures, and unchanged desktop band. The 768px and 1440px captures can be compared with `docs/visual-qa/v231/`.

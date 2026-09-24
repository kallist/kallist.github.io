# Kallist V1.1 iteration visual QA

Captured 2026-09-24 from this branch's `next build` static export at `http://127.0.0.1:4173/` in Chromium. These **after** screenshots are a local preview, not the production site. The [V1.1 release captures](../v11/README.md) show the currently deployed baseline (`8ac462f`); compare its [desktop Visual Practice](../v11/after-desktop-visual.webp) and [mobile full page](../v11/after-mobile-full.webp) with the revised images below. The screenshots retain their browser dimensions and use WebP compression only.

| View | This iteration |
| --- | --- |
| Desktop 1440 full page | [after](after-desktop-full.webp) |
| Tablet 768 full page | [after](after-tablet-full.webp) |
| Mobile 390 full page | [after](after-mobile-full.webp) |
| Hero 1440 / 390 | [desktop](after-desktop-hero.webp) / [mobile](after-mobile-hero.webp) |
| Visual Practice 1440 / 390 | [desktop](after-desktop-visual.webp) / [mobile](after-mobile-visual.webp) |
| Ending 1440 / 390 | [desktop](after-desktop-contact.webp) / [mobile](after-mobile-contact.webp) |
| Visual Practice through Ending 1440 / 390 | [desktop](after-desktop-visual-ending.webp) / [mobile](after-mobile-visual-ending.webp) |
| Education 1440 / 390 | [desktop](after-desktop-education.webp) / [mobile](after-mobile-education.webp) |
| Page-turn seam 1440 / 390 | [desktop](after-desktop-seam.webp) / [mobile](after-mobile-seam.webp) |
| RepoBound pointer response at 1440 | [representative state](after-desktop-pattern-interaction.webp) |

The detail strip no longer places large repeated portrait crops at the end of the page. The final dark seam carries into Contact and the homepage footer. The fresh post-build pass measured `scrollWidth == clientWidth` at 1440, 768 and 390px, with nine pattern layers, five chapter seams, no clipped headings or education blocks, and no page errors. All eight homepage images decoded at each width after explicitly loading the lazy images. Hero education metadata measured 12px at 390px; the profile education text remains larger. Pointer movement displaced a RepoBound glyph by `translate3d(-4.74px, -1.77px, 0px)` in the recorded representative state. An active-motion Chromium check confirmed that a page-turn number progressed through four different scroll positions; touch entry registered a pattern once.

The local static server recorded speculative Next.js `.txt` prefetch requests returning 404 for Resume and Skin Lesion AI while page navigation and direct route tests passed. These were not image requests; hosted navigation behavior is not claimed here. Physical phone, Safari, Firefox and screen-reader checks remain untested.

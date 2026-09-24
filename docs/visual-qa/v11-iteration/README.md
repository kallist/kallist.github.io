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
| Education 1440 / 390 | [desktop](after-desktop-education.webp) / [mobile](after-mobile-education.webp) |
| Page-turn seam 1440 / 390 | [desktop](after-desktop-seam.webp) / [mobile](after-mobile-seam.webp) |

The detail strip no longer places large repeated portrait crops at the end of the page. The final dark seam carries into Contact and the homepage footer. All three measured viewports had `scrollWidth == clientWidth`, all nine pattern layers and five chapter seams rendered, and no page errors occurred. An active-motion Chromium check confirmed that a page-turn number progressed through four different scroll positions; touch entry registered a pattern once. Physical phone, Safari, Firefox and screen-reader checks remain untested.

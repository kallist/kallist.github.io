# Unified Visual Practice gallery QA

Run `npm run build`, then `node scripts/capture-exhibition-gallery.mjs`. The script captures the built static export in Chromium at `http://127.0.0.1:4173/`. These are local browser captures, not production, physical phone, Safari, or Firefox evidence.

The same five-work exhibition ribbon and live index render at every viewport. Desktop shows a dominant work with smaller neighbors and slow automatic travel. Tablet uses a narrower hierarchy. Phone uses one work with adjacent peeks, native swipe and snap, and no automatic travel. The controls, captions, artwork data, and loop state are shared. The character loop remains behind the work; its mask follows the full gallery region.

| Evidence | Files |
| --- | --- |
| Gallery at six widths | `visual-360-01.webp`, `visual-375-01.webp`, `visual-390-01.webp`, `visual-430-01.webp`, `visual-768-01.webp`, `visual-1440-01.webp` |
| Artwork states | `visual-{390,768,1440}-{02,03,05}.webp` |
| Automatic motion after resume | `visual-1440-motion.webp`, `capture-results.json` |
| Full-page context | `full-390.webp`, `full-768.webp`, `full-1440.webp` |

The capture script centers each named work before taking its still image and records document overflow at each width. The E2E suite separately exercises auto travel, pause and resume, drag, buttons, keyboard, native phone swipe, wrapping, and reduced motion.

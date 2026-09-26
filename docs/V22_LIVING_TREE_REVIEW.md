# V2.2 living ASCII tree review

## Visual QA

The screenshots in [visual QA](visual-qa/v22/README.md) came from the local production export at `http://127.0.0.1:4173/` after `npm run build`, using Chromium at 1440×900, 768×1024 and 390×844. They are development evidence, not production-site or physical-device results. An isolated tree frame shows a central tapering trunk, asymmetric forks, fine branches and an open canopy made by character placement and density. No tree outline is drawn behind those glyphs. The .2s frame contains an emerging trunk before Hero; the .7s frame has connected branches; the later frame shows Hero registration over the tree.

The tree remains visible through RepoBound, CueParcel, Agent Studio, Education, Visual Practice and Contact. It changes to pale glyphs over the dark chapters. Project screenshots, the university gate and contact links remain legible. Responsive screenshots and measured document widths show no horizontal overflow at the three requested viewports. At 390px the tree retains its trunk and branch hierarchy while using fewer glyphs. The five-work gallery, language switch and INDEX are unchanged in the feature scope and covered by E2E.

## Motion and interaction QA

The capture script recorded the same isolated Canvas at full growth, 5.5 seconds later and after pointer movement. A thresholded raw-pixel comparison found 113,365 changed pixels over 5.5 seconds; this proves the rendered field changed, but does not measure branch amplitude or frame rate. Frame inspection shows the trunk remains aligned while outer clusters and branches change. The second comparison (67,987 changed pixels) includes both pointer response **and** autonomous elapsed time, so it is not presented as a pointer-only effect size. Playwright checks continuing tree motion and a static reduced-motion frame. A longer-duration loop study was not performed.

The tree uses a capped redraw cadence, does not intercept pointer events, and stops its animation loop when document visibility changes to hidden. Playwright simulated a visibility change because headless tab switching did not reliably hide the document. With `prefers-reduced-motion: reduce`, the complete tree draws once without time-based deformation, density breathing or pointer response. All page content remains visible.

## Performance observation

The final capture used 5,737 glyphs at 1440px, 3,421 at 768px and 1,882 at 390px. Device pixel ratio is capped at 1.5 for desktop and 1.25 for mobile. In one 5.5-second idle interval on local headless Chromium at 1440×900, CDP `Performance.getMetrics` reported a 1.80s increase in `TaskDuration` and 0.88s in `ScriptDuration`. These are browser main-thread durations for that run, not CPU percentage or FPS and not a phone benchmark. The screenshots and scroll checks showed no obvious skipped composition or content obstruction; physical-device performance remains untested.

## Issues found and fixes

- The first project screenshot was initially underneath the global tree because an animated scene created a stacking context. The revealed scenes now release that clipping context, and E2E checks that the image is above the tree.
- CueParcel's dark surface is an article, not a section. Palette detection now matches the article, and a reduced-motion test verifies the pale redraw across CueParcel, Education and Contact.
- Palette selection now follows chapter geometry rather than the topmost element, so opening the INDEX dialog over a dark chapter does not alter the tree shade.
- The original mobile mapping cropped most branches. The Canvas model now compresses horizontally on small screens while preserving the vertical tree.
- The browser needed an immediate tree cue before the Canvas first frame. A narrow fallback trunk is visible while the renderer initializes; the Canvas then takes over the topology-aware reveal.
- Visibility and resize cleanup, capped DPR, and static reduced-motion redraw were reviewed independently; Playwright covers the high-risk lifecycle paths.

## Scope and limits

The reference informed character-density form and internal glyph motion. Its silhouette, source code, placement, frames, assets and branding were not copied. No project claims, routing, resume facts, backend or runtime dependency changed. Visual QA was performed in Chromium viewports; physical phone, Safari, Firefox and screen reader were not tested. The captured Draft PR is not a production deployment.

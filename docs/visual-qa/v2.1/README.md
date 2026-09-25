# V2.1 local visual QA

Captured from the local static export at `http://127.0.0.1:4173/` with Chromium. Run `node scripts/capture-v21.mjs` after `npm run build` to refresh these images. These captures are local evidence, not production or physical-device results.

| View | Capture |
| --- | --- |
| 1440 full page | [full-1440.png](full-1440.png) |
| 768 full page | [full-768.png](full-768.png) |
| 390 full page | [full-390.png](full-390.png) |
| Desktop visual band | [gallery-desktop.png](gallery-desktop.png) |
| Same band 2.2 seconds later | [gallery-motion-later.png](gallery-motion-later.png) |
| Character tree isolated for shape inspection | [tree-isolated.png](tree-isolated.png) |
| Character tree behind readable profile copy | [tree-with-content.png](tree-with-content.png) |
| Desktop education | [education-1440.png](education-1440.png) |
| Mobile education | [education-390.png](education-390.png) |

The isolated tree image deliberately hides page content and raises the tree opacity to reveal the underlying glyph composition. The normal screenshot shows its actual lower opacity behind copy. The two gallery captures show a changed track transform; [capture-results.json](capture-results.json) records the values and zero horizontal overflow at all three widths.

Visual review: four different user-supplied artworks are arranged in two staggered visual lanes with narrow suspension lines. Both lanes repeat seamlessly, can be paused, and the primary lane accepts pointer dragging. The tree's branch and trunk silhouette is composed of characters and stays behind the page frame. The SCAU gate is constructed from positioned characters with a related character cloud; the Chinese education copy remains legible at 390px.

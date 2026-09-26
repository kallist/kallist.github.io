# V2.1 gallery, language and intro tree QA

These captures use Chromium on the local static export at `http://127.0.0.1:4173/`. Widths are browser viewports, not physical devices. The 1.6-second frame samples the page's CSS animation timeline at that time so screenshot latency does not change the state.

| Check | Evidence |
| --- | --- |
| First tree frame, before content | [intro-start-1440.png](intro-start-1440.png) |
| Tree established, Hero still hidden | [intro-tree-before-page-1440.png](intro-tree-before-page-1440.png) |
| Tree with Hero emerging at 1.6 seconds | [intro-page-emerge-1440.png](intro-page-emerge-1440.png) |
| Complete Hero and visible EN / 中文 switch | [hero-complete-1440.png](hero-complete-1440.png) |
| Tree isolated for character-shape inspection | [tree-isolated-1440.png](tree-isolated-1440.png) |
| Tree behind work content | [tree-with-work-1440.png](tree-with-work-1440.png) |
| Open visual archive and later motion frame | [gallery-1440.png](gallery-1440.png), [gallery-motion-1440.png](gallery-motion-1440.png) |
| Education | [education-1440.png](education-1440.png), [education-768.png](education-768.png), [education-390.png](education-390.png) |
| Full page | [full-1440.png](full-1440.png), [full-768.png](full-768.png), [full-390.png](full-390.png) |
| Tablet and mobile gallery | [gallery-768.png](gallery-768.png), [gallery-390.png](gallery-390.png) |

The character tree is three fixed SVG depth layers, generated from branch and crown density rather than a traced outline. They contain 3,102 + 3,060 + 3,073 glyphs. The layers drift with 53–64-second CSS cycles and become static with reduced motion. The raw screenshot result is in [capture-results.json](capture-results.json): no horizontal document overflow at 1440, 768 or 390; the main gallery transform changes between timed frames.

The gallery uses three repeating copies of the five-item main lane and three reversed copies of a quieter echo lane. Only one main copy is exposed to assistive technology. The language switch is visible on the opening Hero and inside the INDEX dialog thereafter, keeping the scrolled content unobstructed. Education's local character field remains separate from the fixed tree behind its text and gate artwork.

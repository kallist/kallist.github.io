# V2 visual QA

Screenshots are from the local static export in Chromium at desktop 1440×900, tablet 768×1024 and mobile 390×844. The images are local verification artifacts, not evidence of physical phone, Safari or Firefox testing.

Capture sequence scrolls through every project before taking full-page screenshots so lazy-loaded images are present. It waits for reveal entry on the education section and captures the chapter overlay separately.

Review checklist: full page, hero, overlay and education at all three widths; work and ending crops at desktop; no document-level horizontal overflow; all four project images, portrait and gate graphic loaded; text visible at reduced motion.

## Review result

- At 1440px, the hero wordmark is complete, rail ticks remain visible, the four work spreads keep image/type separation, and the single artwork leads into the graphite contact ending.
- At 768px, the hero uses a stacked composition so the full `kallist` wordmark and portrait remain legible. The education heading and major now fit on one line beside the numeric gate.
- At 390px, the left index remains reachable, the gate is visible above the Chinese education copy, and the page does not overflow horizontally.
- Overlay captures confirm chapter typography and a visible close control at all widths. The E2E suite covers Escape, focus return, chapter links and résumé navigation.
- All captures are Chromium viewport checks. Physical phone, Safari, Firefox and screen reader were not tested.

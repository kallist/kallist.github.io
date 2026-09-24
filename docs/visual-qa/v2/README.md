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

## Visual depth pass

`depth/` contains Chromium captures from the current local static export. Desktop at 1440×900 includes Hero, INDEX, all four work scenes, Education, Visual Practice, Contact and the full page. Mobile at 390×844 includes Hero, INDEX, CueParcel, Education and the full page. Tablet at 768×1024 includes Hero, CueParcel and INDEX. Screenshots were captured with reduced motion to show complete content, after scrolling the lazy-loaded images into view.

Interaction checks were executed separately in Chromium E2E with motion enabled: scroll updates the numeric rail progress; active chapter state follows section entry; INDEX opens, changes current chapter, accepts Escape and restores trigger focus; chapter selection navigates and closes the dialog; words respond to hover; a fine pointer shifts the active character field and reduced motion clears that offset. Direct case routes, images and viewport overflow are covered by the same suite. The screenshots alone do not prove those behaviors.

Visual review found two cascade regressions in the first capture: CueParcel became a low-contrast light section, and Skin Lesion metrics inherited a 10px label size. Both were corrected and the captures replaced. The final desktop scenes use different spatial structures and screenshot scales; guide lines enter the composition without covering primary text. The 390px captures keep the education gate and INDEX readable within narrower rails.

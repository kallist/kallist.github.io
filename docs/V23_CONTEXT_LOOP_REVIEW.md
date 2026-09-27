# V2.3 context loop review

## Visual QA

The loop was reviewed in local Chromium against the built static export at 1440 × 900, 768 × 1024 and 390 × 844. The character field reads as one asymmetric, twisted figure-eight when isolated and during the opening sequence. There is no outline, glow, neon, filled ribbon or external visual asset. The Hero and project scenes retain the existing type, ink portrait, screenshot hierarchy, rails and INDEX. The Education gate remains the local focal point on its dark chapter; the loop is pale and subdued around it. The five-work gallery and contact links remain legible. All three QA widths reported zero horizontal overflow. See [captures and capture method](visual-qa/v23/README.md).

On a settled 390px Hero, only parts of the loop remain visible because the title, statement and portrait occupy almost all available area. The opening sequence deliberately presents the full loop before these content masks apply. This is a compositing limit of the narrow viewport, not a hidden mobile variant; the fixed loop remains active through the page.

## Motion QA

The renderer moves glyph coordinates along the closed surface, adds small local tension, lets sparse edge glyphs breathe and substitutes characters only within their density family. Eight embedded context terms travel with the surface. It does not rotate the entire object as a spinner. Two canvas-only captures 5.5 seconds apart changed 100,851 pixels in the final local 1440px Chromium run. A pointer-and-time capture is also included; it is a visual interaction artifact, not a pointer-only benchmark. `prefers-reduced-motion` produces a complete static frame; the E2E suite verifies the frame remains identical over time. The renderer pauses while the document is hidden and caps DPR.

## Issues found and fixes

1. First geometry pass clipped the lobes and read as a shallow wave. The final figure-eight uses a tighter viewport projection, more vertical separation, and a broader glyph surface. Its 1440px isolated capture now shows both lobes and the crossing.
2. The first mobile intro applied masks for content before that content appeared, fragmenting the object. Masks now begin when the loop is ready. The 390px resolved intro capture shows the full loop before the Hero; settled content remains readable.
3. The first 6,662-glyph desktop version used 2.69 seconds of main-thread task time over a 5.5-second local capture. Adaptive detail, drawing cadence and an analytic tangent brought the final 4,822-glyph version to 1.23 seconds of task time and 0.66 seconds of script time over the same interval. These are local headless Chromium measurements, not device-wide performance claims. The analytic tangent removes per-glyph centerline allocations and is covered by topology tests.

## Verification boundary

Local Chromium, exported routes, keyboard navigation, English/Chinese switch, gallery, case links, privacy and reduced motion are exercised by the repository suites. Physical phone, Safari, Firefox and screen-reader behavior are not tested here. This Draft PR does not deploy the V2.3 site.

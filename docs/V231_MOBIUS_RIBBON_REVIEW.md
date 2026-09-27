# V2.3.1 review

The design was compared in local Chromium against the built static export at 1440 × 900, 768 × 1024 and 390 × 844. The isolated view now shows one closed strip with a visible fold and a tapered return instead of the V2.3 pair of round lobes. The Hero places the dark near face in its open paper area; text and portrait remain above it. The 390px view keeps a connected upper silhouette, the portrait loads cleanly, and no tested width has horizontal overflow.

Education's numeric gate remains foreground on its dark chapter. Visual Practice images and captions remain unobscured. The background changes tone by section without becoming a new foreground object. See the [capture set](visual-qa/v231/README.md).

The motion sample is Canvas only: two images 5.5 seconds apart changed 147,475 pixels at 1440px. Glyph positions advance around the single surface, whereas the silhouette stays fixed. The pointer sample includes the elapsed time between captures and must not be read as a pointer-only measurement. The same local capture recorded 2.20 seconds of browser task time and 1.11 seconds of script time over that 5.5-second interval; this is a local headless Chromium sample, not a physical-device benchmark.

The first full E2E run exposed a reduced-motion transition issue: Chromium reported the new media preference without delivering the subscribed change event. A bounded preference reconciliation now updates the renderer in either direction; the focused regression passed afterward. Full-suite results are recorded in the delivery report and must be checked against the final commit.

Known limits: the fixed point of view favors the open strip on the left, while the return is intentionally lighter. The settled mobile Hero shares its limited upper space with `kallist` and navigation, so the strip is clearer during the isolated intro than over content. Physical phone, Safari, Firefox and screen-reader behavior are not established by these Chromium captures.

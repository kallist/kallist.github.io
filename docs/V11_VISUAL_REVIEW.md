# V1.1 visual and engineering review

This review records the static-export implementation on `feat/portfolio-v1.1-art-direction`. The before state is production V1 at `cdad931`; V1.1 is a Draft PR and is not production.

## Visual comparison

| Area | Production V1 | V1.1 preview |
| --- | --- | --- |
| First viewport | WZ mark, legal name, standard split hero | `kallist` spans the opening spread; the original portrait crosses the wordmark field |
| Work | Four related image/text structures | Flagship RepoBound, CueParcel process, Agent Studio execution sequence, Skin Lesion AI evaluation typography |
| Profile | Standard heading plus three-column principles | Two-beat type composition and ruled principle index |
| Art | One cropped image and description | One full original plus two explicitly labelled crops of the same work |
| Ending | Generic contact CTA | Large final wordmark and direct contact index |

## Required critique

1. **Generic developer portfolio?** No: the visual order is led by a wordmark, artwork and four distinct editorial chapters.
2. **Common template?** Unlikely: the image/type overlap, project-specific chapter systems and asymmetrical method spread are not a repeated card template.
3. **Typography doing work?** Yes: wordmark, project titles, process words and evaluation numbers determine composition and reading rhythm.
4. **Whitespace intentional?** Yes: large pauses surround chapter changes; dense screenshots and metrics follow them.
5. **Portrait influencing the system?** Yes: diagonal strokes, thin lines and sparse fragments appear beyond the hero. Decorative CSS marks are original, not copied artwork.
6. **Projects differentiated?** Yes: four distinct arrangements retain the same source-backed content and case links.
7. **First three seconds?** The brand and supplied portrait are visible together without a loading screen; CSS entrance ends within roughly 1.2 seconds.
8. **Mobile identity?** At 390px the wordmark remains large, portrait crops differently, and project structures stack by content priority.
9. **Purposeful animation?** The wordmark and portrait reveal once; small arrows and images respond on hover. Ordinary scrolling remains untouched.
10. **Original rather than a Pear clone?** Yes: paper-white ink treatment, manga artwork, project evidence, content order and section geometry are specific to Kallist. No Pear asset, copy, typography or motion was reused.

## Engineering and accessibility findings

- The V1 exact-text test for `RepoBound` failed because the new heading includes a decorative arrow. The test now locates the same semantic heading by role and name; its visibility assertion remains intact.
- Initial full-page screenshots revealed that lazy project screenshots lacked intrinsic dimensions and could shift lower content. `ProjectImage` now declares the measured source dimensions; the refreshed 1440 full-page capture matches the final document height.
- Independent review found the old legal name in the homepage portrait alternatives and the social-preview image alternative. Those descriptions now use `kallist`; the resume retains the real name. The review also requested durable before/after evidence, now included in `docs/visual-qa/v11/` for the Draft PR.
- Project facts and metrics remain in `src/content/projects.ts`; the case-study body and the phone-free resume stay source-backed. The public brand changes while the resume keeps the real name.
- Desktop, tablet and mobile previews show no horizontal overflow. The portrait loads at its original dimensions; all images are local and lazy below the fold.
- All controls remain native links, buttons or the native mobile `<details>` menu. Focus styling remains visible. Reduced motion removes entrance and hover movement.
- No new runtime or animation dependency. The design relies on CSS and the existing static export.

## Remaining boundaries

The Pear reference's video/film remained at 0% in automated Chromium; later animated frames were not used as implementation evidence. Physical phone, Safari, Firefox and screen-reader sessions have not been executed. Hosted CI is reported only after the Draft PR run completes.

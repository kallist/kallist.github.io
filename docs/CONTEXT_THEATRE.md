# Context Theatre — direction and motion contract

## Resolved design tree

The user rejected the prior restrained opening, explicitly removed its ink portrait and requested a more ambitious moving-image experience. Previous authorization delegates design choices without questions. The grilling/design frontier is resolved through source inspection, actual reference browsing and independent review; no user interview or hiring-effect measurement is claimed.

- Audience and purpose: retain an immediately readable AI application / Agent engineering identity, truthful work and direct recruitment actions.
- Opening: remove the portrait from Hero, keep the original asset intact, stage the existing Möbius surface in a dark spatial composition. Retain kallist as the only main brand.
- Motion grammar: an opening aperture and projected typography; slow surface precession and pointer-responsive perspective; reversible scroll camera; project-title depth, image shutters and registration-line sweeps; linked project-preview wipes; film projection reveals; a moving final signature. Use the same ink, paper, graphite, terracotta and rails across these movements.
- Interaction: native scroll, ordinary links and native film controls. No forced loading screen, audio on entry, scroll lock, cursor replacement, flash/glitch or fake product state.
- Reading: keep foreground content opaque and above ambient graphics. The gallery and three films, all five case routes, Chinese education, privacy and evidence boundaries remain.
- Accessibility: provide a named keyboard-operable ambient-motion pause/resume control. Reduced motion presents a complete static composition; canvas failure retains the existing fallback. Stop ambient rendering in hidden documents. The existing gallery retains its separate pause control.
- Delivery: PR #13 was already merged when this iteration began. Work starts from latest main `f3a662683c754710e2684f997ef58d295317fa49` on a new feature branch. Deliver a Draft PR; no merge/deploy/tag/release.

## Architecture and affected layers

Current stack: Next.js static export, typed project/film content, native dialog navigation, one deterministic Canvas 2D Möbius renderer, intersection-driven scene reveal. Extend that canvas's camera and surface projection, rather than add a second renderer or a dependency. `ContextTheatre` handles event-driven scroll/pointer choreography and user pause state; `theatre.css` gives it the composition and transitions. Content data, case routes, playback data and hosting architecture remain unchanged.

Affected files: homepage and global style import; theatre component/styles; existing ASCII environment and renderer; behavior tests and capture tooling. Risks: introductory staging hiding actions, pointer movement disrupting targets, scroll/reduced-motion state races, image clipping, foreground occlusion and CPU load. Check them through actual export/browser behavior, strict image-occlusion equality, responsive captures, keyboard/pause tests and independent review.

## Reference use

The original [bleibtgleich](https://bleibtgleich.dev/) and [Daniel Spatzek](https://www.danielspatzek.com/home/) remain reference points for spatial composition, density changes and linking interaction to the selected work. Additional studio references are inspected independently; unsupported browsers or incomplete loading are recorded without treating marketing text as observed behavior. No assets, logos, scene models or distinctive scene metaphors are copied.

This round's actual Chromium audit observed bleibtgleich's asymmetric typography/dividers and sparse-to-dense progression, and Daniel's painted oversized-type opening plus stable segmented navigation. The later Work state was not captured in this round. [Igloo](https://www.igloo.inc/) rendered a wireframe construction changing to shaded snowy architecture, but full interaction was unverified and small UI glyphs were damaged in the test renderer. [Active Theory](https://activetheory.net/) returned its unsupported-browser fallback. [Lusion](https://lusion.co/) remained in its loader even after a retry. These limits informed the choice to extend the already-working Canvas 2D surface rather than assume another site's WebGL experience would transfer reliably. Reference browsing was sampled, not full E2E.

## Acceptance

Run lint, typecheck, build, complete unit/export and Chromium suites, new motion behaviors three times, and diff check. Capture 1440, 768, 390 and 360 widths, normal-motion opening sequence and chapter scroll, paused and reduced-motion states. Verify no Hero image, actual rendered surface pixels, continuing movement, observable pause/resume, current-head Hosted CI, existing film loading/seek/retry and project/gallery behavior. View the resulting images; motion evidence and untested real-device/audio/browser layers must be reported separately.

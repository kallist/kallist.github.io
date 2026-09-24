# V1.1 chapter, pattern and ending iteration

## Evidence and decision

At the merged V1.1 baseline (`8ac462f`), Visual Practice followed the single full portrait with two additional crops up to 530px high, spaced 110px apart; at phone width they stacked as two more 370px image blocks. That made one work read like three separate large works. The revised spread retains one full work, then two compact, clearly labelled observations in a ruled strip. A short chapter seam now leads directly into the oversized `kallist` contact spread.

The [Maximilian Kaspar portfolio](https://www.maximiliankaspar.com/) was inspected at 1440px in Chromium on 2026-09-24. Its strict visible grid and high typographic scale suggest systematic placement rather than random decoration. The Kallist implementation uses neither its floral forms, page geometry, assets nor code. The [Pear audit](V11_REFERENCE_AUDIT.md) remains the earlier source for editorial rhythm.

## One family, nine local dialects

All glyphs are decorative, server-rendered HTML; each pattern uses at most twelve small monospaced marks, controlled grayscale, bounded geometry and a deliberately empty reading area. They are never source claims, image substitutes or accessible body copy.

| Chapter         | Character vocabulary                                 | Composition                                                  |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| Hero            | `k a l i s t`, `00/01`, slash, period                | Widely separated identity fragments near the portrait margin |
| RepoBound       | `pack`, `diff`, `explain`, `replay`, braces and bits | Four staggered rows with outlined selected fragments         |
| CueParcel       | `pick`, `cart`, `recipe`, `task`, `receipt`, arrows  | Diagonal itinerary and one fine connecting rule              |
| Agent Studio    | `run`, `tool`, `rag`, `mem`, `trace`, `eval`         | Rectilinear node grid with faint columns                     |
| Skin Lesion AI  | `92.96`, `78.54`, `65.49`, `eval`, `scan`            | Number-heavy, ruled evaluation register; no medical UI claim |
| Method          | `inspect`, `bound`, `honest`, `build`, `prove`       | Sparse three-line principle index                            |
| Capabilities    | numbered `context`, `runtime`, `evaluate`, `visual`  | Four ledger lines beside the work index                      |
| Visual Practice | `ink`, `line`, `stroke`, `detail`, small numbers     | Loose diagonal drawing annotations behind the compact strip  |
| Contact         | `kallist`, `mail`, `github`, `resume`, `end`         | The quietest credits-like marks above the final wordmark     |

## Interaction and transition boundary

- A pointer within 105px of a glyph causes a maximum 7px local displacement and a restrained opacity increase. Events are coalesced through `requestAnimationFrame`; leaving the chapter restores the static pattern. No React state updates occur during pointer movement.
- At touch widths, an `IntersectionObserver` gives each pattern one brief registration as the section arrives. No precise tap or hover is needed. Without JavaScript, all content and decorative marks are still present.
- Five ruled page-turn seams insert a short editorial pause. A bounded sticky label and oversized incoming number create a chapter handoff; alternating left/right placement, a warm index seam and a dark final seam prevent one repeated transition. Where CSS view timelines are supported, the number and rule register as they enter. There is no scroll snapping, scroll hijacking, wheel interception or continuous parallax.
- Under `prefers-reduced-motion`, pointer movement is ignored and all registration/timeline animations are disabled. The static final composition remains visible.

## Factual and performance boundaries

The user supplied the school, major, undergraduate dates and class year. Hero metadata, the ruled profile annotation and a quiet contact credit make that identity discoverable without creating an Education card or changing the `kallist` brand. The resume retains its existing real-name identity. There is no Person structured data in this site; none was invented for this iteration. No dependencies, network calls, canvas, WebGL or animation library were added.

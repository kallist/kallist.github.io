# V2 reference and art direction audit

The V2 brief rejected the V1.1 homepage composition. The redesign takes spatial principles from the user-provided Pear-like work and overlay references, and the transparent character-field principle from the Maximilian Kaspar-like reference. It does not copy reference code, assets, typography, copy or exact layouts.

| Reference property | V2 interpretation | Check |
| --- | --- | --- |
| Work page image beside type | Alternating editorial spreads, each with real source screenshots and truthful captions | Four case studies remain in source order |
| Structural measuring lines | Fixed left/right rails, repeating ticks, section baselines and registration marks | Rails persist through scroll and remain at 390px |
| Chapter overlay | Persistent left rail trigger opens native modal dialog with chapter list, current-section state, Escape and focus return | Pointer, keyboard and mobile E2E |
| Transparent character field | Repeating low-opacity vocabulary rows per section, masked as a transparent form over the page surface | No boxed pattern card; `aria-hidden` and pointer-inert |
| Measured reveal | IntersectionObserver registers sections once, with line/image/copy clip entry; server-rendered content is visible before hydration | No scroll hijack; reduced motion is static |
| Campus visual | Authored SVG depicting the real SCAU gate with digits and Chinese characters | The source photograph is not used as a site asset |

The previous design's ordinary top navigation, weak education annotation and two Visual Practice detail crops have been removed from the homepage. Shared header and V1.1 CSS remain for case-study and résumé routes until those pages receive a separately scoped redesign.

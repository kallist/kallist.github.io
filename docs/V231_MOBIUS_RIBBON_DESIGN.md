# V2.3.1 living Möbius context loop

## Scope

This pass changes only the fixed ASCII Context Loop, its static fallback, and the capture and regression evidence. It preserves the page sections, copy, gallery, rails, navigation, portrait, project assets, and static export.

## Surface

The previous projected figure-eight read as two connected rings. The new surface uses one closed Möbius parameterization: a circular centerline, a width term multiplied by `cos(u / 2)`, and a depth term multiplied by `sin(u / 2)`. At a full circuit the width coordinate reverses, so the surface closes after one half twist. A fixed oblique projection exposes the returning face and a narrow fold. The object does not rotate as a whole.

Seeded ASCII symbols sample the surface. Denser, guaranteed glyph filaments follow both edges and interior lanes, so the band is built from characters rather than a line or filled polygon. Depth sorting, glyph size and graphite alpha distinguish the near face from the receding face. Eight sparse context terms travel on the surface; the majority of marks remain symbols.

## Flow and composition

Glyphs advance in the longitudinal surface coordinate after the intro, with a small speed difference between interior and edge lanes. Bounded transverse drift and rare within-family character substitution add variation. The movement continues without pointer input; pointer influence is local. The renderer caps DPR and draw cadence, adapts detail to viewport width, and stops drawing when the page is hidden.

The opening sequence still forms the character surface before the Hero appears. Text and image masks activate when the Hero begins to appear, including the portrait region; the loop therefore stays whole during the isolated intro. Mobile projection uses a shorter vertical span to keep the whole fold visible above the portrait. Education, gallery and project media retain content precedence. A fixed interval reconciles `prefers-reduced-motion` state when a browser updates the media query without delivering its change event; reduced motion draws one static complete frame.

## Boundaries

The result is a stylized glyph sculpture, not a physically rendered opaque fabric. It uses Canvas 2D and a generated SVG glyph fallback; it adds no visual runtime dependency or network request. The SVG is a static fallback and cannot reproduce surface flow.

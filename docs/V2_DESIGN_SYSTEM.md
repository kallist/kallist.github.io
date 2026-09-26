# Kallist V2 design system

This document records the V2 foundation. V2.2 replaces the static layered background tree; see [living tree design](V22_LIVING_TREE_DESIGN.md) and [visual review](V22_LIVING_TREE_REVIEW.md).

## Composition

- Fixed 68px rails on desktop, 48px on tablet and 30px on mobile. Tick patterns, reading progress and active chapter markers are CSS and DOM, never images.
- Content is inset from both rails by an additional responsive gutter; the same alignment governs hero, work, education and ending.
- Horizontal baselines separate chapter labels, case metadata, image captions and links. Small rust registration crosses signal major anchors.
- The hero keeps an unequal split. Work uses four separate scene grammars: source block, process route, runtime coordinates and evaluation field. Mobile keeps rails but reflows each scene to a readable order.
- Selected internal guides enter the work scenes from the rails. Lines and image crosses provide registration without covering the main copy.

## Typography and color

- Georgia provides large editorial display and lead copy. Arial supports readable text. Courier New provides measurement metadata and character fields. No network font dependency.
- Paper `#eeeae2`, ink `#1b1b18`, graphite `#1e1f1d`, muted university surface `#3b3934`, rust `#a05439`. Project surfaces vary without a multi-color theme.
- Text hover is implemented through `WordHover` for homepage headlines, body copy and navigation, with native CSS focus treatment for links and controls. Words lift subtly without layout reflow; text remains selectable. Splitting is limited to homepage copy, keeping DOM size bounded.

## Interaction

- A fixed left trigger opens a full-width native `<dialog>` with its own continuation of the rails, a grid, chapter index and résumé route. Native modal focus containment and Escape behavior are supplemented by explicit focus restoration and body scroll locking. IntersectionObserver updates the highlighted chapter.
- The right rail shows document progress and numbered chapter positions. It listens to native scrolling through one passive listener and an animation frame. The native scrollbar remains available.
- Work fields are deterministic 30-row character graphics: fragmented context, directional parcel flow, execution topology and numeric scan. One delegated pointer listener shifts the active field a few pixels on fine pointers. The SCAU SVG remains authored geometry filled with educational digits and characters.
- RevealObserver registers each scene once as it enters the viewport; guides extend, then screenshot and copy settle. The initial server-rendered document stays visible, and reduced motion disables these transitions. No scroll interception or snap behavior.

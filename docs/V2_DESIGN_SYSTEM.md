# Kallist V2 design system

## Composition

- Fixed 68px rails on desktop, 48px on tablet and 37px on mobile. Tick patterns are CSS, never images.
- Content is inset from both rails by an additional responsive gutter; the same alignment governs hero, work, education and ending.
- Horizontal baselines separate chapter labels, case metadata, image captions and links. Small rust registration crosses signal major anchors.
- Hero and case spreads use unequal two-column ratios; mobile keeps rails but reflows spreads to one deliberate sequence.

## Typography and color

- Georgia provides large editorial display and lead copy. Arial supports readable text. Courier New provides measurement metadata and character fields. No network font dependency.
- Paper `#eeeae2`, ink `#1b1b18`, graphite `#1e1f1d`, muted university surface `#3b3934`, rust `#a05439`. Project surfaces vary without a multi-color theme.
- Text hover is implemented through `WordHover` for readable paragraphs and through native CSS hover/focus treatment for links, labels and heading blocks. Splitting is limited to homepage text copy, keeping DOM size bounded.

## Interaction

- A fixed left trigger opens a native `<dialog>` with a chapter index and résumé route. Native modal focus containment and Escape behavior are supplemented by explicit focus restoration and body scroll locking. IntersectionObserver updates the highlighted chapter.
- Section patterns are deterministic transparent vocabulary rows behind content, with no opaque card and no pointer handlers. The SCAU SVG is authored geometry filled with educational digits and characters.
- RevealObserver registers sections once as they enter the viewport; the initial server-rendered document stays visible, and reduced-motion disables transitions. No scroll interception or snap behavior.

# Kallist V1.1 design system

Historical V1.1 record. The current homepage direction is [V2](V2_DESIGN_SYSTEM.md).

## Direction

**Ink index.** An independent editorial practice that combines AI engineering evidence with the supplied manga self portrait. The public wordmark is `kallist`; the resume retains the real name. The interface uses paper, graphite, fine rules, extreme type scale, deliberate whitespace and a small rust accent. Pear informed abstract principles only; see [reference audit](V11_REFERENCE_AUDIT.md).

## Typography and scale

- System sans stack (Arial/Helvetica) carries the wordmark, project names, metrics and interface. Georgia italic marks selected second beats and does not replace readable body text. No third-party font request.
- Opening and closing `kallist` use a fluid display scale up to 370px at large widths, tight tracking and a compact line box. Chapter titles range roughly 60–205px depending on section. Body copy remains 15–24px; small uppercase technical captions are 10–12px.
- Display typography defines the layout: RepoBound is the largest project name; CueParcel stages read as a process; Skin Lesion AI values become the composition while keeping labels adjacent.

## Grid and rhythm

- Main content remains within the existing 1480px shell with adaptive gutters. A chapter can extend its background edge to edge while its content stays aligned to the shell.
- The hero wordmark crosses the portrait field. The portrait has no card frame; a multiply blend and edge mask let its white drawing surface join the paper.
- Vertical spacing alternates between long pauses and compact ruled indexes. Project chapters have distinct internal structures, not a reusable four-card pattern.
- Five short page-turn seams carry the incoming chapter number across a horizontal rule. Their sticky registration and progressive scroll animation provide a brief handoff without controlling browser scrolling; unsupported browsers keep the static ruled composition.
- Desktop uses asymmetry and occasional two-column spreads. At 780px and 520px, content order and crop are recomposed; the wordmark remains large at 390px.

## Color

- Paper `#faf9f6`, white `#fff`, ink `#171715`, muted text `#62625d`, rule `#d9d8d1`, warm field `#efede6`, restrained rust `#a34e2d`.
- Dark ink appears for the CueParcel tempo change and final spread; it does not change the white-dominant identity. No blue/purple gradient or translucent glass surface.

## Image and graphic system

- The supplied WebP portrait is the only personal artwork. The visual-practice spread shows it once in full, followed by a compact two-item detail strip explicitly labelled as crops of the **same** work. The strip yields directly to the closing chapter and brand spread.
- Project screenshots remain pinned authentic repository assets with their source and demo/synthetic captions. Hover applies only a small scale change.
- CSS fragments use thin diagonal lines and tiny rotated squares. They are newly drawn supporting marks, not a trace of the portrait. The favicon uses the same abstract fragment language and replaces the WZ monogram.
- Nine section patterns use server-rendered characters and numbers as sparse marginalia. Their placements and arrangements vary with each chapter's meaning while retaining the same monospaced scale, grayscale and interaction radius. See [iteration notes](V11_PATTERN_ITERATION.md).

## Motion and interaction

- Hero wordmark reveals through clipping in 850ms; portrait reveals and settles in about 1.15s; supporting label resolves last. No loader or scroll hijacking.
- Link arrows move a few pixels and project media scales about 1.5% on hover. Native anchors preserve deep links; the native `<details>` menu serves smaller screens.
- Nearby glyphs repel by at most 7px and gain local contrast on fine-pointer movement; one animation frame handles each input burst. Touch users see a single section-entry registration rather than hover dependence. The unenhanced HTML remains complete.
- `prefers-reduced-motion` collapses entrance and hover motion to a static final state. The existing global reduced-motion rule also disables smooth scrolling.
- Focus outlines, image alt text, captions, labelled evaluation metrics and keyboard navigation remain part of the design rather than optional polish.

## Implementation boundary

`src/app/page.tsx` contains the editorial homepage; `src/app/v11.css` styles it and updates shared brand surfaces. `src/components/section-pattern.tsx` handles decorative local interactions, and `chapter-transition.tsx` supplies static page-turn marks. School, major and class year are presented as hero metadata, a ruled profile annotation and a closing credit, while the real name remains in the resume. Case studies and the resume keep their factual content and static routes. No new dependencies, browser data request, backend or database is introduced.

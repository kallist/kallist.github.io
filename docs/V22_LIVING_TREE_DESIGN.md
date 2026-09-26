# V2.2 living ASCII tree

## Intent and reference boundary

The tree is the persistent atmospheric identity of the portfolio. The visual reference at `https://www.maximiliankaspar.com/?ref=siteinspire` informed the principle of a figure made from character density with continuous internal motion. The Kallist topology, silhouette, glyph positions, motion functions, palette and timing are authored here. No reference source, asset, animation frame or traced silhouette is used.

## Structure

`createTreeModel` generates a deterministic branching tree from one seed. Four connected trunk segments carry asymmetric primary forks. Secondary and terminal branches attach to parents at explicit positions. A normalized character field samples distance to those branches and to sparse canopy anchors. Density controls whether a glyph exists and selects a dark, medium or light character family; there is no drawn tree path, fill mask or outline beneath the glyphs. Far, middle and near are visual tone groups within one model.

The canvas renderer maps normalized coordinates into the fixed viewport. Every branch has its own slow phase and amplitude. An animated parent changes its children's anchor and angle, while the trunk moves least. Glyphs follow their branch, then receive restrained local displacement. A small stable subset substitutes within its density family. Edge canopy characters breathe through local opacity and occasional disappearance. Far, middle and near groups differ in opacity, scale, slow drift and pointer response. These shifts stay within a few pixels; branch deformation remains the main motion.

## Intro and interaction

An immediately visible, narrow trunk preview covers the gap before Canvas initializes. The procedural trunk resolves from about 0.15 seconds, followed by primary, secondary and fine branches, then canopy marks. The tree reaches its full state by about 1.7 seconds. Existing rails and Hero text begin their entrance after the tree has started. There is no blocking loader. A fine pointer softly pushes nearby branch glyphs within a bounded radius; the tree moves autonomously without hover. Touch requires no precision interaction.

## Layering and readability

The fixed canvas is above chapter surface colors and below the content frames, images, headings and links. Light pages use graphite glyphs; Education, CueParcel and Contact use pale glyphs. Existing semi-transparent editorial surfaces and opaque media protect important reading areas. The tree never receives pointer events or focus and is hidden from assistive technology.

## Performance and accessibility

React only mounts and cleans up the renderer. Topology is generated once per viewport detail tier; the render loop owns animation state and does not update React each frame. Canvas uses a capped device pixel ratio of 1.5 on larger screens and 1.25 on mobile, batches glyphs by layer and density tone, and caps redraws to approximately 30 per second on desktop and 20 on smaller widths. At 390px the model is compressed horizontally to retain the trunk and branch hierarchy within the viewport. The loop stops while the tab is hidden. Resize rebuilds detail only when a breakpoint changes. The `prefers-reduced-motion` state draws a complete static character tree, disables local deformation and pointer response, and leaves content available. A static local SVG remains as a no-canvas fallback, not as the primary animation.

No runtime dependency, external request, analytics or backend was added.

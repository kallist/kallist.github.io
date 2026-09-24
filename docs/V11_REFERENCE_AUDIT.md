# V1.1 reference and current-site audit

Reviewed 2026-09-24 at 1440×900 and 390×844 in Chromium. Sources: [Pear](https://pear.no/?ref=siteinspire#top) and [current Kallist production](https://kallist.github.io/), captured before implementation. Pear's page returned HTTP 200 and its hero rendered at both widths. Beyond the hero, its film remained at 0% in this automated browser and several later frames were blank; observations about its detailed scroll animation are therefore limited to the visible hero and DOM structure, not a claim that the full experience was reproduced locally.

## A. Why the reference is effective

- One large, spare headline gives the first viewport a clear focal point. The smaller line beneath it carries the explanation without competing for scale.
- A slim persistent frame, fine rules and an unusually long sequence of chapter-sized spaces make the page feel authored as one piece rather than a stack of cards.
- Serif display text, compact technical labels and abrupt shifts between dense and empty regions give the content distinct tempos.
- On mobile, the headline and controlled framing remain legible instead of becoming a miniature desktop layout.

## B. Transferable principles

Use type as composition, deliberate whitespace, a legible small-label system, fewer repeated component shapes, and transitions that guide attention. Treat ordinary scrolling as the narrative spine; avoid scroll locking or a loading gate.

## C. Boundaries: what will not be copied

No Pear copy, logo, font, image/video, blue-black palette, exact geometry, frame ornament, navigation control, or animation sequence. The reference's loading film and long blank stages are also unsuitable for an evidence-led engineering portfolio.

## D. Current Kallist critique

- The WZ monogram and legal name lead the public identity, while the desired name `kallist` is absent.
- The first viewport reads as a familiar left-text/right-image portfolio hero; the portrait sits inside a conventional rectangle instead of affecting the page's visual language.
- Four projects use closely related image/text assemblies. Their different subject matter does not change their visual tempo enough.
- Most headings follow one scale and alignment; project evidence is strong, but the rhythm becomes predictable over the long page.
- The mobile layout is readable and functional, yet it inherits the desktop hierarchy rather than asserting a distinct visual composition.

## E. Original Kallist interpretation

Create an **ink index**: a paper-white editorial surface where the word `kallist` occupies the opening spread and the supplied portrait crosses its typographic field. Sparse diagonal rules and small fragments echo the drawing's directional energy without tracing it. Four projects become distinct chapters: RepoBound as the large anchor, CueParcel as a typographic process, Agent Studio as an execution trace, and Skin Lesion AI as a plainly labelled research result. The profile becomes a two-beat statement, capabilities read as credits with evidence, and the single real artwork is shown as a full work plus labelled crops. One restrained rust accent carries focus and numbering. CSS handles entrance, hover and reduced-motion behavior; no animation library or additional media is required.

## UI UX Pro Max input and selection

The skill search for an experimental editorial portfolio suggested a spacious, asymmetric, type-led system and reinforced visible focus, contrast, mobile width checks, lightweight motion and reduced-motion support. Its generic blue CTA palette, hero/features/CTA formula, and GSAP sample conflict with this brief and were not adopted. The implementation keeps static Server Components for content and native links for navigation.

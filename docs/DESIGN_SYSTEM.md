# Implemented design system

## Direction

Swiss editorial grid meets a personal ink drawing. Engineering evidence has the most space; hand-drawn disruption is concentrated in the hero and visual section. UI UX Pro Max searches for editorial portfolio direction, Swiss minimalism and keyboard focus informed the layout, but its generic dark palettes and testimonial patterns were rejected because they conflict with the supplied white, evidence-led brief.

## Tokens and layout

- Paper `#faf9f6`, ink `#171715`, muted text `#62625d`, rule `#d9d8d1`, tint `#f1efe9`, restrained terracotta `#a34e2d`.
- System sans stack for interface and headlines; Georgia for editorial italic phrases and display numbers. No third-party font request.
- Main shell: up to 1480px, adaptive gutters. Hero: asymmetric two-column composition; case study: reading column with separate project facts. Mobile recomposes to one vertical reading order.
- Thin rules separate sections and project evidence. Borders carry hierarchy instead of heavy shadow or rounded cards.
- Real screenshots stay in their native aspect ratio with descriptive captions. The portrait uses a responsive crop without image generation or face changes.

## Interaction and access

- Hover/focus transitions: about 200–230ms; portrait entrance: 900ms. All information is visible without animation or JavaScript except the optional print button.
- `prefers-reduced-motion` removes entrance and transition motion and disables smooth scrolling.
- Links and buttons retain visible focus outlines, clear labels and touch-friendly minimum heights. Native `<details>` provides the mobile menu; all anchors remain real deep links.
- Breakpoints at 1050px, 780px and 520px. QA targets 1440, 768, 390 and 375px.

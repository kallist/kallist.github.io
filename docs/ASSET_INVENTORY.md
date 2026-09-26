# Asset inventory

Assets were copied on 2026-09-23. Project images are originals from the cited public repositories at pinned commits, with no face or product UI reconstruction.

| Local asset | Origin | Authenticity / display note |
| --- | --- | --- |
| `assets/self-portrait-original.png` | User supplied image `73311c53-c3f0-4d1c-a8de-3051e9a2e5a8.png` | Unmodified original retained in repository, outside static export |
| `public/portrait/self-portrait.webp` | Encoded from supplied original with Pillow WebP quality 95, same 1448×1086 pixels | Browser asset used in hero; reduced from 3.59 MB to 0.83 MB without composition changes |
| `assets/gallery/*.png` | Four images supplied by the user for V2.1 | Original files retained outside static export; authorship and date are not inferred |
| `public/gallery/*.webp` | Encoded from those four supplied PNGs with Pillow WebP quality 92, preserving dimensions | Four distinct supplied images: two landscape character illustrations and two portrait comic drawings |
| `public/portrait/self-portrait.webp` in the gallery | Same documented original self portrait already used in Hero | Fifth distinct gallery image, captioned as also shown in Hero; no separate new artwork is implied |
| `public/projects/repobound-hero.png` | [RepoBound source](https://github.com/kallist/RepoBound/blob/785c68116ad870527294ac0e2f34307c14791c82/docs/assets/repobound-hero.png) | Authentic Studio screenshot of a synthetic fixture |
| `public/projects/repobound-context.png` | [RepoBound source](https://github.com/kallist/RepoBound/blob/785c68116ad870527294ac0e2f34307c14791c82/docs/assets/repobound-context.png) | Authentic Studio screenshot of a synthetic fixture |
| `public/projects/cueparcel-lens.png` | [CueParcel source](https://github.com/kallist/CueParcel/blob/86f8b889e4791eed7303b718b0bc39c1d1c731c0/docs/store/edge/screenshots/01-context-lens.png) | Authentic extension screenshot in documentation |
| `public/projects/cueparcel-taskspec.png` | [CueParcel source](https://github.com/kallist/CueParcel/blob/86f8b889e4791eed7303b718b0bc39c1d1c731c0/docs/store/edge/screenshots/04-taskspec.png) | Authentic extension screenshot in documentation |
| `public/projects/agent-studio-trace.png` | [Agent Studio source](https://github.com/kallist/agent-studio/blob/f3a35c8a1b52345dae7bca0f607f034c7dfdd176/docs/assets/run-trace.png) | Authentic screenshot of a demo/mock run, captioned |
| `public/projects/skin-lesion-result.png` | [Skin Lesion source](https://github.com/kallist/skin-lesion-ai-platform/blob/fce9a176e787dc66b67d28a79c427bc0a34ebcda/docs/assets/screenshots/06_detect_result.png) | Authentic demo screenshot; no patient image implied |
| `public/resume/wei-zhuojie-resume-public.pdf` | Chromium print from the site's phone-free `/resume/` route | One A4 page, rendered and text-extracted locally; no original resume PDF copied |
| `src/app/icon.svg` | Repo-native abstract ink fragments | Replaces the WZ mark; drawn from the site's line-and-square grammar, not a third-party icon |
| `public/graphics/scau-gate.svg` | Repo-native numeric and Chinese character drawing, composed while viewing [Zhou Guanhuai's real photograph of the SCAU main gate](https://commons.wikimedia.org/wiki/File:South_China_Agricultural_University.jpg) (CC BY-SA 4.0) | The photo is a shape reference only; it is not embedded, displayed, traced pixel-for-pixel or distributed. A deterministic script positions individual glyphs to form the roof tiers, columns and surrounding character cloud. Attribution to the reference photographer and [license](https://creativecommons.org/licenses/by-sa/4.0/) is recorded here. |
| `public/graphics/ascii-tree-{near,middle,far}.svg` | Repo-native glyph density composition from the V2.1 reference supplied by the user | Deterministic branch, crown and trunk cells form the three depth layers (9,235 glyphs total); static SVG files keep the glyph nodes out of the homepage DOM. CSS provides slow depth drift, disabled for reduced motion. |

The source resume PDFs are intentionally excluded from public assets.

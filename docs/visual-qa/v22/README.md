# V2.2 local static-export visual QA

Captured from the built `out/` site with Chromium. Reproduce with `node tests/static-server.mjs` and `node scripts/capture-v22.mjs`; the latter writes WebP frames and [measurements](capture-results.json). Screenshots are local QA evidence and do not imply deployment.

| View | Evidence |
| --- | --- |
| Intro | [~0.2s trunk](intro-trunk-1440.webp), [~0.7s branches](intro-branches-1440.webp), [~1.3s page](intro-page-1440.webp) |
| Tree and movement | [isolated start](tree-isolated-0.webp), [5.5s later](tree-isolated-5s.webp), [pointer frame](tree-pointer.webp) |
| Desktop 1440 | [Hero](hero-1440.webp), [RepoBound](repobound-1440.webp), [CueParcel](cueparcel-1440.webp), [Agent Studio](agent-studio-1440.webp), [Education](education-1440.webp), [Visual Practice](visual-practice-1440.webp), [Contact](contact-1440.webp), [full page](full-1440.webp) |
| Tablet 768 | [Hero](hero-768.webp), [work](repobound-768.webp), [Education](education-768.webp), [full page](full-768.webp) |
| Mobile 390 | [Hero](hero-390.webp), [project](repobound-390.webp), [Education](education-390.webp), [Visual Practice](visual-practice-390.webp), [full page](full-390.webp) |

The pointer frame differs partly because autonomous motion continued between captures. The difference is not a calibrated pointer-only measurement.

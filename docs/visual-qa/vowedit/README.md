# VowEdit featured case — visual QA

Local built static export, reviewed 2026-10-07. These are actual automated Chromium captures at `http://127.0.0.1:4173/`, not production or physical-phone evidence. The VowEdit source repository was read only; no provider, MCP action or VowEdit service was executed by this portfolio task.

## Architecture and scope

Project facts remain in `src/content/projects.ts`. VowEdit is case 01; existing projects are renumbered 02–05 with their URLs and factual content preserved. The homepage reuses the existing scene/reveal/word-hover grammar, measured rails and Agent character field. CHANGE / KEEP are text-labelled, and the story has a paper reading surface plus the existing loop avoidance masks. The shared detail template supports optional typed workflow steps, explicit second-image captions and an optional approach-stage image position. No new runtime dependency, API, database, animation library or deployment workflow was introduced. Gallery, portrait, education, resume and Möbius geometry/motion remain unchanged.

## Executed gates

| Command | Result |
| --- | --- |
| `npm ci` | PASS; existing lockfile unchanged. Audit reports 7 high-severity dependency entries. |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; all five case routes exported |
| `npm test` | 11 passed; 0 failed, skipped or cancelled |
| `npm run e2e` | 26 passed; 0 failed or skipped; final full run after layout corrections |
| `node scripts/capture-vowedit.mjs` | PASS at 1440×1000, 390×844 and 360×844 |
| `git diff --check` | PASS |

On Windows, Chromium was installed for the locked Playwright version using a temporary workspace browser cache. `$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.qa/pw-browsers'` was set for browser commands. That cache and raw validation resources are excluded from the commit. Hosted CI is verified separately against the final PR HEAD and reported in the PR/delivery report; local PASS is not a Hosted CI claim.

The first browser attempt lacked the locked Chromium executable. After installation, one existing pattern-count assertion correctly needed 9 → 10 for the fifth project. Other assertions were retained; the complete final suite passed. Screenshot review prompted a non-italic VowEdit heading, earlier problem copy, full uncropped mobile display of the already documented source crop, and an aligned workflow strip.

## Visual and interaction evidence

| Check | Evidence / result |
| --- | --- |
| Featured scene and readable contract | `homepage-{1440,390,360}.webp`: title, positioning, CHANGE / KEEP, Agent proposal → human approval, problem and case link |
| Screenshot / transition into RepoBound | `homepage-image-{1440,390,360}.webp`: full screenshot aspect, explicit Mock caption, full-image link and next scene |
| INDEX and five numbered projects | `index-{1440,390,360}.webp`; the narrow overlay scrolls, Escape closes and focus returns to INDEX |
| Detail hero and complete product flow | `detail-hero-{1440,390,360}.webp`: four-column desktop / two-column phone flow; semantic ordered list |
| Problem, approach and shared contract image | `detail-body-{1440,390,360}.webp`, `detail-full-{1440,390,360}.webp` |
| Honest limits, evidence links and focus | `detail-evidence-{1440,390,360}.webp`: visible focus ring, wrapping links, no clipped body copy |
| Pointer / motion | `homepage-hover-1440.webp`, `homepage-motion-1440.webp`; hover changes text color without changing measured heading width (427.375 px) |
| Responsive dimensions | `capture-results.json`: homepage and detail overflow = 0 px at all three widths |
| Routing / images / privacy | Full E2E: all five cases deep-load, VowEdit refreshes, next-case navigation cycles in the new order, all screenshots decode, resume retains true name and no phone text |
| Reduced motion / keyboard / existing behavior | Full E2E retains previous rails, gallery/touch, language, loop, resume, focus and navigation assertions. Capture stills use reduced motion; separate motion capture enables normal motion. |

No image, HTML or script request failed in the capture. **Existing limitation:** the Windows static export produces speculative Next.js segment `.txt` prefetch 404s for case/resume routes. These are recorded in `capture-results.json`, separate from page/image errors; normal navigation falls back successfully. This behavior was already documented in the V1.1 iteration. It has not been patched as part of this content expansion, and production behavior is not claimed.

## Second read-only self-review

After the corrections, the final desktop and mobile captures, full case page, evidence/focus states and source diff were reviewed again without code changes. This is a recruiter-oriented self-review, not an external review or a timed recruiter study.

| Recruiter question | Visible answer |
| --- | --- |
| What is VowEdit? | Kicker: Agent-controlled image re-editing; local workbench in the problem/outcome. |
| What problem does it solve? | A local correction can change unrelated faces, backgrounds or composition. |
| Why CHANGE / KEEP? | Allowed editing region versus explicitly protected region; labels work without color. |
| Why A/B/C? | Safe / Balanced / Bold offer three degrees of change under one contract. |
| Why Ghost / evaluation? | Inspect actual changes, preservation and drift; pixel scores do not establish semantics. |
| What does the Agent do? | Propose a contract, request actions and read execution/report evidence through MCP. |
| Why does the human keep control? | Separate approval and review; the Agent cannot approve, adoption remains a human decision. |

Blocking / important findings remaining: none for this portfolio feature. Existing dependency audit and local prefetch limitations are retained above. No claims of SaaS deployment, commercial users, time savings or model success were introduced. Two authentic project-owned Mock UI crops are pinned to VowEdit `8bb5c722bd8270b102f51cda9fa7f17b0bd991e4`; exact source rectangles/hashes and evidence boundaries are in the asset inventory and evidence matrix.

NOT TESTED: production VowEdit portfolio page (not deployed), physical phone, Safari, Firefox, screen reader, Docker, VowEdit real-provider generation. Embedded MCP UI remains NOT IMPLEMENTED in the cited VowEdit snapshot. Pixel semantics and human creative quality are not inferred from Mock or automated approvals. No merge, tag, release or deployment was performed.

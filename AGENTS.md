# Portfolio site working rules

- This is Wei Zhuojie's public, static personal portfolio. Next.js exports to `out/` for GitHub Pages. Keep all core behavior compatible with static hosting; no server API, database or browser GitHub API calls.
- Commands: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`, `npm run e2e`. `npm test` inspects the completed static export, so run it after build. Use Node 20.9 or newer.
- Keep facts in `src/content/projects.ts` and cite primary evidence in `docs/EVIDENCE_MATRIX.md`. A project claim must be supported by public source, a stored result or clearly identified user supplied material. Preserve unfavorable evaluation findings and demo/mock boundaries.
- Use the real supplied portrait and authentic repository screenshots only. White editorial layout, graphite type and restrained terracotta accent are the visual system. Avoid generic AI gradients, large SaaS cards, heavy blur, scroll hijacking and skill bars.
- Never publish a phone number, credentials, private resume PDF or local paths. Keep public resume phone-free. Do not copy assets into `public/` without an origin entry in `docs/ASSET_INVENTORY.md`.
- Validate keyboard focus, mobile layouts, reduced motion, direct nested route loads and exported assets. Review the actual export, not only `next dev`.
- CI validates PRs. Pages deploys only from `main` or manual dispatch. A Draft PR does not authorize merge or publication.

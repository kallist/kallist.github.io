# Content audit — 2026-09-23

## Sources reviewed

- User supplied portfolio brief and self portrait.
- Existing local Chinese resume drafts and `resume/project-evidence.md` in the parent workspace. These are seeds, not proof of current public status.
- Current public `main` branches of [RepoBound](https://github.com/kallist/RepoBound), [CueParcel](https://github.com/kallist/CueParcel), [Agent Studio](https://github.com/kallist/agent-studio), and [Skin Lesion AI Platform](https://github.com/kallist/skin-lesion-ai-platform). GitHub API was used to inspect their trees and selected source artifacts.
- [CueParcel inclusion PR #50](https://github.com/yzfly/awesome-context-engineering/pull/50), merged 2026-09-20.

## Narrative and order

The site introduces an engineer working on inspectable AI context and agent systems, then shows four case studies in the specified order: RepoBound, CueParcel, Agent Studio, Skin Lesion AI Platform. Visual work supports this story through the supplied self portrait. The final section offers email and GitHub contact.

## Corrections and omissions

- The local `resume/README.md` says the public Agent Studio repository is unavailable. Its current public `main` is accessible, so the site links to it. This dated conflict is not silently copied into the site.
- RepoBound's own README says its Studio demo is a synthetic fixture demonstrating context selection. The image caption preserves that limit. It does not demonstrate an agent fixing code.
- CueParcel PR #50 is merged, so the site may state that its listing was accepted. It does not claim usage or popularity.
- Skin Lesion's external evaluation is less favorable than its internal test. Both accuracy values and external malignant recall appear together. The site states that this is an internship engineering practice, not a clinical product.
- No user counts, star counts, token savings, clinical performance claims, provider coverage claims, or unverified personal authorship percentages are used.
- No gallery is fabricated from a single supplied artwork. The visual section presents only the original portrait and describes it as a supplied work; more artwork can be added later.

## Privacy

Existing resume PDFs contain contact placeholders or unreviewed personal information. None are copied into `public`. The site publishes only the email provided in the brief and a new phone-free HTML resume. Static output is checked for phone-number and private-path patterns.

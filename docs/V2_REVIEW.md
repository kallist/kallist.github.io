# V2 review notes

## Scope

Homepage visual and navigation system only. Project facts, case routes, résumé identity, static export and hosting workflow remain intact. No phone number, fabricated degree or clinical claim was added.

## Decisions

- The photo discussed during implementation is **not used**. After the user corrected the direction, the local download was removed and a numeric SVG illustration was authored instead. Its visual reference and rights are listed in `ASSET_INVENTORY.md`.
- The education section displays school, major, status and dates in Chinese only. The résumé continues to contain the owner's real name.
- V1.1's two mini artwork crops are removed. Visual Practice now has one dominant work and a restrained caption.

## Validation boundary

Record exact local and Hosted CI results in the PR body after the latest commit. Local viewport screenshots do not establish physical phone or cross-browser behavior. This Draft PR must remain unmerged and undeployed.

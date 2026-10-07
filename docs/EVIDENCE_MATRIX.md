# Evidence matrix — audited 2026-09-23

| Public claim | Project | Source / verification | Status |
| --- | --- | --- | --- |
| Local-first context compiler with bounded pack, explain/control/replay, CLI/MCP/Studio | RepoBound | [README](https://github.com/kallist/RepoBound/blob/785c68116ad870527294ac0e2f34307c14791c82/README.md), public source tree | Verified at cited SHA |
| Studio example is a synthetic session fixture | RepoBound | Same README, 30-second tour and image note | Verified; captioned |
| Context Lens, Cart, Recipe, TaskSpec, Receipt and MV3 extension | CueParcel | [README](https://github.com/kallist/CueParcel/blob/86f8b889e4791eed7303b718b0bc39c1d1c731c0/README.md), `docs/store/edge/screenshots` | Verified at cited SHA |
| Included in awesome-context-engineering | CueParcel | [Merged PR #50](https://github.com/yzfly/awesome-context-engineering/pull/50) | Verified 2026-09-23 |
| Run/RunEvent evidence, RAG, Memory and evaluation workspace | Agent Studio | [README](https://github.com/kallist/agent-studio/blob/f3a35c8a1b52345dae7bca0f607f034c7dfdd176/README.md), `docs/ARCHITECTURE.md`, `docs/assets/run-trace.png` | Verified at cited SHA; image is a demo |
| Local skin lesion inference application using ResNet50/FastAPI/React | Skin Lesion AI Platform | [README](https://github.com/kallist/skin-lesion-ai-platform/blob/fce9a176e787dc66b67d28a79c427bc0a34ebcda/README.md), `docs/assets/screenshots` | Verified at cited SHA |
| Internal accuracy 92.96% (n=270); external accuracy 78.54% (n=797); external malignant recall 65.49% | Skin Lesion AI Platform | [Evaluation report](https://github.com/kallist/skin-lesion-ai-platform/blob/fce9a176e787dc66b67d28a79c427bc0a34ebcda/docs/ml/EXTERNAL_EVALUATION.md), [metrics JSON](https://github.com/kallist/skin-lesion-ai-platform/blob/fce9a176e787dc66b67d28a79c427bc0a34ebcda/artifacts/external_test/external_metrics.json) | Verified as stored evaluation; external images/model execution not rerun |
| South China Agricultural University, degree and 2027 class; 2026 internship | Personal profile | User supplied brief and local resume drafts | User supplied, not independently verified by a public credential |
| Portrait is the owner's original visual practice | Visual | User supplied image and brief | User supplied; no independent provenance check |

Claims not published: generalized token savings, live clinical fitness, customer deployments, real provider coverage, star/download numbers, and any unpublished visual works.

## VowEdit — audited 2026-10-07

Pinned snapshot: `8bb5c722bd8270b102f51cda9fa7f17b0bd991e4`, [merged PR #4](https://github.com/kallist/vowedit/pull/4). Public default branch remains `feat/vowedit-v0.1`; V0.3 links use the actual merged commit rather than assuming `main`.

| Public claim | Primary source at pinned snapshot | Evidence boundary |
| --- | --- | --- |
| CHANGE / KEEP contract; three deterministic strategies and A/B/C; Ghost / Report | [Product README](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/README.md), [candidate plans](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/backend/candidate_plans.py) | Product workflow, not guaranteed editing quality. Safe / Balanced / Bold are strategy IDs; the captured UI labels them restrained / balanced / stronger change. |
| Nine scoped MCP tools share a canonical draft; Agent requests cannot replace human approval | [Agent architecture](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/AGENT.md), `backend/agent_services.py`, `backend/mcp_server.py` | Contract, generation, adopt and continue have separate approval boundaries. Web UI is the visible fallback; embedded MCP UI is not implemented. |
| Complete V0.3 workflow tested with Mock | [V0.3 validation](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/V0.3-VALIDATION.md), [local MCP evidence](https://github.com/kallist/vowedit/tree/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/evidence/agent-v03) | Published source evidence; this portfolio task does not rerun VowEdit. Automated fixture approvals are not human creative-review proof. V0.3 RunningHub / ComfyUI real generation was not retested. |
| Pixel preservation / drift metrics and Boundary Lock | [Validation boundary](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/V0.3-VALIDATION.md) | Pixel metrics do not prove semantic adherence or subjective quality. Boundary Lock preservation is compositing, not a model preservation guarantee. |
| Authentic shared-draft and Ghost / candidate screenshots | [Screenshot manifest](https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/evidence/agent-v03/README.md) | Project-owned Mock fixture; cropped and losslessly encoded. Provenance and hashes in asset inventory. |

No commercial adoption, SaaS deployment, time savings or improved model success rate is claimed. V0.2 historical RunningHub pipeline evidence is not promoted to V0.3 provider coverage.

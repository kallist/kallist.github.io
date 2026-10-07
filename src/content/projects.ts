export type Project = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  limit: string;
  stack: string[];
  capabilities: string[];
  repository: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  secondImage?: string;
  secondImageAlt?: string;
  secondImageCaption?: string;
  secondImagePlacement?: "approach";
  flow?: { title: string; detail: string }[];
  evidence: { label: string; href: string }[];
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "vowedit",
    number: "01",
    title: "VowEdit",
    kicker: "Agent-controlled image re-editing",
    summary: "Change what you ask. Keep what you don’t.",
    problem: "AI image editing often changes more than the user asked for: a local correction can also alter a face, background, composition or lighting. VowEdit makes the intended change and the protected regions explicit, then keeps the result open to inspection and human control.",
    approach: [
      "Contract — Mark CHANGE as the allowed editing region and KEEP as the protected region. Together with the instruction, these form an inspectable editing contract.",
      "Strategy — Safe, Balanced and Bold produce candidates A, B and C from the same boundaries. Different instructions offer different degrees of change; they are not guarantees of quality.",
      "Evaluation — Compare Before / After, inspect Ghost View and read the structured Report: CHANGE difference, KEEP preservation, outside preservation and unexpected drift. Pixel metrics do not establish semantic quality or decide which image is best.",
      "Agent control — Through nine scoped MCP tools, an Agent can create and read a draft, propose a contract, request generation, read a Run and Report, and request Adopt or Continue. Critical requests remain pending until an independent approval in the VowEdit Web UI; the Agent cannot approve them.",
      "Human review — Inspect prompt adherence separately from pixel ranking. Approve or reject adoption, take over the same canonical edit, then Continue Editing from the adopted pixels with a fresh contract.",
    ],
    flow: [
      { title: "Original", detail: "Start with an authorized image." },
      { title: "CHANGE / KEEP", detail: "Define what may change and what stays protected." },
      { title: "Agent proposal", detail: "Inspect the proposed editing contract." },
      { title: "Human approval", detail: "Confirm the contract and generation separately." },
      { title: "A / B / C", detail: "Safe / Balanced / Bold strategies." },
      { title: "Evaluation", detail: "Before / After · Ghost · Report." },
      { title: "Human review", detail: "Judge the instruction, beyond pixel scores." },
      { title: "Adopt → Continue", detail: "Confirm the result; start the next edit." },
    ],
    outcome: "A local AI image re-editing workbench where an Agent can operate the workflow while the user can inspect, approve, reject and take over the same canonical edit. Agent-operable. Human-observable. Human-overridable.",
    limit: "The complete V0.3 Agent workflow was tested with Mock pixel simulation. V0.3 RunningHub / ComfyUI real-provider generation was not retested. Pixel evaluation is not semantic quality; Boundary Lock preserves pixels through compositing, not a guarantee that the model itself preserves every region. Embedded MCP UI is not implemented: the human-visible flow uses VowEdit Web UI. Automated fixture approvals do not establish human creative-review quality.",
    stack: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "MCP", "SQLite"],
    capabilities: ["AI image product", "Agent systems", "Evaluation & human approval"],
    repository: "https://github.com/kallist/vowedit",
    image: "/projects/vowedit-workbench.webp",
    imageAlt: "VowEdit Mock workbench with Ghost View, three candidates and independent human review pending",
    imageCaption: "Authentic V0.3 Web UI crop: project-owned Mock pixel simulation, Ghost View and A/B/C. Human review is pending; this is not a real model editing result.",
    secondImage: "/projects/vowedit-agent-report.webp",
    secondImagePlacement: "approach",
    secondImageAlt: "VowEdit shared draft showing the instruction, CHANGE and KEEP masks, strategies and an applied Agent contract request",
    secondImageCaption: "Authentic V0.3 shared-draft UI crop: saved CHANGE / KEEP contract, three strategies and a separately accepted Agent proposal. Mock fixture; an accepted contract alone does not execute generation.",
    evidence: [
      { label: "Source / product repository — V0.3 snapshot", href: "https://github.com/kallist/vowedit/tree/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4" },
      { label: "Agent / MCP architecture & human approval", href: "https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/AGENT.md" },
      { label: "V0.3 validation — Mock and real-provider boundaries", href: "https://github.com/kallist/vowedit/blob/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/V0.3-VALIDATION.md" },
      { label: "Original screenshots & sanitized local MCP evidence", href: "https://github.com/kallist/vowedit/tree/8bb5c722bd8270b102f51cda9fa7f17b0bd991e4/docs/evidence/agent-v03" },
    ],
  },
  {
    slug: "repobound",
    number: "02",
    title: "RepoBound",
    kicker: "Repository context engineering",
    summary: "See and control the repository context a coding agent receives.",
    problem:
      "A coding task needs a useful slice of a repository, yet context selection can be difficult to inspect. Files may be dropped under a budget without a clear reason.",
    approach: [
      "Index repository sources, find task-relevant material and compile a bounded Context Pack.",
      "Record selected and dropped candidates in a Capsule so the choice can be explained and adjusted.",
      "Compare revisions and replay saved context only when its sources still verify. CLI, MCP and Local Studio share the underlying workflow.",
    ],
    outcome:
      "A local workflow for inspecting, controlling and revisiting context before an agent begins its coding task.",
    limit:
      "This compiles repository context; it does not perform coding or prove an improvement in agent success or token savings.",
    stack: ["TypeScript", "SQLite", "MCP", "CLI", "Local Studio"],
    capabilities: [
      "Context engineering",
      "Evidence design",
      "Product interface",
    ],
    repository: "https://github.com/kallist/RepoBound",
    image: "/projects/repobound-hero.png",
    imageAlt:
      "RepoBound Studio showing a task, context budget and selected versus dropped files",
    imageCaption:
      "Real Studio screenshot using the repository's synthetic session fixture. No agent coding result is shown.",
    secondImage: "/projects/repobound-context.png",
    secondImageAlt: "RepoBound Studio context selection view",
    evidence: [
      {
        label: "Source and product guide",
        href: "https://github.com/kallist/RepoBound",
      },
      {
        label: "Recorded benchmark boundary",
        href: "https://github.com/kallist/RepoBound/blob/main/benchmarks/RESULTS_REVIEW_V1.md",
      },
    ],
  },
  {
    slug: "cueparcel",
    number: "03",
    title: "CueParcel",
    kicker: "Web context workbench",
    summary:
      "Pick, organize and deliver webpage context with its source still visible.",
    problem:
      "Copying an entire webpage into an agent can mix useful source material with noise and obscure what was actually selected.",
    approach: [
      "Use Context Lens to select page regions, then combine sources in a Cart.",
      "Apply a Recipe and export a TaskSpec or agent-ready text with a Receipt describing included and excluded material.",
      "Treat webpage text as untrusted input and keep source content distinct from generated instructions.",
    ],
    outcome:
      "An inspectable browser workflow for turning chosen web material into structured agent context.",
    limit:
      "The extension's trust boundary does not eliminate every prompt injection risk; no claim of user adoption is made.",
    stack: ["TypeScript", "Chrome MV3", "Side Panel", "Playwright"],
    capabilities: [
      "Context engineering",
      "Product interface",
      "Browser security",
    ],
    repository: "https://github.com/kallist/CueParcel",
    image: "/projects/cueparcel-lens.png",
    imageAlt:
      "CueParcel extension Context Lens selecting part of an MDN webpage",
    imageCaption:
      "Source repository screenshot of Context Lens in the extension.",
    secondImage: "/projects/cueparcel-taskspec.png",
    secondImageAlt: "CueParcel TaskSpec view in the extension",
    evidence: [
      {
        label: "Extension source",
        href: "https://github.com/kallist/CueParcel",
      },
      {
        label: "Merged community listing",
        href: "https://github.com/yzfly/awesome-context-engineering/pull/50",
      },
    ],
  },
  {
    slug: "agent-studio",
    number: "04",
    title: "Agent Studio",
    kicker: "Agent runtime and evaluation",
    summary:
      "Build, run and inspect tool-using agents from the same execution evidence.",
    problem:
      "A final answer alone gives little insight into tool use, retrieval, memory participation or why a run stopped.",
    approach: [
      "Persist a Run and ordered RunEvents; expose execution detail and traces from those records.",
      "Connect agent execution to knowledge retrieval, durable memory and evaluation workflows.",
      "Bound execution with step limits, timeouts, cancellation and tool permission checks.",
    ],
    outcome:
      "A local workbench that makes the agent lifecycle inspectable across runtime and evaluation views.",
    limit:
      "The pictured run uses a demo/mock environment. It is not evidence of real provider coverage or production scale.",
    stack: ["Python", "FastAPI", "Next.js", "PostgreSQL / SQLite", "SSE"],
    capabilities: ["Agent systems", "RAG and memory", "Execution evidence"],
    repository: "https://github.com/kallist/agent-studio",
    image: "/projects/agent-studio-trace.png",
    imageAlt: "Agent Studio run detail with execution timeline and metadata",
    imageCaption:
      "Repository screenshot of a demo run and its persisted trace view.",
    evidence: [
      {
        label: "Source and architecture",
        href: "https://github.com/kallist/agent-studio",
      },
      {
        label: "Architecture document",
        href: "https://github.com/kallist/agent-studio/blob/main/docs/ARCHITECTURE.md",
      },
    ],
  },
  {
    slug: "skin-lesion-ai",
    number: "05",
    title: "Skin Lesion AI Platform",
    kicker: "Internship engineering practice",
    summary:
      "From a model experiment to a local inference workflow with a visible evaluation boundary.",
    problem:
      "A promising internal model result must survive an independent dataset and a product workflow before its limitations are understood.",
    approach: [
      "Audit and split image data, train a ResNet50 model, and keep training and inference preprocessing aligned.",
      "Build a FastAPI inference service and React workflow for upload, result and history.",
      "Preserve the frozen model's external evaluation, including the drop from internal accuracy and the missed malignant cases.",
    ],
    outcome:
      "A local engineering demonstration with an archived independent evaluation, explicit privacy controls and a medical-use boundary.",
    limit:
      "This is an internship practice project and a skin-health self-check aid, not a clinical diagnosis product. External images and model inference were not rerun for this portfolio.",
    stack: ["PyTorch", "ResNet50", "FastAPI", "React", "SQLite"],
    capabilities: ["Applied ML", "API and product delivery", "Evaluation"],
    repository: "https://github.com/kallist/skin-lesion-ai-platform",
    image: "/projects/skin-lesion-result.png",
    imageAlt:
      "Skin Lesion AI demo showing upload, result and medical disclaimer",
    imageCaption:
      "Repository demo screenshot. The pictured result is an example interface, not a clinical finding.",
    evidence: [
      {
        label: "Source and application",
        href: "https://github.com/kallist/skin-lesion-ai-platform",
      },
      {
        label: "Independent external evaluation",
        href: "https://github.com/kallist/skin-lesion-ai-platform/blob/main/docs/ml/EXTERNAL_EVALUATION.md",
      },
    ],
    metrics: [
      { value: "92.96%", label: "Internal test accuracy · n=270" },
      { value: "78.54%", label: "Independent external accuracy · n=797" },
      { value: "65.49%", label: "External malignant recall" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

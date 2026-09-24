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
  evidence: { label: string; href: string }[];
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "repobound",
    number: "01",
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
    number: "02",
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
    number: "03",
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
    number: "04",
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

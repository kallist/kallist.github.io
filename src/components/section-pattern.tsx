type PatternKind =
  | "hero" | "repobound" | "cueparcel" | "agent" | "skin"
  | "method" | "education" | "visual" | "contact";

const vocab: Record<PatternKind, string[]> = {
  hero: ["kallist", "k a l l i s t", "00", "01", "/", ".", "_"],
  repobound: ["pack", "diff", "explain", "replay", "{}", "[]", ">"],
  cueparcel: ["pick", "cart", "recipe", "taskspec", "receipt", ":", "/", "#"],
  agent: ["run", "trace", "tool", "rag", "mem", "eval", "->", "{}"],
  skin: ["92.96", "78.54", "65.49", "eval", "scan", "ml"],
  method: ["inspect", "bound", "honest", "01", "02", "03", "->"],
  education: ["华农", "信管", "本科", "2023", "2027", "华南农业大学", "信息管理与信息系统"],
  visual: ["ink", "line", "stroke", "01", "02", "/"],
  contact: ["kallist", "github", "mail", "resume", "00", "/"],
};

export function SectionPattern({ kind }: { kind: PatternKind }) {
  const words = vocab[kind];
  return (
    <div className={`v2-pattern v2-pattern--${kind}`} data-pattern={kind} aria-hidden="true">
      {Array.from({ length: 16 }, (_, row) => (
        <span className="v2-pattern-row" key={row}>
          {Array.from({ length: 13 }, (_, column) => words[(row * 3 + column * 5) % words.length]).join("   ")}
        </span>
      ))}
    </div>
  );
}

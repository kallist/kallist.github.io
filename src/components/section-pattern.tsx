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

const graphicKinds = new Set<PatternKind>(["repobound", "cueparcel", "agent", "skin"]);
const glyphs: Record<string, string> = {
  repobound: "01#[]{}+-=/:",
  cueparcel: ">:/01#-=+._",
  agent: "01+|-[]{}=:#",
  skin: "0123456789%.:#",
};

function graphicRow(kind: PatternKind, row: number) {
  const width = 78;
  const height = 30;
  const chars = Array.from({ length: width }, (_, column) => {
    const x = column / (width - 1);
    const y = row / (height - 1);
    const noise = ((column * 37 + row * 53 + column * row * 11) % 101) / 101;
    let density = 0;
    if (kind === "repobound") {
      const inside = x > .08 && x < .92 && y > .11 && y < .88;
      const cut = (Math.floor(column / 11) + Math.floor(row / 4)) % 6 === 0;
      density = inside ? (cut ? .13 : .82) : 0;
    } else if (kind === "cueparcel") {
      const course = .18 + x * .6 + Math.sin(x * 15) * .055;
      const node = [ .15, .33, .53, .72, .88 ].some((point) => Math.abs(x - point) < .045 && Math.abs(y - course) < .13);
      density = node ? .96 : Math.abs(y - course) < .11 ? .72 : .015;
    } else if (kind === "agent") {
      const horizontal = [ .2, .48, .76 ].some((point) => Math.abs(y - point) < .035);
      const vertical = [ .14, .32, .51, .7, .87 ].some((point) => Math.abs(x - point) < .025);
      density = horizontal || vertical ? .85 : .055;
    } else if (kind === "skin") {
      const radius = Math.sqrt(((x - .52) / .42) ** 2 + ((y - .5) / .46) ** 2);
      density = radius < .95 && radius > .38 ? (row % 4 === 0 ? .88 : .58) : .025;
    }
    const bank = glyphs[kind] ?? "01";
    const symbol = noise < density ? bank[(column * 7 + row * 13) % bank.length] : " ";
    // Numeric fields must not accidentally render phone-like uninterrupted runs.
    return column % 8 === 7 && /\d/.test(symbol) ? " " : symbol;
  });
  const fragment: Partial<Record<PatternKind, string>> = {
    repobound: "pack[]", cueparcel: "receipt/", agent: "trace->eval", skin: "92.96%",
  };
  if (row === 8 && fragment[kind]) chars.splice(24, fragment[kind]!.length, ...fragment[kind]!);
  return chars.join("");
}

export function SectionPattern({ kind }: { kind: PatternKind }) {
  const words = vocab[kind];
  const graphic = graphicKinds.has(kind);
  return (
    <div className={`v2-pattern v2-pattern--${kind}`} data-pattern={kind} aria-hidden="true">
      {Array.from({ length: graphic ? 30 : 16 }, (_, row) => (
        <span className="v2-pattern-row" key={row}>
          {graphic ? graphicRow(kind, row) : Array.from({ length: 13 }, (_, column) => words[(row * 3 + column * 5) % words.length]).join("   ")}
        </span>
      ))}
    </div>
  );
}

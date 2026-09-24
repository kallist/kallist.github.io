"use client";

import { useEffect, useRef } from "react";

type PatternKind =
  | "hero"
  | "repobound"
  | "cueparcel"
  | "agent"
  | "skin"
  | "method"
  | "index"
  | "visual"
  | "contact";

type PatternDefinition = {
  tokens: readonly string[];
  points: readonly (readonly [number, number])[];
};

const patterns: Record<PatternKind, PatternDefinition> = {
  hero: {
    tokens: ["k", "01", "/", "a", "l", "00", ".", "i", "s", "01", "t", "_"],
    points: [
      [4, 8],
      [36, 5],
      [69, 11],
      [18, 26],
      [53, 32],
      [82, 28],
      [5, 48],
      [33, 54],
      [70, 51],
      [15, 76],
      [48, 79],
      [83, 73],
    ],
  },
  repobound: {
    tokens: [
      "[01]",
      "pack",
      "001",
      "diff",
      "{ }",
      "10",
      ">",
      "explain",
      "[ ]",
      "replay",
      "00",
      "_",
    ],
    points: [
      [2, 5],
      [30, 5],
      [63, 5],
      [7, 32],
      [35, 32],
      [72, 32],
      [2, 59],
      [25, 59],
      [67, 59],
      [8, 86],
      [46, 86],
      [79, 86],
    ],
  },
  cueparcel: {
    tokens: [
      "pick",
      ">",
      "01",
      "cart",
      "/",
      "02",
      "recipe",
      ">",
      "03",
      "task",
      "/",
      "receipt",
    ],
    points: [
      [2, 8],
      [26, 13],
      [55, 18],
      [13, 35],
      [44, 39],
      [71, 42],
      [4, 62],
      [32, 65],
      [68, 69],
      [13, 84],
      [46, 87],
      [72, 89],
    ],
  },
  agent: {
    tokens: [
      "run",
      "→",
      "tool",
      "{}",
      "rag",
      "→",
      "mem",
      "[]",
      "trace",
      "→",
      "eval",
      "00",
    ],
    points: [
      [2, 9],
      [27, 9],
      [53, 9],
      [82, 9],
      [2, 42],
      [27, 42],
      [53, 42],
      [82, 42],
      [2, 75],
      [27, 75],
      [53, 75],
      [82, 75],
    ],
  },
  skin: {
    tokens: [
      "01",
      "92.96",
      "eval",
      "02",
      "78.54",
      "scan",
      "03",
      "65.49",
      "ml",
      "00",
      "/",
      "rx",
    ],
    points: [
      [2, 9],
      [26, 9],
      [68, 9],
      [2, 37],
      [26, 37],
      [68, 37],
      [2, 65],
      [26, 65],
      [68, 65],
      [2, 90],
      [35, 90],
      [73, 90],
    ],
  },
  method: {
    tokens: [
      "01",
      "inspect",
      "|",
      "02",
      "bound",
      "|",
      "03",
      "honest",
      "|",
      "build",
      "→",
      "prove",
    ],
    points: [
      [2, 8],
      [20, 8],
      [68, 8],
      [2, 35],
      [20, 35],
      [68, 35],
      [2, 62],
      [20, 62],
      [68, 62],
      [2, 88],
      [38, 88],
      [57, 88],
    ],
  },
  index: {
    tokens: [
      "01",
      "context",
      "/",
      "02",
      "runtime",
      "/",
      "03",
      "evaluate",
      "/",
      "04",
      "visual",
      "_",
    ],
    points: [
      [2, 5],
      [22, 5],
      [78, 5],
      [2, 31],
      [22, 31],
      [78, 31],
      [2, 57],
      [22, 57],
      [78, 57],
      [2, 83],
      [22, 83],
      [78, 83],
    ],
  },
  visual: {
    tokens: [
      "ink",
      "/",
      "00",
      "line",
      ".",
      "01",
      "stroke",
      "/",
      "02",
      "detail",
      ".",
      "_",
    ],
    points: [
      [2, 9],
      [49, 5],
      [76, 12],
      [16, 28],
      [64, 31],
      [88, 39],
      [3, 52],
      [43, 58],
      [77, 61],
      [20, 78],
      [58, 86],
      [87, 89],
    ],
  },
  contact: {
    tokens: [
      "00",
      "kallist",
      "_",
      "mail",
      "→",
      "01",
      "github",
      "/",
      "02",
      "resume",
      ".",
      "end",
    ],
    points: [
      [2, 5],
      [23, 5],
      [72, 5],
      [8, 35],
      [53, 35],
      [80, 35],
      [2, 65],
      [49, 65],
      [82, 65],
      [13, 89],
      [60, 89],
      [79, 89],
    ],
  },
};

export function SectionPattern({ kind }: { kind: PatternKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const definition = patterns[kind];

  useEffect(() => {
    const root = ref.current;
    const host = root?.parentElement;
    if (!root || !host) return;

    const cells = Array.from(root.querySelectorAll<HTMLElement>("span"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      pointer = null;
      for (const cell of cells) {
        cell.style.removeProperty("transform");
        cell.style.removeProperty("opacity");
      }
    };
    const paint = () => {
      frame = 0;
      if (!pointer) return;
      const bounds = root.getBoundingClientRect();
      for (const [index, cell] of cells.entries()) {
        const [x, y] = definition.points[index];
        const dx = pointer.x - (bounds.left + (bounds.width * x) / 100);
        const dy = pointer.y - (bounds.top + (bounds.height * y) / 100);
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 105);
        if (influence === 0) {
          cell.style.removeProperty("transform");
          cell.style.removeProperty("opacity");
          continue;
        }
        const strength = influence * influence;
        const length = Math.max(distance, 1);
        cell.style.transform = `translate3d(${((-dx / length) * strength * 7).toFixed(2)}px, ${((-dy / length) * strength * 7).toFixed(2)}px, 0)`;
        cell.style.opacity = String(0.48 + strength * 0.52);
      }
    };
    const onMove = (event: PointerEvent) => {
      if (
        motion.matches ||
        !finePointer.matches ||
        event.pointerType === "touch"
      )
        return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onPreferenceChange = () => reset();
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", reset);
    motion.addEventListener("change", onPreferenceChange);
    finePointer.addEventListener("change", onPreferenceChange);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          root.classList.add("v11-pattern-entered");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", onPreferenceChange);
      finePointer.removeEventListener("change", onPreferenceChange);
      reset();
    };
  }, [definition]);

  return (
    <div
      className={`v11-pattern v11-pattern--${kind}`}
      data-pattern={kind}
      aria-hidden="true"
      ref={ref}
    >
      {definition.tokens.map((token, index) => {
        const [x, y] = definition.points[index];
        return (
          <span
            key={`${token}-${index}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
}

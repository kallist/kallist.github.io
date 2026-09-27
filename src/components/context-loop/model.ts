export type LoopGlyph = {
  u: number;
  v: number;
  glyph: string;
  alternate: string;
  density: number;
  seed: number;
  phase: number;
  reveal: number;
  semantic: boolean;
};

export type LoopModel = { seed: number; glyphs: LoopGlyph[] };
export type SurfacePoint = { x: number; y: number; z: number };

const TAU = Math.PI * 2;
const dense = "#@%01";
const medium = "+=*/\\*";
const light = "-:._~";
const signals = ["CONTEXT", "RAG", "TOOL", "MEM", "TRACE", "EVAL", "REPLAY", "RUN"];

function hash(value: number) {
  let n = value | 0;
  n = Math.imul(n ^ (n >>> 16), 0x7feb352d);
  n = Math.imul(n ^ (n >>> 15), 0x846ca68b);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function random(seed: number, a: number, b: number, salt: number) {
  return hash(seed ^ Math.imul(a + 17, 73856093) ^ Math.imul(b + 31, 19349663) ^ salt);
}

/** A closed, asymmetric figure-eight centerline with one half-twist across its width. */
export function surfacePoint(u: number, v: number, seconds = 0, reducedMotion = false, output?: SurfacePoint): SurfacePoint {
  const sin = Math.sin(u);
  const cos = Math.cos(u);
  const sin2 = Math.sin(2 * u);
  const cos2 = Math.cos(2 * u);
  const sin3 = Math.sin(3 * u);
  const cos3 = Math.cos(3 * u);
  const tensionPhase = seconds * .27 + 2 * u;
  const centerX = .5 + (.385 + .035 * sin) * sin + .013 * sin3;
  const centerY = .5 + .205 * sin2 + .042 * sin - .014 * sin3
    + (reducedMotion ? 0 : .0045 * Math.sin(tensionPhase));
  const centerZ = .25 * cos + .045 * sin2
    + (reducedMotion ? 0 : .005 * Math.sin(seconds * .23 + 3 * u));
  const tangentX = .385 * cos + .07 * sin * cos + .039 * cos3;
  const tangentY = .41 * cos2 + .042 * cos - .042 * cos3
    + (reducedMotion ? 0 : .009 * Math.cos(tensionPhase));
  const length = Math.hypot(tangentX, tangentY) || 1;
  const normalX = -tangentY / length;
  const normalY = tangentX / length;
  const twist = u * .5 + .24;
  const width = .092 + .011 * Math.sin(3 * u + .5);
  const cross = v * width * Math.cos(twist);
  const x = centerX + normalX * cross;
  const y = centerY + normalY * cross;
  const z = centerZ + v * width * Math.sin(twist) * 1.5;
  const perspective = 1 / (1 - z * .31);
  const point = output ?? { x: 0, y: 0, z: 0 };
  point.x = .5 + (x - .5) * perspective + z * .022;
  point.y = .5 + (y - .5) * perspective - z * .018;
  point.z = z;
  return point;
}

export function createLoopModel(seed = 23027, detail = 1): LoopModel {
  const segments = Math.round(230 * detail);
  const rows = Math.round(27 * detail);
  const glyphs: LoopGlyph[] = [];
  for (let i = 0; i < segments; i++) {
    const sector = Math.floor(i / segments * 8);
    const arcOrder = [.12, .44, .05, .63, .30, .73, .18, .52][sector];
    for (let j = 0; j < rows; j++) {
      const u = ((i + (random(seed, i, j, 1) - .5) * .36) / segments * TAU + TAU) % TAU;
      const v = -1 + (j + (random(seed, i, j, 3) - .5) * .28) / (rows - 1) * 2;
      const edge = Math.abs(v);
      const density = Math.min(1, Math.max(.16, .96 - .48 * edge ** 1.65 + .06 * Math.sin(u * 7 + v * 5)));
      if (random(seed, i, j, 5) > density) continue;
      const family = edge < .34 ? dense : edge < .72 ? medium : light;
      glyphs.push({
        u, v, density, semantic: false,
        glyph: family[Math.floor(random(seed, i, j, 7) * family.length)],
        alternate: family[Math.floor(random(seed, i, j, 11) * family.length)],
        seed: random(seed, i, j, 13),
        phase: random(seed, i, j, 17) * TAU,
        reveal: .12 + arcOrder * .86 + edge * .12 + random(seed, i, j, 19) * .11,
      });
    }
  }
  for (const [index, glyph] of signals.entries()) {
    glyphs.push({
      u: (index + .37) / signals.length * TAU,
      v: index % 2 ? -.14 : .14,
      glyph, alternate: glyph, density: 1, semantic: true,
      seed: random(seed, index, 0, 29), phase: index * .77,
      reveal: .88 + index * .035,
    });
  }
  return { seed, glyphs };
}

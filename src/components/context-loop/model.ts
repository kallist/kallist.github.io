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
  strand?: boolean;
};

export type LoopModel = { seed: number; glyphs: LoopGlyph[] };
export type SurfacePoint = { x: number; y: number; z: number; face: number };

const TAU = Math.PI * 2;
const tilt = 52 * Math.PI / 180;
const turn = 25 * Math.PI / 180;
const cosTilt = Math.cos(tilt);
const sinTilt = Math.sin(tilt);
const cosTurn = Math.cos(turn);
const sinTurn = Math.sin(turn);
const dense = "#@%01";
const medium = "+=*/\\*";
const light = "-:._~";
const signals = ["CONTEXT", "RETRIEVE", "TOOL", "MEMORY", "TRACE", "EVAL", "REPLAY", "AGENT"];
const edgeSymbols = "+=/\\_-";

function hash(value: number) {
  let n = value | 0;
  n = Math.imul(n ^ (n >>> 16), 0x7feb352d);
  n = Math.imul(n ^ (n >>> 15), 0x846ca68b);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function random(seed: number, a: number, b: number, salt: number) {
  return hash(seed ^ Math.imul(a + 17, 73856093) ^ Math.imul(b + 31, 19349663) ^ salt);
}

/** A single Möbius strip, viewed obliquely so its returning face folds across itself. */
export function surfacePoint(u: number, v: number, seconds = 0, reducedMotion = false, output?: SurfacePoint): SurfacePoint {
  const sin = Math.sin(u);
  const cos = Math.cos(u);
  const twist = u * .5;
  const width = .21;
  const radius = .33 + v * width * Math.cos(twist);
  const x3 = radius * cos;
  const y3 = radius * sin;
  const z3 = v * width * Math.sin(twist);
  // An oblique paper-sculpture view exposes the half-twist without rigid rotation.
  const tiltedY = y3 * cosTilt - z3 * sinTilt
    + (reducedMotion ? 0 : .003 * Math.sin(seconds * .25 + 2 * u));
  const z = y3 * sinTilt + z3 * cosTilt;
  const x = x3 * cosTurn - tiltedY * sinTurn;
  const y = x3 * sinTurn + tiltedY * cosTurn;
  const perspective = 1 / (1 - z * .22);
  const point = output ?? { x: 0, y: 0, z: 0, face: 0 };
  point.x = .5 + x * perspective;
  point.y = .5 + y * perspective;
  point.z = z;
  point.face = Math.abs(Math.cos(twist)) * cosTilt + Math.sin(twist) * sinTilt;
  return point;
}

/** Glyphs circulate through the fixed ribbon with a calm difference between lanes. */
export function flowPosition(glyph: LoopGlyph, seconds: number, reducedMotion = false): number {
  if (reducedMotion) return glyph.u;
  const elapsed = Math.max(0, seconds - 1);
  const laneSpeed = .055 + .018 * (1 - Math.min(1, Math.abs(glyph.v)));
  return glyph.u + elapsed * laneSpeed
    + .006 * (Math.sin(elapsed * .38 + glyph.phase) - Math.sin(glyph.phase));
}

function curvatureWeight(u: number): number {
  const sin = Math.sin(u);
  const cos = Math.cos(u);
  const dx = -.33 * sin;
  const dy = .33 * cos * cosTilt;
  const ddx = -.33 * cos;
  const ddy = -.33 * sin * cosTilt;
  const curvature = Math.abs(dx * ddy - dy * ddx) / Math.max(.001, Math.pow(dx * dx + dy * dy, 1.5));
  return curvature / (curvature + 8);
}

export function createLoopModel(seed = 23027, detail = 1): LoopModel {
  const segments = Math.round(215 * detail);
  const baseRows = Math.round(26 * detail);
  const glyphs: LoopGlyph[] = [];
  for (let i = 0; i < segments; i++) {
    const sector = Math.floor(i / segments * 8);
    const arcOrder = [.12, .44, .05, .63, .30, .73, .18, .52][sector];
    const sectionU = i / segments * TAU;
    const rows = Math.round(baseRows * (1.15 + .35 * Math.sin(sectionU) ** 2));
    for (let j = 0; j < rows; j++) {
      const u = ((i + (random(seed, i, j, 1) - .5) * .18) / segments * TAU + TAU) % TAU;
      const v = -1 + (j + (random(seed, i, j, 3) - .5) * .14) / (rows - 1) * 2;
      const edge = Math.abs(v);
      const density = Math.min(1, .72 + .18 * (1 - edge * edge)
        + .075 * curvatureWeight(u) + .035 * Math.sin(u * 7 + v * 5));
      if (random(seed, i, j, 5) > density) continue;
      const family = edge > .83 ? edgeSymbols : edge < .36 ? dense : edge < .72 ? medium : light;
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
  // Continuous glyph filaments disclose the two edges and the running face.
  // They follow the same half-twisted surface rather than tracing a separate outline.
  const filamentSegments = Math.round(390 * detail);
  for (let i = 0; i < filamentSegments; i++) {
    const u = i / filamentSegments * TAU;
    for (const [lane, v] of [-1, -.52, 0, .52, 1].entries()) {
      const family = lane === 0 ? dense : edgeSymbols;
      glyphs.push({
        u, v, density: 1, semantic: false, strand: true,
        glyph: family[Math.floor(random(seed, i, lane, 41) * family.length)],
        alternate: family[Math.floor(random(seed, i, lane, 43) * family.length)],
        seed: random(seed, i, lane, 47), phase: random(seed, i, lane, 49) * TAU,
        reveal: .32 + (i / filamentSegments) * .6,
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

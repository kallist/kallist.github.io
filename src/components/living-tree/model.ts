export type DepthLayer = 0 | 1 | 2;

export type Branch = {
  id: number;
  parentId: number | null;
  parentT: number;
  depth: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  phase: number;
  frequency: number;
  sway: number;
};

export type GlyphPoint = {
  x: number;
  y: number;
  branchId: number;
  along: number;
  lateral: number;
  density: number;
  layer: DepthLayer;
  glyph: string;
  alternate: string;
  phase: number;
  seed: number;
  canopy: boolean;
};

export type TreeModel = { branches: Branch[]; glyphs: GlyphPoint[]; seed: number };

const dense = "#@%01";
const medium = "+=*/\\*";
const light = "-:._~";

function hash(value: number) {
  let n = value | 0;
  n = Math.imul(n ^ (n >>> 16), 0x7feb352d);
  n = Math.imul(n ^ (n >>> 15), 0x846ca68b);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function random(seed: number, x: number, y: number, salt: number) {
  return hash(seed ^ Math.imul(x + 17, 73856093) ^ Math.imul(y + 31, 19349663) ^ salt);
}

function pointOn(branch: Branch, t: number) {
  return { x: branch.startX + (branch.endX - branch.startX) * t, y: branch.startY + (branch.endY - branch.startY) * t };
}

export function createTreeModel(seed = 22027, detail = 1): TreeModel {
  const branches: Branch[] = [];
  const add = (parentId: number | null, parentT: number, angle: number, length: number, width: number, depth: number) => {
    const start = parentId === null ? { x: .54, y: 1.07 } : pointOn(branches[parentId], parentT);
    const id = branches.length;
    branches.push({
      id, parentId, parentT, depth, startX: start.x, startY: start.y,
      endX: start.x + Math.cos(angle) * length, endY: start.y + Math.sin(angle) * length,
      width, phase: random(seed, id, 0, 89) * Math.PI * 2,
      frequency: .28 + random(seed, id, 1, 91) * .22,
      sway: depth === 0 ? .001 : depth === 1 ? .017 : depth === 2 ? .032 : .049,
    });
    return id;
  };

  const root = add(null, 0, -1.73, .37, .026, 0);
  const middle = add(root, 1, -1.75, .31, .019, 0);
  const upper = add(middle, 1, -1.72, .28, .014, 0);
  const crown = add(upper, 1, -1.86, .18, .010, 0);
  const primary: number[] = [];
  for (const [parent, at, angle, length, width] of [
    [root, .70, -2.55, .30, .012], [root, .80, -.38, .26, .010],
    [middle, .40, -2.76, .38, .012], [middle, .61, -.55, .40, .012],
    [middle, .91, -2.35, .32, .010], [middle, .94, -.68, .37, .011],
    [upper, .42, -2.72, .34, .009], [upper, .57, -.35, .40, .009],
    [upper, .85, -2.18, .25, .008], [crown, .20, -.88, .24, .007],
  ] as const) primary.push(add(parent, at, angle, length, width, 1));

  const secondary: number[] = [];
  for (const id of primary) {
    const branch = branches[id];
    const angle = Math.atan2(branch.endY - branch.startY, branch.endX - branch.startX);
    for (const [index, at] of [.46, .79, .99].entries()) {
      const side = index === 1 ? -1 : 1;
      const spread = (.26 + random(seed, id, index, 17) * .43) * side;
      const length = (.12 + random(seed, id, index, 19) * .11) * (index === 2 ? 1.08 : 1);
      secondary.push(add(id, at, angle + spread, length, branch.width * .55, 2));
    }
  }
  for (const id of secondary) {
    const branch = branches[id];
    const angle = Math.atan2(branch.endY - branch.startY, branch.endX - branch.startX);
    for (const [index, at] of [.52, .91].entries()) {
      const side = index === 0 ? -1 : 1;
      const jitter = random(seed, id, index, 23);
      add(id, at, angle + side * (.30 + jitter * .42), .075 + jitter * .065, Math.max(.0025, branch.width * .54), 3);
    }
  }

  const columns = Math.round(192 * detail);
  const rows = Math.round(122 * detail);
  const glyphs: GlyphPoint[] = [];
  const canopyAnchors = branches.filter((branch) => branch.depth >= 1 && branch.depth <= 2 && branch.endY < .7);
  for (let row = 0; row < rows; row++) {
    const y = row / (rows - 1) * 1.13 - .065;
    for (let column = 0; column < columns; column++) {
      const x = column / (columns - 1) * 1.16 - .08;
      let nearest = Number.POSITIVE_INFINITY;
      let closest = branches[0];
      let along = 0;
      let lateral = 0;
      for (const branch of branches) {
        const dx = branch.endX - branch.startX;
        const dy = branch.endY - branch.startY;
        const t = Math.max(0, Math.min(1, ((x - branch.startX) * dx + (y - branch.startY) * dy) / (dx * dx + dy * dy)));
        const offsetX = x - branch.startX - dx * t;
        const offsetY = y - branch.startY - dy * t;
        const distance = Math.hypot(offsetX, offsetY) / branch.width;
        if (distance < nearest) {
          nearest = distance;
          closest = branch;
          along = t;
          lateral = (dx * offsetY - dy * offsetX) / Math.hypot(dx, dy);
        }
      }
      let canopyWeight = 0;
      for (const anchor of canopyAnchors) {
        const radius = anchor.depth === 1 ? .14 : .085;
        const dx = (x - anchor.endX) / radius;
        const dy = (y - anchor.endY) / (radius * .7);
        const distance = dx * dx + dy * dy;
        canopyWeight += Math.max(0, (anchor.depth === 1 ? .25 : .17) * (1 - distance));
      }
      canopyWeight = Math.min(.42, canopyWeight);
      const core = nearest < 1 ? .90 - nearest * .25 : nearest < 2.5 ? .28 * (2.5 - nearest) / 1.5 : 0;
      const density = Math.max(core, canopyWeight);
      if (random(seed, column, row, 101) >= density) continue;
      const family = nearest < .95 ? dense : nearest < 2.1 ? medium : light;
      const pick = random(seed, column, row, 103);
      const layer: DepthLayer = nearest < .8 ? (pick < .34 ? 2 : 1) : (pick < .38 ? 0 : pick < .80 ? 1 : 2);
      glyphs.push({
        x, y, branchId: closest.id, along, lateral, density, layer,
        glyph: family[Math.floor(random(seed, column, row, 107) * family.length)],
        alternate: family[Math.floor(random(seed, column, row, 109) * family.length)],
        phase: random(seed, column, row, 113) * Math.PI * 2,
        seed: random(seed, column, row, 127),
        canopy: canopyWeight > core,
      });
    }
  }
  return { branches, glyphs, seed };
}

export type AnimatedBranch = { x: number; y: number; endX: number; endY: number; angle: number };

export function animateBranches(model: TreeModel, seconds: number, reducedMotion = false): AnimatedBranch[] {
  const result: AnimatedBranch[] = [];
  for (const branch of model.branches) {
    const parent = branch.parentId === null ? null : result[branch.parentId];
    const x = parent ? parent.x + (parent.endX - parent.x) * branch.parentT : branch.startX;
    const y = parent ? parent.y + (parent.endY - parent.y) * branch.parentT : branch.startY;
    const baseAngle = Math.atan2(branch.endY - branch.startY, branch.endX - branch.startX);
    const parentBaseAngle = branch.parentId === null ? 0 : Math.atan2(model.branches[branch.parentId].endY - model.branches[branch.parentId].startY, model.branches[branch.parentId].endX - model.branches[branch.parentId].startX);
    const inherited = parent ? (parent.angle - parentBaseAngle) * .82 : 0;
    const local = reducedMotion ? 0 : branch.sway * (Math.sin(seconds * branch.frequency + branch.phase) * .72 + Math.sin(seconds * branch.frequency * .61 + branch.phase * 1.73) * .28);
    const angle = baseAngle + (reducedMotion ? 0 : inherited + local);
    const length = Math.hypot(branch.endX - branch.startX, branch.endY - branch.startY);
    result.push({ x, y, endX: x + Math.cos(angle) * length, endY: y + Math.sin(angle) * length, angle });
  }
  return result;
}

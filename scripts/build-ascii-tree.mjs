import { writeFileSync } from "node:fs";

// The silhouette comes only from glyph density around a branching skeleton.
// No SVG paths, masks, gradients or outlines describe the tree itself.
const columns = 158;
const rows = 94;
const glyphs = "01+-=#%*/\\:._~";
const limbs = [
  [[.53, 1.04], [.48, .75], .028], [[.48, .75], [.43, .55], .022],
  [[.43, .55], [.39, .34], .019], [[.39, .34], [.32, .12], .015],
  [[.32, .12], [.27, -.03], .01], [[.43, .56], [.31, .44], .016],
  [[.31, .44], [.12, .32], .013], [[.12, .32], [-.06, .29], .009],
  [[.37, .38], [.22, .29], .014], [[.22, .29], [.05, .15], .01],
  [[.31, .44], [.17, .48], .01], [[.17, .48], [.02, .46], .007],
  [[.40, .50], [.58, .36], .015], [[.58, .36], [.81, .28], .011],
  [[.81, .28], [1.03, .31], .007], [[.39, .39], [.56, .21], .014],
  [[.56, .21], [.76, .08], .009], [[.76, .08], [.89, -.03], .006],
  [[.34, .22], [.49, .08], .009], [[.49, .08], [.64, -.03], .006],
  [[.21, .29], [.14, .11], .008], [[.14, .11], [.08, -.02], .006],
  [[.57, .36], [.70, .41], .009], [[.70, .41], [.88, .45], .006],
  [[.48, .75], [.61, .67], .013], [[.61, .67], [.72, .65], .007],
];

// Fine offshoots turn the branching structure into an airy crown.
for (const [, end, width] of limbs.slice(3, 24)) {
  if (end[1] > .5) continue;
  for (const side of [-1, 1]) {
    const lift = .05 + (1 - end[1]) * .055;
    limbs.push([end, [end[0] + side * (.045 + lift), end[1] - lift], width * .52]);
  }
}

function noise(x, y, seed) {
  const value = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function distance(x, y, [start, end]) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const t = Math.max(0, Math.min(1, ((x - start[0]) * dx + (y - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - start[0] - t * dx, y - start[1] - t * dy);
}

function draw(depth) {
  const symbols = [];
  const shift = [0, -.013, .017][depth];
  for (let row = 0; row < rows; row++) {
    const y = row / (rows - 1);
    for (let column = 0; column < columns; column++) {
      const x = column / (columns - 1) + shift;
      let nearest = Number.POSITIVE_INFINITY;
      let weight = 0;
      for (const limb of limbs) {
        const d = distance(x, y, limb);
        const ratio = d / limb[2];
        nearest = Math.min(nearest, ratio);
        if (ratio < 1) weight = Math.max(weight, .95 - ratio * .13);
        else if (ratio < 4.8 && y < .7) weight = Math.max(weight, .47 * (1 - ratio / 5));
      }
      // Flared roots are formed by glyphs too, not an underlying drawing.
      if (y > .72) {
        const root = Math.abs(x - (.48 + (y - .72) * .18));
        if (root < .019 + (y - .72) * .11) weight = Math.max(weight, .81);
      }
      // Small disconnected marks make the crown feel like a field of type.
      if (y < .5 && nearest < 8) weight = Math.max(weight, .09 * (1 - nearest / 8));
      if (noise(column, row, depth + 1) >= weight) continue;
      const glyph = glyphs[Math.floor(noise(column, row, depth + 9) * glyphs.length)];
      const tone = nearest < .9 ? "a" : nearest < 3 ? "b" : "c";
      symbols.push(`<text class="${tone}" x="${column * 10}" y="${(row + 1) * 13}">${glyph}</text>`);
    }
  }
  console.log(`ascii-tree-${["near", "middle", "far"][depth]}: ${symbols.length} glyphs`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${columns * 10} ${rows * 13}" aria-hidden="true"><style>.a{opacity:.9}.b{opacity:.58}.c{opacity:.25}</style><g fill="#594f45" font-family="Courier New,monospace" font-size="11">${symbols.join("")}</g></svg>\n`;
}

for (const [name, depth] of [["near", 0], ["middle", 1], ["far", 2]]) {
  writeFileSync(new URL(`../public/graphics/ascii-tree-${name}.svg`, import.meta.url), draw(depth));
}

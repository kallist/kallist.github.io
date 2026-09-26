import { writeFileSync } from "node:fs";

// The silhouette comes only from glyph density around a branching skeleton.
// No SVG paths, masks, gradients or outlines describe the tree itself.
const columns = 190;
const rows = 108;
const glyphs = "01+-=#%*/\\:._~";
const limbs = [
  [[.53, 1.04], [.48, .75], .017], [[.48, .75], [.43, .55], .014],
  [[.43, .55], [.39, .34], .012], [[.39, .34], [.32, .12], .01],
  [[.32, .12], [.27, -.03], .006], [[.43, .56], [.31, .44], .011],
  [[.31, .44], [.12, .32], .008], [[.12, .32], [-.06, .29], .005],
  [[.37, .38], [.22, .29], .009], [[.22, .29], [.05, .15], .006],
  [[.31, .44], [.17, .48], .007], [[.17, .48], [.02, .46], .004],
  [[.40, .50], [.58, .36], .011], [[.58, .36], [.81, .28], .007],
  [[.81, .28], [1.03, .31], .004], [[.39, .39], [.56, .21], .009],
  [[.56, .21], [.76, .08], .006], [[.76, .08], [.89, -.03], .004],
  [[.34, .22], [.49, .08], .006], [[.49, .08], [.64, -.03], .004],
  [[.21, .29], [.14, .11], .006], [[.14, .11], [.08, -.02], .004],
  [[.57, .36], [.70, .41], .006], [[.70, .41], [.88, .45], .004],
  [[.48, .75], [.61, .67], .009], [[.61, .67], [.72, .65], .005],
];

// Fine offshoots create detail along each branch without filling the crown.
for (const [start, end, width] of limbs.slice(3, 24)) {
  if (end[1] > .5) continue;
  for (const t of [.48, .85]) {
    const fork = [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t];
    const side = end[0] < .43 ? -1 : 1;
    const lift = .035 + (1 - fork[1]) * .04;
    limbs.push([fork, [fork[0] + side * (.045 + lift), fork[1] - lift], width * .43]);
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
        if (ratio < 1) weight = Math.max(weight, .9 - ratio * .15);
        else if (ratio < 3 && y < .7) weight = Math.max(weight, .23 * (1 - ratio / 3));
      }
      // Flared roots are formed by glyphs too, not an underlying drawing.
      if (y > .72) {
        const root = Math.abs(x - (.48 + (y - .72) * .18));
        if (root < .009 + (y - .72) * .047) weight = Math.max(weight, .68);
      }
      // Small disconnected marks make the crown feel like a field of type.
      if (y < .5 && nearest < 5) weight = Math.max(weight, .04 * (1 - nearest / 5));
      if (noise(column, row, depth + 1) >= weight) continue;
      const glyph = glyphs[Math.floor(noise(column, row, depth + 9) * glyphs.length)];
      const tone = nearest < .9 ? "a" : nearest < 2 ? "b" : "c";
      symbols.push(`<text class="${tone}" x="${column * 9}" y="${(row + 1) * 12}">${glyph}</text>`);
    }
  }
  console.log(`ascii-tree-${["near", "middle", "far"][depth]}: ${symbols.length} glyphs`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${columns * 9} ${rows * 12}" aria-hidden="true"><style>.a{opacity:.9}.b{opacity:.48}.c{opacity:.18}</style><g fill="#56534e" font-family="Courier New,monospace" font-size="10">${symbols.join("")}</g></svg>\n`;
}

for (const [name, depth] of [["near", 0], ["middle", 1], ["far", 2]]) {
  writeFileSync(new URL(`../public/graphics/ascii-tree-${name}.svg`, import.meta.url), draw(depth));
}

import { writeFileSync } from "node:fs";

// One glyph occupies one cell. Branch and trunk density determine the silhouette;
// there are no drawn contour paths or particle effects.
const branches = [
  [[.50, .98], [.42, .60], .024], [[.42, .60], [.37, .39], .018],
  [[.37, .39], [.29, .18], .014], [[.29, .18], [.25, .04], .009],
  [[.42, .59], [.23, .40], .017], [[.23, .40], [.03, .30], .012],
  [[.35, .39], [.16, .25], .012], [[.16, .25], [.01, .21], .008],
  [[.29, .31], [.12, .13], .010], [[.23, .41], [.09, .43], .008],
  [[.40, .50], [.62, .36], .015], [[.62, .36], [.94, .23], .010],
  [[.38, .43], [.58, .21], .013], [[.58, .21], [.83, .08], .009],
  [[.35, .31], [.51, .10], .009], [[.51, .10], [.68, .02], .006],
  [[.59, .37], [.73, .31], .007], [[.62, .36], [.76, .43], .007],
  [[.18, .36], [.09, .28], .006], [[.42, .60], [.30, .53], .008],
];
const glyphs = "01+-=#%*/\\:._~";
const columns = 94;
const rows = 58;

function noise(column, row, seed) {
  const value = Math.sin(column * 127.1 + row * 311.7 + seed * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

function segmentDistance(x, y, [start, end]) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const t = Math.max(0, Math.min(1, ((x - start[0]) * dx + (y - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - start[0] - t * dx, y - start[1] - t * dy);
}

function draw(depth) {
  const symbols = [];
  for (let row = 0; row < rows; row++) {
    const y = row / (rows - 1);
    for (let column = 0; column < columns; column++) {
      const x = column / (columns - 1);
      const warpedX = x + (depth ? .023 : 0);
      const warpedY = y + (depth ? .015 : 0);
      const trunkCenter = .42 + Math.max(0, y - .6) * .2;
      const trunkWidth = .008 + Math.max(0, y - .35) * .026;
      const trunk = y > .35 && Math.abs(warpedX - trunkCenter) < trunkWidth;
      const branch = branches.some((entry) => segmentDistance(warpedX, warpedY, entry) < entry[2] * (depth ? .8 : 1));
      const branchCloud = branches.some((entry) => segmentDistance(warpedX, warpedY, entry) < entry[2] * 3.4);
      const density = trunk ? .91 : branch ? .88 : branchCloud ? .105 : 0;
      if (noise(column, row, depth + 1) > density || column % 9 === 8) continue;
      const glyph = glyphs[Math.floor(noise(column, row, depth + 7) * glyphs.length)];
      symbols.push(`<text x="${column * 10}" y="${13 * (row + 1)}">${glyph}</text>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 754" aria-hidden="true"><g fill="#9b8f80" font-family="Courier New, monospace" font-size="12">${symbols.join("")}</g></svg>\n`;
}

for (const [name, depth] of [["near", 0], ["far", 1]]) {
  writeFileSync(new URL(`../public/graphics/ascii-tree-${name}.svg`, import.meta.url), draw(depth));
}

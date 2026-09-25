import { writeFileSync } from "node:fs";

// A deterministic character-density drawing of the SCAU gate. There are no
// traced roof or column paths: the glyph positions themselves define the form.
const columns = 104;
const rows = 50;
const glyphs = "01237#+=%*/\\:._~";

function noise(column, row, seed = 0) {
  const value = Math.sin(column * 127.1 + row * 311.7 + seed * 91.3) * 43758.5453;
  return value - Math.floor(value);
}

function roof(x, y, top, bottom, upperWidth, lowerWidth) {
  if (y < top || y > bottom) return 0;
  const progress = (y - top) / (bottom - top);
  const edge = Math.abs(x - .5) - (upperWidth + (lowerWidth - upperWidth) * progress);
  if (edge > 0) return 0;
  return progress > .72 || edge > -.025 ? .98 : .64;
}

function gateDensity(x, y) {
  const tiers = Math.max(
    roof(x, y, .115, .205, .10, .20),
    roof(x, y, .225, .31, .22, .34),
    roof(x, y, .33, .415, .33, .46),
  );
  if (tiers) return tiers;
  if (y >= .415 && y <= .445 && Math.abs(x - .5) < .47) return .96;
  if (y >= .455 && y <= .515 && Math.abs(x - .5) < .415) return .46;
  if (y >= .515 && y <= .82) {
    const columnsX = [.135, .27, .39, .61, .73, .865];
    if (columnsX.some((center) => Math.abs(x - center) < .027)) return .84;
    if (y < .555 && Math.abs(x - .5) < .41) return .39;
    if (Math.abs(x - .5) > .13 && Math.abs(x - .5) < .355) return .11;
  }
  if (y >= .82 && y <= .855 && [.135, .27, .39, .61, .73, .865].some((center) => Math.abs(x - center) < .041)) return .93;
  return 0;
}

function atmosphereDensity(x, y) {
  const distance = Math.hypot((x - .5) / .62, (y - .37) / .48);
  if (distance > 1 || gateDensity(x, y)) return 0;
  const wave = Math.abs(y - (.2 + .18 * Math.sin(x * 10)));
  return wave < .15 ? .12 : .045;
}

function symbol(column, row, seed) {
  if ((column * 7 + row * 13 + seed) % 43 === 0) return "华农本科信管"[(column + row) % 6];
  const picked = glyphs[Math.floor(noise(column, row, seed) * glyphs.length)];
  return column % 8 === 7 && /\d/.test(picked) ? "#" : picked;
}

function textRows(density, seed) {
  return Array.from({ length: rows }, (_, row) => {
    const y = row / (rows - 1);
    const line = Array.from({ length: columns }, (_, column) => {
      const x = column / (columns - 1);
      return noise(column, row, seed) < density(x, y) ? symbol(column, row, seed + 4) : " ";
    }).join("");
    return [...line].flatMap((character, column) => character === " " ? [] :
      [`<text x="${66 + column * 10.25}" y="${27 + row * 13}">${character}</text>`]).join("");
  }).filter(Boolean).join("\n    ");
}

const atmosphere = textRows(atmosphereDensity, 2);
const gate = textRows(gateDensity, 11);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-labelledby="title">
  <title id="title">由数字与符号构成的华南农业大学校门</title>
  <g font-family="Courier New, monospace" font-size="16" letter-spacing=".35" style="white-space:pre" xml:space="preserve">
    <g fill="#a59784" opacity=".45">${atmosphere}</g>
    <g fill="#a88f77" opacity=".34" transform="translate(5 7)">${gate}</g>
    <g fill="#f3ebdf">${gate}</g>
  </g>
  <g fill="#d0bda8" font-family="Courier New, monospace" font-size="12" letter-spacing="2" opacity=".8">
    <text x="66" y="686">00 / 华农</text><text x="1030" y="686">2023 — 2027</text>
  </g>
</svg>\n`;

writeFileSync(new URL("../public/graphics/scau-gate.svg", import.meta.url), svg);

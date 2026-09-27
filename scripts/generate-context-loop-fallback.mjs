import { writeFile } from "node:fs/promises";
import { createLoopModel, surfacePoint } from "../src/components/context-loop/model.ts";

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const model = createLoopModel(23027, 1.05);
const items = model.glyphs.map((glyph) => ({ glyph, point: surfacePoint(glyph.u, glyph.v, 0, true) }));
items.sort((a, b) => a.point.z - b.point.z);
const lines = items.map(({ glyph, point }) => {
  const depth = Math.max(0, Math.min(1, point.z + .5));
  const opacity = Math.min(.94, (.32 + .58 * depth ** 1.35) * (.68 + glyph.density * .32)
    * (.82 + .18 * Math.abs(point.face))
    * (glyph.strand ? 1.32 : 1)).toFixed(3);
  const x = (784 + (point.x - .5) * 1504).toFixed(1);
  const y = (480 + (point.y - .5) * 1130).toFixed(1);
  const size = (8.5 + depth * 5).toFixed(1);
  return `<text x="${x}" y="${y}" opacity="${opacity}" font-size="${size}">${escape(glyph.glyph)}</text>`;
});
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="1600" height="1000" aria-hidden="true"><g fill="#282722" font-family="Courier New, monospace" text-anchor="middle" dominant-baseline="middle">${lines.join("")}</g></svg>`;
await writeFile(new URL("../public/graphics/ascii-context-loop.svg", import.meta.url), svg);
console.log(`Wrote ${lines.length} glyphs to public/graphics/ascii-context-loop.svg`);

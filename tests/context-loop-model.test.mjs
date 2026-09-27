import test from "node:test";
import assert from "node:assert/strict";
import { createLoopModel, surfacePoint } from "../src/components/context-loop/model.ts";

test("context loop glyph field is deterministic, seeded and symbol led", () => {
  const first = createLoopModel(23027, .72);
  const repeat = createLoopModel(23027, .72);
  const other = createLoopModel(23028, .72);
  assert.deepEqual(first, repeat);
  assert.notDeepEqual(first.glyphs.slice(0, 30), other.glyphs.slice(0, 30));
  assert.ok(first.glyphs.length > 2000);
  const semantic = first.glyphs.filter((glyph) => glyph.semantic);
  assert.equal(semantic.length, 8);
  assert.deepEqual(semantic.map((glyph) => glyph.glyph), ["CONTEXT", "RAG", "TOOL", "MEM", "TRACE", "EVAL", "REPLAY", "RUN"]);
  for (const glyph of first.glyphs) {
    assert.ok(glyph.u >= 0 && glyph.u < Math.PI * 2);
    assert.ok(glyph.v >= -1.1 && glyph.v <= 1.1);
    assert.ok(glyph.density > 0 && glyph.density <= 1);
    assert.ok(glyph.reveal >= 0 && glyph.reveal < 2);
    if (!glyph.semantic) assert.match(glyph.glyph, /^[#@%01+=*\/\\\-:._~]$/);
  }
});

test("twisted ribbon closes as one surface and reduced motion is static", () => {
  const tau = Math.PI * 2;
  for (const v of [-1, -.35, 0, .35, 1]) {
    const start = surfacePoint(0, v, 0, true);
    const end = surfacePoint(tau, -v, 0, true);
    for (const axis of ["x", "y", "z"]) {
      assert.ok(Math.abs(start[axis] - end[axis]) < .001, `${axis} seam at v=${v}`);
    }
    assert.deepEqual(surfacePoint(.7, v, 0, true), surfacePoint(.7, v, 100, true));
  }
  const before = surfacePoint(.7, .4, 1, false);
  const after = surfacePoint(.7, .4, 9, false);
  assert.notDeepEqual(before, after);
  for (const point of [before, after]) for (const value of Object.values(point)) assert.ok(Number.isFinite(value));
});

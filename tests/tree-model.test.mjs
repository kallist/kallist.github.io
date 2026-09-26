import test from "node:test";
import assert from "node:assert/strict";
import { animateBranches, createTreeModel } from "../src/components/living-tree/model.ts";

test("living tree topology is deterministic and responds to a different seed", () => {
  const first = createTreeModel(22027, .7);
  const repeat = createTreeModel(22027, .7);
  const other = createTreeModel(22028, .7);
  assert.deepEqual(first, repeat);
  assert.notDeepEqual(first.glyphs.slice(0, 20), other.glyphs.slice(0, 20));
  assert.ok(first.glyphs.length > 1000);
  assert.equal(first.branches[0].parentId, null);
  for (const branch of first.branches.slice(1)) {
    assert.ok(branch.parentId !== null && branch.parentId < branch.id);
    assert.ok(branch.depth >= 0 && branch.depth <= 3);
    for (const coordinate of [branch.startX, branch.startY, branch.endX, branch.endY]) assert.ok(Number.isFinite(coordinate));
  }
  for (const glyph of first.glyphs) {
    assert.ok(first.branches[glyph.branchId]);
    assert.ok(glyph.layer >= 0 && glyph.layer <= 2);
    assert.ok(Number.isFinite(glyph.x) && Number.isFinite(glyph.y));
    assert.ok(glyph.density > 0 && glyph.density <= 1);
    assert.match(glyph.glyph, /^[#@%01+=*\/\\\-:._~]$/);
  }
});

test("motion deforms branch descendants while reduced motion is time invariant", () => {
  const tree = createTreeModel(22027, .62);
  const before = animateBranches(tree, 0);
  const after = animateBranches(tree, 8);
  const stillA = animateBranches(tree, 0, true);
  const stillB = animateBranches(tree, 100, true);
  assert.deepEqual(stillA, stillB);
  assert.ok(after.some((branch, index) => tree.branches[index].depth > 1 && Math.abs(branch.endX - before[index].endX) > .001));
  assert.ok(Math.abs(after[0].endX - before[0].endX) < .001);
  for (const branch of after) {
    for (const coordinate of [branch.x, branch.y, branch.endX, branch.endY, branch.angle]) assert.ok(Number.isFinite(coordinate));
  }
});

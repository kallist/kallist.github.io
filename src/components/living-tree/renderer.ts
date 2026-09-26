import { animateBranches, type GlyphPoint, type TreeModel } from "./model";

type Point = { x: number; y: number };

export type TreeRenderer = {
  resize: (width: number, height: number, dpr: number) => void;
  draw: (seconds: number, reducedMotion: boolean, darkSurface: boolean) => void;
  setPointer: (point: Point | null) => void;
};

const tone = (glyph: GlyphPoint) => glyph.density > .6 ? 2 : glyph.density > .21 ? 1 : 0;

export function createTreeRenderer(canvas: HTMLCanvasElement, model: TreeModel): TreeRenderer | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;
  const groups: GlyphPoint[][] = Array.from({ length: 9 }, () => []);
  for (const glyph of model.glyphs) groups[glyph.layer * 3 + tone(glyph)].push(glyph);
  const baseAngles = model.branches.map((branch) => Math.atan2(branch.endY - branch.startY, branch.endX - branch.startX));
  let width = 1;
  let height = 1;
  let scale = 1;
  let scaleX = 1;
  let originX = 0;
  let originY = 0;
  let pointer: Point | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let influence = 0;

  return {
    resize(nextWidth, nextHeight, dpr) {
      width = nextWidth;
      height = nextHeight;
      const pixelRatio = Math.max(1, Math.min(dpr, width < 700 ? 1.25 : 1.5));
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scale = Math.max(height / 1.12, width / 1.5);
      scaleX = width < 700 ? Math.min(scale, width / .9) : scale;
      originX = (width - 1.16 * scaleX) / 2 + width * .05;
      originY = (height - 1.08 * scale) / 2 - height * .025;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `${Math.max(7, Math.min(9, scaleX * .009))}px "Courier New", monospace`;
    },
    setPointer(point) { pointer = point; },
    draw(seconds, reducedMotion, darkSurface) {
      ctx.clearRect(0, 0, width, height);
      if (pointer && !reducedMotion) {
        pointerX += (pointer.x - pointerX) * .13;
        pointerY += (pointer.y - pointerY) * .13;
        influence += (1 - influence) * .12;
      } else {
        influence *= .88;
      }
      const branches = animateBranches(model, seconds, reducedMotion);
      const rotations = branches.map((branch, index) => branch.angle - baseAngles[index]);
      const cosines = rotations.map(Math.cos);
      const sines = rotations.map(Math.sin);
      const intro = reducedMotion ? 10 : seconds;
      const colors = darkSurface ? ["#d7d0c3", "#e0d8c9", "#efe7db"] : ["#5c574f", "#393832", "#24241f"];
      const layerAlpha = darkSurface ? [.15, .22, .29] : [.20, .32, .43];
      for (let layer = 0; layer < 3; layer++) {
        const depthScale = [.985, 1, 1.012][layer];
        const driftX = reducedMotion ? 0 : Math.sin(seconds * (.10 + layer * .025) + layer) * [1.2, .6, 2.1][layer];
        const driftY = reducedMotion ? 0 : Math.cos(seconds * (.08 + layer * .02) + layer * .7) * [.8, .4, 1.4][layer];
        ctx.fillStyle = colors[layer];
        for (let bucket = 0; bucket < 3; bucket++) {
          ctx.globalAlpha = layerAlpha[layer] * [.45, .70, 1][bucket];
          for (const glyph of groups[layer * 3 + bucket]) {
            const branch = model.branches[glyph.branchId];
            const reveal = branch.depth === 0
              ? .15 + branch.id * .14 + glyph.along * .12
              : .48 + branch.depth * .20 + glyph.along * .22 + (glyph.canopy ? .16 : 0);
            if (intro < reveal) continue;
            const moving = branches[glyph.branchId];
            const baseline = branch.startX + (branch.endX - branch.startX) * glyph.along;
            const baselineY = branch.startY + (branch.endY - branch.startY) * glyph.along;
            const localX = glyph.x - baseline;
            const localY = glyph.y - baselineY;
            const cos = cosines[glyph.branchId];
            const sin = sines[glyph.branchId];
            const displacement = reducedMotion ? 0 : (branch.depth >= 2 ? 1 : .36) * (Math.sin(seconds * (.41 + glyph.seed * .21) + glyph.phase) + .42 * Math.sin(seconds * .28 + glyph.phase * 1.4));
            let x = originX + (moving.x + (moving.endX - moving.x) * glyph.along + localX * cos - localY * sin) * scaleX + displacement;
            let y = originY + (moving.y + (moving.endY - moving.y) * glyph.along + localX * sin + localY * cos) * scale + displacement * .45;
            x = width / 2 + (x - width / 2) * depthScale + driftX;
            y = height / 2 + (y - height / 2) * depthScale + driftY;
            if (!reducedMotion && influence > .005 && branch.depth > 0) {
              const dx = x - pointerX;
              const dy = y - pointerY;
              const radius = width < 700 ? 94 : 135;
              const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
              const push = proximity * proximity * influence * (branch.depth === 1 ? 1.5 : 3.4) * [.4, .7, 1][layer];
              const distance = Math.max(1, Math.hypot(dx, dy));
              x += dx / distance * push;
              y += dy / distance * push;
            }
            if (x < -12 || x > width + 12 || y < -12 || y > height + 12) continue;
            if (glyph.canopy && !reducedMotion) {
              const breath = Math.sin(seconds * (.38 + glyph.seed * .16) + glyph.phase);
              if (glyph.seed < .20 && breath < -.28) continue;
              ctx.globalAlpha = layerAlpha[layer] * [.45, .70, 1][bucket] * (.83 + .17 * breath);
            }
            const substitute = !reducedMotion && glyph.seed < .085 && Math.sin(seconds * (.6 + glyph.seed) + glyph.phase) > .82;
            ctx.fillText(substitute ? glyph.alternate : glyph.glyph, x, y);
            if (glyph.canopy && !reducedMotion) ctx.globalAlpha = layerAlpha[layer] * [.45, .70, 1][bucket];
          }
        }
      }
      ctx.globalAlpha = 1;
    },
  };
}

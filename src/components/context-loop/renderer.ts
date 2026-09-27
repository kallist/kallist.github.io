import { surfacePoint, type LoopModel, type SurfacePoint } from "./model";

type Point = { x: number; y: number };
export type MaskRect = { left: number; right: number; top: number; bottom: number };
export type LoopEnvironment = { dark: boolean; strength: number; masks: MaskRect[] };

export type LoopRenderer = {
  resize: (width: number, height: number, dpr: number) => void;
  draw: (seconds: number, reducedMotion: boolean) => void;
  setPointer: (point: Point | null) => void;
  setEnvironment: (environment: LoopEnvironment) => void;
};

const depthBuckets = 9;

function maskStrength(x: number, y: number, masks: MaskRect[]) {
  let strength = 1;
  for (const mask of masks) {
    const dx = Math.max(mask.left - x, 0, x - mask.right);
    const dy = Math.max(mask.top - y, 0, y - mask.bottom);
    const distance = Math.hypot(dx, dy);
    if (distance < 52) strength = Math.min(strength, .16 + .84 * distance / 52);
  }
  return strength;
}

export function createLoopRenderer(canvas: HTMLCanvasElement, model: LoopModel): LoopRenderer | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;
  const points: SurfacePoint[] = model.glyphs.map(() => ({ x: 0, y: 0, z: 0 }));
  const buckets: number[][] = Array.from({ length: depthBuckets }, () => []);
  let width = 1;
  let height = 1;
  let pointer: Point | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let pointerWeight = 0;
  let environment: LoopEnvironment = { dark: false, strength: 1, masks: [] };

  return {
    resize(nextWidth, nextHeight, dpr) {
      width = nextWidth;
      height = nextHeight;
      const ratio = Math.max(1, Math.min(dpr, width < 700 ? 1.25 : 1.5));
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
    },
    setPointer(point) { pointer = point; },
    setEnvironment(next) { environment = next; },
    draw(seconds, reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      if (pointer && !reducedMotion) {
        pointerX += (pointer.x - pointerX) * .16;
        pointerY += (pointer.y - pointerY) * .16;
        pointerWeight += (1 - pointerWeight) * .12;
      } else {
        pointerWeight *= .86;
      }
      for (const bucket of buckets) bucket.length = 0;
      const flow = reducedMotion ? 0 : Math.max(0, seconds - 1) * .039;
      for (let index = 0; index < model.glyphs.length; index++) {
        const glyph = model.glyphs[index];
        if (!reducedMotion && seconds < glyph.reveal) continue;
        if (!reducedMotion && Math.abs(glyph.v) > .72 && glyph.seed < .28
          && Math.sin(seconds * .43 + glyph.phase) < -.47) continue;
        const u = glyph.u + flow;
        const v = glyph.v + (reducedMotion ? 0 : .012 * Math.sin(seconds * .38 + glyph.phase));
        const point = surfacePoint(u, v, reducedMotion ? 0 : seconds, reducedMotion, points[index]);
        const bucket = Math.max(0, Math.min(depthBuckets - 1, Math.floor((point.z + .38) / .76 * depthBuckets)));
        buckets[bucket].push(index);
      }

      const isMobile = width < 700;
      const spanX = width * (isMobile ? .99 : 1.03);
      const spanY = height * (isMobile ? 1.02 : 1.13);
      const originX = width * .5;
      const originY = height * (isMobile ? .49 : .48);
      const ink = environment.dark ? "#e6e1d7" : "#282722";
      ctx.fillStyle = ink;
      for (let bucket = 0; bucket < depthBuckets; bucket++) {
        const depth = bucket / (depthBuckets - 1);
        const fontSize = (isMobile ? 6.7 : 7.3) + depth * (isMobile ? .8 : 1.4);
        ctx.font = `${fontSize.toFixed(1)}px "Courier New", monospace`;
        for (const index of buckets[bucket]) {
          const glyph = model.glyphs[index];
          const point = points[index];
          let x = originX + (point.x - .5) * spanX;
          let y = originY + (point.y - .5) * spanY;
          const local = reducedMotion ? 0 : Math.sin(seconds * .48 + glyph.phase) * .55;
          x += local;
          y += local * .5;
          let pointerBoost = 0;
          if (!reducedMotion && pointerWeight > .005) {
            const dx = x - pointerX;
            const dy = y - pointerY;
            const radius = isMobile ? 90 : 140;
            const near = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
            pointerBoost = near * near * pointerWeight;
            const distance = Math.max(1, Math.hypot(dx, dy));
            x += dx / distance * pointerBoost * 2.4;
            y += dy / distance * pointerBoost * 2.4;
          }
          if (x < -40 || x > width + 40 || y < -15 || y > height + 15) continue;
          const depthAlpha = .30 + .43 * depth;
          const densityAlpha = .58 + glyph.density * .42;
          const localMask = maskStrength(x, y, environment.masks);
          const alpha = Math.min(.82, depthAlpha * densityAlpha * environment.strength * localMask * (1 + pointerBoost * .10));
          if (alpha < .018) continue;
          ctx.globalAlpha = alpha;
          const substitute = !reducedMotion && glyph.seed < .075 && Math.sin(seconds * .64 + glyph.phase) > .85;
          const symbol = substitute ? glyph.alternate : glyph.glyph;
          if (glyph.semantic) {
            ctx.font = `${(fontSize + .5).toFixed(1)}px "Courier New", monospace`;
            ctx.globalAlpha = Math.min(.70, alpha * 1.3);
          }
          ctx.fillText(symbol, x, y);
          if (glyph.semantic) ctx.font = `${fontSize.toFixed(1)}px "Courier New", monospace`;
        }
      }
      ctx.globalAlpha = 1;
    },
  };
}

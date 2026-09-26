"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createTreeModel } from "./living-tree/model";
import { createTreeRenderer, type TreeRenderer } from "./living-tree/renderer";

const seed = 22027;
const detailForWidth = (width: number) => width < 700 ? .70 : width < 1100 ? .95 : 1.22;

export function AsciiTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let detail = detailForWidth(window.innerWidth);
    let model = createTreeModel(seed, detail);
    let renderer: TreeRenderer | null = createTreeRenderer(canvas, model);
    if (!renderer) {
      host.dataset.treePhase = "fallback";
      return;
    }
    let frame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let previousDraw = 0;
    let darkSurface = false;
    let disposed = false;
    host.dataset.treeMotion = motion.matches ? "static" : "running";
    host.dataset.glyphCount = String(model.glyphs.length);

    const darkChapters = [...document.querySelectorAll("#education, #contact, .v2-cue-scene")];
    const updateSurface = () => {
      const middleY = window.innerHeight / 2;
      const nextSurface = darkChapters.some((chapter) => {
        const bounds = chapter.getBoundingClientRect();
        return bounds.top <= middleY && bounds.bottom >= middleY;
      });
      const changed = darkSurface !== nextSurface;
      darkSurface = nextSurface;
      host.dataset.treePalette = darkSurface ? "light" : "dark";
      if (changed && motion.matches) renderer?.draw(10, true, darkSurface);
    };
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const nextDetail = detailForWidth(width);
      if (nextDetail !== detail) {
        detail = nextDetail;
        model = createTreeModel(seed, detail);
        renderer = createTreeRenderer(canvas, model);
        host.dataset.glyphCount = String(model.glyphs.length);
      }
      renderer?.resize(width, height, window.devicePixelRatio || 1);
      updateSurface();
      if (motion.matches) renderer?.draw(10, true, darkSurface);
    };
    const tick = (now: number) => {
      if (disposed || motion.matches || document.visibilityState === "hidden") return;
      if (previousTime) elapsed += Math.min((now - previousTime) / 1000, .1);
      previousTime = now;
      const minimumInterval = detail < 1 ? 48 : 32;
      if (now - previousDraw >= minimumInterval) {
        renderer?.draw(elapsed, false, darkSurface);
        previousDraw = now;
        if (elapsed >= 1.7) host.dataset.treePhase = "ready";
      }
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const start = () => {
      stop();
      if (document.visibilityState === "hidden") {
        host.dataset.treeMotion = "paused";
        return;
      }
      if (motion.matches) {
        host.dataset.treeMotion = "static";
        host.dataset.treePhase = "ready";
        renderer?.setPointer(null);
        renderer?.draw(10, true, darkSurface);
        return;
      }
      host.dataset.treeMotion = "running";
      frame = requestAnimationFrame(tick);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (motion.matches || !finePointer.matches || event.pointerType === "touch") return;
      renderer?.setPointer({ x: event.clientX, y: event.clientY });
    };
    const onPointerLeave = () => renderer?.setPointer(null);
    const onVisibility = () => start();
    const onMotion = () => start();

    resize();
    if (motion.matches) {
      host.dataset.treePhase = "ready";
    } else {
      elapsed = .16;
      renderer?.draw(elapsed, false, darkSurface);
      host.dataset.treePhase = "forming";
    }
    start();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateSurface, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    finePointer.addEventListener("change", onPointerLeave);
    return () => {
      disposed = true;
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateSurface);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      finePointer.removeEventListener("change", onPointerLeave);
    };
  }, []);

  return <div ref={hostRef} className="v2-global-tree" data-global-ascii-tree data-tree-phase="pending" aria-hidden="true">
    <canvas ref={canvasRef} data-living-ascii-tree />
    <Image className="v22-tree-fallback" src="/graphics/ascii-tree-middle.svg" alt="" width={1710} height={1296} unoptimized />
    <noscript><Image className="v22-tree-noscript" src="/graphics/ascii-tree-middle.svg" alt="" width={1710} height={1296} unoptimized /></noscript>
  </div>;
}

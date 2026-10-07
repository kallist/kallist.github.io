"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createLoopModel } from "./context-loop/model";
import { createLoopRenderer, type LoopEnvironment, type LoopRenderer, type MaskRect } from "./context-loop/renderer";

const seed = 23027;
const detailForWidth = (width: number) => width < 700 ? .72 : width < 1100 ? .86 : 1;

export function AsciiContextLoop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let detail = detailForWidth(window.innerWidth);
    let model = createLoopModel(seed, detail);
    let renderer: LoopRenderer | null = createLoopRenderer(canvas, model);
    if (!renderer) {
      host.dataset.loopPhase = "fallback";
      return;
    }
    let frame = 0;
    let environmentFrame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let previousDraw = 0;
    let introMasksApplied = false;
    let disposed = false;
    let previousZone = "";
    host.dataset.loopMotion = motion.matches ? "static" : "running";
    host.dataset.glyphCount = String(model.glyphs.length);

    const chapters = [
      [".v2-cue-scene", "cue", true, .48],
      ["#education", "education", true, .30],
      ["#contact", "contact", true, .58],
      ["#visual", "visual", false, .53],
      ["#profile", "profile", false, .68],
      ["#work", "work", false, .78],
      ["#hero", "hero", false, 1],
    ] as const;
    const chapterNodes = chapters.map(([selector, zone, dark, strength]) => ({
      element: document.querySelector(selector), zone, dark, strength,
    }));
    const maskNodes = [...document.querySelectorAll(
      ".v2-hero-name h1, .v2-hero-statement, .v2-hero-art, .v2-section-intro, .v2-case-media, " +
      ".v2-vow-heading, .v2-vow-contract, .v2-vow-evidence, " +
      ".v2-repo-evidence, .v2-cue-heading, .v2-cue-flow, .v2-cue-evidence, " +
      ".v2-agent-heading, .v2-agent-coordinates, .v2-agent-evidence, " +
      ".v2-skin-heading, .v2-skin-values, .v2-skin-evidence, " +
      ".v2-education-art, .v2-education-copy, .v2-method-grid, " +
      ".v2-experience, .v2-capabilities, .v2-visual-heading, .v21-gallery, .v2-contact-body",
    )];
    const heroFrame = document.querySelector(".v2-hero .v2-frame");
    const updateEnvironment = () => {
      const middleY = window.innerHeight / 2;
      const current = chapterNodes.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= middleY && rect.bottom >= middleY;
      });
      const zone = current?.zone ?? "hero";
      const environment: LoopEnvironment = { dark: current?.dark ?? false, strength: current?.strength ?? 1, masks: [] };
      if (motion.matches || introMasksApplied) {
        for (const node of maskNodes) {
          const rect = node.getBoundingClientRect();
          if (rect.bottom < -52 || rect.top > window.innerHeight + 52) continue;
          const mask: MaskRect = { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
          environment.masks.push(mask);
        }
      }
      renderer?.setEnvironment(environment);
      host.dataset.loopPalette = environment.dark ? "light" : "dark";
      host.dataset.loopZone = zone;
      if (motion.matches && (zone !== previousZone || environment.masks.length)) renderer?.draw(10, true);
      previousZone = zone;
    };
    const scheduleEnvironment = () => {
      if (environmentFrame) return;
      environmentFrame = requestAnimationFrame(() => {
        environmentFrame = 0;
        updateEnvironment();
      });
    };
    const resize = () => {
      const width = window.innerWidth;
      const nextDetail = detailForWidth(width);
      if (nextDetail !== detail) {
        detail = nextDetail;
        model = createLoopModel(seed, detail);
        renderer = createLoopRenderer(canvas, model);
        host.dataset.glyphCount = String(model.glyphs.length);
      }
      renderer?.resize(width, window.innerHeight, window.devicePixelRatio || 1);
      updateEnvironment();
      if (motion.matches) renderer?.draw(10, true);
    };
    const tick = (now: number) => {
      if (disposed || motion.matches || document.visibilityState === "hidden") return;
      if (previousTime) elapsed += Math.min((now - previousTime) / 1000, .1);
      previousTime = now;
      const minimumInterval = detail < 1 ? 62 : 58;
      if (now - previousDraw >= minimumInterval) {
        if (!introMasksApplied && (window.scrollY > 100
          || (heroFrame && Number.parseFloat(getComputedStyle(heroFrame).opacity) > .02))) {
          introMasksApplied = true;
          updateEnvironment();
        }
        renderer?.draw(elapsed, false);
        previousDraw = now;
        if (elapsed >= 1.35 && host.dataset.loopPhase !== "ready") {
          host.dataset.loopPhase = "ready";
          updateEnvironment();
        }
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
        host.dataset.loopMotion = "paused";
        return;
      }
      if (motion.matches) {
        host.dataset.loopMotion = "static";
        host.dataset.loopPhase = "ready";
        renderer?.setPointer(null);
        renderer?.draw(10, true);
        return;
      }
      host.dataset.loopMotion = "running";
      frame = requestAnimationFrame(tick);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (motion.matches || !finePointer.matches || event.pointerType === "touch") return;
      renderer?.setPointer({ x: event.clientX, y: event.clientY });
    };
    const onPointerLeave = () => renderer?.setPointer(null);

    resize();
    if (!motion.matches) {
      elapsed = .16;
      renderer?.draw(elapsed, false);
      host.dataset.loopPhase = "forming";
    }
    start();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", scheduleEnvironment, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", start);
    finePointer.addEventListener("change", onPointerLeave);
    // Some engines update MediaQueryList.matches without delivering its change
    // event during an emulated or OS-level preference transition.
    const preferenceCheck = window.setInterval(() => {
      if (document.visibilityState === "hidden") return;
      if ((motion.matches && host.dataset.loopMotion !== "static")
        || (!motion.matches && host.dataset.loopMotion === "static")) {
        start();
        updateEnvironment();
      }
    }, 250);
    return () => {
      disposed = true;
      stop();
      window.clearInterval(preferenceCheck);
      if (environmentFrame) cancelAnimationFrame(environmentFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scheduleEnvironment);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", start);
      finePointer.removeEventListener("change", onPointerLeave);
    };
  }, []);

  return <div ref={hostRef} className="v2-global-loop" data-global-context-loop data-loop-phase="pending" aria-hidden="true">
    <canvas ref={canvasRef} data-living-ascii-loop />
    <Image className="v23-loop-fallback" src="/graphics/ascii-context-loop.svg" alt="" width={1600} height={1000} unoptimized />
    <noscript><Image className="v23-loop-noscript" src="/graphics/ascii-context-loop.svg" alt="" width={1600} height={1000} unoptimized /></noscript>
  </div>;
}

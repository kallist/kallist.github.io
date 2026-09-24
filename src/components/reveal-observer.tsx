"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...document.querySelectorAll<HTMLElement>(".v2-reveal, .v2-scene")];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("v2-in-view");
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.9) node.classList.add("v2-in-view");
      else observer.observe(node);
    }
    document.documentElement.classList.add("v2-motion-ready");
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("v2-motion-ready");
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v2-home");
    if (!root) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active: HTMLElement | null = null;
    let frame = 0;
    let point: { x: number; y: number; host: HTMLElement } | null = null;
    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      point = null;
      active?.style.removeProperty("--pattern-x");
      active?.style.removeProperty("--pattern-y");
      active = null;
    };
    const paint = () => {
      frame = 0;
      if (!point) return;
      if (active !== point.host) {
        active?.style.removeProperty("--pattern-x");
        active?.style.removeProperty("--pattern-y");
        active = point.host;
      }
      const bounds = active.getBoundingClientRect();
      active.style.setProperty("--pattern-x", `${((point.x - bounds.left) / bounds.width - .5) * 14}px`);
      active.style.setProperty("--pattern-y", `${((point.y - bounds.top) / bounds.height - .5) * 14}px`);
    };
    const onMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      const host = (event.target as Element).closest<HTMLElement>(".v2-field-host");
      if (!host) { reset(); return; }
      point = { x: event.clientX, y: event.clientY, host };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", reset);
    reducedMotion.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", reset);
      reducedMotion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
      reset();
    };
  }, []);
  return null;
}

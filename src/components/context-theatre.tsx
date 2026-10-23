"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/content/home-copy";

/** Event-driven choreography; native scrolling and links retain their behavior. */
export function ContextTheatre({ language }: { language: Language }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".v2-home");
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const shots = [...root.querySelectorAll<HTMLElement>(".v2-scene, #films, #education, #profile, #visual, #contact, [data-theatre-band]")];
    let frame = 0;
    let target: HTMLElement | null = null;
    const still = () => preference.matches || document.documentElement.dataset.ambientPaused === "true";
    const paint = () => {
      frame = 0;
      const staticView = still();
      root.dataset.theatreMotion = staticView ? "static" : "running";
      const hero = root.querySelector<HTMLElement>("#hero");
      const progress = hero ? Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight)) : 0;
      root.style.setProperty("--opening-progress", staticView ? "0" : progress.toFixed(4));
      for (const [index, shot] of shots.entries()) {
        const rect = shot.getBoundingClientRect();
        shot.dataset.folio = String(index + 1).padStart(2, "0");
        if (rect.bottom < 0 || rect.top > innerHeight) continue;
        const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)));
        shot.style.setProperty("--shot-drift", staticView ? "0px" : `${((progress - .5) * 38).toFixed(2)}px`);
        shot.style.setProperty("--band-travel", staticView ? "0px" : `${((progress - .5) * 230).toFixed(2)}px`);
      }
    };
    const schedule = () => { if (!frame && document.visibilityState !== "hidden") frame = requestAnimationFrame(paint); };
    const reset = () => {
      target?.style.removeProperty("--magnet-x"); target?.style.removeProperty("--magnet-y"); target = null;
    };
    const move = (event: PointerEvent) => {
      if (still() || !pointer.matches || event.pointerType === "touch") { reset(); return; }
      const next = (event.target as Element).closest<HTMLElement>(".v3-hero-actions a, .v2-case-link, .v2-contact-links a");
      if (next !== target) reset();
      if (!next) return;
      target = next;
      const rect = next.getBoundingClientRect();
      next.style.setProperty("--magnet-x", `${((event.clientX - rect.left) / rect.width - .5) * 7}px`);
      next.style.setProperty("--magnet-y", `${((event.clientY - rect.top) / rect.height - .5) * 5}px`);
    };
    const change = () => { reset(); schedule(); };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("portfolio-motion-change", change);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    preference.addEventListener("change", change);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancelAnimationFrame(frame); reset();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      window.removeEventListener("portfolio-motion-change", change);
      root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", reset);
      preference.removeEventListener("change", change); document.removeEventListener("visibilitychange", schedule);
      delete root.dataset.theatreMotion; delete document.documentElement.dataset.ambientPaused;
    };
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.ambientPaused = String(next);
    window.dispatchEvent(new Event("portfolio-motion-change"));
  };
  return <button type="button" className="v4-motion-control" aria-pressed={paused} onClick={toggle} aria-label={language === "zh" ? (paused ? "恢复环境动效" : "暂停环境动效") : (paused ? "Resume ambient motion" : "Pause ambient motion")}><span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span><span>{language === "zh" ? (paused ? "恢复动效" : "暂停动效") : (paused ? "RESUME MOTION" : "PAUSE MOTION")}</span></button>;
}

export function TheatreBand({ variant }: { variant: "work" | "film" }) {
  const words = variant === "work" ? ["CONTEXT", "BECOMES", "ACTION"] : ["SYSTEMS", "BECOME", "STORIES"];
  return <div className={`v4-band v4-band--${variant}`} data-theatre-band aria-hidden="true"><div className="v4-band-register"><span>{variant === "work" ? "01 / THE ENGINEERING ARCHIVE" : "02 / THE MOVING IMAGE"}</span><span>SCROLL TO REVEAL ↘</span></div><div className="v4-band-line">{[...words, ...words].map((word, index) => <span key={index}>{word}<i>↗</i></span>)}</div><div className="v4-band-line v4-band-line--reverse">{[...words, ...words].map((word, index) => <span key={index}>{word}<i>↗</i></span>)}</div></div>;
}

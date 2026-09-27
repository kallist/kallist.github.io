"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { galleryWorks } from "@/content/gallery";
import { homeCopy, type Language } from "@/content/home-copy";

const count = galleryWorks.length;
const repeatedWorks = Array.from({ length: 3 }, (_, cycle) =>
  galleryWorks.map((work, index) => ({ work, index, cycle })),
).flat();

export function GalleryRibbon({ language }: { language: Language }) {
  const [activeSlot, setActiveSlot] = useState(count);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const activeSlotRef = useRef(count);
  const dragRef = useRef<{ x: number; scroll: number } | null>(null);
  const manualUntilRef = useRef(0);
  const autoRemainderRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = homeCopy[language];
  const activeIndex = activeSlot % count;

  const itemsIn = useCallback((window: HTMLDivElement) =>
    Array.from(window.querySelectorAll<HTMLElement>(".v21-exhibition-item")), []);

  const positionFor = useCallback((window: HTMLDivElement, item: HTMLElement) =>
    window.scrollLeft + item.getBoundingClientRect().left - window.getBoundingClientRect().left -
    (window.clientWidth - item.getBoundingClientRect().width) / 2, []);

  const nearestSlot = useCallback((window: HTMLDivElement, items: HTMLElement[]) => {
    const middle = window.getBoundingClientRect().left + window.clientWidth / 2;
    return items.reduce((best, item, index) => {
      const rect = item.getBoundingClientRect();
      const bestRect = items[best].getBoundingClientRect();
      return Math.abs(rect.left + rect.width / 2 - middle) <
        Math.abs(bestRect.left + bestRect.width / 2 - middle) ? index : best;
    }, 0);
  }, []);

  const setSlot = useCallback((slot: number) => {
    activeSlotRef.current = slot;
    setActiveSlot(slot);
  }, []);

  const updateFromPosition = useCallback(() => {
    const window = windowRef.current;
    if (!window) return;
    const items = itemsIn(window);
    if (items.length) setSlot(nearestSlot(window, items));
  }, [itemsIn, nearestSlot, setSlot]);

  const normalize = useCallback(() => {
    const window = windowRef.current;
    if (!window) return;
    const items = itemsIn(window);
    if (items.length !== count * 3) return;
    const slot = nearestSlot(window, items);
    const cycleWidth = items[count].offsetLeft - items[0].offsetLeft;
    const shift = slot < count ? cycleWidth : slot >= count * 2 ? -cycleWidth : 0;
    if (shift) {
      window.style.scrollSnapType = "none";
      window.scrollLeft += shift;
      requestAnimationFrame(() => { window.style.scrollSnapType = ""; });
      setSlot(slot + (shift > 0 ? count : -count));
    } else {
      setSlot(slot);
    }
  }, [itemsIn, nearestSlot, setSlot]);

  useEffect(() => {
    const window = windowRef.current;
    const first = window && itemsIn(window)[count];
    if (!window || !first) return;
    window.scrollLeft = positionFor(window, first);
    let width = window.clientWidth;
    const observer = new ResizeObserver(() => {
      if (window.clientWidth === width) return;
      width = window.clientWidth;
      const item = itemsIn(window)[activeSlotRef.current];
      if (item) window.scrollLeft = positionFor(window, item);
    });
    observer.observe(window);
    return () => {
      observer.disconnect();
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
      if (settleRef.current) clearTimeout(settleRef.current);
    };
  }, [itemsIn, positionFor]);

  useEffect(() => {
    let frame: number;
    let previous = performance.now();
    const tick = (now: number) => {
      const window = windowRef.current;
      const delta = Math.min(now - previous, 64);
      previous = now;
      if (window && matchMedia("(min-width: 641px)").matches &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
        document.visibilityState === "visible" && !paused && !hovered && !dragging &&
        now > manualUntilRef.current) {
        const advance = autoRemainderRef.current + delta * .012;
        const wholePixels = Math.trunc(advance);
        autoRemainderRef.current = advance - wholePixels;
        if (wholePixels) {
          window.scrollLeft += wholePixels;
          normalize();
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [dragging, hovered, normalize, paused]);

  function onScroll() {
    if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(updateFromPosition);
    if (settleRef.current) clearTimeout(settleRef.current);
    settleRef.current = setTimeout(normalize, 200);
  }

  function move(direction: -1 | 1) {
    const window = windowRef.current;
    if (!window) return;
    const items = itemsIn(window);
    const next = items[activeSlotRef.current + direction];
    if (!next) return;
    manualUntilRef.current = performance.now() + 4000;
    window.scrollTo({ left: positionFor(window, next), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !windowRef.current) return;
    dragRef.current = { x: event.clientX, scroll: windowRef.current.scrollLeft };
    windowRef.current.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current || !windowRef.current) return;
    windowRef.current.scrollLeft = dragRef.current.scroll - (event.clientX - dragRef.current.x);
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    dragRef.current = null;
    manualUntilRef.current = performance.now() + 4000;
    setDragging(false);
    const window = windowRef.current;
    if (window?.hasPointerCapture(event.pointerId)) window.releasePointerCapture(event.pointerId);
  }

  return <div className="v21-gallery" data-gallery-count={count} data-active-index={activeIndex + 1} data-active-shape={galleryWorks[activeIndex].shape} data-paused={paused}>
    <div className="v21-gallery-topline v2-frame"><span>FIG 04 / {copy.galleryTop}</span><span>{String(count).padStart(2, "0")} {copy.galleryCount}</span></div>
    <div className="v21-exhibition-window" ref={windowRef} data-dragging={dragging} role="region" aria-roledescription={language === "zh" ? "作品画廊" : "artwork reel"} aria-label={copy.galleryRegion} tabIndex={0} onScroll={onScroll} onKeyDown={onKeyDown} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}>
      <div className="v21-exhibition-track">
        {repeatedWorks.map(({ work, index, cycle }, slot) => {
          const distance = Math.abs(slot - activeSlot);
          const prominence = distance === 0 ? "active" : distance === 1 ? "near" : distance === 2 ? "outer" : "distant";
          const decorative = cycle !== 1;
          return <figure className="v21-exhibition-item" data-prominence={prominence} data-shape={work.shape} data-gallery-slot={slot} aria-hidden={decorative ? "true" : undefined} key={`${cycle}-${work.id}`}>
            <div className="v21-exhibition-image" style={{ aspectRatio: `${work.width} / ${work.height}` }}><Image src={work.src} alt={decorative ? "" : language === "zh" ? work.altZh : work.alt} width={work.width} height={work.height} loading={decorative ? "lazy" : "eager"} unoptimized /></div>
            <figcaption><span>{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><span>{language === "zh" ? work.captionZh : work.caption}</span></figcaption>
          </figure>;
        })}
      </div>
    </div>
    <div className="v21-gallery-bottomline v2-frame">
      <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
      <span className="v21-gallery-direction">← {copy.galleryContinue} →</span>
      <div className="v21-gallery-controls">
        <button type="button" onClick={() => move(-1)} aria-label={language === "zh" ? "上一幅作品" : "Previous artwork"}>←</button>
        <button type="button" onClick={() => move(1)} aria-label={language === "zh" ? "下一幅作品" : "Next artwork"}>→</button>
        <button type="button" className="v21-gallery-motion" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? copy.galleryResume : copy.galleryPause}</button>
      </div>
    </div>
  </div>;
}

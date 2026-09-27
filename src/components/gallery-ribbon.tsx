"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { galleryWorks, type GalleryWork } from "@/content/gallery";
import { homeCopy, type Language } from "@/content/home-copy";

function WorkSet({ works, decorative, language, echo = false }: { works: readonly GalleryWork[]; decorative: boolean; language: Language; echo?: boolean }) {
  return <div className="v21-gallery-set" aria-hidden={decorative ? "true" : undefined}>
    {works.map((work, index) => <figure className={`v21-gallery-item v21-gallery-item--${work.shape} v21-gallery-item--${work.scale}`} key={work.id}>
      <div className="v21-gallery-image"><Image src={work.src} alt={decorative || echo ? "" : language === "zh" ? work.altZh : work.alt} width={work.width} height={work.height} loading={decorative || echo ? "lazy" : "eager"} unoptimized /></div>
      {!echo && <figcaption><span>{String(index + 1).padStart(2, "0")} / {String(galleryWorks.length).padStart(2, "0")}</span><span>{language === "zh" ? work.captionZh : work.caption}</span></figcaption>}
    </figure>)}
  </div>;
}

function MobileGallery({ language }: { language: Language }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const settleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const count = galleryWorks.length;
  const reel = [galleryWorks[count - 1], ...galleryWorks, galleryWorks[0]];

  const positionFor = useCallback((item: HTMLElement, window: HTMLDivElement) =>
    window.scrollLeft + item.getBoundingClientRect().left - window.getBoundingClientRect().left - (window.clientWidth - item.clientWidth) / 2, []);

  const nearest = useCallback((window: HTMLDivElement) => {
    const items = Array.from(window.querySelectorAll<HTMLElement>(".v21-gallery-mobile-item"));
    const middle = window.getBoundingClientRect().left + window.clientWidth / 2;
    return items.reduce((best, item) =>
      Math.abs(item.getBoundingClientRect().left + item.clientWidth / 2 - middle) <
      Math.abs(best.getBoundingClientRect().left + best.clientWidth / 2 - middle) ? item : best, items[0]);
  }, []);

  const settle = useCallback(() => {
    const window = windowRef.current;
    if (!window) return;
    const item = nearest(window);
    if (!item) return;
    const index = Number(item.dataset.index);
    activeRef.current = index;
    setActiveIndex(index);
    if (item.dataset.clone === "true") {
      const real = window.querySelector<HTMLElement>(`.v21-gallery-mobile-item[data-index="${index}"]:not([data-clone])`);
      if (real) {
        window.style.scrollSnapType = "none";
        window.scrollLeft = positionFor(real, window);
        requestAnimationFrame(() => { window.style.scrollSnapType = ""; });
      }
    }
  }, [nearest, positionFor]);

  useEffect(() => {
    const window = windowRef.current;
    const first = window?.querySelector<HTMLElement>('.v21-gallery-mobile-item[data-index="0"]:not([data-clone])');
    if (!window || !first) return;
    window.scrollLeft = positionFor(first, window);
    const resize = new ResizeObserver(() => { window.scrollLeft = positionFor(window.querySelector<HTMLElement>(`.v21-gallery-mobile-item[data-index="${activeRef.current}"]:not([data-clone])`) ?? first, window); });
    resize.observe(window);
    return () => { resize.disconnect(); if (settleRef.current) clearTimeout(settleRef.current); if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [positionFor]);

  function onScroll() {
    const window = windowRef.current;
    if (!window) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const item = nearest(window);
      if (item) { activeRef.current = Number(item.dataset.index); setActiveIndex(activeRef.current); }
    });
    if (settleRef.current) clearTimeout(settleRef.current);
    settleRef.current = setTimeout(settle, 180);
  }

  function move(direction: -1 | 1) {
    const window = windowRef.current;
    if (!window) return;
    const current = nearest(window);
    const items = Array.from(window.querySelectorAll<HTMLElement>(".v21-gallery-mobile-item"));
    const next = items[items.indexOf(current) + direction];
    if (next) window.scrollTo({ left: positionFor(next, window), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  return <div className="v21-gallery-mobile" data-active-index={activeIndex + 1}>
    <div className="v21-gallery-mobile-window" ref={windowRef} role="region" aria-roledescription="artwork reel" aria-label={language === "zh" ? "视觉作品，左右滑动浏览" : "Visual works, swipe left or right"} tabIndex={0} onScroll={onScroll} onKeyDown={onKeyDown}>
      <div className="v21-gallery-mobile-track">
        {reel.map((work, position) => {
          const clone = position === 0 || position === reel.length - 1;
          const index = position === 0 ? count - 1 : position === reel.length - 1 ? 0 : position - 1;
          return <figure className="v21-gallery-mobile-item" data-index={index} data-clone={clone ? "true" : undefined} data-active={!clone && index === activeIndex ? "true" : undefined} aria-hidden={clone ? "true" : undefined} key={`${work.id}-${position}`}>
            <div className="v21-gallery-mobile-image" style={{ aspectRatio: `${work.width} / ${work.height}` }}><Image src={work.src} alt={clone ? "" : language === "zh" ? work.altZh : work.alt} width={work.width} height={work.height} unoptimized /></div>
            <figcaption><span>{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span><span>{language === "zh" ? work.captionZh : work.caption}</span></figcaption>
          </figure>;
        })}
      </div>
    </div>
    <div className="v21-gallery-mobile-controls v2-frame">
      <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
      <span>{language === "zh" ? "左右滑动 · 作品档案" : "Swipe · open archive"}</span>
      <div><button type="button" onClick={() => move(-1)} aria-label={language === "zh" ? "上一幅作品" : "Previous artwork"}>←</button><button type="button" onClick={() => move(1)} aria-label={language === "zh" ? "下一幅作品" : "Next artwork"}>→</button></div>
    </div>
  </div>;
}

export function GalleryRibbon({ language }: { language: Language }) {
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; scroll: number } | null>(null);
  const reversed = [...galleryWorks].reverse();
  const copy = homeCopy[language];
  useEffect(() => {
    const target = windowRef.current;
    if (!target) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const center = () => {
      const firstSet = target.querySelector<HTMLElement>(".v21-gallery-track--main .v21-gallery-set");
      target.scrollLeft = reducedMotion.matches ? 0 : Math.max(0, (firstSet?.offsetWidth ?? 0) - target.clientWidth * .24);
    };
    center();
    reducedMotion.addEventListener("change", center);
    return () => reducedMotion.removeEventListener("change", center);
  }, []);
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const target = windowRef.current;
    if (!target) return;
    dragRef.current = { x: event.clientX, scroll: target.scrollLeft };
    target.setPointerCapture(event.pointerId);
    setDragging(true);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current || !windowRef.current) return;
    windowRef.current.scrollLeft = dragRef.current.scroll - (event.clientX - dragRef.current.x);
  }
  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    setDragging(false);
    if (windowRef.current?.hasPointerCapture(event.pointerId)) windowRef.current.releasePointerCapture(event.pointerId);
  }
  return <div className="v21-gallery" data-gallery-count={galleryWorks.length} data-paused={paused}>
    <div className="v21-gallery-topline v2-frame"><span>FIG 04 / {copy.galleryTop}</span><span>{String(galleryWorks.length).padStart(2, "0")} {copy.galleryCount}</span></div>
    <div className="v21-gallery-window" ref={windowRef} data-dragging={dragging} role="region" aria-label={copy.galleryRegion} tabIndex={0} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
      <div className="v21-gallery-track v21-gallery-track--main">
        <WorkSet works={galleryWorks} decorative language={language} />
        <WorkSet works={galleryWorks} decorative={false} language={language} />
        <WorkSet works={galleryWorks} decorative language={language} />
      </div>
      <div className="v21-gallery-track v21-gallery-track--echo" aria-hidden="true">
        <WorkSet works={reversed} decorative language={language} echo />
        <WorkSet works={reversed} decorative language={language} echo />
        <WorkSet works={reversed} decorative language={language} echo />
      </div>
    </div>
    <MobileGallery language={language} />
    <div className="v21-gallery-bottomline v2-frame"><span>← {copy.galleryContinue} →</span><button type="button" className="v21-gallery-motion" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? copy.galleryResume : copy.galleryPause}</button></div>
  </div>;
}

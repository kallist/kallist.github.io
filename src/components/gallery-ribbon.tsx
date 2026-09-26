"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
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
    <div className="v21-gallery-bottomline v2-frame"><span>← {copy.galleryContinue} →</span><button type="button" className="v21-gallery-motion" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? copy.galleryResume : copy.galleryPause}</button></div>
  </div>;
}

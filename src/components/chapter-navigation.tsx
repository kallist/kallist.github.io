"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const chapters = [
  ["00", "Intro", "hero"], ["01", "Selected work", "work"],
  ["02", "Education", "education"], ["03", "Method", "profile"],
  ["04", "Visual practice", "visual"], ["05", "Contact", "contact"],
] as const;

export function ChapterNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const inView = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (inView) setActive(inView.target.id);
    }, { rootMargin: "-30% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75] });
    for (const [, , id] of chapters) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onClose = () => { setOpen(false); document.body.style.removeProperty("overflow"); trigger.current?.focus(); };
    element.addEventListener("close", onClose);
    return () => { element.removeEventListener("close", onClose); document.body.style.removeProperty("overflow"); };
  }, []);

  const show = () => {
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    setOpen(true);
  };
  const close = () => dialog.current?.close();

  return <>
    <div className="v2-rail v2-rail-left" aria-hidden="true"><span>00 / 05</span></div>
    <div className="v2-rail v2-rail-right" aria-hidden="true"><span>K / 2026</span></div>
    <button ref={trigger} className="v2-nav-trigger" type="button" aria-label="Open chapter navigation" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
      <span className="v2-nav-glyph" aria-hidden="true"><i/><i/><i/></span>
      <span className="v2-nav-label">Index</span>
    </button>
    <dialog ref={dialog} className="v2-nav-dialog" aria-labelledby="v2-nav-title" onClick={(event) => { if (event.target === dialog.current) close(); }}>
      <div className="v2-nav-panel">
        <div className="v2-nav-head"><span>kallist / Index</span><button type="button" onClick={close} aria-label="Close chapter navigation">Close <span aria-hidden="true">×</span></button></div>
        <p id="v2-nav-title" className="v2-nav-title">Chapters<span aria-hidden="true">.</span></p>
        <nav aria-label="Chapter navigation">
          {chapters.map(([number, label, id]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={close}><small>{number}</small><span>{label}</span><b aria-hidden="true">↗</b></a>)}
          <Link href="/resume/" onClick={close}><small>↗</small><span>Resume</span><b aria-hidden="true">↗</b></Link>
        </nav>
        <div className="v2-nav-foot"><span>Independent practice / 2026</span><span>Close with Esc</span></div>
      </div>
    </dialog>
  </>;
}

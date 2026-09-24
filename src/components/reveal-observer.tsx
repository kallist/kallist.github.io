"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...document.querySelectorAll<HTMLElement>(".v2-reveal")];
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
  return null;
}

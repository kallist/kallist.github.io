"use client";
/* eslint-disable @next/next/no-img-element -- original documented local project images */
import { useState } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import type { Language } from "@/content/home-copy";

const purposes = {
  en: ["Image editing, with human control.", "Repository context, made inspectable.", "Web context, ready for an agent.", "From agent run to execution evidence.", "An inference product, with its limits."],
  zh: ["图像返工，把控制权留给人。", "让仓库上下文的选择可检查。", "把网页上下文交付给智能体。", "从智能体运行走到执行证据。", "呈现推理产品，也呈现边界。"],
};

export function WorkIndex({ language }: { language: Language }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <div className="v3-work-index v2-reveal" aria-label={language === "zh" ? "快速浏览项目" : "Browse the work"}>
    <div className="v3-work-preview" aria-hidden="true"><img key={project.slug} src={project.image} alt="" width="1200" height="900" /><div><span>{project.number} / 05</span><span>{project.title}</span></div><p>{language === "zh" ? "真实项目界面 · 演示与验证边界见案例" : "Real project UI · demo and validation boundaries inside each case"}</p></div>
    <nav className="v3-work-list" aria-label={language === "zh" ? "案例速览" : "Case study overview"}>{projects.map((item, index) => <Link key={item.slug} href={`/work/${item.slug}/`} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} data-active={active === index}><small>{item.number}</small><span><strong>{item.title}</strong><span>{purposes[language][index]}</span></span><b aria-hidden="true">↗</b></Link>)}</nav>
  </div>;
}

"use client";
/* eslint-disable @next/next/no-img-element -- static, documented artwork and campus illustration */
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChapterNavigation } from "@/components/chapter-navigation";
import { ProjectImage } from "@/components/project-image";
import { RevealObserver } from "@/components/reveal-observer";
import { SectionPattern } from "@/components/section-pattern";
import { WordHover } from "@/components/word-hover";
import { AsciiTree } from "@/components/ascii-tree";
import { GalleryRibbon } from "@/components/gallery-ribbon";
import { projects } from "@/content/projects";
import { homeCopy, type Language } from "@/content/home-copy";

const [repobound, cueparcel, agentStudio, skinLesion] = projects;

function ChapterMark({ number, title }: { number: string; title: string }) {
  return <div className="v2-chapter-mark v2-reveal"><span>{number} / <WordHover text={title} /></span><span aria-hidden="true">+ — + — + — +</span></div>;
}

function CaseLink({ slug, label }: { slug: string; label: string }) {
  return <Link className="v2-case-link" href={`/work/${slug}/`}>{label} <span aria-hidden="true">↗</span></Link>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = homeCopy[language];
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [language]);
  return <main id="main" className="v2-home" lang={language === "zh" ? "zh-CN" : "en"}>
    <ChapterNavigation language={language} onLanguageChange={setLanguage} />
    <RevealObserver />
    <AsciiTree />

    <section id="hero" className="v2-hero v2-field-host" aria-labelledby="hero-title">
      <SectionPattern kind="hero" />
      <div className="v2-frame">
        <div className="v2-hero-top v2-meta"><span><WordHover text={copy.navIndependent} /></span><span><WordHover text={copy.heroFocus} /></span></div>
        <div className="v2-hero-grid">
          <div className="v2-hero-name v2-reveal">
            <span className="v2-index">00 / <WordHover text={copy.heroIntro} /></span>
            <h1 id="hero-title"><WordHover text="kallist" /><span aria-hidden="true">.</span></h1>
            <div className="v2-hero-statement"><span className="v2-registration" aria-hidden="true">┼</span><p><WordHover text={copy.heroStatement} /></p></div>
          </div>
          <div className="v2-hero-art v2-reveal">
            <img src="/portrait/self-portrait.webp" alt="Black and white hand-drawn manga self portrait for kallist, fragmented with diagonal ink strokes" width="1448" height="1086" fetchPriority="high" />
            <span className="v2-art-label">{copy.heroArt}</span>
          </div>
        </div>
        <div className="v2-hero-bottom v2-meta"><span><WordHover text={copy.heroFields} /></span><Link href="#work"><WordHover text={copy.heroScroll} /> <span aria-hidden="true">↓</span></Link></div>
      </div>
    </section>

    <section id="work" className="v2-work" aria-labelledby="work-title">
      <div className="v2-frame"><ChapterMark number="01" title={copy.navWork} />
        <div className="v2-section-intro v2-reveal"><h2 id="work-title"><WordHover text={copy.workHeadingA} />{language === "en" ? " " : null}<em><WordHover text={copy.workHeadingB} /></em></h2><p><WordHover text={copy.workIntro} /></p></div>
      </div>

      <article className="v2-case v2-repo-scene v2-field-host v2-scene" aria-labelledby="repobound-title">
        <SectionPattern kind="repobound" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-repo-layout">
          <div className="v2-case-count"><span>01 / 04</span><span>{copy.repoKicker}</span></div>
          <h3 id="repobound-title" className="v2-reveal"><WordHover text="Repo" /><span><WordHover text="Bound" /></span></h3>
          <div className="v2-repo-media v2-case-media v2-reveal"><ProjectImage src={repobound.image} alt={repobound.imageAlt} caption={copy.repoImageCaption} linkLabel={copy.imageLink} /></div>
          <div className="v2-repo-evidence v2-reveal"><p className="v2-case-lead"><WordHover text={copy.repoSummary} /></p><p><WordHover text={copy.repoProblem} /></p><CaseLink slug={repobound.slug} label={copy.caseLink} /></div>
          <span className="v2-scene-coordinate" aria-hidden="true">X:01 / CONTEXT FIELD</span>
        </div>
      </article>

      <article className="v2-case v2-cue-scene v2-field-host v2-scene" aria-labelledby="cueparcel-title">
        <SectionPattern kind="cueparcel" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-cue-layout">
          <div className="v2-case-count"><span>02 / 04</span><span>{copy.cueKicker}</span></div>
          <div className="v2-cue-heading v2-reveal"><h3 id="cueparcel-title"><WordHover text="Cue" /><em><WordHover text="Parcel" /></em></h3><p className="v2-case-lead"><WordHover text={copy.cueSummary} /></p></div>
          <ol className="v2-cue-flow v2-reveal" aria-label="CueParcel workflow">{[copy.cuePick, copy.cueCart, copy.cueRecipe, copy.cueTaskSpec, copy.cueReceipt].map((step, index) => <li key={index}><small>0{index + 1}</small><strong><WordHover text={step} /></strong><span aria-hidden="true">↗</span></li>)}</ol>
          <div className="v2-cue-media v2-case-media v2-reveal"><ProjectImage src={cueparcel.image} alt={cueparcel.imageAlt} caption={copy.cueImageCaption} linkLabel={copy.imageLink} /></div>
          <div className="v2-cue-evidence v2-reveal"><span>{copy.cueFlow}</span><p><WordHover text={copy.cueProblem} /></p><CaseLink slug={cueparcel.slug} label={copy.caseLink} /></div>
        </div>
      </article>

      <article className="v2-case v2-agent-scene v2-field-host v2-scene" aria-labelledby="agent-title">
        <SectionPattern kind="agent" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-agent-layout">
          <div className="v2-case-count"><span>03 / 04</span><span>{copy.agentKicker}</span></div>
          <div className="v2-agent-heading v2-reveal"><h3 id="agent-title"><WordHover text="Agent" /> <em><WordHover text="Studio" /></em></h3><p className="v2-case-lead"><WordHover text={copy.agentSummary} /></p></div>
          <ol className="v2-agent-coordinates v2-reveal" aria-label="Agent Studio architecture">{["RUN", "TOOL", "RAG", "MEMORY", "TRACE", "EVAL"].map((step, index) => <li key={step}><small>0{index + 1}</small><strong><WordHover text={step} /></strong></li>)}</ol>
          <div className="v2-agent-media v2-case-media v2-reveal"><ProjectImage src={agentStudio.image} alt={agentStudio.imageAlt} caption={copy.agentImageCaption} linkLabel={copy.imageLink} /></div>
          <div className="v2-agent-evidence v2-reveal"><span>{copy.agentFlow}</span><CaseLink slug={agentStudio.slug} label={copy.caseLink} /></div>
        </div>
      </article>

      <article className="v2-case v2-skin-scene v2-field-host v2-scene" aria-labelledby="skin-title">
        <SectionPattern kind="skin" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-skin-layout">
          <div className="v2-case-count"><span>04 / 04</span><span>{copy.skinKicker}</span></div>
          <div className="v2-skin-heading v2-reveal"><h3 id="skin-title"><WordHover text="Skin Lesion" /> <em><WordHover text="AI Platform" /></em></h3><p><WordHover text={copy.skinSummary} /></p></div>
          <div className="v2-skin-values v2-reveal" aria-label={language === "zh" ? "存档评估结果" : "Stored evaluation results"}>{skinLesion.metrics?.map((metric, index) => <div key={metric.label}><small>0{index + 1} / EVAL</small><strong><WordHover text={metric.value} /></strong><span><WordHover text={[copy.metricInternal, copy.metricExternal, copy.metricRecall][index]} /></span></div>)}</div>
          <div className="v2-skin-media v2-case-media v2-reveal"><ProjectImage src={skinLesion.image} alt={skinLesion.imageAlt} caption={copy.skinImageCaption} linkLabel={copy.imageLink} /></div>
          <div className="v2-skin-evidence v2-reveal"><p><WordHover text={copy.skinBoundary} /></p><CaseLink slug={skinLesion.slug} label={copy.caseLink} /></div>
        </div>
      </article>
    </section>

    <section id="education" className="v2-education v2-field-host" aria-labelledby="education-title" lang="zh-CN">
      <SectionPattern kind="education" />
      <div className="v2-frame">
        <div className="v2-education-meta v2-reveal"><span>02 / <WordHover text={copy.educationChapter} /></span><span>2023.09 — 2027.06</span></div>
        <div className="v2-education-spread">
          <div className="v2-education-art v2-reveal"><img src="/graphics/scau-gate.svg" alt="由数字与汉字描绘的华南农业大学校门" width="1200" height="700" /><span>{copy.educationFig}</span></div>
          <div className="v2-education-copy v2-reveal"><span className="v2-registration" aria-hidden="true">┼</span><h2 id="education-title"><WordHover text="华南农业大学" /></h2><p><WordHover text="信息管理与信息系统" /></p><div className="v2-education-data"><span><WordHover text="本科" /></span><span>2023.09 — 2027.06</span><span>2027届</span></div></div>
        </div>
      </div>
    </section>

    <section id="profile" className="v2-method v2-field-host" aria-labelledby="profile-title">
      <SectionPattern kind="method" />
      <div className="v2-frame"><ChapterMark number="03" title={copy.methodChapter} />
        <div className="v2-method-grid">
          <div className="v2-reveal"><h2 id="profile-title"><WordHover text={copy.methodHeadingA} /><br/><em><WordHover text={copy.methodHeadingB} /></em></h2><p className="v2-method-intro"><WordHover text={copy.methodIntro} /></p></div>
          <div className="v2-principles v2-reveal">{[
            ["01", copy.principle1, copy.principle1Detail],
            ["02", copy.principle2, copy.principle2Detail],
            ["03", copy.principle3, copy.principle3Detail],
          ].map(([number, title, description]) => <div key={number}><small>{number}</small><strong><WordHover text={title} /></strong><p><WordHover text={description} /></p></div>)}</div>
        </div>
        <div id="experience" className="v2-experience v2-reveal"><span>{copy.experienceLabel}</span><div><h3>{copy.experienceTitle}</h3><p>Guangzhou Teddy Intelligence Technology Co., Ltd.</p><p><WordHover text={copy.experienceDescription} /></p><Link className="v2-case-link" href="/work/skin-lesion-ai/">{copy.experienceLink} <span aria-hidden="true">↗</span></Link></div></div>
        <div className="v2-capabilities v2-reveal"><span>{copy.capabilitiesLabel}</span><div>{[
          [copy.capability1, copy.capabilityProof1, "/work/repobound/"],
          [copy.capability2, copy.capabilityProof2, "/work/agent-studio/"],
          [copy.capability3, copy.capabilityProof3, "/work/skin-lesion-ai/"],
          [copy.capability4, copy.capabilityProof4, "/work/cueparcel/"],
        ].map(([title, proof, href], index) => <Link href={href} key={title}><small>0{index + 1}</small><strong>{title}</strong><span>{proof}</span><b aria-hidden="true">↗</b></Link>)}</div></div>
        <p className="v2-source-note v2-reveal">{copy.sourceLead} <a href="https://github.com/kallist" target="_blank" rel="noopener noreferrer">{copy.sourceGitHub} ↗</a> · <a href="https://github.com/yzfly/awesome-context-engineering/pull/50" target="_blank" rel="noopener noreferrer">{copy.sourcePR} ↗</a></p>
      </div>
    </section>

    <section id="visual" className="v2-visual v2-field-host" aria-labelledby="visual-title">
      <SectionPattern kind="visual" />
      <div className="v2-frame"><ChapterMark number="04" title={copy.navVisual} />
        <div className="v2-visual-heading v2-reveal"><h2 id="visual-title"><WordHover text={copy.visualHeadingA} />{language === "en" ? " " : null}<em><WordHover text={copy.visualHeadingB} /></em></h2><p><WordHover text={copy.visualIntro} /></p></div>
      </div>
      <GalleryRibbon language={language} />
    </section>

    <section id="contact" className="v2-contact v2-field-host" aria-labelledby="contact-title">
      <SectionPattern kind="contact" />
      <div className="v2-frame"><ChapterMark number="05" title={copy.navContact} />
        <div className="v2-contact-body v2-reveal"><p><WordHover text={copy.contactStatement} /></p><h2 id="contact-title"><WordHover text="kallist" /><span aria-hidden="true">.</span></h2><div className="v2-contact-links"><a href="mailto:2441397782@qq.com"><WordHover text="2441397782@qq.com" /> <span aria-hidden="true">↗</span></a><a href="https://github.com/kallist" target="_blank" rel="noopener noreferrer"><WordHover text={copy.contactGitHub} /> <span aria-hidden="true">↗</span></a><Link href="/resume/"><WordHover text={copy.contactResume} /> <span aria-hidden="true">↗</span></Link></div></div>
        <div className="v2-contact-bottom"><span>{copy.contactBottom}</span><Link href="#hero">{copy.contactReturn} ↑</Link></div>
      </div>
    </section>
  </main>;
}

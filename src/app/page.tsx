/* eslint-disable @next/next/no-img-element -- static, documented artwork and campus illustration */
import Link from "next/link";
import { ChapterNavigation } from "@/components/chapter-navigation";
import { ProjectImage } from "@/components/project-image";
import { RevealObserver } from "@/components/reveal-observer";
import { SectionPattern } from "@/components/section-pattern";
import { WordHover } from "@/components/word-hover";
import { projects } from "@/content/projects";

const [repobound, cueparcel, agentStudio, skinLesion] = projects;

function ChapterMark({ number, title }: { number: string; title: string }) {
  return <div className="v2-chapter-mark v2-reveal"><span>{number} / <WordHover text={title} /></span><span aria-hidden="true">+ — + — + — +</span></div>;
}

function CaseLink({ slug }: { slug: string }) {
  return <Link className="v2-case-link" href={`/work/${slug}/`}>Explore case study <span aria-hidden="true">↗</span></Link>;
}

export default function Home() {
  return <main id="main" className="v2-home">
    <ChapterNavigation />
    <RevealObserver />

    <section id="hero" className="v2-hero v2-field-host" aria-labelledby="hero-title">
      <SectionPattern kind="hero" />
      <div className="v2-frame">
        <div className="v2-hero-top v2-meta"><span><WordHover text="Independent practice / 2026" /></span><span><WordHover text="AI systems × Visual thinking" /></span></div>
        <div className="v2-hero-grid">
          <div className="v2-hero-name v2-reveal">
            <span className="v2-index">00 / <WordHover text="Introduction" /></span>
            <h1 id="hero-title"><WordHover text="kallist" /><span aria-hidden="true">.</span></h1>
            <div className="v2-hero-statement"><span className="v2-registration" aria-hidden="true">┼</span><p><WordHover text="Make the system visible. Make the evidence matter." /></p></div>
          </div>
          <div className="v2-hero-art v2-reveal">
            <img src="/portrait/self-portrait.webp" alt="Black and white hand-drawn manga self portrait for kallist, fragmented with diagonal ink strokes" width="1448" height="1086" fetchPriority="high" />
            <span className="v2-art-label">FIG 00 / Original ink drawing</span>
          </div>
        </div>
        <div className="v2-hero-bottom v2-meta"><span><WordHover text="Context / Agents / Evidence / Art" /></span><Link href="#work"><WordHover text="Scroll to selected work" /> <span aria-hidden="true">↓</span></Link></div>
      </div>
    </section>

    <section id="work" className="v2-work" aria-labelledby="work-title">
      <div className="v2-frame"><ChapterMark number="01" title="Selected work" />
        <div className="v2-section-intro v2-reveal"><h2 id="work-title"><WordHover text="Selected" /> <em><WordHover text="work." /></em></h2><p><WordHover text="Four systems. Four different boundaries. Each case keeps its source, decisions and limits one click away." /></p></div>
      </div>

      <article className="v2-case v2-repo-scene v2-field-host v2-scene" aria-labelledby="repobound-title">
        <SectionPattern kind="repobound" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-repo-layout">
          <div className="v2-case-count"><span>01 / 04</span><span>{repobound.kicker}</span></div>
          <h3 id="repobound-title" className="v2-reveal"><WordHover text="Repo" /><span><WordHover text="Bound" /></span></h3>
          <div className="v2-repo-media v2-case-media v2-reveal"><ProjectImage src={repobound.image} alt={repobound.imageAlt} caption={repobound.imageCaption} /></div>
          <div className="v2-repo-evidence v2-reveal"><p className="v2-case-lead"><WordHover text={repobound.summary} /></p><p><WordHover text={repobound.problem} /></p><CaseLink slug={repobound.slug} /></div>
          <span className="v2-scene-coordinate" aria-hidden="true">X:01 / CONTEXT FIELD</span>
        </div>
      </article>

      <article className="v2-case v2-cue-scene v2-field-host v2-scene" aria-labelledby="cueparcel-title">
        <SectionPattern kind="cueparcel" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-cue-layout">
          <div className="v2-case-count"><span>02 / 04</span><span>{cueparcel.kicker}</span></div>
          <div className="v2-cue-heading v2-reveal"><h3 id="cueparcel-title"><WordHover text="Cue" /><em><WordHover text="Parcel" /></em></h3><p className="v2-case-lead"><WordHover text={cueparcel.summary} /></p></div>
          <ol className="v2-cue-flow v2-reveal" aria-label="CueParcel workflow">{["Pick", "Cart", "Recipe", "TaskSpec", "Receipt"].map((step, index) => <li key={step}><small>0{index + 1}</small><strong><WordHover text={step} /></strong><span aria-hidden="true">↗</span></li>)}</ol>
          <div className="v2-cue-media v2-case-media v2-reveal"><ProjectImage src={cueparcel.image} alt={cueparcel.imageAlt} caption={cueparcel.imageCaption} /></div>
          <div className="v2-cue-evidence v2-reveal"><span>Source → selection → receipt</span><p><WordHover text={cueparcel.problem} /></p><CaseLink slug={cueparcel.slug} /></div>
        </div>
      </article>

      <article className="v2-case v2-agent-scene v2-field-host v2-scene" aria-labelledby="agent-title">
        <SectionPattern kind="agent" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-agent-layout">
          <div className="v2-case-count"><span>03 / 04</span><span>{agentStudio.kicker}</span></div>
          <div className="v2-agent-heading v2-reveal"><h3 id="agent-title"><WordHover text="Agent" /> <em><WordHover text="Studio" /></em></h3><p className="v2-case-lead"><WordHover text={agentStudio.summary} /></p></div>
          <ol className="v2-agent-coordinates v2-reveal" aria-label="Agent Studio architecture">{["RUN", "TOOL", "RAG", "MEMORY", "TRACE", "EVAL"].map((step, index) => <li key={step}><small>0{index + 1}</small><strong><WordHover text={step} /></strong></li>)}</ol>
          <div className="v2-agent-media v2-case-media v2-reveal"><ProjectImage src={agentStudio.image} alt={agentStudio.imageAlt} caption={agentStudio.imageCaption} /></div>
          <div className="v2-agent-evidence v2-reveal"><span>Runtime → trace → evaluation</span><CaseLink slug={agentStudio.slug} /></div>
        </div>
      </article>

      <article className="v2-case v2-skin-scene v2-field-host v2-scene" aria-labelledby="skin-title">
        <SectionPattern kind="skin" />
        <div className="v2-scene-guides" aria-hidden="true" />
        <div className="v2-frame v2-skin-layout">
          <div className="v2-case-count"><span>04 / 04</span><span>{skinLesion.kicker}</span></div>
          <div className="v2-skin-heading v2-reveal"><h3 id="skin-title"><WordHover text="Skin Lesion" /> <em><WordHover text="AI Platform" /></em></h3><p><WordHover text={skinLesion.summary} /></p></div>
          <div className="v2-skin-values v2-reveal" aria-label="Stored evaluation results">{skinLesion.metrics?.map((metric, index) => <div key={metric.label}><small>0{index + 1} / EVAL</small><strong><WordHover text={metric.value} /></strong><span><WordHover text={metric.label} /></span></div>)}</div>
          <div className="v2-skin-media v2-case-media v2-reveal"><ProjectImage src={skinLesion.image} alt={skinLesion.imageAlt} caption={skinLesion.imageCaption} /></div>
          <div className="v2-skin-evidence v2-reveal"><p>Engineering practice. <strong>Not a clinical diagnosis product.</strong></p><CaseLink slug={skinLesion.slug} /></div>
        </div>
      </article>
    </section>

    <section id="education" className="v2-education v2-field-host" aria-labelledby="education-title" lang="zh-CN">
      <SectionPattern kind="education" />
      <div className="v2-frame">
        <div className="v2-education-meta v2-reveal"><span>02 / <WordHover text="教育经历" /></span><span>2023.09 — 2027.06</span></div>
        <div className="v2-education-spread">
          <div className="v2-education-art v2-reveal"><img src="/graphics/scau-gate.svg" alt="由数字与汉字描绘的华南农业大学校门" width="1200" height="700" /><span>图 02 / 数字符号构图</span></div>
          <div className="v2-education-copy v2-reveal"><span className="v2-registration" aria-hidden="true">┼</span><h2 id="education-title"><WordHover text="华南农业大学" /></h2><p><WordHover text="信息管理与信息系统" /></p><div className="v2-education-data"><span><WordHover text="本科" /></span><span>2023.09 — 2027.06</span><span>2027届</span></div></div>
        </div>
      </div>
    </section>

    <section id="profile" className="v2-method v2-field-host" aria-labelledby="profile-title">
      <SectionPattern kind="method" />
      <div className="v2-frame"><ChapterMark number="03" title="Method & experience" />
        <div className="v2-method-grid">
          <div className="v2-reveal"><h2 id="profile-title"><WordHover text="Build it." /><br/><em><WordHover text="Prove it." /></em></h2><p className="v2-method-intro"><WordHover text="Good AI products need more than a convincing answer. I work from the input boundary to execution and evaluation: what entered the system, what it did and what the evidence actually supports." /></p></div>
          <div className="v2-principles v2-reveal">{[
            ["01", "Inspectable", "Make selected inputs and execution paths visible."],
            ["02", "Bounded", "Give budgets, permissions and failure paths explicit limits."],
            ["03", "Honest", "Keep unfavorable results and testing gaps in the story."],
          ].map(([number, title, description]) => <div key={number}><small>{number}</small><strong><WordHover text={title} /></strong><p><WordHover text={description} /></p></div>)}</div>
        </div>
        <div id="experience" className="v2-experience v2-reveal"><span>Industry practice / 2026.08 — 2026.09</span><div><h3>AI Engineer Intern</h3><p>Guangzhou Teddy Intelligence Technology Co., Ltd.</p><p><WordHover text="Worked on a local skin lesion AI application across data audit, model training and evaluation, inference service and product workflow. The external result and its limitations remain visible in the case study." /></p><Link className="v2-case-link" href="/work/skin-lesion-ai/">Read the engineering case <span aria-hidden="true">↗</span></Link></div></div>
        <div className="v2-capabilities v2-reveal"><span>Capabilities / Attached to work</span><div>{[
          ["Context engineering", "RepoBound / CueParcel", "/work/repobound/"],
          ["Agent runtime + evidence", "Agent Studio", "/work/agent-studio/"],
          ["Applied ML + evaluation", "Skin Lesion AI", "/work/skin-lesion-ai/"],
          ["Product + visual thinking", "CueParcel / Visual practice", "/work/cueparcel/"],
        ].map(([title, proof, href], index) => <Link href={href} key={title}><small>0{index + 1}</small><strong>{title}</strong><span>{proof}</span><b aria-hidden="true">↗</b></Link>)}</div></div>
        <p className="v2-source-note v2-reveal">Source is part of the work: <a href="https://github.com/kallist" target="_blank" rel="noopener noreferrer">GitHub profile ↗</a> · <a href="https://github.com/yzfly/awesome-context-engineering/pull/50" target="_blank" rel="noopener noreferrer">CueParcel merged PR #50 ↗</a></p>
      </div>
    </section>

    <section id="visual" className="v2-visual v2-field-host" aria-labelledby="visual-title">
      <SectionPattern kind="visual" />
      <div className="v2-frame"><ChapterMark number="04" title="Visual practice" />
        <div className="v2-visual-heading v2-reveal"><h2 id="visual-title"><WordHover text="The line" /> <em><WordHover text="remains." /></em></h2><p><WordHover text="One original drawing. Hand-drawn manga line work meets digital fragmentation." /></p></div>
        <figure className="v2-visual-art v2-reveal"><img src="/portrait/self-portrait.webp" alt="Full black and white manga self portrait for kallist" loading="lazy" width="1448" height="1086" /><figcaption><span>FIG 04 / Original drawing</span><span>Ink drawing · personal work</span></figcaption></figure>
      </div>
    </section>

    <section id="contact" className="v2-contact v2-field-host" aria-labelledby="contact-title">
      <SectionPattern kind="contact" />
      <div className="v2-frame"><ChapterMark number="05" title="Contact" />
        <div className="v2-contact-body v2-reveal"><p><WordHover text="For work where the evidence matters." /></p><h2 id="contact-title"><WordHover text="kallist" /><span aria-hidden="true">.</span></h2><div className="v2-contact-links"><a href="mailto:2441397782@qq.com"><WordHover text="2441397782@qq.com" /> <span aria-hidden="true">↗</span></a><a href="https://github.com/kallist" target="_blank" rel="noopener noreferrer"><WordHover text="GitHub" /> <span aria-hidden="true">↗</span></a><Link href="/resume/"><WordHover text="Resume" /> <span aria-hidden="true">↗</span></Link></div></div>
        <div className="v2-contact-bottom"><span>Drawn in ink. Built with evidence.</span><Link href="#hero">Return to the beginning ↑</Link></div>
      </div>
    </section>
  </main>;
}

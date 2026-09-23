/* eslint-disable @next/next/no-img-element -- local originals are served as-is by static export */
import Link from "next/link";
import { ProjectImage } from "@/components/project-image";
import { projects } from "@/content/projects";

const capabilities = [
  {
    name: "Context engineering",
    proof: "RepoBound · CueParcel",
    href: "/work/repobound/",
  },
  {
    name: "Agent runtime & evidence",
    proof: "Agent Studio",
    href: "/work/agent-studio/",
  },
  {
    name: "Applied ML & evaluation",
    proof: "Skin Lesion AI Platform",
    href: "/work/skin-lesion-ai/",
  },
  {
    name: "Product & visual thinking",
    proof: "CueParcel · visual practice",
    href: "/work/cueparcel/",
  },
];

export default function Home() {
  return (
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span>Portfolio / 2026</span>
          <span>AI engineering · Context systems · Visual practice</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Wei Zhuojie <span aria-hidden="true">/</span> 韦焯杰
            </p>
            <h1 id="hero-title">
              <span>Making AI</span>
              <span className="serif-italic">systems</span>
              <span>
                inspectable<span className="title-period">.</span>
              </span>
            </h1>
            <p className="hero-lede">
              I build context tools and agent systems that people can inspect,
              test and understand.
            </p>
            <div className="hero-actions">
              <Link className="button button-dark" href="#work">
                Explore selected work <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" href="/resume/">
                View resume <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="hero-art">
            {/* User supplied drawing; native image avoids server image processing in static export. */}
            <img
              src="/portrait/self-portrait.webp"
              alt="Black and white hand-drawn manga self portrait by Wei Zhuojie with fragmented ink lines"
              fetchPriority="high"
              width="1448"
              height="1086"
            />
            <span className="art-index" aria-hidden="true">
              FIG. 001 / SELF PORTRAIT
            </span>
          </div>
        </div>
        <div className="hero-bottomline">
          <span>South China Agricultural University · Class of 2027</span>
          <span>Scroll to explore ↓</span>
        </div>
      </section>

      <section
        className="section shell work-section"
        id="work"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <p className="section-index">01 / SELECTED WORK</p>
          <h2 id="work-title">
            Systems with <em>receipts.</em>
          </h2>
          <p>
            Four projects, each with a problem, an engineering decision and
            evidence you can open.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article
              className={`project-feature project-feature-${index + 1}`}
              key={project.slug}
            >
              <div className="project-feature-meta">
                <span>{project.number} / 04</span>
                <span>{project.kicker}</span>
              </div>
              <div className="project-feature-grid">
                <div className="project-feature-copy">
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-context">{project.problem}</p>
                  <div
                    className="tag-list"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.stack.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link
                    className="project-link"
                    href={`/work/${project.slug}/`}
                  >
                    Explore case study <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <ProjectImage
                  src={project.image}
                  alt={project.imageAlt}
                  caption={project.imageCaption}
                />
              </div>
              {project.metrics && (
                <div className="metric-strip">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section
        className="section section-tint"
        id="profile"
        aria-labelledby="profile-title"
      >
        <div className="shell profile-grid">
          <div>
            <p className="section-index">02 / HOW I WORK</p>
            <h2 id="profile-title">
              Build it.
              <br />
              <em>Then prove it.</em>
            </h2>
          </div>
          <div className="profile-copy">
            <p>
              Good AI products need more than a convincing answer. I work from
              the input boundary to execution and evaluation: what entered the
              system, what it did and what the evidence actually supports.
            </p>
            <div className="principles">
              <div>
                <span>01</span>
                <strong>Inspectable</strong>
                <p>Make the selected inputs and execution path visible.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Bounded</strong>
                <p>
                  Give budgets, permissions and failure paths explicit limits.
                </p>
              </div>
              <div>
                <span>03</span>
                <strong>Honest</strong>
                <p>Keep unfavorable results and testing gaps in the story.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section shell experience-section"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading slim">
          <p className="section-index">03 / EXPERIENCE</p>
          <h2 id="experience-title">Industry practice.</h2>
        </div>
        <div className="experience-row">
          <div className="experience-date">2026.08 — 2026.09</div>
          <div>
            <h3>AI Engineer Intern</h3>
            <p className="company">
              Guangzhou Teddy Intelligence Technology Co., Ltd.
            </p>
            <p>
              Worked on a local skin lesion AI application across data audit,
              model training and evaluation, inference service and product
              workflow. The independent external test exposed a meaningful drop
              in accuracy and malignant recall; that result remains visible in
              the case study.
            </p>
            <Link className="text-link" href="/work/skin-lesion-ai/">
              Read the engineering case <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section shell capabilities-section"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="section-heading slim">
          <p className="section-index">04 / CAPABILITIES</p>
          <h2 id="capabilities-title">
            Skills, attached
            <br />
            to <em>work.</em>
          </h2>
        </div>
        <div className="capability-list">
          {capabilities.map((item, index) => (
            <Link href={item.href} className="capability-row" key={item.name}>
              <span className="capability-num">0{index + 1}</span>
              <span className="capability-name">{item.name}</span>
              <span className="capability-proof">{item.proof}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="section shell evidence-section"
        id="evidence"
        aria-labelledby="evidence-title"
      >
        <div className="evidence-panel">
          <p className="section-index">05 / OPEN SOURCE & EVIDENCE</p>
          <h2 id="evidence-title">
            Open the <em>source.</em>
          </h2>
          <p>
            The case studies link to public repositories, architecture notes and
            stored evaluations. CueParcel was added to the community&apos;s
            Context Engineering Systems &amp; Kits list through a merged public
            PR.
          </p>
          <div className="evidence-actions">
            <a
              href="https://github.com/kallist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile ↗
            </a>
            <a
              href="https://github.com/yzfly/awesome-context-engineering/pull/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              Merged PR #50 ↗
            </a>
          </div>
        </div>
      </section>

      <section
        className="section shell visual-section"
        id="visual"
        aria-labelledby="visual-title"
      >
        <div className="section-heading">
          <p className="section-index">06 / VISUAL PRACTICE</p>
          <h2 id="visual-title">
            Beyond <em>code.</em>
          </h2>
          <p>
            Drawing and visual systems are part of how I think through form,
            attention and communication.
          </p>
        </div>
        <div className="visual-grid">
          <div className="visual-crop">
            <img
              src="/portrait/self-portrait.webp"
              alt="Detail of Wei Zhuojie's black-and-white manga self portrait"
              loading="lazy"
              width="1448"
              height="1086"
            />
          </div>
          <div className="visual-note">
            <span className="note-number">01 / 01</span>
            <h3>
              Self portrait
              <br />
              in fragments.
            </h3>
            <p>
              Hand-drawn manga line work meets digital fragmentation. This
              original portrait is the visual anchor for the site. Additional
              artwork will appear only when real pieces are available to curate.
            </p>
            <span className="visual-medium">Line art · personal work</span>
          </div>
        </div>
      </section>

      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="shell">
          <p className="section-index">07 / CONTACT</p>
          <h2 id="contact-title">
            Let&apos;s build
            <br />
            <em>something real.</em>
          </h2>
          <div className="contact-links">
            <a href="mailto:2441397782@qq.com">
              2441397782@qq.com <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/kallist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub / kallist <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="contact-end">
            AI engineering · Context systems · Visual practice
          </p>
        </div>
      </section>
    </main>
  );
}

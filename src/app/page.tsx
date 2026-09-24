/* eslint-disable @next/next/no-img-element -- supplied artwork is served unchanged by static export */
import Link from "next/link";
import { ChapterTransition } from "@/components/chapter-transition";
import { ProjectImage } from "@/components/project-image";
import { SectionPattern } from "@/components/section-pattern";
import { projects } from "@/content/projects";

const [repobound, cueparcel, agentStudio, skinLesion] = projects;

const capabilities = [
  {
    name: "Context engineering",
    proof: "RepoBound / CueParcel",
    href: "/work/repobound/",
  },
  {
    name: "Agent runtime + evidence",
    proof: "Agent Studio",
    href: "/work/agent-studio/",
  },
  {
    name: "Applied ML + evaluation",
    proof: "Skin Lesion AI",
    href: "/work/skin-lesion-ai/",
  },
  {
    name: "Product + visual thinking",
    proof: "CueParcel / Visual practice",
    href: "/work/cueparcel/",
  },
];

export default function Home() {
  return (
    <main id="main" className="v11-home">
      <section
        className="v11-hero shell v11-pattern-host"
        aria-labelledby="hero-title"
      >
        <SectionPattern kind="hero" />
        <div className="v11-hero-overline v11-micro">
          <span>Independent practice / 2026</span>
          <span>Engineering × Visual thinking</span>
        </div>
        <h1 id="hero-title" className="v11-hero-wordmark">
          kallist<span aria-hidden="true">.</span>
        </h1>
        <div className="v11-hero-field">
          <div className="v11-fragment-field" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <img
            className="v11-hero-portrait"
            src="/portrait/self-portrait.webp"
            alt="Black and white hand-drawn manga self portrait for kallist, fragmented with diagonal ink strokes"
            fetchPriority="high"
            width="1448"
            height="1086"
          />
          <div className="v11-hero-thesis">
            <p className="v11-micro">
              AI systems / Context engineering / Visual practice
            </p>
            <p>
              Make the system visible.
              <br />
              Make the evidence matter.
            </p>
          </div>
          <div className="v11-hero-caption v11-micro">
            <span>01 original drawing</span>
            <span>Ink / digital fragments</span>
          </div>
        </div>
        <div className="v11-hero-tail v11-micro">
          <span>AI engineering · source-first practice</span>
          <Link href="#work">
            Selected work <span aria-hidden="true">↓</span>
          </Link>
        </div>
        <div className="v11-hero-education v11-micro" role="group" aria-label="Education">
          <span>South China Agricultural University</span>
          <span>Information Management &amp; Information Systems</span>
          <span>Class of 2027</span>
        </div>
      </section>

      <ChapterTransition number="01" label="Selected work" />
      <section className="v11-work" id="work" aria-labelledby="work-title">
        <div className="shell v11-chapter-intro">
          <span className="v11-chapter-ghost" aria-hidden="true">
            01
          </span>
          <p className="v11-micro">01 / Four systems, four boundaries</p>
          <h2 id="work-title">
            Selected
            <br />
            <em>work.</em>
          </h2>
          <p className="v11-chapter-aside">
            Engineering decisions you can inspect, with source and limitations
            one click away.
          </p>
        </div>

        <article className="shell v11-feature v11-repobound v11-pattern-host">
          <SectionPattern kind="repobound" />
          <div className="v11-feature-rule v11-micro">
            <span>01 / 04</span>
            <span>{repobound.kicker}</span>
          </div>
          <h3>
            RepoBound<span aria-hidden="true">↗</span>
          </h3>
          <div className="v11-repobound-layout">
            <ProjectImage
              src={repobound.image}
              alt={repobound.imageAlt}
              caption={repobound.imageCaption}
            />
            <div className="v11-feature-copy">
              <p className="v11-feature-lead">{repobound.summary}</p>
              <p>{repobound.problem}</p>
              <Link className="v11-open-link" href={`/work/${repobound.slug}/`}>
                Explore case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </article>

        <article className="v11-cueparcel v11-pattern-host">
          <SectionPattern kind="cueparcel" />
          <div className="shell">
            <div className="v11-feature-rule v11-micro">
              <span>02 / 04</span>
              <span>{cueparcel.kicker}</span>
            </div>
            <div className="v11-cue-header">
              <h3>
                Cue<span>Parcel</span>
              </h3>
              <p>{cueparcel.summary}</p>
            </div>
            <div className="v11-cue-layout">
              <ol className="v11-cue-steps" aria-label="CueParcel workflow">
                {[
                  ["01", "Pick"],
                  ["02", "Cart"],
                  ["03", "Recipe"],
                  ["04", "TaskSpec"],
                  ["05", "Receipt"],
                ].map(([number, label]) => (
                  <li key={label}>
                    <span>{number}</span>
                    {label}
                  </li>
                ))}
              </ol>
              <div className="v11-cue-media">
                <ProjectImage
                  src={cueparcel.image}
                  alt={cueparcel.imageAlt}
                  caption={cueparcel.imageCaption}
                />
                <Link
                  className="v11-open-link"
                  href={`/work/${cueparcel.slug}/`}
                >
                  Explore case study <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <article className="shell v11-feature v11-agent v11-pattern-host">
          <SectionPattern kind="agent" />
          <div className="v11-feature-rule v11-micro">
            <span>03 / 04</span>
            <span>{agentStudio.kicker}</span>
          </div>
          <div className="v11-agent-heading">
            <h3>
              Agent <em>Studio</em>
            </h3>
            <p>{agentStudio.summary}</p>
          </div>
          <div
            className="v11-agent-sequence v11-micro"
            aria-label="Agent Studio architecture"
          >
            {["Runtime", "Tool", "RAG", "Memory", "Trace", "Evaluation"].map(
              (step, index) => (
                <span key={step}>
                  <small>0{index + 1}</small>
                  {step}
                </span>
              ),
            )}
          </div>
          <div className="v11-agent-media">
            <ProjectImage
              src={agentStudio.image}
              alt={agentStudio.imageAlt}
              caption={agentStudio.imageCaption}
            />
            <Link className="v11-open-link" href={`/work/${agentStudio.slug}/`}>
              Explore case study <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <article className="v11-skin v11-pattern-host">
          <SectionPattern kind="skin" />
          <div className="shell">
            <div className="v11-feature-rule v11-micro">
              <span>04 / 04</span>
              <span>{skinLesion.kicker}</span>
            </div>
            <div className="v11-skin-heading">
              <h3>
                Skin Lesion
                <br />
                <em>AI Platform</em>
              </h3>
              <p>{skinLesion.summary}</p>
            </div>
            <div
              className="v11-skin-metrics"
              aria-label="Stored evaluation results"
            >
              {skinLesion.metrics?.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="v11-skin-bottom">
              <p>
                Engineering practice.{" "}
                <strong>Not a clinical diagnosis product.</strong>
              </p>
              <Link
                className="v11-open-link"
                href={`/work/${skinLesion.slug}/`}
              >
                Explore case study <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ProjectImage
              src={skinLesion.image}
              alt={skinLesion.imageAlt}
              caption={skinLesion.imageCaption}
            />
          </div>
        </article>
      </section>

      <ChapterTransition number="02" label="Working method" />
      <section
        className="v11-method shell v11-pattern-host"
        id="profile"
        aria-labelledby="profile-title"
      >
        <SectionPattern kind="method" />
        <div className="v11-method-head">
          <p className="v11-micro">02 / Working method</p>
          <h2 id="profile-title">
            <span>Build it.</span>
            <span>
              <em>Prove it.</em>
            </span>
          </h2>
        </div>
        <p className="v11-method-intro">
          Good AI products need more than a convincing answer. I work from the
          input boundary to execution and evaluation: what entered the system,
          what it did and what the evidence actually supports.
        </p>
        <div className="v11-principles">
          {[
            [
              "01",
              "Inspectable",
              "Make selected inputs and execution paths visible.",
            ],
            [
              "02",
              "Bounded",
              "Give budgets, permissions and failure paths explicit limits.",
            ],
            [
              "03",
              "Honest",
              "Keep unfavorable results and testing gaps in the story.",
            ],
          ].map(([number, title, description]) => (
            <div key={number}>
              <span className="v11-micro">{number}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <div className="v11-education" id="education">
          <p className="v11-micro">Education / Class of 2027</p>
          <div>
            <h3>South China Agricultural University</h3>
            <p className="v11-education-native">华南农业大学</p>
            <p>Information Management &amp; Information Systems</p>
            <p className="v11-education-native">信息管理与信息系统</p>
            <span className="v11-micro">Undergraduate · 2023.09 — 2027.06</span>
          </div>
        </div>
        <div className="v11-experience" id="experience">
          <p className="v11-micro">03 / Industry practice</p>
          <div>
            <span className="v11-micro">2026.08 — 2026.09</span>
            <h3>AI Engineer Intern</h3>
            <p>Guangzhou Teddy Intelligence Technology Co., Ltd.</p>
            <p>
              Worked on a local skin lesion AI application across data audit,
              model training and evaluation, inference service and product
              workflow. The external result and its limitations remain visible
              in the case study.
            </p>
            <Link className="v11-open-link" href="/work/skin-lesion-ai/">
              Read the engineering case <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <ChapterTransition number="04" label="Index of practice" />
      <section
        className="v11-index v11-pattern-host"
        id="capabilities"
        aria-labelledby="capabilities-title"
      >
        <SectionPattern kind="index" />
        <div className="shell v11-index-inner">
          <div className="v11-index-intro">
            <p className="v11-micro">04 / Index of practice</p>
            <h2 id="capabilities-title">
              Skills,
              <br />
              <em>attached to work.</em>
            </h2>
          </div>
          <div className="v11-index-list">
            {capabilities.map((item, index) => (
              <Link href={item.href} key={item.name}>
                <span className="v11-micro">0{index + 1}</span>
                <strong>{item.name}</strong>
                <span>{item.proof}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          <p className="v11-index-source">
            Source is part of the work:{" "}
            <a
              href="https://github.com/kallist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile ↗
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/yzfly/awesome-context-engineering/pull/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              CueParcel merged PR #50 ↗
            </a>
          </p>
        </div>
      </section>

      <ChapterTransition number="05" label="Visual practice" />
      <section
        className="v11-visual shell v11-pattern-host"
        id="visual"
        aria-labelledby="visual-title"
      >
        <SectionPattern kind="visual" />
        <div className="v11-visual-heading">
          <p className="v11-micro">05 / Visual practice</p>
          <h2 id="visual-title">
            One drawing.
            <br />
            <em>Several ways to look.</em>
          </h2>
          <p>
            Hand-drawn manga line work meets digital fragmentation. The same
            original portrait is shown as one full work and two detail studies.
          </p>
        </div>
        <figure className="v11-visual-full">
          <img
            src="/portrait/self-portrait.webp"
            alt="Full black and white manga self portrait for kallist"
            loading="lazy"
            width="1448"
            height="1086"
          />
          <figcaption>
            <span>Full work / 01 of 01</span>
            <span>Ink drawing · personal work</span>
          </figcaption>
        </figure>
        <div className="v11-visual-details">
          <figure className="v11-detail v11-detail-eye">
            <div className="v11-detail-image">
              <img
                src="/portrait/self-portrait.webp"
                alt="Eye and crosshatching detail from the same self portrait"
                loading="lazy"
                width="1448"
                height="1086"
              />
            </div>
            <figcaption>
              Detail 01 / Eyes and linework — same artwork
            </figcaption>
          </figure>
          <figure className="v11-detail v11-detail-fragments">
            <div className="v11-detail-image">
              <img
                src="/portrait/self-portrait.webp"
                alt="Fragmented rectangles and directional strokes detail from the same self portrait"
                loading="lazy"
                width="1448"
                height="1086"
              />
            </div>
            <figcaption>Detail 02 / Fragmentation — same artwork</figcaption>
          </figure>
        </div>
      </section>

      <ChapterTransition number="06" label="Contact" />
      <section
        className="v11-contact v11-pattern-host"
        id="contact"
        aria-labelledby="contact-title"
      >
        <SectionPattern kind="contact" />
        <div className="shell">
          <div className="v11-contact-top v11-micro">
            <span>06 / Continue the conversation</span>
            <span>Context · Agents · Evidence · Art</span>
          </div>
          <h2 id="contact-title">
            kallist<span aria-hidden="true">.</span>
          </h2>
          <div className="v11-contact-links">
            <a href="mailto:2441397782@qq.com">
              2441397782@qq.com <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://github.com/kallist"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link href="/resume/">
              Resume <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="v11-contact-credit v11-micro">
            South China Agricultural University · Information Management &amp;
            Information Systems · 2027
          </p>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "A public, phone-free resume for Wei Zhuojie, focused on AI engineering and context systems.",
  alternates: { canonical: "/resume/" },
};

export default function Resume() {
  return (
    <main id="main" className="resume-main shell">
      <div className="resume-top">
        <div>
          <p className="section-index">PUBLIC RESUME / 2026</p>
          <h1>
            Wei Zhuojie <span>韦焯杰</span>
          </h1>
          <p>AI Engineering · Context Engineering · Agent Systems</p>
        </div>
        <div className="resume-actions">
          <a
            className="download-button"
            href="/resume/wei-zhuojie-resume-public.pdf"
            download
          >
            Download PDF
          </a>
          <PrintButton />
        </div>
      </div>
      <div className="resume-contact">
        <a href="mailto:2441397782@qq.com">2441397782@qq.com</a>
        <a
          href="https://github.com/kallist"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/kallist
        </a>
      </div>
      <section className="resume-section">
        <h2>Profile</h2>
        <p>
          2027 undergraduate in Information Management and Information Systems
          at South China Agricultural University. I build inspectable context
          and agent systems, with an AI engineering internship spanning applied
          ML, API delivery and evaluation. My work connects product decisions to
          source code, tests and explicit limitations.
        </p>
      </section>
      <section className="resume-section">
        <h2>Selected projects</h2>
        <div className="resume-projects">
          {projects.map((project) => (
            <div className="resume-project" key={project.slug}>
              <div>
                <h3>
                  <Link href={`/work/${project.slug}/`}>{project.title}</Link>
                </h3>
                <span>{project.kicker}</span>
              </div>
              <p>{project.summary}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="resume-section">
        <h2>Experience</h2>
        <div className="resume-project">
          <div>
            <h3>AI Engineer Intern</h3>
            <span>
              Guangzhou Teddy Intelligence Technology Co., Ltd. · 2026.08–09
            </span>
          </div>
          <p>
            Built and evaluated a local skin lesion AI application across data,
            model, inference service and UI. Internal test accuracy was 92.96%
            (n=270); an independent external evaluation recorded 78.54% accuracy
            (n=797) and 65.49% malignant recall. This is engineering practice,
            not a clinical diagnosis product.
          </p>
        </div>
      </section>
      <section className="resume-section">
        <h2>Capabilities</h2>
        <p>
          Context engineering · Agent runtime · RAG and Memory · TypeScript ·
          Python · FastAPI · React / Next.js · SQLite / PostgreSQL · PyTorch ·
          Playwright · Drawing and visual communication
        </p>
      </section>
      <section className="resume-section">
        <h2>Education</h2>
        <p>
          South China Agricultural University · BSc, Information Management and
          Information Systems · Class of 2027 (2023.09–2027.06)
        </p>
      </section>
      <div className="resume-back">
        <Link href="/">← Back to portfolio</Link>
        <span>
          Use your browser&apos;s print command to save a phone-free PDF.
        </span>
      </div>
    </main>
  );
}

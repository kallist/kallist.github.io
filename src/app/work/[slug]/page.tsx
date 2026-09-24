import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectImage } from "@/components/project-image";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: `${project.title} — Wei Zhuojie`,
      description: project.summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next =
    projects[
      (projects.findIndex((item) => item.slug === slug) + 1) % projects.length
    ];
  return (
    <main id="main" className="case-main">
      <div className="shell case-breadcrumb">
        <Link href="/#work">← All work</Link>
        <span>{project.number} / 04</span>
      </div>
      <header className="shell case-hero">
        <p className="section-index">
          CASE STUDY / {project.kicker.toUpperCase()}
        </p>
        <h1>
          {project.title}
          <span className="title-period">.</span>
        </h1>
        <p>{project.summary}</p>
        <div className="case-hero-links">
          <a
            className="button button-dark"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open repository ↗
          </a>
          <span>Source-backed engineering case</span>
        </div>
      </header>
      <div className="shell">
        <ProjectImage
          src={project.image}
          alt={project.imageAlt}
          caption={project.imageCaption}
          className="case-lead-image"
          priority
        />
      </div>
      <div className="shell case-body">
        <aside>
          <span className="section-index">THE SYSTEM</span>
          <dl>
            <dt>Role</dt>
            <dd>Project owner / engineering practice</dd>
            <dt>Focus</dt>
            <dd>{project.kicker}</dd>
            <dt>Stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </dl>
        </aside>
        <div className="case-article">
          <section>
            <p className="section-index">01 / PROBLEM</p>
            <h2>Why it exists.</h2>
            <p>{project.problem}</p>
          </section>
          <section>
            <p className="section-index">02 / APPROACH</p>
            <h2>How it works.</h2>
            <ol className="approach-list">
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section>
            <p className="section-index">03 / RESULT & BOUNDARY</p>
            <h2>What the evidence says.</h2>
            <p>{project.outcome}</p>
            {project.metrics && (
              <div className="case-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="limitation">
              <strong>Boundary.</strong> {project.limit}
            </p>
          </section>
          {project.secondImage && (
            <ProjectImage
              src={project.secondImage}
              alt={project.secondImageAlt ?? "Additional project screenshot"}
              caption={`Additional authentic ${project.title} repository screenshot.`}
            />
          )}
          <section>
            <p className="section-index">04 / OPEN THE EVIDENCE</p>
            <h2>Follow the source.</h2>
            <ul className="evidence-list">
              {project.evidence.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="shell next-project">
        <span>NEXT CASE STUDY</span>
        <Link href={`/work/${next.slug}/`}>
          {next.title} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}

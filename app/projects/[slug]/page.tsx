import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter(({ slug: itemSlug }) => itemSlug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="project-hero">
          <div className="container">
            <Link className="back-link" href="/projects"><ArrowLeft /> All projects</Link>
            <div className="project-hero__heading">
              <div>
                <p className="eyebrow">{project.industry}</p>
                <h1>{project.title}</h1>
              </div>
              <p>{project.summary}</p>
            </div>
            <ProjectVisual title={project.shortTitle} tone={project.tone} />
          </div>
        </section>
        <section className="project-facts">
          <div className="container project-facts__grid">
            {[["Location", project.location], ["Industry", project.industry], ["Project type", project.projectType], ["Quantum’s role", project.role]].map(([label, value]) => (
              <div key={label}><small>{label}</small><strong>{value}</strong></div>
            ))}
          </div>
        </section>
        <section className="section project-scope">
          <div className="container project-scope__grid">
            <div><p className="eyebrow">Project scope</p><h2>Coordinated delivery from intent to operation.</h2></div>
            <div>
              <p className="project-scope__copy">{project.scope}</p>
              <div className="service-tags">{project.services.map((service) => <span key={service}>{service}</span>)}</div>
            </div>
          </div>
        </section>
        <section className="section gallery">
          <div className="container">
            <div className="section-heading section-heading--row">
              <div><p className="eyebrow">Gallery</p><h2>Inside the project</h2></div>
              <p>Approved project photography will replace these reserved frames.</p>
            </div>
            <div className="gallery__grid">
              {[1, 2, 3].map((number) => (
                <ProjectVisual title={`${project.shortTitle} — view ${number}`} tone={project.tone} label="Gallery image placeholder" key={number} />
              ))}
            </div>
          </div>
        </section>
        <section className="section related">
          <div className="container">
            <div className="section-heading section-heading--row">
              <div><p className="eyebrow">More work</p><h2>Related projects</h2></div>
              <Link className="text-link" href="/projects">View all projects <ArrowUpRight /></Link>
            </div>
            <div className="project-grid project-grid--three">
              {related.map((item) => <ProjectCard project={item} key={item.slug} />)}
            </div>
          </div>
        </section>
      </article>
      <CTA />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { CTA } from "@/components/CTA";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "wilson-airport-office-hangar") redirect("/projects/tsavo-delight");
  const project = await getProjectBySlug(slug);
  return project
    ? { title: project.seoTitle || project.title, description: project.seoDescription || project.summary }
    : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "wilson-airport-office-hangar") redirect("/projects/tsavo-delight");
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const related = projects.filter(({ slug: itemSlug }) => itemSlug !== slug).slice(0, 2);
  const facts = [
    ["Location", project.location],
    ["Project type", project.projectType],
    ["Quantum's role", project.role],
  ];

  return (
    <>
      <article className="project-detail">
        <section className="project-detail-hero">
          <div className="container">
            <div className="project-detail-hero__nav">
              <Link className="back-link" href="/projects"><ArrowLeft /> All projects</Link>
              <span>Selected project · {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </div>

            <div className="project-detail-hero__card">
              <div className="project-detail-hero__copy">
                <p className="eyebrow eyebrow--yellow">{project.industry}</p>
                <h1>{project.title}</h1>
                <p>{project.summary}</p>
                <span className="project-detail-hero__location"><MapPin /> {project.location}</span>
              </div>
              <div className="project-detail-hero__visual">
                {project.coverImage ? (
                  <Image src={project.coverImage.src} alt={project.coverImage.alt} fill priority sizes="(max-width: 760px) 100vw, 58vw" style={{ objectPosition: project.coverImage.position }} />
                ) : (
                  <ProjectVisual title={project.shortTitle} tone={project.tone} showLabel={false} />
                )}
                <div className="project-detail-hero__image-label"><span>Quantum MEP</span><strong>Integrated building services</strong></div>
              </div>
            </div>

            <div className="project-detail-facts">
              {facts.map(([label, value], index) => (
                <div key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="project-detail-scope">
          <div className="container project-detail-scope__grid">
            <div><p className="eyebrow">Project scope</p><h2>One coordinated response to a complex brief.</h2></div>
            <div className="project-detail-scope__body">
              <p>{project.scope}</p>
              <div className="project-detail-services">
                {project.services.map((service, index) => <div key={service}><span>0{index + 1}</span><strong>{service}</strong><Check /></div>)}
              </div>
            </div>
          </div>
        </section>

        {project.gallery?.length ? (
          <section className="project-detail-gallery">
            <div className="container">
              <div className="project-detail-gallery__heading">
                <div><p className="eyebrow eyebrow--yellow">Project imagery</p><h2>A closer view.</h2></div>
                <p>Selected visual material from the project record.</p>
              </div>
              <div className="project-detail-gallery__grid">
                {project.gallery.map((image) => (
                  <div className="project-detail-gallery__image" key={image.alt}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 68vw" style={{ objectPosition: image.position }} />
                  </div>
                ))}
                <div className="project-detail-gallery__note"><span>Project record</span><strong>Additional approved photography can be published here as the archive grows.</strong></div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="project-detail-related">
          <div className="container">
            <div className="project-detail-related__heading">
              <div><p className="eyebrow">Continue exploring</p><h2>More selected work.</h2></div>
              <Link className="text-link" href="/projects">View all projects <ArrowUpRight /></Link>
            </div>
            <div className="project-grid project-detail-related__grid">
              {related.map((item) => <ProjectCard project={item} key={item.slug} />)}
            </div>
          </div>
        </section>
      </article>
      <CTA />
    </>
  );
}

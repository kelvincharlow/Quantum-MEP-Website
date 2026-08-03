import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import kapaImage from "@/app/images/kapa.jpg";
import agcImage from "@/app/images/AGC.jpeg";
import wilsonImage from "@/app/images/willson.jpeg";

const projectImages: Partial<Record<Project["slug"], { src: StaticImageData; position: string }>> = {
  "agc-tenwek-hospital-karen-clinic": { src: agcImage, position: "center" },
  "kapa-oil-refineries": { src: kapaImage, position: "center" },
  "tsavo-delight": { src: wilsonImage, position: "center 44%" },
};

export function ProjectCard({ project, portfolio = false, index }: { project: Project; portfolio?: boolean; index?: number }) {
  const image = projectImages[project.slug];
  return (
    <article className={portfolio ? "project-card project-card--portfolio" : "project-card"}>
      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        {image ? (
          <div className="project-card__image">
            <Image src={image.src} alt={`${project.title} project`} fill sizes={portfolio ? "(max-width: 760px) 100vw, 55vw" : "(max-width: 760px) 100vw, 50vw"} style={{ objectPosition: image.position }} />
            {portfolio && <span className="project-card__image-index">{String(index).padStart(2, "0")}</span>}
          </div>
        ) : (
          <ProjectVisual title={project.shortTitle} tone={project.tone} label="Project visual" showLabel={!portfolio} />
        )}
      </Link>
      <div className="project-card__body">
        <p className="eyebrow">{project.industry}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p className="project-card__location"><MapPin size={16} /> {project.location}</p>
        <p>{project.summary}</p>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          View project <ArrowUpRight />
        </Link>
      </div>
    </article>
  );
}

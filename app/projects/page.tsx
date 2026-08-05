import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { ProjectFilter } from "@/components/ProjectFilter";
import { getProjectIndustries, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Quantum MEP Consultants projects across healthcare, industrial, energy, hospitality and residential sectors.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const industries = getProjectIndustries(projects);

  return (
    <>
      <section className="projects-hero">
        <div className="container projects-hero__grid">
          <div className="projects-hero__copy">
            <p className="eyebrow eyebrow--yellow">Selected work</p>
            <h1>Engineering,<br />made visible.</h1>
            <p>Explore integrated MEP solutions shaped around demanding environments, operational realities and measurable performance.</p>
          </div>
          <div className="projects-hero__facts">
            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>Selected projects</span></div>
            <div><strong>{String(industries.length - 1).padStart(2, "0")}</strong><span>Industry sectors</span></div>
            <div><strong>360°</strong><span>MEP capability</span></div>
          </div>
        </div>
      </section>
      <section className="projects-page">
        <div className="container">
          <div className="projects-page__heading">
            <div><p className="eyebrow">Project portfolio</p><h2>Built for the way each place needs to perform.</h2></div>
            <p>Healthcare, industrial, energy, hospitality and residential experience across Kenya.</p>
          </div>
          <ProjectFilter projects={projects} industries={industries} />
        </div>
      </section>
      <CTA />
    </>
  );
}

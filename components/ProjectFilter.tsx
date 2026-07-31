"use client";

import { useState } from "react";
import { industries, projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((project) => project.industry === active);

  return (
    <>
      <div className="project-filter">
        <div className="project-filter__meta"><span>Filter by sector</span><strong>{String(visible.length).padStart(2, "0")} projects</strong></div>
        <div className="filter-row" aria-label="Filter projects by industry">
          {industries.map((industry) => (
            <button
              className={active === industry ? "active" : ""}
              type="button"
              aria-pressed={active === industry}
              onClick={() => setActive(industry)}
              key={industry}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid project-grid--portfolio">
        {visible.map((project, index) => <ProjectCard project={project} portfolio index={index + 1} key={project.slug} />)}
      </div>
    </>
  );
}

import type { StaticImageData } from "next/image";
import agcImage from "@/app/images/AGC.jpeg";
import karenClinicImage from "@/app/images/karen clinic.jpeg";
import kapaImage from "@/app/images/kapa.jpg";
import wilsonImage from "@/app/images/willson.jpeg";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectsQuery } from "@/sanity/lib/queries";

export type ProjectImage = {
  src: string | StaticImageData;
  alt: string;
  position?: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  industry: string;
  projectType: string;
  location: string;
  role: string;
  summary: string;
  scope: string;
  services: string[];
  tone: string;
  coverImage?: ProjectImage;
  gallery?: ProjectImage[];
  featured?: boolean;
  featuredOrder?: number;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
};

export const projects: Project[] = [
  {
    slug: "agc-tenwek-hospital-karen-clinic",
    title: "AGC Tenwek Hospital, Karen Clinic",
    shortTitle: "Tenwek Hospital",
    industry: "Healthcare",
    projectType: "Hospital or Clinic",
    location: "Karen, Nairobi",
    role: "MEP design, coordination and supervision",
    summary:
      "Coordinated building-services delivery for a modern healthcare environment.",
    scope:
      "Quantum prepared mechanical and electrical drawings and specifications, coordinated subcontractor activities and technical submissions, monitored quality and safety records, and supported testing and commissioning.",
    services: ["Mechanical", "Electrical", "Coordination", "Commissioning"],
    tone: "blue",
    coverImage: {
      src: agcImage,
      alt: "Entrance to AGC Tenwek Hospital Karen Clinic",
      position: "center",
    },
    gallery: [
      {
        src: karenClinicImage,
        alt: "Architectural visualization associated with the Karen Clinic project",
        position: "center",
      },
    ],
    featured: true,
    featuredOrder: 1,
    displayOrder: 1,
  },
  {
    slug: "kapa-oil-refineries",
    title: "Kapa Oil Refineries",
    shortTitle: "Kapa Oil Refineries",
    industry: "Industrial",
    projectType: "Industrial Facility",
    location: "Nairobi, Kenya",
    role: "MEP engineering design",
    summary:
      "Industrial systems designed around operational safety, efficiency and resilience.",
    scope:
      "Quantum developed oil-handling and firefighting concepts, pump and piping calculations, electrical plans and mechanical drawings, including transformer and switchgear sizing for the facility.",
    services: ["Industrial electrical", "Fire protection", "Mechanical", "Piping"],
    tone: "steel",
    coverImage: {
      src: kapaImage,
      alt: "Kapa Oil Refineries industrial construction site",
      position: "center",
    },
    featured: true,
    featuredOrder: 2,
    displayOrder: 2,
  },
  {
    slug: "rubis-petrol-station-kericho",
    title: "Rubis Petrol Station, Kericho",
    shortTitle: "Rubis Petrol Station",
    industry: "Energy and Utilities",
    projectType: "Petrol Station",
    location: "Kericho, Kenya",
    role: "MEP design",
    summary:
      "Safe, coordinated fuel, fire, electrical and plumbing systems for a retail-energy site.",
    scope:
      "Quantum’s scope included fuel-system installation design, fire protection, HVAC, power supply and distribution, backup power, lighting, ELV and low-current systems, plumbing and drainage.",
    services: ["Fuel systems", "Fire protection", "Electrical", "Plumbing"],
    tone: "amber",
    displayOrder: 3,
  },
  {
    slug: "pullman-hotel-fit-out",
    title: "Pullman Hotel Fit-Out",
    shortTitle: "Pullman Hotel",
    industry: "Hospitality",
    projectType: "Fit-Out",
    location: "Nairobi, Kenya",
    role: "Integrated MEP design",
    summary:
      "High-performance building services supporting a premium hospitality environment.",
    scope:
      "Quantum developed coordinated firefighting, electrical distribution, low-current, plumbing, HVAC and wastewater-treatment design, using modern digital design tools to improve safety and operational efficiency.",
    services: ["HVAC", "Fire protection", "Electrical", "Wastewater"],
    tone: "night",
    displayOrder: 4,
  },
  {
    slug: "tsavo-delight",
    title: "Tsavo Delight",
    shortTitle: "Tsavo Delight",
    industry: "Residential",
    projectType: "Apartment Development",
    location: "Kileleshwa, Nairobi, Kenya",
    role: "Electrical systems design",
    summary:
      "Smart electrical systems for a large-scale, high-rise residential development.",
    scope:
      "For this 25-storey development of more than 700 homes, Quantum worked on electrical-system design and introduced KNX building-management technology with safety, security and energy performance in mind.",
    services: ["Electrical", "KNX", "Building management", "Solar integration"],
    tone: "green",
    coverImage: {
      src: wilsonImage,
      alt: "Architectural rendering used for the Tsavo Delight residential project",
      position: "center 44%",
    },
    featured: true,
    featuredOrder: 3,
    displayOrder: 5,
  },
];

export const industries = [
  "All",
  "Healthcare",
  "Industrial",
  "Energy and Utilities",
  "Hospitality",
  "Residential",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

type SanityProject = Omit<Project, "coverImage" | "gallery"> & {
  _id: string;
  coverImage?: { src?: string; alt?: string; position?: string };
  gallery?: Array<{ src?: string; alt?: string; position?: string }>;
};

function normalizeSanityProject(project: SanityProject): Project | null {
  if (!project.slug || !project.title || !project.industry) return null;

  return {
    ...project,
    services: project.services || [],
    tone: project.tone || "blue",
    coverImage:
      project.coverImage?.src && project.coverImage.alt
        ? {
            src: project.coverImage.src,
            alt: project.coverImage.alt,
            position: project.coverImage.position || "center",
          }
        : undefined,
    gallery: project.gallery
      ?.filter((image) => image.src && image.alt)
      .map((image) => ({
        src: image.src as string,
        alt: image.alt as string,
        position: image.position || "center",
      })),
  };
}

function reportSanityFallback(error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("Sanity project query failed; using local fallback content.", error);
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return projects;

  try {
    const result = await client.fetch<SanityProject[]>(projectsQuery, {}, {
      next: { revalidate: 3600, tags: ["project", "sector"] },
    });
    const normalized = result.map(normalizeSanityProject).filter((project): project is Project => Boolean(project));
    return normalized.length ? normalized : projects;
  } catch (error) {
    reportSanityFallback(error);
    return projects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSanityConfigured) return getProject(slug);

  try {
    const result = await client.fetch<SanityProject | null>(projectBySlugQuery, { slug }, {
      next: { revalidate: 3600, tags: ["project", `project:${slug}`, "sector"] },
    });
    return result ? normalizeSanityProject(result) || undefined : undefined;
  } catch (error) {
    reportSanityFallback(error);
    return getProject(slug);
  }
}

export function getProjectIndustries(projectList: Project[]) {
  return ["All", ...Array.from(new Set(projectList.map((project) => project.industry)))];
}

export function getFeaturedProjects(projectList: Project[], limit = 3) {
  const featured = projectList
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));

  return (featured.length ? featured : projectList).slice(0, limit);
}

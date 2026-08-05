import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  DraftingCompass,
  Factory,
  HeartPulse,
  Hotel,
  MapPin,
  Plane,
  Wrench,
  Zap,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import { HeroGallery } from "@/components/HeroGallery";
import { ProjectVisual } from "@/components/ProjectVisual";
import { SwipeRail } from "@/components/SwipeRail";
import { getFeaturedProjects, getProjects } from "@/lib/projects";

const services = [
  {
    number: "01",
    icon: DraftingCompass,
    title: "MEP Consultancy",
    text: "Design clarity, technical coordination and expert oversight from concept to commissioning.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "MEP Design & Build",
    text: "Engineering and installation aligned under one accountable delivery team.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Lifecycle Support",
    text: "Energy, certification and facilities support that protects performance after handover.",
  },
];

const industries = [
  [HeartPulse, "Healthcare", "Critical environments"],
  [Factory, "Industrial", "Process and production"],
  [Plane, "Aviation", "Operational precision"],
  [Zap, "Energy", "Safety and resilience"],
  [Hotel, "Hospitality", "Comfort at scale"],
  [Building2, "Residential", "Everyday performance"],
];

export default async function Home() {
  const projects = await getProjects();
  const featuredProjects = getFeaturedProjects(projects);
  const leadProject = featuredProjects[0];
  const featuredSideProjects = featuredProjects.slice(1, 3);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero__stage">
          <p className="eyebrow hero__mobile-kicker"><span /> Integrated MEP engineering</p>
          <div className="hero__visual">
            <HeroGallery />
            <span className="hero__vertical-note" aria-hidden="true">Nairobi · Kenya · East Africa</span>
          </div>
          <div className="container hero__overlay">
            <div className="hero__copy">
              <p className="eyebrow"><span /> Integrated MEP engineering</p>
              <h1>
                <span className="hero__title-desktop">
                  The engineering behind buildings that <span className="hero__highlight">perform.</span>
                </span>
                <span className="hero__title-mobile">
                  Buildings engineered to <span className="hero__highlight">perform.</span>
                </span>
              </h1>
              <p className="hero__lead">
                Quantum brings mechanical, electrical and plumbing expertise
                together—from first concept to long-term operation.
              </p>
              <div className="button-row">
                <Link className="button button--primary hero__primary-cta" href="/contact">
                  Discuss your project <ArrowUpRight />
                </Link>
                <Link className="button button--outline hero__secondary-cta" href="/projects">
                  Explore our work <ArrowRight />
                </Link>
              </div>
              <div className="hero__credentials" aria-label="Quantum at a glance">
                <div>
                  <small>Established</small>
                  <strong>Since 2017</strong>
                </div>
                <div>
                  <small>Expertise</small>
                  <strong>Design · Build · Support</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="container hero__scroll-cue" aria-hidden="true">
            <span />
            <small>Explore Quantum</small>
          </div>
        </div>
      </section>

      <section className="section services-preview">
        <div className="container">
          <div className="section-heading services-preview__heading">
            <div>
              <p className="eyebrow">The Quantum model</p>
              <h2>One team. Total building performance.</h2>
            </div>
            <p>
              Consultancy, design-and-build and lifecycle support—coordinated
              from the first decision through long-term operation.
            </p>
          </div>
          <div className="service-disciplines" aria-label="Core engineering disciplines">
            {["Mechanical", "Electrical", "Plumbing", "Fire & safety", "Low current", "Energy"].map((discipline, index) => (
              <span key={discipline}><small>0{index + 1}</small>{discipline}</span>
            ))}
          </div>
          <div className="swipe-hint" aria-hidden="true"><span>Swipe services</span><i /><ArrowRight /></div>
          <SwipeRail className="service-grid" label="Services — swipe horizontally on mobile">
            {services.map(({ icon: Icon, ...service }, index) => (
              <article className={`service-card service-card--${index + 1}`} key={service.number}>
                <div className="service-card__top"><span>{service.number}</span><Icon /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link className="text-link" href="/services">Explore services <ArrowUpRight /></Link>
              </article>
            ))}
          </SwipeRail>
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <div className="section-heading section-heading--row featured__heading">
            <div>
              <p className="eyebrow eyebrow--yellow">Selected work</p>
              <h2>Proof, built into every project.</h2>
            </div>
            <Link className="text-link text-link--light" href="/projects">
              Explore all projects <ArrowUpRight />
            </Link>
          </div>
          <div className="swipe-hint swipe-hint--light" aria-hidden="true"><span>Swipe projects</span><i /><ArrowRight /></div>
          <SwipeRail className="featured__showcase" label="Selected projects — swipe horizontally on mobile">
            <article className="featured__case featured__case--primary">
              <Link className="featured__case-link" href={`/projects/${leadProject.slug}`}>
                {leadProject.coverImage ? (
                  <Image
                    className="featured__case-image"
                    src={leadProject.coverImage.src}
                    alt={leadProject.coverImage.alt}
                    fill
                    sizes="(max-width: 760px) 86vw, 58vw"
                    style={{ objectPosition: leadProject.coverImage.position }}
                  />
                ) : (
                  <ProjectVisual title={leadProject.shortTitle} tone={leadProject.tone} showLabel={false} />
                )}
                <div className="featured__case-copy">
                  <div>
                    <p className="eyebrow eyebrow--yellow">{leadProject.industry}</p>
                    <h3>{leadProject.title}</h3>
                    <p className="featured__case-summary">{leadProject.summary}</p>
                    <span className="featured__case-location"><MapPin /> {leadProject.location}</span>
                  </div>
                  <span className="featured__case-arrow" aria-hidden="true"><ArrowUpRight /></span>
                </div>
              </Link>
            </article>
            <div className="featured__side">
              {featuredSideProjects.map((project) => (
                <article className="featured__case featured__case--compact" key={project.slug}>
                  <Link className="featured__case-link" href={`/projects/${project.slug}`}>
                    {project.coverImage ? (
                      <Image
                        className="featured__case-image"
                        src={project.coverImage.src}
                        alt={project.coverImage.alt}
                        fill
                        sizes="(max-width: 760px) 86vw, 30vw"
                        style={{ objectPosition: project.coverImage.position }}
                      />
                    ) : (
                      <ProjectVisual title={project.shortTitle} tone={project.tone} showLabel={false} />
                    )}
                    <div className="featured__case-copy">
                      <div>
                        <p className="eyebrow eyebrow--yellow">{project.industry}</p>
                        <h3>{project.title}</h3>
                        <span className="featured__case-location"><MapPin /> {project.location}</span>
                      </div>
                      <span className="featured__case-arrow" aria-hidden="true"><ArrowUpRight /></span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </SwipeRail>
        </div>
      </section>

      <section className="section industries">
        <div className="container">
          <div className="section-heading industries__heading">
            <div><p className="eyebrow">Sector experience</p><h2>Engineered for demanding environments.</h2></div>
            <p>Specialist building systems shaped around the operational realities of each sector.</p>
          </div>
          <div className="industry-grid" aria-label="Industry sectors">
            {industries.map(([Icon, label, detail], index) => (
              <Link className="industry-item" href="/projects" key={label as string}>
                <span className="industry-item__top"><small>0{index + 1}</small><Icon /></span>
                <span className="industry-item__copy"><strong>{label as string}</strong><small>{detail as string}</small></span>
                <span className="industry-item__arrow" aria-hidden="true"><ArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section why">
        <div className="container why__grid">
          <div>
            <p className="eyebrow">Why Quantum</p>
            <h2>Closer thinking creates <span className="why__highlight">better-performing</span> buildings.</h2>
            <p className="why__lead">
              We connect design intelligence, practical delivery and long-term
              operational thinking so every system works as one.
            </p>
            <Link className="button why__button" href="/about">About Quantum <ArrowUpRight /></Link>
          </div>
          <div className="why__points">
            {[
              ["Integrated expertise", "Mechanical, electrical, plumbing, fire and low-current expertise coordinated by one team."],
              ["Lifecycle perspective", "Decisions informed by construction, commissioning, energy use and ongoing maintenance."],
              ["Responsive delivery", "A hands-on technical team engaged from project inception through final completion."],
              ["Standards-led", "Engineering grounded in professional standards, quality control and responsible resource use."],
            ].map(([title, text]) => (
              <div className="why__point" key={title}>
                <CheckCircle2 />
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}

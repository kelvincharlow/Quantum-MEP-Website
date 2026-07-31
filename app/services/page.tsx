import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  Cable,
  Check,
  ClipboardCheck,
  DraftingCompass,
  Droplets,
  Flame,
  Gauge,
  Leaf,
  Snowflake,
  Wrench,
  Zap,
} from "lucide-react";
import { CTA } from "@/components/CTA";
import servicesImage from "@/app/images/WhatsApp Image 2026-07-30 at 17.10.04.jpeg";

export const metadata: Metadata = {
  title: "Services",
  description: "Integrated MEP consultancy, design-and-build delivery, and lifecycle support from Quantum MEP Consultants.",
};

const divisions = [
  {
    number: "01",
    title: "MEP Consultancy",
    label: "Define the right solution",
    icon: DraftingCompass,
    intro: "Technical clarity before construction begins, with dependable oversight while it takes shape.",
    items: ["Concept and detailed design", "Specifications and tender documentation", "Construction supervision", "Testing and commissioning support", "Green-building consultancy"],
    tone: "light",
  },
  {
    number: "02",
    title: "MEP Design & Build",
    label: "Turn design into performance",
    icon: Wrench,
    intro: "Coordinated systems delivered by a team that understands engineering intent and site realities.",
    items: ["HVAC and mechanical systems", "Electrical power and lighting", "Plumbing and drainage", "Fire protection and safety", "Low-current and BMS systems"],
    tone: "yellow",
  },
  {
    number: "03",
    title: "Lifecycle Support",
    label: "Protect long-term value",
    icon: Gauge,
    intro: "Practical support that protects efficiency, reliability and asset value after handover.",
    items: ["Energy audits", "Facilities management support", "Performance reporting", "Compliance and certification", "Maintenance planning"],
    tone: "dark",
  },
];

const capabilities = [
  [Snowflake, "HVAC"],
  [Zap, "Electrical"],
  [Droplets, "Plumbing"],
  [Flame, "Fire & safety"],
  [Cable, "Low current"],
  [Activity, "Energy"],
  [Leaf, "Green building"],
  [ClipboardCheck, "Commissioning"],
];

const delivery = [
  ["01", "Understand", "Project priorities, constraints and performance targets."],
  ["02", "Coordinate", "Every discipline resolved as one integrated system."],
  ["03", "Deliver", "Clear documentation, practical execution and site oversight."],
  ["04", "Support", "Testing, handover and long-term performance guidance."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="container services-hero__grid">
          <div className="services-hero__copy">
            <p className="eyebrow eyebrow--yellow">Our services</p>
            <h1>Every system.<br />One clear direction.</h1>
            <p>Integrated MEP expertise from the first technical decision to reliable long-term operation.</p>
            <div className="services-hero__note">
              <span>01—03</span>
              <strong>Consult. Deliver. Support.</strong>
            </div>
          </div>
          <div className="services-hero__visual">
            <Image
              src={servicesImage}
              alt="Residential development supported by integrated MEP engineering"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <div className="services-hero__visual-label"><span>Full lifecycle</span><strong>MEP engineering</strong></div>
          </div>
        </div>
      </section>

      <section className="services-capabilities" aria-label="Engineering capabilities">
        <div className="container services-capabilities__grid">
          {capabilities.map(([Icon, label], index) => (
            <div key={label as string}>
              <span>0{index + 1}</span>
              <Icon />
              <strong>{label as string}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="services-offer">
        <div className="container">
          <div className="services-offer__heading">
            <div><p className="eyebrow">How we can partner</p><h2>Three services. One accountable team.</h2></div>
            <p>Choose focused technical guidance or an integrated relationship across the complete building lifecycle.</p>
          </div>
          <div className="services-offer__grid">
            {divisions.map(({ number, title, label, icon: Icon, intro, items, tone }) => (
              <article className={`services-offer__card services-offer__card--${tone}`} key={number}>
                <div className="services-offer__card-top"><span>{number}</span><Icon /></div>
                <p className="services-offer__label">{label}</p>
                <h3>{title}</h3>
                <p className="services-offer__intro">{intro}</p>
                <ul>{items.map((item) => <li key={item}><Check />{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-delivery">
        <div className="container services-delivery__grid">
          <div className="services-delivery__heading"><p className="eyebrow eyebrow--yellow">Our delivery model</p><h2>Built around clarity.</h2></div>
          <div className="services-delivery__steps">
            {delivery.map(([number, title, text]) => (
              <div key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

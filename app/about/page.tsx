import type { Metadata } from "next";
import Image from "next/image";
import { Check, Eye, Target } from "lucide-react";
import { CTA } from "@/components/CTA";
import aboutImage from "@/app/images/WhatsApp Image 2026-07-30 at 17.10.13.jpeg";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Quantum MEP Consultants—an integrated engineering team delivering coordinated building services since 2017.",
};

const team = [
  ["Eng. Mohammed Sagwe", "Managing Director & Co-founder", "MS"],
  ["Eng. Faiza Wambui Mbugua", "Senior Mechanical Engineer & Quality Assurance", "FM"],
  ["Mr. Wambua Ngoo", "Electrical Technician", "WN"],
  ["Eng. Gilberto Oroo Omwenga", "Mechanical Engineer", "GO"],
];

const principles = [
  ["Tailored", "Engineering shaped around the project—not a generic specification."],
  ["Coordinated", "Disciplines resolved together before complexity reaches site."],
  ["Accountable", "Quality, safety and delivery standards carried through completion."],
  ["Responsive", "A hands-on technical team available throughout the project lifecycle."],
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <p className="eyebrow eyebrow--yellow">About Quantum</p>
            <h1>Engineering with a closer point of view.</h1>
            <p>
              We connect specialist disciplines, practical delivery and long-term
              thinking to make complex buildings work better.
            </p>
            <div className="about-hero__facts">
              <span><small>Established</small><strong>2017</strong></span>
              <span><small>Based in</small><strong>Nairobi, Kenya</strong></span>
            </div>
          </div>
          <div className="about-hero__visual">
            <Image
              src={aboutImage}
              alt="Contemporary interior with integrated lighting and ventilation"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <div className="about-hero__image-label"><span>Integrated thinking</span><strong>Design · Build · Support</strong></div>
          </div>
        </div>
      </section>

      <section className="about-overview">
        <div className="container about-overview__grid">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2>One integrated team behind every system.</h2>
          </div>
          <div className="about-overview__copy">
            <p className="about-overview__lead">
              Quantum MEP Consultants delivers tailored mechanical, electrical and
              plumbing engineering for residential, commercial and mission-critical
              environments.
            </p>
            <p>
              Our in-house technical team works from project inception through
              completion, combining design knowledge, practical site experience and
              responsive support around each client’s priorities.
            </p>
          </div>
        </div>
        <div className="container about-metrics">
          <div><small>Our model</small><strong>Consultancy</strong></div>
          <div><small>Our delivery</small><strong>Design & build</strong></div>
          <div><small>Our commitment</small><strong>Lifecycle support</strong></div>
        </div>
      </section>

      <section className="about-purpose">
        <div className="container">
          <div className="about-purpose__heading">
            <p className="eyebrow">Purpose and direction</p>
            <p>What guides our decisions today—and the company we are building for tomorrow.</p>
          </div>
          <div className="about-purpose__grid">
            <article className="about-purpose__card about-purpose__card--mission">
              <div><span>01</span><Target /></div>
              <p>Our mission</p>
              <h3>Improve the communities we serve through timely, efficient and innovative engineering that adds lasting value.</h3>
            </article>
            <article className="about-purpose__card about-purpose__card--vision">
              <div><span>02</span><Eye /></div>
              <p>Our vision</p>
              <h3>Become a sustainable, growing and trusted MEP and low-current engineering partner in Kenya and beyond.</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <div className="about-team__heading">
            <div><p className="eyebrow">Our team</p><h2>Experienced people. Shared standards.</h2></div>
            <p>Multidisciplinary expertise brought together by a common commitment to quality, clarity and dependable delivery.</p>
          </div>
          <div className="about-team__grid">
            {team.map(([name, role, initials], index) => (
              <article className={index === 0 ? "about-team__card about-team__card--lead" : "about-team__card"} key={name}>
                <div className="about-team__initials" aria-hidden="true">{initials}</div>
                <div><h3>{name}</h3><p>{role}</p></div>
                <small>0{index + 1}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="container about-principles__grid">
          <div><p className="eyebrow eyebrow--yellow">How we work</p><h2>Professional standards. Practical thinking.</h2></div>
          <div className="about-principles__list">
            {principles.map(([title, text]) => (
              <div key={title}><Check /><span><strong>{title}</strong><small>{text}</small></span></div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

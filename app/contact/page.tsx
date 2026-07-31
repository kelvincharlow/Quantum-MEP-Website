import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project conversation with Quantum MEP Consultants in Nairobi, Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <section className="contact-hero">
        <div className="container contact-hero__grid">
          <div>
            <p className="eyebrow eyebrow--yellow">Contact Quantum</p>
            <h1>Bring us in early.</h1>
          </div>
          <div className="contact-hero__intro">
            <p>Planning a new project or improving an existing facility? Tell us where you are and what needs to perform better.</p>
            <div><span className="contact-status" aria-hidden="true" /><strong>Project enquiries welcomed</strong><small>Typically answered within one business day</small></div>
          </div>
        </div>
      </section>

      <section className="contact-workspace">
        <div className="container contact-workspace__grid">
          <aside className="contact-routes">
            <p className="eyebrow">Start a conversation</p>
            <h2>Choose the quickest route.</h2>
            <p className="contact-routes__lead">For urgent technical discussions, call or WhatsApp. For drawings, briefs and tender documents, email works best.</p>
            <div className="contact-options">
              <a href="tel:+254701326274"><span><Phone /></span><div><small>Call Quantum</small><strong>+254 701 326 274</strong></div><ArrowUpRight /></a>
              <a href="mailto:mohammed@quantumep.co.ke"><span><Mail /></span><div><small>Email the team</small><strong>mohammed@quantumep.co.ke</strong></div><ArrowUpRight /></a>
              <a href="https://wa.me/254701326274"><span><MessageCircle /></span><div><small>Continue on WhatsApp</small><strong>Start a quick chat</strong></div><ArrowUpRight /></a>
            </div>
            <div className="contact-office">
              <div><MapPin /><span><small>Nairobi office</small><strong>The Oval, Westlands</strong></span></div>
              <div><Clock3 /><span><small>Working hours</small><strong>Mon—Fri · 8:00—17:00</strong></span></div>
            </div>
          </aside>

          <div className="contact-form-wrap">
            <div className="form-heading">
              <div><span>Project enquiry</span><strong>Tell us what you are building.</strong></div>
              <small>* Required fields</small>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

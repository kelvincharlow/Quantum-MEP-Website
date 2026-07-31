import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

export function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-section__card">
          <div className="cta-section__copy">
            <p className="eyebrow eyebrow--yellow">Start a conversation</p>
            <h2>Let’s engineer what comes next.</h2>
            <p>Planning a new project or improving an existing facility? Bring us in early.</p>
          </div>
          <div className="cta-section__actions">
            <Link className="button button--primary" href="/contact">
              Request a consultation <ArrowUpRight />
            </Link>
            <a className="button button--light-outline" href="tel:+254701326274">
              <Phone /> Call Quantum
            </a>
          </div>
          <div className="cta-section__mark" aria-hidden="true">
            <span>Q</span>
            <small>MEP</small>
          </div>
        </div>
      </div>
    </section>
  );
}

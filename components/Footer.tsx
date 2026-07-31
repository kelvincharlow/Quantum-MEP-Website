import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand">
          <Logo light />
          <p>
            Coordinated mechanical, electrical and plumbing systems engineered for
            performance.
          </p>
        </div>

        <div className="footer__directory">
          <nav className="footer__nav" aria-label="Footer navigation">
            <p className="footer__label">Explore</p>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="footer__contact">
            <p className="footer__label">Contact</p>
            <a href="tel:+254701326274"><Phone /><span>+254 701 326 274</span></a>
            <a href="mailto:mohammed@quantumep.co.ke"><Mail /><span>mohammed@quantumep.co.ke</span></a>
            <span><MapPin /><span>The Oval, Westlands, Nairobi</span></span>
          </div>
        </div>

        <div className="footer__action">
          <p className="footer__label">Start a conversation</p>
          <p>Have a project in mind?</p>
          <Link className="footer__big-link" href="/contact">
            Tell us about it <ArrowUpRight />
          </Link>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Quantum MEP Consultants</span>
        <div><span>Engineering since 2017</span><Link href="/privacy">Privacy policy</Link></div>
      </div>
    </footer>
  );
}

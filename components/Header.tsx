"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Home", href: "/", detail: "Overview and capabilities" },
  { label: "About", href: "/about", detail: "Our team and standards" },
  { label: "Services", href: "/services", detail: "How we can support you" },
  { label: "Projects", href: "/projects", detail: "Selected engineering work" },
  { label: "Contact", href: "/contact", detail: "Start a conversation" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${open ? " site-header--menu-open" : ""}`}>
      <div className="container header__inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ label, href }) => (
            <Link className={isActive(href) ? "active" : ""} aria-current={isActive(href) ? "page" : undefined} href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button--primary header__cta" href="/contact">
          Request a consultation <ArrowUpRight />
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} id="mobile-navigation">
        <nav className="container" aria-label="Mobile navigation">
          <div className="mobile-nav__links">
            <div className="mobile-nav__heading"><span>Navigate</span><small>Quantum MEP Consultants</small></div>
            {links.map(({ label, href, detail }, index) => (
              <Link className={isActive(href) ? "active" : ""} aria-current={isActive(href) ? "page" : undefined} href={href} key={href}>
                <span className="mobile-nav__index">0{index + 1}</span>
                <span className="mobile-nav__copy"><strong>{label}</strong><small>{detail}</small></span>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
          <div className="mobile-nav__action">
            <p>Have a project in mind?</p>
            <Link className="button button--primary" href="/contact">
              Request a consultation <ArrowUpRight />
            </Link>
            <a href="mailto:mohammed@quantumep.co.ke"><Mail /> mohammed@quantumep.co.ke</a>
            <small>Engineering since 2017 · Nairobi, Kenya</small>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Mail, Menu, Moon, Sun, X } from "lucide-react";
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
  const [homeTheme, setHomeTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  useEffect(() => {
    if (!isHome) {
      delete document.documentElement.dataset.homeTheme;
      return;
    }

    const savedTheme = window.localStorage.getItem("quantum-home-theme");
    const preferredTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    setHomeTheme(preferredTheme);
    document.documentElement.dataset.homeTheme = preferredTheme;
  }, [isHome]);

  const toggleHomeTheme = () => {
    const nextTheme = homeTheme === "dark" ? "light" : "dark";
    setHomeTheme(nextTheme);
    document.documentElement.dataset.homeTheme = nextTheme;
    window.localStorage.setItem("quantum-home-theme", nextTheme);
  };

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
        <div className="header__actions">
          {isHome && (
            <button className="theme-toggle" type="button" aria-label={`Switch to ${homeTheme === "dark" ? "light" : "dark"} mode`} aria-pressed={homeTheme === "dark"} onClick={toggleHomeTheme}>
              {homeTheme === "dark" ? <Sun /> : <Moon />}
            </button>
          )}
          <a className="header__profile" href="/downloads/quantum-mep-consultants-company-profile-2026.pdf" download aria-label="Download company profile PDF">
            <Download /><span>Download profile</span>
          </a>
          <Link className="button button--primary header__cta" href="/contact">
            Request a consultation <ArrowUpRight />
          </Link>
        </div>
        <div className="header__mobile-controls">
          {isHome && (
            <button className="theme-toggle" type="button" aria-label={`Switch to ${homeTheme === "dark" ? "light" : "dark"} mode`} aria-pressed={homeTheme === "dark"} onClick={toggleHomeTheme}>
              {homeTheme === "dark" ? <Sun /> : <Moon />}
            </button>
          )}
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
            <a className="mobile-nav__download" href="/downloads/quantum-mep-consultants-company-profile-2026.pdf" download>
              <span className="mobile-nav__index">06</span>
              <span className="mobile-nav__copy"><strong>Company profile</strong><small>Download PDF · 17.5 MB</small></span>
              <Download />
            </a>
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

"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function MobileContactBar() {
  const [open, setOpen] = useState(false);
  const dock = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const closeOutside = (event: PointerEvent) => {
      if (!dock.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div ref={dock} className={`mobile-contact-dock${open ? " mobile-contact-dock--open" : ""}`}>
      <div className="mobile-contact-dock__actions" id="quick-contact-actions" aria-hidden={!open}>
        <a href="tel:+254701326274" tabIndex={open ? 0 : -1}>
          <span><small>Speak directly</small><strong>Call Quantum</strong></span><Phone />
        </a>
        <a href="https://wa.me/254701326274" target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
          <span><small>Quick message</small><strong>WhatsApp</strong></span><MessageCircle />
        </a>
      </div>
      <button
        className="mobile-contact-dock__trigger"
        type="button"
        aria-expanded={open}
        aria-controls="quick-contact-actions"
        aria-label={open ? "Close quick contact options" : "Open quick contact options"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <MessageCircle />}
        <span>{open ? "Close" : "Talk to us"}</span>
      </button>
    </div>
  );
}

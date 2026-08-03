"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import towerAerial from "@/app/images/WhatsApp Image 2026-07-30 at 17.09.43.jpeg";
import residenceWide from "@/app/images/WhatsApp Image 2026-07-30 at 17.10.04.jpeg";
import residenceTerrace from "@/app/images/WhatsApp Image 2026-07-30 at 17.10.06.jpeg";
import residenceInterior from "@/app/images/WhatsApp Image 2026-07-30 at 17.10.13.jpeg";
import poolTerrace from "@/app/images/aa.jpeg";

const images: Array<{
  src: StaticImageData;
  alt: string;
  position: string;
  label: string;
  caption: string;
}> = [
  {
    src: residenceWide,
    alt: "Residential development with landscaped grounds and swimming pool",
    position: "center 48%",
    label: "Residential",
    caption: "Services shaped around everyday living.",
  },
  {
    src: residenceTerrace,
    alt: "Residential terrace overlooking a swimming pool",
    position: "center",
    label: "Integrated environments",
    caption: "Performance behind every space.",
  },
  {
    src: poolTerrace,
    alt: "Landscaped pool terrace with shaded outdoor seating",
    position: "center",
    label: "Whole property",
    caption: "One standard across the property.",
  },
  {
    src: residenceInterior,
    alt: "Double-height residential interior with integrated lighting and ventilation",
    position: "center",
    label: "Interiors",
    caption: "Lighting, comfort and controls in harmony.",
  },
  {
    src: towerAerial,
    alt: "Architectural aerial rendering of a high-rise development",
    position: "center 46%",
    label: "High-rise",
    caption: "Coordinated for vertical complexity.",
  },
];

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    setActive((current) => deltaX < 0
      ? (current + 1) % images.length
      : (current - 1 + images.length) % images.length);
  }

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % images.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero__image-meta" aria-live="polite">
        <span>Selected work</span>
        <span>0{active + 1} / 0{images.length}</span>
      </div>
      <div className="hero-gallery" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {images.map((image, index) => (
          <div className={index === active ? "hero-gallery__slide is-active" : "hero-gallery__slide"} key={image.alt}>
            <Image
              className="hero-gallery__image"
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectPosition: image.position }}
            />
          </div>
        ))}
        <div className="hero-gallery__wash" aria-hidden="true" />
        <div className="hero-gallery__controls" aria-label="Choose hero image">
          {images.map((image, index) => (
            <button
              className={index === active ? "is-active" : ""}
              type="button"
              aria-label={`Show image ${index + 1}: ${image.alt}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              key={image.alt}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
      <div className="hero__project-note" aria-live="polite">
        <span className="hero__project-index">Q / 0{active + 1}</span>
        <div>
          <small>{images[active].label}</small>
          <strong>{images[active].caption}</strong>
        </div>
      </div>
    </>
  );
}

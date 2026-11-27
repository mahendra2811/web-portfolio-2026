"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/projects/gaadipulse/auth.jpg",
    alt: "GaadiPulse sign-in and vehicle categories",
    title: "Start with your garage",
  },
  {
    src: "/projects/gaadipulse/onboarding.png",
    alt: "GaadiPulse app onboarding screen",
    title: "A clear introduction",
  },
  {
    src: "/projects/gaadipulse/garage.jpg",
    alt: "GaadiPulse vehicle garage banner",
    title: "Your vehicles, together",
  },
  {
    src: "/projects/gaadipulse/fuel.jpg",
    alt: "GaadiPulse fuel and charging records banner",
    title: "Fuel and charging entries",
  },
  {
    src: "/projects/gaadipulse/expenses.jpg",
    alt: "GaadiPulse expense management banner",
    title: "Vehicle expense history",
  },
  {
    src: "/projects/gaadipulse/collaboration.jpg",
    alt: "GaadiPulse Owner and Pilot collaboration banner",
    title: "Shared vehicle access",
  },
  {
    src: "/projects/gaadipulse/reports.webp",
    alt: "GaadiPulse vehicle reports banner",
    title: "Records and reports",
  },
  {
    src: "/projects/gaadipulse/reminders.webp",
    alt: "GaadiPulse reminder and progress banner",
    title: "Reminders and details",
  },
] as const;

export function GaadiPulseGallery() {
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const move = useCallback(
    (direction: number) =>
      setActive((index) => (index + direction + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, move]);

  return (
    <section className="gp-showcase" id="screenshots">
      <div className="gp-showcase-head">
        <div>
          <span className="gp-eyebrow">A LOOK INSIDE</span>
          <h2>
            Built around the <em>daily details.</em>
          </h2>
        </div>
        <p>App visuals and approved product banners. Select an image to view it full size.</p>
      </div>
      <div
        className="gp-gallery-main"
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => {
          if (touchStart === null) return;
          const distance = event.changedTouches[0]?.clientX - touchStart;
          if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
          setTouchStart(null);
        }}
      >
        <button
          className="gp-gallery-image"
          onClick={() => setIsOpen(true)}
          aria-label={`Open image: ${slides[active].title}`}
        >
          <Image
            src={slides[active].src}
            alt={slides[active].alt}
            fill
            sizes="(max-width: 700px) 95vw, 800px"
            priority={active === 0}
          />
          <span>{slides[active].title}</span>
        </button>
        <button
          className="gp-gallery-arrow"
          onClick={() => move(-1)}
          aria-label="Previous screenshot"
        >
          ←
        </button>
        <button className="gp-gallery-arrow" onClick={() => move(1)} aria-label="Next screenshot">
          →
        </button>
      </div>
      <div className="gp-gallery-dots" role="group" aria-label="Choose screenshot">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.title}`}
            aria-current={index === active}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {isOpen && (
        <div
          className="gp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={slides[active].title}
        >
          <button
            className="gp-lightbox-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <button onClick={() => move(-1)} aria-label="Previous image">
            ←
          </button>
          <div>
            <Image src={slides[active].src} alt={slides[active].alt} fill sizes="95vw" />
            <p>{slides[active].title}</p>
          </div>
          <button onClick={() => move(1)} aria-label="Next image">
            →
          </button>
        </div>
      )}
    </section>
  );
}

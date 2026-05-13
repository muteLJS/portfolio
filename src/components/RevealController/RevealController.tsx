"use client";

import { useEffect } from "react";

export default function RevealController() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-section]"));

    if (sections.length === 0) {
      return;
    }

    const reveal = (section: HTMLElement) => {
      section.classList.add("is-revealed");
      section.dataset.revealed = "true";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          reveal(section);
          observer.unobserve(section);
        });
      },
      {
        root: document.querySelector<HTMLElement>("[data-scroll-container]"),
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.35,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}

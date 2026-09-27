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

    const revealAll = () => {
      sections.forEach(reveal);
    };

    // Content is visible by default. Only opt into the entrance animation after
    // the client is ready, so a suspended or restored tab can never remain blank.
    document.documentElement.classList.add("reveal-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        revealAll();
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        revealAll();
      }
    };

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

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

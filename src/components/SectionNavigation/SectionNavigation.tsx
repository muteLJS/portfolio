"use client";

import { useEffect, useState } from "react";

import styles from "./SectionNavigation.module.css";

const sections = [
  { id: "hero", label: "Hero", icon: WaterDropletIcon },
  { id: "about", label: "About", icon: PersonIcon },
  { id: "projects", label: "Projects", icon: BranchLeafIcon },
  { id: "contact", label: "Outro/Contact", icon: RainbowIcon },
] as const;

export default function SectionNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 5800);
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: scrollContainer,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );

    if (!section) {
      return;
    }

    setActiveSection(sectionId);

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`${styles.navigation} ${isVisible ? styles.visible : ""}`}
      aria-label="Section navigation"
    >
      <ol className={styles.list}>
        {sections.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <li key={id}>
              <button
                className={`${styles.item} ${isActive ? styles.active : ""}`}
                type="button"
                onClick={() => scrollToSection(id)}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
              >
                <Icon />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function WaterDropletIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.2C9.5 6.6 6.9 10.2 6.9 14a5.1 5.1 0 0 0 10.2 0C17.1 10.2 14.5 6.6 12 3.2Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7.4" r="3.2" />
      <path d="M5.8 20c.7-4.1 3-6.2 6.2-6.2s5.5 2.1 6.2 6.2" />
    </svg>
  );
}

function BranchLeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 20c4.7-4 7.1-8.5 8-16" />
      <path d="M13.1 9.6c2.4-2.2 4.6-2.8 6.9-1.7-1.1 2.6-3.1 3.7-6 3.4" />
      <path d="M9.5 14.9c-2.5-1.2-4.3-1.1-5.5.2 1.1 2 2.8 2.6 5.1 1.8" />
    </svg>
  );
}

function RainbowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18a8 8 0 0 1 16 0" />
      <path d="M7.2 18a4.8 4.8 0 0 1 9.6 0" />
      <path d="M10.4 18a1.6 1.6 0 0 1 3.2 0" />
    </svg>
  );
}

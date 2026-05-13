"use client";

import styles from "./TopNavigation.module.css";

const navItems = [
  { label: "ABOUT", target: "about" },
  { label: "PROJECTS", target: "projects" },
  { label: "CONTACT", target: "contact" },
] as const;

export default function TopNavigation() {
  const scrollToSection = (target: string) => {
    const section = document.getElementById(target);
    const scrollContainer = document.querySelector<HTMLElement>("[data-scroll-container='true']");

    if (!section || !scrollContainer) {
      return;
    }

    scrollContainer.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <header className={styles.navigation}>
      <button
        className={styles.brand}
        type="button"
        aria-label="이진성 home"
        onClick={() => scrollToSection("hero")}
      >
        <span className={styles.brandName}>이진성</span>
        <span className={styles.brandRole}>UX/UI Designer · Frontend Developer</span>
      </button>

      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.target}
            className={styles.navLink}
            type="button"
            onClick={() => scrollToSection(item.target)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

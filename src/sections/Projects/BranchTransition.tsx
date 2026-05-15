"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import styles from "./Projects.module.css";

type BranchTransitionProps = {
  children?: ReactNode;
  onActivate?: () => void;
};

export default function BranchTransition({ children, onActivate }: BranchTransitionProps) {
  const [phase, setPhase] = useState<"hidden" | "about" | "projects">("hidden");

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-scroll-container='true']");
    const about = document.getElementById("about");
    const projects = document.getElementById("projects");

    if (!scrollContainer || !about || !projects) {
      return;
    }

    let frame = 0;

    const syncPhase = () => {
      frame = 0;

      const viewportCenter = scrollContainer.scrollTop + scrollContainer.clientHeight * 0.5;
      const aboutStart = about.offsetTop;
      const projectsStart = projects.offsetTop;
      const projectsEnd = projectsStart + projects.offsetHeight;

      if (viewportCenter >= projectsStart && viewportCenter < projectsEnd) {
        setPhase("projects");
        return;
      }

      if (viewportCenter >= aboutStart && viewportCenter < projectsStart) {
        setPhase("about");
        return;
      }

      setPhase("hidden");
    };

    const requestSync = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncPhase);
    };

    syncPhase();
    scrollContainer.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      scrollContainer.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onActivate || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onActivate();
  };

  return (
    <div
      className={styles.branchStage}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      role={onActivate ? "button" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      aria-label={onActivate ? "첫 번째 프로젝트 열기" : undefined}
      data-interactive={onActivate ? "true" : "false"}
      data-phase={phase}
    >
      <Image
        className={styles.branchImage}
        src="/img/branch/tree-branch-main.png"
        alt=""
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 640px) 560px, (max-width: 900px) 760px, (max-width: 1180px) 92vw, 88vw"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

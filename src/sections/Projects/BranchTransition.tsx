"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import styles from "./Projects.module.css";

type BranchTransitionProps = {
  children?: ReactNode;
  onActivate?: () => void;
};

export default function BranchTransition({
  children,
  onActivate,
}: BranchTransitionProps) {
  const [branchState, setBranchState] = useState({
    phase: "hidden" as "hidden" | "about" | "projects",
    x: 220,
    y: 100,
  });

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );
    const projects = document.getElementById("projects");

    if (!scrollContainer || !projects) {
      return;
    }

    const syncPhase = () => {
      const viewportHeight = scrollContainer.clientHeight || window.innerHeight;
      const projectsRect = projects.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, 1 - projectsRect.top / viewportHeight),
      );
      const nextX = Math.round(220 - progress * 220);
      const nextY = Math.round(100 + progress * 140);

      if (projectsRect.top <= 0 && projectsRect.bottom > 0) {
        setBranchState({ phase: "projects", x: 0, y: 240 });
        return;
      }

      if (projectsRect.top > 0 && projectsRect.top <= viewportHeight) {
        setBranchState({ phase: "about", x: nextX, y: nextY });
        return;
      }

      setBranchState({ phase: "hidden", x: 220, y: 100 });
    };

    syncPhase();
    scrollContainer.addEventListener("scroll", syncPhase, { passive: true });
    window.addEventListener("scroll", syncPhase, { passive: true });
    window.addEventListener("resize", syncPhase);

    return () => {
      scrollContainer.removeEventListener("scroll", syncPhase);
      window.removeEventListener("scroll", syncPhase);
      window.removeEventListener("resize", syncPhase);
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
      className={styles.branchPosition}
      data-interactive={onActivate ? "true" : "false"}
      data-phase={branchState.phase}
      style={
        {
          "--branch-enter-x": `${branchState.x}px`,
          "--branch-y": `${branchState.y}px`,
        } as CSSProperties
      }
    >
      <div
        className={styles.branchMotion}
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        role={onActivate ? "button" : undefined}
        tabIndex={onActivate ? 0 : undefined}
        aria-label={onActivate ? "첫 번째 프로젝트 열기" : undefined}
        data-interactive={onActivate ? "true" : "false"}
      >
        <Image
          className={styles.branchBase}
          src="/img/branch/project-branch-base.png"
          alt=""
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 640px) 560px, (max-width: 900px) 760px, (max-width: 1180px) 92vw, 88vw"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./Projects.module.css";

type BranchTransitionProps = {
  children?: ReactNode;
  onActivate?: () => void;
};

export default function BranchTransition({
  children,
  onActivate,
}: BranchTransitionProps) {
  const branchRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef<"hidden" | "about" | "projects">("hidden");
  const [phase, setPhase] = useState<"hidden" | "about" | "projects">(
    "hidden",
  );

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );
    const projects = document.getElementById("projects");

    if (!scrollContainer || !projects) {
      return;
    }

    let frameId: number | null = null;

    const syncPhase = () => {
      frameId = null;
      const viewportHeight = scrollContainer.clientHeight || window.innerHeight;
      const projectsRect = projects.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, 1 - projectsRect.top / viewportHeight),
      );
      const nextX = 220 - progress * 220;
      const nextY = 100 + progress * 140;
      let nextPhase: "hidden" | "about" | "projects" = "hidden";
      let x = 220;
      let y = 100;

      if (projectsRect.top <= 0 && projectsRect.bottom > 0) {
        nextPhase = "projects";
        x = 0;
        y = 240;
      } else if (projectsRect.top > 0 && projectsRect.top <= viewportHeight) {
        nextPhase = "about";
        x = nextX;
        y = nextY;
      }

      branchRef.current?.style.setProperty("--branch-enter-x", `${x}px`);
      branchRef.current?.style.setProperty("--branch-y", `${y}px`);

      if (phaseRef.current !== nextPhase) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }
    };

    const scheduleSync = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(syncPhase);
    };

    syncPhase();
    scrollContainer.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      scrollContainer.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
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
      ref={branchRef}
      className={styles.branchPosition}
      data-interactive={onActivate ? "true" : "false"}
      data-phase={phase}
      style={
        {
          "--branch-enter-x": "220px",
          "--branch-y": "100px",
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

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import BranchTransition from "./BranchTransition";
import styles from "./Projects.module.css";

export type Project = {
  accent: "dark" | "light";
  contribution?: string;
  deploy?: string;
  id: string;
  image: string;
  leaf: {
    asset: string;
    height: string;
    hoverScale: string;
    left: string;
    opacity: string;
    origin: string;
    rotate: string;
    scale: string;
    top: string;
    width: string;
    x: string;
    y: string;
    z: string;
  };
  link: string;
  pages: ProjectPage[];
  period?: string;
  planning?: ProjectPlanning;
  projectNature?: string;
  role?: string;
  shortLine: string;
  skills?: string[];
  tagline: string;
  team?: string;
  title: string;
  type: "main" | "sub";
  description: string;
  insight: string;
  stacks: string[];
};

export type ProjectPage = {
  image: string | null;
  name: string;
};

export type ProjectPlanning = {
  image: string | null;
  summary: string;
  title: string;
};

type ProjectBranchSceneProps = {
  onSelectProject: (project: Project) => void;
  projects: Project[];
  selectedProject: Project | null;
};

const branchLabelRotateOffset = 19;

const leafHitAreaAdjustments: Record<
  string,
  { height?: string; width?: string; x?: string; y?: string }
> = {};

const leafLabelAdjustments: Record<
  string,
  { rotate?: string; width?: string; x?: string; y?: string }
> = {};

const invertRotate = (rotate: string) => {
  const rotateValue = Number.parseFloat(rotate);

  return Number.isFinite(rotateValue)
    ? `${-(rotateValue + branchLabelRotateOffset)}deg`
    : "0deg";
};

export default function ProjectBranchScene({
  onSelectProject,
  projects,
  selectedProject,
}: ProjectBranchSceneProps) {
  const [hasPlayedLeafHint, setHasPlayedLeafHint] = useState(false);
  const [isLeafHintActive, setIsLeafHintActive] = useState(false);

  useEffect(() => {
    const projectsSection = document.getElementById("projects");

    if (!projectsSection || hasPlayedLeafHint) {
      return;
    }

    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsLeafHintActive(true);
        setHasPlayedLeafHint(true);
        observer.disconnect();
      },
      { root: scrollContainer, threshold: 0.42 },
    );

    observer.observe(projectsSection);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayedLeafHint]);

  return (
    <div className={styles.branchScene} aria-label="프로젝트 선택">
      <BranchTransition>
        <ul className={styles.leafLayers} aria-label="프로젝트 잎 선택">
          {projects.map((project, index) => {
            const hitArea = leafHitAreaAdjustments[project.id] ?? {};
            const label = leafLabelAdjustments[project.id] ?? {};

            return (
              <li
              className={[
                styles.projectLeaf,
                styles[`leaf0${index + 1}`],
                selectedProject?.id === project.id
                  ? styles.selectedLeafLayer
                  : "",
                selectedProject && selectedProject.id !== project.id
                  ? styles.inactiveLeafLayer
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={project.id}
              data-entry-hint={
                index === 0 && isLeafHintActive ? "true" : undefined
              }
              onAnimationEnd={
                index === 0 ? () => setIsLeafHintActive(false) : undefined
              }
              style={
                {
                  "--leaf-label-rotate":
                    label.rotate ?? invertRotate(project.leaf.rotate),
                  "--leaf-label-width": label.width ?? "76%",
                  "--leaf-label-x": label.x ?? "0px",
                  "--leaf-label-y": label.y ?? "0px",
                  "--leaf-hit-width": hitArea.width ?? "72%",
                  "--leaf-hit-height": hitArea.height ?? "54%",
                  "--leaf-hit-x": hitArea.x ?? "0px",
                  "--leaf-hit-y": hitArea.y ?? "0px",
                  "--leaf-left": project.leaf.left,
                  "--leaf-top": project.leaf.top,
                  "--leaf-width": project.leaf.width,
                  "--leaf-height": project.leaf.height,
                  "--leaf-origin": project.leaf.origin,
                  "--leaf-rotate": project.leaf.rotate,
                  "--leaf-scale": project.leaf.scale,
                  "--leaf-x": project.leaf.x,
                  "--leaf-y": project.leaf.y,
                  "--leaf-opacity": project.leaf.opacity,
                  "--leaf-z": project.leaf.z,
                  "--leaf-hover-scale": project.leaf.hoverScale,
                } as CSSProperties
              }
            >
              <button
                className={styles.projectLeafButton}
                type="button"
                onClick={() => onSelectProject(project)}
                aria-label={`${project.title} 프로젝트 보기`}
                aria-pressed={selectedProject?.id === project.id}
              />
              <span className={styles.projectLeafVisual}>
                  <Image
                    className={styles.projectLeafImage}
                    src={project.leaf.asset}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes="(max-width: 640px) 220px, (max-width: 900px) 260px, 320px"
                    aria-hidden="true"
                  />
                  <span className={styles.projectLeafLabel}>
                    <strong>{project.title}</strong>
                    <em>{project.shortLine}</em>
                    <span className={styles.mobileLeafNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
              </span>
            </li>
          );
          })}
        </ul>
      </BranchTransition>
    </div>
  );
}

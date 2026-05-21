"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

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

const PROJECT_LEAF_HIT_AREAS = [
  {
    id: "landing",
    left: "31.00%",
    top: "40.95%",
    width: "9.6%",
    height: "12.2%",
    rotate: "-36.8deg",
    clipPath: "ellipse(40% 32% at 52% 50%)",
    debugColor: "rgba(255, 78, 78, 0.34)",
  },
  {
    id: "ypbooks",
    left: "40.15%",
    top: "51.25%",
    width: "7.8%",
    height: "19.8%",
    rotate: "4deg",
    clipPath: "ellipse(40% 32% at 50% 50%)",
    debugColor: "rgba(255, 180, 60, 0.34)",
  },
  {
    id: "mute",
    left: "59.80%",
    top: "33.15%",
    width: "20.6%",
    height: "37.8%",
    rotate: "13.8deg",
    clipPath: "ellipse(43% 33% at 50% 50%)",
    debugColor: "rgba(68, 177, 255, 0.34)",
  },
  {
    id: "goreon",
    left: "80.05%",
    top: "17.15%",
    width: "25.7%",
    height: "45.6%",
    rotate: "-5deg",
    clipPath: "ellipse(44% 32% at 50% 50%)",
    debugColor: "rgba(104, 255, 132, 0.34)",
  },
  {
    id: "hangeul",
    left: "62.15%",
    top: "72.15%",
    width: "27.6%",
    height: "41.2%",
    rotate: "-37.5deg",
    clipPath: "ellipse(42% 33% at 50% 50%)",
    debugColor: "rgba(185, 115, 255, 0.34)",
  },
];

type HitAreaStyle = CSSProperties & {
  "--hit-clip": string;
  "--hit-debug-color": string;
  "--hit-height": string;
  "--hit-left": string;
  "--hit-rotate": string;
  "--hit-top": string;
  "--hit-width": string;
};

export default function ProjectBranchScene({
  onSelectProject,
  projects,
  selectedProject,
}: ProjectBranchSceneProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [isLeafHintEntered, setIsLeafHintEntered] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLeafHintEntered(entry.isIntersecting);
      },
      { root: scrollContainer, threshold: 0.42 },
    );

    observer.observe(scene);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className={[
        styles.projectBranchScene,
        isLeafHintEntered ? styles.projectBranchSceneEntered : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <div className={styles.projectBranchObject}>
        <Image
          className={styles.projectBranchComposite}
          src="/img/branch/project-branch-hint.png"
          alt=""
          width={2146}
          height={825}
          sizes="(max-width: 900px) 112vw, 64vw"
          aria-hidden="true"
        />
        <span className={styles.projectLeafHintPosition}>
          <Image
            className={styles.projectLeafHint}
            src="/img/branch/project-leaf-hint-v2.png"
            alt=""
            width={1536}
            height={1024}
            sizes="(max-width: 900px) 190px, 26vw"
            aria-hidden="true"
          />
        </span>
        <div
          className={styles.projectLeafHitLayer}
          role="group"
          aria-label="Project leaves"
        >
          {PROJECT_LEAF_HIT_AREAS.map((hit) => {
            const project = projects.find((item) => item.id === hit.id);

            if (!project) {
              return null;
            }

            return (
              <button
                key={hit.id}
                type="button"
                className={[
                  styles.projectLeafHitArea,
                  selectedProject?.id === hit.id
                    ? styles.projectLeafHitAreaActive
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  {
                    "--hit-left": hit.left,
                    "--hit-top": hit.top,
                    "--hit-width": hit.width,
                    "--hit-height": hit.height,
                    "--hit-rotate": hit.rotate,
                    "--hit-clip": hit.clipPath,
                    "--hit-debug-color": hit.debugColor,
                  } as HitAreaStyle
                }
                aria-label={`${project.title} 프로젝트 보기`}
                aria-pressed={selectedProject?.id === hit.id}
                onClick={() => onSelectProject(project)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

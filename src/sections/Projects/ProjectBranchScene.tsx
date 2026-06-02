"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

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
  siteUrl?: string;
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
  externalUrl?: string;
  image: string | null;
  name: string;
  previewImage?: string;
};

export type ProjectPlanning = {
  image: string | null;
  summary: string;
  title: string;
};

type ProjectBranchSceneProps = {
  branchScrollProgress: number;
  entryHintCycle: number;
  isInteractive: boolean;
  onCloseDetail: () => void;
  onSelectProject: (project: Project) => void;
  projects: Project[];
  selectedProject: Project | null;
};

type BranchPiece = {
  intrinsicHeight: number;
  intrinsicWidth: number;
  isBranch?: boolean;
  left: string;
  name: string;
  projectId?: string;
  src: string;
  top: string;
  width: string;
};

const BRANCH_PIECES: BranchPiece[] = [
  {
    name: "left",
    src: "/img/branch_new/left.png",
    left: "0%",
    top: "28.5%",
    width: "23%",
    intrinsicWidth: 378,
    intrinsicHeight: 101,
  },
  {
    name: "left_top_1",
    src: "/img/branch_new/left_top_1.png",
    left: "18.2%",
    top: "8.6%",
    width: "26%",
    intrinsicWidth: 430,
    intrinsicHeight: 219,
    projectId: "hangeul",
  },
  {
    name: "left_top_2",
    src: "/img/branch_new/left_top_2.png",
    left: "50%",
    top: "12%",
    width: "24%",
    intrinsicWidth: 402,
    intrinsicHeight: 208,
    projectId: "mute",
  },
  {
    name: "left_bottom_1",
    src: "/img/branch_new/left_bottom_1.png",
    left: "7%",
    top: "46%",
    width: "24%",
    intrinsicWidth: 395,
    intrinsicHeight: 205,
    projectId: "goreon",
  },
  {
    name: "left_bottom_1_side",
    src: "/img/branch_new/left_bottom_1_side.png",
    left: "31%",
    top: "54%",
    width: "2%",
    intrinsicWidth: 30,
    intrinsicHeight: 56,
  },
  {
    name: "left_bottom_2",
    src: "/img/branch_new/left_bottom_2.png",
    left: "48.4%",
    top: "54.6%",
    width: "23%",
    intrinsicWidth: 385,
    intrinsicHeight: 223,
    projectId: "portfolio",
  },
  {
    name: "left_bottom_2_side",
    src: "/img/branch_new/left_bottom_2_side.png",
    left: "67.8%",
    top: "57%",
    width: "6%",
    intrinsicWidth: 104,
    intrinsicHeight: 192,
  },
  {
    name: "left_bottom_small_1",
    src: "/img/branch_new/left_bottom_small_1.png",
    left: "28.4%",
    top: "76%",
    width: "11%",
    intrinsicWidth: 180,
    intrinsicHeight: 140,
    projectId: "ypbooks",
  },
  {
    name: "left_bottom_small_1_side",
    src: "/img/branch_new/left_bottom_small_1_side.png",
    left: "32.5%",
    top: "65.9%",
    width: "14%",
    intrinsicWidth: 233,
    intrinsicHeight: 126,
  },
  {
    name: "left_bottom_small_2",
    src: "/img/branch_new/left_bottom_small_2.png",
    left: "72.7%",
    top: "71%",
    width: "9%",
    intrinsicWidth: 148,
    intrinsicHeight: 197,
    projectId: "landing",
  },
  {
    name: "branch",
    src: "/img/branch_new/branch.png",
    left: "0%",
    top: "0%",
    width: "100%",
    intrinsicWidth: 1646,
    intrinsicHeight: 689,
    isBranch: true,
  },
];

type BranchPieceStyle = CSSProperties & {
  "--piece-left": string;
  "--piece-top": string;
  "--piece-width": string;
};

type BranchDebugHitArea = {
  color: string;
  height: string;
  id: string;
  label: string;
  labelLeft?: string;
  labelOffsetX?: string;
  labelOffsetY?: string;
  labelTop?: string;
  left: string;
  rotate: string;
  top: string;
  type: "continue" | "project";
  width: string;
};

const BRANCH_DEBUG_HIT_AREAS: BranchDebugHitArea[] = [
  {
    id: "hangeul",
    label: "hangeul",
    type: "project",
    left: "31.8%",
    top: "24%",
    width: "23%",
    height: "28%",
    rotate: "12deg",
    color: "rgba(255, 86, 86, 0.32)",
    labelLeft: "31.8%",
    labelTop: "24%",
    labelOffsetX: "0px",
    labelOffsetY: "0px",
  },
  {
    id: "mute",
    label: "mute",
    type: "project",
    left: "62%",
    top: "26.3%",
    width: "20%",
    height: "27.2%",
    rotate: "8deg",
    color: "rgba(255, 146, 64, 0.32)",
    labelLeft: "62%",
    labelTop: "26.3%",
    labelOffsetX: "0px",
    labelOffsetY: "0px",
  },
  {
    id: "goreon",
    label: "goreon",
    type: "project",
    left: "19%",
    top: "60.8%",
    width: "19.6%",
    height: "28.8%",
    rotate: "-10deg",
    color: "rgba(74, 163, 255, 0.32)",
    labelLeft: "19%",
    labelTop: "60.8%",
    labelOffsetX: "0px",
    labelOffsetY: "0px",
  },
  {
    id: "continue",
    label: "포트폴리오",
    type: "continue",
    left: "59.7%",
    top: "71%",
    width: "18%",
    height: "24.7%",
    rotate: "-22deg",
    color: "rgba(96, 220, 118, 0.32)",
  },
  {
    id: "landing",
    label: "landing",
    type: "project",
    left: "77%",
    top: "85%",
    width: "10.5%",
    height: "16%",
    rotate: "-57deg",
    color: "rgba(178, 104, 255, 0.32)",
    labelLeft: "77%",
    labelTop: "85%",
    labelOffsetX: "0px",
    labelOffsetY: "0px",
  },
  {
    id: "ypbooks",
    label: "ypbooks",
    type: "project",
    left: "33.8%",
    top: "86%",
    width: "10%",
    height: "14%",
    rotate: "-32deg",
    color: "rgba(255, 216, 74, 0.32)",
    labelLeft: "34.1%",
    labelTop: "86.6%",
    labelOffsetX: "0px",
    labelOffsetY: "0px",
  },
];

type BranchDebugHitAreaStyle = CSSProperties & {
  "--hit-color": string;
  "--hit-height": string;
  "--hit-left": string;
  "--hit-rotate": string;
  "--hit-top": string;
  "--hit-width": string;
};

type ProjectBranchSceneStyle = CSSProperties & {
  "--branch-scroll-progress": string;
};

export default function ProjectBranchScene({
  branchScrollProgress,
  entryHintCycle,
  isInteractive,
  onCloseDetail,
  onSelectProject,
  projects,
  selectedProject,
}: ProjectBranchSceneProps) {
  const sharedLayer =
    typeof document === "undefined"
      ? null
      : document.getElementById("shared-branch-layer");

  const getHitAreaStyle = (hit: BranchDebugHitArea) =>
    ({
      "--hit-left": hit.left,
      "--hit-top": hit.top,
      "--hit-width": hit.width,
      "--hit-height": hit.height,
      "--hit-rotate": hit.rotate,
      "--hit-color": hit.color,
    }) as BranchDebugHitAreaStyle;

  const branchScene = (
    <div
      key={entryHintCycle}
      className={styles.projectBranchScene}
      data-branch-interactive={isInteractive ? "true" : "false"}
      style={
        {
          "--branch-scroll-progress": branchScrollProgress.toFixed(4),
        } as ProjectBranchSceneStyle
      }
    >
      <div className={styles.branchScene}>
        <div className={styles.branchRevealVisualWrapper} aria-hidden="true">
          {BRANCH_PIECES.map((piece) => (
            <Image
              key={
                piece.projectId ? `${piece.name}-${entryHintCycle}` : piece.name
              }
              className={[
                styles.branchPiece,
                piece.isBranch
                  ? styles.branchBasePiece
                  : styles.branchLeafPiece,
              ]
                .filter(Boolean)
                .join(" ")}
              src={piece.src}
              alt=""
              data-hint-cycle={piece.projectId ? entryHintCycle : undefined}
              data-entry-hint={
                piece.projectId === "hangeul" ? "true" : undefined
              }
              data-project-id={piece.projectId}
              width={piece.intrinsicWidth}
              height={piece.intrinsicHeight}
              sizes="(max-width: 900px) 92vw, min(92vw, 1646px)"
              style={
                {
                  "--piece-left": piece.left,
                  "--piece-top": piece.top,
                  "--piece-width": piece.width,
                } as BranchPieceStyle
              }
              aria-hidden="true"
            />
          ))}
        </div>

        <div
          className={styles.branchDebugHitLayer}
          aria-label="Project hit area debug"
        >
          {BRANCH_DEBUG_HIT_AREAS.map((hit) => {
            if (hit.type === "continue") {
              return (
                <div
                  key={hit.id}
                  className={styles.projectLeafMarker}
                  style={getHitAreaStyle(hit)}
                >
                  <button
                    type="button"
                    className={styles.branchDebugHitArea}
                    aria-label="포트폴리오 소개로 돌아가기"
                    onClick={onCloseDetail}
                  >
                    <span>{hit.label}</span>
                  </button>
                </div>
              );
            }

            const project = projects.find((item) => item.id === hit.id);

            if (!project) {
              return null;
            }

            return (
              <div
                key={hit.id}
                className={styles.projectLeafMarker}
                style={getHitAreaStyle(hit)}
              >
                <button
                  type="button"
                  className={styles.branchDebugHitArea}
                  aria-label={`${project.title} 프로젝트 보기`}
                  aria-pressed={selectedProject?.id === project.id}
                  onClick={() => onSelectProject(project)}
                >
                  <span>{hit.label}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div className={styles.branchLabelOverlay} aria-hidden="true">
          {BRANCH_DEBUG_HIT_AREAS.map((hit) => {
            if (hit.type !== "project") {
              return null;
            }

            const project = projects.find((item) => item.id === hit.id);

            if (!project) {
              return null;
            }

            return (
              <span
                key={hit.id}
                className={styles.branchProjectLabel}
                data-active={
                  selectedProject?.id === project.id ? "true" : "false"
                }
                data-project-id={hit.id}
                style={
                  {
                    "--label-left": hit.labelLeft ?? hit.left,
                    "--label-top": hit.labelTop ?? hit.top,
                    "--label-offset-x": hit.labelOffsetX ?? "0px",
                    "--label-offset-y": hit.labelOffsetY ?? "0px",
                  } as CSSProperties
                }
              >
                <strong>
                  {project.id === "landing" ? "랜딩페이지" : project.title}
                </strong>
                <em>
                  {String(
                    projects.findIndex((item) => item.id === project.id) + 1,
                  ).padStart(2, "0")}
                </em>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (!sharedLayer) {
    return null;
  }

  return createPortal(branchScene, sharedLayer);
}

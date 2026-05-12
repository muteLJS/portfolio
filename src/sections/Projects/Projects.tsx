"use client";

import { useState } from "react";
import styles from "./Projects.module.css";

const projects = [
  { number: "Project 01", name: "Project Name" },
  { number: "Project 02", name: "Project Name" },
  { number: "Project 03", name: "Project Name" },
  { number: "Project 04", name: "Project Name" },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className={styles.branchLayer} aria-hidden="true">
        <svg className={styles.branchSvg} viewBox="0 0 760 620" role="img">
          <path
            className={styles.branchMain}
            d="M736 598 C636 516 558 448 498 378 C442 312 386 274 308 250"
          />
          <path
            className={styles.branchMain}
            d="M520 396 C496 318 486 232 478 126"
          />
          <path
            className={styles.branchMain}
            d="M498 378 C554 300 596 242 654 190"
          />
          <path className={styles.branchTwig} d="M390 286 C342 268 300 264 252 272" />
          <path className={styles.branchTwig} d="M446 334 C392 330 344 344 298 374" />
          <path className={styles.branchTwig} d="M532 426 C492 410 442 406 390 418" />
          <path className={styles.branchTwig} d="M546 354 C584 332 612 304 632 270" />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.leafCard} key={project.number}>
          <div className={styles.leafVein} aria-hidden="true" />
          <div className={styles.cardPanel}>
            <p className={styles.projectNumber}>{project.number}</p>
            <h2 id="projects-title" className={styles.projectName}>
              {project.name}
            </h2>
            <div className={styles.imagePlaceholder}>image placeholder</div>
            <p className={styles.projectDescription}>
              프로젝트 설명 영역입니다. 실제 내용은 이후 프로젝트 정보에 맞춰 채웁니다.
            </p>
            <div className={styles.toolRow} aria-label="Tool icon placeholders">
              <span />
              <span />
              <span />
              <span />
            </div>
            <button className={styles.detailButton} type="button">
              자세히 보기
            </button>
          </div>
        </div>

        <div className={styles.leafNav} aria-label="Project navigation">
          {projects.slice(1).map((item, index) => {
            const projectIndex = index + 1;
            const isActive = activeProject === projectIndex;

            return (
              <button
                className={`${styles.navLeaf} ${isActive ? styles.active : ""}`}
                key={item.number}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveProject(projectIndex)}
              >
                {item.number}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

import styles from "./Projects.module.css";

const projects = [
  {
    number: "01",
    name: "Project One",
    description: "짧은 설명 문장",
  },
  {
    number: "02",
    name: "Project Two",
    description: "짧은 설명 문장",
  },
  {
    number: "03",
    name: "Project Three",
    description: "짧은 설명 문장",
  },
  {
    number: "04",
    name: "Project Four",
    description: "짧은 설명 문장",
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title" data-reveal-section="true">
      <div className={styles.backgroundImage} aria-hidden="true" />
      <div className={styles.backgroundVeil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.sectionCopy} data-reveal="1">
          <p className={styles.sectionLabel}>PROJECTS</p>
          <h2 id="projects-title" className={styles.sectionTitle}>
            변화는 결국,
            <br />
            하나의 형태가 됩니다.
          </h2>
          <p className={styles.sectionDescription}>
            각 프로젝트는 작은 문제를 발견하고,
            <br />
            더 나은 흐름으로 다듬어간 결과입니다.
          </p>
        </div>

        <div className={styles.branchScene} aria-label="Project list">
          <Image
            className={styles.branchImage}
            src="/img/branch/tree-branch-new.png"
            alt=""
            width={779}
            height={352}
            aria-hidden="true"
          />

          <div className={styles.projectItems}>
            {projects.map((project) => (
              <article className={styles.projectItem} key={project.number}>
                <div className={styles.leafText}>
                  <p className={styles.projectNumber}>{project.number}</p>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <a className={styles.projectLink} href="#contact">
                    View Project →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

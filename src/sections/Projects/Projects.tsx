"use client";

import Image from "next/image";
import { useState } from "react";

import BranchTransition from "./BranchTransition";
import styles from "./Projects.module.css";

type Project = {
  id: string;
  title: string;
  type: "main" | "sub";
  tagline: string;
  description: string;
  insight: string;
  stacks: string[];
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: "mute",
    title: "MUTE",
    type: "main",
    tagline: "감각을 덜어내고 본질에 집중한 인터랙션 프로젝트",
    description: "불필요한 장식을 줄이고 사용자의 선택 흐름이 조용히 드러나도록 설계한 웹 경험입니다.",
    insight: "작은 전환 속도와 여백의 차이가 화면의 온도를 크게 바꾼다는 점을 다시 확인했습니다.",
    stacks: ["Next.js", "TypeScript", "CSS Modules", "Framer Motion"],
    image: "/img/projects/mute-main.png",
    link: "/projects/mute",
  },
  {
    id: "goreon",
    title: "GOREON",
    type: "main",
    tagline: "브랜드의 결을 자연스럽게 이어가는 커머스 UI",
    description: "상품 탐색, 위시리스트, 상세 흐름을 하나의 차분한 쇼핑 경험으로 정리했습니다.",
    insight: "정보량이 많은 화면일수록 시선의 순서를 먼저 설계해야 사용자가 덜 피로해진다는 것을 배웠습니다.",
    stacks: ["React", "Next.js", "CSS Modules", "Responsive UI"],
    image: "/img/projects/goreon-main.png",
    link: "/projects/goreon",
  },
  {
    id: "hangeul",
    title: "한-글",
    type: "main",
    tagline: "글자의 리듬을 화면 안에서 다시 관찰한 프로젝트",
    description: "한글의 조형성과 읽기 흐름을 중심에 두고 타이포그래피 기반 인터페이스를 구성했습니다.",
    insight: "문자는 정보이면서 동시에 분위기라는 사실을 인터페이스 안에서 섬세하게 다루고 싶었습니다.",
    stacks: ["TypeScript", "CSS Modules", "Typography", "Interaction"],
    image: "/img/projects/hangeul-main.png",
    link: "/projects/hangeul",
  },
  {
    id: "ypbooks",
    title: "영풍문고",
    type: "sub",
    tagline: "서점의 탐색감을 정돈한 리디자인",
    description: "도서 정보와 탐색 경로를 더 명확하게 읽히도록 화면 구조를 다듬었습니다.",
    insight: "익숙한 서비스일수록 변화는 작게, 개선의 이유는 분명하게 만드는 편이 좋았습니다.",
    stacks: ["HTML", "CSS", "JavaScript"],
    image: "/img/projects/ypbooks-main.png",
    link: "/projects/ypbooks",
  },
  {
    id: "landing",
    title: "랜딩페이지",
    type: "sub",
    tagline: "짧은 설득 흐름을 실험한 랜딩 UI",
    description: "첫 화면의 문장, 이미지, 행동 유도를 하나의 흐름으로 연결한 페이지입니다.",
    insight: "랜딩은 화려함보다 사용자가 다음 행동을 자연스럽게 이해하는지가 더 중요했습니다.",
    stacks: ["HTML", "CSS", "JavaScript", "Responsive"],
    image: "/img/projects/landing-main.png",
    link: "/projects/landing",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title" data-reveal-section="true">
      <div className={styles.backgroundImage} aria-hidden="true" />
      <div className={styles.backgroundVeil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.leftPane} data-reveal="1">
          <div className={styles.introCopy}>
            <p className={styles.sectionLabel}>PROJECTS</p>
            <h2 id="projects-title" className={styles.sectionTitle}>
              사소한 변화는
              <br />
              결과를 만들어 냅니다.
            </h2>
            <p className={styles.sectionDescription}>
              각 프로젝트는 작은 문제를 발견하고,
              <br />
              더 나은 흐름으로 다듬어간 결과입니다.
            </p>
          </div>

          {selectedProject ? (
            <article className={styles.detailPanel} aria-live="polite">
              <button className={styles.closeButton} type="button" onClick={() => setSelectedProject(null)} aria-label="프로젝트 상세 닫기">
                X
              </button>

              <p className={styles.detailType}>{selectedProject.type === "main" ? "MAIN PROJECT" : "SUB PROJECT"}</p>
              <h3 className={styles.detailTitle}>{selectedProject.title}</h3>
              <p className={styles.detailTagline}>{selectedProject.tagline}</p>

              <a className={styles.previewLink} href={selectedProject.link} aria-label={`${selectedProject.title} 상세 페이지로 이동`}>
                <Image
                  className={styles.previewImage}
                  src={selectedProject.image}
                  alt={`${selectedProject.title} 메인 화면`}
                  width={960}
                  height={600}
                  sizes="(max-width: 640px) calc(100vw - 64px), 520px"
                />
              </a>

              <div className={styles.detailTextGroup}>
                <section className={styles.detailBlock} aria-label="프로젝트 설명">
                  <h4>설명</h4>
                  <p>{selectedProject.description}</p>
                </section>
                <section className={styles.detailBlock} aria-label="작업하며 느낀 점">
                  <h4>느낀 점</h4>
                  <p>{selectedProject.insight}</p>
                </section>
              </div>

              <ul className={styles.stackList} aria-label="사용 기술 스택">
                {selectedProject.stacks.map((stack) => (
                  <li key={stack}>{stack}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>

        <div className={styles.branchScene} aria-label="프로젝트 선택">
          <BranchTransition onActivate={selectedProject ? undefined : () => setSelectedProject(projects[0])} />

          {selectedProject ? (
            <nav className={styles.leafNav} aria-label="프로젝트 목록">
              {projects.map((project) => (
                <button
                  className={styles.leafButton}
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-pressed={selectedProject.id === project.id}
                >
                  {project.title}
                </button>
              ))}
            </nav>
          ) : null}

        </div>
      </div>
    </section>
  );
}

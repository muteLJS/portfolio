"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import BranchTransition from "./BranchTransition";
import styles from "./Projects.module.css";

type Project = {
  accent: "dark" | "light";
  id: string;
  image: string;
  leaf: {
    asset: string;
    left: string;
    origin: string;
    top: string;
    height: string;
    hoverScale: string;
    opacity: string;
    rotate: string;
    scale: string;
    x: string;
    y: string;
    z: string;
    width: string;
  };
  link: string;
  pages: string[];
  shortLine: string;
  tagline: string;
  title: string;
  type: "main" | "sub";
  description: string;
  insight: string;
  stacks: string[];
};

const projects: Project[] = [
  {
    id: "mute",
    title: "MUTE",
    type: "main",
    shortLine: "AI Music Platform",
    tagline: "감각을 덜어내고 본질에 집중한 인터랙션 프로젝트",
    description:
      "불필요한 장식을 줄이고 사용자의 선택 흐름이 조용히 드러나도록 설계한 웹 경험입니다.",
    insight:
      "작은 전환 속도와 여백의 차이가 화면의 온도를 크게 바꾼다는 점을 다시 확인했습니다.",
    stacks: ["Next.js", "TypeScript", "CSS Modules", "Framer Motion"],
    image: "/img/projects/mute-main.png",
    link: "/projects/mute",
    pages: ["Main", "Explore", "Player", "Archive"],
    leaf: {
      asset: "/img/branch/project-leaf-main-01.png",
      left: "-3%",
      origin: "100%",
      top: "29.7%",
      width: "750px",
      height: "510px",
      hoverScale: "1",
      opacity: "1",
      rotate: "10deg",
      scale: "1",
      x: "0%",
      y: "0%",
      z: "6",
    },
    accent: "dark",
  },
  {
    id: "goreon",
    title: "GOREON",
    type: "main",
    shortLine: "AI Commerce Platform",
    tagline: "브랜드의 결을 자연스럽게 이어가는 커머스 UI",
    description:
      "상품 탐색, 위시리스트, 상세 흐름을 하나의 차분한 쇼핑 경험으로 정리했습니다.",
    insight:
      "정보량이 많은 화면일수록 시선의 순서를 먼저 설계해야 사용자가 덜 피로해진다는 것을 배웠습니다.",
    stacks: ["React", "Next.js", "CSS Modules", "Responsive UI"],
    image: "/img/projects/goreon-main.png",
    link: "/projects/goreon",
    pages: ["Main", "Product List", "Product Detail", "Wishlist"],
    leaf: {
      asset: "/img/branch/project-leaf-main-02.png",
      left: "18%",
      origin: "57.7% 44.7%",
      top: "10.8%",
      width: "640px",
      height: "450px",
      hoverScale: "1.0",
      opacity: "1",
      rotate: "62deg",
      scale: "1",
      x: "0%",
      y: "0%",
      z: "5",
    },
    accent: "light",
  },
  {
    id: "hangeul",
    title: "한-글",
    type: "main",
    shortLine: "Typography Archive",
    tagline: "글자의 리듬을 화면 안에서 다시 관찰한 프로젝트",
    description:
      "한글의 조형성과 읽기 흐름을 중심에 두고 타이포그래피 기반 인터페이스를 구성했습니다.",
    insight:
      "문자는 정보이면서 동시에 분위기라는 사실을 인터페이스 안에서 섬세하게 다루고 싶었습니다.",
    stacks: ["TypeScript", "CSS Modules", "Typography", "Interaction"],
    image: "/img/projects/hangeul-main.png",
    link: "/projects/hangeul",
    pages: ["Main", "Archive", "Detail", "Essay"],
    leaf: {
      asset: "/img/branch/project-leaf-main-03.png",
      left: "18.6%",
      origin: "60.3% 44.5%",
      top: "35.2%",
      width: "474px",
      height: "454px",
      hoverScale: "1.025",
      opacity: "0.92",
      rotate: "-59.2deg",
      scale: "0.92",
      x: "0%",
      y: "0%",
      z: "4",
    },
    accent: "dark",
  },
  {
    id: "ypbooks",
    title: "영풍문고",
    type: "sub",
    shortLine: "Bookstore Redesign",
    tagline: "서점의 탐색감을 정돈한 리디자인",
    description:
      "도서 정보와 탐색 경로를 더 명확하게 읽히도록 화면 구조를 다듬었습니다.",
    insight:
      "익숙한 서비스일수록 변화는 작게, 개선의 이유는 분명하게 만드는 편이 좋았습니다.",
    stacks: ["HTML", "CSS", "JavaScript"],
    image: "/img/projects/ypbooks-main.png",
    link: "/projects/ypbooks",
    pages: ["Main", "Book Detail", "Event", "Search"],
    leaf: {
      asset: "/img/branch/project-leaf-small-01.png",
      left: "55.6%",
      origin: "52% 48.5%",
      top: "27.8%",
      width: "452px",
      height: "332px",
      hoverScale: "1.02",
      opacity: "1",
      rotate: "-50.6deg",
      scale: "1",
      x: "0%",
      y: "0%",
      z: "2",
    },
    accent: "light",
  },
  {
    id: "landing",
    title: "랜딩페이지",
    type: "sub",
    shortLine: "Landing UI Study",
    tagline: "짧은 설득 흐름을 실험한 랜딩 UI",
    description:
      "첫 화면의 문장, 이미지, 행동 유도를 하나의 흐름으로 연결한 페이지입니다.",
    insight:
      "랜딩은 화려함보다 사용자가 다음 행동을 자연스럽게 이해하는지가 더 중요했습니다.",
    stacks: ["HTML", "CSS", "JavaScript", "Responsive"],
    image: "/img/projects/landing-main.png",
    link: "/projects/landing",
    pages: ["Hero", "Feature", "Pricing", "Contact"],
    leaf: {
      asset: "/img/branch/project-leaf-small-02.png",
      left: "45.1%",
      origin: "53.4% 47.4%",
      top: "41.3%",
      width: "471.8px",
      height: "364px",
      hoverScale: "1.02",
      opacity: "1",
      rotate: "168.6deg",
      scale: "1",
      x: "0%",
      y: "0%",
      z: "1",
    },
    accent: "dark",
  },
];

const projectPlaybackRate = 0.62;

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const selectedIndex = selectedProject
    ? projects.findIndex((project) => project.id === selectedProject.id)
    : 0;
  const previousProject =
    projects[(selectedIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(selectedIndex + 1) % projects.length];

  useEffect(() => {
    const video = backgroundVideoRef.current;

    if (!video) {
      return;
    }

    video.playbackRate = projectPlaybackRate;
    void video.play();
  }, []);
  const detailPanel = selectedProject ? (
    <article className={styles.detailPanel} aria-live="polite">
      <a
        className={styles.previewLink}
        href={selectedProject.link}
        aria-label={`${selectedProject.title} project detail`}
      >
        {brokenImages[selectedProject.id] ? (
          <span className={styles.previewFallback}>
            {selectedProject.title}
          </span>
        ) : (
          <Image
            className={styles.previewImage}
            src={selectedProject.image}
            alt={`${selectedProject.title} main screen`}
            width={960}
            height={600}
            sizes="(max-width: 900px) calc(100vw - 64px), 560px"
            onError={() =>
              setBrokenImages((current) => ({
                ...current,
                [selectedProject.id]: true,
              }))
            }
          />
        )}
      </a>

      <div className={styles.detailContent}>
        <div className={styles.detailHeader}>
          <div className={styles.detailSelector}>
            <button
              className={styles.detailStepButton}
              type="button"
              onClick={() => setSelectedProject(previousProject)}
            >
              Previous
            </button>
            <div className={styles.detailMeta}>
              <p className={styles.detailType}>SELECTED PROJECT</p>
              <p className={styles.projectNumber}>
                {String(selectedIndex + 1).padStart(2, "0")}
              </p>
            </div>
            <button
              className={styles.detailStepButton}
              type="button"
              onClick={() => setSelectedProject(nextProject)}
            >
              Next
            </button>
          </div>
          <button
            className={styles.detailCloseButton}
            type="button"
            onClick={() => setSelectedProject(null)}
            aria-label="Close project detail"
          >
            X
          </button>
        </div>
        <h3 className={styles.detailTitle}>{selectedProject.title}</h3>
        <p className={styles.detailTagline}>{selectedProject.tagline}</p>

        <div className={styles.detailScroll}>
          <p className={styles.detailDescription}>
            {selectedProject.description}
          </p>
          <p className={styles.detailInsight}>{selectedProject.insight}</p>

          <section className={styles.pagesBlock} aria-label="project pages">
            <h4>Pages</h4>
            <ul>
              {selectedProject.pages.map((page) => (
                <li key={page}>{page}</li>
              ))}
            </ul>
          </section>
        </div>
        <section
          className={styles.detailStacks}
          aria-label="project tech stack"
        >
          <h4>STACK</h4>
          <ul>
            {selectedProject.stacks.map((stack) => (
              <li key={stack}>{stack}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  ) : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
      data-reveal-section="true"
    >
      <video
        ref={backgroundVideoRef}
        className={styles.backgroundVideo}
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/img/background/project-background.png"
      >
        <source src="/videos/project-background.mp4" type="video/mp4" />
      </video>
      <div className={styles.backgroundVeil} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.leftPane} data-reveal="1">
          {detailPanel ?? (
            <div className={styles.introCopy}>
              <p className={styles.sectionLabel}>PROJECTS</p>
              <h2 id="projects-title" className={styles.sectionTitle}>
                읽어낸 흐름은,
                <br />
                여러 결과로 이어집니다.
              </h2>
              <p className={styles.sectionDescription}>
                이어지는 과정 속에서,
                <br />
                새로운 형태들이 만들어집니다.
              </p>
            </div>
          )}
        </div>

        <div className={styles.branchScene} aria-label="프로젝트 선택">
          <BranchTransition>
            <ul className={styles.leafLayers} aria-label="프로젝트 잎 선택">
              {projects.map((project, index) => (
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
                  style={
                    {
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
                    onClick={() => setSelectedProject(project)}
                    aria-label={`${project.title} 프로젝트 보기`}
                    aria-pressed={selectedProject?.id === project.id}
                  >
                    <Image
                      className={styles.projectLeafImage}
                      src={project.leaf.asset}
                      alt=""
                      width={1536}
                      height={1024}
                      sizes="(max-width: 640px) 220px, (max-width: 900px) 260px, 320px"
                      aria-hidden="true"
                    />
                    <span className={styles.projectLeafText}>
                      <strong>{project.title}</strong>
                      <em>{project.shortLine}</em>
                      <span className={styles.mobileLeafNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </BranchTransition>
        </div>
      </div>
    </section>
  );
}

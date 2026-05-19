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
      left: "24.4%",
      origin: "39.5% 43.5%",
      top: "30.8%",
      width: "39%",
      height: "25.6%",
      hoverScale: "1.025",
      opacity: "0.98",
      rotate: "0deg",
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
      left: "37.8%",
      origin: "57.7% 44.7%",
      top: "34.6%",
      width: "31%",
      height: "18.2%",
      hoverScale: "1.025",
      opacity: "0.94",
      rotate: "0deg",
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
      left: "40.2%",
      origin: "60.3% 44.5%",
      top: "45.4%",
      width: "29%",
      height: "17.4%",
      hoverScale: "1.025",
      opacity: "0.92",
      rotate: "0deg",
      scale: "1",
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
      left: "58.8%",
      origin: "52% 48.5%",
      top: "31.6%",
      width: "12.4%",
      height: "14.2%",
      hoverScale: "1.02",
      opacity: "0.68",
      rotate: "0deg",
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
      left: "64.2%",
      origin: "53.4% 47.4%",
      top: "45.8%",
      width: "11.4%",
      height: "12.8%",
      hoverScale: "1.02",
      opacity: "0.58",
      rotate: "0deg",
      scale: "1",
      x: "0%",
      y: "0%",
      z: "1",
    },
    accent: "dark",
  },
];

const stackIconMap: Record<string, string> = {
  "CSS Modules": "devicon-css3-plain colored",
  "Framer Motion": "devicon-react-original colored",
  HTML: "devicon-html5-plain colored",
  Interaction: "devicon-javascript-plain colored",
  JavaScript: "devicon-javascript-plain colored",
  "Next.js": "devicon-nextjs-plain colored",
  React: "devicon-react-original colored",
  "Responsive UI": "devicon-css3-plain colored",
  Responsive: "devicon-css3-plain colored",
  Typography: "devicon-figma-plain colored",
  TypeScript: "devicon-typescript-plain colored",
};

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
        <p className={styles.detailType}>SELECTED PROJECT</p>
        <p className={styles.projectNumber}>
          {String(selectedIndex + 1).padStart(2, "0")}
        </p>
        <h3 className={styles.detailTitle}>{selectedProject.title}</h3>
        <p className={styles.detailTagline}>{selectedProject.tagline}</p>

        <div className={styles.detailScroll}>
          <p className={styles.detailDescription}>
            {selectedProject.description}
          </p>
          <p className={styles.detailInsight}>{selectedProject.insight}</p>

          <ul className={styles.stackList} aria-label="project tech stack">
            {selectedProject.stacks.map((stack) => (
              <li className={styles.stackItem} key={stack}>
                <i
                  className={`${stackIconMap[stack] ?? "devicon-devicon-plain colored"} ${styles.stackIcon}`}
                  aria-hidden="true"
                />
                <span>{stack}</span>
              </li>
            ))}
          </ul>

          <section className={styles.pagesBlock} aria-label="project pages">
            <h4>Pages</h4>
            <ul>
              {selectedProject.pages.map((page) => (
                <li key={page}>{page}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.detailActions}>
          <button
            type="button"
            onClick={() => setSelectedProject(previousProject)}
          >
            Previous
          </button>
          <button type="button" onClick={() => setSelectedProject(nextProject)}>
            Next
          </button>
          <button type="button" onClick={() => setSelectedProject(null)}>
            Close
          </button>
          <a href={selectedProject.link}>View Project</a>
        </div>
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
            <div className={styles.leafLayers} aria-label="프로젝트 잎 선택">
              {projects.map((project, index) => (
                /*
                 * Each leaf image is a full branch-sized layer. These state
                 * classes keep active text above neighboring leaf artwork.
                 */
                <div
                  className={[
                    styles.leafLayer,
                    index === 0 ? styles.firstLeafLayer : "",
                    project.type === "sub" ? styles.sproutLeafLayer : "",
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
                      "--leaf-origin": project.leaf.origin,
                      "--leaf-hover-scale": project.leaf.hoverScale,
                      "--leaf-opacity": project.leaf.opacity,
                      "--leaf-rotate": project.leaf.rotate,
                      "--leaf-scale": project.leaf.scale,
                      "--leaf-x": project.leaf.x,
                      "--leaf-y": project.leaf.y,
                      "--leaf-z": project.leaf.z,
                      "--hotspot-height": project.leaf.height,
                      "--hotspot-left": project.leaf.left,
                      "--hotspot-top": project.leaf.top,
                      "--hotspot-width": project.leaf.width,
                    } as CSSProperties
                  }
                >
                  <Image
                    className={styles.leafImage}
                    src={project.leaf.asset}
                    alt=""
                    width={1536}
                    height={1024}
                    sizes="(max-width: 640px) 560px, (max-width: 900px) 760px, (max-width: 1180px) 92vw, 88vw"
                    aria-hidden="true"
                  />
                  {project.type === "main" ? (
                    <button
                      className={`${styles.leafHotspot} ${styles[project.type]} ${styles[project.accent]}`}
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`${project.title} 프로젝트 보기`}
                      aria-pressed={selectedProject?.id === project.id}
                    >
                      <span className={styles.leafTitle}>{project.title}</span>
                      <span className={styles.leafLine}>
                        {project.shortLine}
                      </span>
                      <span className={styles.mobileLeafNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </BranchTransition>
        </div>
      </div>
    </section>
  );
}

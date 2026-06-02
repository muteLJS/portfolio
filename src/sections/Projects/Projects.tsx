"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ProjectBranchScene from "./ProjectBranchScene";
import type { Project } from "./ProjectBranchScene";
import styles from "./Projects.module.css";

const getProjectDisplayTitle = (project: Project) =>
  project.id === "landing" ? "랜딩페이지" : project.title;

const getProjectPreviewType = (project: Project | null) => {
  if (!project) {
    return "desktop";
  }

  if (project.id === "mute") {
    return "mobile";
  }

  if (project.id === "goreon") {
    return "responsive";
  }

  return "desktop";
};

const goreonMobilePreviewMap: Record<string, string> = {
  "/img/web_imgs/goreon/cart.png": "/img/web_imgs/goreon/cart_mobile.png",
  "/img/web_imgs/goreon/like.png": "/img/web_imgs/goreon/like_mobile.png",
  "/img/web_imgs/goreon/login.png": "/img/web_imgs/goreon/login_mobile.png",
  "/img/web_imgs/goreon/main.png": "/img/web_imgs/goreon/main_mobile.png",
  "/img/web_imgs/goreon/mypage.png": "/img/web_imgs/goreon/mypage_mobile.png",
  "/img/web_imgs/goreon/order_history.png":
    "/img/web_imgs/goreon/order-history_mobile.png",
  "/img/web_imgs/goreon/payment.png": "/img/web_imgs/goreon/payment_mobile.png",
  "/img/web_imgs/goreon/pc_assembly.png":
    "/img/web_imgs/goreon/pc_assembly_mobile.png",
  "/img/web_imgs/goreon/pc_assembly_quote.png":
    "/img/web_imgs/goreon/pc_assmebly_quote_mobile.png",
  "/img/web_imgs/goreon/popup.png": "/img/web_imgs/goreon/popup_mobile.png",
  "/img/web_imgs/goreon/search_result.png":
    "/img/web_imgs/goreon/search_result_mobile.png",
};

const getMobilePreviewImage = (
  project: Project | null,
  previewImage: string,
) => {
  if (project?.id !== "goreon" || !previewImage) {
    return null;
  }

  return goreonMobilePreviewMap[previewImage] ?? null;
};

const projectOrder = ["landing", "ypbooks", "mute", "goreon", "hangeul"];
const getProjectOrderIndex = (project: Project) => {
  const index = projectOrder.indexOf(project.id);

  return index === -1 ? projectOrder.length : index;
};

const projects: Project[] = (
  [
    {
      id: "mute",
      title: "Mute",
      type: "main",
      shortLine: "AI Music Platform",
      tagline: "AI 채팅과 음악 경험을 연결한 팀 프로젝트",
      period: "2026.02.03 ~ 2026.03.20",
      team: "팀 프로젝트 / 3인",
      role: "기획 전반 참여 / 로그인 기능 / 페이지 퍼블리싱 / 라이브러리 기능 구현",
      contribution:
        "Naver 로그인 / Kakao 로그인 / Google 로그인 / AI 채팅 / 음악 데이터 연동 / 이미지 관리 / DB 연동",
      description:
        "첫 팀프로젝트로 기획을 전반적으로 담당하여, 기획안 작성에 큰 기여도를 담당하고, 디자인과 개발에서도 역할 분담을 통해 로그인 기능, 페이지 퍼블리싱, 라이브러리 기능 등을 주요적으로 담당했습니다. 팀 프로젝트를 진행하며 소통이라는 부분이 가장 중요하다고 생각됩니다. 같은 기획안을 보고, 같은 페이지를 만들더라도 각자의 개성이 반영되기 때문에 모두가 공통의 방향을 설정할 수 있도록 소통에 가장 노력을 많이 하고, 배웠습니다. 또한 팀원들 모두 각자의 역량이 다른 것을 보고 배울 점이 많은 팀원들과 함께하여, 많은 것을 배우고, 생각하고, 구현까지 마무리 할 수 있었던 프로젝트입니다.",
      insight: "",
      skills: [
        "Vue",
        "JavaScript",
        "jQuery",
        "PHP",
        "MySQL",
        "OpenAI API",
        "Cloudinary",
        "Figma",
      ],
      stacks: [
        "Vue",
        "JavaScript",
        "jQuery",
        "PHP",
        "MySQL",
        "OpenAI API",
        "Cloudinary",
        "Figma",
      ],
      deploy: "Dothome",
      image: "/img/projects/mute-main.png",
      link: "/projects/mute",
      siteUrl: "https://teammute.dothome.co.kr/",
      pages: [
        {
          name: "Main",
          image: null,
          previewImage: "/img/web_imgs/mute/main.png",
          externalUrl: "https://teammute.dothome.co.kr/main",
        },
        {
          name: "Splash",
          image: null,
          previewImage: "/img/web_imgs/mute/splash.png",
          externalUrl: "https://teammute.dothome.co.kr/",
        },
        {
          name: "Onboarding",
          image: null,
          previewImage: "/img/web_imgs/mute/onboarding_main.png",
          externalUrl: "https://teammute.dothome.co.kr/welcome",
        },
        {
          name: "Login",
          image: null,
          previewImage: "/img/web_imgs/mute/login.png",
        },
        {
          name: "Register",
          image: null,
          previewImage: "/img/web_imgs/mute/register.png",
          externalUrl: "https://teammute.dothome.co.kr/signup",
        },
        {
          name: "Artist Select",
          image: null,
          previewImage: "/img/web_imgs/mute/artist_select.png",
          externalUrl: "https://teammute.dothome.co.kr/artist-select",
        },
        {
          name: "Personalization",
          image: null,
          previewImage: "/img/web_imgs/mute/personalization.png",
          externalUrl: "https://teammute.dothome.co.kr/signup-info",
        },
        {
          name: "AI Chat",
          image: null,
          previewImage: "/img/web_imgs/mute/ai_chat.png",
          externalUrl: "https://teammute.dothome.co.kr/main/ai",
        },
        {
          name: "Chart",
          image: null,
          previewImage: "/img/web_imgs/mute/chart.png",
          externalUrl: "https://teammute.dothome.co.kr/main/chart",
        },
        {
          name: "Library",
          image: null,
          previewImage: "/img/web_imgs/mute/library.png",
          externalUrl: "https://teammute.dothome.co.kr/main/library",
        },
        {
          name: "Library Detail",
          image: null,
          previewImage: "/img/web_imgs/mute/library_detail.png",
          externalUrl: "https://teammute.dothome.co.kr/main/video-detail/1",
        },
        {
          name: "Player",
          image: null,
          previewImage: "/img/web_imgs/mute/player.png",
          externalUrl: "https://teammute.dothome.co.kr/main/player/0",
        },
        {
          name: "Search",
          image: null,
          previewImage: "/img/web_imgs/mute/search.png",
          externalUrl: "https://teammute.dothome.co.kr/main/search",
        },
        {
          name: "Search Result",
          image: null,
          previewImage: "/img/web_imgs/mute/search_result.png",
          externalUrl:
            "https://teammute.dothome.co.kr/main/search-result?term=%ED%95%98%EB%8A%98%EC%83%89%20%ED%92%8D%EC%84%A0",
        },
        {
          name: "My Page",
          image: null,
          previewImage: "/img/web_imgs/mute/mypage.png",
        },
      ],
      planning: {
        title: "기획안",
        summary:
          "음악 경험과 AI 채팅 흐름을 연결하기 위해 서비스 구조와 팀 작업 방향을 정리한 기획 자료입니다.",
        image: null,
      },
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
      tagline: "AI 상품 탐색과 PC 견적 경험을 연결한 커머스 플랫폼",
      period: "2026.03.30 ~ 2026.04.30",
      team: "팀 프로젝트 / 5인",
      role: "개발 담당",
      contribution:
        "GitHub 세팅 / 프로젝트 초기 세팅 / 라우터 구조 설정 / 공통 레이아웃 구성 / 헤더·푸터 / 메인 페이지 / 검색창·네비바 / 로그인 기능 / 배포 / 반응형 구현 / 기획 일부 참여 / 견적 리스트 페이지 디자인 / 조립 견적 페이지 디자인",
      description:
        "숙련자와 초보자가 제일 많이 나뉘는 곳이 전문성을 요구하는 사이트라고 생각됩니다. 구입에 어려움이 없도록 AI 채팅을 통해 원하는 결과를 찾고, 구입할 수 있게 자연스러운 연결을 구현한 사이트입니다. 리액트 그리고 다양한 툴들을 사용하게 되는 시작이었고, 팀원들에게 도움을 정말 많이 받았습니다. 개발 담당이었지만 저보다 더 잘 아는 그리고 부담감 없이 도와주는 팀원들에게 많이 배웠습니다. 이전의 팀프로젝트 경험이 협업에 더욱 도움이 될 수 있었던 것 같습니다.",
      insight: "",
      skills: [
        "React",
        "Vite",
        "React Router",
        "Redux Toolkit",
        "Axios",
        "Sass",
        "Swiper",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Bcrypt JS",
        "Cloudflare R2",
        "OpenAI API",
        "Render",
        "Google OAuth",
        "Kakao OAuth",
        "Naver OAuth",
        "GitHub",
        "Figma",
      ],
      stacks: [
        "React",
        "Vite",
        "React Router",
        "Redux Toolkit",
        "Axios",
        "Sass",
        "Swiper",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Bcrypt JS",
        "Cloudflare R2",
        "OpenAI API",
        "Render",
        "Google OAuth",
        "Kakao OAuth",
        "Naver OAuth",
        "GitHub",
        "Figma",
      ],
      deploy: "Render",
      image: "/img/projects/goreon-main.png",
      link: "/projects/goreon",
      siteUrl: "https://goreon-0x90.onrender.com/",
      pages: [
        {
          name: "Main",
          image: null,
          previewImage: "/img/web_imgs/goreon/main.png",
          externalUrl: "https://goreon-0x90.onrender.com/",
        },
        {
          name: "Search",
          image: null,
          externalUrl:
            "https://goreon-0x90.onrender.com/search?q=%EC%9C%A0%ED%8A%9C%EB%B8%8C%20%ED%8E%B8%EC%A7%91%EC%9A%A9%20%EB%85%B8%ED%8A%B8%EB%B6%81",
        },
        {
          name: "Search Result",
          image: null,
          previewImage: "/img/web_imgs/goreon/search_result.png",
          externalUrl:
            "https://goreon-0x90.onrender.com/search?q=%EC%9C%A0%ED%8A%9C%EB%B8%8C%20%ED%8E%B8%EC%A7%91%EC%9A%A9%20%EB%85%B8%ED%8A%B8%EB%B6%81",
        },
        { name: "Category", image: null },
        {
          name: "Product List",
          image: null,
          previewImage: "/img/web_imgs/goreon/product_list.png",
          externalUrl: "https://goreon-0x90.onrender.com/list?group=pc",
        },
        {
          name: "Product Detail",
          image: null,
          previewImage: "/img/web_imgs/goreon/product_detail.png",
        },
        {
          name: "Cart",
          image: null,
          previewImage: "/img/web_imgs/goreon/cart.png",
        },
        {
          name: "Wishlist",
          image: null,
          previewImage: "/img/web_imgs/goreon/like.png",
        },
        {
          name: "Login",
          image: null,
          previewImage: "/img/web_imgs/goreon/login.png",
        },
        {
          name: "My Page",
          image: null,
          previewImage: "/img/web_imgs/goreon/mypage.png",
        },
        {
          name: "Order List",
          image: null,
          previewImage: "/img/web_imgs/goreon/order_history.png",
        },
        {
          name: "PC Assembly",
          image: null,
          previewImage: "/img/web_imgs/goreon/pc_assembly.png",
          externalUrl: "https://goreon-0x90.onrender.com/pc-assembly",
        },
        {
          name: "PC Assembly Quote",
          image: null,
          previewImage: "/img/web_imgs/goreon/pc_assembly_quote.png",
        },
        {
          name: "Payment",
          image: null,
          previewImage: "/img/web_imgs/goreon/payment.png",
        },
        {
          name: "Popup",
          image: null,
          previewImage: "/img/web_imgs/goreon/popup.png",
        },
      ],
      planning: {
        title: "기획안",
        summary:
          "AI를 활용한 상품 탐색과 구매 흐름을 설계하고, PC 견적 경험까지 연결한 서비스 기획 자료입니다.",
        image: null,
      },
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
      shortLine: "Writing Growth Service",
      tagline: "읽고 생각해 쓰는 힘을 위한 에듀테크 서비스",
      period: "2026.05.01 ~ 진행 중",
      team: "개인 프로젝트",
      projectNature:
        "에듀테크 서비스 / 글쓰기 성장 서비스 / 개인 기준 기반 학습 플랫폼",
      role: "기획 / 디자인 / 구현",
      description:
        "다양한 프로젝트를 경험한 후 기획부터 디자인, 구현한 에듀테크 서비스입니다. 현재 시장 조사, 그리고 만들어야 할 서비스의 시장성, 현대 사회의 문제 등을 고려하여 만들어낸 서비스로, 최근 AI의 도움을 통해 발전이 이루어지지만 한 가지 허점, 글을 직접 읽고, 생각해서 작성하는 사고적 능력이 부족해지는 부분이 있는 것을 보완하고자 기획하였습니다. 에듀테크 서비스의 목적을 이룸과 동시에 글, 그리고 문장에는 절대적인 평가기준이 없다는 것을 고려하여 현재 사용되고 있는 에듀테크 앱들에서 참고하여 서비스를 제공하고자 하였고, 그에 맞는 디자인과 기능을 추가함으로서 사용자들로 하여금 더욱 쉽고 편하게 그리고 목적에 맞게 이용할 수 있도록 하였습니다.",
      insight: "",
      skills: ["추후 정리"],
      stacks: ["추후 정리"],
      image: "/img/projects/hangeul-main.png",
      link: "/projects/hangeul",
      pages: [
        { name: "Main", image: null },
        { name: "Writing", image: null },
        { name: "Feedback", image: null },
        { name: "Growth", image: null },
        { name: "My Page", image: null },
      ],
      planning: {
        title: "기획안",
        summary:
          "AI 시대에 직접 읽고 생각해 쓰는 사고 능력을 보완하기 위한 에듀테크 서비스 기획 자료입니다.",
        image: null,
      },
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
      title: "영풍문고 리디자인",
      type: "sub",
      shortLine: "Bookstore Redesign",
      tagline: "서점의 탐색 흐름을 다시 정리한 리디자인",
      period: "2025.12.26 ~ 2026.02.02",
      team: "개인 프로젝트",
      description:
        "기존 영풍문고 페이지를 보고, 사용자들이 불편함을 느끼거나 기존의 획일화된 틀을 사용하는 것이 아닌 다양한 페이지들과 레이아웃을 참고하여 저만의 기준으로 한 단계 성장시킨 페이지입니다. 두 번째 작업물로, 이전과 다르게 JavaScript와 jQuery를 활용하여 한결 더 동적인 페이지를 만들 수 있었습니다. 특히 차트 부분을 3일 정도 노력하며 만들었던 기억이 인상에 남습니다.",
      insight: "",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "PHP",
        "MySQL",
        "Photoshop",
        "Illustrator",
      ],
      stacks: [
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "PHP",
        "MySQL",
        "Photoshop",
        "Illustrator",
      ],
      deploy: "Dothome",
      image: "/img/projects/ypbooks-main.png",
      link: "/projects/ypbooks",
      siteUrl: "https://ajrqh1030.dothome.co.kr/",
      pages: [
        {
          name: "Main",
          image: null,
          previewImage: "/img/web_imgs/yeongpoong/main.png",
          externalUrl: "https://ajrqh1030.dothome.co.kr/",
        },
        {
          name: "Best",
          image: null,
          previewImage: "/img/web_imgs/yeongpoong/best.png",
          externalUrl: "https://ajrqh1030.dothome.co.kr/best.php",
        },
        { name: "Login", image: null },
        { name: "Book Detail", image: null },
        { name: "Chart", image: null },
        { name: "Board", image: null },
      ],
      planning: {
        title: "기획안",
        summary:
          "기존 서점 페이지의 정보 구조와 사용자 흐름을 다시 정리한 리디자인 기획 자료입니다.",
        image: null,
      },
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
      title: "랜딩페이지 : ON하면 혜택이 온다",
      type: "sub",
      shortLine: "Landing UI Study",
      tagline: "첫 개인 페이지로 구현 기준을 익힌 랜딩페이지",
      period: "2025.12.04 ~ 2025.12.22",
      team: "개인 프로젝트",
      description:
        "첫 개인 페이지로 부족함이 많이 보이지만, 배운 기술을 최대한 활용해서 동일하게 구현하기 위해 노력한 페이지입니다. 다양한 시선에서 볼 수 있게 되는 시작이었습니다.",
      insight: "",
      skills: ["HTML", "CSS", "Photoshop", "Illustrator"],
      stacks: ["HTML", "CSS", "Photoshop", "Illustrator"],
      deploy: "Dothome",
      image: "/img/projects/landing-main.png",
      link: "/projects/landing",
      siteUrl: "https://ajrqh10301.dothome.co.kr/",
      pages: [
        {
          name: "Main",
          image: null,
          previewImage: "/img/web_imgs/landing/main.png",
          externalUrl: "https://ajrqh10301.dothome.co.kr/",
        },
        { name: "Event", image: null },
        { name: "Benefit", image: null },
        { name: "Guide", image: null },
      ],
      planning: {
        title: "기획안",
        summary:
          "첫 개인 페이지 제작 과정에서 구조와 시각 구현 기준을 정리한 기획 자료입니다.",
        image: null,
      },
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
  ] satisfies Project[]
).sort((a, b) => getProjectOrderIndex(a) - getProjectOrderIndex(b));

const DETAIL_DEBUG_PROJECT_ID: string | null = null;

const initialDebugProject = DETAIL_DEBUG_PROJECT_ID
  ? (projects.find((project) => project.id === DETAIL_DEBUG_PROJECT_ID) ?? null)
  : null;

const projectPlaybackRate = 0.62;

const getValidPages = (project: Project | null) => {
  if (!project) {
    return [];
  }

  return project.pages.filter(
    (page) => page.image || page.previewImage || page.externalUrl,
  );
};

const getInitialPageName = (project: Project | null) =>
  getValidPages(project)[0]?.name ?? project?.pages[0]?.name ?? null;

const getStackShortLabel = (stack: string) => {
  const labelMap: Record<string, string> = {
    "React Router": "Router",
    "Redux Toolkit": "Redux",
    "Node.js": "Node",
    "Cloudflare R2": "R2",
    "OpenAI API": "OpenAI",
    "Google OAuth": "Google",
    "Kakao OAuth": "Kakao",
    "Naver OAuth": "Naver",
    Photoshop: "Ps",
    Illustrator: "Ai",
    "Bcrypt JS": "Bcrypt",
    MongoDB: "Mongo",
  };

  return labelMap[stack] ?? stack;
};

const projectRoleFallbackMap: Record<string, string> = {
  landing: "기획 / 디자인 / 구현",
  ypbooks: "기획 / 디자인 / 구현",
  mute: "기획 참여 / 로그인 / 퍼블리싱 / 라이브러리",
  goreon: "개발 담당",
  hangeul: "기획 / 디자인 / 구현",
};

const getProjectRoleText = (project: Project) =>
  project.role ||
  project.contribution ||
  projectRoleFallbackMap[project.id] ||
  project.projectNature ||
  "";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    initialDebugProject,
  );
  const [selectedPageName, setSelectedPageName] = useState<string | null>(
    getInitialPageName(initialDebugProject),
  );
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isStacksOpen, setIsStacksOpen] = useState(false);
  const [expandedSummaryProjectId, setExpandedSummaryProjectId] = useState<
    string | null
  >(null);
  const [closingSummaryProjectId, setClosingSummaryProjectId] = useState<
    string | null
  >(null);
  const [isBranchInteractive, setIsBranchInteractive] = useState(false);
  const [branchScrollProgress, setBranchScrollProgress] = useState(0);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [entryHintCycle, setEntryHintCycle] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const summaryRef = useRef<HTMLSpanElement | null>(null);
  const summaryCloseTimerRef = useRef<number | null>(null);
  const wasInProjectsViewRef = useRef(false);
  const selectedIndex = selectedProject
    ? projects.findIndex((project) => project.id === selectedProject.id)
    : 0;
  const previousProject =
    projects[(selectedIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(selectedIndex + 1) % projects.length];
  const validPages = getValidPages(selectedProject);
  const selectedPage =
    validPages.find((page) => page.name === selectedPageName) ??
    validPages[0] ??
    selectedProject?.pages[0] ??
    null;
  const previewImage = selectedPage?.previewImage ?? selectedPage?.image ?? "";
  const previewType = getProjectPreviewType(selectedProject);
  const mobilePreviewImage = getMobilePreviewImage(
    selectedProject,
    previewImage,
  );
  const previewHref = selectedPage?.externalUrl ?? null;
  const previewImageKey = selectedProject
    ? `${selectedProject.id}:${previewImage}`
    : "";
  const mobilePreviewImageKey = selectedProject
    ? `${selectedProject.id}:mobile:${mobilePreviewImage ?? ""}`
    : "";
  const selectedProjectDisplayTitle = selectedProject
    ? getProjectDisplayTitle(selectedProject)
    : "";
  const isLongKoreanTitle =
    selectedProject?.id === "ypbooks" || selectedProject?.id === "hangeul";
  const currentProjectNumber = selectedProject
    ? String(selectedIndex + 1).padStart(2, "0")
    : "";
  const totalProjectNumber = String(projects.length).padStart(2, "0");
  const isSummaryExpanded = selectedProject
    ? expandedSummaryProjectId === selectedProject.id
    : false;
  const isSummaryClosing = selectedProject
    ? closingSummaryProjectId === selectedProject.id
    : false;
  const summaryState = isSummaryClosing
    ? "closing"
    : isSummaryExpanded
      ? "expanded"
      : "collapsed";
  const pagePreviewLimit = selectedProject?.planning ? 5 : 6;
  const visiblePages = validPages.slice(0, pagePreviewLimit);
  const overflowPages = validPages.slice(pagePreviewLimit);
  const hiddenPageCount = selectedProject
    ? Math.max(validPages.length - visiblePages.length, 0)
    : 0;
  const stackPreviewLimit = 6;
  const shownStacks = selectedProject?.stacks.slice(0, stackPreviewLimit) ?? [];
  const overflowStacks = selectedProject?.stacks.slice(stackPreviewLimit) ?? [];
  const hiddenStackCount = overflowStacks.length;
  const pageListItemCount =
    (selectedProject?.planning ? 1 : 0) + visiblePages.length;
  const stackListItemCount = shownStacks.length;
  const clearSummaryCloseTimer = () => {
    if (summaryCloseTimerRef.current !== null) {
      window.clearTimeout(summaryCloseTimerRef.current);
      summaryCloseTimerRef.current = null;
    }
  };

  const resetSummaryState = () => {
    clearSummaryCloseTimer();
    setExpandedSummaryProjectId(null);
    setClosingSummaryProjectId(null);
  };

  const handleSummaryToggle = (projectId: string) => {
    if (closingSummaryProjectId === projectId) {
      clearSummaryCloseTimer();
      setClosingSummaryProjectId(null);
      setExpandedSummaryProjectId(projectId);
      return;
    }

    if (expandedSummaryProjectId === projectId) {
      clearSummaryCloseTimer();
      setClosingSummaryProjectId(projectId);
      summaryCloseTimerRef.current = window.setTimeout(() => {
        setExpandedSummaryProjectId((currentProjectId) =>
          currentProjectId === projectId ? null : currentProjectId,
        );
        setClosingSummaryProjectId((currentProjectId) =>
          currentProjectId === projectId ? null : currentProjectId,
        );
        summaryCloseTimerRef.current = null;
      }, 620);
      return;
    }

    clearSummaryCloseTimer();
    setExpandedSummaryProjectId(projectId);
    setClosingSummaryProjectId(null);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedPageName(getInitialPageName(project));
    setIsPlanningOpen(false);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    resetSummaryState();
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
    setIsPlanningOpen(false);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    resetSummaryState();
  };

  const handlePlanningClick = () => {
    setIsPlanningOpen(true);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    resetSummaryState();
  };

  const handlePageClick = (pageName: string) => {
    setSelectedPageName(pageName);
    setIsPlanningOpen(false);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    resetSummaryState();
  };

  useEffect(() => {
    return () => {
      clearSummaryCloseTimer();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInProjects =
          entry.isIntersecting && entry.intersectionRatio >= 0.35;

        setIsBranchInteractive(isInProjects);

        if (entry.isIntersecting && !wasInProjectsViewRef.current) {
          wasInProjectsViewRef.current = true;
          setEntryHintCycle((cycle) => cycle + 1);
          return;
        }

        if (!entry.isIntersecting) {
          wasInProjectsViewRef.current = false;
          setIsBranchInteractive(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );

    if (!section || !scrollContainer) {
      return;
    }

    let frameId: number | null = null;
    let lastProgress = -1;

    const syncBranchProgress = () => {
      frameId = null;

      const viewportHeight =
        scrollContainer.clientHeight || window.innerHeight || 1;
      const projectsTop = section.getBoundingClientRect().top;
      const rawProgress = Math.min(
        1,
        Math.max(0, 1 - projectsTop / viewportHeight),
      );
      const normalizedProgress = Math.min(
        1,
        Math.max(0, (rawProgress - 0.04) / 0.96),
      );
      const nextProgress = 1 - Math.pow(1 - normalizedProgress, 2);

      if (Math.abs(nextProgress - lastProgress) < 0.003) {
        return;
      }

      lastProgress = nextProgress;
      setBranchScrollProgress(nextProgress);
    };

    const scheduleSync = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(syncBranchProgress);
    };

    scheduleSync();
    scrollContainer.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      scrollContainer.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, []);

  useEffect(() => {
    const video = backgroundVideoRef.current;

    if (!video) {
      return;
    }

    video.playbackRate = projectPlaybackRate;
    void video.play();
  }, []);

  useEffect(() => {
    if (!isPlanningOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPlanningOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlanningOpen]);

  useEffect(() => {
    const summary = summaryRef.current;

    const measure = () => {
      if (!summary) {
        setIsDescriptionOverflowing(false);
        return;
      }

      const computedStyle = window.getComputedStyle(summary);
      const lineHeight = Number.parseFloat(computedStyle.lineHeight);
      const collapsedHeight = lineHeight * 2;

      setIsDescriptionOverflowing(summary.scrollHeight > collapsedHeight + 2);
    };

    const frame = window.requestAnimationFrame(measure);

    if (!summary) {
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(summary);
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selectedProject?.id, selectedProject?.description]);

  const previewContent = selectedProject ? (
    brokenImages[previewImageKey] || !previewImage ? (
      <span className={styles.previewFallback}>
        {selectedProjectDisplayTitle}
      </span>
    ) : (
      <div className={styles.previewMedia} data-preview-type={previewType}>
        {previewType === "responsive" && previewHref ? (
          <a
            className={styles.previewImageLink}
            href={previewHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${selectedPage?.name ?? selectedProject.title} desktop preview open in new tab`}
          >
            <Image
              key={previewImage}
              className={styles.previewImage}
              src={previewImage}
              alt={`${selectedProject.title} ${selectedPage?.name ?? "main"} screen`}
              width={960}
              height={600}
              sizes="(max-width: 900px) calc(100vw - 64px), 560px"
              onError={() =>
                setBrokenImages((current) => ({
                  ...current,
                  [previewImageKey]: true,
                }))
              }
            />
          </a>
        ) : (
          <Image
            key={previewImage}
            className={styles.previewImage}
            src={previewImage}
            alt={`${selectedProject.title} ${selectedPage?.name ?? "main"} screen`}
            width={960}
            height={600}
            sizes="(max-width: 900px) calc(100vw - 64px), 560px"
            onError={() =>
              setBrokenImages((current) => ({
                ...current,
                [previewImageKey]: true,
              }))
            }
          />
        )}
        {previewType === "responsive" &&
        mobilePreviewImage &&
        !brokenImages[mobilePreviewImageKey] ? (
          previewHref ? (
            <a
              className={styles.previewMobileImageLink}
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${selectedProject.title} ${selectedPage?.name ?? "main"} mobile preview open in new tab`}
            >
              <Image
                key={mobilePreviewImage}
                className={styles.previewMobileImage}
                src={mobilePreviewImage}
                alt={`${selectedProject.title} ${selectedPage?.name ?? "main"} mobile screen`}
                width={360}
                height={720}
                sizes="120px"
                onError={() =>
                  setBrokenImages((current) => ({
                    ...current,
                    [mobilePreviewImageKey]: true,
                  }))
                }
              />
            </a>
          ) : (
            <Image
              key={mobilePreviewImage}
              className={styles.previewMobileImage}
              src={mobilePreviewImage}
              alt={`${selectedProject.title} ${selectedPage?.name ?? "main"} mobile screen`}
              width={360}
              height={720}
              sizes="120px"
              onError={() =>
                setBrokenImages((current) => ({
                  ...current,
                  [mobilePreviewImageKey]: true,
                }))
              }
            />
          )
        ) : null}
      </div>
    )
  ) : null;

  const previewFrame = selectedProject ? (
    <div className={styles.previewFrame}>
      {previewHref && previewType !== "responsive" ? (
        <a
          className={styles.previewLink}
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${selectedPage?.name ?? selectedProject.title} preview open in new tab`}
        >
          {previewContent}
        </a>
      ) : (
        <div
          className={styles.previewLink}
          data-clickable="false"
          aria-label={`${selectedPage?.name ?? selectedProject.title} preview`}
        >
          {previewContent}
        </div>
      )}
    </div>
  ) : null;

  const detailPanel = selectedProject ? (
    <article className={styles.detailPanel} aria-live="polite">
      <div className={styles.detailContent}>
        <div className={styles.numberRow}>
          <p className={styles.projectNumber}>
            <span className={styles.currentNumber}>{currentProjectNumber}</span>
            <span className={styles.numberSlash}>/</span>
            <span className={styles.totalNumber}>{totalProjectNumber}</span>
          </p>
          <button
            className={styles.detailCloseButton}
            type="button"
            onClick={handleCloseDetail}
            aria-label="프로젝트 닫기"
          >
            <svg
              className={styles.detailCloseIcon}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.5 6.5 17.5 17.5" />
              <path d="m17.5 6.5-11 11" />
            </svg>
          </button>
        </div>
        <div className={styles.titleRow}>
          <h3
            className={`${styles.detailTitle} ${
              isLongKoreanTitle ? styles.detailTitleKoreanLong : ""
            }`}
          >
            {selectedProjectDisplayTitle}
          </h3>
        </div>
        <div className={styles.taglineRow}>
          <p className={styles.detailTagline}>{selectedProject.tagline}</p>
        </div>
        <div className={styles.metaRow}>
          <ul className={styles.detailMetaList}>
            {selectedProject.period ? <li>{selectedProject.period}</li> : null}
            {selectedProject.team ? <li>{selectedProject.team}</li> : null}
            <li>{getProjectRoleText(selectedProject)}</li>
          </ul>
        </div>
        <div className={styles.summaryRow} data-summary-state={summaryState}>
          <div className={styles.summaryBox} data-summary-state={summaryState}>
            <button
              type="button"
              className={styles.summaryToggleButton}
              onClick={() => handleSummaryToggle(selectedProject.id)}
              aria-expanded={summaryState === "expanded"}
            >
              <span
                ref={summaryRef}
                className={styles.detailSummary}
                data-summary-state={summaryState}
                data-overflowing={isDescriptionOverflowing ? "true" : "false"}
              >
                {selectedProject.description}
              </span>
            </button>
          </div>
          <div className={styles.summaryNavControls}>
            <button
              type="button"
              className={`${styles.previewSideNav} ${styles.previewSideNavPrev}`}
              onClick={() => selectProject(previousProject)}
              aria-label="이전 프로젝트 보기"
            />
            <button
              type="button"
              className={`${styles.previewSideNav} ${styles.previewSideNavNext}`}
              onClick={() => selectProject(nextProject)}
              aria-label="다음 프로젝트 보기"
            />
          </div>
        </div>
        <div className={styles.mediaRow} data-summary-state={summaryState}>
          <div className={styles.detailMediaArea}>{previewFrame}</div>
        </div>
        <div
          className={styles.bottomInfo}
          data-expanded-type={
            isPagesOpen ? "pages" : isStacksOpen ? "stacks" : "none"
          }
        >
          <div className={styles.detailMetaArea}>
            {isPlanningOpen ? (
              <div className={styles.planningInlinePanel}>
                <p className={styles.planningInlineEyebrow}>
                  {selectedProject.planning?.title}
                </p>
                <p>{selectedProject.planning?.summary}</p>
                {selectedProject.planning?.image ? (
                  <Image
                    className={styles.planningInlineImage}
                    src={selectedProject.planning.image}
                    alt={`${selectedProject.title} planning document`}
                    width={1200}
                    height={800}
                    sizes="(max-width: 900px) calc(100vw - 64px), 480px"
                  />
                ) : null}
                <button
                  type="button"
                  className={styles.planningInlineClose}
                  onClick={() => setIsPlanningOpen(false)}
                >
                  닫기
                </button>
              </div>
            ) : (
              <>
                <section
                  className={styles.pagesBlock}
                  data-expanded={isPagesOpen ? "true" : "false"}
                  aria-label="project pages"
                >
                  <div className={styles.pagesHeader}>
                    <h4>Pages</h4>
                  </div>
                  <div
                    className={styles.pagesContent}
                    data-expanded={isPagesOpen ? "true" : "false"}
                  >
                    <div className={styles.inlineOverflowRow}>
                      <ul className={styles.pageQuickList}>
                        {selectedProject.planning ? (
                          <li
                            className={styles.pageListItem}
                            data-last={
                              pageListItemCount === 1 ? "true" : "false"
                            }
                          >
                            <button
                              type="button"
                              className={styles.pageTextButton}
                              onClick={handlePlanningClick}
                            >
                              {selectedProject.planning.title}
                            </button>
                            {pageListItemCount > 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ) : null}
                        {visiblePages.map((page, index) => {
                          const itemIndex =
                            (selectedProject.planning ? 1 : 0) + index;

                          return (
                            <li
                              key={page.name}
                              className={styles.pageListItem}
                              data-last={
                                itemIndex === pageListItemCount - 1
                                  ? "true"
                                  : "false"
                              }
                            >
                              <button
                                type="button"
                                className={styles.pageTextButton}
                                data-active={selectedPage?.name === page.name}
                                onClick={() => handlePageClick(page.name)}
                              >
                                {page.name}
                              </button>
                              {itemIndex < pageListItemCount - 1 ? (
                                <span className={styles.inlineSeparator}>
                                  /
                                </span>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                      {hiddenPageCount > 0 ? (
                        <button
                          type="button"
                          className={styles.overflowMoreButton}
                          onClick={() => {
                            setIsPagesOpen((value) => !value);
                            setIsStacksOpen(false);
                          }}
                        >
                          {isPagesOpen
                            ? `-${hiddenPageCount}`
                            : `+${hiddenPageCount}`}
                        </button>
                      ) : null}
                    </div>
                    <div
                      className={styles.expandedOverflowShell}
                      data-expanded={isPagesOpen ? "true" : "false"}
                    >
                      <ul className={styles.expandedOverflowList}>
                        {overflowPages.map((page, index) => (
                          <li
                            key={page.name}
                            className={styles.pageListItem}
                            data-last={
                              index === overflowPages.length - 1
                                ? "true"
                                : "false"
                            }
                          >
                            <button
                              type="button"
                              className={styles.pageTextButton}
                              data-active={selectedPage?.name === page.name}
                              onClick={() => handlePageClick(page.name)}
                            >
                              {page.name}
                            </button>
                            {index < overflowPages.length - 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section
                  className={styles.detailStacks}
                  data-expanded={isStacksOpen ? "true" : "false"}
                  aria-label="project tech stack"
                >
                  <h4>STACK</h4>

                  <div
                    className={styles.stackContent}
                    data-expanded={isStacksOpen ? "true" : "false"}
                  >
                    <div className={styles.inlineOverflowRow}>
                      <ul
                        className={styles.stackIconList}
                        title={selectedProject.stacks.join(" / ")}
                      >
                        {shownStacks.map((stack, index) => (
                          <li
                            key={stack}
                            className={styles.stackTextItem}
                            data-last={
                              index === stackListItemCount - 1
                                ? "true"
                                : "false"
                            }
                            title={stack}
                          >
                            {getStackShortLabel(stack)}
                            {index < stackListItemCount - 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                      {hiddenStackCount > 0 ? (
                        <button
                          type="button"
                          className={styles.overflowMoreButton}
                          onClick={() => {
                            setIsPagesOpen(false);
                            setIsStacksOpen((value) => !value);
                          }}
                        >
                          {isStacksOpen
                            ? `-${hiddenStackCount}`
                            : `+${hiddenStackCount}`}
                        </button>
                      ) : null}
                    </div>
                    <div
                      className={styles.expandedOverflowShell}
                      data-expanded={isStacksOpen ? "true" : "false"}
                    >
                      <ul
                        className={styles.expandedOverflowList}
                        title={overflowStacks.join(" / ")}
                      >
                        {overflowStacks.map((stack, index) => (
                          <li
                            key={stack}
                            className={styles.stackTextItem}
                            data-last={
                              index === overflowStacks.length - 1
                                ? "true"
                                : "false"
                            }
                            title={stack}
                          >
                            {getStackShortLabel(stack)}
                            {index < overflowStacks.length - 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
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
      data-detail-open={selectedProject ? "true" : "false"}
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
      </div>

      <ProjectBranchScene
        branchScrollProgress={branchScrollProgress}
        entryHintCycle={entryHintCycle}
        isInteractive={isBranchInteractive}
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={selectProject}
        onCloseDetail={handleCloseDetail}
      />
    </section>
  );
}

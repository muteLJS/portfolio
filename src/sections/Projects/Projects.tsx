"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";

import ProjectBranchScene from "./ProjectBranchScene";
import type { Project } from "./ProjectBranchScene";
import styles from "./Projects.module.css";

const getProjectDisplayTitle = (project: Project) => project.title;

const getPageDisplayName = (project: Project, pageName: string) =>
  project.id === "hangeul" && pageName === "Main" ? "메인 화면" : pageName;

const subscribeToDesktopDetail = (onChange: () => void) => {
  const query = window.matchMedia("(min-width: 641px)");
  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
};

const getDesktopDetailSnapshot = () =>
  window.matchMedia("(min-width: 641px)").matches;

const getDesktopDetailServerSnapshot = () => false;

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
      title: "MUTE",
      type: "main",
      shortLine: "AI Music Platform",
      tagline: "다양한 탐색 방식과 이용 편의성을 고려한 음악 서비스",
      period: "2026.02.03 ~ 2026.03.20",
      team: "팀 프로젝트 / 3인",
      role: "기획안 PPT 제작 약 90%\n주요 화면 개발",
      contribution:
        "Naver 로그인 / Kakao 로그인 / Google 로그인 / AI 채팅 / 음악 데이터 연동 / 이미지 관리 / DB 연동",
      description: "",
      highlights: [
        {
          label: "문제",
          text: "사용자마다 다른\n음악 탐색 방식과 입력의 편의성",
        },
        {
          label: "접근",
          text: "차트·검색 등 탐색 경로 구성\n음성 AI 비서 기획",
        },
        {
          label: "역할",
          text: "기획안 PPT 제작 약 90%\n주요 화면 개발",
        },
      ],
      designIntent: [
        { title: "서로 다른 탐색 방식", text: "새로운 음악을 찾아 듣는 사용자와 익숙한 음악을 간편하게 듣고 싶은 사용자를 구분했습니다. 각자의 방식으로 음악을 찾을 수 있도록 차트·검색·추천을 함께 구성했습니다." },
        { title: "입력 부담을 줄이는 방법", text: "타이핑보다 음성이 편한 사용자도 이용할 수 있도록, 말로 음악을 찾고 도움받는 AI 비서를 기획했습니다. 음성 기능은 구현하지 못했으며, 실제 채팅은 선택지를 통한 일부 검색으로 구현했습니다." },
        { title: "기획을 화면으로 구체화", text: "사용자 유형과 참고 서비스 분석을 바탕으로 메뉴 구조·이용 흐름·화면과 기능을 기획안으로 정리했습니다. 기획안 작성을 주도하고, 메인 일부·아티스트·재생·라이브러리 화면 개발에 참여했습니다." },
      ],
      insight: "음악 서비스의 편리함은 사용자가 자신의 취향으로 자연스럽게 이동하는 흐름에서 만들어진다고 생각합니다.",
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
        pdfUrl: "/ppts/mute_ppt.pdf",
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
      tagline: "사용 목적과 예산을 바탕으로 상품 선택을 돕는 쇼핑 서비스",
      period: "2026.03.30 ~ 2026.04.30",
      team: "팀 프로젝트 / 5인",
      role: "개발팀장·메인 페이지 개발\n추천 조건 우선순위 제안",
      contribution:
        "GitHub 세팅 / 프로젝트 초기 세팅 / 라우터 구조 설정 / 공통 레이아웃 구성 / 헤더·푸터 / 메인 페이지 / 검색창·네비바 / 로그인 기능 / 배포 / 반응형 구현 / 기획 일부 참여 / 견적 리스트 페이지 디자인 / 조립 견적 페이지 디자인",
      description: "",
      highlights: [
        {
          label: "문제",
          text: "복잡한 상품 정보 속\n나에게 맞는 선택 기준의 어려움",
        },
        {
          label: "접근",
          text: "자연어로 조건을 입력하고\n추천 상품을 살펴보는 흐름",
        },
        {
          label: "역할",
          text: "개발팀장·메인 페이지 개발\n추천 조건 우선순위 제안",
        },
      ],
      designIntent: [
        { title: "사용자의 조건에서 시작", text: "팀은 사양을 잘 모르는 사용자도 원하는 제품을 찾을 수 있도록 자연어 기반 탐색을 구성했습니다. 사용 목적과 예산을 입력하고, 추천 결과에서 상품 상세 정보로 이어지는 흐름입니다." },
        { title: "추천 조건의 우선순위", text: "여러 조건이 섞인 요청에서 무엇을 먼저 반영할지 고민했습니다. 가격 조건을 먼저 고려하는 방향을 제안하고, 팀원과 논의하며 상품 종류·세부 키워드의 적용 순서를 구체화했습니다." },
        { title: "역할을 나누고 결과를 점검", text: "개발팀장으로 메인 페이지 개발을 맡았습니다. AI 입력·결과 화면과 조건 해석·추천 로직은 담당 팀원이 구현했으며, 추천 결과가 요청 조건에 맞는지 함께 점검했습니다." },
      ],
      insight: "복잡한 커머스 서비스일수록 사용자가 먼저 결정할 수 있는 흐름이 중요하다고 생각합니다.",
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
        pdfUrl: "/ppts/goreon_PPT.pdf",
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
      tagline: "내 생각을 글로 쓰고, 내 뜻에 맞게 다듬는 한국어 글쓰기 서비스",
      period: "2026.05.01 ~ 진행 중",
      team: "개인 프로젝트",
      projectNature:
        "에듀테크 서비스 / 글쓰기 성장 서비스 / 개인 기준 기반 학습 플랫폼",
      role: "기획 / 디자인 / 구현",
      description: "글에 점수를 매기지 않고, 쓴 사람이 원하는 표현을 찾도록 조언합니다.",
      highlights: [
        {
          label: "문제",
          text: "쓰고 싶은 말보다 점수를 먼저 의식하는 글쓰기",
        },
        {
          label: "접근",
          text: "조언을 읽고, 고칠지는 쓴 사람이 선택",
        },
        {
          label: "역할",
          text: "서비스 기획부터 화면 설계·구현까지 담당",
        },
      ],
      designIntent: [
        {
          title: "쓰면서 알게 되는 마음",
          text: "저도 힘든데 무엇이 힘든지 설명하기 어려운 때가 있었습니다. 그 경험에서 ‘답을 듣기 전에, 내가 하고 싶은 말부터 써 볼 수는 없을까?’라는 질문이 생겼습니다. 한-글은 아직 정리되지 않은 생각도 자기 말로 써 볼 수 있는 공간으로 기획했습니다.",
        },
        {
          title: "글의 가치는 누가 정할까",
          text: "누군가에게 100점인 글이 다른 사람에게는 10점일 수 있습니다. 같은 글도 시간이 흐르고 시대가 달라지면 다르게 읽힙니다. 글쓰기를 배우는 공간이라 해도, 앱이 하나의 점수로 그 글의 가치를 정할 수는 없다고 생각했습니다.",
        },
        {
          title: "어디까지 고칠지는 쓴 사람의 몫",
          text: "한-글에서 조언의 목적은 더 높은 점수를 받는 문장을 만드는 것이 아닙니다. 쓴 사람이 ‘내가 하고 싶었던 말이 이게 맞나?’ 하고 돌아볼 수 있도록 돕는 것입니다. 표현을 바꿀지, 처음 쓴 문장 그대로 남길지는 사용자가 정하도록 기획했습니다.",
        },
      ],
      insight: "",
      skills: [],
      stacks: [],
      image: "/img/han-geul_beta_img/main.png",
      link: "/projects/hangeul",
      pages: [
        {
          name: "Main",
          image: null,
          previewImage: "/img/han-geul_beta_img/main.png",
        },
        { name: "Writing", image: null },
        { name: "Feedback", image: null },
        { name: "Growth", image: null },
        { name: "My Page", image: null },
      ],
      planning: {
        title: "기획안",
        summary:
          "AI 시대에 직접 읽고 생각해 쓰는 사고 능력을 보완하기 위한 에듀테크 서비스 기획 자료입니다.",
        pdfUrl: "/ppts/한글_서비스기획안_v4_final.pdf",
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
      tagline: "읽을 책을 찾는 과정을 고려한 온라인 서점",
      period: "2025.12.26 ~ 2026.02.02",
      team: "개인 프로젝트",
      description:
        "기존 영풍문고 페이지를 보고, 사용자들이 불편함을 느끼거나 기존의 획일화된 틀을 사용하는 것이 아닌 다양한 페이지들과 레이아웃을 참고하여 저만의 기준으로 한 단계 성장시킨 페이지입니다. 두 번째 작업물로, 이전과 다르게 JavaScript와 jQuery를 활용하여 한결 더 동적인 페이지를 만들 수 있었습니다. 특히 차트 부분을 3일 정도 노력하며 만들었던 기억이 인상에 남습니다.",
      highlights: [
        {
          label: "문제",
          text: "읽을 책이 정해지지 않은\n사용자의 탐색 방법 고민",
        },
        {
          label: "접근",
          text: "첫 화면 상단에\n관심 조건별 도서 탐색 배치",
        },
        {
          label: "역할",
          text: "개인 프로젝트\n기획·디자인·개발 전 과정",
        },
      ],
      designIntent: [
        { title: "사용자 가정", text: "읽을 책이 정해지지 않은 사용자도 탐색을 시작할 수 있어야 한다고 생각했습니다." },
        { title: "배치 판단", text: "책 제목을 몰라도 관심 조건으로 탐색할 수 있도록, 조건 선택 영역을 첫 화면 상단에 배치했습니다." },
        { title: "익숙함 유지", text: "다른 온라인 서점의 메뉴와 도서 소개 구성을 참고해, 새로운 기능도 익숙한 흐름 안에서 이용하도록 구성했습니다." },
      ],
      insight: "리디자인은 사용자가 처음부터 편하게 탐색할 수 있는 순서를 다시 만드는 일이라고 생각합니다.",
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
      title: "URFit",
      type: "sub",
      shortLine: "AI Wardrobe",
      tagline: "내 옷으로 코디를 추천받고, 갈아입기 전에 내 모습으로 비교하는 AI 옷장",
      period: "2026.06–07",
      team: "4인 해커톤",
      description: "",
      highlights: [
        {
          label: "문제",
          text: "출근이나 약속을 앞두고 옷을 고르며 여러 번 갈아입는 수고",
        },
        {
          label: "접근",
          text: "내 옷으로 코디를 추천받고, 착용 모습을 비교한 뒤 룩 저장",
        },
        {
          label: "역할",
          text: "서비스 기획 전반 담당 · 서비스 문구는 팀과 공동 결정",
        },
      ],
      designIntent: [
        {
          title: "옷을 고르는 시간과 갈아입는 수고",
          text: "출근 전이나 중요한 약속 전날에는 입을 옷을 골라 놓고도 조합이 마음에 들지 않아 다시 갈아입곤 합니다. 저는 옷을 고르는 시간뿐 아니라, 여러 벌을 직접 입고 벗는 수고도 줄이고 싶었습니다.",
        },
        {
          title: "추천은 후보를 좁히고, 피팅은 결정을 돕도록",
          text: "추천만으로는 그 조합이 내게 어떻게 보일지 판단하기 어렵습니다. 그래서 내 옷장에서 코디를 추천받거나 직접 고른 뒤, 내 사진으로 착용 모습을 비교하는 흐름을 기획했습니다. 마음에 든 조합은 저장해 다음 약속 때도 꺼내 볼 수 있도록 했습니다.",
        },
        {
          title: "다시 검증하고 싶은 것",
          text: "해커톤에서는 추천과 가상 피팅을 구현하는 데 집중했습니다. 돌아보면 옷을 등록하고 결과를 기다리는 시간까지 포함해 실제로 준비가 쉬워졌는지는 확인하지 못했습니다. 다시 기획한다면 평소 방식과 비교해 옷을 결정하는 시간과 실제로 갈아입은 횟수를 함께 확인하겠습니다.",
        },
      ],
      insight: "",
      skills: [],
      stacks: [],
      image: "",
      link: "/projects/urfit",
      siteUrl: "https://urfit-ljs.vercel.app/",
      pages: [],
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
  const isDesktopDetailViewport = useSyncExternalStore(
    subscribeToDesktopDetail,
    getDesktopDetailSnapshot,
    getDesktopDetailServerSnapshot,
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    initialDebugProject,
  );
  const [selectedPageName, setSelectedPageName] = useState<string | null>(
    getInitialPageName(initialDebugProject),
  );
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<{
    alt: string;
    height: number;
    src: string;
    width: number;
  } | null>(null);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isStacksOpen, setIsStacksOpen] = useState(false);
  const [pagePreviewLimit, setPagePreviewLimit] = useState<number | null>(
    null,
  );
  const [isDesignIntentOpen, setIsDesignIntentOpen] = useState(false);
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
  const [expandedOverflowHeights, setExpandedOverflowHeights] = useState({
    pages: 0,
    stacks: 0,
  });
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [entryHintCycle, setEntryHintCycle] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailPanelRef = useRef<HTMLElement | null>(null);
  const detailScrollRef = useRef<HTMLDivElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const summaryRef = useRef<HTMLSpanElement | null>(null);
  const pagesOverflowRef = useRef<HTMLDivElement | null>(null);
  const stacksOverflowRef = useRef<HTMLDivElement | null>(null);
  const pagesContentRef = useRef<HTMLDivElement | null>(null);
  const pageMeasureRef = useRef<HTMLDivElement | null>(null);
  const pageMoreMeasureRef = useRef<HTMLSpanElement | null>(null);
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
  const isBookstoreDetail = selectedProject?.id === "ypbooks";
  const isUnifiedDetail =
    selectedProject?.id === "ypbooks" ||
    selectedProject?.id === "mute" ||
    selectedProject?.id === "goreon" ||
    selectedProject?.id === "landing" ||
    (selectedProject?.id === "hangeul" && isDesktopDetailViewport);
  const shouldShowStacks =
    selectedProject?.id !== "hangeul" && (selectedProject?.stacks.length ?? 0) > 0;
  const shouldShowProjectPreview =
    selectedProject?.id !== "landing" || Boolean(previewImage);
  const showBookstoreAnnotation = isBookstoreDetail && selectedPage?.name === "Main" && !brokenImages[previewImageKey];

  useEffect(() => {
    const panel = detailPanelRef.current;
    if (!isBookstoreDetail || !panel) return;

    if (detailScrollRef.current) detailScrollRef.current.scrollTop = 0;
    panel.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    // On a narrow screen the unchanged branch sits above the detail.
    const frame = window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        const container = document.querySelector<HTMLElement>("[data-scroll-container='true']");
        if (container) {
          container.scrollTo({
            top: container.scrollTop + panel.getBoundingClientRect().top - container.getBoundingClientRect().top - 112,
            behavior: "smooth",
          });
        }
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isBookstoreDetail]);

  const handleBookstoreKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    const panel = detailPanelRef.current;
    const content = detailScrollRef.current;
    if (!panel || !content) return;

    // The next DOM section is Contact; keep Tab from scrolling there just to focus a link.
    // Navigation stays reachable without trapping focus in this non-modal detail.
    if (event.key === "Tab") {
      const controls = Array.from(panel.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex="0"]',
      )).filter((element) => element.getClientRects().length > 0);
      const boundary = event.shiftKey ? controls[0] : controls.at(-1);
      if (document.activeElement === boundary) {
        const navigation = document.querySelector<HTMLElement>('header nav button');
        if (navigation) {
          event.preventDefault();
          navigation.focus({ preventScroll: true });
        }
      }
      return;
    }

    // Scroll keys reach OneScrollController, which scrolls this detail region
    // first and only changes section once the region has reached its edge.
  };
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
  const hasPlanningDocument = Boolean(selectedProject?.planning?.pdfUrl);
  const shouldShowPages = hasPlanningDocument || validPages.length > 0;
  const resolvedPagePreviewLimit = Math.min(
    pagePreviewLimit ?? validPages.length,
    validPages.length,
  );
  const visiblePages = validPages.slice(0, resolvedPagePreviewLimit);
  const overflowPages = validPages.slice(resolvedPagePreviewLimit);
  const hiddenPageCount = selectedProject
    ? Math.max(validPages.length - visiblePages.length, 0)
    : 0;
  const stackPreviewLimit = 6;
  const shownStacks = selectedProject?.stacks.slice(0, stackPreviewLimit) ?? [];
  const overflowStacks = selectedProject?.stacks.slice(stackPreviewLimit) ?? [];
  const hiddenStackCount = overflowStacks.length;
  const pageListItemCount =
    (hasPlanningDocument ? 1 : 0) + visiblePages.length;
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
    if (isBookstoreDetail && project.id !== "ypbooks") {
      const container = document.querySelector<HTMLElement>("[data-scroll-container='true']");
      if (container && sectionRef.current && container.scrollTop > sectionRef.current.offsetTop) {
        container.scrollTo({ top: sectionRef.current.offsetTop, behavior: "instant" });
      }
    }
    setIsDesignIntentOpen(false);
    setSelectedProject(project);
    setSelectedPageName(getInitialPageName(project));
    setIsPlanningOpen(false);
    setImagePreview(null);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    setPagePreviewLimit(null);
    resetSummaryState();
  };

  const togglePagesList = () => {
    setIsStacksOpen(false);
    setIsPagesOpen((value) => !value);
  };

  const handleCloseDetail = () => {
    if (isBookstoreDetail) {
      document.querySelector<HTMLButtonElement>(
        'button[aria-label="영풍문고 리디자인 프로젝트 보기"]',
      )?.focus({ preventScroll: true });
    }
    if (isBookstoreDetail) {
      const container = document.querySelector<HTMLElement>("[data-scroll-container='true']");
      container?.scrollTo({ top: sectionRef.current?.offsetTop ?? 0, behavior: "instant" });
    }
    setSelectedProject(null);
    setIsDesignIntentOpen(false);
    setIsPlanningOpen(false);
    setImagePreview(null);
    setIsPagesOpen(false);
    setIsStacksOpen(false);
    resetSummaryState();
  };

  const handlePlanningClick = () => {
    if (!selectedProject?.planning?.pdfUrl) {
      return;
    }

    setIsPlanningOpen(true);
  };

  const handlePageClick = (pageName: string) => {
    setSelectedPageName(pageName);
    setIsPlanningOpen(false);
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
          entry.isIntersecting && entry.intersectionRect.height >= Math.min(entry.boundingClientRect.height, window.innerHeight) * 0.35;

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
      { threshold: Array.from({ length: 21 }, (_, index) => index / 20) },
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
    if (!imagePreview) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImagePreview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imagePreview]);

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

  useEffect(() => {
    const measure = () => {
      const pages = Math.ceil(pagesOverflowRef.current?.scrollHeight ?? 0);
      const stacks = Math.ceil(stacksOverflowRef.current?.scrollHeight ?? 0);

      setExpandedOverflowHeights((current) =>
        current.pages === pages && current.stacks === stacks
          ? current
          : { pages, stacks },
      );
    };

    const frame = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);

    // Watch the lists themselves too: while a shell is collapsed its own box
    // does not change when the list rewraps (font load, active weight).
    for (const shell of [pagesOverflowRef.current, stacksOverflowRef.current]) {
      if (!shell) continue;
      observer.observe(shell);
      if (shell.firstElementChild) observer.observe(shell.firstElementChild);
    }

    void document.fonts.ready.then(measure).catch(() => undefined);
    window.addEventListener("resize", measure);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selectedProject?.id, overflowPages.length, overflowStacks.length]);

  useEffect(() => {
    const content = pagesContentRef.current;
    const measureRoot = pageMeasureRef.current;

    if (!content || !measureRoot) {
      return;
    }

    const measure = () => {
      const list = measureRoot.querySelector<HTMLElement>("ul");
      const row = content.firstElementChild as HTMLElement | null;

      if (!list || !row) {
        return;
      }

      // Right edge of every label (planning first), measured from a hidden copy
      // of the list that uses the live classes: same font size, weight,
      // active state and separators as the row the visitor sees.
      const origin = list.getBoundingClientRect().left;
      const labelEdges = Array.from(
        list.querySelectorAll<HTMLElement>('[data-page-measure="label"]'),
      ).map((label) => label.getBoundingClientRect().right - origin);
      const planningCount = hasPlanningDocument ? 1 : 0;
      const moreWidth =
        pageMoreMeasureRef.current?.getBoundingClientRect().width ?? 0;
      const rowGap =
        Number.parseFloat(window.getComputedStyle(row).columnGap) || 0;

      const fitCount = (available: number) => {
        let count = 0;

        for (const edge of labelEdges) {
          if (edge > available + 0.5) break;
          count += 1;
        }

        return Math.max(0, count - planningCount);
      };

      const available = row.clientWidth;
      let nextLimit = fitCount(available);

      if (nextLimit < labelEdges.length - planningCount) {
        nextLimit = fitCount(Math.max(0, available - moreWidth - rowGap));
      }

      setPagePreviewLimit((current) =>
        current === nextLimit ? current : nextLimit,
      );
    };

    const frame = window.requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    void document.fonts.ready.then(measure).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [
    hasPlanningDocument,
    selectedProject?.id,
    validPages.length,
    selectedPage?.name,
  ]);

  const getExpandedOverflowStyle = (height: number) =>
    ({
      "--expanded-overflow-height": `${height}px`,
    }) as CSSProperties;

  const previewContent = selectedProject ? (
    brokenImages[previewImageKey] || !previewImage ? (
      <span className={styles.previewFallback}>
        {selectedProjectDisplayTitle}
      </span>
    ) : (
      <div
        className={styles.previewMedia}
        data-preview-type={previewType}
        data-project-id={selectedProject.id}
      >
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
        ) : selectedProject.id === "hangeul" ? (
          <button
            type="button"
            className={styles.previewZoomButton}
            onClick={() =>
              setImagePreview({
                src: previewImage,
                alt: `${selectedProject.title} ${selectedPage?.name ?? "main"} screen`,
                width: 941,
                height: 1672,
              })
            }
            aria-label={`${selectedProject.title} ${selectedPage?.name ?? "main"} 이미지 확대`}
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
          </button>
        ) : (
          <Image
            key={previewImage}
            className={styles.previewImage}
            src={previewImage}
            alt={`${selectedProject.title} ${selectedPage?.name ?? "main"} screen`}
            width={960}
            height={600}
            unoptimized={isBookstoreDetail}
            sizes={isBookstoreDetail ? "(max-width: 640px) calc(100vw - 32px), (max-width: 900px) 55vw, (max-width: 1455px) 44vw, 640px" : "(max-width: 900px) calc(100vw - 64px), 560px"}
            onError={() =>
              setBrokenImages((current) => ({
                ...current,
                [previewImageKey]: true,
              }))
            }
          />
        )}
        {showBookstoreAnnotation ? (
          <svg className={styles.bookstoreAnnotation} viewBox="0 0 1900 940" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
            {/* Source PNG: pink area x=210..1696, y=341..641; outline sits outside it. */}
            <rect x="200" y="331" width="1506" height="320" rx="22" fill="none" stroke="currentColor" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
            <text x="170" y="320" textAnchor="middle" fontSize="64" fill="currentColor">①</text>
          </svg>
        ) : null}
        {selectedProject.id === "hangeul" ? (
          <button
            type="button"
            className={`${styles.previewZoomButton} ${styles.previewHangeulGuide}`}
            onClick={() =>
              setImagePreview({
                src: "/img/han-geul_beta_img/han-i.png",
                alt: "한-글 한이 캐릭터 디자인 가이드",
                width: 1254,
                height: 1254,
              })
            }
            aria-label="한-글 한이 캐릭터 디자인 가이드 이미지 확대"
          >
            <Image
              className={styles.previewHangeulGuideImage}
              src="/img/han-geul_beta_img/han-i.png"
              alt="한-글 한이 캐릭터 디자인 가이드"
              width={1254}
              height={1254}
              sizes="180px"
            />
            <span className={styles.previewHangeulGuideLabel}>
              한이 캐릭터 디자인 가이드
            </span>
          </button>
        ) : null}
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

  const detailNumberRow = (
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
  );

  const detailPanel = selectedProject ? (
    <article
      ref={detailPanelRef}
      className={`${styles.detailPanel} ${styles.sharedDetail} ${isUnifiedDetail ? styles.bookstoreDetail : ""}`}
      data-project-id={selectedProject.id}
      aria-live="polite"
      aria-label={isBookstoreDetail ? "영풍문고 프로젝트 상세" : undefined}
      onKeyDown={handleBookstoreKeyDown}
    >
      {isUnifiedDetail ? detailNumberRow : (
        <div className={styles.sharedDesktopNumber}>{detailNumberRow}</div>
      )}
      <div
        ref={detailScrollRef}
        className={styles.detailContent}
        tabIndex={0}
        role="region"
        aria-label={`${selectedProjectDisplayTitle} 상세 내용`}
        data-scroll-region=""
      >
        {!isUnifiedDetail ? (
          <div className={styles.sharedMobileNumber}>{detailNumberRow}</div>
        ) : null}
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
            {!isUnifiedDetail ? <li>{getProjectRoleText(selectedProject)}</li> : null}
          </ul>
        </div>
        {!isUnifiedDetail ? <div className={styles.summaryRow} data-summary-state={summaryState}>
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
        </div> : null}
        {isUnifiedDetail ? (
          <>
            <div id="project-middle-stage" className={styles.bookstoreMiddleStage} data-view={isDesignIntentOpen ? "intent" : "project"}>
              <div className={styles.bookstoreProjectScreen} data-caption={showBookstoreAnnotation ? "true" : "false"} aria-hidden={isDesignIntentOpen} inert={isDesignIntentOpen}>
                {shouldShowProjectPreview ? <>
                  <div className={styles.mediaRow} data-summary-state={summaryState}>
                    <div className={styles.detailMediaArea}>{previewFrame}</div>
                  </div>
                  <p
                    className={styles.bookstoreCaption}
                    data-empty={!showBookstoreAnnotation}
                    aria-hidden={!showBookstoreAnnotation}
                  >
                    {showBookstoreAnnotation
                      ? "① 관심 조건으로 읽을 책을 찾아보는 탐색 영역"
                      : null}
                  </p>
                </> : null}
                <dl className={styles.bookstoreHighlights}>
                  {selectedProject.highlights?.map((highlight, index) => (
                    <div key={highlight.label} className={styles.bookstoreHighlight}>
                      <dt>
                        <span className={styles.bookstoreIcon} aria-hidden="true">
                          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                            {index === 0 ? <><circle cx="14" cy="14" r="9" /><path d="m21 21 6 6M11.5 11a2.5 2.5 0 0 1 5 .5c0 2-2.5 2-2.5 4M14 19h.01" /></> : index === 1 ? <><path d="M4 8h5m6 0h13M4 16h14m6 0h4M4 24h5m6 0h13" /><circle cx="12" cy="8" r="3" /><circle cx="21" cy="16" r="3" /><circle cx="12" cy="24" r="3" /></> : <><circle cx="13" cy="9" r="5" /><path d="M4 27v-3a9 9 0 0 1 14-7m1 5 7-7 3 3-7 7-4 1zM24 17l3 3" /></>}
                          </svg>
                        </span>
                        {highlight.label}
                      </dt>
                      <dd>{highlight.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <section className={styles.bookstoreIntentScreen} aria-hidden={!isDesignIntentOpen}>
                <ol className={styles.bookstoreIntentList}>
                  {selectedProject.designIntent?.map((item, index) => (
                    <li key={item.title}>
                      <span className={styles.bookstoreIntentNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
            <button type="button" className={styles.bookstoreIntentToggle} aria-expanded={isDesignIntentOpen} aria-controls="project-middle-stage" onClick={() => setIsDesignIntentOpen((open) => !open)}>
              {isDesignIntentOpen
                ? "← 프로젝트 화면 보기"
                : selectedProject.id === "hangeul"
                  ? "왜 글에 점수를 매기지 않았을까? →"
                  : selectedProject.id === "landing"
                    ? "왜 추천에 가상 피팅을 연결했을까? →"
                    : "설계 의도 보기 →"}
            </button>
            {selectedProject.siteUrl ? (
              <a className={styles.bookstoreSiteLink} href={selectedProject.siteUrl} target="_blank" rel="noreferrer">
                {selectedProject.id === "landing" ? "서비스 열기 · 로그인 필요" : "사이트 보기"} <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </>
        ) : (
          <div className={styles.mediaRow} data-summary-state={summaryState}>
            <div className={styles.detailMediaArea}>{previewFrame}</div>
          </div>
        )}
        <div
          className={styles.bottomInfo}
          data-expanded-type={
            isPagesOpen
              ? "pages"
              : isStacksOpen
                ? "stacks"
                : "none"
          }
        >
          <div className={styles.detailMetaArea}>
            <>
                {shouldShowPages ? <section
                  className={styles.pagesBlock}
                  data-expanded={isPagesOpen ? "true" : "false"}
                  aria-label="project pages"
                  style={getExpandedOverflowStyle(expandedOverflowHeights.pages)}
                >
                  <div className={styles.pagesHeader}>
                    <h4>화면·자료</h4>
                  </div>
                  <div
                    ref={pagesContentRef}
                    className={styles.pagesContent}
                    data-expanded={isPagesOpen ? "true" : "false"}
                  >
                    <div className={styles.inlineOverflowRow}>
                      <ul className={styles.pageQuickList}>
                        {hasPlanningDocument ? (
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
                              {selectedProject.planning?.title}
                            </button>
                            {pageListItemCount > 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ) : null}
                        {visiblePages.map((page, index) => {
                          const itemIndex =
                            (hasPlanningDocument ? 1 : 0) + index;

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
                                {getPageDisplayName(selectedProject, page.name)}
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
                          aria-expanded={isPagesOpen}
                          aria-label={
                            isPagesOpen
                              ? "화면 목록 접기"
                              : `화면 ${hiddenPageCount}개 더 보기`
                          }
                          onClick={togglePagesList}
                        >
                          {isPagesOpen
                            ? `-${hiddenPageCount}`
                            : `+${hiddenPageCount}`}
                        </button>
                      ) : null}
                    </div>
                    <div
                      ref={pagesOverflowRef}
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
                              {getPageDisplayName(selectedProject, page.name)}
                            </button>
                            {index < overflowPages.length - 1 ? (
                              <span className={styles.inlineSeparator}>/</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      ref={pageMeasureRef}
                      className={styles.pageListMeasure}
                      aria-hidden="true"
                    >
                      <ul className={styles.pageQuickList}>
                        {hasPlanningDocument ? (
                          <li className={styles.pageListItem}>
                            <span
                              className={styles.pageTextButton}
                              data-page-measure="label"
                            >
                              {selectedProject.planning?.title}
                            </span>
                            <span className={styles.inlineSeparator}>/</span>
                          </li>
                        ) : null}
                        {validPages.map((page) => (
                          <li key={page.name} className={styles.pageListItem}>
                            <span
                              className={styles.pageTextButton}
                              data-page-measure="label"
                              data-active={selectedPage?.name === page.name}
                            >
                              {getPageDisplayName(selectedProject, page.name)}
                            </span>
                            <span className={styles.inlineSeparator}>/</span>
                          </li>
                        ))}
                      </ul>
                      <span
                        ref={pageMoreMeasureRef}
                        className={styles.overflowMoreButton}
                      >
                        +99
                      </span>
                    </div>
                  </div>
                </section> : null}

                {shouldShowStacks ? <section
                  className={styles.detailStacks}
                  data-expanded={isStacksOpen ? "true" : "false"}
                  aria-label="project tech stack"
                  style={getExpandedOverflowStyle(expandedOverflowHeights.stacks)}
                >
                  <h4>도구·기술</h4>

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
                          aria-expanded={isStacksOpen}
                          aria-controls={isBookstoreDetail ? "ypbooks-stack-extra" : undefined}
                          aria-label={isBookstoreDetail ? (isStacksOpen ? "기술 스택 접기" : "기술 스택 더 보기") : undefined}
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
                      ref={stacksOverflowRef}
                      id={isBookstoreDetail ? "ypbooks-stack-extra" : undefined}
                      aria-hidden={isBookstoreDetail ? !isStacksOpen : undefined}
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
                </section> : null}
            </>
          </div>
        </div>
      </div>
    </article>
  ) : null;

  const planningDialog =
    isPlanningOpen && selectedProject?.planning?.pdfUrl
      ? createPortal(
          <div
            className={styles.planningOverlay}
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsPlanningOpen(false);
              }
            }}
          >
            <section
              className={styles.planningViewer}
              role="dialog"
              aria-modal="true"
              aria-labelledby="planning-viewer-title"
            >
              <div className={styles.planningViewerHeader}>
                <div>
                  <p className={styles.planningEyebrow}>
                    {selectedProject.title} · {selectedProject.planning.title}
                  </p>
                  <h3 id="planning-viewer-title">
                    {selectedProject.planning.title}
                  </h3>
                </div>
                <button
                  type="button"
                  className={styles.planningCloseButton}
                  onClick={() => setIsPlanningOpen(false)}
                  aria-label="기획안 닫기"
                >
                  ×
                </button>
              </div>
              <p className={styles.planningViewerSummary}>
                {selectedProject.planning.summary}
              </p>
              <iframe
                className={styles.planningPdfFrame}
                src={`${selectedProject.planning.pdfUrl}#view=FitH`}
                title={`${selectedProject.title} 기획안 PDF`}
              />
            </section>
          </div>,
          document.body,
        )
      : null;

  const imageLightbox = imagePreview
    ? createPortal(
        <div
          className={styles.imageLightboxOverlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setImagePreview(null);
            }
          }}
        >
          <figure className={styles.imageLightbox}>
            <button
              type="button"
              className={styles.imageLightboxCloseButton}
              onClick={() => setImagePreview(null)}
              aria-label="확대 이미지 닫기"
            >
              ×
            </button>
            <Image
              className={styles.imageLightboxImage}
              src={imagePreview.src}
              alt={imagePreview.alt}
              width={imagePreview.width}
              height={imagePreview.height}
              sizes="(max-width: 640px) 94vw, 86vw"
            />
          </figure>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <section
      ref={sectionRef}
      id="projects"
      className={styles.projects}
      aria-labelledby="projects-title"
      data-detail-open={selectedProject ? "true" : "false"}
      data-project-detail={selectedProject?.id}
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
                잎을 선택하면 프로젝트의 화면과 설계 과정을 볼 수 있습니다.
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
      {planningDialog}
      {imageLightbox}
    </>
  );
}

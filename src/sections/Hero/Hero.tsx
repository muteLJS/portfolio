"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Hero.module.css";

const heroVideo = {
  intro: "/videos/hero-lake.mp4",
  loop: "/videos/hero-lake-default.mp4",
} as const;

export default function Hero() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const isHeroVisibleRef = useRef(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const pauseHeroVideos = useCallback(() => {
    introVideoRef.current?.pause();
    loopVideoRef.current?.pause();
  }, []);

  const playHeroVideo = useCallback(() => {
    const activeVideo = isIntroComplete
      ? loopVideoRef.current
      : introVideoRef.current;
    const inactiveVideo = isIntroComplete
      ? introVideoRef.current
      : loopVideoRef.current;

    inactiveVideo?.pause();
    activeVideo?.play().catch(() => {
      // Autoplay can be rejected transiently on some mobile browsers.
    });
  }, [isIntroComplete]);

  useEffect(() => {
    const section = document.getElementById("hero");
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(
          entry?.isIntersecting && entry.intersectionRatio >= 0.55,
        );
        isHeroVisibleRef.current = isVisible;

        if (isVisible) {
          playHeroVideo();
          return;
        }

        pauseHeroVideos();
      },
      {
        root: scrollContainer,
        threshold: [0, 0.25, 0.55, 0.75, 1],
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      pauseHeroVideos();
    };
  }, [pauseHeroVideos, playHeroVideo]);

  const handleIntroEnded = () => {
    setIsIntroComplete(true);
    introVideoRef.current?.pause();

    window.requestAnimationFrame(() => {
      if (isHeroVisibleRef.current) {
        loopVideoRef.current?.play().catch(() => {
          // Keep the poster frame visible if autoplay is temporarily blocked.
        });
      }
    });
  };

  const handleScrollGuideClick = () => {
    const aboutSection = document.getElementById("about");
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );

    if (!aboutSection || !scrollContainer) {
      return;
    }

    const originalScrollBehavior = scrollContainer.style.scrollBehavior;
    const startTop = scrollContainer.scrollTop;
    const targetTop = aboutSection.offsetTop;
    const distance = targetTop - startTop;
    const duration = 900;
    const startTime = performance.now();
    const easeInOutCubic = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    scrollContainer.style.scrollBehavior = "auto";

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      scrollContainer.scrollTop =
        startTop + distance * easeInOutCubic(progress);

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
        return;
      }

      scrollContainer.style.scrollBehavior = originalScrollBehavior;
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-title"
      data-reveal-section="true"
    >
      <div
        className={`${styles.videoStage} ${isIntroComplete ? styles.loopActive : ""}`}
        data-video-phase={isIntroComplete ? "loop" : "intro"}
        data-reveal="0"
      >
        <video
          ref={introVideoRef}
          className={`${styles.video} ${styles.introVideo}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={handleIntroEnded}
        >
          <source src={heroVideo.intro} type="video/mp4" />
        </video>
        <video
          ref={loopVideoRef}
          className={`${styles.video} ${styles.loopVideo}`}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
        >
          <source src={heroVideo.loop} type="video/mp4" />
        </video>
      </div>

      <div className={styles.scrim} aria-hidden="true" data-reveal="0" />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title} data-reveal="2">
          작은 변화에서,
          <br />더 나은 경험으로.
        </h1>
        <p className={styles.subtitle} data-reveal="3">
          디자인의 의도가 코드로 흐르고,
          <br />
          사용자의 경험이 완성됩니다.
        </p>
      </div>

      <button
        className={styles.scrollGuide}
        type="button"
        onClick={handleScrollGuideClick}
        data-reveal="4"
        aria-label="About section으로 이동"
      >
        <span>SCROLL</span>
        <span className={styles.chevron} />
      </button>
    </section>
  );
}

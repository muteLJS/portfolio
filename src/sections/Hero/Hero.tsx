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
    const activeVideo = isIntroComplete ? loopVideoRef.current : introVideoRef.current;
    const inactiveVideo = isIntroComplete ? introVideoRef.current : loopVideoRef.current;

    inactiveVideo?.pause();
    activeVideo?.play().catch(() => {
      // Autoplay can be rejected transiently on some mobile browsers.
    });
  }, [isIntroComplete]);

  useEffect(() => {
    const section = document.getElementById("hero");
    const scrollContainer = document.querySelector<HTMLElement>("[data-scroll-container='true']");

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.55);
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

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title" data-reveal-section="true">
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
          <br />
          더 나은 경험으로.
        </h1>
        <p className={styles.subtitle} data-reveal="3">
          사소한 흐름을 읽고,
          <br />
          자연스러운 화면으로 연결합니다.
        </p>
      </div>

      <div className={styles.scrollGuide} aria-hidden="true" data-reveal="4">
        <span>SCROLL</span>
        <span className={styles.chevron} />
      </div>
    </section>
  );
}

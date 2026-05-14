"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import styles from "./About.module.css";

const stackColumns = [
  {
    title: "DESIGN",
    items: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    title: "DEVELOPMENT",
    items: ["HTML / CSS", "JavaScript", "React / Next.js", "Sass"],
  },
  {
    title: "TOOLS",
    items: ["Git", "GitHub", "Vercel", "Notion"],
  },
] as const;

export default function About() {
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  const pauseAboutVideo = useCallback(() => {
    aboutVideoRef.current?.pause();
  }, []);

  const playAboutVideo = useCallback(() => {
    aboutVideoRef.current?.play().catch(() => {
      // Autoplay can be rejected transiently on some mobile browsers.
    });
  }, []);

  useEffect(() => {
    const section = document.getElementById("about");
    const scrollContainer = document.querySelector<HTMLElement>("[data-scroll-container='true']");

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && entry.intersectionRatio >= 0.55) {
          playAboutVideo();
          return;
        }

        pauseAboutVideo();
      },
      {
        root: scrollContainer,
        threshold: [0, 0.25, 0.55, 0.75, 1],
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      pauseAboutVideo();
    };
  }, [pauseAboutVideo, playAboutVideo]);

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title" data-reveal-section="true">
      <video
        ref={aboutVideoRef}
        className={styles.backgroundVideo}
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/about-default.mp4" type="video/mp4" />
      </video>

      <Image
        className={styles.branchHint}
        src="/img/branch/tree-branch-main.png"
        alt=""
        width={1536}
        height={1024}
        sizes="760px"
        aria-hidden="true"
      />

      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.sectionMark} data-reveal="1">
            <p className={styles.label}>ABOUT</p>
            <span className={styles.labelLine} aria-hidden="true" />
          </div>

          <div className={styles.copy}>
            <h2 id="about-title" className={styles.title} data-reveal="2">
              좋은 경험은 디테일에서 시작됩니다.
            </h2>

            <p className={styles.description} data-reveal="3">
              무엇이 불편한지 먼저 들여다보고,
              <br />
              어떻게 흘러야 자연스러운지 설계합니다.
              <br />
              그 과정이 저에게는 디자인이자 개발입니다.
            </p>
          </div>

          <div className={styles.stacks} aria-label="Stacks" data-reveal="4">
            {stackColumns.map((column) => (
              <section className={styles.stackColumn} key={column.title} aria-label={column.title}>
                <h3 className={styles.stackTitle}>{column.title}</h3>
                <ul className={styles.stackList}>
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

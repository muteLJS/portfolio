"use client";

import { useEffect, useRef } from "react";

import styles from "./Contact.module.css";

const contactVideoSrc = "/videos/contact-background.mp4";

export default function ContactBackground() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container='true']",
    );
    const section = document.getElementById("contact");

    if (!stage || !video || !scrollContainer || !section) {
      return;
    }

    video.playbackRate = 0.88;

    const syncScale = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = scrollContainer.clientHeight || window.innerHeight;
      const progress = Math.min(Math.max(1 - rect.top / viewportHeight, 0), 1);
      const scale = 1.2 - progress * 0.2;

      stage.style.setProperty("--contact-video-scale", scale.toFixed(4));
      stage.style.setProperty("--contact-video-progress", progress.toFixed(4));
    };

    syncScale();
    void video.play();
    scrollContainer.addEventListener("scroll", syncScale, { passive: true });
    window.addEventListener("resize", syncScale);

    return () => {
      scrollContainer.removeEventListener("scroll", syncScale);
      window.removeEventListener("resize", syncScale);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.contactVideoStage} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.contactVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={contactVideoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

import styles from "./Hero.module.css";

const heroVideo = {
  intro: "/videos/hero-lake.mp4",
  loop: null,
} as const;

export default function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.videoStage} data-video-phase="intro">
        <video
          className={styles.video}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo.intro} type="video/mp4" />
        </video>
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          앞으로 갑니다, 한 걸음씩
        </h1>
        <p className={styles.subtitle}>UI/UX Designer Lee Jinsung</p>
      </div>

      <div className={styles.scrollGuide} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

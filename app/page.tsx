import About from "../src/sections/About";
import Hero from "../src/sections/Hero";
import Projects from "../src/sections/Projects";
import OneScrollController from "../src/components/OneScrollController";
import RevealController from "../src/components/RevealController";
import TopNavigation from "../src/components/TopNavigation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page} data-scroll-container="true">
      <OneScrollController />
      <RevealController />
      <TopNavigation />
      <Hero />
      <About />
      <Projects />
      <section
        id="contact"
        className={`${styles.placeholder} ${styles.contact}`}
        aria-labelledby="contact-title"
        data-reveal-section="true"
      >
        <div className={styles.contactContent}>
          <p className={styles.contactLabel} data-reveal="1">
            CONTACT
          </p>
          <h2 id="contact-title" className={styles.contactTitle} data-reveal="2">
            사소한 흐름들이 모여,
            <br />
            하나의 형태가 됩니다.
          </h2>
          <p className={styles.contactDescription} data-reveal="3">
            그 안에서 사용자의 움직임을 보고,
            <br />
            필요한 경험을 설계합니다.
            <br />
            <br />
            다음 흐름도,
            <br />
            좋은 경험으로 이어질 수 있기를 바랍니다.
          </p>
        </div>
      </section>
    </main>
  );
}

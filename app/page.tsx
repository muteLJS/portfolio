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
            작은 변화는,
            <br />
            결국 하나의 풍경이 됩니다.
          </h2>
          <p className={styles.contactDescription} data-reveal="3">
            읽어주셔서 감사합니다.
            <br />
            함께 더 나은 경험을 만들어갈 수 있다면 좋겠습니다.
          </p>
        </div>
      </section>
    </main>
  );
}

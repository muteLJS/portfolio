import About from "../src/sections/About";
import Hero from "../src/sections/Hero";
import Projects from "../src/sections/Projects";
import SectionNavigation from "../src/components/SectionNavigation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page} data-scroll-container="true">
      <SectionNavigation />
      <Hero />
      <About />
      <Projects />
      <section
        id="contact"
        className={`${styles.placeholder} ${styles.contact}`}
        aria-label="Contact section placeholder"
      />
    </main>
  );
}

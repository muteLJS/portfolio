import OneScrollController from "../src/components/OneScrollController";
import RevealController from "../src/components/RevealController";
import TopNavigation from "../src/components/TopNavigation";
import About from "../src/sections/About/About";
import Contact from "../src/sections/Contact/Contact";
import Hero from "../src/sections/Hero/Hero";
import Projects from "../src/sections/Projects/Projects";
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
      <Contact />
    </main>
  );
}

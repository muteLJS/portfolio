import Image from "next/image";
import lakeBackground from "../../assets/lake-bg.png";
import styles from "./About.module.css";

const skills = [
  { label: "Figma", iconClass: "devicon-figma-plain colored" },
  { label: "Photoshop", iconClass: "devicon-photoshop-plain colored" },
  { label: "Illustrator", iconClass: "devicon-illustrator-plain colored" },
  { label: "HTML", iconClass: "devicon-html5-plain colored" },
  { label: "CSS", iconClass: "devicon-css3-plain colored" },
  { label: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { label: "React", iconClass: "devicon-react-original colored" },
  { label: "Vue", iconClass: "devicon-vuejs-plain colored" },
  { label: "Next.js", iconClass: "devicon-nextjs-plain" },
  { label: "Sass", iconClass: "devicon-sass-original colored" },
  { label: "GitHub", iconClass: "devicon-github-original" },
];

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.inner}>
        <div className={styles.profileDrop} aria-label="Landscape image placeholder">
          <Image
            className={styles.profileImage}
            src={lakeBackground}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 920px) 220px, 336px"
          />
          <span className={styles.dropRefraction} aria-hidden="true" />
          <span className={styles.dropDepth} aria-hidden="true" />
          <span className={styles.dropHighlight} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.label}>ABOUT</p>
            <h2 id="about-title" className={styles.title}>
              작은 이유를 관찰하고,
              <br />
              흐름을 정리합니다.
            </h2>
            <p className={styles.description}>
              자연스러운 경험을 읽기 쉬운 화면으로 만듭니다.
            </p>
          </div>

          <div className={styles.stackBlock}>
            <div className={styles.stackIntro}>
              <h3 className={styles.stackTitle}>Technical stacks</h3>
            </div>

            <div className={styles.skills} aria-label="Technical stacks">
              {skills.map((skill) => (
                <span className={styles.skill} key={skill.label}>
                  <span className={styles.skillDrop} aria-hidden="true">
                    <i className={skill.iconClass} />
                  </span>
                  <span className={styles.skillLabel}>{skill.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

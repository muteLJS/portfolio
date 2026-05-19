import ContactBackground from "./ContactBackground";
import styles from "./Contact.module.css";

const contactLinks = [
  { href: "mailto:hello@example.com", icon: "@", label: "Email" },
  { href: "https://github.com", icon: "GH", label: "GitHub" },
  { href: "/resume.pdf", icon: "CV", label: "Resume" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.contact}
      aria-labelledby="contact-title"
      data-reveal-section="true"
    >
      <ContactBackground />
      <div className={styles.contactContent}>
        <div className={styles.contactCopy}>
          <p className={styles.contactLabel} data-reveal="1">
            CONTACT
          </p>
          <h2
            id="contact-title"
            className={styles.contactTitle}
            data-reveal="2"
          >
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
          <nav
            className={styles.contactActions}
            aria-label="Contact links"
            data-reveal="4"
          >
            {contactLinks.map((link) => (
              <a
                className={styles.contactAction}
                href={link.href}
                key={link.label}
                aria-label={link.label}
              >
                <span className={styles.contactIcon} aria-hidden="true">
                  {link.icon}
                </span>
                <span className={styles.contactTooltip}>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div
          className={styles.contactProfilePlaceholder}
          aria-hidden="true"
          data-reveal="4"
        >
          <span />
        </div>
      </div>
    </section>
  );
}

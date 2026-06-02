import ContactBackground from "./ContactBackground";
import styles from "./Contact.module.css";

const contactLinks: {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  icon: React.ReactNode;
}[] = [
  {
    href: "mailto:ajrqh1030@gmail.com",
    label: "Email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <polyline points="2,5 12,13 22,5" />
      </svg>
    ),
  },
  {
    href: "https://github.com/muteLJS",
    label: "GitHub",
    target: "_blank",
    rel: "noreferrer",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

import type React from "react";

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
            {contactLinks.map((link, i) => (
              <span key={link.label} className={styles.contactActionGroup}>
                <a
                  className={styles.contactAction}
                  href={link.href}
                  aria-label={link.label}
                  target={link.target}
                  rel={link.rel}
                >
                  <span className={styles.contactIconSvg}>{link.icon}</span>
                  <span className={styles.contactTooltip}>{link.label}</span>
                </a>
                {i < contactLinks.length - 1 && (
                  <span className={styles.contactDivider} aria-hidden="true" />
                )}
              </span>
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

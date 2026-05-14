"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";

import styles from "./Projects.module.css";

type BranchTransitionProps = {
  children?: ReactNode;
  onActivate?: () => void;
};

export default function BranchTransition({ children, onActivate }: BranchTransitionProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onActivate || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    onActivate();
  };

  return (
    <div
      className={styles.branchStage}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      role={onActivate ? "button" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      aria-label={onActivate ? "첫 번째 프로젝트 열기" : undefined}
      data-interactive={onActivate ? "true" : "false"}
    >
      <Image
        className={styles.branchImage}
        src="/img/branch/tree-branch-main.png"
        alt=""
        width={1536}
        height={1024}
        priority
        sizes="(max-width: 640px) 560px, (max-width: 900px) 760px, (max-width: 1180px) 92vw, 88vw"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

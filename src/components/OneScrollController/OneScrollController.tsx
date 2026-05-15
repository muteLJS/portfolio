"use client";

import { useEffect, useRef } from "react";

const sectionIds = ["hero", "about", "projects", "contact"] as const;
const wheelThreshold = 28;
const touchThreshold = 42;
const scrollLockMs = 920;

export default function OneScrollController() {
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-scroll-container='true']");

    if (!scrollContainer) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length < 2) {
      return;
    }

    const syncActiveIndex = () => {
      if (lockedRef.current) {
        return;
      }

      const viewportCenter = scrollContainer.scrollTop + scrollContainer.clientHeight * 0.5;
      const nearestIndex = sections.reduce((nearest, section, index) => {
        const currentCenter = section.offsetTop + section.offsetHeight * 0.5;
        const nearestCenter = sections[nearest].offsetTop + sections[nearest].offsetHeight * 0.5;
        const currentDistance = Math.abs(currentCenter - viewportCenter);
        const nearestDistance = Math.abs(nearestCenter - viewportCenter);

        return currentDistance < nearestDistance ? index : nearest;
      }, activeIndexRef.current);

      activeIndexRef.current = nearestIndex;
    };

    const releaseLock = () => {
      window.setTimeout(() => {
        lockedRef.current = false;
        const targetTop = sections[activeIndexRef.current]?.offsetTop ?? scrollContainer.scrollTop;

        if (Math.abs(scrollContainer.scrollTop - targetTop) > 2) {
          scrollContainer.scrollTo({
            top: targetTop,
            behavior: "auto",
          });
        }
      }, scrollLockMs);
    };

    const scrollToIndex = (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= sections.length || nextIndex === activeIndexRef.current) {
        return;
      }

      lockedRef.current = true;
      activeIndexRef.current = nextIndex;

      scrollContainer.scrollTo({
        top: sections[nextIndex].offsetTop,
        behavior: "smooth",
      });

      releaseLock();
    };

    const moveSection = (direction: 1 | -1) => {
      syncActiveIndex();
      scrollToIndex(activeIndexRef.current + direction);
    };

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      Boolean(target.closest("a, button, input, textarea, select, [contenteditable='true']"));

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < wheelThreshold) {
        return;
      }

      event.preventDefault();

      if (lockedRef.current) {
        return;
      }

      moveSection(event.deltaY > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInteractiveTarget(event.target)) {
        return;
      }

      const nextKeys = ["ArrowDown", "PageDown", " ", "Space"];
      const previousKeys = ["ArrowUp", "PageUp"];

      if (![...nextKeys, ...previousKeys, "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();

      if (lockedRef.current) {
        return;
      }

      if (event.key === "Home") {
        syncActiveIndex();
        scrollToIndex(0);
        return;
      }

      if (event.key === "End") {
        syncActiveIndex();
        scrollToIndex(sections.length - 1);
        return;
      }

      moveSection(nextKeys.includes(event.key) ? 1 : -1);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartYRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY;

      if (typeof currentY !== "number") {
        return;
      }

      const distance = touchStartYRef.current - currentY;

      if (Math.abs(distance) < touchThreshold) {
        return;
      }

      event.preventDefault();

      if (!lockedRef.current) {
        moveSection(distance > 0 ? 1 : -1);
      }

      touchStartYRef.current = null;
    };

    const handleResize = () => {
      scrollContainer.scrollTo({
        top: sections[activeIndexRef.current].offsetTop,
        behavior: "auto",
      });
    };

    syncActiveIndex();
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    scrollContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    scrollContainer.addEventListener("scroll", syncActiveIndex, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      scrollContainer.removeEventListener("scroll", syncActiveIndex);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}

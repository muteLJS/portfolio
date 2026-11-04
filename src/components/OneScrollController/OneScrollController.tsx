"use client";

import { useEffect, useRef } from "react";

const sectionIds = ["hero", "about", "projects", "contact"] as const;
const wheelThreshold = 28;
const touchThreshold = 42;
const scrollLockMs = 920;
// After an inner region reaches its edge, trailing wheel momentum is absorbed
// for this long before the next wheel gesture may change section.
const regionHandoffMs = 450;
const clampIndex = (value: number, max: number) => Math.min(Math.max(value, 0), max);

export default function OneScrollController() {
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const regionScrollAtRef = useRef(0);

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

    // The section containing the top of the viewport. A tall section stays
    // current while it is being read, even past its midpoint.
    const getCurrentIndex = () => {
      const top = scrollContainer.scrollTop;
      const containing = sections.findIndex(
        (section) =>
          top >= section.offsetTop - 2 &&
          top < section.offsetTop + section.offsetHeight - 2,
      );

      if (containing !== -1) {
        return containing;
      }

      return sections.reduce((nearest, section, index) => {
        const currentDistance = Math.abs(section.offsetTop - top);
        const nearestDistance = Math.abs(sections[nearest].offsetTop - top);

        return currentDistance < nearestDistance ? index : nearest;
      }, activeIndexRef.current);
    };

    const syncActiveIndex = () => {
      if (lockedRef.current) {
        return;
      }

      activeIndexRef.current = getCurrentIndex();
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
      scrollToIndex(clampIndex(activeIndexRef.current + direction, sections.length - 1));
    };

    const isInteractiveTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      Boolean(target.closest("a, button, input, textarea, select, [contenteditable='true']"));

    const isEditableTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      Boolean(target.closest("input, textarea, select, [contenteditable='true']"));

    // The inner scroll area (e.g. a project detail) that contains the target.
    const getRegionElement = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const region = target.closest<HTMLElement>("[data-scroll-region]");
      return region && scrollContainer.contains(region) ? region : null;
    };

    // The same region, but only while it actually overflows.
    const getScrollRegion = (target: EventTarget | null) => {
      const region = getRegionElement(target);
      return region && region.scrollHeight > region.clientHeight + 1 ? region : null;
    };

    const regionCanScroll = (region: HTMLElement, direction: 1 | -1) =>
      direction > 0
        ? region.scrollTop + region.clientHeight < region.scrollHeight - 1
        : region.scrollTop > 1;

    // A section taller than the viewport (e.g. a case study on a narrow screen)
    // is read with native scrolling until its edge comes into view.
    const hasRoomInTallSection = (direction: 1 | -1) => {
      const section = sections[getCurrentIndex()];
      if (!section || section.offsetHeight <= scrollContainer.clientHeight + 2) {
        return false;
      }

      const viewTop = scrollContainer.scrollTop;
      const viewBottom = viewTop + scrollContainer.clientHeight;

      return direction > 0
        ? viewBottom < section.offsetTop + section.offsetHeight - 2
        : viewTop > section.offsetTop + 2;
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const region = getScrollRegion(event.target);

      if (region) {
        if (regionCanScroll(region, direction)) {
          // The region scrolls natively; its overscroll-behavior keeps the
          // remainder from chaining to the page.
          regionScrollAtRef.current = performance.now();
          return;
        }

        if (performance.now() - regionScrollAtRef.current < regionHandoffMs) {
          event.preventDefault();
          regionScrollAtRef.current = performance.now();
          return;
        }
      }

      if (hasRoomInTallSection(direction)) return;

      if (Math.abs(event.deltaY) < wheelThreshold) {
        return;
      }

      event.preventDefault();

      if (lockedRef.current) {
        return;
      }

      moveSection(direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      // Keys typed in overlays rendered outside the page (dialogs, lightboxes)
      // never move the sections behind them.
      if (
        target instanceof Element &&
        target !== document.body &&
        !scrollContainer.contains(target)
      ) {
        return;
      }

      if (isEditableTarget(target)) return;

      const regionElement = getRegionElement(target);
      const region = getScrollRegion(target);
      const isActivationKey = event.key === " " || event.key === "Enter";

      // Outside an inner region, focused controls keep their native keys.
      // Inside one (overflowing or not), only activation keys stay with the
      // control; scroll keys scroll the region first, then change section,
      // so the page never stops between two sections.
      if (isInteractiveTarget(target) && (!regionElement || isActivationKey)) {
        return;
      }

      const nextKeys = ["ArrowDown", "PageDown", " ", "Space"];
      const previousKeys = ["ArrowUp", "PageUp"];

      if (![...nextKeys, ...previousKeys, "Home", "End"].includes(event.key)) {
        return;
      }

      const direction: 1 | -1 =
        nextKeys.includes(event.key) || event.key === "End" ? 1 : -1;

      if (region && regionCanScroll(region, direction)) return;
      if (event.key !== "Home" && event.key !== "End" && hasRoomInTallSection(direction)) {
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
      const direction = distance > 0 ? 1 : -1;
      const region = getScrollRegion(event.target);

      if (region && regionCanScroll(region, direction)) return;
      if (hasRoomInTallSection(direction)) return;

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

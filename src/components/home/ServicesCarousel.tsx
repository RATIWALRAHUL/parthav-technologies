"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICES_DATA, type ServiceItem } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import styles from "./Services.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;
const TRANSITION_MS = 500;

export function ServicesCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // With 6 services, we create:
  // clonesBefore (6) + realItems (6) + clonesAfter (6) = 18 items total
  // realItems start at index 6 and end at index 11
  const baseCount = SERVICES_DATA.length;
  const initialIndex = baseCount; // index 6

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [stepWidth, setStepWidth] = useState(0);

  // Active service index (0..5) for the counter indicator
  const activeServiceIndex = ((currentIndex - baseCount) % baseCount + baseCount) % baseCount;

  // Measure card + gap dimensions
  const updateDimensions = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const firstSlide = trackRef.current.querySelector<HTMLElement>("[data-slide]");
    if (!firstSlide) return;

    const gap = parseFloat(getComputedStyle(trackRef.current).gap || "20");
    const width = firstSlide.getBoundingClientRect().width;
    setStepWidth(width + gap);
  }, []);

  useEffect(() => {
    updateDimensions();
    const handleResize = () => {
      // Temporarily disable transition during resize to prevent layout jumping
      setEnableTransition(false);
      updateDimensions();
      requestAnimationFrame(() => {
        setEnableTransition(true);
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [updateDimensions]);

  // Navigate functions
  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setEnableTransition(true);
      setCurrentIndex((prev) => prev + direction);
    },
    [isTransitioning]
  );

  // Handle transition end for seamless infinite loop reset
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);

    // If navigated beyond the real items into clonesAfter
    if (currentIndex >= baseCount * 2) {
      setEnableTransition(false);
      const normalizedIndex = currentIndex - baseCount;
      setCurrentIndex(normalizedIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
    // If navigated before real items into clonesBefore
    else if (currentIndex < baseCount) {
      setEnableTransition(false);
      const normalizedIndex = currentIndex + baseCount;
      setCurrentIndex(normalizedIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  }, [currentIndex, baseCount]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigate(1);
    }
  };

  // Touch and pointer swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Only prevent default if horizontal swipe is clearly dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      // Allow browser to recognize horizontal gesture
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    // Threshold of 40px for swipe trigger
    if (deltaX < -40) {
      navigate(1); // Swipe left -> next
    } else if (deltaX > 40) {
      navigate(-1); // Swipe right -> prev
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // Build the 18 items (clones before, real items, clones after)
  const allSlides: { item: ServiceItem; isClone: boolean; key: string; originalIndex: number }[] = [
    ...SERVICES_DATA.map((item, idx) => ({
      item,
      isClone: true,
      key: `clone-before-${item.id}`,
      originalIndex: idx,
    })),
    ...SERVICES_DATA.map((item, idx) => ({
      item,
      isClone: false,
      key: `real-${item.id}`,
      originalIndex: idx,
    })),
    ...SERVICES_DATA.map((item, idx) => ({
      item,
      isClone: true,
      key: `clone-after-${item.id}`,
      originalIndex: idx,
    })),
  ];

  // Transform calculation
  const translateX = stepWidth > 0 ? -currentIndex * stepWidth : 0;
  const transitionStyle =
    enableTransition && !shouldReduceMotion
      ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
      : "none";

  return (
    <div
      className={styles.carouselRoot}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our Digital Capabilities Carousel"
    >
      {/* Header Row: Left = Eyebrow + Headline + Description, Right = Counter & Nav Controls */}
      <motion.div
        className={styles.headerRow}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: STANDARD_EASE }}
      >
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>OUR SERVICES</span>
          <h2 className={styles.headline}>
            One partner. Every <br className={styles.headlineBreak} />
            <span className={styles.orangeText}>digital capability.</span>
          </h2>
          <p className={styles.description}>
            From product design to development, AI and growth — we bring the
            capabilities you need to move forward.
          </p>
        </div>

        <div className={styles.headerRight}>
          {/* Subtle position counter: 01 / 06 */}
          <div className={styles.counterContainer} aria-hidden="true">
            <span className={styles.activeNumber}>
              {String(activeServiceIndex + 1).padStart(2, "0")}
            </span>
            <span className={styles.counterDivider}>/</span>
            <span className={styles.totalNumber}>
              {String(baseCount).padStart(2, "0")}
            </span>
          </div>

          {/* Orange Circular Navigation Controls */}
          <div className={styles.arrowControls}>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => navigate(-1)}
              aria-label="Previous services"
            >
              <ChevronLeft size={22} strokeWidth={1.85} />
            </button>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => navigate(1)}
              aria-label="Next services"
            >
              <ChevronRight size={22} strokeWidth={1.85} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Carousel Viewport (strictly overflow: hidden) */}
      <div
        className={styles.carouselViewport}
        ref={viewportRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.carouselTrack}
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: transitionStyle,
          }}
        >
          {allSlides.map((slide) => (
            <div
              key={slide.key}
              data-slide
              className={styles.slideWrapper}
              aria-hidden={slide.isClone ? "true" : undefined}
            >
              <ServiceCard
                service={slide.item}
                index={slide.originalIndex}
                isClone={slide.isClone}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

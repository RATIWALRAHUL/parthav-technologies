"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

const STANDARD_EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const item = TESTIMONIALS_DATA[currentIndex];

  return (
    <div className={styles.testimonialsCol}>
      <span className={styles.eyebrow}>CLIENT VOICES</span>
      <h2 className={styles.headline}>What Our Clients Say</h2>

      <div className={styles.cardWrapper}>
        <div className={styles.stars} aria-label="5 stars rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="#FFA800" stroke="#FFA800" />
          ))}
        </div>

        <div className={styles.slideContainer} style={{ overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -36 }}
              transition={{ duration: 0.48, ease: STANDARD_EASE }}
            >
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <div className={styles.authorMeta}>
                <Image
                  src={item.avatar}
                  alt={item.author}
                  width={48}
                  height={48}
                  className={styles.avatar}
                />
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>{item.author}</span>
                  <span className={styles.authorRole}>
                    {item.role}, {item.company}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.controls}>
          <div className={styles.indicators}>
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.navButtons}>
            <button
              onClick={prevTestimonial}
              className={styles.navBtn}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextTestimonial}
              className={styles.navBtn}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

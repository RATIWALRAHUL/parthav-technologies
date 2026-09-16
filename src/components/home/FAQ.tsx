"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA, type FAQItem } from "@/data/faq";
import styles from "./FAQ.module.css";

interface FAQProps {
  eyebrow?: string;
  title?: string;
  items?: FAQItem[];
}

export function FAQ({
  eyebrow = "FREQUENTLY ASKED QUESTIONS",
  title = "Got questions? We've got answers.",
  items = FAQ_DATA,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqCol} id="faq">
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.headline}>{title}</h2>

      <div className={styles.accordionList}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
            >
              <button
                className={styles.trigger}
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-btn-${index}`}
              >
                <span>{item.question}</span>
                <span
                  className={`${styles.iconWrapper} ${
                    isOpen ? styles.iconOpen : ""
                  }`}
                >
                  <Plus size={18} strokeWidth={2.2} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-btn-${index}`}
                    className={styles.answerWrapper}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={styles.answer}>{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

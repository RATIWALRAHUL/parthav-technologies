import React from "react";
import clsx from "clsx";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        align === "center" ? styles.center : styles.left,
        className
      )}
    >
      {eyebrow && (
        <span
          className={clsx("eyebrow", theme === "dark" && "eyebrow-dark")}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "h2",
          styles.title,
          theme === "dark" && styles.titleDark
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            styles.description,
            theme === "dark" && styles.descriptionDark
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

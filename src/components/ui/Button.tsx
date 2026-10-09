import React from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "text";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  children,
  icon,
  className,
  loading = false,
  ...props
}: ButtonProps) {
  const combinedClassName = clsx(
    styles.button,
    styles[variant],
    loading && styles.disabled,
    className
  );

  const content = (
    <>
      {loading && <span className={styles.loadingSpinner} aria-hidden="true" />}
      <span>{children}</span>
      {!loading && icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={combinedClassName} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

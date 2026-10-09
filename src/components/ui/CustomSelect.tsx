"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import styles from "./CustomSelect.module.css";

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  label,
  icon,
  disabled = false,
  error = false,
  className,
  ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const selectId = id || generatedId;

  // Normalize options into { label, value } objects
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const hasValue = Boolean(value);
  const isLabelFloating = Boolean(label && (hasValue || isOpen));

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      const targetItem = items[highlightedIndex];
      if (targetItem) {
        targetItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          const opt = normalizedOptions[highlightedIndex];
          if (opt) handleSelect(opt.value);
        } else {
          setIsOpen(!isOpen);
          if (!isOpen && selectedOption) {
            const idx = normalizedOptions.findIndex((o) => o.value === value);
            setHighlightedIndex(idx >= 0 ? idx : 0);
          }
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) =>
            prev < normalizedOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(normalizedOptions.length - 1);
        } else {
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : normalizedOptions.length - 1
          );
        }
        break;

      case "Escape":
      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.selectContainer, className)}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden input for standard forms */}
      <input type="hidden" name={name} value={value} />

      {/* Floating Label (if provided) */}
      {label && (
        <label
          htmlFor={selectId}
          className={clsx(
            styles.floatingLabel,
            isLabelFloating && styles.floatingLabelActive,
            isOpen && styles.floatingLabelFocused
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={selectId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || label || placeholder}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            if (!isOpen && selectedOption) {
              const idx = normalizedOptions.findIndex((o) => o.value === value);
              setHighlightedIndex(idx >= 0 ? idx : 0);
            }
          }
        }}
        className={clsx(
          styles.triggerButton,
          isOpen && styles.triggerOpen,
          error && styles.triggerError
        )}
      >
        {icon && <span className={styles.leadingIcon}>{icon}</span>}

        <span
          className={clsx(
            styles.selectedValue,
            selectedOption ? styles.hasValue : styles.placeholder
          )}
        >
          {selectedOption
            ? selectedOption.label
            : isLabelFloating && placeholder
            ? placeholder
            : !label
            ? placeholder || "Select..."
            : ""}
        </span>

        <span
          className={clsx(styles.chevronIcon, isOpen && styles.chevronOpen)}
          aria-hidden="true"
        >
          <ChevronDown size={15} strokeWidth={2.2} />
        </span>
      </button>

      {/* Floating Animated Custom Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdownMenu}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul
              ref={listRef}
              role="listbox"
              aria-labelledby={selectId}
              className={styles.optionsList}
            >
              {normalizedOptions.map((option, idx) => {
                const isSelected = option.value === value;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={clsx(
                      styles.optionItem,
                      isSelected && styles.optionSelected,
                      isHighlighted && !isSelected && styles.optionHighlighted
                    )}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                  >
                    <span className={styles.optionText}>{option.label}</span>
                    {isSelected && (
                      <span className={styles.checkIcon} aria-hidden="true">
                        <Check size={14} strokeWidth={2.6} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

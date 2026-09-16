import React from "react";

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechLogo({ name, size = 22, className }: TechLogoProps) {
  const norm = name.toLowerCase().trim();

  // NEXT.JS
  if (norm === "next.js" || norm === "nextjs") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path
          d="M7.5 16.5V7.5L16.2 18.2C15.0 19.0 13.5 19.5 12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 9.7 5.54 7.64 7.18 6.27L15 16.5H7.5Z"
          fill="url(#nextG1)"
        />
        <path d="M14.5 7.5H16.5V14.5H14.5V7.5Z" fill="url(#nextG2)" />
        <defs>
          <linearGradient id="nextG1" x1="11" y1="12" x2="16" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="nextG2" x1="15.5" y1="7.5" x2="15.5" y2="14.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // REACT
  if (norm === "react" || norm === "react.js") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#00D8FF" strokeWidth="1.6" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
      </svg>
    );
  }

  // TYPESCRIPT
  if (norm === "typescript" || norm === "ts") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#3178C6" />
        <path
          d="M5 9.5H13V11.5H10V18H7.8V11.5H5V9.5ZM13.8 16.2C14.2 16.5 14.8 16.7 15.4 16.7C16.3 16.7 16.8 16.3 16.8 15.7C16.8 14.3 13.5 14.7 13.5 12.3C13.5 10.6 14.9 9.4 17 9.4C18 9.4 18.8 9.7 19.3 10L18.6 11.7C18.1 11.4 17.5 11.2 16.9 11.2C16.2 11.2 15.7 11.5 15.7 12C15.7 13.4 19 13 19 15.4C19 17.2 17.5 18.5 15.3 18.5C14.1 18.5 13.1 18.1 12.5 17.7L13.8 16.2Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // NODE.JS
  if (norm === "node.js" || norm === "nodejs" || norm === "node") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" fill="#339933" />
        <path d="M12 4.5L18.5 8.2V15.8L12 19.5L5.5 15.8V8.2L12 4.5Z" fill="#026E00" />
        <path d="M12 6.8L16.2 9.2V14.8L12 17.2L7.8 14.8V9.2L12 6.8Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // PYTHON
  if (norm === "python") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M11.8 2C8.3 2 8.5 3.5 8.5 3.5V5.1H12.2V5.6H4.8C4.8 5.6 2 5.3 2 8.8C2 12.3 4.4 12.1 4.4 12.1H5.9V10.5C5.9 8.6 7.5 8.5 7.5 8.5H12.2C13.8 8.5 14.3 7.4 14.3 6.3V3.6C14.3 2.5 13.6 2 11.8 2ZM9.8 3.3C10.3 3.3 10.7 3.7 10.7 4.2C10.7 4.7 10.3 5.1 9.8 5.1C9.3 5.1 8.9 4.7 8.9 4.2C8.9 3.7 9.3 3.3 9.8 3.3Z"
          fill="#387EB8"
        />
        <path
          d="M12.2 22C15.7 22 15.5 20.5 15.5 20.5V18.9H11.8V18.4H19.2C19.2 18.4 22 18.7 22 15.2C22 11.7 19.6 11.9 19.6 11.9H18.1V13.5C18.1 15.4 16.5 15.5 16.5 15.5H11.8C10.2 15.5 9.7 16.6 9.7 17.7V20.4C9.7 21.5 10.4 22 12.2 22ZM14.2 20.7C13.7 20.7 13.3 20.3 13.3 19.8C13.3 19.3 13.7 18.9 14.2 18.9C14.7 18.9 15.1 19.3 15.1 19.8C15.1 20.3 14.7 20.7 14.2 20.7Z"
          fill="#FFE052"
        />
      </svg>
    );
  }

  // OPENAI
  if (norm.includes("openai") || norm.includes("ai api") || norm === "chatgpt") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#10A37F" />
        <path
          d="M17.5 10.4C17.3 8.3 15.7 6.8 13.6 6.8C13.2 6.8 12.7 6.9 12.3 7.1C11.9 6.2 11.1 5.6 10.1 5.6C8.6 5.6 7.4 6.7 7.2 8.2C6.9 8.4 6.6 8.7 6.4 9.1C5.7 10.1 5.7 11.4 6.2 12.4C6 12.8 5.9 13.3 6 13.8C6.2 15.2 7.3 16.3 8.7 16.5C8.9 17.2 9.4 17.8 10 18.1C11.1 18.7 12.5 18.5 13.4 17.7C13.8 17.9 14.3 18 14.7 17.9C16.1 17.6 17.1 16.4 17.2 15C17.7 14.5 18 13.8 18 13C18.1 12.1 17.8 11.1 17.5 10.4ZM12.3 17.1C11.6 17.1 11 16.7 10.7 16.1L11.7 15.5C11.8 15.7 12 15.8 12.3 15.8C12.8 15.8 13.2 15.4 13.2 14.9V13.8L12.3 14.3C12.1 14.4 11.9 14.4 11.7 14.4C11.1 14.4 10.5 14 10.3 13.4L9 14.2C9.4 15 10.2 15.6 11.1 15.8V17.1H12.3ZM8.3 14.8C8 14.5 7.8 14 7.8 13.5C7.8 13 8 12.5 8.4 12.2L9.4 12.8C9.2 13 9.1 13.2 9.1 13.5C9.1 14 9.4 14.4 9.8 14.6L10.7 14V12.9L9.8 12.4C9.6 12.3 9.5 12.1 9.4 11.9C9.2 11.3 9.3 10.7 9.8 10.2L8.7 9.6C8.1 10.3 7.8 11.2 8 12.1C8 12.4 8.1 12.7 8.3 13V14.8ZM8.6 8.7C9 8.2 9.6 7.9 10.3 7.9C10.8 7.9 11.3 8.1 11.6 8.4L11.2 9.5C11 9.3 10.7 9.2 10.4 9.2C9.9 9.2 9.5 9.5 9.3 9.9L9.9 10.9H11.1L11.7 10C11.8 9.8 11.9 9.6 12.1 9.5C12.7 9.2 13.3 9.4 13.7 9.9L14.7 9.1C14.1 8.4 13.3 7.9 12.3 8L11.2 8C10.2 8 9.3 8.3 8.6 8.7ZM15.7 9.2C16 9.5 16.2 10 16.2 10.5C16.2 11 16 11.5 15.6 11.8L14.6 11.2C14.8 11 14.9 10.8 14.9 10.5C14.9 10 14.6 9.6 14.2 9.4L13.3 10V11.1L14.2 11.6C14.4 11.7 14.5 11.9 14.6 12.1C14.8 12.7 14.7 13.3 14.2 13.8L15.3 14.4C15.9 13.7 16.2 12.8 16 11.9C16 11.6 15.9 11.3 15.7 11V9.2H15.7ZM15.4 15.3C15 15.8 14.4 16.1 13.7 16.1C13.2 16.1 12.7 15.9 12.4 15.6L12.8 14.5C13 14.7 13.3 14.8 13.6 14.8C14.1 14.8 14.5 14.5 14.7 14.1L14.1 13.1H12.9L12.3 14C12.2 14.2 12.1 14.4 11.9 14.5C11.3 14.8 10.7 14.6 10.3 14.1L9.3 14.9C9.9 15.6 10.7 16.1 11.7 16L12.8 16C13.8 16 14.7 15.7 15.4 15.3Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // ANTHROPIC / CLAUDE
  if (norm.includes("anthropic") || norm.includes("claude")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#D97757" />
        <path d="M13.8 6.5H16.5L12 17.5H9.3L13.8 6.5Z" fill="#FFFFFF" />
        <path d="M7.5 17.5L12 6.5H9.8L5.5 17.5H7.5Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M14.5 14.2H9.2L10.1 12.2H13.7L14.5 14.2Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // LANGCHAIN
  if (norm.includes("langchain") || norm === "rag") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#1C3C3C" />
        <circle cx="8" cy="12" r="3.5" stroke="#10B981" strokeWidth="2" />
        <circle cx="16" cy="12" r="3.5" stroke="#10B981" strokeWidth="2" />
        <path d="M10.5 12H13.5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="8" cy="12" r="1.2" fill="#FFFFFF" />
        <circle cx="16" cy="12" r="1.2" fill="#FFFFFF" />
      </svg>
    );
  }

  // PINECONE
  if (norm.includes("pinecone") || norm.includes("vector")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0D1117" />
        <path d="M12 4L19 8V16L12 20L5 16V8L12 4Z" stroke="#00D4B2" strokeWidth="1.8" fill="none" />
        <path d="M12 4V20" stroke="#00D4B2" strokeWidth="1.4" strokeOpacity="0.6" />
        <path d="M5 8L19 16" stroke="#00D4B2" strokeWidth="1.4" strokeOpacity="0.6" />
        <path d="M19 8L5 16" stroke="#00D4B2" strokeWidth="1.4" strokeOpacity="0.6" />
        <circle cx="12" cy="12" r="2.5" fill="#00D4B2" />
      </svg>
    );
  }

  // LARAVEL
  if (norm === "laravel") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF2D20" />
        <path
          d="M17.8 7.5L12 4L6.2 7.5V14.5L12 18L17.8 14.5V7.5ZM12 6L16 8.3L12 10.7L8 8.3L12 6ZM7.8 9.5L11.2 11.5V15.5L7.8 13.5V9.5ZM12.8 15.5V11.5L16.2 9.5V13.5L12.8 15.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // PHP
  if (norm === "php") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10.5" ry="6" fill="#777BB4" />
        <text x="12" y="14.5" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="7.5" letterSpacing="0.05em">
          PHP
        </text>
      </svg>
    );
  }

  // WORDPRESS
  if (norm === "wordpress") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#21759B" />
        <circle cx="12" cy="12" r="9.2" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
        <path
          d="M4.5 12C4.5 14.7 5.9 17.1 8 18.4L4.8 9.5C4.6 10.3 4.5 11.1 4.5 12ZM16.8 11.6C16.8 10.5 16.4 9.7 16 9C15.5 8.2 15 7.6 15 6.8C15 5.9 15.7 5.2 16.7 5.2C16.8 5.2 17 5.2 17.1 5.3C15.7 4.2 13.9 3.5 12 3.5C9.7 3.5 7.6 4.5 6.2 6.1C6.4 6.1 6.7 6.2 6.9 6.2C7.8 6.2 9.1 6.1 9.1 6.1C9.5 6.1 9.6 6.6 9.1 6.7C9.1 6.7 8.6 6.7 8.1 6.8L10.7 14.5L12.3 9.7L11.1 6.8C10.6 6.7 10.1 6.7 10.1 6.7C9.7 6.6 9.8 6.1 10.1 6.1C10.1 6.1 11.4 6.2 12.3 6.2C13.2 6.2 14.5 6.1 14.5 6.1C14.9 6.1 15 6.6 14.6 6.7C14.6 6.7 14.1 6.7 13.6 6.8L16.2 14.4L17.2 11.1C17.4 10.3 17.5 9.7 17.5 9.1C17.5 9 17.5 9 17.5 8.9C18.7 10.2 19.5 12 19.5 13.9C19.5 15.3 19 16.6 18.2 17.7L15.3 9.4C16.3 9.8 16.8 10.6 16.8 11.6Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // SHOPIFY
  if (norm === "shopify") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M19.4 6.8C19.3 6.6 19.1 6.5 18.9 6.5L16.5 6.2C16.4 5.3 15.8 3.5 14.1 2.3C12.8 1.4 11.5 1.5 10.8 1.8C9.5 2.5 8.9 4.1 8.7 5.4L6.1 6C5.8 6.1 5.7 6.2 5.6 6.4C5.5 6.6 4 18.4 4 18.4L13.2 21.8L20 19.2L19.4 6.8Z"
          fill="#95BF47"
        />
        <path
          d="M16.5 6.2L14 6L11.5 11.5L9 6.2L8.7 5.4C8.9 4.1 9.5 2.5 10.8 1.8C11.5 1.5 12.8 1.4 14.1 2.3C15.8 3.5 16.4 5.3 16.5 6.2Z"
          fill="#5E8E3E"
        />
        <path
          d="M12.8 9.5C12.3 9.5 11.9 9.8 11.9 10.2C11.9 11.4 14.5 11.6 14.5 13.5C14.5 15.1 13.3 16 11.7 16C9.8 16 9.2 14.8 9.2 14.8L9.9 13.6C9.9 13.6 10.5 14.4 11.6 14.4C12.2 14.4 12.6 14.1 12.6 13.7C12.6 12.4 10.1 12.2 10.1 10.3C10.1 8.8 11.2 7.8 12.7 7.8C14.1 7.8 14.8 8.6 14.8 8.6L14.2 9.7C14.2 9.7 13.6 9.5 12.8 9.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // MYSQL
  if (norm === "mysql") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#00758F" />
        <path
          d="M7 16C7 16 9 12 12 12C15 12 17 14 19 13C17 11 14 9 11 10C8.5 10.8 7 13.5 7 16Z"
          fill="#F29111"
        />
        <path
          d="M6 14C8 10 11 8 15 8C17 8 18 9 19 9C18 7.5 16 6.5 13.5 6.5C9.5 6.5 6.5 10 6 14Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // MONGODB
  if (norm === "mongodb") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2C12 2 6.5 7.5 6.5 13.5C6.5 17.5 9.5 20.8 12 22C14.5 20.8 17.5 17.5 17.5 13.5C17.5 7.5 12 2 12 2Z"
          fill="#47A248"
        />
        <path
          d="M12 2.5V21.5C12 21.5 16.5 18 16.5 13.5C16.5 8.5 12 2.5 12 2.5Z"
          fill="#499D4A"
        />
        <path
          d="M12 21.5V11L10.5 13C10.5 15.5 11.5 19 12 21.5Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />
      </svg>
    );
  }

  // FIGMA
  if (norm === "figma") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M9 3H12V9H9C7.34 9 6 7.66 6 6C6 4.34 7.34 3 9 3Z" fill="#F24E1E" />
        <path d="M12 3H15C16.66 3 18 4.34 18 6C18 7.66 16.66 9 15 9H12V3Z" fill="#FF7262" />
        <path d="M6 12C6 10.34 7.34 9 9 9H12V15H9C7.34 15 6 13.66 6 12Z" fill="#A259FF" />
        <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
        <path d="M6 18C6 16.34 7.34 15 9 15H12V18C12 19.66 10.66 21 9 21C7.34 21 6 19.66 6 18Z" fill="#0ACF83" />
      </svg>
    );
  }

  // FIGJAM
  if (norm === "figjam") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#9747FF" />
        <path d="M7 16L11 8L13 12L17 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="16" r="2" fill="#FFC700" />
      </svg>
    );
  }

  // ADOBE ILLUSTRATOR
  if (norm.includes("illustrator")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#330000" />
        <rect x="1" y="1" width="22" height="22" rx="4" stroke="#FF9A00" strokeWidth="1.5" />
        <text x="7.5" y="16.5" fill="#FF9A00" fontFamily="sans-serif" fontWeight="900" fontSize="10">
          Ai
        </text>
      </svg>
    );
  }

  // ADOBE PHOTOSHOP
  if (norm.includes("photoshop")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <rect x="1" y="1" width="22" height="22" rx="4" stroke="#31A8FF" strokeWidth="1.5" />
        <text x="7" y="16.5" fill="#31A8FF" fontFamily="sans-serif" fontWeight="900" fontSize="10">
          Ps
        </text>
      </svg>
    );
  }

  // FRAMER
  if (norm === "framer") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0055FF" />
        <path d="M7 4H17V10H12L7 4Z" fill="#FFFFFF" />
        <path d="M7 10H17L12 16H7V10Z" fill="#FFFFFF" />
        <path d="M7 16H12L7 21V16Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // GOOGLE ANALYTICS
  if (norm.includes("analytics") || norm.includes("ga4")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#F9AB00" fillOpacity="0.12" />
        <rect x="15.5" y="5" width="4.5" height="14" rx="2.25" fill="#E37400" />
        <rect x="9.5" y="9.5" width="4.5" height="9.5" rx="2.25" fill="#F9AB00" />
        <circle cx="6" cy="16.5" r="2.25" fill="#F9AB00" />
      </svg>
    );
  }

  // GOOGLE SEARCH CONSOLE
  if (norm.includes("search console")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#4285F4" fillOpacity="0.12" />
        <path d="M5 17L10 12L14 15L19 9" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="9" r="2" fill="#EA4335" />
      </svg>
    );
  }

  // HUBSPOT
  if (norm.includes("hubspot")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF7A59" />
        <circle cx="14" cy="12" r="3.5" fill="#FFFFFF" />
        <circle cx="7" cy="12" r="1.8" fill="#FFFFFF" />
        <path d="M8.8 12H10.5" stroke="#FFFFFF" strokeWidth="1.8" />
        <path d="M14 6V8.5" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="14" cy="4.8" r="1.5" fill="#FFFFFF" />
        <path d="M16.5 14.5L18.5 16.5" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="19.5" cy="17.5" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // SALESFORCE
  if (norm.includes("salesforce")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M9.5 7C11.1 5.3 13.8 5.2 15.6 6.8C16.2 6.5 16.9 6.3 17.6 6.5C19.5 6.9 20.8 8.7 20.6 10.6C21.7 11.4 22.2 12.8 21.8 14.1C21.4 15.5 20.2 16.5 18.7 16.5H6.5C4.6 16.5 3 14.9 3 13C3 11.2 4.4 9.7 6.2 9.5C6.7 7.9 8 7.2 9.5 7Z"
          fill="#00A1E0"
        />
        <text x="12" y="13.2" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="5.5" fontStyle="italic">
          CRM
        </text>
      </svg>
    );
  }

  // ZOHO
  if (norm.includes("zoho")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="5" width="8" height="6.5" rx="1.5" fill="#E42528" />
        <rect x="13" y="5" width="8" height="6.5" rx="1.5" fill="#238823" />
        <rect x="3" y="13" width="8" height="6.5" rx="1.5" fill="#006699" />
        <rect x="13" y="13" width="8" height="6.5" rx="1.5" fill="#EB8E14" />
      </svg>
    );
  }

  // ZAPIER
  if (norm.includes("zapier") || norm.includes("automation")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF4A00" />
        <path d="M12 4V20M4 12H20M6.3 6.3L17.7 17.7M17.7 6.3L6.3 17.7" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  // MAKE / INTEGROMAT
  if (norm.includes("make") || norm.includes("integromat")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#6D28D9" />
        <path d="M6 17V7L10 12L14 7V17M18 7V17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // WHATSAPP
  if (norm.includes("whatsapp")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#25D366" />
        <path
          d="M7 16.5L7.7 13.8C7.2 12.9 7 11.9 7 11C7 8.2 9.2 6 12 6C14.8 6 17 8.2 17 11C17 13.8 14.8 16 12 16C11.1 16 10.1 15.8 9.2 15.3L7 16.5ZM10.2 9.5C10.1 9.2 9.9 9.2 9.7 9.2C9.5 9.2 9.4 9.2 9.2 9.4C9 9.6 8.5 10.1 8.5 11.1C8.5 12.1 9.2 13 9.3 13.2C9.4 13.3 10.7 15.3 12.7 16.1C14.4 16.8 14.7 16.6 15.1 16.6C15.5 16.5 16.3 16 16.5 15.5C16.7 15 16.7 14.5 16.6 14.4C16.5 14.3 16.4 14.2 16.1 14.1C15.8 14 14.6 13.4 14.4 13.3C14.2 13.2 14 13.2 13.9 13.4C13.7 13.7 13.3 14.2 13.1 14.4C13 14.5 12.8 14.5 12.6 14.4C12.4 14.3 11.6 14 10.7 13.2C10 12.6 9.5 11.8 9.4 11.6C9.3 11.4 9.4 11.2 9.5 11.1C9.6 11 9.7 10.9 9.8 10.7C10 10.5 10 10.4 10.1 10.2C10.2 10.1 10.1 9.9 10.1 9.8C10 9.7 9.7 8.9 9.5 8.6L10.2 9.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // SCHEMA.ORG
  if (norm.includes("schema")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0B5394" />
        <circle cx="7" cy="7" r="2.5" fill="#FFFFFF" />
        <circle cx="17" cy="7" r="2.5" fill="#FFFFFF" />
        <circle cx="12" cy="17" r="2.5" fill="#FFFFFF" />
        <path d="M7 7L12 17L17 7" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
    );
  }

  // AHREFS
  if (norm.includes("ahrefs")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0050D8" />
        <path d="M6 18L12 6L18 18" stroke="#FF6A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 14H15.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // SEMRUSH
  if (norm.includes("semrush")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#FF642D" />
        <path d="M7 16V8L12 13L17 8V16" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // VERCEL
  if (norm === "vercel") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#000000" />
        <polygon points="12,5 20,19 4,19" fill="#FFFFFF" />
      </svg>
    );
  }

  // GITHUB
  if (norm === "github") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#24292E" />
        <path
          d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.51 10.01 17.84C7.78 18.32 7.31 16.76 7.31 16.76C6.95 15.84 6.43 15.6 6.43 15.6C5.7 15.11 6.48 15.12 6.48 15.12C7.29 15.17 7.71 15.95 7.71 15.95C8.43 17.18 9.59 16.83 10.05 16.62C10.12 16.1 10.33 15.74 10.56 15.54C8.78 15.34 6.91 14.65 6.91 11.58C6.91 10.71 7.22 10 7.73 9.45C7.65 9.25 7.38 8.43 7.81 7.35C7.81 7.35 8.48 7.14 10.01 8.18C10.65 8 11.33 7.91 12 7.91C12.67 7.91 13.35 8 13.99 8.18C15.52 7.14 16.19 7.35 16.19 7.35C16.62 8.43 16.35 9.25 16.27 9.45C16.78 10 17.09 10.71 17.09 11.58C17.09 14.66 15.22 15.34 13.43 15.54C13.72 15.79 13.98 16.28 13.98 17.04C13.98 18.13 13.97 19.01 13.97 19.21C13.97 19.42 14.12 19.67 14.53 19.59C17.71 18.53 20 15.54 20 12C20 7.58 16.42 4 12 4Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // FRAMER MOTION
  if (norm.includes("framer motion") || norm === "framer-motion") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0055FF" />
        <path d="M6 5H18V11H12L6 5Z" fill="#FFFFFF" />
        <path d="M6 11H18L12 17H6V11Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M6 17H12L6 21V17Z" fill="#FFFFFF" fillOpacity="0.6" />
      </svg>
    );
  }

  // LUCIDE
  if (norm.includes("lucide")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#F14E32" fillOpacity="0.12" />
        <path d="M12 3L4 9V21L12 15L20 21V9L12 3Z" stroke="#F14E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3V15" stroke="#F14E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // DEFAULT / TECH BADGE (CLEAN ACCENTED LOGO INSTEAD OF DARK INITIAL BOX)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#EAF4FF" />
      <rect x="1" y="1" width="22" height="22" rx="5" stroke="#062B57" strokeOpacity="0.15" />
      <path d="M8 8L16 16M16 8L8 16" stroke="#062B57" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#FF6A00" />
    </svg>
  );
}

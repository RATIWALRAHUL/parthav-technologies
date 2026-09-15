# Parthav Technologies — Software Architecture

This document describes the software architecture, directory organization, state strategies, and coding conventions for the Parthav Technologies web application.

---

## 1. System Overview

The application is built on **Next.js 15+** utilizing the modern **App Router** paradigm with strict **TypeScript** and **Pure CSS**.

```
Browser Request
      │
      ▼
Next.js App Router (src/app/layout.tsx)
      │
      ├─► Root Metadata, Fonts (Manrope, Inter), CSS Tokens
      │
      ▼
Page (src/app/page.tsx - Server Component)
      │
      ├─► Static Content Data (src/data/*.ts)
      │
      ├─► Server-Rendered Sections (Hero, Trust, Services, etc.)
      │
      └─► Client Interactive Islands ("use client")
            ├── MobileMenu Drawer
            ├── Accordion / FAQ State
            ├── Animated Process Bar
            └── Contact Form Handler
```

---

## 2. Directory Structure

```
src/
├── app/
│   ├── layout.tsx         # Global layout, HTML shell, fonts, SEO metadata
│   ├── page.tsx           # Main homepage
│   ├── globals.css        # Central CSS variables, reset, typography
│   ├── robots.ts          # Automated robots.txt generator
│   └── sitemap.ts         # Automated XML sitemap generator
├── components/
│   ├── common/            # Shared UI atoms (Button, Badge, Container, SectionTitle)
│   ├── layout/            # Layout organisms (Navbar, Footer, MobileNav)
│   └── sections/          # Feature sections (Hero, Services, WhyParthav, etc.)
├── data/                  # Static content sources (services, case studies, etc.)
├── lib/                   # Utility helpers, animation configurations, schema builders
└── types/                 # Shared TypeScript interfaces
```

---

## 3. Server vs. Client Components

### Server Components (Default)
All pages, layouts, and informational sections are React Server Components by default.
- Zero client-side JavaScript overhead for static sections.
- Instant pre-rendered HTML for search crawlers and performance benchmarks.

### Client Components (`"use client"`)
Client components are strictly isolated to UI elements that require browser interactivity:
1. `Navbar.tsx` (scroll tracking, sticky header background change, mobile menu toggle).
2. `FaqAccordion.tsx` (expand/collapse state, keyboard ARIA controls).
3. `ContactForm.tsx` (form state, client-side validation, submit feedback).
4. `MotionWrapper.tsx` (viewport animation trigger via Framer Motion).

---

## 4. State Management

- Keep state local to interactive components (`useState`, `useReducer`).
- Do not introduce heavy global state management libraries (Redux, MobX, Zustand) unless complex multi-page global flows require it.
- Keep static business data immutable in `src/data/`.

---

## 5. CSS Strategy

- **Pure CSS Architecture**: All styling is achieved through CSS custom properties and CSS modules.
- **Tailwind Prohibition**: Never install or use Tailwind CSS in this project.
- **CSS Modules**: Named `[Component].module.css` to prevent global class conflicts.
- **Globals**: `src/app/globals.css` manages design tokens, reset, typography, and utility primitives.

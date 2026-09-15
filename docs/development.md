# Parthav Technologies — Developer & Contributor Guide

Welcome to the Parthav Technologies project repository. This guide covers setup, commands, code style, CSS conventions, and QA procedures.

---

## 1. Quick Start

### Prerequisites
- Node.js `v18.18+` (recommended `v20+` or `v22+`)
- npm `v9+` or `v10+`

### Installation
```bash
# Install dependencies
npm install
```

### Local Development
```bash
# Start local development server on http://localhost:3000
npm run dev
```

### Production Build & Verification
```bash
# Type check and build production bundle
npm run build

# Start production server
npm start

# Run ESLint validation
npm run lint
```

---

## 2. Project Conventions

### Styling Rules
- **Pure CSS**: All styling must use standard CSS custom properties or CSS Modules.
- **NO Tailwind**: Do not install or introduce Tailwind CSS.
- **Tokens First**: Use variables defined in `src/app/globals.css` (`var(--color-navy)`, `var(--space-4)`, etc.).
- **BEM / Semantic Naming**: Use clear, semantic class names (e.g. `.heroSection`, `.cardTitle`, `.btnPrimary`).

### Component Guidelines
- Place shared reusable components in `src/components/common/`.
- Keep components focused and under 250 lines when feasible.
- Default to React Server Components; use `"use client"` only for user interactions.

### Data Model Conventions
- Store static content, lists, and navigation models in `src/data/` as typed TypeScript objects.
- Components read from these data sources to render repeating patterns.

---

## 3. Git Commit Conventions

Use Conventional Commits:
- `feat:` for new components, sections, or functional features
- `fix:` for bug fixes or layout adjustments
- `style:` for CSS, design token, or styling updates
- `docs:` for documentation updates
- `refactor:` for code cleanups without functional alterations
- `perf:` for Core Web Vitals and performance improvements
- `chore:` for dependency and build configuration updates

---

## 4. Pre-Commit / Pre-PR Checklist

Before submitting changes, ensure:
1. `npm run lint` passes with zero errors.
2. `npm run build` succeeds cleanly.
3. No secret keys or credentials are included in code or `.env`.
4. Visual QA verifies responsive fidelity at `375px`, `768px`, and `1440px`.
5. Tab navigation and focus rings are fully functional.

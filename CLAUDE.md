# CLAUDE.md — Project Memory & AI Development Instructions

> **CRITICAL**: Claude Code and any AI agent working on this codebase MUST read, understand, and strictly follow every rule in this document before proposing, planning, or executing any modifications.

---

## 1. Project Identity

- **Brand Name**: PARTHAV TECHNOLOGIES
- **Tagline**: Ideas to Impact.
- **Positioning**: Digital experiences. Built for growth.
- **Company**: PARTHAV TECHNOLOGIES
- **Location**: Jaipur, India ("Built in Jaipur. Designed for the world.")
- **Primary Services**:
  - UI/UX & Product Design
  - Web Development
  - SEO & Digital Growth
  - AI Solutions & Automation
- **Target Market**: Ambitious businesses and global teams seeking high-end digital products, scalable web platforms, strategic SEO growth, and modern AI automation.
- **Brand Personality**:
  - Premium & Intelligent
  - Confident & Authoritative
  - Human & Collaborative
  - Modern & Minimal
  - Strategic & Results-Focused
  - Trustworthy & Transparent

*The website must feel like a serious, high-caliber international digital engineering partner competing with established global agencies, NOT a generic local template.*

---

## 2. Product Vision

Deliver a premier 2026 digital agency web presence for Parthav Technologies that turns ideas into high-performance digital reality. The product must balance razor-sharp editorial typography, generous whitespace, curated color harmonies, responsive layout fidelity, and seamless micro-interactions without vanity noise or superficial gimmicks.

---

## 3. Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React (Server Components by default)
- **Styling**: **Pure CSS** & **CSS Modules** (`.module.css`) alongside centralized CSS custom properties / tokens.
- **Motion & Interactions**: Framer Motion
- **Icons**: Lucide React
- **Optimization**: `next/image` and `next/font` (Google Fonts: Manrope & Inter)

> ### ⚠️ STRICT PROHIBITION: TAILWIND CSS
> - Tailwind CSS is **STRICTLY FORBIDDEN**.
> - Never install, import, configure, or introduce Tailwind CSS or utility frameworks like UnoCSS, WindiCSS, or Bootstrap.
> - Never convert existing Pure CSS into Tailwind classes.
> - Never install external UI kit component libraries (such as shadcn/ui, MUI, Chakra) without explicit user authorization.

---

## 4. Architecture

Follow a clean, predictable, and maintainable App Router structure:

```
src/
├── app/                  # Next.js App Router (pages, layout, globals.css, metadata)
│   ├── layout.tsx        # Root layout (fonts, metadata, root provider)
│   ├── page.tsx          # Homepage view
│   ├── globals.css       # Global design tokens, reset, typography, utilities
│   ├── robots.ts         # Search engine robots definition
│   └── sitemap.ts        # Dynamic XML sitemap
├── components/           # Reusable modular UI components
│   ├── common/           # Button, Container, SectionHeader, Badge, etc.
│   ├── layout/           # Navbar, Footer, MobileMenu
│   └── sections/         # Hero, Services, WhyParthav, Process, CaseStudies, etc.
├── data/                 # Structured static data & content models
│   ├── navigation.ts     # Menu links & footer structure
│   ├── services.ts       # Service definitions & capability pills
│   ├── case-studies.ts   # Verified project case studies & previews
│   ├── process.ts        # 5-step delivery pipeline
│   ├── faq.ts            # Verified FAQ items
│   └── company.ts        # Company info, values, contact details
├── lib/                  # Utilities, animations, schema generators
│   └── utils.ts
└── types/                # TypeScript interface and type declarations
```

### Architecture Rules:
- **Server Components by Default**: Pages and static presentation components must remain React Server Components.
- **Selective `"use client"`**: Restrict client components to interactive surfaces only (e.g. mobile navigation drawer, accordion state, form handling, Framer Motion viewport triggers).
- **Separation of Concerns**: Keep content models in `src/data/` rather than hardcoding static content deep within JSX markup.
- **No Monolithic Components**: Avoid multi-thousand line files. Break sections into clean, focused sub-components.

---

## 5. Design System

The Parthav design system is the single source of truth. All styles must stem from established CSS custom properties defined in `src/app/globals.css`.

### Brand Colors:
- **Primary Navy**: `#062B57` (`--color-navy`)
- **Deep Navy**: `#031B3A` (`--color-deep-navy`)
- **Primary Orange**: `#FF6A00` (`--color-orange`)
- **Bright Orange**: `#FF7A00` (`--color-orange-light`)
- **Pure White**: `#FFFFFF` (`--color-white`)
- **Soft Background**: `#F7FAFD` (`--color-bg-light`)
- **Blue Tint**: `#EAF4FF` (`--color-blue-tint`)
- **Primary Text**: `#10243E` (`--color-text-primary`)
- **Muted Text**: `#66758A` (`--color-text-muted`)
- **Subtle Accents**:
  - Mint Accent: `#EAF7F2`
  - Lavender Accent: `#F4EEFF`
  - Warm Peach Accent: `#FFF4EA`

*Do not introduce arbitrary hex colors into components. If an additional token is required, document it in `docs/design-system.md` and declare it in `:root`.*

---

## 6. UI Consistency Rules

- The website must feel like **ONE cohesive design system**.
- Repeated UI elements (buttons, cards, badges, headings, inputs) must use shared components from `src/components/common/`.
- If a component already exists, **REUSE IT**; do not duplicate variations with slightly differing styles.
- Maintain consistent visual weight, elevation, and margins across every section.

---

## 7. Typography Rules

- **Heading Font**: `Manrope` (`var(--font-heading)`)
- **Body Font**: `Inter` (`var(--font-body)`)

### Typographic Scale:
- **Hero H1**: `clamp(2.125rem, 5vw + 1rem, 4.5rem)` (64–76px desktop, 42–48px tablet, 34–40px mobile)
- **Section H2**: `clamp(1.75rem, 3.5vw + 0.5rem, 3rem)` (44–52px desktop)
- **Section H3**: `clamp(1.25rem, 2vw + 0.25rem, 1.75rem)` (24–32px)
- **Body Text**: `1rem` to `1.125rem` (16–18px), line-height: `1.65`
- **Micro Labels / Eyebrows**: `0.75rem` to `0.8125rem` (12–13px), uppercase, letter-spacing: `0.12em`, font-weight: `700`

Use responsive `clamp()` to scale typography fluidly across viewports. Avoid erratic font sizes or random weight changes.

---

## 8. Color Rules

- **Navy (`#062B57` / `#031B3A`)**: Used for authoritative section backgrounds (Why Parthav, SEO/AI Growth, Final CTA), primary headings, and deep contrast accents.
- **Orange (`#FF6A00` / `#FF7A00`)**: Reserved for:
  - Primary CTA buttons
  - Highlighted emphasis words in headlines
  - Active navigation indicators
  - Accent dividers and progress lines
  - Key metric values
- **DO NOT OVERUSE ORANGE**: It is a high-energy focal color. When everything is orange, nothing stands out.

---

## 9. Spacing Rules

Strict **8px-based spacing grid**:
- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-6`: `24px`
- `--space-8`: `32px`
- `--space-10`: `40px`
- `--space-12`: `48px`
- `--space-16`: `64px`
- `--space-20`: `80px`
- `--space-24`: `96px`
- `--space-32`: `128px`

Do not write arbitrary values like `17px`, `29px`, or `37px` without clear optical justification. Sections must have generous breathing room (`80px` to `120px` desktop padding).

---

## 10. Component Rules

- **Container**: Max content width `1280px` (extendable up to `1320px`), centered, with horizontal padding:
  - Desktop: `48px` to `64px`
  - Tablet: `32px`
  - Mobile: `20px`
- **Buttons**:
  - **Primary**: Solid orange background, white bold text, subtle hover lift, arrow slide.
  - **Secondary**: Transparent or white background, navy border/text, subtle navy tint hover.
  - **Text Link**: Minimal text with right arrow transition.
- **Border Radius**:
  - Subtle cards / inputs: `8px` to `12px`
  - Standard cards: `16px` to `20px`
  - Large container blocks: `24px` to `28px`
  - Pill shape (`9999px`): Reserved strictly for tags, status indicators, and compact badges.
- **Shadows**:
  - Low-opacity, diffuse shadows only (`rgba(6, 43, 87, 0.06)` to `rgba(6, 43, 87, 0.12)`).
  - Never apply harsh, muddy drop shadows or heavy neon glows.

---

## 11. Animation Rules

- **Philosophy**: Restrained, editorial, and purposeful. Animations should confirm user intent and guide the eye, never distract.
- **Timing Function**: `cubic-bezier(0.22, 1, 0.36, 1)` (spring-like ease-out)
- **Durations**:
  - Micro-interactions (hover, active, icons): `150ms` – `250ms`
  - Section reveals and card staggered fade-ups: `400ms` – `700ms`
- **Permitted Effects**: Smooth fade-up reveals, card hover elevation (`translateY(-4px)`), button arrow displacement, image scale (`1.02` to `1.04`), step progress line reveal.
- **Forbidden**: Chaotic bouncing, endless 360-degree spinners, gratuitous full-page 3D meshes, parallax sickness.

---

## 12. Responsive Rules

Support fluid layout across the full responsive spectrum:
- Mobile: `320px` – `767px`
- Tablet: `768px` – `1024px`
- Desktop: `1025px` – `1440px`
- Ultra-wide: `1441px`+

### Mobile Layout Patterns:
- Mobile must **never** be a shrunk-down desktop layout.
- Stacks multi-column grids into single columns logically.
- Hero media displays below hero headline and CTA on mobile devices.
- Touch targets must remain at least `44px x 44px`.
- Mobile navigation uses a clean drawer/modal with accessible focus trap.

---

## 13. Accessibility Rules (WCAG 2.1 AA)

- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<section>`).
- Heading hierarchy must be strictly sequential (`H1` -> `H2` -> `H3`). Never skip heading levels.
- Every interactive element must be keyboard accessible with visible, non-obscured focus outlines.
- Use native `<button>` and `<a href="...">` elements. Never bind click handlers to unadorned `<div>` or `<span>` elements.
- Meaningful `aria-expanded`, `aria-controls`, and `aria-label` tags on accordions, menus, and icon-only triggers.
- Minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text.

---

## 14. Reduced Motion

All animations must honor user operating system preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In Framer Motion, set animations to respect `prefers-reduced-motion` or provide graceful non-animated fallbacks.

---

## 15. SEO Rules

- Single `<h1>` per page on the homepage.
- Meta title format: `Parthav Technologies | UI/UX, Web Development, SEO & AI`
- Meta description: High-impact, concise summary highlighting services, location (Jaipur, India), and global capabilities.
- Complete OpenGraph and Twitter/X card tags with absolute image URLs.
- Canonical URL configured.
- Structured Data (JSON-LD):
  - `Organization`
  - `LocalBusiness`
  - `WebSite`
  - `Service`
- Native `sitemap.xml` and `robots.txt` generated via Next.js metadata routes.

---

## 16. Performance Rules

- Target Lighthouse scores: **95+** for Performance, Accessibility, Best Practices, and SEO.
- Zero client-side bundle bloat: do not import heavy visualization libraries for simple UI tasks.
- Static rendering where possible with fast server-side delivery.
- Fonts optimized via `next/font` with font-display: swap.
- Keep critical CSS lean and non-blocking.

---

## 17. Image Rules

- All images rendered via `next/image` with explicit `width`, `height`, and appropriate `sizes` attribute.
- Modern formats enabled (`image/avif`, `image/webp`).
- Meaningful, descriptive `alt` text for informational graphics; `alt=""` for purely decorative items.
- Use `priority` only on above-the-fold hero imagery.
- Maintain consistent editorial photographic grading (warm, natural daylight, Jaipur architectural cues, clean modern workspace).

---

## 18. Content & Integrity Rules

> ### 🛑 ZERO FABRICATION POLICY
> - **Never invent false client relationships** (e.g. do not claim Fortune 500 enterprise clients if Parthav has not worked with them).
> - **Never invent fake testimonials, employee counts, founding dates, or phony awards**.
> - In portfolio sections, use explicit markers such as **"CASE STUDY PREVIEW"** or **"Representative project data"** when presenting conceptual work.
> - Trust bars must emphasize design principles (`DESIGN-LED • ENGINEERING-DRIVEN • GROWTH-FOCUSED`) rather than unverified logos.

---

## 19. Data Management

Repeatable content must reside in typed data files under `src/data/`:
- `src/data/navigation.ts`
- `src/data/services.ts`
- `src/data/case-studies.ts`
- `src/data/process.ts`
- `src/data/faq.ts`
- `src/data/company.ts`

Components consume typed data structures, ensuring clear maintenance and straightforward updates.

---

## 20. CSS Rules

- Use pure, clean, modern CSS.
- Keep custom property names consistent (`--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--shadow-*`).
- Prefer CSS Modules (`Component.module.css`) for component encapsulation.
- Do not use `!important` except for accessibility resets.
- Avoid deeply nested selectors (> 3 levels).
- Avoid inline styles for non-dynamic design properties.

---

## 21. Git Rules

Use the Conventional Commits specification:
- `feat:` New feature or section implementation
- `fix:` Bug or visual defect fix
- `style:` CSS, typography, layout, or cosmetic refinement
- `refactor:` Code restructuring without behavior change
- `perf:` Performance optimization
- `docs:` Documentation updates
- `chore:` Tooling, dependency, or config maintenance

Keep commits granular and atomic. Never commit generated artifacts (`.next/`, `node_modules/`) or secrets (`.env.local`).

---

## 22. AI Coding Rules

When acting as an AI engineer on this project:
1. **Inspect before editing**: Read existing files, styles, and data structures.
2. **Respect the existing architecture**: Do not rewrite working modules or invent divergent paradigms.
3. **Make the smallest clean change**: Solve the task with precision; avoid churn.
4. **Preserve comments and design rationale**: Never strip explanatory documentation.
5. **Enforce visual and code consistency**: Match tokens, naming conventions, and code formatting.

---

## 23. Visual Loop (Iterative Visual QA)

For every major UI section:
1. **Build**: Code the section based on design tokens and reference specifications.
2. **Render**: Launch browser subagent or local dev server to inspect visual output.
3. **Compare**: Compare side-by-side with `images/homepageref2.png`.
4. **Diagnose**: Pinpoint discrepancies in proportions, margins, typography, or card geometry.
5. **Refine**: Correct the largest visual discrepancies first.
6. **Re-render**: Validate the adjustments in the browser.
7. **Lock**: Preserve the verified section and move forward.

---

## 24. Before Making Changes Checklist

- [ ] Have I reviewed `CLAUDE.md` and `docs/design-system.md`?
- [ ] Does an existing component already solve this requirement?
- [ ] Am I using CSS variables for colors, typography, and spacing?
- [ ] Is the proposed component Server-rendered unless interactivity requires client hooks?
- [ ] Does the visual plan conform to `images/homepageref2.png`?

---

## 25. After Making Changes Checklist

- [ ] `npm run lint` passes with 0 warnings/errors.
- [ ] `npm run build` succeeds without type errors.
- [ ] No Tailwind CSS classes or dependencies were introduced.
- [ ] Layout verified on both Desktop (1440px) and Mobile (375px/390px).
- [ ] Keyboard navigation and focus rings are operational.
- [ ] No fabricated client names or numbers exist in the copy.

---

## 26. Things Claude Must Never Do

1. **NEVER** install or configure Tailwind CSS or similar utility frameworks.
2. **NEVER** invent fake client logos, fabricated case studies, or fraudulent metrics.
3. **NEVER** redesign sections into an unapproved aesthetic; `images/homepageref2.png` is the authority.
4. **NEVER** create redundant duplicate components when a shared one exists.
5. **NEVER** scatter arbitrary hardcoded colors or spacing values throughout CSS.
6. **NEVER** make the entire application a client component (`"use client"` at root).
7. **NEVER** compromise accessibility or keyboard interaction for decorative visual flair.
8. **NEVER** expose secrets, credentials, or personal contact numbers.

---

# Current Project Status

- **Current phase**: `PHASE 1 COMPLETE (NAVBAR + HERO)`
- **Completed**:
  - Next.js 15+ App Router setup with Turbopack (`next dev --turbo`)
  - Strict TypeScript configuration
  - Pure CSS design token architecture (`globals.css`, `variables.css`, `reset.css`, `typography.css`, `utilities.css`, `animations.css`)
  - Google Font integration (`Manrope` & `Inter`)
  - Production Git configuration (`.gitignore`), `.env.example`, and full documentation suite (`docs/*`)
  - Phase 1 UI: Sticky elevated Navbar with desktop navigation, mobile drawer with Framer Motion, and brand logo
  - Phase 1 UI: Hero section matching reference composition (`DIGITAL PRODUCTS • WEB • AI • GROWTH`, H1 with orange highlight, supporting copy, dual CTAs, client avatar cluster, right-column workspace visual with Jaipur skyline, and animated floating card)
  - Turbopack dev server verified active on `http://localhost:3000` with HTTP 200
- **Current task**: Stop and wait for user review on Phase 1 (Navbar + Hero).
- **Next task**: Phase 2 — Trust Bar + Services section.
  1. Navbar
  2. Hero
  3. Trust Bar
  4. Services
  5. Why Parthav
  6. Impact / Numbers
  7. Case Studies (Featured Work)
  8. Process
  9. About Us
  10. SEO + AI Growth
  11. Testimonials
  12. FAQ Accordion
  13. Contact Form & WhatsApp quick card
  14. Final CTA (Deep Navy wave section)
  15. Footer
  16. SEO, Schema & Sitemap verification
  17. Performance & Accessibility audit
  18. Final visual QA loop against reference

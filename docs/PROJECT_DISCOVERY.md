# Project Discovery & Technical Baseline: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Senior Technical Architecture Team  
**Repository:** `parthav-technologies` (Workspace: `r:\p`)  
**Status:** Complete Technical Discovery Audit  

---

## 1. Executive Technical Summary

An exhaustive audit of the actual codebase was performed to baseline the technical, architectural, operational, and commercial readiness of the **PARTHAV TECHNOLOGIES** web platform.

### High-Level Baseline Finding:
The repository is an expertly styled, high-fidelity **Next.js 15 (App Router)** frontend marketing application utilizing pure CSS modules, TanStack React Query (client cache), Framer Motion, and Lucide React. However, **there is currently NO persistent backend database, NO authentication/authorization layer, NO CMS or administrative dashboard, and NO active email/newsletter delivery service**. Inbound contact inquiries and chat leads are either logged to stdout via an unpersisted Next.js route handler or committed to client-side browser `localStorage`.

---

## 2. Detected Technology Stack

| Layer | Declared / Discovered Technology | Version / Configuration | Evidence / File Source |
|---|---|---|---|
| **Core Framework** | Next.js (App Router) | `^15.2.1` | [`package.json`](file:///r:/p/package.json#L21) |
| **Runtime & Language** | React + TypeScript (Strict) | React `^19.0.0`, TS `^5.7.3` | [`package.json`](file:///r:/p/package.json#L23-L24), [`tsconfig.json`](file:///r:/p/tsconfig.json) |
| **Styling Architecture** | Pure CSS & CSS Modules (Zero Tailwind) | Central CSS variables + BEM-style `.module.css` | [`src/app/globals.css`](file:///r:/p/src/app/globals.css), [`src/styles/variables.css`](file:///r:/p/src/styles/variables.css) |
| **Design Tokens & Fonts** | Google Fonts via `next/font` | `Manrope` (Headings) & `Inter` (Body) | [`src/app/layout.tsx`](file:///r:/p/src/app/layout.tsx#L11-L23) |
| **Client State / Async Cache**| TanStack React Query | `^5.104.1` | [`src/components/providers/QueryProvider.tsx`](file:///r:/p/src/components/providers/QueryProvider.tsx) |
| **Animations / Transitions** | Framer Motion | `^12.4.7` | [`package.json`](file:///r:/p/package.json#L19), [`src/lib/motion.ts`](file:///r:/p/src/lib/motion.ts) |
| **Icons** | Lucide React | `^0.475.0` | [`package.json`](file:///r:/p/package.json#L20) |
| **Component Testing / Docs** | Storybook Next.js | `^10.6.1` | [`.storybook/`](file:///r:/p/.storybook), [Story files](file:///r:/p/src/components/) |
| **Database** | **None** (Absent) | No ORM, SQL, or document DB configured | Verified across entire workspace |
| **Authentication** | **None** (Absent) | No NextAuth, Clerk, Supabase, or JWT | No auth middleware or session logic |
| **Email Delivery** | **None** (Absent) | Only `console.info` in API route | [`src/app/api/contact/route.ts`](file:///r:/p/src/app/api/contact/route.ts#L111) |
| **Lead Persistence** | In-memory + browser `localStorage` | Not production persistent | [`src/components/chat/chat.service.ts`](file:///r:/p/src/components/chat/chat.service.ts#L167) |
| **Deployment Target** | Node.js / Vercel (Standard Next.js) | Configured with static optimization & rewrites | [`next.config.ts`](file:///r:/p/next.config.ts) |

---

## 3. Project Folder Structure

```
r:/p/
├── .env.example              # Minimal site URL template (no database or mail secrets)
├── .eslintrc.json            # ESLint config (Next.js core-web-vitals + storybook)
├── .storybook/               # Storybook design system environment
├── docs/                     # Architectural, content, and design guidelines
│   ├── architecture.md
│   ├── content-rules.md
│   ├── design-system.md
│   └── development.md
├── next.config.ts            # Image formats, polling watcher, service URL rewrites
├── package.json              # Next 15, React 19, Framer Motion, TanStack Query
├── public/                   # Static images, WebP assets, logos, favicon
├── src/
│   ├── app/                  # Next.js App Router entrypoints
│   │   ├── about/            # Dedicated About page
│   │   ├── api/
│   │   │   └── contact/      # Inbound contact form route handler
│   │   ├── contact/          # Dedicated Contact page
│   │   ├── services/         # Services hub, 6 category pages, and dynamic micro route
│   │   │   ├── [category]/[micro]/ # Dynamic SSG micro-service detail routes
│   │   │   ├── ai-automation/
│   │   │   ├── branding-digital-identity/
│   │   │   ├── crm-business-automation/
│   │   │   ├── seo-digital-growth/
│   │   │   ├── ui-ux-product-design/
│   │   │   └── web-development/
│   │   ├── error.tsx         # Global error fallback
│   │   ├── globals.css       # Core CSS imports
│   │   ├── layout.tsx        # HTML shell, JSON-LD, fonts, providers
│   │   ├── not-found.tsx     # Custom 404 page
│   │   ├── page.tsx          # Comprehensive homepage
│   │   ├── robots.ts         # Automated robots.txt definition
│   │   └── sitemap.ts        # Automated XML sitemap generator
│   ├── components/
│   │   ├── about/            # AboutHero, FoundingStory
│   │   ├── chat/             # Floating assistant, lead-capture modal, FAQ flows
│   │   ├── common/           # Shared TechLogo vector registry
│   │   ├── contact/          # ContactHero, OfficeSection
│   │   ├── home/             # Hero, ServicesCarousel, Process, CaseStudies, etc.
│   │   ├── layout/           # Navbar, Footer
│   │   ├── providers/        # QueryProvider
│   │   ├── services/         # Service templates, ComingSoon modal, CategoryNav
│   │   ├── technology/       # TechStackShowcase, TechnologyCard
│   │   ├── ui/               # Button, CustomSelect, Reveal, ScrollToTop, etc.
│   │   └── web-development/  # TechStack, FeaturedWork, WebDevTestimonialsFaq
│   ├── data/                 # Static data registries (services, projects, faq)
│   ├── hooks/                # React Query hooks (contact, chat, comingSoon)
│   ├── lib/                  # Utilities, SEO builders, Lucide icon resolvers
│   └── styles/               # Design tokens, typography, animations, utilities
└── tsconfig.json             # TypeScript strict configuration
```

---

## 4. Existing Architecture & Data Flow

### 4.1 Server vs. Client Components:
- **Server Components (Default):** All top-level page routes (`page.tsx`, `layout.tsx`, `services/page.tsx`, category pages, and dynamic micro-service pages) are React Server Components. They generate static HTML with zero client-side React overhead.
- **Client Interactive Islands (`"use client"`):**
  - Sticky Navbar & mobile navigation drawer (`Navbar.tsx`)
  - Accordion FAQ and service tabs (`FAQ.tsx`, `ServicesCarousel.tsx`)
  - Interactive forms (`Contact.tsx`, `ContactHero.tsx`, `ComingSoonModal.tsx`)
  - Floating Chat Widget (`FloatingChatWidget.tsx`, `ChatWindow.tsx`)
  - Viewport scroll indicators and animations (`ScrollToTop.tsx`, `Reveal.tsx`)

### 4.2 Data Management:
- All core business entities (Main Services, Micro-Services, Case Studies, Testimonials, FAQ items, Company info) reside in **static TypeScript data registries** in `src/data/`.
- There is **no runtime CMS** and **no database**. Content updates currently require Git commits and code redeployments.

---

## 5. Existing Integrations & Third-Party Services

| Integration / Service | Configured in Code | Actual Operational Status | Risk / Gap |
|---|---|---|---|
| **Google Fonts** | `Manrope`, `Inter` via `next/font/google` | Active & Verified | None. Zero layout shift. |
| **JSON-LD Structured Data** | Organization, LocalBusiness, WebSite, Service, Breadcrumbs | Implemented across layouts & pages | Requires canonical URL domain coordination. |
| **Contact Email API** | `/api/contact` | Partially implemented; logs to server console | **Inquiries are NOT emailed to staff and NOT saved to a database.** |
| **Newsletter Service** | None | Absent | No newsletter capture endpoint or mailing list provider exists. |
| **Chat Lead Capture** | `chatService.submitLead()` | UI-only mock; saves to browser `localStorage` | **Data lost if user clears cache or changes device. Staff never sees leads.** |
| **Social Links** | LinkedIn, Instagram, YouTube, Behance | Hardcoded in `src/data/company.ts` | Validated outbound links. |
| **Maps / Office** | Address in Jaipur, Rajasthan | Static representation & visual map card | No external Google Maps API key billing exposure. |

---

## 6. Database and API Architecture

### 6.1 Database:
- **Status:** **Completely Absent.**
- There are no Prisma, Drizzle, Mongoose, Supabase, PostgreSQL, or MongoDB client libraries installed in `package.json`.
- No database connection strings exist in `.env.example`.

### 6.2 Existing API Routes:
Only one route exists:
- `POST /api/contact` ([`src/app/api/contact/route.ts`](file:///r:/p/src/app/api/contact/route.ts)):
  - **In-memory rate limiting:** Map with 5 requests/minute per IP (lost on process restart).
  - **Honeypot protection:** Returns fake success if `website` or `honeypot` fields are filled.
  - **Sanitization:** Basic regex stripping of `<` and `>`.
  - **Persistence:** None. Executes `console.info` and returns `{ success: true, id }`.

---

## 7. Deployment Setup & Environment

- **Build Pipeline:** `next build` generates static pages (SSG) for all pre-defined routes and a dynamic Node.js server route for `/api/contact`.
- **Image Optimization:** Uses `next/image` with WebP and AVIF enabled in `next.config.ts`.
- **Environment Variables:** Only `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` are defined in `.env.example`. No backend secrets are exposed.

---

## 8. Technical Risks & Uncertainties

1. **Lead Loss Risk (Critical):** Any prospective client submitting a project through the website or the chat assistant has their inquiry logged only to ephemeral server logs or their own browser's `localStorage`.
2. **Missing Legal Pages (Compliance Risk):** No `/privacy-policy` or `/terms-and-conditions` routes exist. Inbound forms collect personal data (Name, Email, Phone) without linked legal disclosures.
3. **Anchor Navigation Loops (UX Risk):** Navigation and CTAs on sub-pages link to `/#work` and `/#process`. Clicking these forces users back to the homepage instead of dedicated portfolio or process views.
4. **Sitemap Hash URLs (SEO Defect):** `src/app/sitemap.ts` includes `/#work`, `/#process`, and `/#contact`. Search engine crawlers reject fragments (`#`) in XML sitemaps.

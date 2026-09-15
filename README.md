# PARTHAV TECHNOLOGIES

**Ideas to Impact.**

Parthav Technologies is a premier digital technology partner based in Jaipur, India, specializing in UI/UX & Product Design, Web Development, SEO & Digital Growth, and AI Solutions & Automation. Built in Jaipur. Designed for the world.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Engine**: React (Server Components by default)
- **Language**: TypeScript
- **Styling**: Pure CSS & CSS Modules (Strictly **NO Tailwind CSS**)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Manrope (Headings) & Inter (Body) via `next/font`

---

## Development

Install project dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build

Compile and generate production bundle:
```bash
npm run build
```

Run ESLint verification:
```bash
npm run lint
```

---

## Start

Serve the production build locally:
```bash
npm start
```

---

## Architecture

The project follows a clean, modular structure:

- `src/app/`: Next.js App Router root layout, global tokens, metadata, routes, sitemap, and robots.
- `src/components/common/`: Reusable primitive UI components (Buttons, Badges, Containers, SectionHeaders).
- `src/components/layout/`: Layout components (Navbar, Footer, MobileMenu).
- `src/components/sections/`: Discrete homepage sections.
- `src/data/`: Structured static data files for services, case studies, process steps, FAQs, and company info.
- `src/lib/`: Utilities, animation variants, and schema markup helpers.
- `public/`: Public assets, logos, and optimized web imagery.

For detailed architecture documentation, see:
[docs/architecture.md](docs/architecture.md)

---

## Design System

All components align to centralized CSS custom properties in `src/app/globals.css` with an 8px spacing grid, restrained border radiuses, subtle shadows, and editorial typography.

Reference specification:
[docs/design-system.md](docs/design-system.md)

---

## Content Rules & Authenticity

Parthav Technologies maintains a zero-fabrication policy regarding client relationships, testimonials, and verified statistics.

Reference rules:
[docs/content-rules.md](docs/content-rules.md)

---

## AI Development Rules

Claude Code and any AI agents must review and strictly abide by the permanent instructions:

Reference memory:
[CLAUDE.md](CLAUDE.md)

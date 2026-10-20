# Admin Dashboard Architecture & Implementation Roadmap: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Senior Systems Architect  
**Scope:** Admin Dashboard Discovery, Module Specifications, Endpoints, Schemas & Roadmap  

---

## 1. Existing Admin Dashboard Status

- **Codebase Discovery Status:** **Completely Absent.**
- There are no admin routes in `src/app/` (e.g. `src/app/admin`, `src/app/dashboard`, or `src/app/portal`).
- No protected layout or middleware checks exist (`middleware.ts` is absent).
- No admin UI components, tables, or credential forms exist.
- Agency personnel currently have no internal portal to view inbound inquiries, export subscribers, manage content, or review system health.

---

## 2. Dashboard Technical Architecture & Design Rules

1. **Routing Location:** `src/app/admin/(protected)/...` with an isolated layout that excludes the public consumer `Navbar` and `Footer`.
2. **Design Language:** Inherits Parthav design tokens (`--color-navy`, `--color-orange`, `--color-light`, Manrope & Inter fonts) in a clean, high-density data workstation interface.
3. **Pure CSS Modules:** Zero Tailwind; utilizes modular CSS modules (`AdminTable.module.css`, `AdminCard.module.css`).
4. **Security Enforcement:**
   - Server-side route validation in `src/middleware.ts`.
   - All admin API routes verify authenticated session tokens with HTTP-only cookies before returning data.
   - Zero sensitive API secrets displayed in client-rendered UI.

---

## 3. Recommended Admin Dashboard Modules

### Module 1: Executive Overview (`/admin`)

- **Existing Status:** Missing.
- **Required Functionality:**
  - Real-time count of total inquiries, unread leads, qualified prospects, and active subscribers.
  - Recent activity feed (inquiries received in last 48 hours).
  - Quick action buttons (view new leads, export subscribers).
  - **Rule:** Displays ONLY verified operational data from the database. Zero vanity metrics or fabricated statistics.
- **Required API Endpoints:** `GET /api/admin/metrics/overview`
- **Permissions:** Admin, SuperAdmin.
- **UI Components:** `MetricCard`, `ActivityFeed`, `QuickActionRow`.
- **Acceptance Criteria:** Loads in <250ms with live counts from SQLite/PostgreSQL.

---

### Module 2: Lead & Inquiry Management (`/admin/leads`)

- **Existing Status:** Missing (currently unpersisted stdout).
- **Required Functionality:**
  - Paginated data table (25 leads per page) with search by name, email, company, and phone.
  - Filter tabs: `All`, `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost`, `Spam`.
  - Detailed lead drawer: view full message, project scope, budget range, and submission timestamp.
  - Status transition dropdown with instant update.
  - Internal staff notes log.
  - Filtered CSV export.
- **Required API Endpoints:**
  - `GET /api/admin/inquiries` (supports `?page=1&limit=25&status=NEW&search=acme`)
  - `GET /api/admin/inquiries/[id]`
  - `PATCH /api/admin/inquiries/[id]/status`
  - `POST /api/admin/inquiries/[id]/notes`
  - `GET /api/admin/inquiries/export?format=csv`
- **Database Changes:** `Inquiry` and `InquiryNote` tables.
- **Permissions:** Admin, SuperAdmin.
- **UI Components:** `DataTable`, `StatusBadge`, `FilterTabs`, `InquiryDetailDrawer`, `NotesTimeline`.
- **Acceptance Criteria:** Status changes update immediately with optimistic UI and persist to database.

---

### Module 3: Services Management (`/admin/services`)

- **Existing Status:** Managed via static TypeScript registry ([`src/data/main-services.ts`](file:///r:/p/src/data/main-services.ts)).
- **Recommendation:** **Do NOT build a complex dynamic database CRUD editor.**
  - *Reasoning:* The service catalogue contains 6 core hubs and 127 micro-services tightly tied to static routing and SEO metadata. Modifying service slugs dynamically creates broken SEO links and 404s.
  - *Alternative:* A read-only verification view listing all 127 services with their availability status (`available` vs `coming-soon`), live routes, and icon assignments.
- **API Endpoints:** None needed (reads static registry).

---

### Module 4: Portfolio & Case Studies (`/admin/portfolio`)

- **Existing Status:** Static array of 3 projects in [`src/data/projects.ts`](file:///r:/p/src/data/projects.ts).
- **Required Functionality (P2):**
  - Ability to create and edit case study records: Title, Client Industry, Challenge, Solution, Services Delivered, Metric Value, Metric Label, Cover Image, and Featured toggle.
  - Draft and Published status toggles.
- **Required API Endpoints:**
  - `GET /api/admin/projects`
  - `POST /api/admin/projects`
  - `PUT /api/admin/projects/[id]`
  - `DELETE /api/admin/projects/[id]`
- **Database Changes:** `Project` table.
- **Permissions:** Editor, Admin, SuperAdmin.

---

### Module 5: Blog & Insights (`/admin/blog`)

- **Existing Status:** Missing.
- **Required Functionality (P2):**
  - Markdown/rich-text editor for publishing technical articles and thought leadership.
  - Fields: Title, Slug (auto-generated & validated), Excerpt, Author, Category, Cover Image, Reading Time, Meta Title, Meta Description, Publish Date, and Status (`DRAFT` / `PUBLISHED`).
- **Required API Endpoints:**
  - `GET /api/admin/posts`
  - `POST /api/admin/posts`
  - `PUT /api/admin/posts/[id]`
  - `DELETE /api/admin/posts/[id]`
- **Database Changes:** `Post` and `Category` tables.

---

### Module 6: Newsletter Subscribers (`/admin/subscribers`)

- **Existing Status:** Missing.
- **Required Functionality:**
  - View subscriber list with subscription dates, status (`ACTIVE` vs `UNSUBSCRIBED`), and source page.
  - Search by email address.
  - One-click CSV export for importation into email marketing tools.
- **Required API Endpoints:**
  - `GET /api/admin/subscribers`
  - `GET /api/admin/subscribers/export?format=csv`
  - `DELETE /api/admin/subscribers/[id]`
- **Database Changes:** `Subscriber` table.

---

### Module 7: Admin User Management & Access Control (`/admin/users`)

- **Existing Status:** Missing.
- **Required Functionality:**
  - Secure login screen (`/admin/login`) with email/password authentication using bcrypt hashing.
  - Role-based permissions:
    - **SUPERADMIN:** Full access including user management and system settings.
    - **ADMIN:** Lead management, subscriber exports, content editing.
    - **EDITOR:** Portfolio and blog content publishing only.
  - Secure session cookies (`HttpOnly; Secure; SameSite=Strict`).
- **Required API Endpoints:**
  - `POST /api/admin/auth/login`
  - `POST /api/admin/auth/logout`
  - `GET /api/admin/auth/me`
- **Database Changes:** `User` table (with password hash and role enum).

---

### Module 8: Settings & Operational Health (`/admin/settings`)

- **Existing Status:** Missing.
- **Required Functionality:**
  - Check operational status of outbound email transport (SMTP / Resend ping).
  - Database connectivity indicator and row counts.
  - Storage / asset status.
  - Site metadata and notification email configuration.
  - **Security Rule:** Environment variable secrets (e.g. database credentials or API keys) are **NEVER rendered in the browser**.
- **Required API Endpoints:** `GET /api/admin/health`

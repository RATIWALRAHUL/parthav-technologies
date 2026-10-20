# Prioritized Implementation Roadmap: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Engineering Architecture Team  
**Scope:** Actionable, Prioritized Engineering Roadmap (P0 to P3)  

---

## Priority Overview

```
[ P0: CRITICAL LAUNCH BLOCKERS ]
  ├── Task 0.1: Fix Inbound Lead Data Loss (Connect DB & Email)
  ├── Task 0.2: Eliminate Chatbot Lead Storage in localStorage
  ├── Task 0.3: Fix Broken Chatbot Route (/work 404)
  ├── Task 0.4: Correct Invalid Fragment URLs in XML Sitemap
  └── Task 0.5: Implement Legal Pages (/privacy-policy & /terms)

[ P1: BUSINESS-CRITICAL INFRASTRUCTURE ]
  ├── Task 1.1: Deploy Minimal Database Engine (SQLite / PostgreSQL via Prisma)
  ├── Task 1.2: Build Lead Management Admin View (/admin/leads)
  ├── Task 1.3: Secure Admin Authentication & Session Middleware
  └── Task 1.4: Implement Newsletter Subscription Flow & API

[ P2: CONTENT & OPERATIONAL EXPANSION ]
  ├── Task 2.1: Build Dedicated /work Portfolio Hub Page
  ├── Task 2.2: Add Subscriber Management & CSV Export
  └── Task 2.3: Implement Case Study Detail Views

[ P3: ENHANCEMENTS & SCALE ]
  ├── Task 3.1: Blog / Insights Publishing Engine
  └── Task 3.2: Outbound CRM Webhook Integration (HubSpot / WhatsApp)
```

---

## Detailed Task Specifications

### P0 — Critical (Launch Blockers)

#### Task 0.1: Fix Inbound Lead Data Loss & Connect Email Notification
- **Priority:** **P0**
- **Current Status:** Ephemeral `console.info` only.
- **Reason:** Business cannot receive inquiries from prospective clients. Submissions vanish on server restart.
- **Dependencies:** None.
- **Files Affected:**
  - `src/app/api/contact/route.ts`
  - `.env.example`, `.env.local`
- **Implementation Steps:**
  1. Add database model or transactional email delivery via Resend/Nodemailer.
  2. Configure `RESEND_API_KEY` or SMTP credentials in `.env.local`.
  3. When an inquiry is submitted, send an immediate email alert to `hello@parthavtechnologies.com` and auto-confirmation to the user.
- **Acceptance Criteria:** Submitting the contact form dispatches a real email alert with all project details and persists the inquiry.
- **Testing Requirements:** Submit test form at `/contact`; verify delivery to recipient inbox.
- **Estimated Effort:** **Medium**

---

#### Task 0.2: Eliminate Chatbot Sensitive Lead Storage in `localStorage`
- **Priority:** **P0**
- **Current Status:** Leads written to browser `localStorage.getItem("parthav_leads")`.
- **Reason:** Privacy violation & lead abandonment. Inbound chat leads are stored locally and never seen by sales staff.
- **Dependencies:** Task 0.1.
- **Files Affected:**
  - `src/components/chat/chat.service.ts`
  - `src/hooks/queries/useChat.ts`
- **Implementation Steps:**
  1. Update `chatService.submitLead()` to send a `POST` request to `/api/contact`.
  2. Delete all references to `localStorage.setItem("parthav_leads", ...)`.
- **Acceptance Criteria:** Submitting a lead via the chat assistant sends the inquiry through the verified contact pipeline.
- **Testing Requirements:** Complete the chat lead flow; verify no unencrypted PII remains in `localStorage`.
- **Estimated Effort:** **Small**

---

#### Task 0.3: Fix Broken Chatbot Route (`/work` 404)
- **Priority:** **P0**
- **Current Status:** Chatbot returns `{ meta: { route: "/work" } }` leading to 404.
- **Reason:** Users following the chatbot's recommendation to view work hit a dead end.
- **Dependencies:** None.
- **Files Affected:**
  - `src/components/chat/chat.service.ts`
- **Implementation Steps:**
  1. Update route reference to `/#work` (or `/services`) until a dedicated `/work` page is deployed.
- **Acceptance Criteria:** Clicking the work suggestion scrolls to the featured work section without triggering a 404.
- **Testing Requirements:** Query the chatbot for "portfolio" or "work"; click route suggestion; verify smooth scroll.
- **Estimated Effort:** **Small**

---

#### Task 0.4: Correct Invalid Fragment URLs in XML Sitemap
- **Priority:** **P0**
- **Current Status:** `src/app/sitemap.ts` contains `/#work`, `/#process`, and `/#contact`.
- **Reason:** Violates XML Sitemap protocol; rejected by Google Search Console.
- **Dependencies:** None.
- **Files Affected:**
  - `src/app/sitemap.ts`
- **Implementation Steps:**
  1. Remove lines 61–72 and 79–85 containing hash URLs.
  2. Ensure only canonical clean paths are output.
- **Acceptance Criteria:** `GET /sitemap.xml` returns only valid, fragment-free URLs.
- **Testing Requirements:** Validate output with XML sitemap validator tool.
- **Estimated Effort:** **Small**

---

#### Task 0.5: Implement Legal Pages (`/privacy-policy` & `/terms-and-conditions`)
- **Priority:** **P0**
- **Current Status:** Completely missing.
- **Reason:** Commercial risk and compliance failure when collecting phone numbers and emails.
- **Dependencies:** None.
- **Files Affected:**
  - `src/app/privacy-policy/page.tsx`
  - `src/app/terms-and-conditions/page.tsx`
  - `src/components/layout/Footer.tsx`
- **Implementation Steps:**
  1. Create branded legal page views using existing container and editorial typography tokens.
  2. Include proper data controller details (Parthav Technologies, Jaipur, India).
  3. Wire links into the `Footer` bottom bar and form consent labels.
- **Acceptance Criteria:** Both pages render clean, responsive legal text and are linked from the footer.
- **Estimated Effort:** **Small**

---

### P1 — Business-Critical Infrastructure

#### Task 1.1: Deploy Database Engine & Persistence Layer
- **Priority:** **P1**
- **Current Status:** Missing.
- **Reason:** Required foundation for lead management, subscriber storage, and administrative control.
- **Dependencies:** None.
- **Files Affected:**
  - `package.json`
  - `prisma/schema.prisma` (or Drizzle)
  - `src/lib/db.ts`
- **Implementation Steps:**
  1. Install Prisma and `@prisma/client`.
  2. Define minimal schema: `Inquiry`, `Subscriber`, `AdminUser`.
  3. Configure database URL (SQLite for simple zero-ops file storage or PostgreSQL for cloud).
  4. Run initial migration.
- **Acceptance Criteria:** Queries write and read verified data inside server routes.
- **Estimated Effort:** **Medium**

---

#### Task 1.2: Build Lead Management Admin View (`/admin/leads`)
- **Priority:** **P1**
- **Current Status:** Missing.
- **Reason:** Sales team requires a unified workstation to triage, qualify, and action inbound prospects.
- **Dependencies:** Tasks 0.1, 1.1.
- **Files Affected:**
  - `src/app/admin/layout.tsx`
  - `src/app/admin/leads/page.tsx`
  - `src/app/api/admin/inquiries/route.ts`
- **Implementation Steps:**
  1. Create protected admin layout using Parthav design tokens.
  2. Build data table with search, status filters, and inquiry details drawer.
  3. Implement status update action (`NEW` -> `CONTACTED` -> `QUALIFIED`).
- **Acceptance Criteria:** Staff can search leads, inspect project descriptions, update lead status, and export to CSV.
- **Estimated Effort:** **Large**

---

#### Task 1.3: Secure Admin Authentication & Session Middleware
- **Priority:** **P1**
- **Current Status:** Missing.
- **Reason:** Protects lead data and business records from unauthorized public access.
- **Dependencies:** Task 1.1.
- **Files Affected:**
  - `src/middleware.ts`
  - `src/app/admin/login/page.tsx`
  - `src/app/api/admin/auth/route.ts`
- **Implementation Steps:**
  1. Create `/admin/login` page with email/password form.
  2. Implement bcrypt password verification and signed HTTP-only session cookie.
  3. Guard all `/admin/*` routes in Next.js middleware.
- **Acceptance Criteria:** Unauthenticated visitors to `/admin` are redirected to `/admin/login`.
- **Estimated Effort:** **Medium**

---

#### Task 1.4: Implement Newsletter Subscription Flow
- **Priority:** **P1**
- **Current Status:** Missing.
- **Reason:** Capture email subscribers from marketing traffic for audience building.
- **Dependencies:** Task 1.1.
- **Files Affected:**
  - `src/components/layout/Footer.tsx`
  - `src/app/api/newsletter/route.ts`
  - `src/components/services/ComingSoonModal.tsx`
- **Implementation Steps:**
  1. Add newsletter input field in the footer with email validation.
  2. Create `POST /api/newsletter` handler saving to `Subscriber` table.
  3. Connect `ComingSoonModal` to real subscription endpoint so early-adopter emails are captured.
- **Acceptance Criteria:** Subscribing saves email to database and displays confirmation feedback.
- **Estimated Effort:** **Medium**

---

### P2 — Content & Operational Expansion

#### Task 2.1: Build Dedicated `/work` Portfolio Hub Page
- **Priority:** **P2**
- **Reason:** Satisfies navigation links from the chatbot and provides deep portfolio exploration beyond the 3 homepage cards.
- **Estimated Effort:** **Medium**

#### Task 2.2: Add Subscriber Management & CSV Export in Admin
- **Priority:** **P2**
- **Reason:** Allows marketing team to export subscriber list for campaign broadcasts.
- **Estimated Effort:** **Small**

#### Task 2.3: Implement Case Study Detail Views (`/work/[slug]`)
- **Priority:** **P2**
- **Reason:** Demonstrates technical depth and commercial results to enterprise prospects.
- **Estimated Effort:** **Large**

---

### P3 — Enhancements & Workflow Automation

#### Task 3.1: Blog / Insights Technical Publishing Engine
- **Priority:** **P3**
- **Reason:** Organic content marketing for long-tail SEO growth.
- **Estimated Effort:** **Large**

#### Task 3.2: Automated CRM & Instant WhatsApp Notification Sync
- **Priority:** **P3**
- **Reason:** Instantly ping sales representatives on WhatsApp when high-budget inquiries arrive.
- **Estimated Effort:** **Medium**

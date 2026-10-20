# Master Implementation Plan: Parthav Technologies Admin Dashboard & Lead Engine

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Status:** In Progress (Phased Execution)  
**Reference Design:** Attached Master Admin Dashboard Screenshot  

---

## Phased Execution Roadmap

### Phase A: Discovery, Architecture & Plan (Completed)
- [x] Codebase audit and inventory verified.
- [x] Backend architecture and Prisma schema designed (`docs/BACKEND_ARCHITECTURE.md`).
- [x] Dashboard roadmap updated (`docs/ADMIN_DASHBOARD_ROADMAP.md`).
- [x] Implementation plan created (`docs/IMPLEMENTATION_PLAN.md`).

### Phase B: Database Foundation, Security & Authentication (In Progress)
- [ ] Install Prisma ORM & `@prisma/client`.
- [ ] Define `prisma/schema.prisma` with `AdminUser`, `Inquiry`, `InquiryNote`, `Subscriber`, and `Activity`.
- [ ] Push database schema to `prisma/dev.db`.
- [ ] Implement database client singleton (`src/lib/db.ts`).
- [ ] Implement password hashing and session utilities using Node.js native crypto (`src/lib/auth.ts`).
- [ ] Implement Next.js auth middleware (`src/middleware.ts`) guarding `/admin/*`.
- [ ] Implement authentication APIs:
  - `POST /api/admin/auth/login`
  - `POST /api/admin/auth/logout`
  - `GET /api/admin/auth/me`
- [ ] Create seed script (`prisma/seed.ts` or `scripts/seed.ts`) creating default administrator (`Rahul Kumawat`) and seeding initial inquiries and activity matching the reference composition.

### Phase C: Lead Management & Persistence Integration
- [ ] Update `POST /api/contact` to write directly to Prisma database.
- [ ] Update `src/components/chat/chat.service.ts` to call `/api/contact` with `source: "Chat"` and remove `localStorage`.
- [ ] Implement protected inquiry APIs:
  - `GET /api/admin/inquiries` (pagination, search, status, service, date filters)
  - `GET /api/admin/inquiries/[id]`
  - `PATCH /api/admin/inquiries/[id]` (status update, note creation)
  - `POST /api/admin/inquiries` (manual inquiry creation)
- [ ] Implement `GET /api/admin/dashboard/summary` for KPIs and chart aggregations.
- [ ] Implement `GET /api/admin/activity` for real recent activity timeline.

### Phase D: Pixel-Perfect Admin Dashboard UI (Matching Reference Image)
- [ ] Create `/admin/login` page styled with Parthav navy/orange branding.
- [ ] Create `/admin/layout.tsx` (isolated admin shell):
  - **Left Sidebar:**
    - Deep navy background (`#031B3A` / `#062B57`)
    - Real Parthav Technologies logo (`/logo/parthav-logo.png`)
    - Active pill with bright orange background (`#FF6A00`) and rounded corners
    - 11 navigation links with matching Lucide icons:
      1. Dashboard (`House`)
      2. Inquiries (`Inbox` with badge `12`)
      3. Services (`Settings2`)
      4. Portfolio (`PanelsTopLeft`)
      5. Blog & Insights (`FileText`)
      6. Newsletter (`Mail` with badge `3`)
      7. Pages & Content (`Files`)
      8. Media Library (`Images`)
      9. SEO Settings (`ChartNoAxesCombined`)
      10. Users & Permissions (`UsersRound`)
      11. Site Settings (`Settings`)
    - Footer motif: Hawa Mahal monument graphic (`/images/about/jaipur-hawa-mahal.jpg`), "Ideas to Impact", "Jaipur, India · Building for the World".
  - **Top Header:**
    - Menu toggle button
    - Search input: "Search inquiries, contacts, services, blog posts..."
    - Date range selector: "Oct 01, 2026 - Oct 20, 2026"
    - Notification bell with orange count badge
    - Administrator profile card: Rahul Kumawat (`avatar-1.webp`), Administrator role
- [ ] Create `/admin/dashboard/page.tsx`:
  - **Welcome Bar:** "Dashboard" + "Welcome back, Rahul! Here's what's happening with your website." + "Ideas | Technology | Growth" brand accent.
  - **5 KPI Cards:**
    1. Total Inquiries (124, +12% vs last month, blue sparkline)
    2. New Inquiries (18, +28% vs last week, orange sparkline)
    3. Active Projects (06, +20% vs last month, blue sparkline)
    4. Published Blog Posts (14, +8% vs last month, orange sparkline)
    5. Newsletter Subscribers (312, +35% vs last month, blue sparkline)
  - **Inquiries Overview Bar Chart:**
    - Period selector: "Last 30 Days"
    - Grouped dual-color bars (Navy = Website Form, Orange = Chat Leads)
    - Interactive tooltips, axes, and legend
  - **Inquiries by Service Doughnut Chart:**
    - Donut ring with center "124 Total"
    - Legend breakdown: Web Development (32), AI & Automation (28), SEO & Digital Growth (18), UI/UX Design (16), CRM & Automation (12), Others (18)
  - **Recent Activity Panel:**
    - Timeline with icons, event descriptions, timestamps, and "View All" link
  - **Recent Inquiries Table:**
    - Header: "Recent Inquiries", "View All Inquiries" link, "+ Add Inquiry" orange button
    - Checkbox, #ID, Name, Email, Service, Status Pill, Source, Date & Time, Actions (View, Edit, More)
    - Status pills: New (blue), Contacted (orange), Proposal Sent (green), Qualified (purple), Won (emerald)
    - Interactive detail drawer modal and status update dialog
    - "+ Add Inquiry" modal

### Phase E: Auxiliary Admin Modules
- [ ] `/admin/inquiries` (Full paginated table view with bulk actions and export)
- [ ] `/admin/services` (Read-only verification hub of all 127 micro-services)
- [ ] `/admin/portfolio` (Project status and case study overview)
- [ ] `/admin/blog` (Article publication registry)
- [ ] `/admin/newsletter` (Subscriber list with CSV export)
- [ ] `/admin/media` (Media library viewer)
- [ ] `/admin/seo` (SEO health & sitemap status)
- [ ] `/admin/users` (Administrator user management)
- [ ] `/admin/settings` (System operational health indicators)

### Phase F: Verification & Quality Assurance
- [ ] Test authentication flow (login, token validation, logout, session expiration).
- [ ] Test inquiry submission from public website -> verify immediate appearance in dashboard.
- [ ] Test status updates, notes, search filtering, and date range adjustments.
- [ ] Verify responsive layout across all 8 viewports.
- [ ] Run `npx tsc --noEmit` and `npm run build` to guarantee 0 errors.

# Backend Architecture: Parthav Technologies Admin & Operations Platform

**Document Version:** 2.0.0  
**Date:** October 20, 2026  
**Auditor & Architect:** Antigravity AI Senior Systems Architecture Team  
**Scope:** Production-Ready Persistent Backend, Admin Authentication, Lead Lifecycle, and API Services  

---

## 1. Architectural Strategy & Design Principles

To transform Parthav Technologies from a static frontend marketing showcase into a fully operational digital business platform, the backend architecture adheres to these core principles:

1. **Native Next.js 15 Integration:** All API routes, route handlers, server actions, and middleware run inside the existing Next.js App Router environment without introducing a bloated secondary server or external microservices.
2. **Persistent Embedded Database Layer:** We deploy **Prisma ORM with SQLite** for local and single-node production persistence (`file:./prisma/dev.db`), with immediate compatibility to PostgreSQL via standard connection string reconfiguration.
3. **Multi-Source Lead Aggregation:** Form submissions from `/contact`, homepage contact sections, and the floating chat widget all converge into a single, unified `Inquiry` pipeline.
4. **Zero-Trust Security & Role Enforcement:** Server-side session verification via signed, HTTP-only authentication cookies and Next.js middleware guards. Zero dependence on client-side route protection.
5. **Data Integrity & Real Metrics:** Every KPI, chart series, activity item, and table row in the Admin Dashboard is computed directly from stored records. No hardcoded or fabricated statistics.

---

## 2. Database Schema Definition (Prisma)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model AdminUser {
  id           String      @id @default(cuid())
  name         String
  email        String      @unique
  passwordHash String
  role         String      @default("Administrator") // Administrator, Editor, Viewer
  avatarUrl    String?
  isActive     Boolean     @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  activities   Activity[]

  @@index([email])
}

model Inquiry {
  id           String         @id @default(cuid())
  inquiryCode  String         @unique // e.g. #INQ-00124
  name         String
  email        String
  phone        String?
  company      String?
  service      String         @default("Web Development")
  budget       String?
  details      String
  source       String         @default("Contact Form") // "Contact Form", "Chat", "Manual"
  status       String         @default("New") // "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost", "Spam"
  assignedTo   String?
  createdAt    DateTime       @default(now())
  updatedAt    DateTime       @updatedAt
  notes        InquiryNote[]

  @@index([status])
  @@index([service])
  @@index([source])
  @@index([createdAt])
}

model InquiryNote {
  id          String   @id @default(cuid())
  inquiryId   String
  inquiry     Inquiry  @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  authorName  String
  note        String
  createdAt   DateTime @default(now())
}

model Subscriber {
  id              String   @id @default(cuid())
  email           String   @unique
  status          String   @default("Active") // "Active", "Unsubscribed"
  sourcePage      String   @default("/")
  consentGiven    Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([status])
}

model Activity {
  id          String     @id @default(cuid())
  actorName   String     @default("System")
  userId      String?
  user        AdminUser? @relation(fields: [userId], references: [id], onDelete: SetNull)
  type        String     // "INQUIRY_CREATED", "STATUS_UPDATED", "BLOG_PUBLISHED", "SUBSCRIBER_JOINED", "SETTINGS_UPDATED"
  description String
  entityType  String?    // "Inquiry", "Post", "Subscriber", "System"
  entityId    String?
  createdAt   DateTime   @default(now())

  @@index([createdAt])
}
```

---

## 3. Endpoints & RESTful Route Hierarchy

| Route Path | Method | Access Level | Description |
|---|---|---|---|
| `/api/contact` | `POST` | Public | Ingests contact inquiries & chat leads into DB with status `New` and logs activity. |
| `/api/newsletter/subscribe` | `POST` | Public | Captures email subscriptions into `Subscriber` table. |
| `/api/admin/auth/login` | `POST` | Public (Rate-limited) | Verifies email & password; issues signed HTTP-only cookie. |
| `/api/admin/auth/logout` | `POST` | Authenticated | Clears session cookie. |
| `/api/admin/auth/me` | `GET` | Authenticated | Returns logged-in administrator profile. |
| `/api/admin/dashboard/summary`| `GET` | Authenticated | Computes the 5 KPIs, date-range comparison, bar chart & doughnut series. |
| `/api/admin/inquiries` | `GET`, `POST` | Authenticated | Lists inquiries (with pagination, search, status/service filters) or manually creates inquiry. |
| `/api/admin/inquiries/[id]` | `GET`, `PATCH`, `DELETE` | Authenticated | Fetches details, updates status/notes, or deletes record. |
| `/api/admin/activity` | `GET` | Authenticated | Fetches recent operational activity timeline. |
| `/api/admin/subscribers` | `GET` | Authenticated | Lists newsletter subscribers and supports CSV streaming export. |

---

## 4. Authentication & Session Strategy

- **Password Storage:** Uses Node.js native `crypto.scryptSync` with a cryptographic salt (64 bytes), generating safe, zero-dependency password hashes.
- **Signed Session Cookies:** A high-entropy session token is signed with `HMAC-SHA256` using an application secret (`ADMIN_SESSION_SECRET`).
- **Middleware Guard (`src/middleware.ts`):** Automatically intercepts all incoming requests to `/admin/*` (except `/admin/login`). Requests without a valid signed session cookie are immediately redirected to `/admin/login`.

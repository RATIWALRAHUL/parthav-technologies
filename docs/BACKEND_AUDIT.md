# Backend & Database Architecture Audit: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Backend Engineering Lead  
**Scope:** Backend Services, Database Infrastructure, Server Actions, Lead Lifecycle & Security  

---

## 1. Backend Capability Matrix

| Capability | Existing Implementation | Verified Status | Required Architecture Action |
|---|---|---|---|
| **Contact Inquiries** | Single Next.js API Route (`src/app/api/contact/route.ts`) | **Partially Implemented (Ephemeral)** | Connect to persistent database and dispatch real notification emails. |
| **Newsletter Subscriptions** | None | **Completely Missing** | Create `POST /api/newsletter` with double opt-in & provider sync. |
| **Admin Authentication** | None | **Completely Missing** | Implement secure session/JWT or NextAuth/Lucia with bcrypt/Argon2. |
| **Admin Authorization** | None | **Completely Missing** | Implement server-side role check (`SUPERADMIN`, `ADMIN`, `EDITOR`). |
| **Services Management** | Static TypeScript array (`src/data/main-services.ts`) | **Static Registry (Working)** | Maintain static registry; dynamic CMS not currently justified. |
| **Portfolio Management**| Static TypeScript array (`src/data/projects.ts`) | **Static Registry (Working)** | Extend static registry or provide database table if dynamic publishing is needed. |
| **Blog Management** | None | **Completely Missing** | Add database-backed or markdown-backed post model and editor. |
| **Email Notifications** | `console.info` only | **Completely Missing** | Integrate Resend, SendGrid, or AWS SES via API key. |
| **Database Persistence**| In-memory `Map` & browser `localStorage` | **Completely Missing** | Provision PostgreSQL (or SQLite/Prisma for lightweight deployment). |
| **Audit Logs** | None | **Completely Missing** | Add audit logging table for admin status changes and inquiries. |
| **Backups & Recovery** | None | **Completely Missing** | Configure automated daily snapshot backups on target database. |

---

## 2. In-Depth Backend Code Audit

### 2.1 API Route Analysis (`POST /api/contact`):
- **Rate Limiting:**
  ```typescript
  const rateLimitMap = new Map<string, number[]>();
  ```
  *Flaw:* Node.js in-memory Map is reset upon every server redeployment or cold start on serverless runtimes (Vercel, AWS Lambda). Multiple server instances do not share state, making rate limiting easily bypassable.
  *Fix:* Utilize Redis / Upstash or a database-backed sliding window rate limiter.
- **Data Validation & Sanitization:**
  Basic sanitization strips `<` and `>` characters. Phone and email regex validation are functional. However, no Zod or schema validation library is utilized for robust type guarantees.
- **Logging vs. Delivery:**
  Logs to stdout via `console.info`. No webhook, Slack notification, CRM sync, or SMTP transport is configured.

---

## 3. Contact Form & Complete Lead Lifecycle Architecture (Phase 7)

To ensure commercial utility, Parthav Technologies requires a robust lead management pipeline.

### 3.1 Proposed Lead Data Model:

```prisma
model Inquiry {
  id              String         @id @default(cuid())
  name            String
  email           String
  company         String?
  phone           String?
  service         String         @default("General")
  budget          String?
  details         String
  sourcePage      String         @default("/")
  status          InquiryStatus  @default(NEW)
  assignedTo      String?
  notes           InquiryNote[]
  ipHash          String?
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@index([status])
  @@index([createdAt])
  @@index([email])
}

enum InquiryStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL_SENT
  WON
  LOST
  SPAM
}

model InquiryNote {
  id          String   @id @default(cuid())
  inquiryId   String
  inquiry     Inquiry  @relation(fields: [inquiryId], references: [id], onDelete: Cascade)
  authorName  String
  note        String
  createdAt   DateTime @default(now())
}
```

### 3.2 Lead Lifecycle Workflow:
```
1. Visitor Submits Form / Chat Lead
       │
       ▼
2. API Layer Validation (Zod schema, CSRF, honeypot, rate-limit check)
       │
       ├─► [Spam Bot] ──► Fake 200 OK (Discards payload safely)
       │
       ▼
3. Persist to Database (Status: NEW)
       │
       ├─► Dispatch Transactional Email to Sales Team (Resend / SMTP)
       │
       ├─► Dispatch Auto-Confirmation to Client ("We received your project...")
       │
       ▼
4. Sales Team Review in Admin Dashboard
       │
       ├─► Update Status: CONTACTED / QUALIFIED / PROPOSAL_SENT / WON
       └─► Add Internal Follow-up Notes & Timeline
```

---

## 4. Minimal Reliable Backend Architecture Recommendation

To respect the rule *"Do not introduce unnecessary dependencies or architectural rewrites"*, the recommended backend strategy is:

1. **Database:** SQLite (local/embedded for low complexity) or PostgreSQL via **Prisma ORM** or **Drizzle ORM**.
   - Direct integration inside Next.js Server Actions and Route Handlers.
   - Zero external backend server required; runs inside the existing Next.js runtime.
2. **Transactional Email:** **Resend** or **Nodemailer (SMTP)**:
   - Minimal dependency, clean TypeScript SDK, free tier covers initial production volume.
3. **Session Management:** Secure HTTP-only cookies with signed JWTs or iron-session.

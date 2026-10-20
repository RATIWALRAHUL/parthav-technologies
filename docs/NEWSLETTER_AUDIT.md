# Newsletter Management Audit: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Technical Architecture Team  
**Scope:** Newsletter Architecture, Subscriber Capture, Compliance & Provider Integrations  

---

## 1. Existing Newsletter Implementation Status

- **Codebase Discovery Status:** **Completely Absent.**
- There is no newsletter subscription input field in `src/components/layout/Footer.tsx`.
- There is no API route handler (`/api/newsletter` or `/api/subscribe`).
- There are no email marketing provider SDKs (Mailchimp, ConvertKit, Brevo, Resend Audiences) installed in `package.json`.
- The only related capture is the `ComingSoonModal.tsx`, which simulates subscription for pre-launch services via `setTimeout` without persisting user emails.

---

## 2. Minimal Reliable Newsletter Flow Architecture

To capture recurring business interest, Parthav Technologies should implement a lightweight, compliant newsletter system.

### 2.1 Proposed Data Schema:

```prisma
model Subscriber {
  id              String           @id @default(cuid())
  email           String           @unique
  status          SubscriberStatus @default(ACTIVE)
  sourcePage      String           @default("/")
  consentGiven    Boolean          @default(true)
  consentTimestamp DateTime        @default(now())
  unsubscribedAt  DateTime?
  token           String?          @unique // Unsubscribe verification token
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@index([status])
  @@index([email])
}

enum SubscriberStatus {
  PENDING_CONFIRMATION
  ACTIVE
  UNSUBSCRIBED
  BOUNCED
}
```

---

## 3. Recommended Endpoints & Lifecycle

### 3.1 Inbound Subscription (`POST /api/newsletter/subscribe`):
- Accepts `{ email: string, source?: string }`.
- Validates email syntax and disposable email blocklists.
- Upsert logic:
  - If email does not exist: Creates record with status `ACTIVE` (or `PENDING_CONFIRMATION` if double opt-in is desired).
  - If email exists and status is `UNSUBSCRIBED`: Reactivates with updated consent timestamp.
  - If email exists and status is `ACTIVE`: Returns friendly message ("You're already subscribed!").

### 3.2 Unsubscribe Flow (`GET /api/newsletter/unsubscribe?token=...` or `/unsubscribe` page):
- One-click unsubscribe compliant with CAN-SPAM, GDPR, and Indian DPDP (Digital Personal Data Protection Act).
- Updates status to `UNSUBSCRIBED` and sets `unsubscribedAt`.

### 3.3 Admin Export Controls:
- Authenticated admin export endpoint: `GET /api/admin/subscribers/export?format=csv`.
- Restricted to verified administrative sessions.
- Generates a sanitized CSV stream containing active emails and subscription dates.

---

## 4. Third-Party Provider Integration Strategy

Rather than building a complex newsletter broadcast engine within Next.js, Parthav Technologies should:
1. Store subscribers in the primary database for ownership and instant access.
2. Synchronize active contacts with an established marketing platform (e.g. **Resend Audiences**, **Brevo**, or **Mailchimp**) via background webhook or asynchronous API call when marketing campaigns are ready to be sent.
3. Never send automated mass broadcasts directly from standard transactional SMTP servers to preserve domain deliverability.

# Security & Vulnerability Audit: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Application Security Specialist  
**Scope:** Application Security, OWASP Top 10 Review, Data Privacy & Threat Modeling  

---

## 1. Security Findings Matrix

| Security Domain | Existing Implementation | Risk Level | Finding & Recommendation |
|---|---|---|---|
| **Data Privacy (PII)** | Chat widget writes leads to browser `localStorage` | **High** | **Violation:** Prospective client contact details remain in plain text in browser storage accessible to third-party scripts. Remove `localStorage` write and submit to secure API. |
| **Authentication** | None | **High** | No admin access currently exists. Once implemented, enforce bcrypt/Argon2 password hashing, lockout policies, and secure HTTP-only cookies. |
| **Authorization** | None | **Medium** | When creating admin routes, enforce server-side role verification in middleware and API route handlers. |
| **Input Validation & XSS** | Basic regex replacing `<` and `>` in `/api/contact` | **Medium** | Basic string replace can be bypassed by alternate encodings. Utilize Zod schema validation and let React automatically escape rendered strings. |
| **SQL/NoSQL Injection** | No database currently connected | **Low** | When adding a database, use parameterized queries via an ORM (Prisma or Drizzle) to guarantee SQL injection immunity. |
| **CSRF Protection** | SameSite cookie defaults in modern browsers | **Low** | Ensure all state-changing admin actions (`POST`, `PUT`, `DELETE`) require custom request headers (`Content-Type: application/json`) and verify Origin/Referer headers. |
| **Rate Limiting** | In-memory `Map` in `src/app/api/contact/route.ts` | **Medium** | In-memory tracking fails across multi-container or serverless deployments. Deploy Redis / Upstash sliding window rate limiting. |
| **Spam Prevention** | Honeypot field (`website` / `honeypot`) implemented | **Low** | Working as designed. Bots filling the hidden input receive fake success without alerting spammers. Recommend adding Cloudflare Turnstile for high-volume attacks. |
| **Secret Management** | Only public variables in `.env.example` | **Low (Safe)** | Zero API keys or database credentials committed to git. Maintain rule that all secrets stay server-side. |
| **Error Leakage** | `src/app/error.tsx` present | **Low (Safe)** | Custom error boundary catches runtime exceptions gracefully without dumping stack traces to visitors. |
| **Dependencies** | Dependencies inspected via `package.json` | **Low** | Next.js 15.2.1, React 19, Framer Motion 12, Lucide React are up to date. |

---

## 2. Threat Modeling & Data Protection Compliance

### 2.1 Compliance Gaps (GDPR / Indian DPDP Act 2023):
1. **Lack of Privacy Policy:** The website collects personal identifiers (Full Name, Email, Phone Number, Company Name, Project Specifications) without a published Privacy Policy detailing:
   - Data Controller identity (Parthav Technologies, Jaipur, India).
   - Lawful basis for processing (legitimate interest / consent).
   - Data retention periods and client rights (right to erasure, right of access).
2. **Consent Checkbox:** While the homepage form includes a consent toggle, it does not link to terms or privacy text.

### 2.2 Prescribed Remediation Plan:
1. **Remove Client-Side Lead Stashing:** Delete lines 165–180 in [`src/components/chat/chat.service.ts`](file:///r:/p/src/components/chat/chat.service.ts) and redirect leads directly to the secure `/api/contact` handler.
2. **Publish Legal Pages:** Add `/privacy-policy` and `/terms-and-conditions` before running public advertising or commercial outreach.
3. **HTTP Security Headers:** Add modern security headers to `next.config.ts`:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Content-Security-Policy: default-src 'self' ...`

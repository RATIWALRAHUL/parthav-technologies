# Frontend Functionality Audit: Parthav Technologies

**Document Version:** 1.0.0  
**Date:** October 20, 2026  
**Auditor:** Antigravity AI Frontend Architecture Specialist  
**Scope:** Interactive Elements, Event Handlers, Mock vs Real API Connections & Local Storage Usage  

---

## 1. Interactive Elements Capability Matrix

| Feature / Interactive Element | Component / File Location | Status | Implementation Type | Observed Behavior & Persistence Details |
|---|---|---|---|---|
| **Contact Form (Home)** | [`src/components/home/Contact.tsx`](file:///r:/p/src/components/home/Contact.tsx) | **Partially Functional** | Real API (Unpersisted) | Sends `POST /api/contact`. Server logs inquiry to `console.info`, but does NOT persist to a database or trigger email notifications. |
| **Contact Form (Page)** | [`src/components/contact/ContactHero.tsx`](file:///r:/p/src/components/contact/ContactHero.tsx) | **Partially Functional** | Real API (Unpersisted) | Same handler (`useContactMutation`). Captures name, email, company, phone, service, budget, details. |
| **Floating Chat Assistant** | [`src/components/chat/FloatingChatWidget.tsx`](file:///r:/p/src/components/chat/FloatingChatWidget.tsx) | **Mock / Local Only** | Client-Side Rule Engine | Pre-programmed keyword matcher. Answers questions about Jaipur, services, and stack without an actual AI LLM endpoint. |
| **Chat Lead Submission** | [`src/components/chat/chat.service.ts`](file:///r:/p/src/components/chat/chat.service.ts#L167) | **Mock / UI Only** | Client `localStorage` | **Sensitive lead data is saved into browser `localStorage` under `parthav_leads`.** No backend call is made. Leads never reach agency staff! |
| **Coming Soon Modal** | [`src/components/services/ComingSoonModal.tsx`](file:///r:/p/src/components/services/ComingSoonModal.tsx) | **UI Only / Simulated** | Client `setTimeout` | `useComingSoonMutation()` executes `setTimeout(..., 700)` with no backend endpoint. Captured emails are discarded! |
| **Newsletter Subscription**| Footer / Global | **Completely Missing** | Not Implemented | No newsletter subscription input exists anywhere on the site. |
| **Service Category Nav** | [`src/components/services/ServiceCategoryNav.tsx`](file:///r:/p/src/components/services/ServiceCategoryNav.tsx) | **Fully Functional** | Static Client Router | Smoothly routes between `/services`, `/services/web-development`, etc., retaining active category pills. |
| **Service Explorer Filter**| [`src/components/services/ServicesExplorer.tsx`](file:///r:/p/src/components/services/ServicesExplorer.tsx) | **Fully Functional** | Client State Filter | Filters 127 micro-services by category in realtime. |
| **Services Carousel** | [`src/components/home/ServicesCarousel.tsx`](file:///r:/p/src/components/home/ServicesCarousel.tsx) | **Fully Functional** | Client Interaction | Horizontal draggable and paginated carousel with category pills and navigation buttons. |
| **FAQ Accordions** | [`src/components/home/FAQ.tsx`](file:///r:/p/src/components/home/FAQ.tsx) | **Fully Functional** | Client Accordion State | Accessible expand/collapse with ARIA attributes and smooth animation. |
| **Mobile Drawer Navigation**| [`src/components/layout/Navbar.tsx`](file:///r:/p/src/components/layout/Navbar.tsx) | **Fully Functional** | Client Drawer Island | Opens full-height overlay with animated staggered links and CTA button. Closes on route change or Escape key. |
| **Back-To-Top Button** | [`src/components/ui/ScrollToTop.tsx`](file:///r:/p/src/components/ui/ScrollToTop.tsx) | **Fully Functional** | Window Scroll Listener | Appears after scrolling 400px; performs smooth window scroll to top. |
| **Portfolio / Case Studies**| [`src/components/home/CaseStudies.tsx`](file:///r:/p/src/components/home/CaseStudies.tsx) | **Partially Functional** | Static Cards | Displays 3 featured projects. Cards link only to `#contact`. No dynamic filtering, pagination, or dedicated case study pages exist. |
| **Blog / Insights Module** | Global | **Completely Missing** | Not Implemented | No blog post listing, no categories, no article reader, and no markdown/rich-text rendering pipeline. |
| **Search Functionality** | Global | **Completely Missing** | Not Implemented | No global site search or service query input. |
| **File Uploads (RFPs/PDFs)**| Contact Forms | **Completely Missing** | Not Implemented | Inquiries cannot attach project briefs, wireframes, or RFP documents. |
| **Admin Authentication** | Global | **Completely Missing** | Not Implemented | No login screen, no session check, no token storage. |

---

## 2. In-Depth Defect Analysis

### 1. Inbound Leads Saved in `localStorage`:
In [`src/components/chat/chat.service.ts`](file:///r:/p/src/components/chat/chat.service.ts#L165-L180):
```typescript
// From existing code:
localStorage.setItem("parthav_leads", JSON.stringify(existing));
```
**Impact:** Prospective clients engaging with the floating chat assistant think they have submitted an inquiry to the Parthav Technologies sales team. In reality, the submission is stored on their own computer in browser storage. The sales team never receives any alert.

### 2. Coming Soon Modal Discards Emails:
In [`src/hooks/queries/useComingSoon.ts`](file:///r:/p/src/hooks/queries/useComingSoon.ts#L19-L31):
```typescript
// From existing code:
mutationFn: async (payload: ComingSoonPayload) => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true, message: `You'll be notified when ${payload.serviceName} launches.` };
}
```
**Impact:** Early-adopter interest for emerging services (like AI Automation, Blockchain, or Custom ERP) is lost because submitted emails are never saved anywhere.

### 3. Contact Route Lacks Persistence:
In [`src/app/api/contact/route.ts`](file:///r:/p/src/app/api/contact/route.ts#L109-L120):
```typescript
// From existing code:
console.info(`[Contact Form Submission] ID: ${inquiryId}`, { ... });
```
**Impact:** If the Next.js process restarts, or in a serverless environment (e.g. Vercel), stdout logs are transient and not searchable or actionable.

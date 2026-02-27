---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ["PRD.md"]
workflowType: 'architecture'
project_name: 'state-audit-tool'
user_name: 'Simon'
date: '2026-02-26'
---

# Architecture Decision Document — STATE Audit Tool

## 1. Project Overview

**Project:** STATE Audit Tool  
**Type:** Web Application (MVP)  
**Core Functionality:** Self-service assessment tool for evaluating AI agent production readiness using the STATE framework

**Source Document:** PRD.md

---

## 2. Technical Architecture

### 2.1 High-Level Pattern

| Aspect | Decision |
|--------|----------|
| **Architecture** | Client-side SPA (Single Page Application) |
| **Framework** | Next.js 14+ (App Router) |
| **Hosting** | Vercel |
| **State Management** | React useState + URL params |
| **Persistence** | Stateless (email goes directly to Resend) |

### 2.2 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|------------|
| Frontend | Next.js + React | SEO, Vercel native, fast |
| Styling | Tailwind CSS | Already installed, rapid dev |
| Email | Resend API | Simple, reliable, generous free tier |
| PDF | jsPDF (client-side) | No server cost, direct download |
| State | URL params (Base64) | Shareable results without DB |

---

## 3. Component Architecture

### 3.1 Page Structure

```
/ (root)
├── IntroSlide (hero + CTA)
├── AssessmentFlow
│   ├── QuestionSlide (reusable, 10x)
│   └── EmailGate
└── ResultsView
    ├── ScoreCard
    ├── GapMatrix
    └── RecommendationList
```

### 3.2 Data Flow

```
User Answers (React State)
    ↓
Scoring Engine (local)
    ↓
Email Capture (Resend API POST)
    ↓
Results Page (URL param = base64 encoded data)
    ↓
PDF Download (jsPDF client-side)
```

---

## 4. Key Technical Decisions

| ID | Decision | Rationale |
|----|----------|-----------|
| T1 | No database | MVP scope - email capture direct to Resend |
| T2 | URL state sharing | Results shareable via link, no auth needed |
| T3 | Client-side PDF | Avoids server complexity, free |
| T4 | Single page flow | Simple MVP, no routing needed |
| T5 | Tailwind styling | Already in project, consistent |

---

## 5. API Integration

### 5.1 Resend (Email Capture)

```typescript
// Endpoint: POST /api/capture
// Body: { name, email, score, responses }
// Response: { success: boolean }
```

### 5.2 Environment Variables

```
RESEND_API_KEY=re_xxxxx (for email)
```

---

## 6. Security Considerations

- **Input validation:** Validate email format, sanitize inputs
- **No PII storage:** Email goes directly to Resend, not stored
- **URL param encoding:** Base64 encode score data (not encrypted but not plaintext)

---

## 7. Out of Scope

- User accounts / auth
- Saved reports
- Multi-system comparison
- French localization
- CRM integration

---

## 8. File Structure

```
src/app/
├── page.tsx          # Main assessment flow
├── layout.tsx       # Root layout
└── globals.css      # Tailwind

src/components/      # Future refactor (MVP in page.tsx)
```

---

**Status:** Approved for Implementation  
**Completed:** 2026-02-26

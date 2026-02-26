# PRD — STATE Audit Tool

**Product:** simonparis.ca/state-audit (or standalone subdomain)  
**Owner:** Simon Paris / The Meta Architect  
**Version:** 1.0 MVP  
**Date:** 2026-02-26

---

## 1. Problem Statement

LLM Platform & Reliability Leads have no structured way to diagnose whether their AI agent architecture is production-ready. They know something is broken — they don't know which pillar is the problem. This tool gives them a 5-minute self-assessment anchored to the STATE framework and returns a scored readiness report with actionable gaps.

---

## 2. User Profile

**Target:** Senior developer, tech lead, or LLMOps engineer who already has an agent in production or in late-stage pilot. Not a beginner. Skeptical of marketing. Responds to specificity and technical credibility.

**Behavior:**
- Lands from LinkedIn post, workshop, or simonparis.ca
- Wants quick, credible assessment
- Willing to give email for full report

---

## 3. Core User Flow

1. User lands on tool → sees framing: "Is your AI agent production-ready?"
2. Completes 5 sections (one per STATE pillar) — each with 2 yes/no diagnostic questions
3. Hits "Get My Score"
4. Email gate: "Where should we send your full readiness report?" (first name + email)
5. Results page renders immediately:
   - Total score out of 10
   - Risk tier label (Critical Risk / High Risk / Developing / Production-Ready / STATE-Compliant)
   - Per-pillar breakdown with score and one-line gap description
   - Gap matrix (visual)
   - 3 prioritized recommendations based on lowest-scoring pillars
6. Option to download PDF
7. CTA: "Want a full STATE Readiness Review of your system? Book a call."

---

## 4. The 10 Diagnostic Questions

**Source:** state-framework.md (Pillar definitions + 2 questions each)

> NOTE: Pull verbatim from state-framework.md. The 5 pillars each have 2 yes/no diagnostic questions.

---

## 5. Scoring Logic

- Each question: Yes = 1, No = 0
- Per pillar: 0, 1, or 2
- Total: 0–10

**Risk Tiers (per STATE framework table):**
- 0-2: Critical Risk
- 3-4: High Risk
- 5-6: Developing
- 7-8: Production-Ready
- 9-10: STATE-Compliant

**Recommendation Logic:**
- Lowest scoring pillars surface first
- Each pillar has one pre-written recommendation blurb
- If score = 0 on Auditable → always flag Law 25 risk specifically

---

## 6. Pages / Components

| Page | Route | Description |
|------|-------|-------------|
| Landing + Assessment | `/` | Single scrollable page with form |
| Results | `/results` | Score, gap matrix, recommendations, PDF download, CTA |

**Email:**
- Capture: Resend API → email to Simon with respondent name, email, scores
- PDF: Generated client-side with jsPDF or react-pdf

---

## 7. Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Email:** Resend API
- **PDF:** jsPDF or react-pdf
- **Hosting:** Vercel
- **Database:** None (MVP)

---

## 8. Out of Scope (Phase 1)

- User accounts or saved reports
- Comparison across multiple systems
- French language version
- CRM integration
- Analytics beyond Vercel built-in

---

## 9. Success Criteria

- [ ] Assessment completes in under 5 minutes
- [ ] Email capture fires reliably
- [ ] PDF downloads without errors
- [ ] Works on mobile
- [ ] Simon can share link in LinkedIn post without embarrassment

---

## 10. Reference Documents

- `state-framework.md` — Pillar definitions, diagnostic questions, scoring table, risk tiers
- `icp-card.md` — Tone and framing copy
- `content-brief.md` — Voice guidelines for copywriting

---

## 11. Notes for Implementation

- Gap matrix visual should match state-framework.md
- PDF should include: score, tier, per-pillar breakdown, recommendations
- CTA link to booking page (Cal.com or similar)

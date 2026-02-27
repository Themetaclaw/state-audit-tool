---
title: 'Results Page with Scoring'
slug: 'results-page'
epic: 'STATE Audit Tool MVP'
status: 'pending'
priority: high
---

# Story: Results Page with Scoring

## Scope

Results page showing:
- Total score out of 10
- Risk tier label (Critical Risk / High Risk / Developing / Production-Ready / STATE-Compliant)
- Per-pillar breakdown with scores
- Gap matrix visual
- 3 prioritized recommendations based on lowest-scoring pillars
- PDF download button
- CTA: "Book a STATE Readiness Review"

## Acceptance Criteria

- [ ] AC1: Score displays 0-10 based on responses
- [ ] AC2: Risk tier shows correct label per scoring table
- [ ] AC3: Per-pillar breakdown shows 0-2 per pillar
- [ ] AC4: Gap matrix renders visually
- [ ] AC5: Recommendations sorted by lowest pillar score
- [ ] AC6: PDF download button functional
- [ ] AC7: CTA button links to booking page

## Implementation Notes

- Scoring: Yes=1, No=0 per question
- Tiers: 0-2 Critical, 3-4 High, 5-6 Developing, 7-8 Production-Ready, 9-10 STATE-Compliant
- Use jsPDF for PDF generation
- Booking URL: TBD (waiting for Simon)

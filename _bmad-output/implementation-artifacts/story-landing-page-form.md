---
title: 'Landing Page + Assessment Form'
slug: 'landing-page-form'
epic: 'STATE Audit Tool MVP'
status: 'in-progress'
priority: high
---

# Story: Landing Page + Assessment Form

## Scope

Create the main landing page with:
- Hero section with title and CTA
- 5-pillar assessment form (10 questions, 2 per pillar)
- Progress indicator
- Yes/No response handling
- Email gate before results

## Acceptance Criteria

- [x] AC1: Landing page loads with title "Is your AI agent production-ready?"
- [x] AC2: Start Assessment button navigates to form
- [x] AC3: 5 pillars displayed sequentially, 2 questions each
- [x] AC4: Progress bar shows question count (1-10)
- [x] AC5: Yes/No buttons record responses
- [x] AC6: After Q10, email gate appears
- [x] AC7: Name + email form captures data
- [x] AC8: Submit navigates to results

## Implementation Notes

- Use React state for form flow
- Store responses in array (10 booleans)
- Use placeholder pillar names until STATE framework doc provided

## Verification

- Build: PASSED (`npm run build`)
- Page loads: VERIFIED (curl)
- Components present: VERIFIED (grep check)

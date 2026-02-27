---
title: 'Email Capture + Resend Integration'
slug: 'email-capture-resend'
epic: 'STATE Audit Tool MVP'
status: 'pending'
priority: high
---

# Story: Email Capture + Resend Integration

## Scope

Integrate email capture form to send respondent data to Simon via Resend API.

## Acceptance Criteria

- [ ] AC1: Email form captures name and email
- [ ] AC2: POST request sends to /api/capture endpoint
- [ ] AC3: Resend API sends email to Simon with respondent data
- [ ] AC4: Success/error feedback shown to user
- [ ] AC5: Email validated before submission

## Technical Notes

- Use Resend SDK or direct API call
- Email template: Simple text with name, email, score
- API route: /api/capture
- Environment: RESEND_API_KEY

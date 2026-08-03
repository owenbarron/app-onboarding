# Notification framework design QA

- Source visual truth: `screenshots/notification-settings.png` and `screenshots/profile page.png`
- Implementation screenshots: `screenshots/notification-framework-2026-07-20/version-1-controls-only.png`, `screenshots/notification-framework-2026-07-20/version-2-add-channels.png`, and `screenshots/notification-framework-2026-07-20/profile-entry.png`
- Full-view comparisons: `screenshots/notification-framework-2026-07-20/comparison-notification-settings.png` and `screenshots/notification-framework-2026-07-20/comparison-profile-entry.png`
- Enrollment-state evidence: `screenshots/notification-framework-2026-07-20/version-2-add-sms.png` and `screenshots/notification-framework-2026-07-20/version-2-email-otp.png`
- Viewport: 390 × 844
- State: SMS-enabled campus; Version 1 has verified push, email, and SMS channels. Version 2 always begins with either verified email or verified SMS, then exposes the missing channel for enrollment.

## Full-view comparison evidence

The combined notification comparison was reopened and reviewed at original resolution after the compact redesign. The final screen replaces the old white title bar and checkbox table with a wave-integrated header, one flat Channels list, and one compact Alerts matrix. Both versions fit in a single mobile viewport without scrolling.

## Findings

No actionable P0, P1, or P2 findings remain.

- Information density: removed the coverage card, preheaders, descriptions, required badges, On/Off labels, and cards within cards. The visible hierarchy is now Notifications → Channels → Alerts → Save.
- Controls: channel availability uses familiar device, email, SMS, plus, and verified icons. Alert preferences use compact toggle switches.
- Language and CTA: device notifications are labeled Push. Missing-channel Add actions use solid USEFULL gold with white text.
- Required alerts: checkout, return, due-today, and late-fee settings silently keep one available channel enabled; no explanatory warning copy is shown.
- Enrollment: Version 2 supports email and SMS contact entry, validation, six-digit OTP verification, resend feedback, success state, and SMS consent copy.
- Accessibility: controls retain explicit accessible names and pressed states, unavailable channels are disabled, modal errors are announced, focus advances with setup, Escape closes setup, and core tap targets are at least 44px high.
- Responsive behavior: at 390px, body width equals viewport width, the settings region is 730px high with a 730px scroll height, and no horizontal or vertical settings scroll is required.
- Visual fidelity: the existing wave background, USEFULL logo, Proxima Nova, teal, gold, white, and graphite tokens are preserved.

## Comparison history

### Pass 1

- P2: Add-channel buttons measured 38px high and event toggles measured 43px.
- Fix: increased both control families to a minimum 44px tap target and added focus management plus live validation announcements.

### Pass 2

- P2: The first redesign over-explained the model with a coverage banner, preheaders, helper copy, required badges, nested event cards, and an internal scroll area.
- Fix: replaced it with a single-screen channel list and icon-led toggle matrix; required coverage is enforced silently.

### Pass 3

- Evidence: refreshed Version 1, Version 2, SMS setup, and email OTP screenshots; regenerated the side-by-side comparison; reran required-alert, save, OTP, bounds, tap-target, and console checks.
- Result: required-alert enforcement passed, settings save passed, SMS OTP passed, no overflow was detected, the tester control was hidden, and browser console errors were empty.

### Pass 4

- Evidence: verified both valid Version 2 entry states (email present/SMS missing and SMS present/email missing), refreshed the labeled screenshots, and reran the bounds and console checks.
- Result: Push terminology is consistent, Add buttons use gold with white text, at least one non-push contact channel is always present, last-channel enforcement remains silent, and Save is unavailable for uncovered states.

### Pass 5

- Evidence: removed visible text from verified channel checks, raised shared control and input typography, increased compact-manager labels and line heights, then repeated the 390 × 844 bounds check.
- Result: verified states are icon-only with accessible names, contact labels render at 15px/18px, alert labels at 14px/18px, and the full manager still fits without horizontal or vertical scrolling.

## Implementation checklist

- [x] Profile-to-notifications navigation
- [x] Version 1 existing-channel controls
- [x] Version 2 email/SMS enrollment
- [x] Silent required-alert enforcement
- [x] SMS campus eligibility
- [x] Contact and OTP validation
- [x] Single-viewport mobile layout
- [x] Mobile accessibility and overflow checks
- [x] Browser console check

final result: passed

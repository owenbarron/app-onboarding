# USEFULL onboarding prototype

An interactive HTML prototype of the USEFULL mobile onboarding experience, including:

- Community and authentication flows
- CU Boulder kiosk-account branching for Buff OneCard and bank-card users
- Guided CU Boulder signup and email-first account recovery
- New and returning SMS sign-in with OTP scenarios
- Email, Google, Apple, and institution sign-in treatments
- Notification channel consent and validation
- New- and returning-user home states
- Built-in scenario controls for prototype testing
- Toggleable legacy affiliation/graduation stepper

## Run locally

The prototype has no build step. Open `index.html` directly, or serve the directory locally:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

The phone frame uses Devices.css from a CDN. All USEFULL fonts and interface artwork are included in the repository.

## Project notes

- [Build session log](docs/session-log-2026-07-16.md)

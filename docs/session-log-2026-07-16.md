# USEFULL onboarding prototype — build session log

Date: July 16, 2026
Repository: [owenbarron/app-onboarding](https://github.com/owenbarron/app-onboarding)

## What we built

We recreated the USEFULL mobile onboarding experience as an interactive, frontend-only HTML prototype displayed inside a realistic iPhone frame. The implementation was based on the supplied Figma flow, screenshots, kiosk references, brand artwork, and home-screen assets.

The prototype now covers new-user onboarding, returning-user authentication, SMS verification, notification consent, payment setup, welcome messaging, and representative new- and returning-user home states.

## Technical structure

The prototype intentionally has no build step or application framework.

- `index.html` contains the prototype shell and Devices.css phone structure.
- `styles.css` contains the responsive layout, Proxima Nova font declarations, USEFULL component styles, phone frame integration, modal treatments, and home-screen styling.
- `app.js` contains the complete client-side state machine, render functions, interactions, validation, scenario controls, and navigation history.
- `branding/` contains USEFULL logos, fonts, background texture, and interface artwork.
- `screenshots/` contains the reference screens used during implementation.

The app can be opened directly from `index.html` or served locally with:

```sh
python3 -m http.server 4173
```

## Visual system

The prototype follows the existing USEFULL visual language rather than the separate kiosk treatment.

- Proxima Nova is loaded locally in regular, medium, semibold, and bold weights.
- The foam wave artwork is used as the application background.
- Teal is used for institutional actions, selected states, navigation, and the final welcome action.
- Amber is used for primary onboarding actions through the consent flow.
- Cards use compact radii and subtle shadows consistent with the supplied mobile screenshots.
- The phone frame uses Devices.css, with custom responsive scaling and a rounded-frame shadow.
- The status bar is cropped from the supplied home screenshot to retain realistic iOS indicators.
- Google and Apple marks are embedded locally as inline brand artwork so they also render when the prototype is opened with `file://`.

## Community and sign-in selection

The opening screen allows the user to choose a USEFULL community. CU Boulder was added to the supplied community list.

The CU Boulder method screen contains the following options in this order:

1. CU Boulder institutional sign-in, represented by a graduation-cap icon
2. Email
3. SMS
4. Google
5. Apple

The Terms of Service and Privacy Policy agreement is required before selecting a signup method.

## New-user SMS signup

The CU Boulder SMS signup path supports the native mobile keyboard through standard HTML inputs.

1. The user enters a 10-digit mobile number.
2. The app explains that a one-time code will be sent.
3. The user enters a six-digit OTP.
4. Invalid OTP scenarios show a compact red field error.
5. A valid OTP opens the notification consent modal.
6. After consent, the user adds their name.
7. The user completes affiliation, graduation year, and payment setup.
8. The welcome modal is displayed over the actual home screen.

The signup flow never uses a custom on-screen keypad; it relies on `type="tel"` and `inputmode="numeric"` to request the operating system keyboard.

## Returning-user sign-in

The “Already have an account? Log in” link now opens a dedicated returning-user flow rather than reusing signup.

The returning sign-in screen contains:

- Email and Continue
- Google
- Apple
- SMS at the bottom of the alternate method list

### Returning email path

Email continues to a password entry screen. A completed returning email/password sign-in opens the populated returning-user home state.

### Returning SMS path

1. The user enters an existing account phone number.
2. If the test scenario says that the phone does not exist, the user remains on the screen and sees “Phone number not found.”
3. A missing phone cannot be used to create a new account from the returning-user flow.
4. An existing phone proceeds to OTP entry.
5. An invalid OTP displays “One-time code is incorrect.”
6. A valid OTP opens the populated returning-user home state with active rentals.

## Notification consent

Two consent variants are available.

### SMS and optional email variant

This is the default test configuration.

- SMS starts selected and displays the verified phone number as locked text.
- The SMS choice includes the transactional messaging agreement and opt-out language.
- Email starts unselected.
- Selecting email enables a free-text email field.
- Email uses shorter, less legalistic permission copy.
- The email field uses inline validation.
- Agree and Continue is enabled only when at least one valid channel exists:
  - SMS is selected, or
  - Email is selected and contains a valid email address.

### SMS-only fallback

Disabling “Allow Email Notifications” in prototype settings restores the earlier SMS-only consent modal. The phone number remains locked and the transactional agreement is required to continue.

## Remaining onboarding steps

The post-authentication onboarding flow includes:

- User affiliation
- Expected graduation year
- Payment-method selection
- Payment confirmation
- Welcome modal

Question cards are vertically centered in the space below the progress header. Primary calls to action remain amber until the welcome modal, whose “Start re-using!” action is teal.

## Home states

The home experience is assembled from the supplied USEFULL artwork and reference screenshots.

### New-user home

- Leaning Cuppy character
- Checkout card
- Impact summary
- Empty “No active rentals” state
- Home, Checkout, Fees, and profile navigation

### Returning-user home

- Checkout and Return actions
- Impact summary
- Active-rentals section
- Representative current and late rental cards
- Locations navigation item

The welcome modal is rendered over the home screen. The leaning Cuppy remains part of the home content, while the waving Cuppy appears only inside the modal.

## Prototype settings

A low-emphasis gear in the bottom-left corner opens the scenario panel. Form drafts are preserved when the panel is opened so testing a scenario does not clear the current phone number, OTP, email, or password.

The panel supports:

- New-user versus returning-user SMS behavior
- Phone number exists for returning login — default on
- OTP entry correct — default on and shared by new and returning OTP screens
- Allow Email Notifications — default on

Turning a scenario off exposes the corresponding error or fallback state.

## Important interaction decisions

- Returning SMS sign-in cannot silently become signup.
- At least one notification channel must be valid before consent can continue.
- Verified phone numbers cannot be edited from notification consent.
- Native inputs are used for phone and OTP entry.
- Settings are a prototype-only control and intentionally visually subdued.
- All primary onboarding actions remain amber until the welcome modal.
- The final welcome CTA is teal.

## Verification performed

The implementation was repeatedly exercised in a headless Chrome browser at the rendered device size. Verification included:

- Page content and Devices.css frame loading
- Question-card centering
- Signup and returning authentication navigation
- Existing and missing returning phone scenarios
- Valid and invalid OTP scenarios in both signup and returning flows
- Returning email/password sign-in
- Populated returning home state
- Notification-channel selection and validation
- Email-only consent with a valid address
- Disabled consent with no valid channel
- SMS-only notification fallback
- Welcome modal over the home screen
- Google, Apple, and graduation-cap icon rendering
- JavaScript syntax and browser console errors

The final browser verification passes contained no JavaScript or console errors.

## Repository publication

The initial prototype was committed to `main` as:

```text
362ce56 Build interactive USEFULL onboarding prototype
```

The repository was created as private under the `owenbarron` GitHub account using the Git identity `Owen Barron <owen@usefull.us>`.

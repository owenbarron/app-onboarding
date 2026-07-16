const app = document.querySelector('#app');
const resetButton = document.querySelector('#resetPrototype');

const communities = [
  'Alfred State',
  'Carleton College',
  'Case Western Reserve University',
  'CU Boulder',
  'Emory University',
  'Emory University - Oxford College',
  'Good Earth',
  'Luther College',
  "Martha's Vineyard",
  'Montana State University',
  'Northern Arizona University'
];

const state = {
  screen: 'community',
  history: [],
  community: 'Northern Arizona University',
  acceptedTerms: false,
  email: '',
  name: '',
  password: '',
  affiliation: 'Student',
  graduationYear: '',
  payment: '',
  phone: '',
  otp: '',
  testUserType: 'new',
  authMode: 'signup',
  returningEmail: '',
  returningPassword: '',
  returningPhoneExists: true,
  otpEntryCorrect: true,
  allowEmailNotifications: true,
  notificationSmsSelected: true,
  notificationEmailSelected: false,
  notificationEmail: '',
  transactionalAccepted: false,
  consentOpen: false,
  settingsOpen: false,
  sheet: null
};

const logo = (mark = false) => `<img class="${mark ? 'brand-mark' : 'brand-logo'}" src="branding/USEFULL-icons/${mark ? 'USEFULL-Icon-Registered_Color.svg' : 'USEFULL-Logo-Registered_Color.svg'}" alt="USEFULL" />`;

const statusBar = () => '<div class="status-bar" aria-hidden="true"></div>';

const backHeader = (label = 'Back') => `
  <div class="brand-header">
    <button class="back-link" data-action="back" type="button"><span class="chevron">‹</span>${label}</button>
    ${logo(true)}
  </div>`;

const tip = () => `<div class="card tip-card"><span class="bolt">ϟ</span><p>Don't worry — no matter which community you select, you'll be able to checkout a container at any USEFULL community.</p></div>`;

const progressHeader = (step) => {
  const labels = ['Community', 'User', 'Details', 'Payment Method'];
  const progress = [0, 26, 52, 78][step - 1];
  return `<div class="progress-header">${logo()}<div class="progress-track" style="--progress:${progress}%">${labels.map((label, index) => `<div class="progress-step ${index < step ? 'active' : ''}"><span>${index + 1}</span><span>${label}</span></div>`).join('')}</div></div>`;
};

const eyeIcon = () => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.6"/></svg>`;
const phoneIcon = () => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 3.5 9.6 8 7.8 9.6c1.2 2.5 3.1 4.4 5.6 5.6l1.6-1.8 4.5 2.2-.7 3.4c-.2.9-1 1.5-1.9 1.5C9.5 20.5 3.5 14.5 3.5 7.1c0-.9.6-1.7 1.5-1.9l2.4-.7Z"/></svg>`;
const messageIcon = () => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-5 3v-14a2 2 0 0 1 2-2Z"/><path d="M8 9h8M8 12.5h5"/></svg>`;
const graduationIcon = () => `<svg class="graduation-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6 11.5v4c3.5 2.4 8.5 2.4 12 0v-4M21.5 9v6"/></svg>`;
const googleIcon = () => `<svg class="google-auth-icon" viewBox="0 0 18 18" aria-hidden="true"><path fill="#4285f4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.702-1.566 2.684-3.874 2.684-6.614Z"/><path fill="#34a853" d="M9 18c2.43 0 4.468-.806 5.956-2.18l-2.909-2.259c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"/><path fill="#fbbc05" d="M3.963 10.706A5.41 5.41 0 0 1 3.682 9c0-.592.102-1.167.281-1.706V4.962H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.038l3.007-2.332Z"/><path fill="#ea4335" d="M9 3.58c1.321 0 2.507.454 3.441 1.346l2.581-2.581C13.463.892 11.425 0 9 0A9 9 0 0 0 .956 4.962l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z"/></svg>`;
const appleIcon = () => `<svg class="apple-auth-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>`;

function isCU() {
  return state.community === 'CU Boulder';
}

function formatPhone(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function canContinueConsent() {
  if (!state.allowEmailNotifications) return true;
  return state.notificationSmsSelected || (state.notificationEmailSelected && isValidEmail(state.notificationEmail));
}

function lineIcon(name) {
  const icons = {
    home: '<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9Z"/><path d="M9 21v-7h6v7"/>',
    location: '<path d="M12 21s7-6.2 7-12A7 7 0 0 0 5 9c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.2"/>',
    scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4"/><path d="M7 12h10"/>',
    fees: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
}

function go(screen, replace = false) {
  if (!replace) state.history.push(state.screen);
  state.screen = screen;
  state.sheet = null;
  render();
}

function back() {
  state.screen = state.history.pop() || 'community';
  state.sheet = null;
  render();
}

function preserveFormDrafts() {
  const phone = document.querySelector('#phone, #returning-phone');
  const otp = document.querySelector('#otp');
  const returningEmail = document.querySelector('#returning-email');
  const returningPassword = document.querySelector('#returning-password');
  const notificationEmail = document.querySelector('#notification-email');
  if (phone) state.phone = phone.value.replace(/\D/g, '').slice(0, 10);
  if (otp) state.otp = otp.value.replace(/\D/g, '').slice(0, 6);
  if (returningEmail) state.returningEmail = returningEmail.value;
  if (returningPassword) state.returningPassword = returningPassword.value;
  if (notificationEmail) state.notificationEmail = notificationEmail.value;
}

function renderCommunity() {
  return `<div class="screen">${statusBar()}<div class="brand-header">${logo()}</div>
    <section class="card start-card">
      <h2>Where do you use USEFULL?</h2>
      <button class="select-trigger" data-sheet="community" type="button"><span>${state.community}</span><span>▼</span></button>
      <button class="button button-primary" data-go="method" type="button">Let's go</button>
      <p class="login-copy">Already have an account? <button class="text-link" data-action="returning-login" type="button">Log in</button></p>
    </section>${tip()}${renderSheet()}</div>`;
}

function renderMethod() {
  const institutionButton = state.community.includes('Northern Arizona')
    ? '<button class="button button-teal method-button" data-method="nau" type="button"><span>Sign in with MyNAU</span><span class="method-icon">▰</span></button>'
    : isCU()
      ? `<button class="button button-teal method-button" data-method="cu" type="button"><span>Sign in with CU Boulder</span><span class="method-icon">${graduationIcon()}</span></button>`
      : '';
  const standardMethods = isCU()
    ? `<button class="button button-primary method-button" data-method="email" type="button"><span>Sign in with email</span><span class="method-icon">✉</span></button>
       <button class="button button-teal method-button" data-method="sms" type="button"><span>Sign in with SMS</span><span class="method-icon sms-method-icon">${phoneIcon()}</span></button>
       <button class="button button-outline method-button" data-method="google" type="button"><span>Sign in with Google</span><span class="method-icon">${googleIcon()}</span></button>
       <button class="button button-apple method-button" data-method="apple" type="button"><span>Sign in with Apple</span><span class="method-icon">${appleIcon()}</span></button>`
    : `<button class="button button-outline method-button" data-method="google" type="button"><span>Sign in with Google</span><span class="method-icon">${googleIcon()}</span></button>
       <button class="button button-apple method-button" data-method="apple" type="button"><span>Sign in with Apple</span><span class="method-icon">${appleIcon()}</span></button>
       <button class="button button-primary method-button" data-method="email" type="button"><span>Sign in with email</span><span class="method-icon">✉</span></button>`;
  return `<div class="screen">${statusBar()}${backHeader('Start page')}
    <section class="card method-card ${isCU() ? 'method-card-cu' : ''}"><h2>Easily sign in${state.community.includes('Northern Arizona') ? ' with NAU!' : isCU() ? ' at CU Boulder!' : ''}</h2>
      <div class="terms-row"><button class="checkbox ${state.acceptedTerms ? 'checked' : ''}" data-action="terms" type="button" aria-label="Agree to terms">${state.acceptedTerms ? '<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>' : ''}</button><span>I agree to USEFULL's <a href="#" data-action="terms-link">Terms of Service</a> and <a href="#" data-action="terms-link">Privacy Policy</a></span></div>
      <div class="method-stack">
        ${institutionButton}
        <div class="divider">or choose another method</div>
        ${standardMethods}
      </div>
    </section>${tip()}</div>`;
}

function renderSMS() {
  return `<div class="screen sms-screen">${statusBar()}${backHeader()}
    <section class="card sms-card"><h2>Sign in with SMS</h2>
      <p class="auth-lead">Enter your mobile number. We'll text you a one-time code to sign in or create an account.</p>
      <label class="field-label" for="phone">Mobile number</label>
      <input class="text-input phone-input" id="phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHTML(formatPhone(state.phone))}" placeholder="(303) 555-0123" />
      <p class="error-copy" id="phone-error"></p>
      <button class="button button-primary" data-action="send-otp" type="button">Send code</button>
      <p class="sms-footnote">Message and data rates may apply.</p>
    </section></div>`;
}

function returningMethodButtons(includeEmail = false) {
  return `${includeEmail ? `<button class="button button-primary method-button" data-action="returning-email" type="button"><span>Sign in with email</span><span class="method-icon">✉</span></button>` : ''}
    <button class="button button-outline method-button" data-action="returning-social" type="button"><span>Sign in with Google</span><span class="method-icon">${googleIcon()}</span></button>
    <button class="button button-apple method-button" data-action="returning-social" type="button"><span>Sign in with Apple</span><span class="method-icon">${appleIcon()}</span></button>`;
}

function renderReturningLogin() {
  return `<div class="screen returning-login-screen">${statusBar()}${backHeader()}
    <section class="card returning-login-card"><h2>Sign in</h2>
      <input class="text-input" id="returning-email" type="email" value="${escapeHTML(state.returningEmail)}" placeholder="Email" autocomplete="email" />
      <p class="error-copy" id="returning-email-error"></p>
      <button class="button button-primary method-button" data-action="returning-email-continue" type="button"><span>Continue</span><span class="method-icon">✉</span></button>
      <div class="divider">or choose another sign in method</div>
      <div class="method-stack">${returningMethodButtons()}
        <button class="button button-teal method-button" data-action="returning-sms" type="button"><span>Sign in with SMS</span><span class="method-icon sms-method-icon">${phoneIcon()}</span></button>
      </div>
    </section>${tip()}</div>`;
}

function renderReturningPassword() {
  return `<div class="screen returning-login-screen">${statusBar()}${backHeader()}
    <section class="card returning-login-card"><h2>Sign in with email</h2>
      <div class="field-stack"><input class="text-input" id="returning-email" type="email" value="${escapeHTML(state.returningEmail)}" autocomplete="email" />
        <div class="input-wrap"><input class="text-input" id="returning-password" type="password" value="${escapeHTML(state.returningPassword)}" placeholder="Password" autocomplete="current-password" /><button class="icon-button" data-toggle="returning-password" type="button" aria-label="Show password" title="Show password">${eyeIcon()}</button></div></div>
      <p class="error-copy" id="returning-password-error"></p>
      <button class="button button-primary method-button" data-action="returning-password-submit" type="button"><span>Sign in</span><span class="method-icon">✉</span></button>
      <button class="text-link forgot-link" type="button">Forgot your password?</button>
      <div class="divider">or choose another method</div>
      <div class="method-stack">${returningMethodButtons()}
        <button class="button button-teal method-button" data-action="returning-sms" type="button"><span>Sign in with SMS</span><span class="method-icon sms-method-icon">${phoneIcon()}</span></button>
      </div>
    </section>${tip()}</div>`;
}

function renderReturningSMS() {
  return `<div class="screen sms-screen returning-login-screen">${statusBar()}${backHeader()}
    <section class="card sms-card returning-sms-card"><h2>Sign in with SMS</h2>
      <p class="auth-lead">Enter your mobile number. We'll send a one-time code to sign in to your existing account.</p>
      <label class="field-label" for="returning-phone">Mobile number</label>
      <input class="text-input phone-input" id="returning-phone" type="tel" inputmode="tel" autocomplete="tel" value="${escapeHTML(formatPhone(state.phone))}" placeholder="(303) 555-0123" />
      <p class="error-copy" id="returning-phone-error"></p>
      <button class="button button-primary" data-action="returning-send-otp" type="button">Send code</button>
      <div class="divider">or choose another method</div>
      <div class="method-stack">${returningMethodButtons(true)}</div>
    </section></div>`;
}

function renderOTP() {
  return `<div class="screen sms-screen">${statusBar()}${backHeader()}
    <section class="card sms-card"><h2>Verify phone number</h2>
      <p class="auth-lead">Enter the 6-digit code we sent to <strong>${escapeHTML(formatPhone(state.phone))}.</strong></p>
      <label class="field-label" for="otp">One-time code</label>
      <input class="text-input otp-input" id="otp" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" maxlength="6" value="${escapeHTML(state.otp)}" placeholder="000000" />
      <p class="error-copy" id="otp-error"></p>
      <button class="button button-primary" data-action="verify-otp" type="button">Verify</button>
      <button class="text-link resend-link" data-action="resend-otp" type="button">Send a new code</button>
    </section></div>`;
}

function renderSmsProfile() {
  return `<div class="screen sms-screen">${statusBar()}${backHeader()}
    <section class="card sms-card profile-card"><h2>Tell us about yourself</h2>
      <p class="auth-lead">Your phone is verified. Add your name to finish creating your account.</p>
      <div class="verified-phone"><span>Verified phone</span><strong>${escapeHTML(formatPhone(state.phone))}</strong></div>
      <label class="field-label" for="sms-name">Full name</label>
      <input class="text-input" id="sms-name" autocomplete="name" value="${escapeHTML(state.name)}" placeholder="Full name" />
      <p class="error-copy" id="sms-profile-error"></p>
      <button class="button button-primary" data-action="sms-profile-continue" type="button">Continue</button>
    </section></div>`;
}

function renderNau() {
  return `<div class="screen nau-screen">${statusBar()}${backHeader()}
    <section class="nau-panel"><p class="nau-wordmark">NAU<small>NORTHERN<br>ARIZONA<br>UNIVERSITY</small></p>
      <label for="nau-id">User ID</label><input class="text-input" id="nau-id" autocomplete="username" />
      <label for="nau-password">Password</label><input class="text-input" id="nau-password" type="password" autocomplete="current-password" />
      <button class="button" data-action="nau-signin" type="button">Sign in</button>
      <div class="nau-help"><span>Forgot your password?</span><span>Need help?</span></div>
    </section></div>`;
}

function renderEmail() {
  return `<div class="screen">${statusBar()}${backHeader()}
    <section class="card email-card"><h2>Sign in with email</h2>
      <input class="text-input" id="email" type="email" value="${escapeHTML(state.email)}" placeholder="Email" autocomplete="email" />
      <p class="error-copy" id="email-error"></p>
      <button class="button button-primary" data-action="email-continue" type="button">Sign in</button>
      <p class="microcopy">We'll check for an existing account before creating a new one.</p>
    </section></div>`;
}

function renderAccount() {
  return `<div class="screen account-screen">${statusBar()}${backHeader()}
    <section class="card"><h2>Hi! Enter your name, password and sign in</h2>
      <div class="field-stack">
        <input class="text-input" id="account-email" type="email" value="${escapeHTML(state.email)}" placeholder="Email" />
        <input class="text-input" id="name" value="${escapeHTML(state.name)}" placeholder="Full name" autocomplete="name" />
        <div class="input-wrap"><input class="text-input" id="password" type="password" value="${escapeHTML(state.password)}" placeholder="Password" autocomplete="new-password" /><button class="icon-button" data-toggle="password" type="button" aria-label="Show password" title="Show password">${eyeIcon()}</button></div>
        <div class="input-wrap"><input class="text-input" id="confirm-password" type="password" placeholder="Confirm password" autocomplete="new-password" /><button class="icon-button" data-toggle="confirm-password" type="button" aria-label="Show confirmation password" title="Show confirmation password">${eyeIcon()}</button></div>
      </div><p class="error-copy" id="account-error"></p>
      <button class="button button-primary" data-action="account-continue" type="button">Sign up</button>
    </section></div>`;
}

function renderAffiliation() {
  return `<div class="screen question-screen">${statusBar()}${progressHeader(2)}
    <section class="card"><h2>What's your affiliation with ${state.community}?</h2>
      <button class="select-trigger" data-sheet="affiliation" type="button"><span>${state.affiliation}</span><span>▼</span></button>
      <div class="button-row"><button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button><button class="button button-primary" data-go="details" type="button">Continue <span class="arrow">›</span></button></div>
    </section>${renderSheet()}</div>`;
}

function renderDetails() {
  return `<div class="screen question-screen">${statusBar()}${progressHeader(3)}
    <section class="card"><h2>What year do you expect to graduate from ${state.community}?</h2>
      <button class="select-trigger" data-sheet="graduation" type="button"><span>${state.graduationYear || 'Select year'}</span><span>▼</span></button>
      <div class="button-row"><button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button><button class="button button-primary" data-go="payment" type="button" ${state.graduationYear ? '' : 'disabled'}>Continue <span class="arrow">›</span></button></div>
    </section>${renderSheet()}</div>`;
}

function renderPayment() {
  return `<div class="screen payment-screen">${statusBar()}${progressHeader(4)}
    <section class="card"><h2>Great news!<br>USEFULL is free to use.</h2><p class="lead">We do require a card on file for late and lost fees. Add a payment method to get started!</p>
      <div class="payment-stack">
        ${state.community.includes('Northern Arizona') ? '<button class="button button-primary" data-payment="NAU Dining Dollars" type="button">NAU Dining Dollars</button>' : ''}
        <div class="divider">or choose another method</div>
        <button class="button button-soft" data-payment="Credit Card" type="button">Credit card</button>
        <button class="button button-apple" data-payment="Apple Pay" type="button"><span class="method-icon">●</span>Pay</button>
        <button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button>
      </div>
    </section></div>`;
}

function renderConfirm() {
  return `<div class="screen">${statusBar()}${progressHeader(4)}
    <section class="card confirm-card"><h2>Confirm your payment method</h2>
      <div class="summary"><div class="summary-row"><span>Community</span><strong>${state.community}</strong></div><div class="summary-row"><span>Payment</span><strong>${state.payment}</strong></div></div>
      <div class="button-row"><button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button><button class="button button-primary" data-go="success" type="button">Confirm <span class="arrow">›</span></button></div>
    </section></div>`;
}

function renderSuccess() {
  return `${renderHome()}<div class="welcome-overlay" aria-hidden="true"></div>
    <section class="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><img class="welcome-cuppy" src="branding/interface-icons/cuppy-wave.png" alt="A waving USEFULL cup" /><h2 id="welcome-title">Welcome to the<br>USEFULL family!</h2>
      <p>At ${escapeHTML(state.community)}, you have a 3-day FREE usage period, after which a $1/day late fee applies.</p>
      <p class="welcome-emphasis">Please check your confirmation email for more details!</p>
      <button class="button button-teal" data-go="home" type="button">Start re-using!</button>
    </section>`;
}

function renderHome() {
  const returning = state.testUserType === 'returning';
  return `<div class="screen home-screen">${statusBar()}<div class="home-scroll"><header class="home-logo">${logo()}</header>
    <section class="home-actions ${returning ? 'two-actions' : ''}">
      ${returning ? '' : '<img class="action-cuppy" src="branding/interface-icons/cuppy-lean.png" alt="" />'}
      <button class="home-action-card" data-action="checkout" type="button"><img src="branding/interface-icons/checkout-scan.png" alt="" /><strong>Checkout</strong></button>
      ${returning ? '<button class="home-action-card" type="button"><img src="branding/interface-icons/return-drop.png" alt="" /><strong>Return</strong></button>' : ''}
    </section>
    <section class="impact-heading"><div><h2>Your impact</h2><p>By switching to USEFULL</p></div><button type="button">Share ${lineIcon('share')}</button></section>
    <section class="impact-grid">
      <div><img src="branding/interface-icons/Timeline_Icons_trashtruck.png" alt="" /><strong>${returning ? '2.1' : '2.8'} LBS</strong><span>of trash</span></div>
      <div><img src="branding/interface-icons/ShowerWater.png" alt="" /><strong>${returning ? '59.3' : '79.6'} GAL</strong><span>of water</span></div>
      <div><img src="branding/interface-icons/Timeline_Icons_globalwarming.png" alt="" /><strong>${returning ? '6.6' : '8.9'} LBS</strong><span>of emissions</span></div>
    </section>
    ${returning ? `<section class="rentals-heading"><div><h2>Active rentals</h2><p>Please return before the due date.</p></div><img src="branding/interface-icons/earth-containers.png" alt="" /></section>
      <section class="rental-list"><article><div><strong>Big Brown Cup</strong><span>Due date: July 18, 2026</span></div><div><span>Due:</span><strong>07.18.26</strong></div></article><article class="late"><div><strong>Big Yellow Bowl</strong><span>Fine: Temporarily paused</span></div><b>Late</b></article></section>`
      : '<section class="empty-rentals"><h2>No active rentals</h2><p>As soon as you check a cup or bowl out,<br>something will be displayed here.</p></section>'}
    </div><nav class="home-nav"><button class="active" type="button">${lineIcon('home')}<span>Home</span></button>${returning ? `<button type="button">${lineIcon('location')}<span>Locations</span></button>` : ''}<button type="button">${lineIcon('scan')}<span>Checkout</span></button><button type="button">${lineIcon('fees')}<span>Fees</span></button><button class="profile-dot" type="button" aria-label="Profile">O</button></nav></div>`;
}

function renderSettings() {
  return `<button class="tester-button" data-action="open-settings" type="button" aria-label="Open prototype settings" title="Prototype settings">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>
      <span>${state.testUserType === 'new' ? 'NEW' : 'RETURNING'}</span>
    </button>
    ${state.settingsOpen ? `<button class="modal-backdrop settings-backdrop" data-action="close-settings" type="button" aria-label="Close prototype settings"></button>
      <aside class="tester-panel" aria-label="Prototype settings"><div class="tester-panel-header"><div><span>Test mode</span><strong>SMS scenarios</strong></div><button class="panel-close" data-action="close-settings" type="button" aria-label="Close settings">×</button></div>
        <div class="test-toggle" role="group" aria-label="SMS user type">
          <button class="${state.testUserType === 'new' ? 'selected' : ''}" data-test-user="new" type="button"><strong>New user</strong><span>OTP → consent → profile</span></button>
          <button class="${state.testUserType === 'returning' ? 'selected' : ''}" data-test-user="returning" type="button"><strong>Returning</strong><span>OTP → signed in</span></button>
        </div>
        <div class="scenario-toggles" aria-label="Authentication scenarios">
          <button class="scenario-toggle ${state.returningPhoneExists ? 'selected' : ''}" data-test-flag="returningPhoneExists" type="button" role="checkbox" aria-checked="${state.returningPhoneExists}"><span class="scenario-check">${state.returningPhoneExists ? '✓' : ''}</span><span><strong>Phone number exists for returning login</strong><small>Off shows “Phone number not found.”</small></span></button>
          <button class="scenario-toggle ${state.otpEntryCorrect ? 'selected' : ''}" data-test-flag="otpEntryCorrect" type="button" role="checkbox" aria-checked="${state.otpEntryCorrect}"><span class="scenario-check">${state.otpEntryCorrect ? '✓' : ''}</span><span><strong>OTP entry correct</strong><small>Applies to returning and new-user OTP screens.</small></span></button>
          <button class="scenario-toggle ${state.allowEmailNotifications ? 'selected' : ''}" data-test-flag="allowEmailNotifications" type="button" role="checkbox" aria-checked="${state.allowEmailNotifications}"><span class="scenario-check">${state.allowEmailNotifications ? '✓' : ''}</span><span><strong>Allow Email Notifications</strong><small>Off uses the existing SMS-only consent screen.</small></span></button>
        </div><p>Enter any 10-digit phone number and any 6-digit code while its scenario is enabled.</p>
      </aside>` : ''}`;
}

function renderConsent() {
  if (!state.consentOpen) return '';
  if (state.allowEmailNotifications) {
    const emailValid = isValidEmail(state.notificationEmail);
    const canContinue = canContinueConsent();
    return `<div class="modal-backdrop consent-backdrop"></div><section class="consent-modal consent-modal-with-email" role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <h2 id="consent-title">Allow notifications</h2>
      <p>Choose how you'd like to receive checkout, return, and account updates.</p>
      <div class="notification-options">
        <section class="notification-option ${state.notificationSmsSelected ? 'selected' : ''}">
          <div class="notification-option-header"><button class="channel-checkbox ${state.notificationSmsSelected ? 'checked' : ''}" data-notification-channel="sms" type="button" role="checkbox" aria-checked="${state.notificationSmsSelected}" aria-label="Receive SMS notifications">${state.notificationSmsSelected ? '✓' : ''}</button><div><strong>SMS notifications</strong><span class="locked-contact">${escapeHTML(formatPhone(state.phone))}</span></div></div>
          <p><strong>By selecting SMS, I agree</strong> USEFULL may text me rental, return, due-date, billing, and account status updates. Msg/data rates may apply. Reply STOP to opt out.</p>
        </section>
        <section class="notification-option ${state.notificationEmailSelected ? 'selected' : ''}">
          <div class="notification-option-header"><button class="channel-checkbox ${state.notificationEmailSelected ? 'checked' : ''}" data-notification-channel="email" type="button" role="checkbox" aria-checked="${state.notificationEmailSelected}" aria-label="Receive email notifications">${state.notificationEmailSelected ? '✓' : ''}</button><strong>Email notifications</strong></div>
          <input class="text-input notification-email-input ${state.notificationEmailSelected && state.notificationEmail && !emailValid ? 'input-error' : ''}" id="notification-email" type="email" value="${escapeHTML(state.notificationEmail)}" placeholder="Email address" autocomplete="email" ${state.notificationEmailSelected ? '' : 'disabled'} />
          <p>Send me useful account and rental updates by email. I can unsubscribe at any time.</p>
          <span class="notification-email-error">${state.notificationEmailSelected && state.notificationEmail && !emailValid ? 'Enter a valid email address' : ''}</span>
        </section>
      </div>
      ${canContinue ? '' : '<p class="consent-validation">Choose at least one valid notification method.</p>'}
      <button class="button button-primary" data-action="consent-continue" type="button" ${canContinue ? '' : 'disabled'}>Agree and continue</button>
      <button class="button button-outline consent-cancel" data-action="cancel-consent" type="button">Cancel</button>
    </section>`;
  }
  return `<div class="modal-backdrop consent-backdrop"></div><section class="consent-modal" role="dialog" aria-modal="true" aria-labelledby="consent-title">
    <h2 id="consent-title">Allow notifications</h2>
    <p>We'll send you notifications for checkouts, returns, and other important info via SMS.</p>
    <div class="consent-phone"><span>Phone number</span><strong>${escapeHTML(formatPhone(state.phone))}</strong></div>
    <p class="consent-legal"><strong>By continuing, I agree</strong> USEFULL may text me rental, return, due-date, billing, and account status updates. Msg/data rates may apply. Reply STOP to opt out.</p>
    <button class="button button-primary" data-action="consent-continue" type="button">Agree and continue</button>
    <button class="button button-outline consent-cancel" data-action="cancel-consent" type="button">Cancel</button>
  </section>`;
}

function renderSheet() {
  if (!state.sheet) return '';
  let options = [];
  if (state.sheet === 'community') options = communities;
  if (state.sheet === 'affiliation') options = ['Student', 'Faculty', 'Staff', 'Community member'];
  if (state.sheet === 'graduation') options = ['2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033'];
  const selected = state.sheet === 'community' ? state.community : state.sheet === 'affiliation' ? state.affiliation : state.graduationYear;
  return `<button class="sheet-backdrop" data-action="close-sheet" type="button" aria-label="Close options"></button><div class="bottom-sheet" role="dialog" aria-label="Select an option">${options.map(option => `<button class="sheet-option ${option === selected ? 'selected' : ''}" data-select="${state.sheet}" data-value="${escapeHTML(option)}" type="button"><span>${option}</span>${option === selected ? '<span>✓</span>' : ''}</button>`).join('')}</div>`;
}

function render() {
  const views = {
    community: renderCommunity,
    method: renderMethod,
    nau: renderNau,
    email: renderEmail,
    returningLogin: renderReturningLogin,
    returningPassword: renderReturningPassword,
    returningSms: renderReturningSMS,
    sms: renderSMS,
    otp: renderOTP,
    smsProfile: renderSmsProfile,
    account: renderAccount,
    affiliation: renderAffiliation,
    details: renderDetails,
    payment: renderPayment,
    confirm: renderConfirm,
    success: renderSuccess,
    home: renderHome
  };
  app.innerHTML = views[state.screen]() + renderSettings() + renderConsent();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

app.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.matches('a')) event.preventDefault();
  if (target.dataset.go) return go(target.dataset.go);
  if (target.dataset.sheet) { state.sheet = target.dataset.sheet; return render(); }
  if (target.dataset.testUser) { state.testUserType = target.dataset.testUser; return render(); }
  if (target.dataset.testFlag) { state[target.dataset.testFlag] = !state[target.dataset.testFlag]; return render(); }
  if (target.dataset.notificationChannel) {
    preserveFormDrafts();
    if (target.dataset.notificationChannel === 'sms') state.notificationSmsSelected = !state.notificationSmsSelected;
    if (target.dataset.notificationChannel === 'email') state.notificationEmailSelected = !state.notificationEmailSelected;
    return render();
  }
  if (target.dataset.method) {
    if (!state.acceptedTerms) {
      const box = app.querySelector('.checkbox');
      box?.animate([{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}], {duration:180});
      return;
    }
    if (target.dataset.method === 'email') return go('email');
    if (target.dataset.method === 'sms') return go('sms');
    if (target.dataset.method === 'nau') return go('nau');
    if (target.dataset.method === 'cu') { state.name = state.name || 'Ralphie'; return go('affiliation'); }
    return go('account');
  }
  if (target.dataset.payment) { state.payment = target.dataset.payment; return go('confirm'); }
  if (target.dataset.select) {
    const key = target.dataset.select === 'graduation' ? 'graduationYear' : target.dataset.select;
    state[key] = target.dataset.value;
    state.sheet = null;
    return render();
  }
  if (target.dataset.toggle) {
    const input = document.getElementById(target.dataset.toggle);
    input.type = input.type === 'password' ? 'text' : 'password';
    target.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
    return;
  }
  switch (target.dataset.action) {
    case 'back': return back();
    case 'returning-login': state.authMode = 'returning'; return go('returningLogin');
    case 'returning-email': state.authMode = 'returning'; return go('returningLogin');
    case 'returning-sms': state.authMode = 'returning'; return go('returningSms');
    case 'returning-social': state.testUserType = 'returning'; state.name = state.name || 'Returning member'; return go('home');
    case 'returning-email-continue': {
      const input = document.querySelector('#returning-email');
      const error = document.querySelector('#returning-email-error');
      if (!input.value.trim() || !input.validity.valid) { input.classList.add('input-error'); error.textContent = 'Email address not found'; input.focus(); return; }
      state.returningEmail = input.value.trim();
      return go('returningPassword');
    }
    case 'returning-password-submit': {
      const input = document.querySelector('#returning-password');
      const error = document.querySelector('#returning-password-error');
      if (!input.value.trim()) { input.classList.add('input-error'); error.textContent = 'Password is invalid'; input.focus(); return; }
      state.returningPassword = input.value;
      state.testUserType = 'returning';
      state.name = state.name || 'Returning member';
      return go('home');
    }
    case 'returning-send-otp': {
      const input = document.querySelector('#returning-phone');
      const error = document.querySelector('#returning-phone-error');
      const digits = input.value.replace(/\D/g, '');
      input.classList.remove('input-error');
      if (digits.length !== 10) { input.classList.add('input-error'); error.textContent = 'Enter a 10-digit mobile number'; input.focus(); return; }
      if (!state.returningPhoneExists) { input.classList.add('input-error'); error.textContent = 'Phone number not found'; input.focus(); return; }
      state.phone = digits;
      state.otp = '';
      state.authMode = 'returning';
      return go('otp');
    }
    case 'open-settings': preserveFormDrafts(); state.settingsOpen = true; return render();
    case 'close-settings': state.settingsOpen = false; return render();
    case 'close-sheet': state.sheet = null; return render();
    case 'terms': state.acceptedTerms = !state.acceptedTerms; return render();
    case 'terms-link': return;
    case 'nau-signin': state.name = state.name || 'Louie'; return go('affiliation');
    case 'send-otp': {
      const input = document.querySelector('#phone');
      const error = document.querySelector('#phone-error');
      const digits = input.value.replace(/\D/g, '');
      if (digits.length !== 10) { error.textContent = 'Enter a 10-digit mobile number.'; input.focus(); return; }
      state.phone = digits;
      state.otp = '';
      state.authMode = 'signup';
      return go('otp');
    }
    case 'verify-otp': {
      const input = document.querySelector('#otp');
      const error = document.querySelector('#otp-error');
      const digits = input.value.replace(/\D/g, '');
      if (digits.length !== 6) { error.textContent = 'Enter the complete 6-digit code.'; input.focus(); return; }
      if (!state.otpEntryCorrect) { input.classList.add('input-error'); error.textContent = 'One-time code is incorrect'; input.focus(); return; }
      state.otp = digits;
      if (state.authMode === 'returning') { state.testUserType = 'returning'; state.name = state.name || 'Returning member'; return go('home'); }
      if (state.testUserType === 'returning') { state.name = state.name || 'Returning member'; return go('home'); }
      state.transactionalAccepted = false;
      state.consentOpen = true;
      return render();
    }
    case 'resend-otp': {
      const note = document.querySelector('#otp-error');
      note.classList.add('success-copy');
      note.textContent = `A new code was sent to ${formatPhone(state.phone)}.`;
      return;
    }
    case 'consent-check': state.transactionalAccepted = !state.transactionalAccepted; return render();
    case 'cancel-consent': state.consentOpen = false; state.transactionalAccepted = false; return render();
    case 'consent-continue':
      preserveFormDrafts();
      if (!canContinueConsent()) return;
      state.transactionalAccepted = state.allowEmailNotifications ? state.notificationSmsSelected : true;
      state.consentOpen = false;
      return go('smsProfile');
    case 'sms-profile-continue': {
      const input = document.querySelector('#sms-name');
      const error = document.querySelector('#sms-profile-error');
      if (!input.value.trim()) { error.textContent = 'Enter your name to continue.'; input.focus(); return; }
      state.name = input.value.trim();
      return go('affiliation');
    }
    case 'email-continue': {
      const input = document.querySelector('#email');
      const error = document.querySelector('#email-error');
      if (!input.value.trim() || !input.validity.valid) { error.textContent = 'Enter a valid email address to continue.'; input.focus(); return; }
      state.email = input.value.trim();
      return go('account');
    }
    case 'account-continue': {
      const email = document.querySelector('#account-email');
      const name = document.querySelector('#name');
      const password = document.querySelector('#password');
      const confirm = document.querySelector('#confirm-password');
      const error = document.querySelector('#account-error');
      if (!email.value || !name.value || password.value.length < 6 || password.value !== confirm.value) { error.textContent = 'Complete all fields and use matching passwords of 6+ characters.'; return; }
      state.email = email.value; state.name = name.value; state.password = password.value;
      return go('affiliation');
    }
    case 'checkout': target.textContent = 'Scanner opened'; target.disabled = true; return;
  }
});

app.addEventListener('input', event => {
  if (event.target.id !== 'notification-email') return;
  state.notificationEmail = event.target.value;
  const valid = isValidEmail(state.notificationEmail);
  const error = app.querySelector('.notification-email-error');
  const validation = app.querySelector('.consent-validation');
  const submit = app.querySelector('[data-action="consent-continue"]');
  event.target.classList.toggle('input-error', Boolean(state.notificationEmail) && !valid);
  if (error) error.textContent = state.notificationEmail && !valid ? 'Enter a valid email address' : '';
  if (validation) validation.textContent = canContinueConsent() ? '' : 'Choose at least one valid notification method.';
  if (submit) submit.disabled = !canContinueConsent();
});

resetButton.addEventListener('click', () => {
  Object.assign(state, { screen:'community', history:[], acceptedTerms:false, email:'', name:'', password:'', phone:'', otp:'', authMode:'signup', returningEmail:'', returningPassword:'', returningPhoneExists:true, otpEntryCorrect:true, allowEmailNotifications:true, notificationSmsSelected:true, notificationEmailSelected:false, notificationEmail:'', transactionalAccepted:false, consentOpen:false, settingsOpen:false, affiliation:'Student', graduationYear:'', payment:'', sheet:null });
  render();
});

render();

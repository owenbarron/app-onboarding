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
  firstName: '',
  lastName: '',
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
  returningSource: '',
  accountLookupEmail: '',
  accountLookupPhone: '',
  accountLookupResult: '',
  returningPhoneExists: true,
  otpEntryCorrect: true,
  allowEmailNotifications: true,
  notificationSmsSelected: true,
  notificationEmailSelected: false,
  notificationEmail: '',
  notificationPhoneSelected: false,
  notificationPhone: '',
  notificationContext: 'signup',
  transactionalAccepted: false,
  consentOpen: false,
  settingsOpen: false,
  testerHidden: false,
  askAffiliationDetails: false,
  guidedSignup: true,
  notificationManagerVersion: 'controls',
  managerExistingChannel: 'email',
  smsCampusEnabled: true,
  managerEmailAdded: true,
  managerSmsAdded: false,
  managerEmail: 'owen@usefull.us',
  managerPhone: '',
  managerDirty: false,
  managerSaved: false,
  managerNotice: '',
  channelSetupOpen: false,
  channelSetupStage: 'contact',
  channelSetupType: '',
  channelSetupContact: '',
  channelSetupOtp: '',
  channelSetupError: '',
  channelSetupMessage: '',
  qrSheetOpen: false,
  promoteWalletOverInAppQr: true,
  walletPlatform: 'apple',
  walletPromptCompleted: false,
  walletOnboardingNext: 'home',
  walletStage: '',
  walletViewOpen: false,
  passAdded: false,
  walletAvailable: true,
  qrFallbackVisible: false,
  qrCopyVariant: 'scanner',
  reusingSince: 'Aug 15, 2025',
  notificationPreferences: {
    checkout: { app: true, email: true, sms: false },
    return: { app: true, email: false, sms: true },
    due: { app: true, email: true, sms: true },
    fees: { app: true, email: true, sms: true }
  },
  sheet: null
};

const logo = (mark = false) => `<img class="${mark ? 'brand-mark' : 'brand-logo'}" src="branding/USEFULL-icons/${mark ? 'USEFULL-Icon-Registered_Color.svg' : 'USEFULL-Logo-Registered_Color.svg'}" alt="USEFULL" />`;

const statusBar = () => '<div class="status-bar" aria-hidden="true"></div>';

const backHeader = (label = 'Back') => `
  <div class="brand-header">
    <button class="back-link" data-action="back" type="button"><span class="chevron">‹</span>${label}</button>
    ${logo(true)}
  </div>`;

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

const managerEvents = [
  { key: 'checkout', title: 'Checkout confirmation', description: 'A receipt when a container is checked out.' },
  { key: 'return', title: 'Return confirmation', description: 'Proof that your container was returned.' },
  { key: 'due', title: 'Due today', description: 'A reminder before the free-use period ends.' },
  { key: 'fees', title: 'Late & lost fees', description: 'Time-sensitive fee and account updates.' }
];

function freshNotificationPreferences() {
  return {
    checkout: { app: true, email: true, sms: false },
    return: { app: true, email: false, sms: true },
    due: { app: true, email: true, sms: true },
    fees: { app: true, email: true, sms: true }
  };
}

function setManagerExistingChannel(channel = 'email') {
  const useSms = channel === 'sms' && state.smsCampusEnabled;
  state.managerExistingChannel = useSms ? 'sms' : 'email';
  state.managerEmailAdded = !useSms;
  state.managerSmsAdded = useSms;
  state.managerEmail = useSms ? '' : 'owen@usefull.us';
  state.managerPhone = useSms ? '9285550142' : '';
}

function managerHasChannel(channel) {
  if (channel === 'app') return true;
  if (channel === 'email') return state.notificationManagerVersion === 'controls' || state.managerEmailAdded;
  if (channel === 'sms') return state.smsCampusEnabled && (state.notificationManagerVersion === 'controls' || state.managerSmsAdded);
  return false;
}

function managerChannels() {
  return state.smsCampusEnabled ? ['app', 'email', 'sms'] : ['app', 'email'];
}

function managerChannelIsOn(eventKey, channel) {
  return managerHasChannel(channel) && Boolean(state.notificationPreferences[eventKey]?.[channel]);
}

function managerActiveCount(eventKey) {
  return managerChannels().filter(channel => managerChannelIsOn(eventKey, channel)).length;
}

function managerAllRequiredCovered() {
  return managerEvents.every(event => managerActiveCount(event.key) > 0);
}

function canContinueConsent() {
  if (!state.allowEmailNotifications) return true;
  return state.notificationSmsSelected || (state.notificationEmailSelected && isValidEmail(state.notificationEmail));
}

function canSaveNotificationSettings() {
  const emailValid = !state.notificationEmailSelected || isValidEmail(state.notificationEmail);
  const phoneValid = !state.notificationPhoneSelected || state.notificationPhone.replace(/\D/g, '').length === 10;
  return emailValid && phoneValid;
}

function walletName() {
  return state.walletPlatform === 'google' ? 'Google Wallet' : 'Apple Wallet';
}

function showFirstUseWallet(nextScreen = 'home') {
  if (state.promoteWalletOverInAppQr && !state.walletPromptCompleted) {
    state.walletOnboardingNext = nextScreen;
    return go('walletOnboarding');
  }
  return go(nextScreen);
}

function enterHomeAfterFirstUse() {
  return showFirstUseWallet('home');
}

function continueAfterIdentity() {
  return go(state.askAffiliationDetails ? 'affiliation' : 'payment');
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
  const notificationPhone = document.querySelector('#notification-phone');
  const accountLookupEmail = document.querySelector('#account-lookup-email');
  const accountLookupPhone = document.querySelector('#account-lookup-phone');
  if (phone) state.phone = phone.value.replace(/\D/g, '').slice(0, 10);
  if (otp) state.otp = otp.value.replace(/\D/g, '').slice(0, 6);
  if (returningEmail) state.returningEmail = returningEmail.value;
  if (returningPassword) state.returningPassword = returningPassword.value;
  if (notificationEmail) state.notificationEmail = notificationEmail.value;
  if (notificationPhone) state.notificationPhone = notificationPhone.value.replace(/\D/g, '').slice(0, 10);
  if (accountLookupEmail) state.accountLookupEmail = accountLookupEmail.value;
  if (accountLookupPhone) state.accountLookupPhone = accountLookupPhone.value.replace(/\D/g, '').slice(0, 10);
}

function renderCommunity() {
  return `<div class="screen">${statusBar()}<div class="brand-header">${logo()}</div>
    <section class="card start-card">
      <h2>Where do you use USEFULL?</h2>
      <button class="select-trigger" data-sheet="community" type="button"><span>${state.community}</span><span>▼</span></button>
      <button class="button button-primary" data-action="begin-onboarding" type="button">Let's go</button>
      <p class="login-copy">Already have an account? <button class="text-link" data-action="returning-login" type="button">Log in</button></p>
    </section>${renderSheet()}</div>`;
}

function cardIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 9h19M6 15h5"/></svg>`;
}

function renderCuAccountCheck() {
  return `<div class="screen cu-branch-screen">${statusBar()}${backHeader('Community')}
    <section class="card cu-branch-card">
      <p class="branch-eyebrow">CU Boulder</p>
      <h2>Have you checked out with USEFULL before?</h2>
      <p class="branch-lead">You may already have an account if you used a campus checkout kiosk.</p>
      <div class="branch-choices">
        <button class="branch-choice branch-choice-kiosk" data-action="cu-checked-out" type="button">
          <img src="branding/interface-icons/checkout-station-kiosk.png" alt="" />
          <span><strong>Yes, at a kiosk</strong><small>Help me find the account I made there</small></span><b aria-hidden="true">›</b>
        </button>
        <button class="branch-choice" data-action="cu-first-time" type="button">
          <span class="branch-choice-icon branch-choice-icon-new" aria-hidden="true">1</span>
          <span><strong>No, this is my first time</strong><small>Set up a new USEFULL account</small></span><b aria-hidden="true">›</b>
        </button>
      </div>
      <button class="text-link branch-unsure" data-action="cu-unsure" type="button">I’m not sure</button>
    </section>
  </div>`;
}

function renderCuCheckoutMethod() {
  return `<div class="screen cu-branch-screen">${statusBar()}${backHeader()}
    <section class="card cu-branch-card cu-payment-card">
      <p class="branch-eyebrow">Find your account</p>
      <h2>How did you check out?</h2>
      <p class="branch-lead">Choose what you used at the kiosk so we can take you to the right sign-in.</p>
      <div class="branch-choices">
        <button class="branch-choice" data-action="cu-used-buff-card" type="button">
          <span class="branch-choice-icon branch-choice-icon-buff">${graduationIcon()}</span>
          <span><strong>Buff OneCard</strong><small>Use your CU Boulder sign-in</small></span><b aria-hidden="true">›</b>
        </button>
        <button class="branch-choice" data-action="cu-used-bank-card" type="button">
          <span class="branch-choice-icon">${cardIcon()}</span>
          <span><strong>Debit or credit card</strong><small>Find your account by mobile number</small></span><b aria-hidden="true">›</b>
        </button>
      </div>
      <button class="text-link branch-unsure" data-action="cu-unsure" type="button">I don’t remember</button>
    </section>
  </div>`;
}

function renderCuSso() {
  return `<div class="screen nau-screen cu-login-screen">${statusBar()}${backHeader()}
    <section class="nau-panel cu-login-panel"><p class="nau-wordmark cu-wordmark">CU<small>UNIVERSITY OF<br>COLORADO BOULDER</small></p>
      <label for="cu-id">Username</label><input class="text-input" id="cu-id" value="bsmith" autocomplete="username" />
      <label for="cu-password">Password</label><input class="text-input" id="cu-password" type="password" value="password" autocomplete="current-password" />
      <button class="button" data-action="cu-sso-signin" type="button">Sign in</button>
      <div class="nau-help cu-help"><span>Forgot your password?</span><span>Need help?</span></div>
    </section></div>`;
}

function renderAccountFinder() {
  const result = state.accountLookupResult;
  const resultModal = result === 'email'
    ? `<div class="modal-backdrop"></div><section class="account-result-modal" role="dialog" aria-modal="true" aria-labelledby="account-result-title"><span class="result-check">✓</span><h2 id="account-result-title">We found your account</h2><p>Your USEFULL account is connected to</p><strong>bsmith@colorado.edu</strong><button class="button cu-result-button" data-action="account-found-email" type="button">Sign in with CU Boulder</button><button class="text-link" data-action="close-account-result" type="button">Try something else</button></section>`
    : result === 'phone'
      ? `<div class="modal-backdrop"></div><section class="account-result-modal" role="dialog" aria-modal="true" aria-labelledby="account-result-title"><span class="result-check">✓</span><h2 id="account-result-title">We found your account</h2><p>Your USEFULL account is connected to</p><strong>${escapeHTML(formatPhone(state.accountLookupPhone))}</strong><button class="button button-primary" data-action="account-found-phone" type="button">Send me a code</button><button class="text-link" data-action="close-account-result" type="button">Try something else</button></section>`
      : '';
  return `<div class="screen account-finder-screen">${statusBar()}${backHeader()}
    <section class="card account-finder-card"><p class="branch-eyebrow">Account recovery</p><h2>Let’s find your account</h2>
      <p class="auth-lead">We’ll search by email first. If there’s no match, we’ll try your mobile number.</p>
      <label class="field-label" for="account-lookup-email">Email address</label>
      <input class="text-input" id="account-lookup-email" type="email" value="${escapeHTML(state.accountLookupEmail)}" placeholder="name@colorado.edu" autocomplete="email" />
      <div class="finder-divider"><span>then, if needed</span></div>
      <label class="field-label" for="account-lookup-phone">Mobile number</label>
      <input class="text-input phone-input" id="account-lookup-phone" type="tel" inputmode="tel" value="${escapeHTML(formatPhone(state.accountLookupPhone))}" placeholder="(303) 555-0123" autocomplete="tel" />
      <p class="error-copy" id="account-lookup-error"></p>
      <button class="button button-primary" data-action="search-account" type="button">Search for my account</button>
    </section>${resultModal}</div>`;
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
  const guidedMethods = `<div class="guided-methods">
    <button class="guided-method guided-method-buff" data-method="cu" type="button"><span class="guided-method-icon">${graduationIcon()}</span><span><strong>Use my Buff OneCard</strong><small>Sign up with your CU Boulder login</small></span><b aria-hidden="true">›</b></button>
    <button class="guided-method guided-method-bank" data-method="sms" type="button"><span class="guided-method-icon">${cardIcon()}</span><span><strong>Use a debit or credit card</strong><small>Sign up with your mobile number</small></span><b aria-hidden="true">›</b></button>
    <div class="divider">or choose another method</div>
    <div class="compact-methods">
      <button data-method="email" type="button"><span>✉</span>Email</button>
      <button data-method="google" type="button">${googleIcon()}<span>Google</span></button>
      <button data-method="apple" type="button">${appleIcon()}<span>Apple</span></button>
    </div>
  </div>`;
  return `<div class="screen">${statusBar()}${backHeader('Start page')}
    <section class="card method-card ${isCU() ? 'method-card-cu' : ''} ${isCU() && state.guidedSignup ? 'guided-method-card' : ''}"><h2>${isCU() && state.guidedSignup ? 'How will you check out?' : `Easily sign in${state.community.includes('Northern Arizona') ? ' with NAU!' : isCU() ? ' at CU Boulder!' : ''}`}</h2>
      ${isCU() && state.guidedSignup ? '<p class="guided-lead">Choose the payment method you plan to use most often.</p>' : ''}
      <div class="terms-row"><button class="checkbox ${state.acceptedTerms ? 'checked' : ''}" data-action="terms" type="button" aria-label="Agree to terms">${state.acceptedTerms ? '<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>' : ''}</button><span>I agree to USEFULL's <a href="#" data-action="terms-link">Terms of Service</a> and <a href="#" data-action="terms-link">Privacy Policy</a></span></div>
      ${isCU() && state.guidedSignup ? guidedMethods : `<div class="method-stack">
        ${institutionButton}
        <div class="divider">or choose another method</div>
        ${standardMethods}
      </div>`}
    </section></div>`;
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
    </section></div>`;
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
    </section></div>`;
}

function renderReturningSMS() {
  const kioskRecovery = state.returningSource === 'cu-bank-card';
  return `<div class="screen sms-screen returning-login-screen">${statusBar()}${backHeader()}
    <section class="card sms-card returning-sms-card"><h2>${kioskRecovery ? 'Find your kiosk account' : 'Sign in with SMS'}</h2>
      <p class="auth-lead">${kioskRecovery ? 'Enter the mobile number you used at checkout. We’ll text you a code to reconnect your account.' : "Enter your mobile number. We'll send a one-time code to sign in to your existing account."}</p>
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
      <div class="profile-name-grid"><div><label class="field-label" for="sms-first-name">First name</label><input class="text-input" id="sms-first-name" autocomplete="given-name" value="${escapeHTML(state.firstName)}" placeholder="First name" /></div><div><label class="field-label" for="sms-last-name">Last name</label><input class="text-input" id="sms-last-name" autocomplete="family-name" value="${escapeHTML(state.lastName)}" placeholder="Last name" /></div></div>
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
  const showStepper = state.askAffiliationDetails && !isCU();
  const communityPayment = isCU()
    ? '<button class="button button-primary" data-payment="Boulder BuffCard" type="button">Boulder BuffCard</button><div class="divider">or choose another method</div>'
    : state.community.includes('Northern Arizona')
      ? '<button class="button button-primary" data-payment="NAU Dining Dollars" type="button">NAU Dining Dollars</button><div class="divider">or choose another method</div>'
      : '';
  return `<div class="screen payment-screen ${showStepper ? '' : 'payment-screen-simple'}">${statusBar()}${showStepper ? progressHeader(4) : backHeader()}
    <section class="card"><h2>Great news!<br>USEFULL is free to use.</h2><p class="lead">We do require a card on file for late and lost fees. Add a payment method to get started!</p>
      <div class="payment-stack">
        ${communityPayment}
        <button class="button button-soft" data-payment="Credit Card" type="button">Credit card</button>
        <button class="button button-apple" data-payment="Apple Pay" type="button"><span class="method-icon">${appleIcon()}</span>Apple Pay</button>
        <button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button>
      </div>
    </section></div>`;
}

function renderConfirm() {
  const showStepper = state.askAffiliationDetails && !isCU();
  return `<div class="screen ${showStepper ? '' : 'confirm-screen-simple'}">${statusBar()}${showStepper ? progressHeader(4) : backHeader()}
    <section class="card confirm-card"><h2>Confirm your payment method</h2>
      <div class="summary"><div class="summary-row"><span>Community</span><strong>${state.community}</strong></div><div class="summary-row"><span>Payment</span><strong>${state.payment}</strong></div></div>
      <div class="button-row"><button class="button button-muted" data-action="back" type="button"><span class="arrow">‹</span> Back</button><button class="button button-primary" data-action="finish-payment" type="button">Confirm <span class="arrow">›</span></button></div>
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

function renderWalletAddButton() {
  if (state.passAdded) {
    return `<div class="wallet-added-chip" role="status"><i class="ph ph-check-circle" aria-hidden="true"></i><span>Added to ${walletName()}</span></div>`;
  }
  if (state.walletPlatform === 'google') {
    return `<button class="wallet-add-button google-wallet-add" data-action="wallet-open" type="button"><span class="google-wallet-mark" aria-hidden="true">G</span><span class="wallet-add-label"><small>Add to</small><strong>Google Wallet</strong></span></button>`;
  }
  return `<button class="wallet-add-button" data-action="wallet-open" type="button"><span class="wallet-add-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="wallet-add-label"><small>Add to</small><strong>Apple Wallet</strong></span></button>`;
}

function renderWalletOnboarding() {
  const availableAction = state.walletAvailable ? renderWalletAddButton() : '';
  const nextButton = state.passAdded
    ? '<button class="button button-primary wallet-onboarding-next" data-action="wallet-onboarding-complete" type="button">Continue</button>'
    : '<button class="button button-muted wallet-onboarding-next" data-action="wallet-onboarding-complete" type="button">Skip</button>';
  return `<div class="screen wallet-onboarding-screen">${statusBar()}${backHeader()}
    <main class="card wallet-onboarding-card">
      <h2>Add your USEFULL Pass</h2>
      <p class="wallet-onboarding-lead">Use the USEFULL QR Code in your ${walletName()} to check out.</p>
      <div class="wallet-onboarding-pass">${renderWalletPass()}</div>
      <div class="wallet-onboarding-actions">${availableAction}${nextButton}</div>
    </main>
  </div>`;
}

function renderHome() {
  return `<div class="screen home-screen">${statusBar()}<div class="home-scroll"><header class="home-logo">${logo()}</header>
    <section class="home-actions">
      <img class="action-cuppy" src="branding/interface-icons/cuppy-lean.png" alt="" />
      <button class="home-action-card" data-action="checkout" type="button"><img src="branding/interface-icons/checkout-scan.png" alt="" /><strong>Checkout</strong></button>
    </section>
    <section class="impact-heading"><div><h2>Your impact</h2><p>By switching to USEFULL</p></div><button type="button">Share ${lineIcon('share')}</button></section>
    <section class="impact-grid">
      <div><img src="branding/interface-icons/Timeline_Icons_trashtruck.png" alt="" /><strong>2.8 LBS</strong><span>of trash</span></div>
      <div><img src="branding/interface-icons/ShowerWater.png" alt="" /><strong>79.6 GAL</strong><span>of water</span></div>
      <div><img src="branding/interface-icons/Timeline_Icons_globalwarming.png" alt="" /><strong>8.9 LBS</strong><span>of emissions</span></div>
    </section>
    <section class="empty-rentals"><h2>No active rentals</h2><p>As soon as you check a cup or bowl out,<br>something will be displayed here.</p></section>
    </div><nav class="home-nav"><button class="active" data-go="home" type="button">${lineIcon('home')}<span>Home</span></button><button data-action="checkout" type="button">${lineIcon('scan')}<span>Checkout</span></button><button type="button">${lineIcon('fees')}<span>Fees</span></button><button class="profile-dot" data-go="profile" type="button" aria-label="Open profile">O</button></nav></div>`;
}

function renderProfile() {
  return `<div class="screen profile-screen">${statusBar()}<div class="profile-scroll">
    <header class="profile-hero">${logo()}<p>Profile</p><h1>Owen Barron</h1><span>${escapeHTML(state.community)}</span></header>
    <section class="profile-account-card" aria-label="Account summary"><div><span>Role</span><strong>Member</strong></div><button class="button button-soft" type="button">Change community</button></section>
    <section class="profile-menu" aria-label="Profile settings">
      <button type="button"><span><strong>My community</strong><small>${escapeHTML(state.community)}</small></span><b>Open</b></button>
      <button type="button"><span><strong>Payment method</strong><small>Manage your card on file</small></span><b>Open</b></button>
      <button class="profile-notification-link" data-go="notificationManager" type="button"><span><strong>Notifications</strong><small>Push, email, and SMS preferences</small></span><b>Manage</b></button>
      <button type="button"><span><strong>Help &amp; policies</strong><small>Support, terms, and privacy</small></span><b>Open</b></button>
    </section>
    <button class="profile-logout" type="button">Log out</button><p class="profile-version">Version 3.40.0</p>
    </div><nav class="home-nav"><button data-go="home" type="button">${lineIcon('home')}<span>Home</span></button><button data-action="checkout" type="button">${lineIcon('scan')}<span>Checkout</span></button><button type="button">${lineIcon('fees')}<span>Fees</span></button><button class="profile-dot active" type="button" aria-label="Profile">O</button></nav></div>`;
}

function renderManagerContactMethods() {
  const controlsOnly = state.notificationManagerVersion === 'controls';
  const emailValue = controlsOnly ? 'owen@usefull.us' : state.managerEmail;
  const phoneValue = controlsOnly ? '(928) 555-0142' : formatPhone(state.managerPhone);
  const emailAdded = managerHasChannel('email');
  const smsAdded = managerHasChannel('sms');
  return `<section class="manager-section manager-contact-section" aria-labelledby="contact-methods-title">
    <h2 id="contact-methods-title">Channels</h2>
    <div class="manager-contact-list">
      <article><i class="ph ph-bell-ringing" aria-hidden="true"></i><div><strong>Push Notifications</strong><span>This device</span></div><b class="channel-status verified" aria-label="Push notifications ready"><i class="ph ph-check-circle" aria-hidden="true"></i></b></article>
      <article><i class="ph ph-envelope-simple" aria-hidden="true"></i><div><strong>Email</strong><span>${emailAdded ? escapeHTML(emailValue) : 'Not added'}</span></div>${emailAdded ? '<b class="channel-status verified" aria-label="Email verified"><i class="ph ph-check-circle" aria-hidden="true"></i></b>' : '<button data-action="manager-add-channel" data-channel="email" type="button"><i class="ph ph-plus" aria-hidden="true"></i>Add</button>'}</article>
      ${state.smsCampusEnabled ? `<article><i class="ph ph-chat-circle-text" aria-hidden="true"></i><div><strong>SMS</strong><span>${smsAdded ? escapeHTML(phoneValue) : 'Not added'}</span></div>${smsAdded ? '<b class="channel-status verified" aria-label="SMS verified"><i class="ph ph-check-circle" aria-hidden="true"></i></b>' : '<button data-action="manager-add-channel" data-channel="sms" type="button"><i class="ph ph-plus" aria-hidden="true"></i>Add</button>'}</article>` : ''}
    </div>
  </section>`;
}

function renderManagerEvent(event) {
  const activeCount = managerActiveCount(event.key);
  const controls = managerChannels().map(channel => {
    const available = managerHasChannel(channel);
    const isOn = managerChannelIsOn(event.key, channel);
    const isRequiredLast = isOn && activeCount === 1;
    const label = channel === 'app' ? 'Push' : channel === 'sms' ? 'SMS' : 'Email';
    const stateLabel = !available ? 'Unavailable' : isOn ? 'On' : 'Off';
    return `<button class="manager-mini-toggle ${isOn ? 'on' : 'off'} ${available ? '' : 'unavailable'}" data-manager-event="${event.key}" data-manager-channel="${channel}" type="button" aria-pressed="${isOn}" aria-label="${label} notifications for ${event.title}: ${stateLabel}" ${!available || isRequiredLast ? 'disabled' : ''}><span class="manager-switch-track" aria-hidden="true"><span></span></span></button>`;
  }).join('');
  const compactTitle = { checkout: 'Checkout', return: 'Return', due: 'Due today', fees: 'Late fees' }[event.key];
  return `<article class="manager-event-row"><strong>${compactTitle}</strong><div class="manager-channel-controls ${state.smsCampusEnabled ? '' : 'two-channels'}">${controls}</div></article>`;
}

function renderManagerChannelSetup() {
  if (!state.channelSetupOpen) return '';
  const isSms = state.channelSetupType === 'sms';
  const channelName = isSms ? 'mobile number' : 'email';
  if (state.channelSetupStage === 'success') {
    return `<button class="modal-backdrop manager-setup-backdrop" data-action="manager-close-channel" type="button" aria-label="Close verification"></button><section class="manager-setup-sheet manager-setup-success" role="dialog" aria-modal="true" aria-labelledby="manager-setup-title"><i class="ph ph-check-circle" aria-hidden="true"></i><h2 id="manager-setup-title">${isSms ? 'SMS' : 'Email'} added</h2><p>${isSms ? escapeHTML(formatPhone(state.managerPhone)) : escapeHTML(state.managerEmail)}</p><button class="button button-teal" data-action="manager-close-channel" type="button">Done</button></section>`;
  }
  if (state.channelSetupStage === 'otp') {
    return `<button class="modal-backdrop manager-setup-backdrop" data-action="manager-close-channel" type="button" aria-label="Close verification"></button><section class="manager-setup-sheet" role="dialog" aria-modal="true" aria-labelledby="manager-setup-title"><h2 id="manager-setup-title">Verify ${isSms ? 'SMS' : 'email'}</h2><p>Code sent to <strong>${escapeHTML(isSms ? formatPhone(state.channelSetupContact) : state.channelSetupContact)}</strong>.</p><label class="field-label" for="manager-channel-otp">6-digit code</label><input class="text-input manager-otp-input ${state.channelSetupError ? 'input-error' : ''}" id="manager-channel-otp" inputmode="numeric" maxlength="6" value="${escapeHTML(state.channelSetupOtp)}" autocomplete="one-time-code" placeholder="000000" /><p class="manager-setup-message" aria-live="polite">${escapeHTML(state.channelSetupMessage)}</p><p class="manager-setup-error" role="alert">${escapeHTML(state.channelSetupError)}</p><button class="button button-primary" data-action="manager-verify-channel" type="button">Verify</button><button class="manager-sheet-secondary" data-action="manager-resend-channel" type="button">Send a new code</button></section>`;
  }
  return `<button class="modal-backdrop manager-setup-backdrop" data-action="manager-close-channel" type="button" aria-label="Close setup"></button><section class="manager-setup-sheet" role="dialog" aria-modal="true" aria-labelledby="manager-setup-title"><h2 id="manager-setup-title">Add ${channelName}</h2><p>We’ll send a verification code.</p><label class="field-label" for="manager-channel-contact">${isSms ? 'Mobile number' : 'Email address'}</label><input class="text-input ${state.channelSetupError ? 'input-error' : ''}" id="manager-channel-contact" type="${isSms ? 'tel' : 'email'}" inputmode="${isSms ? 'tel' : 'email'}" value="${escapeHTML(isSms ? formatPhone(state.channelSetupContact) : state.channelSetupContact)}" autocomplete="${isSms ? 'tel' : 'email'}" placeholder="${isSms ? '(303) 555-0123' : 'name@example.com'}" /><p class="manager-setup-error" role="alert">${escapeHTML(state.channelSetupError)}</p><button class="button button-primary" data-action="manager-send-channel-code" type="button">Send code</button>${isSms ? '<p class="manager-sms-legal">Transactional texts only. Message and data rates may apply. Reply STOP to opt out.</p>' : ''}<button class="manager-sheet-secondary" data-action="manager-close-channel" type="button">Cancel</button></section>`;
}

function renderNotificationManager() {
  const canSave = state.managerDirty && managerAllRequiredCovered();
  const channelHeaders = managerChannels().map(channel => `<span><i class="ph ${channel === 'app' ? 'ph-bell-ringing' : channel === 'email' ? 'ph-envelope-simple' : 'ph-chat-circle-text'}" aria-hidden="true"></i><small>${channel === 'app' ? 'Push' : channel === 'sms' ? 'SMS' : 'Email'}</small></span>`).join('');
  return `<div class="screen notification-manager-screen">${statusBar()}<header class="manager-header"><button class="manager-back" data-action="back" type="button"><i class="ph ph-caret-left" aria-hidden="true"></i>Back</button><h1>Notifications</h1>${logo(true)}</header><div class="manager-scroll">
    ${renderManagerContactMethods()}
    <section class="manager-section manager-events-section" aria-labelledby="alert-preferences-title"><h2 id="alert-preferences-title">Alerts</h2><div class="manager-channel-heading ${state.smsCampusEnabled ? '' : 'two-channels'}"><span></span>${channelHeaders}</div><div class="manager-event-list">${managerEvents.map(renderManagerEvent).join('')}</div></section>
    <button class="button button-primary manager-save" data-action="manager-save" type="button" ${canSave ? '' : 'disabled'}>${state.managerSaved && !state.managerDirty ? 'Changes saved' : 'Save changes'}</button>
    </div>${state.managerNotice ? `<div class="manager-toast" role="status">${escapeHTML(state.managerNotice)}</div>` : ''}${renderManagerChannelSetup()}</div>`;
}

function renderSettings() {
  if (state.testerHidden) return '';
  return `<button class="tester-button" data-action="open-settings" type="button" aria-label="Open prototype settings" title="Prototype settings">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>
      <span>${state.testUserType === 'new' ? 'NEW' : 'RETURNING'}</span>
    </button>
    ${state.settingsOpen ? `<button class="modal-backdrop settings-backdrop" data-action="close-settings" type="button" aria-label="Close prototype settings"></button>
      <aside class="tester-panel" aria-label="Prototype settings"><div class="tester-panel-header"><div><span>Test mode</span><strong>Flow scenarios</strong></div><button class="panel-close" data-action="close-settings" type="button" aria-label="Close settings">×</button></div>
        <section class="notification-test-settings"><span>Notification manager</span><div class="test-toggle" role="group" aria-label="Notification manager version"><button class="${state.notificationManagerVersion === 'controls' ? 'selected' : ''}" data-manager-version="controls" type="button"><strong>Version 1</strong><span>Control existing channels</span></button><button class="${state.notificationManagerVersion === 'channels' ? 'selected' : ''}" data-manager-version="channels" type="button"><strong>Version 2</strong><span>Add and verify channels</span></button></div>${state.notificationManagerVersion === 'channels' ? `<span class="tester-sub-label">Starts with</span><div class="test-toggle manager-existing-toggle" role="group" aria-label="Existing notification channel"><button class="${state.managerExistingChannel === 'email' ? 'selected' : ''}" data-manager-existing="email" type="button"><strong>Email</strong><span>Add SMS</span></button><button class="${state.managerExistingChannel === 'sms' ? 'selected' : ''}" data-manager-existing="sms" type="button"><strong>SMS</strong><span>Add email</span></button></div>` : ''}<button class="button button-teal tester-launch" data-action="preview-profile" type="button">Open profile</button></section>
        <section class="notification-test-settings"><span>USEFULL QR &amp; Wallet</span>
          <button class="scenario-toggle ${state.promoteWalletOverInAppQr ? 'selected' : ''}" data-test-flag="promoteWalletOverInAppQr" type="button" role="checkbox" aria-checked="${state.promoteWalletOverInAppQr}"><span class="scenario-check">${state.promoteWalletOverInAppQr ? '✓' : ''}</span><span><strong>Promote Apple Wallet over In-App QR</strong><small>On makes Wallet the primary checkout method and adds the first-use prompt.</small></span></button>
          <span class="tester-sub-label">Device wallet</span><div class="test-toggle wallet-platform-toggle" role="group" aria-label="Device wallet platform"><button class="${state.walletPlatform === 'apple' ? 'selected' : ''}" data-wallet-platform="apple" type="button"><strong>Apple</strong><span>iPhone experience</span></button><button class="${state.walletPlatform === 'google' ? 'selected' : ''}" data-wallet-platform="google" type="button"><strong>Google</strong><span>Android experience</span></button></div>
          ${state.promoteWalletOverInAppQr ? '' : `<span class="tester-sub-label">Legacy QR copy</span><div class="test-toggle" role="group" aria-label="QR instruction copy"><button class="${state.qrCopyVariant === 'scanner' ? 'selected' : ''}" data-qr-variant="scanner" type="button"><strong>Scanner-first</strong><span>“Put your phone face down over the scanner”</span></button><button class="${state.qrCopyVariant === 'cashier' ? 'selected' : ''}" data-qr-variant="cashier" type="button"><strong>Cashier-first</strong><span>“When directed by the cashier”</span></button></div>`}
          <div class="scenario-toggles">
            <button class="scenario-toggle ${state.walletAvailable ? 'selected' : ''}" data-test-flag="walletAvailable" type="button" role="checkbox" aria-checked="${state.walletAvailable}"><span class="scenario-check">${state.walletAvailable ? '✓' : ''}</span><span><strong>${walletName()} available</strong><small>Off simulates an older or unsupported phone.</small></span></button>
            <button class="scenario-toggle ${state.passAdded ? 'selected' : ''}" data-test-flag="passAdded" type="button" role="checkbox" aria-checked="${state.passAdded}"><span class="scenario-check">${state.passAdded ? '✓' : ''}</span><span><strong>Pass already added</strong><small>Show the post-add state.</small></span></button>
          </div>
          <button class="button button-teal tester-launch" data-action="preview-qr" type="button">Open My USEFULL QR</button></section>
        <div class="test-toggle" role="group" aria-label="SMS user type">
          <button class="${state.testUserType === 'new' ? 'selected' : ''}" data-test-user="new" type="button"><strong>New user</strong><span>OTP → consent → profile</span></button>
          <button class="${state.testUserType === 'returning' ? 'selected' : ''}" data-test-user="returning" type="button"><strong>Returning</strong><span>OTP → signed in</span></button>
        </div>
        <div class="scenario-toggles" aria-label="Authentication scenarios">
          <button class="scenario-toggle ${state.guidedSignup ? 'selected' : ''}" data-test-flag="guidedSignup" type="button" role="checkbox" aria-checked="${state.guidedSignup}"><span class="scenario-check">${state.guidedSignup ? '✓' : ''}</span><span><strong>Guided Signup</strong><small>Recommend Buff OneCard or bank-card sign-up paths.</small></span></button>
          <button class="scenario-toggle ${state.askAffiliationDetails ? 'selected' : ''}" data-test-flag="askAffiliationDetails" type="button" role="checkbox" aria-checked="${state.askAffiliationDetails}"><span class="scenario-check">${state.askAffiliationDetails ? '✓' : ''}</span><span><strong>Ask affiliation &amp; graduation year</strong><small>Restore the original stepper and profile questions.</small></span></button>
          <button class="scenario-toggle ${state.returningPhoneExists ? 'selected' : ''}" data-test-flag="returningPhoneExists" type="button" role="checkbox" aria-checked="${state.returningPhoneExists}"><span class="scenario-check">${state.returningPhoneExists ? '✓' : ''}</span><span><strong>Phone number exists for returning login</strong><small>Off shows “Phone number not found.”</small></span></button>
          <button class="scenario-toggle ${state.otpEntryCorrect ? 'selected' : ''}" data-test-flag="otpEntryCorrect" type="button" role="checkbox" aria-checked="${state.otpEntryCorrect}"><span class="scenario-check">${state.otpEntryCorrect ? '✓' : ''}</span><span><strong>OTP entry correct</strong><small>Applies to returning and new-user OTP screens.</small></span></button>
          <button class="scenario-toggle ${state.allowEmailNotifications ? 'selected' : ''}" data-test-flag="allowEmailNotifications" type="button" role="checkbox" aria-checked="${state.allowEmailNotifications}"><span class="scenario-check">${state.allowEmailNotifications ? '✓' : ''}</span><span><strong>Allow Email Notifications</strong><small>Off uses the existing SMS-only consent screen.</small></span></button>
          <button class="scenario-toggle ${state.smsCampusEnabled ? 'selected' : ''}" data-test-flag="smsCampusEnabled" type="button" role="checkbox" aria-checked="${state.smsCampusEnabled}"><span class="scenario-check">${state.smsCampusEnabled ? '✓' : ''}</span><span><strong>SMS-enabled campus</strong><small>Off hides SMS from the notification manager.</small></span></button>
        </div><p>Enter any 10-digit phone number and any 6-digit code while its scenario is enabled.</p>
      </aside>` : ''}`;
}

function renderConsent() {
  if (!state.consentOpen) return '';
  if (state.notificationContext !== 'signup') return renderNotificationSettings();
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

function renderNotificationSettings() {
  const fromSso = state.notificationContext === 'cu-sso';
  const emailValid = !state.notificationEmailSelected || isValidEmail(state.notificationEmail);
  const phoneDigits = state.notificationPhone.replace(/\D/g, '');
  const phoneValid = !state.notificationPhoneSelected || phoneDigits.length === 10;
  const canSave = canSaveNotificationSettings();
  const emailOption = `<section class="notification-option ${state.notificationEmailSelected ? 'selected' : ''}">
    <div class="notification-option-header">${fromSso
      ? '<span class="channel-checkbox checked locked-channel" aria-hidden="true">✓</span>'
      : `<button class="channel-checkbox ${state.notificationEmailSelected ? 'checked' : ''}" data-notification-channel="email" type="button" role="checkbox" aria-checked="${state.notificationEmailSelected}" aria-label="Receive email notifications">${state.notificationEmailSelected ? '✓' : ''}</button>`}<strong>Email notifications</strong></div>
    <input class="text-input notification-email-input ${state.notificationEmailSelected && !emailValid ? 'input-error' : ''}" id="notification-email" type="email" value="${escapeHTML(state.notificationEmail)}" placeholder="Email address" autocomplete="email" ${state.notificationEmailSelected ? '' : 'disabled'} />
    <p>Get checkout, return, and account updates by email. You can change this later.</p>
    <span class="notification-email-error">${state.notificationEmailSelected && !emailValid ? 'Enter a valid email address' : ''}</span>
  </section>`;
  const smsOption = fromSso
    ? `<section class="notification-option ${state.notificationPhoneSelected ? 'selected' : ''}">
        <div class="notification-option-header"><button class="channel-checkbox ${state.notificationPhoneSelected ? 'checked' : ''}" data-notification-channel="phone" type="button" role="checkbox" aria-checked="${state.notificationPhoneSelected}" aria-label="Add SMS notifications">${state.notificationPhoneSelected ? '✓' : ''}</button><strong>SMS notifications</strong></div>
        <input class="text-input notification-phone-input ${state.notificationPhoneSelected && !phoneValid ? 'input-error' : ''}" id="notification-phone" type="tel" inputmode="tel" value="${escapeHTML(formatPhone(state.notificationPhone))}" placeholder="(303) 555-0123" autocomplete="tel" ${state.notificationPhoneSelected ? '' : 'disabled'} />
        <p>Add a mobile number for rental and account updates.</p>
        <span class="notification-phone-error">${state.notificationPhoneSelected && !phoneValid ? 'Enter a 10-digit mobile number' : ''}</span>
      </section>`
    : `<section class="notification-option selected">
        <div class="notification-option-header"><span class="channel-checkbox checked locked-channel" aria-hidden="true">✓</span><div><strong>SMS notifications</strong><span class="locked-contact">${escapeHTML(formatPhone(state.phone))}</span></div></div>
        <p>Rental and account updates will continue at this verified number.</p>
      </section>`;
  return `<div class="modal-backdrop consent-backdrop"></div><section class="consent-modal consent-modal-with-email notification-settings-modal" role="dialog" aria-modal="true" aria-labelledby="consent-title">
    <h2 id="consent-title">Notification Settings</h2>
    <p>${fromSso ? 'Confirm your email and optionally add a mobile number.' : 'Your mobile number is verified. Add email notifications if you’d like.'}</p>
    <div class="notification-options">${emailOption}${smsOption}</div>
    ${canSave ? '' : '<p class="consent-validation">Check the highlighted contact information.</p>'}
    <button class="button button-primary" data-action="consent-continue" type="button" ${canSave ? '' : 'disabled'}>Save and continue</button>
    <button class="button button-outline consent-cancel" data-action="cancel-consent" type="button">Skip for now</button>
  </section>`;
}

function qrSvg(scale = 1, seed = 20250815, withLogo = true) {
  const size = 25;
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  const inFinder = (x, y) => (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  const inFinderMargin = (x, y) => (x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8);
  const inLogo = (x, y) => x >= 10 && x <= 14 && y >= 10 && y <= 14;
  const modules = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (inFinderMargin(x, y) || (withLogo && inLogo(x, y))) continue;
      if (rand() > 0.52) modules.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
    }
  }
  const finder = (fx, fy) => `<path d="M${fx} ${fy}h7v7h-7z" fill="none" stroke="currentColor" stroke-width="1"/><rect x="${fx + 2}" y="${fy + 2}" width="3" height="3"/>`;
  return `<svg class="qr-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="Your USEFULL QR code" style="--qr-scale:${scale}">
    <g fill="currentColor" shape-rendering="crispEdges">${modules.join('')}${finder(0, 0)}${finder(size - 7, 0)}${finder(0, size - 7)}</g>
    ${withLogo ? '<image href="branding/USEFULL-icons/USEFULL-Icon-Registered_Color.svg" x="10.1" y="10.9" width="4.8" height="3.4" preserveAspectRatio="xMidYMid meet"/>' : ''}
  </svg>`;
}

function renderWalletPass() {
  return `<article class="wallet-pass" aria-label="USEFULL Wallet pass preview">
    <header class="wallet-pass-head"><img src="branding/USEFULL-icons/USEFULL-Logo-Registered_KnockOut.svg" alt="USEFULL" /></header>
    <div class="wallet-pass-strip"><img src="images/outdoor-containers.png" alt="" /></div>
    <div class="wallet-pass-field"><span>Reusing since</span><strong>${escapeHTML(state.reusingSince)}</strong></div>
    <div class="wallet-pass-qr">${qrSvg(1, 90210, false)}</div>
  </article>`;
}

const qrCopy = {
  scanner: {
    lead: 'Put your phone face down over the scanner to check out.',
    added: 'It’s in Apple Wallet too — use whichever is faster.'
  },
  cashier: {
    lead: 'When directed by the cashier, show this code to complete your USEFULL checkout.',
    added: 'It’s in Apple Wallet too — show either one.'
  }
};

function renderQrSheet() {
  if (!state.qrSheetOpen) return '';
  if (state.promoteWalletOverInAppQr) {
    const showQr = state.qrFallbackVisible || !state.walletAvailable;
    if (showQr) {
      return `<div class="modal-backdrop qr-backdrop"></div>
        <section class="qr-modal wallet-qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
          <button class="qr-close" data-action="qr-close" type="button" aria-label="Close">×</button>
          <h2 id="qr-title">My USEFULL QR</h2>
          <p class="wallet-qr-lead"><strong>No ${walletName()}?</strong> <span>Use this QR code at checkout.</span></p>
          <div class="qr-frame">${qrSvg(1, 20250815)}</div>
          ${state.walletAvailable ? `<button class="wallet-fallback-link wallet-return-link" data-action="use-wallet-instead" type="button">Use ${walletName()} instead</button>` : ''}
        </section>`;
    }
    const availableAction = renderWalletAddButton();
    return `<div class="modal-backdrop qr-backdrop"></div>
      <section class="qr-modal wallet-first-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
        <button class="qr-close" data-action="qr-close" type="button" aria-label="Close">×</button>
        <h2 id="qr-title">My USEFULL QR</h2>
        <div class="checkout-wallet-copy">
          <p>Add your USEFULL QR code to ${walletName()}.</p>
          <p>Then pull up your pass to check out!</p>
        </div>
        <div class="wallet-first-action">${availableAction}</div>
        <button class="wallet-fallback-link" data-action="show-qr-fallback" type="button">I don’t have ${walletName()}</button>
      </section>`;
  }
  const copy = qrCopy[state.qrCopyVariant] || qrCopy.scanner;
  const walletRow = !state.walletAvailable
    ? ''
    : state.passAdded
      ? `<div class="wallet-added-chip" role="status"><i class="ph ph-check-circle" aria-hidden="true"></i><span>Added to Apple Wallet</span></div>`
      : `<button class="wallet-add-button" data-action="wallet-open" type="button"><span class="wallet-add-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="wallet-add-label"><small>Add to</small><strong>Apple Wallet</strong></span></button>`;
  return `<div class="modal-backdrop qr-backdrop"></div>
    <section class="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
      <button class="qr-close" data-action="qr-close" type="button" aria-label="Close">×</button>
      <h2 id="qr-title">My USEFULL QR</h2>
      <p class="qr-lead">${copy.lead}${state.passAdded && state.walletAvailable ? ` <span class="qr-lead-added">${copy.added}</span>` : ''}</p>
      <div class="qr-frame">${qrSvg(1, 20250815)}</div>
      ${walletRow}
    </section>`;
}

function renderWalletFlow() {
  if (!state.walletStage) return '';
  return `<div class="modal-backdrop wallet-backdrop"></div>
    <section class="wallet-sheet ${state.walletPlatform === 'google' ? 'google-wallet-sheet' : ''}" role="dialog" aria-modal="true" aria-labelledby="wallet-sheet-title">
      <header class="wallet-sheet-bar">
        <button data-action="wallet-cancel" type="button">Cancel</button>
        <strong id="wallet-sheet-title">${state.walletPlatform === 'google' ? 'Save to Google Wallet' : 'Add Pass'}</strong>
        <button class="wallet-sheet-add" data-action="wallet-confirm" type="button">${state.walletPlatform === 'google' ? 'Save' : 'Add'}</button>
      </header>
      <div class="wallet-sheet-body">${renderWalletPass()}</div>
    </section>`;
}

function renderWalletView() {
  if (!state.walletViewOpen) return '';
  const otherCards = ['card-a', 'card-b', 'card-c'].map(cls => `<div class="wv-card ${cls}"><span></span></div>`).join('');
  return `<section class="wallet-view ${state.walletPlatform === 'google' ? 'google-wallet-view' : ''}" role="dialog" aria-modal="true" aria-label="${walletName()}">
    <div class="wv-status" aria-hidden="true"><span>4:10</span><span class="wv-status-icons"><i class="ph ph-cell-signal-full"></i><i class="ph ph-wifi-high"></i><i class="ph ph-battery-high"></i></span></div>
    <header class="wv-nav">
      <button class="wv-back" data-action="wallet-view-close" type="button" aria-label="Back to USEFULL">‹</button>
      <span class="wv-more" aria-hidden="true">•••</span>
    </header>
    <div class="wv-pass">${renderWalletPass()}</div>
    <div class="wv-stack" aria-hidden="true">${otherCards}</div>
    <p class="wv-hint">Simulated ${walletName()} — tap ‹ to return to the USEFULL app</p>
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
    cuAccountCheck: renderCuAccountCheck,
    cuCheckoutMethod: renderCuCheckoutMethod,
    cuSso: renderCuSso,
    accountFinder: renderAccountFinder,
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
    walletOnboarding: renderWalletOnboarding,
    home: renderHome,
    profile: renderProfile,
    notificationManager: renderNotificationManager
  };
  app.innerHTML = views[state.screen]() + renderSettings() + renderConsent() + renderQrSheet() + renderWalletFlow() + renderWalletView();
}

function renderAndFocus(selector) {
  render();
  requestAnimationFrame(() => app.querySelector(selector)?.focus());
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
  if (target.dataset.managerVersion) {
    state.notificationManagerVersion = target.dataset.managerVersion;
    if (state.notificationManagerVersion === 'channels') setManagerExistingChannel(state.managerExistingChannel);
    state.managerDirty = false;
    state.managerSaved = false;
    state.managerNotice = '';
    state.notificationPreferences = freshNotificationPreferences();
    return render();
  }
  if (target.dataset.managerExisting) {
    setManagerExistingChannel(target.dataset.managerExisting);
    state.managerDirty = false;
    state.managerSaved = false;
    state.managerNotice = '';
    state.notificationPreferences = freshNotificationPreferences();
    return render();
  }
  if (target.dataset.managerEvent && target.dataset.managerChannel) {
    const eventKey = target.dataset.managerEvent;
    const channel = target.dataset.managerChannel;
    if (!managerHasChannel(channel)) return;
    const isOn = managerChannelIsOn(eventKey, channel);
    if (isOn && managerActiveCount(eventKey) === 1) {
      return;
    }
    state.notificationPreferences[eventKey][channel] = !isOn;
    state.managerDirty = true;
    state.managerSaved = false;
    state.managerNotice = '';
    return render();
  }
  if (target.dataset.qrVariant) { state.qrCopyVariant = target.dataset.qrVariant; return render(); }
  if (target.dataset.walletPlatform) {
    state.walletPlatform = target.dataset.walletPlatform;
    state.qrFallbackVisible = false;
    return render();
  }
  if (target.dataset.testUser) { state.testUserType = target.dataset.testUser; return render(); }
  if (target.dataset.testFlag) {
    state[target.dataset.testFlag] = !state[target.dataset.testFlag];
    if (target.dataset.testFlag === 'walletAvailable') state.qrFallbackVisible = !state.walletAvailable;
    if (target.dataset.testFlag === 'promoteWalletOverInAppQr') state.qrFallbackVisible = false;
    if (target.dataset.testFlag === 'smsCampusEnabled' && !state.smsCampusEnabled && state.notificationManagerVersion === 'channels' && !state.managerEmailAdded) setManagerExistingChannel('email');
    return render();
  }
  if (target.dataset.notificationChannel) {
    preserveFormDrafts();
    if (target.dataset.notificationChannel === 'sms') state.notificationSmsSelected = !state.notificationSmsSelected;
    if (target.dataset.notificationChannel === 'email') state.notificationEmailSelected = !state.notificationEmailSelected;
    if (target.dataset.notificationChannel === 'phone') state.notificationPhoneSelected = !state.notificationPhoneSelected;
    return render();
  }
  if (target.dataset.method) {
    if (!state.acceptedTerms) {
      const box = app.querySelector('.checkbox');
      box?.animate([{transform:'translateX(-3px)'},{transform:'translateX(3px)'},{transform:'translateX(0)'}], {duration:180});
      return;
    }
    if (target.dataset.method === 'email') { state.authMode = 'signup'; return go('email'); }
    if (target.dataset.method === 'sms') { state.authMode = 'signup'; state.testUserType = 'new'; return go('sms'); }
    if (target.dataset.method === 'nau') return go('nau');
    if (target.dataset.method === 'cu') {
      state.name = state.name || 'Ralphie';
      if (isCU() && state.guidedSignup) {
        state.returningSource = 'guided-buff-signup';
        state.authMode = 'signup';
        state.testUserType = 'new';
        return go('cuSso');
      }
      return continueAfterIdentity();
    }
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
    case 'begin-onboarding':
      state.returningSource = '';
      return go(isCU() ? 'cuAccountCheck' : 'method');
    case 'cu-checked-out': return go('cuCheckoutMethod');
    case 'cu-first-time':
      state.authMode = 'signup';
      state.testUserType = 'new';
      state.returningSource = '';
      return go('method');
    case 'cu-unsure':
      state.accountLookupEmail = '';
      state.accountLookupPhone = '';
      state.accountLookupResult = '';
      state.returningSource = '';
      return go('accountFinder');
    case 'search-account': {
      const email = document.querySelector('#account-lookup-email');
      const phone = document.querySelector('#account-lookup-phone');
      const error = document.querySelector('#account-lookup-error');
      const emailValue = email.value.trim();
      const phoneDigits = phone.value.replace(/\D/g, '');
      email.classList.remove('input-error');
      phone.classList.remove('input-error');
      if (emailValue && !isValidEmail(emailValue)) { email.classList.add('input-error'); error.textContent = 'Enter a valid email address, or leave it blank to search by phone.'; email.focus(); return; }
      if (!emailValue && phoneDigits.length !== 10) { phone.classList.add('input-error'); error.textContent = 'Enter a valid email address or 10-digit mobile number.'; phone.focus(); return; }
      state.accountLookupEmail = emailValue;
      state.accountLookupPhone = phoneDigits;
      state.accountLookupResult = emailValue ? 'email' : 'phone';
      return render();
    }
    case 'close-account-result': state.accountLookupResult = ''; return render();
    case 'account-found-email':
      state.returningSource = 'account-search-email';
      state.authMode = 'returning';
      return go('cuSso');
    case 'account-found-phone':
      state.phone = state.accountLookupPhone;
      state.otp = '';
      state.authMode = 'returning';
      state.returningSource = 'account-search-phone';
      return go('otp');
    case 'cu-used-buff-card':
      state.authMode = 'returning';
      state.returningSource = 'cu-buff-card';
      return go('cuSso');
    case 'cu-used-bank-card':
      state.authMode = 'returning';
      state.returningSource = 'cu-bank-card';
      return go('returningSms');
    case 'cu-sso-signin':
      if (state.returningSource === 'guided-buff-signup') {
        state.testUserType = 'new';
        state.email = 'bsmith@boulder.edu';
        return continueAfterIdentity();
      }
      state.testUserType = 'returning';
      state.name = state.name || 'Ralphie';
      state.notificationContext = 'cu-sso';
      state.notificationEmailSelected = true;
      state.notificationEmail = 'bsmith@boulder.edu';
      state.notificationPhoneSelected = false;
      state.notificationPhone = '';
      state.consentOpen = true;
      return render();
    case 'returning-login': state.authMode = 'returning'; return go('returningLogin');
    case 'returning-email': state.authMode = 'returning'; state.returningSource = ''; return go('returningLogin');
    case 'returning-sms': state.authMode = 'returning'; state.returningSource = ''; return go('returningSms');
    case 'returning-social': state.testUserType = 'returning'; state.name = state.name || 'Returning member'; return enterHomeAfterFirstUse();
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
      return enterHomeAfterFirstUse();
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
    case 'preview-profile': state.settingsOpen = false; return go('profile');
    case 'preview-qr':
      state.settingsOpen = false;
      state.qrSheetOpen = true;
      state.qrFallbackVisible = !state.walletAvailable;
      if (state.screen !== 'home') return go('home');
      return render();
    case 'manager-add-channel':
      if (target.dataset.channel === 'sms' && !state.smsCampusEnabled) return;
      Object.assign(state, { channelSetupOpen: true, channelSetupStage: 'contact', channelSetupType: target.dataset.channel, channelSetupContact: '', channelSetupOtp: '', channelSetupError: '', channelSetupMessage: '', managerNotice: '' });
      return renderAndFocus('#manager-channel-contact');
    case 'manager-close-channel':
      Object.assign(state, { channelSetupOpen: false, channelSetupStage: 'contact', channelSetupType: '', channelSetupContact: '', channelSetupOtp: '', channelSetupError: '', channelSetupMessage: '' });
      return render();
    case 'manager-send-channel-code': {
      const input = document.querySelector('#manager-channel-contact');
      const rawValue = input?.value.trim() || '';
      const isSms = state.channelSetupType === 'sms';
      const normalized = isSms ? rawValue.replace(/\D/g, '') : rawValue;
      const valid = isSms ? normalized.length === 10 : isValidEmail(normalized);
      if (!valid) {
        state.channelSetupError = isSms ? 'Enter a valid 10-digit mobile number.' : 'Enter a valid email address.';
        return renderAndFocus('#manager-channel-contact');
      }
      state.channelSetupContact = normalized;
      state.channelSetupOtp = '';
      state.channelSetupError = '';
      state.channelSetupMessage = '';
      state.channelSetupStage = 'otp';
      return renderAndFocus('#manager-channel-otp');
    }
    case 'manager-verify-channel': {
      const input = document.querySelector('#manager-channel-otp');
      const digits = (input?.value || '').replace(/\D/g, '');
      if (digits.length !== 6) {
        state.channelSetupError = 'Enter the complete 6-digit code.';
        return renderAndFocus('#manager-channel-otp');
      }
      if (!state.otpEntryCorrect) {
        state.channelSetupError = 'That code is incorrect. Try again.';
        return renderAndFocus('#manager-channel-otp');
      }
      state.channelSetupOtp = digits;
      if (state.channelSetupType === 'sms') {
        state.managerSmsAdded = true;
        state.managerPhone = state.channelSetupContact;
      } else {
        state.managerEmailAdded = true;
        state.managerEmail = state.channelSetupContact;
      }
      managerEvents.forEach(item => { state.notificationPreferences[item.key][state.channelSetupType] = true; });
      state.managerDirty = true;
      state.managerSaved = false;
      state.channelSetupError = '';
      state.channelSetupMessage = '';
      state.channelSetupStage = 'success';
      return render();
    }
    case 'manager-resend-channel':
      state.channelSetupError = '';
      state.channelSetupMessage = `A new code was sent to ${state.channelSetupType === 'sms' ? formatPhone(state.channelSetupContact) : state.channelSetupContact}.`;
      return renderAndFocus('#manager-channel-otp');
    case 'manager-save':
      if (!managerAllRequiredCovered()) return;
      state.managerDirty = false;
      state.managerSaved = true;
      state.managerNotice = 'Notification preferences saved.';
      return render();
    case 'close-sheet': state.sheet = null; return render();
    case 'terms': state.acceptedTerms = !state.acceptedTerms; return render();
    case 'terms-link': return;
    case 'nau-signin': state.name = state.name || 'Louie'; return continueAfterIdentity();
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
      if (state.authMode === 'returning') {
        state.testUserType = 'returning';
        state.name = state.name || 'Returning member';
        if (state.returningSource === 'cu-bank-card') {
          state.notificationContext = 'cu-bank-card';
          state.notificationSmsSelected = true;
          state.notificationEmailSelected = false;
          state.notificationEmail = '';
          state.consentOpen = true;
          return render();
        }
        return enterHomeAfterFirstUse();
      }
      if (state.testUserType === 'returning') { state.name = state.name || 'Returning member'; return enterHomeAfterFirstUse(); }
      state.transactionalAccepted = false;
      state.notificationContext = 'signup';
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
    case 'cancel-consent':
      state.consentOpen = false;
      state.transactionalAccepted = false;
      return state.notificationContext === 'signup' ? render() : enterHomeAfterFirstUse();
    case 'consent-continue':
      preserveFormDrafts();
      if (state.notificationContext !== 'signup') {
        if (!canSaveNotificationSettings()) return;
        state.consentOpen = false;
        return enterHomeAfterFirstUse();
      }
      if (!canContinueConsent()) return;
      state.transactionalAccepted = state.allowEmailNotifications ? state.notificationSmsSelected : true;
      state.consentOpen = false;
      return go('smsProfile');
    case 'sms-profile-continue': {
      const firstName = document.querySelector('#sms-first-name');
      const lastName = document.querySelector('#sms-last-name');
      const error = document.querySelector('#sms-profile-error');
      if (!firstName.value.trim() || !lastName.value.trim()) { error.textContent = 'Enter your first and last name to continue.'; (!firstName.value.trim() ? firstName : lastName).focus(); return; }
      state.firstName = firstName.value.trim();
      state.lastName = lastName.value.trim();
      state.name = `${state.firstName} ${state.lastName}`;
      return continueAfterIdentity();
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
      return continueAfterIdentity();
    }
    case 'finish-payment': return showFirstUseWallet('success');
    case 'wallet-onboarding-complete': {
      const nextScreen = state.walletOnboardingNext || 'home';
      state.walletPromptCompleted = true;
      state.walletOnboardingNext = 'home';
      state.qrFallbackVisible = false;
      return go(nextScreen);
    }
    case 'checkout': state.qrSheetOpen = true; state.qrFallbackVisible = !state.walletAvailable; return render();
    case 'qr-close': state.qrSheetOpen = false; state.qrFallbackVisible = false; return render();
    case 'show-qr-fallback': state.qrFallbackVisible = true; return render();
    case 'use-wallet-instead': state.qrFallbackVisible = false; return render();
    case 'wallet-open': state.walletStage = 'sheet'; return render();
    case 'wallet-cancel': state.walletStage = ''; return render();
    case 'wallet-confirm':
      state.passAdded = true;
      state.walletStage = '';
      return render();
    case 'wallet-view':
      state.walletStage = '';
      state.walletViewOpen = true;
      return render();
    case 'wallet-view-close': state.walletViewOpen = false; return render();
  }
});

app.addEventListener('input', event => {
  if (event.target.id === 'manager-channel-contact') {
    if (state.channelSetupType === 'sms') {
      state.channelSetupContact = event.target.value.replace(/\D/g, '').slice(0, 10);
      event.target.value = formatPhone(state.channelSetupContact);
    } else {
      state.channelSetupContact = event.target.value;
    }
    state.channelSetupError = '';
    state.channelSetupMessage = '';
    return;
  }
  if (event.target.id === 'manager-channel-otp') {
    state.channelSetupOtp = event.target.value.replace(/\D/g, '').slice(0, 6);
    event.target.value = state.channelSetupOtp;
    state.channelSetupError = '';
    state.channelSetupMessage = '';
    return;
  }
  if (event.target.id === 'account-lookup-phone') {
    event.target.value = formatPhone(event.target.value);
    return;
  }
  if (!['notification-email', 'notification-phone'].includes(event.target.id)) return;
  if (event.target.id === 'notification-email') state.notificationEmail = event.target.value;
  if (event.target.id === 'notification-phone') {
    state.notificationPhone = event.target.value.replace(/\D/g, '').slice(0, 10);
    event.target.value = formatPhone(state.notificationPhone);
  }
  const emailValid = isValidEmail(state.notificationEmail);
  const phoneValid = state.notificationPhone.replace(/\D/g, '').length === 10;
  const error = app.querySelector(event.target.id === 'notification-email' ? '.notification-email-error' : '.notification-phone-error');
  const validation = app.querySelector('.consent-validation');
  const submit = app.querySelector('[data-action="consent-continue"]');
  const valid = event.target.id === 'notification-email' ? emailValid : phoneValid;
  event.target.classList.toggle('input-error', !valid);
  if (error) error.textContent = valid ? '' : event.target.id === 'notification-email' ? 'Enter a valid email address' : 'Enter a 10-digit mobile number';
  const canContinue = state.notificationContext === 'signup' ? canContinueConsent() : canSaveNotificationSettings();
  if (validation) validation.textContent = canContinue ? '' : state.notificationContext === 'signup' ? 'Choose at least one valid notification method.' : 'Check the highlighted contact information.';
  if (submit) submit.disabled = !canContinue;
});

resetButton.addEventListener('click', () => {
  Object.assign(state, { screen:'community', history:[], acceptedTerms:false, email:'', name:'', firstName:'', lastName:'', password:'', phone:'', otp:'', authMode:'signup', returningEmail:'', returningPassword:'', returningSource:'', accountLookupEmail:'', accountLookupPhone:'', accountLookupResult:'', returningPhoneExists:true, otpEntryCorrect:true, allowEmailNotifications:true, notificationSmsSelected:true, notificationEmailSelected:false, notificationEmail:'', notificationPhoneSelected:false, notificationPhone:'', notificationContext:'signup', transactionalAccepted:false, consentOpen:false, settingsOpen:false, affiliation:'Student', graduationYear:'', payment:'', notificationManagerVersion:'controls', managerExistingChannel:'email', smsCampusEnabled:true, managerEmailAdded:true, managerSmsAdded:false, managerEmail:'owen@usefull.us', managerPhone:'', managerDirty:false, managerSaved:false, managerNotice:'', channelSetupOpen:false, channelSetupStage:'contact', channelSetupType:'', channelSetupContact:'', channelSetupOtp:'', channelSetupError:'', channelSetupMessage:'', qrSheetOpen:false, promoteWalletOverInAppQr:true, walletPlatform:'apple', walletPromptCompleted:false, walletOnboardingNext:'home', walletStage:'', walletViewOpen:false, passAdded:false, walletAvailable:true, qrFallbackVisible:false, qrCopyVariant:'scanner', notificationPreferences:freshNotificationPreferences(), sheet:null });
  render();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && state.walletViewOpen) { state.walletViewOpen = false; render(); return; }
  if (event.key === 'Escape' && state.walletStage) { state.walletStage = ''; render(); return; }
  if (event.key === 'Escape' && state.qrSheetOpen) { state.qrSheetOpen = false; render(); return; }
  if (event.key === 'Escape' && state.channelSetupOpen) {
    Object.assign(state, { channelSetupOpen: false, channelSetupStage: 'contact', channelSetupType: '', channelSetupContact: '', channelSetupOtp: '', channelSetupError: '', channelSetupMessage: '' });
    render();
    return;
  }
  if (event.key.toLowerCase() !== 'h' || event.metaKey || event.ctrlKey || event.altKey || event.target.matches('input, textarea')) return;
  state.testerHidden = !state.testerHidden;
  state.settingsOpen = false;
  render();
});

render();

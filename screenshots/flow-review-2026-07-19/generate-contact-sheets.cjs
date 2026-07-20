const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const groups = [
  {
    output: 'contact-sheet-1-onboarding.png',
    title: 'CU Boulder onboarding · Screens 01–09',
    files: [
      ['01-community-selection.png', '01 · Community selection'],
      ['02-cu-account-question.png', '02 · Existing-account question'],
      ['03-kiosk-payment-question.png', '03 · Kiosk payment question'],
      ['04-guided-signup.png', '04 · Guided signup'],
      ['05-sms-number-entry.png', '05 · SMS number entry'],
      ['06-verify-phone-number.png', '06 · Verify phone number'],
      ['07-allow-notifications.png', '07 · Allow notifications'],
      ['08-first-and-last-name.png', '08 · First and last name'],
      ['09-boulder-payment-method.png', '09 · Boulder payment method'],
    ],
  },
  {
    output: 'contact-sheet-2-auth-and-recovery.png',
    title: 'CU Boulder authentication and recovery · Screens 10–18',
    files: [
      ['10-confirm-boulder-buffcard.png', '10 · Confirm BuffCard'],
      ['11-welcome.png', '11 · Welcome'],
      ['12-universal-home.png', '12 · Universal home'],
      ['13-cu-boulder-sso.png', '13 · CU Boulder SSO'],
      ['14-notification-settings-buffcard.png', '14 · BuffCard notifications'],
      ['15-kiosk-account-phone.png', '15 · Kiosk account phone'],
      ['16-notification-settings-bank-card.png', '16 · Bank-card notifications'],
      ['17-account-finder.png', '17 · Account finder'],
      ['18-account-found-email.png', '18 · Account found by email'],
    ],
  },
  {
    output: 'contact-sheet-3-alternates-and-legacy.png',
    title: 'CU Boulder alternate and legacy paths · Screens 19–26',
    files: [
      ['19-account-found-phone.png', '19 · Account found by phone'],
      ['20-returning-account-login.png', '20 · Returning-account login'],
      ['21-returning-email-password.png', '21 · Returning email login'],
      ['22-classic-signup-options.png', '22 · Classic signup options'],
      ['23-email-entry.png', '23 · Email entry'],
      ['24-email-account-details.png', '24 · Email account details'],
      ['25-legacy-affiliation.png', '25 · Legacy affiliation'],
      ['26-legacy-graduation-year.png', '26 · Legacy graduation year'],
    ],
  },
];

const cellWidth = 452;
const imageWidth = 428;
const imageHeight = 868;
const labelHeight = 44;
const gap = 16;
const outer = 24;
const titleHeight = 68;
const columns = 3;
const rows = 3;
const width = outer * 2 + columns * cellWidth + (columns - 1) * gap;
const height = outer * 2 + titleHeight + rows * (labelHeight + imageHeight) + (rows - 1) * gap;

function svgText(text, width, height, size, weight = 600) {
  const escaped = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ffffff"/>
    <text x="12" y="${Math.round(height * 0.68)}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="#252629">${escaped}</text>
  </svg>`);
}

async function generate(group) {
  const composites = [{
    input: svgText(group.title, width - outer * 2, titleHeight, 26, 700),
    left: outer,
    top: outer,
  }];

  for (const [index, [file, label]] of group.files.entries()) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = outer + column * (cellWidth + gap);
    const top = outer + titleHeight + row * (labelHeight + imageHeight + gap);
    composites.push({ input: svgText(label, cellWidth, labelHeight, 17), left, top });
    composites.push({ input: path.join(root, file), left: left + 12, top: top + labelHeight });
  }

  await sharp({
    create: { width, height, channels: 4, background: '#eef1f2' },
  }).composite(composites).png().toFile(path.join(root, group.output));
}

Promise.all(groups.map(generate)).catch(error => {
  console.error(error);
  process.exitCode = 1;
});

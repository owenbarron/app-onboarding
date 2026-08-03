const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const projectRoot = path.resolve(root, '..', '..');
const width = 390;
const height = 844;
const gap = 18;
const labelHeight = 48;
const outer = 22;

function label(text, cellWidth = width) {
  const escaped = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return Buffer.from(`<svg width="${cellWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" rx="8" fill="#ffffff"/><text x="14" y="31" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#292728">${escaped}</text></svg>`);
}

async function mobileImage(file) {
  return sharp(file).resize(width, height, { fit: 'fill' }).png().toBuffer();
}

async function makeSheet(output, items) {
  const canvasWidth = outer * 2 + items.length * width + (items.length - 1) * gap;
  const canvasHeight = outer * 2 + labelHeight + height;
  const composites = [];
  for (const [index, item] of items.entries()) {
    const left = outer + index * (width + gap);
    composites.push({ input: label(item.label), left, top: outer });
    composites.push({ input: await mobileImage(item.file), left, top: outer + labelHeight });
  }
  await sharp({ create: { width: canvasWidth, height: canvasHeight, channels: 4, background: '#e9edec' } })
    .composite(composites)
    .png()
    .toFile(path.join(root, output));
}

(async () => {
  await makeSheet('comparison-notification-settings.png', [
    { label: 'Current manager', file: path.join(projectRoot, 'screenshots', 'notification-settings.png') },
    { label: 'Version 1 · Controls only', file: path.join(root, 'version-1-controls-only.png') },
    { label: 'Version 2 · Add channels', file: path.join(root, 'version-2-add-channels.png') },
  ]);
  await makeSheet('comparison-profile-entry.png', [
    { label: 'Current profile', file: path.join(projectRoot, 'screenshots', 'profile page.png') },
    { label: 'Updated profile entry', file: path.join(root, 'profile-entry.png') },
  ]);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

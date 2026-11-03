/**
 * Dynamic OpenGraph Card Generator
 * Produces crisp, branded 1200x630 vector SVG social preview cards for each article
 * using the high-energy Lime Green and Signal Orange industrial palette.
 */
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseFrontmatter } from './markdown-parser.js';
import { SITE_NAME } from './site-config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT_DIR, 'content', 'items');
const OG_DIR = resolve(ROOT_DIR, 'public', 'og');

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateSvgCard({ title, category, tagline }) {
  const safeTitle = escapeXml(title);
  const safeCategory = escapeXml((category || 'Architecture').toUpperCase());
  const safeTagline = escapeXml(tagline || '');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#131517"/>
      <stop offset="100%" stop-color="#1c1f22"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Border Accent -->
  <rect x="40" y="40" width="1120" height="550" rx="8" fill="none" stroke="#2b2f33" stroke-width="1.5"/>

  <!-- Category Badge -->
  <rect x="80" y="85" width="220" height="38" rx="4" fill="#d49867" fill-opacity="0.12" stroke="#d49867" stroke-width="1" stroke-opacity="0.4"/>
  <text x="190" y="110" fill="#d49867" font-family="Charter, Georgia, serif" font-size="16" font-style="italic" text-anchor="middle">
    ${safeCategory}
  </text>

  <!-- Main Title -->
  <text x="80" y="240" fill="#eeebe3" font-family="Charter, Georgia, serif" font-size="48" font-weight="600" letter-spacing="-0.02em">
    <tspan x="80" dy="0">${safeTitle}</tspan>
  </text>

  <!-- Tagline / Subtitle -->
  <text x="80" y="360" fill="#a8a499" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="400">
    <tspan x="80" dy="0">${safeTagline}</tspan>
  </text>

  <!-- Footer Brand -->
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#2b2f33" stroke-width="1"/>
  <text x="80" y="525" fill="#87a995" font-family="Charter, Georgia, serif" font-size="26" font-weight="600">📖 ${SITE_NAME}</text>
  <text x="1120" y="525" fill="#737066" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500" text-anchor="end" letter-spacing="0.05em">EDUCATIONAL ARCHIVE</text>
</svg>`;
}

export function generateOgCards() {
  if (!fs.existsSync(OG_DIR)) {
    fs.mkdirSync(OG_DIR, { recursive: true });
  }

  if (!fs.existsSync(CONTENT_DIR)) return;

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let count = 0;

  files.forEach(file => {
    const raw = fs.readFileSync(resolve(CONTENT_DIR, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    if (!data.id || !data.title) return;

    const svg = generateSvgCard(data);
    fs.writeFileSync(resolve(OG_DIR, `${data.id}.svg`), svg, 'utf8');
    count++;
  });

  console.log(`[OG Card Generator] Created ${count} vector social cards in public/og/.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateOgCards();
}

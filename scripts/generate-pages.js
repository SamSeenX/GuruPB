/**
 * Static Page & Collection Generator
 * Ingests Markdown files, compiles frontmatter & HTML, renders reading metrics,
 * and outputs clean folder routes (/items/<id>/index.html) plus flat compatibility aliases.
 */
import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SITE_URL } from './site-config.js';
import { parseFrontmatter, renderMarkdown, calculateReadingMetrics } from './markdown-parser.js';
import {
  getHeaderHtml,
  getFooterHtml,
  getSeoMetaHtml,
  getArticleSchema,
  getBreadcrumbSchema,
  renderSchemaTag
} from '../src/core/layout-template.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const CONTENT_DIR = resolve(ROOT_DIR, 'content', 'items');
const ITEMS_DIR = resolve(ROOT_DIR, 'items');

function loadItems() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return files.map(file => {
    const raw = fs.readFileSync(resolve(CONTENT_DIR, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    const bodyHtml = renderMarkdown(content);
    const metrics = calculateReadingMetrics(content);
    return { ...data, bodyHtml, ...metrics };
  });
}

function generateItemPage(item) {
  const canonicalPath = `/items/${item.id}/`;
  const headerHtml = getHeaderHtml(canonicalPath);
  const footerHtml = getFooterHtml();
  const ogImageUrl = `${SITE_URL}/og/${item.id}.svg`;
  const seoMetaHtml = getSeoMetaHtml({
    title: `${item.title} | Scam Guru Playbook`,
    description: item.description,
    path: canonicalPath,
    image: ogImageUrl,
    type: 'article'
  });
  const articleSchema = getArticleSchema({
    title: item.title,
    description: item.description,
    publishedDate: item.publishedDate,
    path: canonicalPath,
    wordCount: item.wordCount,
    readingTimeMinutes: item.readingTimeMinutes
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dossiers', url: '/items/' },
    { name: item.title, url: canonicalPath }
  ]);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.title} | Scam Guru Playbook</title>
  <meta name="description" content="${item.description}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/src/styles/main.css">
${seoMetaHtml}
  ${renderSchemaTag(articleSchema)}
  ${renderSchemaTag(breadcrumbsSchema)}
</head>
<body>
  ${headerHtml}
  <main class="container">
    <article class="page-header">
      <div style="display: flex; gap: 0.75rem; align-items: center; margin-bottom: 0.5rem;">
        <span class="badge" style="color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem;">${item.category}</span>
        <span style="color: var(--text-secondary); font-size: 0.85rem;">&bull;</span>
        <span style="color: var(--text-secondary); font-size: 0.85rem;">${item.readingTimeLabel}</span>
      </div>
      <h1>${item.title}</h1>
      <p style="color: var(--text-secondary); font-size: 1.1rem;">${item.tagline}</p>
    </article>
    <div class="prose">
      ${item.bodyHtml}
      <p style="margin-top: 2rem;"><a href="/items/" class="btn btn-secondary">&larr; Back to Dossiers Archive</a></p>
    </div>
  </main>
  ${footerHtml}
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
}

function generateArchivePage(items) {
  const currentPath = '/items/';
  const headerHtml = getHeaderHtml(currentPath);
  const footerHtml = getFooterHtml();
  const seoMetaHtml = getSeoMetaHtml({
    title: 'Dossiers & Funnel Deconstructions | Scam Guru Playbook',
    description: 'Investigative breakdowns and educational case studies of online course funnels and high-ticket marketing tactics.',
    path: currentPath,
    type: 'website'
  });
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Dossiers', url: currentPath }
  ]);

  const cardsHtml = items.map(item => `      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span class="badge" style="color: var(--accent); font-weight: 600; font-size: 0.8rem;">${item.category}</span>
          <span style="color: var(--text-secondary); font-size: 0.75rem;">${item.readingTimeLabel}</span>
        </div>
        <h3 style="margin-top: 0.25rem;"><a href="/items/${item.id}/">${item.title}</a></h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.5rem;">${item.tagline}</p>
        <a href="/items/${item.id}/" class="btn btn-secondary" style="margin-top: 1rem; display: inline-block;">Read Dossier &rarr;</a>
      </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dossiers & Funnel Deconstructions | Scam Guru Playbook</title>
  <meta name="description" content="Investigative breakdowns and educational case studies of online course funnels and high-ticket marketing tactics.">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/src/styles/main.css">
${seoMetaHtml}
  ${renderSchemaTag(breadcrumbsSchema)}
</head>
<body>
  ${headerHtml}
  <main class="container">
    <header class="page-header">
      <h1>Investigative Dossiers & Deconstructions</h1>
      <p style="color: var(--text-secondary);">Independent analyses tracking funnel mechanics, claims vs reality, and historical pivot cycles.</p>
    </header>
    <div class="features-grid">
${cardsHtml}
    </div>
  </main>
  ${footerHtml}
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
}

export function generatePages() {
  if (!fs.existsSync(ITEMS_DIR)) fs.mkdirSync(ITEMS_DIR, { recursive: true });
  const items = loadItems();
  items.forEach(item => {
    const html = generateItemPage(item);
    const itemDir = resolve(ITEMS_DIR, item.id);
    if (!fs.existsSync(itemDir)) fs.mkdirSync(itemDir, { recursive: true });
    fs.writeFileSync(resolve(itemDir, 'index.html'), html, 'utf8');
    fs.writeFileSync(resolve(ITEMS_DIR, `${item.id}.html`), html, 'utf8');
  });
  const archivePath = resolve(ITEMS_DIR, 'index.html');
  fs.writeFileSync(archivePath, generateArchivePage(items), 'utf8');
  console.log(`[Pages Generator] Compiled ${items.length} markdown items to pretty routes and flat aliases.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePages();
}

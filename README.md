# Scam Guru Playbook: Deconstructing Digital Persuasion & Funnels

<p align="center">
  <br>
  <span style="font-size: 3.5rem;">📖</span>
  <h1 align="center">Scam Guru Playbook</h1>
  <p align="center"><strong>Public Education & Investigative Archive of Online Guru Marketing Funnels</strong></p>
  <p align="center">
    Zero-Hydration Static Architecture &bull; Zen Educational Design &bull; Sub-200-Line Modularity &bull; Built with VanillaSSG
  </p>
</p>

---

## Overview

Scam Guru Playbook is an open public consumer education archive built to analyze and document the mechanics of online guru funnels, status intimidation marketing, and repetitive product pivots across dropshipping, agency courses, crypto, and AI summits.

Like independent investigative creators in the digital space, GuruPB relies on primary source evidence, archived marketing funnels, corporate registry filings, and regulatory records.

---

## Core Features

- **The 4-Stage Funnel Model**: Complete educational breakdown of The Bait, The Shovel, The Trap, and The Shield.
- **Investigative Dossiers**: Objective, timeline-based case studies analyzing specific promoters (Iman Gadzhi, Tai Lopez) and broad industry dynamics.
- **Zero-Hydration Speed**: Pre-rendered pure HTML built on VanillaSSG and Vite with zero client framework bloat.
- **Automated OpenGraph Previews**: Generates compact 256x256 side-by-side preview cards compliant with messaging standards.
- **Strict 200-Line Modularity**: Every script and styling unit is organized into single-responsibility submodules.

---

## Content Structure

- `index.html`: Landing page with 4-stage funnel overview, dossier highlights, and consumer red-flag table.
- `content/items/*.md`: Markdown dossier files with YAML frontmatter compiled automatically into clean folder routes (`/items/<slug>/index.html`) and flat aliases (`/items/<slug>.html`).
- `about.html`: Editorial mission, evidentiary standards, and legal gray-zone explanations.
- `scripts/`: Custom Node compilation pipeline for pages, RSS feeds, XML sitemaps, robots.txt, and vector OpenGraph cards.

---

## Local Development & Build

```bash
# Install dependencies
npm install

# Run full content generation and dev server
npm run dev

# Compile all markdown pages and asset bundles
node scripts/generate-og-cards.js
node scripts/generate-pages.js
node scripts/generate-sitemap.js
node scripts/generate-feed.js
node scripts/sync-layout.js
node scripts/sync-seo-meta.js
npx vite build
```

---

## License

MIT License. Educational content published for consumer protection and public interest research.

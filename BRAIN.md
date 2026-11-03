# BRAIN.md & Architectural Memory Record

## Project Overview
GuruPB (Guru Playbook) is a zero-hydration, public education and investigative platform dedicated to deconstructing online guru marketing funnels, status intimidation tactics, and continuous product pivots.

## Architectural Philosophy
1. **Zero-Hydration Static First**: Pure HTML output generated via VanillaSSG. Initial paint executes on the first network chunk without waiting for JavaScript execution.
2. **Sub-200-Line Code Modularity**: Strict adherence to the 200-line limit across all `.js` and `.css` files. Complex functionality is broken into single-responsibility submodules.
3. **No Third-Party Runtime Bloat**: Zero client frameworks (no React, no Vue, no Tailwind). Modern Vanilla CSS using design tokens and semantic HTML.
4. **Vite Tooling**: High-performance local development server targeting `es2022` production builds.
5. **Content Separation**: Markdown files with YAML frontmatter compile to clean URL structures (`/items/<id>/index.html`) alongside flat alias compatibility (`/items/<id>.html`).

## Investigative Structure & Editorial Standard
- **The 4-Stage Funnel**: The Bait (Status Intimidation), The Shovel (Selling the Manual), The Trap (Micro-Upsells & Community Escalation), and The Shield (Blame Deflection).
- **Evidentiary Protocol**: Documented timelines, public company registries, advertising archives, and regulatory filings (FTC, SEC) instead of unsubstantiated personal attacks.
- **Side-by-Side Social Previews**: Compact 1:1 256x256 OpenGraph cards optimized for messaging platforms and search spiders.

## Roadmap & Milestones
- **v1.0.0 (Foundation)**: VanillaSSG scaffold, investigative landing page, four core dossiers (Iman Gadzhi, Tai Lopez, Funnel Anatomy, The Pivot Cycle), dark/light theme, dynamic sitemap, and feed generation.
- **v1.1.0 (Interactive Tools)**: Client-side Red Flag calculator and searchable dossier filtering.
- **v1.2.0 (Public Records Archive)**: Regulatory enforcement repository and structured whistleblower tip intake.

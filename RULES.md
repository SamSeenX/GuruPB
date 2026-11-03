# Project Rules: GuruPB

## 1. Modular Architecture & 200-Line Limit
- Every code file (`.js`, `.css`) must strictly target under 200 lines of code.
- Workflow markdown documentation (`BRAIN.md`, `CHANGELOG.md`, `RULES.md`, `SCOPE.md`, `README.md`) is exempt.
- Proactively split files at ~180 lines into clean single-responsibility submodules.

## 2. Vanilla Philosophy & Dependencies
- Original, standard Vanilla JavaScript (ES6+ modules) and Vanilla CSS.
- Strictly no React, Vue, or Tailwind CSS.
- Never add unnecessary npm runtime bloat.

## 3. Editorial & Investigative Integrity
- Dossiers must focus on the business mechanics, sales funnels, and verified public records.
- Avoid libelous or purely emotional assertions. Frame findings around documented funnels, fee schedules, ad copies, and court or regulatory filings.
- Distinguish clearly between outright criminal fraud convictions and legal-gray-zone marketing tactics.

## 4. Design & OpenGraph Standards
- Design tokens defined in `src/styles/tokens.css` with dark/light theme support.
- Mobile-first layout with safe-area insets (`env(safe-area-inset-top)`).
- Minimum 48px touch targets for buttons and interactive controls.
- Compact side-by-side OpenGraph previews (256x256, PNG/JPEG under 300KB, summary card). Never use invalid XML entities in SVGs.

## 5. Git Workflow & Safety
- Feature branches (`feature/<name>`) for all new work. Never develop directly on `main` or `deploy`.
- Pre-flight build tests before merging.

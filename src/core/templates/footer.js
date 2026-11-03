/**
 * Footer Sub-Template
 * Renders the site footer, brand statement, navigation columns, and legal copyright.
 */

export function getFooterHtml() {
  const currentYear = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-brand">
      <div class="footer-logo" style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600;">📖 Scam Guru Playbook</div>
      <p class="footer-tagline">An open public education archive deconstructing digital persuasion, high-ticket funnels, and modern online guru playbooks.</p>
    </div>
    <nav class="footer-nav" aria-label="Footer Navigation">
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/items/">Dossiers Archive</a></li>
          <li><a href="/about.html">About & Methodology</a></li>
          <li><a href="/changelog.html">Changelog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Trust & Legal</h4>
        <ul>
          <li><a href="/privacy.html">Privacy Policy</a></li>
          <li><a href="/terms.html">Terms of Service</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${currentYear} Scam Guru Playbook. Dedicated to public awareness, educational analysis, and consumer protection.</p>
  </div>
</footer>`;
}

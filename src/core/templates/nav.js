/**
 * Navigation Sub-Template
 * Manages navigation items, active link states, and accessible nav list markup.
 */

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Dossiers', href: '/items/' },
  { label: 'About & Methodology', href: '/about.html' },
  { label: 'Changelog', href: '/changelog.html' }
];

export function getNavHtml(currentPath = '/') {
  const navLinks = NAV_ITEMS.map((item) => {
    const isRoot = item.href === '/';
    const isExternal = item.href.startsWith('http');
    const isActive = isRoot
      ? (currentPath === '/' || currentPath === '/index.html')
      : (!isExternal && currentPath.startsWith(item.href));
    const activeAttr = isActive ? ' class="nav-link active" aria-current="page"' : ' class="nav-link"';
    const externalAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<li><a href="${item.href}"${activeAttr}${externalAttr}>${item.label}</a></li>`;
  }).join('\n        ');

  return `<nav id="site-nav" class="site-nav" aria-label="Main Navigation">
      <ul class="nav-list">
        ${navLinks}
      </ul>
    </nav>`;
}

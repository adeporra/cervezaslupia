import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';

  let resp = await fetch(`${footerPath}.plain.html`);
  if (!resp.ok) {
    resp = await fetch('/content/footer.plain.html');
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-content';

  const sections = doc.querySelectorAll('body > div');
  const classes = ['footer-nav', 'footer-social', 'footer-brands', 'footer-legal'];
  sections.forEach((section, i) => {
    if (classes[i]) section.classList.add(classes[i]);
    footer.append(section);
  });

  block.append(footer);
}

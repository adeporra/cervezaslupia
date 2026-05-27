/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Cervezas Lupia section breaks and section metadata.
 * Inserts <hr> section dividers and Section Metadata blocks based on template sections.
 * All selectors validated against captured DOM of https://cervezaslupia.es/
 *
 * Sections (from page-templates.json):
 *  1. Hero: .bloque_hero_home
 *  2. Marquee Ticker: .marquesina_wrap
 *  3. Video Embed: .video-container
 *  4. Full-width Image: .wrapper_img_100
 *  5. Product Carousel: .Carrusel_navigation_wrapper__x8lu_
 *  6. La Cosecha Video: .cosecha_home_video
 *  7. Blog Posts: .entradas_wrap
 *  8. Newsletter Signup: .homenews (style: "dark")
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid shifting DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const cells = { style: section.style };
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells,
        });
        // Insert section metadata after the section element
        if (sectionEl.nextSibling) {
          sectionEl.parentNode.insertBefore(sectionMetadataBlock, sectionEl.nextSibling);
        } else {
          sectionEl.parentNode.appendChild(sectionMetadataBlock);
        }
      }

      // Insert <hr> before every section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}

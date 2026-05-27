/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-ticker
 * Base block: carousel
 * Source: https://cervezaslupia.es/
 * Selector: .marquesina_wrap
 * Description: Horizontally scrolling marquee/ticker strip with repeated brand images.
 *   Each image becomes a row in the block table.
 * Generated: 2026-05-27
 */
export default function parse(element, { document }) {
  // Extract all images from the marquee container
  // Source structure: .marquesina_wrap > .marquesina > figure.wp-block-image > img
  const marqueeContainer = element.querySelector('.marquesina');
  const container = marqueeContainer || element;

  const figures = Array.from(container.querySelectorAll('figure.wp-block-image'));

  // Build cells: one row per image (single-column ticker layout)
  // For a ticker/marquee, each row contains just the image
  const cells = [];

  // Deduplicate images by src to avoid repeating the same image
  // Tickers often duplicate images for seamless scrolling animation
  const seenSrcs = new Set();
  for (const figure of figures) {
    const img = figure.querySelector('img');
    if (img) {
      const src = img.getAttribute('src') || '';
      if (!seenSrcs.has(src)) {
        seenSrcs.add(src);
        cells.push([img]);
      }
    }
  }

  // Fallback: if no figures found, try direct img elements
  if (cells.length === 0) {
    const imgs = Array.from(container.querySelectorAll('img'));
    const fallbackSeen = new Set();
    for (const img of imgs) {
      const src = img.getAttribute('src') || '';
      if (!fallbackSeen.has(src)) {
        fallbackSeen.add(src);
        cells.push([img]);
      }
    }
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-ticker', cells });
  element.replaceWith(block);
}

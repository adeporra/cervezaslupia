/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-blog
 * Base block: cards
 * Source: https://cervezaslupia.es/
 * Selector: .CarruselEntradas_navigation_wrapper__pztDh
 * Generated: 2026-05-27
 *
 * Structure: Blog post cards carousel. Each card has a thumbnail image and a
 * linked heading (h3) pointing to a blog article.
 * Output: 2-column table — col1 = thumbnail image, col2 = linked heading
 */
export default function parse(element, { document }) {
  // Extract all slides/cards from the carousel
  const slides = element.querySelectorAll('.keen-slider__slide');
  const cells = [];

  slides.forEach((slide) => {
    // Each slide contains a .bloque_entradas_item with an <a> wrapping img + h3
    const link = slide.querySelector('a.entrada_item')
      || slide.querySelector('.bloque_entradas_item a');

    if (!link) return;

    // Col 1: Thumbnail image
    const image = slide.querySelector('img.wp-post-image')
      || slide.querySelector('.bloque_entradas_item img')
      || slide.querySelector('img');

    // Col 2: Linked heading — wrap heading text in a link to the blog post
    const heading = slide.querySelector('h3')
      || slide.querySelector('h2, h4');

    const contentCell = [];
    if (heading && link.href) {
      // Create a link element wrapping the heading text to preserve the blog URL
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = heading.textContent;
      const h = document.createElement('h3');
      h.appendChild(a);
      contentCell.push(h);
    } else if (heading) {
      contentCell.push(heading);
    }

    // Build row: [image cell, content cell]
    const imageCell = image ? [image] : [];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-blog', cells });
  element.replaceWith(block);
}

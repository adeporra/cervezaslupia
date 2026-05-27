/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-product
 * Base block: carousel
 * Source: https://cervezaslupia.es/
 * Selector: .Carrusel_navigation_wrapper__x8lu_
 * Generated: 2026-05-27
 *
 * Structure: Product carousel with slides. Each slide has a background image,
 * product name (h2), two CTA buttons, and a product composition image.
 * Output: 2-column table — col1 = product image, col2 = heading + CTAs
 */
export default function parse(element, { document }) {
  // Extract all slides from the carousel
  const slides = element.querySelectorAll('.keen-slider__slide');
  const cells = [];

  slides.forEach((slide) => {
    // Col 1: Product composition image (desktop .slide_pc preferred, fallback to any img in .img_producto_banner)
    const productImage = slide.querySelector('.slide_pc img')
      || slide.querySelector('.img_producto_banner img');

    // Col 2: Text content - heading + CTA buttons
    const heading = slide.querySelector('.txt_producto_banner h2')
      || slide.querySelector('h2');
    const ctaLinks = Array.from(
      slide.querySelectorAll('.txt_producto_banner a')
    );
    // Fallback: if no links found via .txt_producto_banner, try generic btn links
    const links = ctaLinks.length > 0
      ? ctaLinks
      : Array.from(slide.querySelectorAll('a.btn'));

    // Build content cell with heading and CTAs
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (links.length > 0) contentCell.push(...links);

    // Build row: [image cell, content cell]
    const imageCell = productImage ? [productImage] : [];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-product', cells });
  element.replaceWith(block);
}

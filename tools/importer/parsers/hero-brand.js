/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-brand
 * Base block: hero
 * Source: https://cervezaslupia.es/
 * Selector: .bloque_hero_home
 * Generated: 2026-05-27T00:00:00Z
 *
 * Source structure:
 * - Decorative hop image (.img_lupulo)
 * - Decorative leaf image (.img_hoja)
 * - Hero tagline text (p.titulo_hero)
 * - Decorative heart image (.img_corazon)
 * - Decorative wolf image (.img_lobo)
 * - Product cans image (.img_latas)
 *
 * Output: Hero block with background image, headline, decorative images, and product image
 */
export default function parse(element, { document }) {
  // Extract the hero tagline text
  const heading = element.querySelector('p.titulo_hero, .titulo_hero, p.rama');

  // Extract the product cans image (main hero visual)
  const productImage = element.querySelector('.img_latas img, .col_latas img');

  // Extract decorative images for background/visual context
  const hopImage = element.querySelector('.img_lupulo img');
  const leafImage = element.querySelector('.img_hoja img');
  const heartImage = element.querySelector('.img_corazon img');
  const wolfImage = element.querySelector('.img_lobo img');

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Background/decorative image (hop plant)
  if (hopImage) {
    cells.push([hopImage]);
  }

  // Row 2: Content - headline + decorative images + product image
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (leafImage) contentCell.push(leafImage);
  if (heartImage) contentCell.push(heartImage);
  if (wolfImage) contentCell.push(wolfImage);
  if (productImage) contentCell.push(productImage);
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-brand', cells });
  element.replaceWith(block);
}

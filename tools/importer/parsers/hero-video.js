/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video
 * Base block: hero
 * Source: https://cervezaslupia.es/
 * Selector: .cosecha_home_video
 * Description: Hero section with video background and overlaid text content (heading, description, CTA)
 * Generated: 2026-05-27
 */
export default function parse(element, { document }) {
  // Extract desktop video (primary media - 16x9)
  const desktopVideo = element.querySelector('figure.hidden-mobile video, figure#video-home video');
  // Extract mobile video (9x16 variant)
  const mobileVideo = element.querySelector('figure.hidden-desktop video, figure#video-home-mobile video');

  // Extract content from the nested wrapper
  const contentWrapper = element.querySelector(':scope > .wp-block-hacce-wrapper');
  const heading = contentWrapper
    ? contentWrapper.querySelector('h2, h1, [class*="heading"]')
    : element.querySelector('h2, h1, [class*="heading"]');
  const description = contentWrapper
    ? contentWrapper.querySelector('p.rama, p:not(.wp-block-button__link)')
    : element.querySelector('p.rama, p');
  const ctaLink = contentWrapper
    ? contentWrapper.querySelector('a.wp-block-button__link, a.wp-element-button, .wp-block-buttons a')
    : element.querySelector('a.wp-block-button__link, a.wp-element-button, .wp-block-buttons a');

  const cells = [];

  // Row 1: Video media (use desktop video as primary; include link to video source)
  if (desktopVideo) {
    const videoSrc = desktopVideo.getAttribute('src');
    if (videoSrc) {
      const videoLink = document.createElement('a');
      videoLink.href = videoSrc;
      videoLink.textContent = videoSrc;
      cells.push([videoLink]);
    } else {
      cells.push([desktopVideo]);
    }
  } else if (mobileVideo) {
    const videoSrc = mobileVideo.getAttribute('src');
    if (videoSrc) {
      const videoLink = document.createElement('a');
      videoLink.href = videoSrc;
      videoLink.textContent = videoSrc;
      cells.push([videoLink]);
    } else {
      cells.push([mobileVideo]);
    }
  }

  // Row 2: Content (heading + description + CTA)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (ctaLink) contentCell.push(ctaLink);
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}

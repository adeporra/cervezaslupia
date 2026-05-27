/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-video
 * Base block: embed
 * Source: https://cervezaslupia.es/
 * Selector: .video-container
 * Generated: 2026-05-27
 *
 * Embed block structure (1 column):
 *   Row 1: block name (handled by createBlock)
 *   Row 2: poster image + video URL (or just poster if no URL in DOM)
 *
 * Source DOM contains only a poster/thumbnail image inside .video-container.
 * The actual YouTube video URL is loaded via JavaScript and not present in the static HTML.
 * Parser extracts the poster image and any link/video URL if available.
 */
export default function parse(element, { document }) {
  // Extract poster/thumbnail image
  const posterImg = element.querySelector('img#loadVideoImg, img[alt*="Video"], img[alt*="video"], img');

  // Look for any video URL that might be in the DOM (link, data attribute, iframe)
  const videoLink = element.querySelector('a[href*="youtube"], a[href*="youtu.be"], a[href*="vimeo"], iframe[src]');
  const dataVideoUrl = element.getAttribute('data-video-url')
    || element.getAttribute('data-src')
    || element.querySelector('[data-video-url], [data-src]')?.getAttribute('data-video-url')
    || element.querySelector('[data-video-url], [data-src]')?.getAttribute('data-src');

  // Build content cell: poster image + video URL (if found)
  const contentCell = [];

  if (posterImg) {
    contentCell.push(posterImg);
  }

  // Add video URL as a link if found from any source
  if (videoLink) {
    const link = videoLink.tagName === 'IFRAME'
      ? document.createElement('a')
      : videoLink;
    if (videoLink.tagName === 'IFRAME') {
      link.href = videoLink.src;
      link.textContent = videoLink.src;
    }
    contentCell.push(link);
  } else if (dataVideoUrl) {
    const link = document.createElement('a');
    link.href = dataVideoUrl;
    link.textContent = dataVideoUrl;
    contentCell.push(link);
  }

  // Build cells array matching embed block structure
  const cells = [];
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-video', cells });
  element.replaceWith(block);
}

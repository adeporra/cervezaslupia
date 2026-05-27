/**
 * Carousel Ticker - infinite horizontal scrolling marquee
 * Duplicates the image content to create a seamless loop animation.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cell = row.querySelector(':scope > div');
  if (!cell) return;

  // Create the scrolling track container
  const track = document.createElement('div');
  track.classList.add('carousel-ticker-track');

  // Move original content into track, duplicated for seamless loop
  const content = cell.innerHTML;
  track.innerHTML = `
    <div class="carousel-ticker-item">${content}</div>
    <div class="carousel-ticker-item">${content}</div>
  `;

  // Replace block content with the track
  block.textContent = '';
  block.append(track);
}

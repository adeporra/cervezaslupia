export default function decorate(block) {
  // Row 1: video URL cell
  const videoRow = block.querySelector(':scope > div:first-child');
  const videoLink = videoRow?.querySelector('a');

  if (videoLink && videoLink.href.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.src = videoLink.href;
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    videoRow.replaceWith(video);
  } else if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Row 2: content overlay - add button class to CTA link
  const contentRow = block.querySelector(':scope > div:last-child');
  if (contentRow) {
    const ctaCell = contentRow.querySelector(':scope > div:last-child');
    const ctaLink = ctaCell?.querySelector('a');
    if (ctaLink) {
      ctaLink.classList.add('button', 'primary');
      const wrapper = ctaLink.closest('p');
      if (wrapper) {
        wrapper.classList.add('button-wrapper');
      }
    }
  }
}

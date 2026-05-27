export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const firstRow = rows[0];
  const allLinks = firstRow ? [...firstRow.querySelectorAll('a')] : [];
  const videoLink = allLinks.find((a) => a.href.match(/\.mp4/i));

  if (videoLink) {
    const videoSrc = videoLink.href;
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.muted = true;

    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.append(source);

    video.addEventListener('loadeddata', () => {
      video.play().catch(() => {});
    });

    firstRow.replaceWith(video);
  } else {
    if (firstRow) firstRow.remove();
    block.classList.add('no-image');
  }

  const contentRow = block.querySelector(':scope > div');
  if (contentRow) {
    const ctaLink = contentRow.querySelector('a[href]:not([href*=".mp4"])');
    if (ctaLink && !ctaLink.classList.contains('button')) {
      ctaLink.classList.add('button', 'primary');
      const wrapper = ctaLink.closest('p');
      if (wrapper) wrapper.classList.add('button-wrapper');
    }
  }
}

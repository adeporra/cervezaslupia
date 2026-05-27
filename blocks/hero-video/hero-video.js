export default function decorate(block) {
  const allLinks = [...block.querySelectorAll('a')];
  const videoLink = allLinks.find((a) => a.href.match(/\.mp4/i));

  if (videoLink) {
    const videoSrc = videoLink.href;
    const videoContainer = videoLink.closest('div');

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

    video.addEventListener('error', () => {
      video.style.display = 'none';
    });

    video.addEventListener('loadeddata', () => {
      video.play().catch(() => {});
    });

    if (videoContainer) {
      videoContainer.replaceWith(video);
    } else {
      videoLink.replaceWith(video);
    }
  }

  const ctaLink = block.querySelector('a[href]:not([href*=".mp4"])');
  if (ctaLink && !ctaLink.classList.contains('button')) {
    ctaLink.classList.add('button', 'primary');
    const wrapper = ctaLink.closest('p');
    if (wrapper) wrapper.classList.add('button-wrapper');
  }
}

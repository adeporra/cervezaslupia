/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Cervezas Lupia site-wide cleanup.
 * Removes non-authorable content (cookie banner, header, footer, age gate, iframes).
 * All selectors validated against captured DOM of https://cervezaslupia.es/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove Cookiebot consent dialog (blocks page interaction / parsing)
    // Found in captured HTML: <div id="CybotCookiebotDialog" class="CybotEdge CybotCookiebotDialogActive">
    WebImporter.DOMUtils.remove(element, ['#CybotCookiebotDialog']);

    // Remove age verification splash screen (overlay blocking content)
    // Found in captured HTML: <div class="SplashScreen_splashContainer__qPllc">
    WebImporter.DOMUtils.remove(element, ['[class*="SplashScreen_splashContainer"]']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header (non-authorable navigation)
    // Found in captured HTML: <header class="Header_header___yCA4 undefined">
    WebImporter.DOMUtils.remove(element, ['header']);

    // Remove site footer (non-authorable)
    // Found in captured HTML: <footer class="Footer_footer__sOVcy">
    WebImporter.DOMUtils.remove(element, ['footer']);

    // Remove iframes (Cookiebot SDK frames)
    // Found in captured HTML: <iframe title="Blank"> and <iframe title="Blank" src="...cookiebot...">
    WebImporter.DOMUtils.remove(element, ['iframe']);
  }
}

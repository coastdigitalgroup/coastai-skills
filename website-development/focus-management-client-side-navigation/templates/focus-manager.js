/**
 * Focus Manager Utility for SPAs
 *
 * Handles the visual and programmatic cleanup required during client-side
 * navigation.
 */

/**
 * Resets focus to a specific element and ensures it is accessible.
 * @param {HTMLElement} element - The element to focus (typically h1).
 */
export function resetFocus(element) {
  if (!element) return;

  // 1. Make element focusable programmatically if it isn't already
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }

  // 2. Focus the element
  element.focus();

  // 3. Optional: Remove focus ring for mouse users if desired,
  // but keep it for keyboard users if the element is interactive.
  // element.style.outline = 'none';
}

/**
 * Updates the document title and announces the change to screen readers.
 * @param {string} title - The new page title.
 * @param {string} siteName - The suffix for the document title.
 * @param {string} announcerId - The ID of the aria-live announcer element.
 */
export function handlePageMetadata(title, siteName = '', announcerId = 'route-announcer') {
  // 1. Update document title
  const fullTitle = siteName ? `${title} | ${siteName}` : title;
  document.title = fullTitle;

  // 2. Update live region
  const announcer = document.getElementById(announcerId);
  if (announcer) {
    // Adding a slight delay or changing the text content ensures
    // the screen reader notices the update.
    announcer.textContent = '';
    setTimeout(() => {
      announcer.textContent = `Navigated to ${title}`;
    }, 50);
  }
}

/**
 * A comprehensive navigation handler to be called on route changes.
 * @param {Object} options
 * @param {string} options.title - The new page title.
 * @param {HTMLElement} options.focusTarget - The element to focus.
 * @param {boolean} options.shouldScroll - Whether to scroll to top.
 */
export function onNavigate({ title, focusTarget, shouldScroll = true }) {
  if (shouldScroll) {
    window.scrollTo(0, 0);
  }

  handlePageMetadata(title);

  // Use requestAnimationFrame to ensure the new content is in the DOM
  requestAnimationFrame(() => {
    resetFocus(focusTarget);
  });
}

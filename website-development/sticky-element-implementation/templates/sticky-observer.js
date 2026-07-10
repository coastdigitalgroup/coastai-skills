/**
 * Sticky Observer Utility
 *
 * A reusable utility to detect when an element becomes stuck to the viewport.
 * It uses a sentinel element to avoid the layout/feedback loop issues
 * common with observing the sticky element directly.
 */

/**
 * Initializes the sticky observer.
 * @param {HTMLElement} stickyElement - The element with position: sticky
 * @param {string} stuckClass - The class to toggle (default: 'is-stuck')
 */
export function initStickyObserver(stickyElement, stuckClass = 'is-stuck') {
  if (!stickyElement) return;

  // 1. Create a sentinel element
  const sentinel = document.createElement('div');
  sentinel.className = 'sticky-sentinel';

  // Style the sentinel to be invisible and 0-height
  Object.assign(sentinel.style, {
    height: '0px',
    visibility: 'hidden',
    pointerEvents: 'none',
    position: 'relative'
  });

  // 2. Insert sentinel just before the sticky element
  stickyElement.parentNode.insertBefore(sentinel, stickyElement);

  // 3. Setup the Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Toggle the class if the sentinel is not in view (scrolled past)
      stickyElement.classList.toggle(stuckClass, !entry.isIntersecting);
    });
  }, {
    threshold: [0],
    // Adjust rootMargin if the sticky element has a 'top' value > 0
    // rootMargin: '-1px 0px 0px 0px'
  });

  observer.observe(sentinel);

  return observer;
}

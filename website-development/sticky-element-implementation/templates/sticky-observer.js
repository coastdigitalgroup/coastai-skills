/**
 * StickyObserver
 * A lightweight utility to detect when a position:sticky element
 * enters or leaves its "stuck" state.
 */

/**
 * @param {HTMLElement} stickyElement - The element with position:sticky
 * @param {string} stuckClass - The class to toggle (default: 'is-stuck')
 * @param {HTMLElement} sentinel - Optional: A custom sentinel element
 */
export function observeStickyState(stickyElement, stuckClass = 'is-stuck', sentinel = null) {
  if (!stickyElement) return;

  // 1. Create sentinel if not provided
  if (!sentinel) {
    sentinel = document.createElement('div');
    sentinel.dataset.stickySentinel = "";
    sentinel.style.position = 'absolute';
    sentinel.style.height = '0';
    sentinel.style.top = '0'; // Adjust if top threshold is not 0
    sentinel.style.pointerEvents = 'none';
    sentinel.style.visibility = 'hidden';

    // Insert before the sticky element
    stickyElement.parentNode.insertBefore(sentinel, stickyElement);
  }

  // 2. Setup Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Get the target element's threshold (top)
      const topThreshold = parseInt(getComputedStyle(stickyElement).top) || 0;

      // If sentinel is above the viewport (top < threshold), it's stuck
      const isStuck = !entry.isIntersecting && entry.boundingClientRect.top < topThreshold;

      if (isStuck) {
        stickyElement.classList.add(stuckClass);
      } else {
        stickyElement.classList.remove(stuckClass);
      }
    });
  }, {
    threshold: [0, 1]
  });

  observer.observe(sentinel);

  return observer; // Allow caller to disconnect later
}

// Example usage:
// observeStickyState(document.querySelector('.main-header'));

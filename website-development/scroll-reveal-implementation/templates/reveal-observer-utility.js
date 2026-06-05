/**
 * reveal-observer-utility.js
 * A reusable utility for managing scroll-reveal entrance animations.
 *
 * Usage:
 * 1. Add 'reveal' class to elements you want to animate.
 * 2. Import and initialize: initScrollReveal();
 */

/**
 * Initializes the Intersection Observer for all elements with the .reveal class.
 * @param {Object} options - Intersection Observer options.
 * @param {string} selector - CSS selector for elements to observe.
 * @param {string} revealedClass - Class to add when element is in view.
 */
export function initScrollReveal({
  options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  },
  selector = '.reveal',
  revealedClass = 'is-revealed'
} = {}) {
  // 1. Check for browser support
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Falling back to immediate display.');
    document.querySelectorAll(selector).forEach(el => el.classList.add(revealedClass));
    return;
  }

  // 2. Identify elements
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  // 3. Create observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger animation
        entry.target.classList.add(revealedClass);

        // Clean up: animations usually only need to run once
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // 4. Start observing
  elements.forEach(el => observer.observe(el));

  return observer; // Return instance for manual control/teardown if needed
}

/**
 * Optional: Manual trigger for dynamically added content
 */
export function observeNewElement(element, observer, revealedClass = 'is-revealed') {
  if (observer && element) {
    observer.observe(element);
  }
}

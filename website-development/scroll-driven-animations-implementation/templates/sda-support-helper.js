/**
 * Scroll-Driven Animations Polyfill Utility
 *
 * Since the native API is modern, this utility checks for support
 * and provides a manual intersection-based fallback or a warning
 * to prevent broken UI.
 */

export const checkScrollAnimationSupport = () => {
  const isSupported = CSS.supports('animation-timeline', 'scroll()');

  if (!isSupported) {
    console.warn('Scroll-Driven Animations not supported in this browser. Falling back to IntersectionObserver.');
    document.documentElement.classList.add('no-scroll-animations');

    // Logic here could initialize an IntersectionObserver to
    // simulate basic entrance reveals (not full scrubbing).
    setupSimpleObserverFallback();
  } else {
    document.documentElement.classList.add('has-scroll-animations');
  }
};

const setupSimpleObserverFallback = () => {
  const items = document.querySelectorAll('.view-reveal-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Stop observing once revealed as simple fallback
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => observer.observe(item));
};

/**
 * For browsers that don't support Scrubbing (Safari 17-18, Firefox < 114)
 * a separate polyfill like scroll-timeline.js from Chrome Labs is recommended.
 *
 * This file acts as a detection-first helper.
 */

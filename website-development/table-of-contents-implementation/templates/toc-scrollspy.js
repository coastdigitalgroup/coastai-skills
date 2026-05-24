/**
 * Table of Contents Scrollspy Implementation
 * Uses IntersectionObserver for high-performance active state tracking.
 */
function initTocScrollspy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = document.querySelectorAll('h1[id], h2[id], h3[id]');

  if (!tocLinks.length || !headings.length) return;

  const observerOptions = {
    root: null,
    // Adjust rootMargin based on your site header height
    // Format: "top right bottom left"
    rootMargin: '-100px 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveState(id);
      }
    });
  }, observerOptions);

  headings.forEach((heading) => observer.observe(heading));

  function updateActiveState(activeId) {
    tocLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initTocScrollspy);

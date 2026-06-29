/**
 * ScrollLock Utility
 * Manages body scroll locking while preventing layout shifts.
 */

const ScrollLock = {
  /**
   * Get the current width of the system scrollbar.
   * Returns 0 for overlay scrollbars (macOS/Mobile).
   */
  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  },

  /**
   * Lock the scroll.
   * @param {string} fixedSelector - CSS selector for elements that need padding compensation.
   */
  lock(fixedSelector = '.is-fixed') {
    const width = this.getScrollbarWidth();
    const fixedElements = document.querySelectorAll(fixedSelector);

    document.body.style.overflow = 'hidden';

    if (width > 0) {
      document.body.style.paddingRight = `${width}px`;
      fixedElements.forEach(el => {
        el.style.paddingRight = `${width}px`;
      });
    }
  },

  /**
   * Unlock the scroll.
   * @param {string} fixedSelector - Must match the selector used in lock().
   */
  unlock(fixedSelector = '.is-fixed') {
    const fixedElements = document.querySelectorAll(fixedSelector);

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    fixedElements.forEach(el => {
      el.style.paddingRight = '';
    });
  }
};

export default ScrollLock;

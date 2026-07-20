/**
 * Reusable Body Scroll Lock Utility
 * Resolves desktop scroll shifts and iOS Safari touch-scrolling leaks.
 * Supports stacked/nested overlays using a reference counter.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BodyScrollLock = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Constants & Feature Flags
  const isIOS = typeof window !== 'undefined' && (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );

  // Module state variables
  let lockCount = 0;
  let activeScrollableElements = new Set();
  let initialClientY = -1;
  let previousBodyOverflowSetting = '';
  let previousBodyPaddingRightSetting = '';
  let scrollPositionBeforeLock = 0;

  /**
   * Calculates the browser's scrollbar width in pixels.
   * Helps prevent visual "jumping" layouts when scrollbars are toggled.
   */
  function getScrollbarWidth() {
    if (typeof document === 'undefined') return 0;
    return window.innerWidth - document.documentElement.clientWidth;
  }

  /**
   * Evaluates if a given HTML element is currently scrollable.
   */
  function isElementScrollable(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    const overflowY = style.getPropertyValue('overflow-y');
    const isScrollableStyle = overflowY === 'auto' || overflowY === 'scroll';
    const hasScrollableHeight = el.scrollHeight > el.clientHeight;
    return isScrollableStyle && hasScrollableHeight;
  }

  /**
   * Document-level touchstart handler to capture user's initial touch position.
   */
  function handleTouchStart(event) {
    if (event.targetTouches.length === 1) {
      initialClientY = event.targetTouches[0].clientY;
    }
  }

  /**
   * Document-level touchmove handler to manage swipe propagation.
   */
  function handleTouchMove(event) {
    if (event.targetTouches.length !== 1) return;

    // Trailing coordinates
    const clientY = event.targetTouches[0].clientY;
    const deltaY = clientY - initialClientY;

    // Traverse up the DOM to check if the touch happened inside any of our exempt elements
    let target = event.target;
    let isExempt = false;

    while (target && target !== document.body) {
      if (activeScrollableElements.has(target)) {
        isExempt = true;
        break;
      }
      target = target.parentNode;
    }

    // 1. If we are dragging on a non-exempt static background element, lock the gesture immediately
    if (!isExempt) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }

    // 2. We are on an exempt scrollable container. Ensure its scroll boundaries don't leak into the background body.
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Pulling down (trying to scroll up) when already at the top
    const isAtTop = scrollTop <= 0;
    const isScrollingDown = deltaY > 0;

    // Pulling up (trying to scroll down) when already at the bottom
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    const isScrollingUp = deltaY < 0;

    if ((isScrollingDown && isAtTop) || (isScrollingUp && isAtBottom)) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  }

  /**
   * Locks page scroll.
   * @param {HTMLElement} containerElement - The overlay panel container
   * @param {Object} options - Custom configuration parameters
   * @param {HTMLElement[]} options.scrollableTargets - Elements inside the overlay permitted to scroll
   * @param {boolean} options.reserveScrollBarGap - Adjust body padding to prevent horizontal shift (default: true)
   */
  function disableBodyScroll(containerElement, options = {}) {
    if (typeof window === 'undefined') return;

    if (!containerElement) {
      console.warn('BodyScrollLock.disableBodyScroll received a null or undefined target element.');
      return;
    }

    const scrollableTargets = options.scrollableTargets || [];
    const reserveScrollBarGap = options.reserveScrollBarGap !== false;

    // Register scrollable targets in our exemptions set
    scrollableTargets.forEach(el => {
      if (el) {
        activeScrollableElements.add(el);
        // Ensure iOS Safari hardware acceleration and styling is active
        el.style.webkitOverflowScrolling = 'touch';
      }
    });

    // If already locked, increment counter and exit (avoid redundant listener registrations)
    if (lockCount > 0) {
      lockCount++;
      return;
    }

    lockCount++;

    // Save baseline styles before overwriting them
    previousBodyOverflowSetting = document.body.style.overflow;
    scrollPositionBeforeLock = window.scrollY;

    // Calculate layout shift compensation gap
    const scrollbarWidth = getScrollbarWidth();
    if (reserveScrollBarGap && scrollbarWidth > 0) {
      previousBodyPaddingRightSetting = document.body.style.paddingRight;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Desktop/Android standard baseline lock
    document.body.style.overflow = 'hidden';

    // iOS touch gesture interception
    if (isIOS) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
  }

  /**
   * Unlocks page scroll.
   * @param {HTMLElement} containerElement - The overlay panel container
   */
  function enableBodyScroll(containerElement) {
    if (typeof window === 'undefined') return;

    if (lockCount === 0) return;

    lockCount--;

    // If multiple layers are nested/stacked, keep the lock active for outstanding layers
    if (lockCount > 0) {
      return;
    }

    // Reset baseline desktop styles
    document.body.style.overflow = previousBodyOverflowSetting;
    document.body.style.paddingRight = previousBodyPaddingRightSetting;

    // Clear active iOS listeners and cleanup references
    if (isIOS) {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      initialClientY = -1;
    }

    // Empty references to free memory
    activeScrollableElements.clear();
  }

  /**
   * Unlocks all scroll locks immediately regardless of the active nesting counter.
   * Ideal for SPA route transitions or app-wide page resets.
   */
  function clearAllBodyScrollLocks() {
    if (typeof window === 'undefined') return;

    lockCount = 0;

    document.body.style.overflow = previousBodyOverflowSetting;
    document.body.style.paddingRight = previousBodyPaddingRightSetting;

    if (isIOS) {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      initialClientY = -1;
    }

    activeScrollableElements.clear();
  }

  // Export module API
  return {
    disableBodyScroll: disableBodyScroll,
    enableBodyScroll: enableBodyScroll,
    clearAllBodyScrollLocks: clearAllBodyScrollLocks
  };
}));

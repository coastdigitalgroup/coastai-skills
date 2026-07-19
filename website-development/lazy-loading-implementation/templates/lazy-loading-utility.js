/**
 * Highly Optimized, Reusable Lazy Loading Engine
 *
 * Supports:
 * - Native lazy loading optimization fallback
 * - Custom IntersectionObserver image preloading (using data-src)
 * - Custom background-image preloading (using data-bg)
 * - General element viewport entry callback triggers (e.g., dynamic widgets or tracking pixels)
 * - Shared observer instance to prevent performance overhead (Single Global Observer Pattern)
 * - Smooth transition state class additions ('loaded', 'bg-loaded')
 */

class LazyLoadUtility {
  /**
   * Initialize the Lazy Loader configuration.
   * @param {Object} options - Custom observer configurations.
   * @param {string} options.rootMargin - Viewport trigger margin (default: '300px 0px').
   * @param {number} options.threshold - Visual intersection trigger ratio (default: 0.01).
   * @param {string} options.loadedClass - Class applied to loaded elements (default: 'loaded').
   * @param {string} options.bgLoadedClass - Class applied to loaded background wrappers (default: 'bg-loaded').
   */
  constructor(options = {}) {
    this.config = {
      rootMargin: options.rootMargin || '300px 0px 300px 0px',
      threshold: options.threshold || 0.01,
      loadedClass: options.loadedClass || 'loaded',
      bgLoadedClass: options.bgLoadedClass || 'bg-loaded',
    };

    this.observer = null;
    this.isSupported = 'IntersectionObserver' in window;

    this._init();
  }

  /**
   * Internal constructor logic to instantiate a single, unified observer.
   * @private
   */
  _init() {
    if (!this.isSupported) {
      this._legacyFallback();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this._loadElement(entry.target);
        }
      });
    }, {
      rootMargin: this.config.rootMargin,
      threshold: this.config.threshold
    });
  }

  /**
   * Observe one or more target elements.
   * @param {string|NodeList|Element} target - CSS selector, NodeList, or single element.
   */
  observe(target) {
    const elements = this._getElements(target);
    if (!elements) return;

    elements.forEach((element) => {
      // Prioritize native lazy loading on standard elements if configured with native attribute
      if (element.tagName === 'IMG' && element.hasAttribute('loading') && !element.hasAttribute('data-src')) {
        this._setupNativeLoadListener(element);
        return;
      }

      if (this.isSupported) {
        this.observer.observe(element);
      } else {
        this._loadElement(element);
      }
    });
  }

  /**
   * Unobserve an active element.
   * @param {Element} element - Target element to stop observing.
   */
  unobserve(element) {
    if (this.isSupported && this.observer) {
      this.observer.unobserve(element);
    }
  }

  /**
   * Disconnect the observer completely, freeing up resources.
   */
  destroy() {
    if (this.isSupported && this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Process and resolve the media loading logic based on element type.
   * @param {Element} element - Target node.
   * @private
   */
  _loadElement(element) {
    // 1. Resolve Background Image (`data-bg`)
    if (element.hasAttribute('data-bg')) {
      const bgUrl = element.getAttribute('data-bg');
      if (bgUrl) {
        const tempImg = new Image();
        tempImg.src = bgUrl;
        tempImg.onload = () => {
          element.style.backgroundImage = `url('${bgUrl}')`;
          element.classList.add(this.config.bgLoadedClass);
          this._triggerCallback(element, 'loaded');
        };
      }
      this.unobserve(element);
      return;
    }

    // 2. Resolve Standard Image (`data-src`)
    if (element.hasAttribute('data-src')) {
      const targetSrc = element.getAttribute('data-src');
      const targetSrcset = element.getAttribute('data-srcset');

      // Register onload handler before setting src/srcset to prevent cache race conditions
      element.onload = () => {
        element.classList.add(this.config.loadedClass);
        this._triggerCallback(element, 'loaded');
      };

      if (targetSrcset) {
        element.setAttribute('srcset', targetSrcset);
      }
      if (targetSrc) {
        element.setAttribute('src', targetSrc);
      }

      this.unobserve(element);
      return;
    }

    // 3. Resolve General Lazy Containers / Dynamic Iframe trigger
    if (element.hasAttribute('data-lazy-widget')) {
      const lazyUrl = element.getAttribute('data-lazy-widget');
      if (lazyUrl && element.tagName === 'IFRAME') {
        element.setAttribute('src', lazyUrl);
      }
      element.classList.add(this.config.loadedClass);
      this._triggerCallback(element, 'loaded');
      this.unobserve(element);
      return;
    }

    // 4. Custom triggering callback hook for arbitrary elements
    this._triggerCallback(element, 'entered');
    this.unobserve(element);
  }

  /**
   * Sets up load listeners for native loading="lazy" images to append loaded state classes cleanly.
   * @param {HTMLImageElement} imgElement - Target image.
   * @private
   */
  _setupNativeLoadListener(imgElement) {
    if (imgElement.complete) {
      imgElement.classList.add(this.config.loadedClass);
      this._triggerCallback(imgElement, 'loaded');
      return;
    }

    imgElement.addEventListener('load', () => {
      imgElement.classList.add(this.config.loadedClass);
      this._triggerCallback(imgElement, 'loaded');
    }, { once: true });
  }

  /**
   * Legacy browser fallback parser immediately forcing eager loading of all assets.
   * @private
   */
  _legacyFallback() {
    console.warn('IntersectionObserver is not supported in this browser. Eagerly resolving assets.');
  }

  /**
   * Helper utility to normalize target inputs into standard DOM element arrays.
   * @param {string|NodeList|Element} target
   * @returns {Element[]|null}
   * @private
   */
  _getElements(target) {
    if (!target) return null;
    if (typeof target === 'string') {
      return Array.from(document.querySelectorAll(target));
    }
    if (target instanceof NodeList) {
      return Array.from(target);
    }
    if (target instanceof Element) {
      return [target];
    }
    return null;
  }

  /**
   * Dispatch custom browser events for developer hooks (such as analytics integrations).
   * @param {Element} element - Target.
   * @param {string} state - Trigger state name.
   * @private
   */
  _triggerCallback(element, state) {
    const customEvent = new CustomEvent(`lazy:${state}`, {
      bubbles: true,
      detail: { element }
    });
    element.dispatchEvent(customEvent);
  }
}

// Export module for ES6/CommonJS environments, or fallback to global window binding
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = LazyLoadUtility;
} else if (typeof define === 'function' && define.amd) {
  define([], () => LazyLoadUtility);
} else {
  window.LazyLoadUtility = LazyLoadUtility;
}

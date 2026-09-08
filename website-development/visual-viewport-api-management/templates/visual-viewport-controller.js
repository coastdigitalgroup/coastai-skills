/**
 * VisualViewportController.js
 *
 * Production-grade singleton manager for window.visualViewport synchronization,
 * CSS custom variable updates, soft keyboard detection, and pinch-zoom handling.
 */

export class VisualViewportController {
  static #instance = null;

  constructor() {
    if (VisualViewportController.#instance) {
      return VisualViewportController.#instance;
    }

    this.listeners = new Set();
    this.rafId = null;
    this.isKeyboardOpen = false;
    this.keyboardThreshold = 150; // px reduction threshold to declare virtual keyboard open

    this.state = {
      width: 0,
      height: 0,
      offsetTop: 0,
      offsetLeft: 0,
      scale: 1,
      keyboardHeight: 0,
      isKeyboardVisible: false
    };

    this.hasSupport = typeof window !== 'undefined' && 'visualViewport' in window;

    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);

    this.init();
    VisualViewportController.#instance = this;
  }

  /**
   * Returns global singleton instance
   */
  static getInstance() {
    if (!VisualViewportController.#instance) {
      VisualViewportController.#instance = new VisualViewportController();
    }
    return VisualViewportController.#instance;
  }

  /**
   * Initialize event listeners and perform initial state sync
   */
  init() {
    if (this.hasSupport) {
      window.visualViewport.addEventListener('resize', this.handleViewportChange);
      window.visualViewport.addEventListener('scroll', this.handleViewportChange);
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleViewportChange);
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('focusin', this.handleFocusIn);
    }

    this.sync();
  }

  /**
   * Batched viewport change handler using requestAnimationFrame
   */
  handleViewportChange() {
    if (this.rafId) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.sync();
    });
  }

  /**
   * Intercept input focus events to mitigate iOS layout viewport scroll drift
   */
  handleFocusIn(event) {
    const target = event.target;
    if (!target || !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Reset layout viewport scroll drift caused by iOS keyboard expansion
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }, 300);
  }

  /**
   * Read visual viewport metrics and synchronize CSS variables and internal state
   */
  sync() {
    if (typeof window === 'undefined') return;

    const doc = document.documentElement;
    let width, height, offsetTop, offsetLeft, scale, keyboardHeight;

    if (this.hasSupport) {
      const vv = window.visualViewport;
      width = vv.width;
      height = vv.height;
      offsetTop = vv.offsetTop;
      offsetLeft = vv.offsetLeft;
      scale = vv.scale;

      const layoutHeight = window.innerHeight;
      const vvBottom = height + offsetTop;
      keyboardHeight = Math.max(0, Math.round(layoutHeight - vvBottom));
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
      offsetTop = 0;
      offsetLeft = 0;
      scale = 1;
      keyboardHeight = 0;
    }

    const isKeyboardVisible = keyboardHeight > this.keyboardThreshold;

    // Update state object
    this.state = {
      width,
      height,
      offsetTop,
      offsetLeft,
      scale,
      keyboardHeight,
      isKeyboardVisible
    };

    // Update CSS custom variables on :root
    doc.style.setProperty('--vv-width', `${width}px`);
    doc.style.setProperty('--vv-height', `${height}px`);
    doc.style.setProperty('--vv-offset-top', `${offsetTop}px`);
    doc.style.setProperty('--vv-offset-left', `${offsetLeft}px`);
    doc.style.setProperty('--vv-offset-bottom', `${keyboardHeight}px`);
    doc.style.setProperty('--vv-scale', `${scale}`);

    // Check for keyboard state toggle
    if (isKeyboardVisible !== this.isKeyboardOpen) {
      this.isKeyboardOpen = isKeyboardVisible;
      this.dispatchCustomEvent(isKeyboardVisible ? 'keyboardshow' : 'keyboardhide', {
        keyboardHeight,
        state: this.state
      });
    }

    // Notify registered JS listeners
    for (const callback of this.listeners) {
      try {
        callback(this.state);
      } catch (err) {
        console.error('VisualViewportController listener error:', err);
      }
    }
  }

  /**
   * Subscribe JS callback to state updates
   * @param {Function} callback
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    if (typeof callback !== 'function') return () => {};

    this.listeners.add(callback);
    // Trigger immediate callback with current state
    callback(this.state);

    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Dispatch custom window events for keyboard toggles
   */
  dispatchCustomEvent(eventName, detail) {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * Destroy controller and detach all window event listeners
   */
  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.hasSupport) {
      window.visualViewport.removeEventListener('resize', this.handleViewportChange);
      window.visualViewport.removeEventListener('scroll', this.handleViewportChange);
    } else if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleViewportChange);
    }

    if (typeof document !== 'undefined') {
      document.removeEventListener('focusin', this.handleFocusIn);
    }

    this.listeners.clear();
    VisualViewportController.#instance = null;
  }
}

export const visualViewportController = VisualViewportController.getInstance();

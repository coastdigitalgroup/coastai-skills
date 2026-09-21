/**
 * InertSubtreeManager - Reusable state controller for managing DOM subtree inertness,
 * cascading overlay reference counts, and focus restoration across UI components.
 */
export class InertSubtreeManager {
  /**
   * @param {Object} options - Configuration options
   * @param {string} [options.focusableSelector] - Custom selector for auto-focusing elements
   */
  constructor(options = {}) {
    /** @type {Map<HTMLElement, number>} Tracks active overlay depth per root element */
    this.inertCounts = new Map();

    /** @type {HTMLElement[]} Stack of previously focused elements prior to isolation */
    this.focusStack = [];

    this.focusableSelector = options.focusableSelector || [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ].join(', ');
  }

  /**
   * Renders background target subtrees inert and shifts focus into an active container.
   * Handles reference counting for cascading overlays.
   *
   * @param {HTMLElement|HTMLElement[]|NodeList} targetSubtrees - Elements to render inert
   * @param {HTMLElement} [activeContainer] - The active overlay container receiving focus
   * @returns {boolean} True if isolation succeeded
   */
  isolate(targetSubtrees, activeContainer = null) {
    const targets = this._normalizeElements(targetSubtrees);
    if (!targets.length) return false;

    // Capture current active focus element before making background inert
    if (document.activeElement && document.activeElement !== document.body) {
      this.focusStack.push(document.activeElement);
    }

    // Increment inert reference count and set inert = true
    targets.forEach(el => {
      const currentCount = this.inertCounts.get(el) || 0;
      this.inertCounts.set(el, currentCount + 1);
      el.inert = true;
    });

    // Ensure active container remains non-inert and receive focus
    if (activeContainer) {
      activeContainer.inert = false;
      this._focusFirstElement(activeContainer);
    }

    return true;
  }

  /**
   * Decrements inert reference count on target subtrees. Removes inert attribute
   * when reference count reaches zero and restores focus to previous trigger.
   *
   * @param {HTMLElement|HTMLElement[]|NodeList} targetSubtrees - Elements to release
   * @param {boolean} [restoreFocus=true] - Whether to restore focus to saved trigger
   * @returns {boolean} True if restoration succeeded
   */
  restore(targetSubtrees, restoreFocus = true) {
    const targets = this._normalizeElements(targetSubtrees);
    if (!targets.length) return false;

    // Decrement reference counts
    targets.forEach(el => {
      const currentCount = this.inertCounts.get(el) || 0;
      const newCount = Math.max(0, currentCount - 1);
      this.inertCounts.set(el, newCount);

      if (newCount === 0) {
        el.inert = false;
      }
    });

    // Restore focus if requested and available in stack
    if (restoreFocus && this.focusStack.length > 0) {
      const targetFocusEl = this.focusStack.pop();
      if (targetFocusEl && document.contains(targetFocusEl) && typeof targetFocusEl.focus === 'function') {
        // Use requestAnimationFrame to ensure DOM rendering updates prior to focus
        requestAnimationFrame(() => {
          targetFocusEl.focus();
        });
      }
    }

    return true;
  }

  /**
   * Forces clean removal of inert state from all tracked elements and resets focus stack.
   */
  reset() {
    this.inertCounts.forEach((count, el) => {
      if (el && document.contains(el)) {
        el.inert = false;
      }
    });
    this.inertCounts.clear();
    this.focusStack = [];
  }

  /**
   * Helper to normalize single HTMLElement, Array, or NodeList into an Array.
   * @private
   */
  _normalizeElements(elements) {
    if (!elements) return [];
    if (elements instanceof HTMLElement) return [elements];
    if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
      return Array.from(elements).filter(el => el instanceof HTMLElement);
    }
    return [];
  }

  /**
   * Shifts focus to the first focusable control inside container, or container itself.
   * @private
   */
  _focusFirstElement(container) {
    if (!container) return;
    const focusable = container.querySelector(this.focusableSelector);
    if (focusable && typeof focusable.focus === 'function') {
      focusable.focus();
    } else {
      if (!container.hasAttribute('tabindex')) {
        container.setAttribute('tabindex', '-1');
      }
      container.focus();
    }
  }
}

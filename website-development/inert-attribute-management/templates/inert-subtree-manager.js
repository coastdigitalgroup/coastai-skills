/**
 * InertSubtreeManager - Reusable Stack-Aware Subtree Interactivity Controller
 *
 * Manages the native HTML `inert` attribute across overlapping UI overlays,
 * sliding drawers, multi-step wizards, and popups using reference counting.
 * Prevents background restoration races when multiple overlays are open concurrently.
 */
export class InertSubtreeManager {
  /**
   * @param {Object} [options]
   * @param {boolean} [options.autoFocus=true] - Automatically manage focus shift and restoration
   * @param {string} [options.inertClass='is-inert'] - Optional CSS fallback class
   */
  constructor(options = {}) {
    this.options = {
      autoFocus: true,
      inertClass: 'is-inert',
      ...options,
    };

    /** @type {Map<HTMLElement, { count: number, originalInert: boolean }>} */
    this.elementMap = new Map();

    /** @type {Map<string, { elements: HTMLElement[], previousFocus: HTMLElement | null }>} */
    this.ownerMap = new Map();
  }

  /**
   * Isolates one or more DOM subtrees under a specific owner ID.
   * Increments reference counts on target elements and sets `element.inert = true`.
   *
   * @param {HTMLElement | HTMLElement[] | NodeList | string} targets - Element(s) or selector to make inert
   * @param {string} ownerId - Unique identifier for the requesting component (e.g., 'cart-drawer-1')
   * @returns {boolean} True if isolation succeeded
   */
  isolate(targets, ownerId) {
    if (!ownerId) {
      console.warn('[InertSubtreeManager] An ownerId is required to track subtree isolation.');
      return false;
    }

    const elements = this._resolveElements(targets);
    if (elements.length === 0) return false;

    // Capture currently focused element if autoFocus is enabled
    const previousFocus = this.options.autoFocus ? /** @type {HTMLElement} */ (document.activeElement) : null;

    // Store owner tracking record
    this.ownerMap.set(ownerId, { elements, previousFocus });

    elements.forEach((el) => {
      let record = this.elementMap.get(el);

      if (!record) {
        record = {
          count: 0,
          originalInert: el.inert || el.hasAttribute('inert'),
        };
        this.elementMap.set(el, record);
      }

      record.count += 1;

      // Apply inert attribute and class
      el.inert = true;
      if (this.options.inertClass) {
        el.classList.add(this.options.inertClass);
      }
    });

    return true;
  }

  /**
   * Restores interactivity for subtrees isolated under the given owner ID.
   * Decrements reference counts and removes `inert` when reference count reaches 0.
   *
   * @param {string} ownerId - Unique identifier used during `isolate()`
   * @returns {boolean} True if restoration succeeded
   */
  restore(ownerId) {
    const ownerRecord = this.ownerMap.get(ownerId);
    if (!ownerRecord) return false;

    const { elements, previousFocus } = ownerRecord;

    elements.forEach((el) => {
      const record = this.elementMap.get(el);
      if (!record) return;

      record.count = Math.max(0, record.count - 1);

      if (record.count === 0) {
        // Restore to original inert state (usually false)
        el.inert = record.originalInert;
        if (this.options.inertClass && !record.originalInert) {
          el.classList.remove(this.options.inertClass);
        }
        this.elementMap.delete(el);
      }
    });

    this.ownerMap.delete(ownerId);

    // Restore focus if configured and target element is still connected
    if (this.options.autoFocus && previousFocus && typeof previousFocus.focus === 'function' && document.contains(previousFocus)) {
      try {
        previousFocus.focus();
      } catch (e) {
        // Ignore focus errors if element became un-focusable
      }
    }

    return true;
  }

  /**
   * Checks if an element is currently marked inert by this manager.
   *
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  isIsolated(element) {
    const record = this.elementMap.get(element);
    return Boolean(record && record.count > 0);
  }

  /**
   * Clears all managed inert states and restores all elements to their original state.
   */
  clearAll() {
    this.ownerMap.forEach((_, ownerId) => {
      this.restore(ownerId);
    });
    this.elementMap.clear();
    this.ownerMap.clear();
  }

  /**
   * Helper to resolve various element input formats into an array of HTMLElements.
   * @private
   * @param {HTMLElement | HTMLElement[] | NodeList | string} targets
   * @returns {HTMLElement[]}
   */
  _resolveElements(targets) {
    if (typeof targets === 'string') {
      return Array.from(document.querySelectorAll(targets));
    }
    if (targets instanceof HTMLElement) {
      return [targets];
    }
    if (targets instanceof NodeList || Array.isArray(targets)) {
      return Array.from(targets).filter((node) => node instanceof HTMLElement);
    }
    return [];
  }
}

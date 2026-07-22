/**
 * FocusTrap - A lightweight, robust, and accessible focus trapping utility.
 *
 * This class traps keyboard focus within a specified container, ensuring that
 * Tab and Shift+Tab key presses stay within the boundaries of the container.
 * It is fully WCAG-compliant, supporting focus restoration, Escape key close,
 * click-outside dismissals, and dynamic content updates.
 *
 * @example
 * const modalTrap = new FocusTrap(document.getElementById('my-modal'), {
 *   onDeactivate: () => closeModal(),
 *   closeOnEscape: true,
 *   closeOnClickOutside: true
 * });
 *
 * // When opening modal:
 * modalTrap.activate();
 *
 * // When closing modal:
 * modalTrap.deactivate();
 */
export class FocusTrap {
  /**
   * Comprehensive list of CSS selectors matching natively focusable and keyboard-navigable elements.
   */
  static FOCUSABLE_SELECTOR = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex]:not([tabindex^="-"]):not([disabled])',
    '[contenteditable]'
  ].join(',');

  /**
   * Create a focus trap instance.
   * @param {HTMLElement} container - Sibling container where focus should be trapped.
   * @param {Object} [options] - Focus trap configuration options.
   * @param {boolean} [options.closeOnEscape=true] - Deactivate when Escape key is pressed.
   * @param {boolean} [options.closeOnClickOutside=false] - Deactivate when a click occurs outside the container.
   * @param {HTMLElement} [options.initialFocus] - Specific element inside the container to focus first. If omitted, focuses the first focusable element.
   * @param {Function} [options.onDeactivate] - Callback function executed upon deactivation.
   */
  constructor(container, options = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError('FocusTrap expects a valid HTMLElement container.');
    }

    this.container = container;
    this.options = {
      closeOnEscape: true,
      closeOnClickOutside: false,
      initialFocus: null,
      onDeactivate: null,
      ...options
    };

    this.isActive = false;
    this.previouslyFocusedElement = null;

    // Bind event handlers for listener persistence
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleClickOutside = this._handleClickOutside.bind(this);
  }

  /**
   * Query and filter all focusable elements inside the container that are currently visible.
   * This is computed dynamically on each traversal to support dynamically added or toggled content.
   * @returns {HTMLElement[]} List of visible focusable elements.
   */
  getFocusableElements() {
    const rawElements = Array.from(this.container.querySelectorAll(FocusTrap.FOCUSABLE_SELECTOR));

    return rawElements.filter(el => {
      // Basic visibility checks
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }

      // Check offset dimensions to filter out hidden elements
      // (Unless it's an SVG or inline element where offsetWidth is 0 but it's focusable)
      const hasDimensions = el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
      if (!hasDimensions && el.tagName !== 'SVG') {
        return false;
      }

      // Check if any ancestor is hidden or aria-hidden
      let parent = el.parentElement;
      while (parent && parent !== this.container) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.display === 'none' || parentStyle.visibility === 'hidden' || parent.getAttribute('aria-hidden') === 'true') {
          return false;
        }
        parent = parent.parentElement;
      }

      return true;
    });
  }

  /**
   * Activate the focus trap, store the previous focused element, and direct focus inside.
   */
  activate() {
    if (this.isActive) return;

    // Capture the element that was focused prior to activation for focus restoration
    this.previouslyFocusedElement = document.activeElement;
    this.isActive = true;

    // Attach interaction event listeners
    document.addEventListener('keydown', this._handleKeyDown, true);
    if (this.options.closeOnClickOutside) {
      document.addEventListener('mousedown', this._handleClickOutside, true);
    }

    // Set initial focus
    this.focusInitialElement();
  }

  /**
   * Deactivate the focus trap, clean up event listeners, and restore focus to the originating element.
   */
  deactivate() {
    if (!this.isActive) return;

    this.isActive = false;

    // Remove event listeners
    document.removeEventListener('keydown', this._handleKeyDown, true);
    document.removeEventListener('mousedown', this._handleClickOutside, true);

    // Execute deactivation callback if provided
    if (typeof this.options.onDeactivate === 'function') {
      this.options.onDeactivate();
    }

    // Restore focus to original triggering element
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      this.previouslyFocusedElement.focus();
    }

    this.previouslyFocusedElement = null;
  }

  /**
   * Set focus to the designated initial element, first focusable item, or the container itself.
   */
  focusInitialElement() {
    // 1. Try explicit initial focus option
    if (this.options.initialFocus && typeof this.options.initialFocus.focus === 'function') {
      this.options.initialFocus.focus();
      return;
    }

    // 2. Fall back to the first visible focusable element inside the container
    const focusable = this.getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      // 3. If no focusable elements are found, focus the container container itself (ensure it has tabindex="-1")
      if (!this.container.hasAttribute('tabindex')) {
        this.container.setAttribute('tabindex', '-1');
      }
      this.container.focus();
    }
  }

  /**
   * Keydown event handler capturing Tab and Escape key events.
   * @private
   */
  _handleKeyDown(event) {
    if (!this.isActive) return;

    // Handle Escape key close
    if (this.options.closeOnEscape && event.key === 'Escape') {
      event.preventDefault();
      this.deactivate();
      return;
    }

    // Handle Tab traversal
    if (event.key === 'Tab') {
      const focusableElements = this.getFocusableElements();

      // Case 1: No focusable elements
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Case 2: Only one focusable element (lock focus)
      if (focusableElements.length === 1) {
        event.preventDefault();
        if (activeElement !== firstElement) {
          firstElement.focus();
        }
        return;
      }

      // Case 3: Shift + Tab (navigating backwards)
      if (event.shiftKey) {
        if (activeElement === firstElement || !this.container.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      }
      // Case 4: Tab (navigating forwards)
      else {
        if (activeElement === lastElement || !this.container.contains(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  /**
   * Mouse down event handler to close the trap when clicking outside.
   * @private
   */
  _handleClickOutside(event) {
    if (!this.isActive) return;

    // If the click occurs outside the target container, deactivate the trap
    if (!this.container.contains(event.target)) {
      this.deactivate();
    }
  }
}

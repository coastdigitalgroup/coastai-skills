/**
 * Reusable High-Performance Virtual List Controller
 *
 * Implements a high-performance, accessible, memory-stable virtual list
 * using Vanilla JavaScript. Supports fixed heights, off-screen buffering,
 * roving tabindex, arrow key navigation, and correct ARIA attribute mapping.
 */
class VirtualList {
  /**
   * @param {Object} config
   * @param {HTMLElement} config.viewport - The scrollable outer container (overflow: auto).
   * @param {HTMLElement} config.spacer - The runway element inside the viewport to set scroll height.
   * @param {HTMLElement} config.container - The content holder that active items render into.
   * @param {number} config.totalItems - The total number of items in the simulated list.
   * @param {number} config.itemHeight - The fixed height of each item in pixels.
   * @param {number} [config.buffer=3] - Number of extra items to render above/below the viewport.
   * @param {function(number, HTMLElement): HTMLElement} config.renderItem - Callback returning an item element for index.
   */
  constructor(config) {
    this.viewport = config.viewport;
    this.spacer = config.spacer;
    this.container = config.container;
    this.totalItems = config.totalItems;
    this.itemHeight = config.itemHeight;
    this.buffer = config.buffer !== undefined ? config.buffer : 3;
    this.renderItem = config.renderItem;

    // Internal state
    this.scrollTop = 0;
    this.viewportHeight = 0;
    this.renderedRange = { start: -1, end: -1 };
    this.activeElements = new Map(); // Index -> HTMLElement
    this.focusedIndex = 0; // Tracks roving tabindex index
    this.tick = false;

    this.init();
  }

  /**
   * Initialize DOM attributes, event listeners, and initial render
   */
  init() {
    // 1. Establish layout styles and ARIA roles
    this.viewport.style.position = 'relative';
    this.viewport.style.overflowY = 'auto';
    this.viewport.setAttribute('role', 'list');
    this.viewport.setAttribute('aria-label', 'Virtualized list');

    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.willChange = 'transform';

    // 2. Adjust total simulated height
    this.updateSpacerHeight();

    // 3. Attach passive scroll listener for maximum frame rate
    this.viewport.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // 4. Track viewport resizing via ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.viewport);

    // 5. Setup keyboard event listeners
    this.viewport.addEventListener('keydown', this.handleKeyDown.bind(this));

    // Initial measurement and rendering
    this.measureViewport();
    this.render(true);
  }

  /**
   * Measure viewport dimensions
   */
  measureViewport() {
    this.viewportHeight = this.viewport.clientHeight;
  }

  /**
   * Set total scrollable spacer height
   */
  updateSpacerHeight() {
    const totalHeight = this.totalItems * this.itemHeight;
    this.spacer.style.height = `${totalHeight}px`;
    this.spacer.style.width = '1px';
    this.spacer.style.position = 'absolute';
    this.spacer.style.top = '0';
    this.spacer.style.left = '0';
  }

  /**
   * Passive scroll handler
   */
  handleScroll() {
    this.scrollTop = this.viewport.scrollTop;
    if (!this.tick) {
      requestAnimationFrame(() => {
        this.render();
        this.tick = false;
      });
      this.tick = true;
    }
  }

  /**
   * Viewport resize handler
   */
  handleResize() {
    this.measureViewport();
    this.render(true);
  }

  /**
   * Compute range indices to render
   * @returns {{start: number, end: number}}
   */
  calculateRange() {
    const firstVisible = Math.max(0, Math.floor(this.scrollTop / this.itemHeight));
    const lastVisible = Math.min(
      this.totalItems - 1,
      Math.floor((this.scrollTop + this.viewportHeight) / this.itemHeight)
    );

    const start = Math.max(0, firstVisible - this.buffer);
    const end = Math.min(this.totalItems - 1, lastVisible + this.buffer);

    return { start, end };
  }

  /**
   * Primary virtual render cycle
   * @param {boolean} [force=false] - If true, bypasses the range optimization check and forces update
   */
  render(force = false) {
    const { start, end } = this.calculateRange();

    // Skip updates if the computed range hasn't shifted
    if (!force && start === this.renderedRange.start && end === this.renderedRange.end) {
      return;
    }

    // Indices that should remain rendered
    const activeIndices = new Set();
    for (let i = start; i <= end; i++) {
      activeIndices.add(i);
    }

    // 1. Remove elements that have scrolled outside our buffer range
    for (const [index, element] of this.activeElements.entries()) {
      if (!activeIndices.has(index)) {
        // If we are destroying the element that currently holds focus,
        // safely pass focus to the wrapper to prevent loss of focus sequences.
        if (document.activeElement === element) {
          this.viewport.focus({ preventScroll: true });
        }
        element.remove();
        this.activeElements.delete(index);
      }
    }

    // 2. Render new elements entering the viewport/buffer range
    for (let i = start; i <= end; i++) {
      let element = this.activeElements.get(i);

      if (!element) {
        element = this.renderItem(i, this.container);
        element.style.position = 'absolute';
        element.style.top = '0';
        element.style.left = '0';
        element.style.width = '100%';
        element.style.height = `${this.itemHeight}px`;
        element.style.transform = `translateY(${i * this.itemHeight}px)`;

        // Setup accessibility attributes
        element.setAttribute('role', 'listitem');
        element.setAttribute('aria-setsize', this.totalItems.toString());
        element.setAttribute('aria-posinset', (i + 1).toString());

        // Manage Roving Tabindex
        element.setAttribute('tabindex', i === this.focusedIndex ? '0' : '-1');

        this.container.appendChild(element);
        this.activeElements.set(i, element);
      } else if (force) {
        // Update styling if a layout recalculation is forced
        element.style.transform = `translateY(${i * this.itemHeight}px)`;
        element.setAttribute('tabindex', i === this.focusedIndex ? '0' : '-1');
      }
    }

    this.renderedRange = { start, end };
  }

  /**
   * Move visual and structural keyboard focus
   * @param {number} nextIndex
   */
  focusItem(nextIndex) {
    if (nextIndex < 0 || nextIndex >= this.totalItems) return;

    // Reset old focus element tabindex
    const prevFocusedElement = this.activeElements.get(this.focusedIndex);
    if (prevFocusedElement) {
      prevFocusedElement.setAttribute('tabindex', '-1');
    }

    this.focusedIndex = nextIndex;

    // If target item is outside the rendered buffer, scroll it into view
    const itemOffsetTop = nextIndex * this.itemHeight;
    const isUnderflow = itemOffsetTop < this.viewport.scrollTop;
    const isOverflow = itemOffsetTop + this.itemHeight > this.viewport.scrollTop + this.viewportHeight;

    if (isUnderflow || isOverflow) {
      // Adjust scroll position to reveal the item
      if (isUnderflow) {
        this.viewport.scrollTop = itemOffsetTop;
      } else {
        this.viewport.scrollTop = itemOffsetTop + this.itemHeight - this.viewportHeight;
      }
      // Force instant render to construct the target node in the same thread cycle
      this.render(true);
    }

    // Focus the target DOM node
    const nextFocusedElement = this.activeElements.get(this.focusedIndex);
    if (nextFocusedElement) {
      nextFocusedElement.setAttribute('tabindex', '0');
      nextFocusedElement.focus();
    }
  }

  /**
   * Keyboard arrow-navigation handlers
   * @param {KeyboardEvent} e
   */
  handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.focusItem(this.focusedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.focusItem(this.focusedIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.focusItem(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.focusItem(this.totalItems - 1);
    }
  }

  /**
   * Dynamically update total item count
   * @param {number} newCount
   */
  updateTotalItems(newCount) {
    this.totalItems = newCount;
    this.focusedIndex = Math.min(this.focusedIndex, this.totalItems - 1);
    this.updateSpacerHeight();
    this.render(true);
  }

  /**
   * Tear down observers and listeners to prevent memory leaks
   */
  destroy() {
    this.viewport.removeEventListener('scroll', this.handleScroll);
    this.viewport.removeEventListener('keydown', this.handleKeyDown);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.activeElements.clear();
    this.container.innerHTML = '';
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VirtualList;
}

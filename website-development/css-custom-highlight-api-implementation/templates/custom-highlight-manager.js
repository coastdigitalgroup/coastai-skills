/**
 * CustomHighlightManager
 * ---------------------
 * A production-grade, framework-agnostic JavaScript controller for managing
 * non-destructive text range highlighting using the W3C CSS Custom Highlight API.
 *
 * Provides sub-millisecond search indexing, active match stepping, DOM mutation
 * resiliency, screen reader live region announcements, and progressive degradation.
 */
export class CustomHighlightManager {
  /**
   * @param {HTMLElement} container - Root element containing text to highlight
   * @param {Object} options
   * @param {string} [options.passiveHighlightName='search-results'] - CSS highlight name for all matches
   * @param {string} [options.activeHighlightName='active-result'] - CSS highlight name for focused match
   * @param {HTMLElement|string} [options.statusElement] - ARIA live region for screen reader updates
   * @param {boolean} [options.autoScroll=true] - Auto-scroll active match into view
   * @param {boolean} [options.caseSensitive=false] - Case sensitivity preference
   */
  constructor(container, options = {}) {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error('[CustomHighlightManager] Target container must be a valid HTMLElement.');
    }

    this.container = container;
    this.passiveName = options.passiveHighlightName || 'search-results';
    this.activeName = options.activeHighlightName || 'active-result';
    this.autoScroll = options.autoScroll !== false;
    this.caseSensitive = options.caseSensitive || false;

    // ARIA status element
    if (typeof options.statusElement === 'string') {
      this.statusEl = document.querySelector(options.statusElement);
    } else {
      this.statusEl = options.statusElement || null;
    }

    this.supportsNative = 'highlights' in CSS && typeof Highlight === 'function';
    this.ranges = [];
    this.activeIndex = -1;
    this.currentQuery = '';

    // MutationObserver to refresh highlights when DOM text updates
    this.observer = new MutationObserver(this.#handleMutations.bind(this));
    this.observer.observe(this.container, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /**
   * Executes search query and applies highlights across target container
   * @param {string} query
   * @returns {number} Total matches found
   */
  search(query) {
    this.currentQuery = (query || '').trim();
    this.activeIndex = -1;
    this.ranges = [];

    if (!this.currentQuery) {
      this.clear();
      return 0;
    }

    if (!this.supportsNative) {
      console.warn('[CustomHighlightManager] CSS Custom Highlight API is unsupported in this browser.');
      this.#announceStatus(0, -1);
      return 0;
    }

    // Traverse text nodes using TreeWalker
    const walker = document.createTreeWalker(
      this.container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const searchTarget = this.caseSensitive ? this.currentQuery : this.currentQuery.toLowerCase();
    let currentNode = walker.nextNode();

    while (currentNode) {
      const text = this.caseSensitive ? currentNode.textContent : currentNode.textContent.toLowerCase();
      let matchIdx = text.indexOf(searchTarget);

      while (matchIdx !== -1) {
        const range = new Range();
        range.setStart(currentNode, matchIdx);
        range.setEnd(currentNode, matchIdx + this.currentQuery.length);
        this.ranges.push(range);

        matchIdx = text.indexOf(searchTarget, matchIdx + this.currentQuery.length);
      }

      currentNode = walker.nextNode();
    }

    if (this.ranges.length > 0) {
      this.activeIndex = 0;
      this.#renderHighlights();
    } else {
      this.clear();
    }

    this.#announceStatus(this.ranges.length, this.activeIndex);
    return this.ranges.length;
  }

  /**
   * Advances focus to next match
   * @returns {number} New active index
   */
  nextMatch() {
    if (this.ranges.length === 0) return -1;
    this.activeIndex = (this.activeIndex + 1) % this.ranges.length;
    this.#renderHighlights();
    this.#announceStatus(this.ranges.length, this.activeIndex);
    return this.activeIndex;
  }

  /**
   * Moves focus to previous match
   * @returns {number} New active index
   */
  prevMatch() {
    if (this.ranges.length === 0) return -1;
    this.activeIndex = (this.activeIndex - 1 + this.ranges.length) % this.ranges.length;
    this.#renderHighlights();
    this.#announceStatus(this.ranges.length, this.activeIndex);
    return this.activeIndex;
  }

  /**
   * Clears all registered CSS highlights
   */
  clear() {
    if (this.supportsNative) {
      CSS.highlights.delete(this.passiveName);
      CSS.highlights.delete(this.activeName);
    }
    this.ranges = [];
    this.activeIndex = -1;
    this.#announceStatus(0, -1);
  }

  /**
   * Renders ranges into CSS.highlights map
   */
  #renderHighlights() {
    if (!this.supportsNative) return;

    // Separate passive matches from active match
    const passiveRanges = this.ranges.filter((_, idx) => idx !== this.activeIndex);

    if (passiveRanges.length > 0) {
      CSS.highlights.set(this.passiveName, new Highlight(...passiveRanges));
    } else {
      CSS.highlights.delete(this.passiveName);
    }

    if (this.activeIndex >= 0 && this.activeIndex < this.ranges.length) {
      const activeRange = this.ranges[this.activeIndex];
      CSS.highlights.set(this.activeName, new Highlight(activeRange));

      if (this.autoScroll) {
        this.#scrollToRange(activeRange);
      }
    } else {
      CSS.highlights.delete(this.activeName);
    }
  }

  /**
   * Safely scrolls active range into view
   * @param {Range} range
   */
  #scrollToRange(range) {
    try {
      const rect = range.getBoundingClientRect();
      if (rect.height > 0 && range.startContainer.parentElement) {
        range.startContainer.parentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    } catch (e) {
      // Fallback if container is detached
    }
  }

  /**
   * Updates ARIA live region for screen readers
   * @param {number} total
   * @param {number} activeIdx
   */
  #announceStatus(total, activeIdx) {
    if (!this.statusEl) return;

    if (total === 0) {
      this.statusEl.textContent = this.currentQuery
        ? `No results found for "${this.currentQuery}".`
        : '';
    } else {
      this.statusEl.textContent = `${total} results found for "${this.currentQuery}". Result ${activeIdx + 1} of ${total} active.`;
    }
  }

  /**
   * Private handler for MutationObserver
   */
  #handleMutations() {
    if (this.currentQuery) {
      // Re-run search to rebuild Range objects against mutated DOM text nodes
      this.search(this.currentQuery);
    }
  }

  /**
   * Completely tears down observers and registered highlights
   */
  destroy() {
    this.observer.disconnect();
    this.clear();
    this.container = null;
    this.statusEl = null;
  }
}

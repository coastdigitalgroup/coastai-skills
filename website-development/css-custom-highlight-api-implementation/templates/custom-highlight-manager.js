/**
 * CustomHighlightManager
 *
 * A production-grade, zero-dependency JavaScript controller for managing
 * high-performance, non-destructive text highlights using the W3C CSS Custom
 * Highlight API (CSS.highlights, Highlight, Range, ::highlight()).
 *
 * Includes automatic MutationObserver DOM sync, ARIA live region screen reader
 * announcements, active match scrolling, and legacy fallback support.
 */

export class CustomHighlightManager {
  /**
   * @param {HTMLElement} container - The DOM root element to search/highlight within.
   * @param {Object} options - Configuration options.
   * @param {boolean} [options.autoSyncMutations=true] - Recalculate ranges when container DOM mutates.
   * @param {HTMLElement|string} [options.liveRegion] - Element or selector for ARIA screen reader announcements.
   * @param {string} [options.fallbackClass='custom-highlight-fallback'] - Class for legacy fallback elements.
   */
  constructor(container, options = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('CustomHighlightManager requires a valid HTMLElement container.');
    }

    this.container = container;
    this.options = {
      autoSyncMutations: true,
      liveRegion: null,
      fallbackClass: 'custom-highlight-fallback',
      ...options
    };

    this.isSupported = typeof CSS !== 'undefined' && 'highlights' in CSS;
    this.highlightsMap = new Map(); // Stores { name: { query, ranges, activeIndex } }
    this.observer = null;

    this.initLiveRegion();

    if (this.options.autoSyncMutations) {
      this.initMutationObserver();
    }
  }

  /**
   * Initializes or locates the ARIA live region for screen reader announcements.
   * @private
   */
  initLiveRegion() {
    if (typeof this.options.liveRegion === 'string') {
      this.liveRegionEl = document.querySelector(this.options.liveRegion);
    } else if (this.options.liveRegion instanceof HTMLElement) {
      this.liveRegionEl = this.options.liveRegion;
    } else {
      // Auto-create visually hidden live region
      let el = document.getElementById('chm-live-region');
      if (!el) {
        el = document.createElement('div');
        el.id = 'chm-live-region';
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-atomic', 'true');
        el.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
        document.body.appendChild(el);
      }
      this.liveRegionEl = el;
    }
  }

  /**
   * Listens to DOM changes to automatically recompute ranges if text changes.
   * @private
   */
  initMutationObserver() {
    this.observer = new MutationObserver(() => {
      this.recomputeAll();
    });

    this.observer.observe(this.container, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  /**
   * Finds all text node Range instances matching a query string inside the container.
   * @param {string} query
   * @param {boolean} [caseSensitive=false]
   * @returns {Range[]}
   */
  findTextRanges(query, caseSensitive = false) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }

    const ranges = [];
    const searchQuery = caseSensitive ? query : query.toLowerCase();

    const treeWalker = document.createTreeWalker(
      this.container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent.trim().length > 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
      }
    );

    let currentNode = treeWalker.nextNode();
    while (currentNode) {
      const text = currentNode.textContent;
      const compareText = caseSensitive ? text : text.toLowerCase();
      let startIndex = 0;

      while ((startIndex = compareText.indexOf(searchQuery, startIndex)) !== -1) {
        const range = new Range();
        range.setStart(currentNode, startIndex);
        range.setEnd(currentNode, startIndex + query.length);
        ranges.push(range);

        startIndex += query.length;
      }

      currentNode = treeWalker.nextNode();
    }

    return ranges;
  }

  /**
   * Highlights occurrences of a query string under a named highlight registration.
   * @param {string} name - The highlight name (must match ::highlight(name) in CSS).
   * @param {string} query - Text to search and highlight.
   * @param {Object} [config]
   * @param {boolean} [config.caseSensitive=false]
   * @param {boolean} [config.announce=true] - Announce match count to screen readers.
   * @returns {number} The total count of matched ranges.
   */
  highlight(name, query, config = {}) {
    const { caseSensitive = false, announce = true } = config;

    if (!query || query.trim() === '') {
      this.clear(name);
      return 0;
    }

    const ranges = this.findTextRanges(query, caseSensitive);

    if (this.isSupported) {
      if (ranges.length > 0) {
        const highlightObj = new Highlight(...ranges);
        CSS.highlights.set(name, highlightObj);
      } else {
        CSS.highlights.delete(name);
      }
    } else {
      this.applyFallback(name, ranges);
    }

    this.highlightsMap.set(name, {
      query,
      ranges,
      caseSensitive,
      activeIndex: ranges.length > 0 ? 0 : -1
    });

    if (announce && this.liveRegionEl) {
      this.liveRegionEl.textContent = `${ranges.length} match${ranges.length === 1 ? '' : 'es'} found for "${query}"`;
    }

    return ranges.length;
  }

  /**
   * Sets and focuses the active match range within a named highlight set.
   * @param {string} name - The highlight set name.
   * @param {number} index - Match index to focus.
   * @param {string} [activeHighlightName='search-active'] - CSS highlight name for active item.
   * @returns {Range|null}
   */
  setActiveMatch(name, index, activeHighlightName = 'search-active') {
    const entry = this.highlightsMap.get(name);
    if (!entry || entry.ranges.length === 0) return null;

    const total = entry.ranges.length;
    const clampedIndex = ((index % total) + total) % total;
    entry.activeIndex = clampedIndex;

    const activeRange = entry.ranges[clampedIndex];

    if (this.isSupported) {
      const activeHighlight = new Highlight(activeRange);
      CSS.highlights.set(activeHighlightName, activeHighlight);
    }

    // Smooth scroll active match into view
    const parentEl = activeRange.startContainer.parentElement;
    if (parentEl && typeof parentEl.scrollIntoView === 'function') {
      parentEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }

    if (this.liveRegionEl) {
      this.liveRegionEl.textContent = `Match ${clampedIndex + 1} of ${total} focused`;
    }

    return activeRange;
  }

  /**
   * Legacy browser fallback: wraps ranges in temporary <mark> elements.
   * @private
   */
  applyFallback(name, ranges) {
    this.clearFallback(name);

    ranges.forEach((range) => {
      try {
        const mark = document.createElement('mark');
        mark.className = `${this.options.fallbackClass} ${this.options.fallbackClass}-${name}`;
        range.surroundContents(mark);
      } catch (e) {
        // Handle cross-node boundary ranges gracefully in fallback mode
        console.warn('Fallback surroundContents skipped for complex range:', e);
      }
    });
  }

  /**
   * Clears legacy fallback elements for a given highlight name.
   * @private
   */
  clearFallback(name) {
    const selector = `mark.${this.options.fallbackClass}-${name}`;
    const marks = this.container.querySelectorAll(selector);

    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize(); // Rejoin adjacent text nodes
    });
  }

  /**
   * Clears a registered highlight set by name.
   * @param {string} name
   */
  clear(name) {
    if (this.isSupported) {
      CSS.highlights.delete(name);
      CSS.highlights.delete(`${name}-active`);
    } else {
      this.clearFallback(name);
    }

    this.highlightsMap.delete(name);

    if (this.liveRegionEl) {
      this.liveRegionEl.textContent = `Highlights cleared for ${name}`;
    }
  }

  /**
   * Clears all registered highlights managed by this instance.
   */
  clearAll() {
    for (const name of this.highlightsMap.keys()) {
      this.clear(name);
    }
  }

  /**
   * Recomputes all active highlight queries against current container DOM state.
   */
  recomputeAll() {
    for (const [name, entry] of this.highlightsMap.entries()) {
      this.highlight(name, entry.query, {
        caseSensitive: entry.caseSensitive,
        announce: false
      });
      if (entry.activeIndex !== -1) {
        this.setActiveMatch(name, entry.activeIndex);
      }
    }
  }

  /**
   * Destroys the highlight manager instance and clears all observer listeners.
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.clearAll();

    if (this.liveRegionEl && this.liveRegionEl.id === 'chm-live-region') {
      this.liveRegionEl.remove();
    }
  }
}

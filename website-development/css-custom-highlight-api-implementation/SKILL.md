---
name: css-custom-highlight-api-implementation
description: High-performance, non-destructive text range highlighting using W3C CSS Custom Highlight API (CSS.highlights, Highlight, Range, ::highlight()) without DOM mutation or layout thrashing.
---

# CSS Custom Highlight API Implementation

## Purpose

The CSS Custom Highlight API Implementation skill provides a production-grade framework, JavaScript controller, and progressive enhancement architecture for styling arbitrary text ranges on the web using the W3C CSS Custom Highlight API (`CSS.highlights`, `Highlight`, `Range`, and `::highlight()`).

Traditionally, highlighting text ranges in web applications (for in-page search matching, multi-term query highlighting, user text annotations, code syntax highlighting, or find-and-replace) required modifying the DOM tree—splitting text nodes and inserting wrapper tags like `<mark>` or `<span class="highlight">`. This destructive legacy approach causes severe performance bottlenecks:
- **Layout Thrashing & Reflows:** Mutating DOM nodes in large documents triggers expensive layout recalculations and style invalidations.
- **Selection & Caret Loss:** Inserting DOM elements inside editable regions (`contenteditable` or active user text selections) destroys user selection ranges and resets caret positions.
- **Accessibility & Stream Disruption:** Splitting text nodes can disrupt screen readers, leading to fragmented word pronunciation and broken ARIA inline relationships.
- **Memory & Garbage Collection Overhead:** Creating thousands of wrapper `<span>` elements bloats the DOM tree and increases memory consumption.

The W3C CSS Custom Highlight API decouples text range management from the DOM structure. By registering programmatic `Range` objects directly in the global `CSS.highlights` registry and styling them via CSS `::highlight(name)` pseudo-elements, highlights are painted directly during the browser's render pipeline on the compositor thread—achieving sub-millisecond, zero-reflow text highlighting across thousands of text occurrences.

---

## Use Cases

- **In-Page Search & Filter Highlighting:** Instantly highlighting search query matches across long articles, documentation pages, data tables, or logs as the user types without lag or screen flickering.
- **Multi-Term Concurrent Search:** Highlighting distinct search terms or filter keywords simultaneously with distinct custom color themes (e.g., `::highlight(search-primary)`, `::highlight(search-secondary)`).
- **Interactive Document Annotations:** Displaying user commentary, collaborative highlights, or AI-generated citation references across rich text documents without altering underlying HTML content.
- **Code Syntax Highlighting:** Applying syntax token colors (keywords, strings, comments) directly to plain-text code blocks without generating thousands of syntax `<span>` tags.
- **Active Selection & Focus Emphasis:** Temporarily highlighting active search result focus items (e.g., current match vs. secondary matches) during `Find Next` / `Find Previous` keyboard navigation.

---

## When NOT to Use

- **Persistent Interactive Elements Requiring DOM Event Listeners:** If individual highlighted phrases require direct DOM event handling (e.g., `click`, `hover` popovers with dedicated DOM elements), native CSS Custom Highlight API ranges cannot receive DOM events directly. Use interactive HTML tags (`<mark>`, `<button>`, or CSS Anchor Positioning) instead.
- **Complex Rich Text Formatting with Semantic Meaning:** Structural text changes that require semantic HTML tags (e.g., `<strong>` for strong importance, `<em>` for emphasis, `<del>` for deletion) must use proper semantic HTML tags, not CSS paint-only highlights.
- **Simple Static Text Styling:** Styling static elements or entire HTML tags that can be targeted directly with standard CSS selectors, classes, or `:nth-child()`.
- **Legacy Browsers Without JS Polyfills:** Projects supporting ancient legacy browsers (e.g., IE11 or pre-2023 browser engines) where client-side JavaScript execution is restricted and polyfilling is prohibited.

---

## Inputs

1. **Target Container Element:** The root DOM element containing the text nodes to search or highlight (e.g., `document.getElementById('content-root')` or `document.body`).
2. **Search Criteria / Range Offsets:** String queries, regular expressions, or explicit text node offset pairs `(startNode, startOffset, endNode, endOffset)` representing target text ranges.
3. **Highlight Name Identifier:** A unique string name for registering the highlight group in `CSS.highlights` (e.g., `'search-results'`, `'active-match'`, `'syntax-keyword'`).
4. **CSS Highlight Rules:** Styles defined via `::highlight(<name>)` pseudo-elements in CSS controlling `color`, `background-color`, `text-decoration`, and `text-shadow`.

---

## Outputs

1. **Non-Destructive Highlight Registry:** Active `Highlight` objects registered in `CSS.highlights` referencing live DOM `Range` objects without altering `innerHTML` or text node structure.
2. **GPU-Accelerated Paint Overlay:** Visual highlight rendering applied during browser paint phases via `::highlight(name)` CSS pseudo-elements.
3. **Dynamic Highlight Management Interface:** Programmatic methods to add, update, swap, or clear highlights instantaneously without layout shifts.
4. **Progressive Fallback Pipeline:** Graceful degradation to DOM-wrapping `<mark>` elements or inline spans on legacy browser engines that lack `CSS.highlights` support.

---

## Workflow

### 1. Check Feature Support & Define CSS Highlight Styles

Define custom highlight names and their visual appearance using the `::highlight()` pseudo-element in CSS.

```css
/* Styling primary search term matches */
::highlight(search-match) {
  background-color: #fef08a; /* Tailwind yellow-200 */
  color: #854d0e;            /* Tailwind yellow-900 */
  text-decoration: underline decorative #eab308;
}

/* Styling the currently active/focused search match */
::highlight(search-active) {
  background-color: #f97316; /* Tailwind orange-500 */
  color: #ffffff;
  font-weight: bold;
}

/* Fallback class for legacy browsers */
mark.fallback-highlight {
  background-color: #fef08a;
  color: #854d0e;
}
```

---

### 2. Scan Text Nodes and Create `Range` Objects

Traverse the container's DOM tree using `TreeWalker` to extract text nodes without mutating the DOM, computing exact character offset matches.

```javascript
function findTextRanges(container, query) {
  if (!query || query.trim() === '') return [];

  const ranges = [];
  const normalizedQuery = query.toLowerCase();
  const treeWalker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip script and style tags or hidden elements
        const parentTag = node.parentElement?.tagName;
        if (parentTag === 'SCRIPT' || parentTag === 'STYLE' || parentTag === 'NOSCRIPT') {
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
    const lowerText = text.toLowerCase();
    let startIndex = 0;

    while ((startIndex = lowerText.indexOf(normalizedQuery, startIndex)) !== -1) {
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
```

---

### 3. Register Ranges in `CSS.highlights`

Instantiate a `Highlight` object with the computed ranges and assign it to `CSS.highlights` using the designated highlight name.

```javascript
function applyCustomHighlight(highlightName, ranges) {
  if (!('highlights' in CSS)) {
    console.warn('CSS Custom Highlight API not supported in this browser.');
    return false;
  }

  if (ranges.length === 0) {
    CSS.highlights.delete(highlightName);
    return true;
  }

  // Create a new Highlight instance containing all matching ranges
  const highlight = new Highlight(...ranges);

  // Register in global CSS.highlights map
  CSS.highlights.set(highlightName, highlight);
  return true;
}
```

---

### 4. Manage Active Match Focus and Dynamic Swapping

To highlight the "currently focused" search match during keyboard navigation (e.g., pressing Enter for Next Match), maintain separate highlight registrations for general matches and active matches.

```javascript
function setActiveMatch(allRanges, activeIndex) {
  if (!('highlights' in CSS)) return;

  if (activeIndex < 0 || activeIndex >= allRanges.length) {
    CSS.highlights.delete('search-active');
    return;
  }

  const activeRange = allRanges[activeIndex];
  const activeHighlight = new Highlight(activeRange);

  // Register active highlight with higher visual specificity style
  CSS.highlights.set('search-active', activeHighlight);

  // Scroll active match into view smoothly
  activeRange.startContainer.parentElement?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}
```

---

### 5. Provide Progressive Fallback for Legacy Browsers

Wrap text in temporary `<mark>` elements if `CSS.highlights` is unavailable.

```javascript
function applyHighlightWithFallback(container, query, highlightName = 'search-match') {
  const ranges = findTextRanges(container, query);

  if ('highlights' in CSS) {
    applyCustomHighlight(highlightName, ranges);
  } else {
    // Legacy fallback: DOM node wrapping
    clearLegacyFallback(container);
    ranges.forEach(range => {
      const mark = document.createElement('mark');
      mark.className = 'fallback-highlight';
      range.surroundContents(mark);
    });
  }
}
```

---

## Decision Rules

### Highlighting Strategy Selection

| Requirements / Context | Recommended Strategy | Primary Mechanism |
| :--- | :--- | :--- |
| **High-frequency search input (10,000+ words)** | Native CSS Custom Highlight API | `TreeWalker` + `CSS.highlights.set()` |
| **Multiple search terms with different colors** | Multi-named Highlights | `CSS.highlights.set('term-1', h1)`, `CSS.highlights.set('term-2', h2)` |
| **Interactive click targets on highlighted text** | DOM Wrapper Elements + CSS Custom Highlight | Hybrid: `<mark data-id="...">` or CSS Anchor Positioning |
| **Editable text regions (`contenteditable`)** | Native CSS Custom Highlight API | `CSS.highlights` preserves caret and selection |
| **Legacy browser compatibility requirement** | Feature detection with fallback | `if ('highlights' in CSS)` with graceful degradation |

---

## Constraints

- **Supported CSS Properties in `::highlight()`:** For performance and security reasons, the W3C spec limits properties customizable within `::highlight()` pseudo-elements to:
  - `color`
  - `background-color`
  - `text-decoration` (and subproperties: line, color, style, thickness)
  - `text-shadow`
  - `-webkit-text-fill-color` / `-webkit-text-stroke`
  *Layout properties (`font-size`, `margin`, `padding`, `display`, `position`) are strictly ignored to prevent layout recalculations.*
- **DOM Mutation Invalidation:** If text content inside a text node is edited or deleted, attached `Range` boundary offsets may become invalid or point to stale offsets. Listen to `MutationObserver` or input events to recalculate ranges after DOM mutations.
- **Accessibility Requirement (`aria-live`):** Because `::highlight()` operates purely in the CSS paint layer, screen readers do not automatically announce visual highlights. You MUST provide screen reader feedback (e.g., using an `aria-live="polite"` status element to announce "12 matches found for 'query'").
- **Browser Baseline:** Supported natively in Chrome 105+, Edge 105+, Safari 17.2+, and Firefox 125+. Always feature-detect using `'highlights' in CSS`.

---

## Non-Goals

- Replacing semantic HTML text markup (`<strong>`, `<em>`, `<del>`) when semantic meaning is required.
- Handling full document PDF rendering or canvas-rendered text engines.
- Implementing complex text search NLP algorithms or fuzzy matching (focus is on layout, DOM, and rendering management).

---

## Common Failure Patterns

- **Attempting Layout Styles in `::highlight()`:** Adding `font-size: 1.2em` or `padding: 4px` to `::highlight()`. The browser silently ignores layout-altering properties inside highlight pseudo-elements.
- **Not Handling Stale Ranges After DOM Edits:** Storing ranges in memory while users edit text in a contenteditable block. The ranges point to obsolete character offsets, leading to misaligned highlights.
- **Missing Screen Reader Announcements:** Highlighting search terms visually without updating an `aria-live` status element, leaving screen reader users unaware of search results.
- **Memory Leaks from Uncleared Registrations:** Calling `CSS.highlights.set()` continuously with new ranges without clearing obsolete highlight names using `CSS.highlights.delete()` or `.clear()`.
- **Breaking Range Crossing in Fallback Mode:** Calling `range.surroundContents()` in fallback mode when a range spans across multiple HTML tags, which throws a DOMException (`InvalidStateError`).

---

## Validation Steps

- [ ] **Feature Detection Check:** Verify that `'highlights' in CSS` evaluates correctly and feature detection switches cleanly between native highlight paint and legacy fallback.
- [ ] **Zero Reflow Verification:** Open DevTools Performance panel, perform a fast search on a 5,000-word document, and confirm that NO "Layout" or "Recalculate Style" events occur during highlight updates.
- [ ] **ContentEditable Caret Integrity:** Perform search highlighting inside a `contenteditable` container while typing. Confirm that typing and text selection remain uninterrupted without caret jumping.
- [ ] **Screen Reader Live Announcement:** Test with a screen reader (VoiceOver/NVDA). Confirm match count announcements (e.g., "3 of 15 matches") are spoken via `aria-live="polite"`.
- [ ] **Range Clearing Test:** Clear the search input and confirm `CSS.highlights.delete(name)` removes all visual highlights immediately without remaining artifacts.

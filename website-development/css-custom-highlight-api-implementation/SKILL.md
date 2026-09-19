---
name: css-custom-highlight-api-implementation
description: Implement, optimize, and progressively enhance non-destructive text range highlighting using the W3C CSS Custom Highlight API (CSS.highlights, Highlight, Range, ::highlight()) for search matches, syntax highlighting, and text annotations without DOM mutation or layout thrashing.
---

# CSS Custom Highlight API Implementation

## Purpose

The CSS Custom Highlight API Implementation skill provides a technical protocol, JavaScript controller architecture, styling strategy, and progressive enhancement fallback for styling arbitrary DOM text ranges using the W3C CSS Custom Highlight API (`CSS.highlights`, `Highlight`, `Range`, `::highlight()`).

Historically, dynamic text highlighting (e.g. in-page search, keyword matching, spell checking, syntax highlighting) required mutating the DOM by wrapping target text in HTML tags such as `<mark>` or `<span class="highlight">`. Mutating the DOM to apply visual styles introduces significant performance and functional defects:
1. **Layout Thrashing & Recalculation:** Splitting text nodes into multiple elements triggers synchronous layout recalculations and repaints across the DOM tree.
2. **Virtual DOM & Framework Desynchronization:** Inserting or removing HTML tags corrupts client-side framework state (React, Vue, Svelte) and invalidates virtual DOM node bindings.
3. **Selection & Focus Disruption:** Mutating DOM text nodes destroys active user text selections, resets cursor positions inside editable regions, and disrupts screen reader focus.
4. **Memory & Cleanup Overhead:** Creating thousands of wrapper elements for large documents increases DOM node counts and memory footprint.

The W3C CSS Custom Highlight API solves these issues by decoupling text styling from DOM structure. JavaScript identifies character offsets using standard DOM `Range` objects and registers them in named `Highlight` collections via `CSS.highlights`. The browser's painting engine renders the styles during the paint phase without modifying DOM nodes or triggering layout shifts.

---

## Use Cases

- **In-Page Search & Keyword Filtering:** Dynamically highlighting search terms across long articles, data tables, or documentation pages without altering the document structure.
- **Active Match Navigation:** Grouping matches into general and active highlight namespaces (e.g., `search-results` vs `current-match`) to differentiate the currently focused search result.
- **Syntax Highlighting & Code Decoration:** Styling code tokens in web-based editors or documentation viewers without generating thousands of nested DOM `<span>` tags.
- **Collaborative Annotations & Text Comments:** Highlighting text selections made by team members in real-time document collaboration applications.
- **Spelling, Grammar & AI Suggestions:** Rendering non-destructive wavy underlines or background tints over detected errors or AI-suggested text spans.

---

## When NOT to Use

- **Interactive Elements Requiring DOM Event Listeners:** If individual highlighted phrases require direct click, hover, or focus event listeners (e.g. clicking a highlight opens an inline tooltip or modal popover), `Highlight` objects cannot directly emit DOM events. *Alternative:* Use native Popover API positioned over `Range.getClientRects()` bounds, or fallback to interactive `<button>` / `<span>` elements.
- **Static Content Styling:** Styling fixed content that does not change dynamically at runtime (e.g., permanent blockquotes or static callouts). Use standard semantic HTML (`<mark>`, `<em>`, `<strong>`) or CSS classes instead.
- **Complex Container Layout Transformations:** When highlighting requires altering layout properties like `display`, `margin`, `padding`, or `font-size`. The `::highlight()` pseudo-element explicitly restricts styling to text colors, background colors, and text decorations.

---

## Inputs

1. **Target Subtree or Node:** The root DOM element containing text to search or highlight (e.g., `document.getElementById('article-body')`).
2. **Search Criteria / Ranges:** Text search string, Regular Expression pattern, or array of start/end character offsets.
3. **Highlight Identifier Namespaces:** Custom-ident names registered in CSS and JS (e.g., `'search-match'`, `'active-match'`, `'syntax-keyword'`).
4. **CSS Styling Definitions:** Pseudo-element rules mapped to the highlight namespaces using `::highlight(<name>)`.
5. **Fallback Strategy:** Graceful degradation logic for legacy browsers that do not support `CSS.highlights`.

---

## Outputs

1. **Registered Highlight Instances:** Active `Highlight` objects containing valid DOM `Range` objects added to the global `CSS.highlights` registry.
2. **Declarative CSS Rulesets:** Non-destructive visual styles applied directly during browser paint phases via `::highlight()` selectors.
3. **Dynamic Range Controller:** JavaScript state manager providing efficient search, re-indexing, active match switching, and complete teardown.
4. **Accessible Search Status Updates:** Screen reader notifications (`aria-live` regions) reflecting match counts and navigation positions.

---

## Workflow

### 1. Define CSS Custom Highlight Rulesets

Declare highlight namespaces using the `::highlight()` pseudo-element selector. Keep in mind that only paint properties are permitted.

```css
/* Styling for generic search matches */
::highlight(search-match) {
  background-color: #fef08a; /* Amber light tint */
  color: #854d0e;
  text-decoration: underline dotted #ca8a04;
}

/* Styling for the currently active/focused match */
::highlight(active-match) {
  background-color: #2563eb; /* Bold accent blue */
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  ::highlight(search-match) {
    background-color: #854d0e;
    color: #fef08a;
  }
  ::highlight(active-match) {
    background-color: #3b82f6;
    color: #ffffff;
  }
}
```

---

### 2. Feature Detection and Progressive Enhancement Setup

Check for native browser support before instantiating custom highlights. Provide fallback behavior or gracefully degrade.

```javascript
const supportsCustomHighlight = 'highlights' in CSS && typeof Highlight === 'function';

if (!supportsCustomHighlight) {
  console.warn('CSS Custom Highlight API not supported in this browser. Falling back to alternative styling.');
}
```

---

### 3. Efficient Text Node Traversal via TreeWalker

Traverse the target DOM container using `document.createTreeWalker` to extract visible `Text` nodes without querying element nodes.

```javascript
function findTextRanges(container, searchQuery) {
  if (!searchQuery || !container) return [];

  const ranges = [];
  const normalizedQuery = searchQuery.toLowerCase();

  // Create TreeWalker restricted to Text nodes
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip script, style, and hidden elements
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

  let currentNode = walker.nextNode();
  while (currentNode) {
    const textContent = currentNode.textContent.toLowerCase();
    let matchIndex = textContent.indexOf(normalizedQuery);

    while (matchIndex !== -1) {
      const range = new Range();
      range.setStart(currentNode, matchIndex);
      range.setEnd(currentNode, matchIndex + searchQuery.length);
      ranges.push(range);

      matchIndex = textContent.indexOf(normalizedQuery, matchIndex + searchQuery.length);
    }

    currentNode = walker.nextNode();
  }

  return ranges;
}
```

---

### 4. Register Ranges with CSS.highlights

Instantiate `Highlight` objects with arrays of `Range` instances and set them on `CSS.highlights`.

```javascript
function updateHighlights(allRanges, activeIndex = -1) {
  if (!supportsCustomHighlight) return;

  // 1. Handle all matching ranges (excluding active)
  const passiveRanges = allRanges.filter((_, idx) => idx !== activeIndex);
  const searchHighlight = new Highlight(...passiveRanges);
  CSS.highlights.set('search-match', searchHighlight);

  // 2. Handle active match range
  if (activeIndex >= 0 && activeIndex < allRanges.length) {
    const activeRange = allRanges[activeIndex];
    const activeHighlight = new Highlight(activeRange);
    CSS.highlights.set('active-match', activeHighlight);
  } else {
    CSS.highlights.delete('active-match');
  }
}
```

---

### 5. Managing Highlight Teardown and DOM Mutations

Clean up highlights when queries change, components unmount, or when DOM mutations invalidate character offsets.

```javascript
function clearAllHighlights() {
  if (!supportsCustomHighlight) return;
  CSS.highlights.delete('search-match');
  CSS.highlights.delete('active-match');
}

// Re-index on DOM mutation using MutationObserver
const mutationObserver = new MutationObserver((mutations) => {
  // Re-run search and range creation when container text content changes
  refreshHighlights();
});
```

---

## Decision Rules

### Implementation Approach Matrix

| Requirement | CSS Custom Highlight API | DOM Tag Wrapping (`<mark>`) | WebGL / Canvas Overlay |
| :--- | :--- | :--- | :--- |
| **DOM Safety & State Preservation** | **Zero mutation** (100% safe for React/Vue/Svelte) | Corrupts DOM structure, breaks virtual DOM | Zero mutation |
| **Render Performance (10,000+ matches)** | **Sub-millisecond** (Paint phase calculation) | Slow (Triggers full layout & style recalc) | Fast, but complex synchronization |
| **Allowed Custom Styles** | Colors, backgrounds, text decorations, text shadows | Any CSS property (padding, borders, layout) | Pixel canvas drawing |
| **Interactive Click/Hover Handling** | Requires hit-testing via `Range.getClientRects()` | Native standard element event listeners | Custom spatial math |
| **Accessibility Tree Impact** | Unchanged (Zero screen reader disruption) | Adds `<mark>` semantic role to accessibility tree | Invisible unless mirrored in DOM |

---

## Constraints

- **Allowed Styling Properties:** The CSS specification strictly restricts `::highlight()` pseudo-element styles to paint-only properties:
  - `color` and `-webkit-text-fill-color`
  - `background-color`
  - `text-decoration` and its sub-properties (`text-decoration-line`, `text-decoration-color`, `text-decoration-style`, `text-decoration-thickness`)
  - `text-shadow`
  - `stroke-color`, `fill-color`, and `stroke-width` (for SVG text)
  *Layout properties (`margin`, `padding`, `display`, `position`, `font-size`, `border`) are IGNORED by browser layout engines.*
- **DOM Range Mutation Fragility:** A DOM `Range` tracks live nodes. Modifying node text content (`node.textContent = ...`) or removing parent elements automatically alters or invalidates Range boundary offsets. Whenever container text is updated, highlights must be re-created.
- **Highlight Name Syntax:** Custom highlight names inside `CSS.highlights.set(name, highlight)` must be valid CSS custom-idents matching the identifier used in `::highlight(name)`.
- **Accessibility Tree Disconnection:** CSS Custom Highlights are purely visual and do not modify the accessibility tree or introduce semantic tags. Screen readers will NOT announce highlighted text as `<mark>` or "highlighted". Applications MUST provide live region status updates (`aria-live="polite"`) for search results.

---

## Non-Goals

- Replacing rich text editing frameworks (e.g., ProseMirror, Lexical, Slate) or handling complex text editor input states.
- Providing backend search indexing, fuzzy string matching algorithms, or server-side document parsing.
- Creating custom hit-testing frameworks for complex canvas or WebGL rendering engines.

---

## Common Failure Patterns

- **Applying Layout Properties in `::highlight()`:** Adding `padding: 2px 4px; border-radius: 4px;` to `::highlight(search-match)` and expecting rounded pill shapes with padding. Browser engines ignore layout and box model properties on highlight pseudo-elements. *Fix:* Use `background-color` with contrasting `color` or `text-decoration` underlines instead.
- **Passing Element Nodes to `Range.setStart()`:** Invoking `range.setStart(parentElement, offset)` where `offset` is treated as a child element index instead of character offset within a `Text` node. *Fix:* Ensure the first argument passed to `setStart`/`setEnd` is a `Text` node (`node.nodeType === Node.TEXT_NODE`).
- **Memory Leaks from Stale Highlight Instances:** Failing to call `CSS.highlights.delete(name)` or `CSS.highlights.clear()` when destroying components, resulting in accumulation of dead `Range` references.
- **Searching Across Element Boundaries Naively:** Attempting to match search phrases that span across HTML tag boundaries (e.g. `Hello <span>World</span>`) using a single `Text` node indexOf check. *Fix:* Use multi-range creation or text-node aggregation algorithms.
- **Blocking the Main Thread on Mass Text Traversal:** Synchronously traversing megabytes of DOM text on every keyboard input event. *Fix:* Debounce user input (e.g. 150ms-250ms delay) and yield execution using `requestIdleCallback` or `scheduler.yield()`.

---

## Validation Steps

- [ ] **Native API Support Verification:** Confirm `CSS.highlights` exists in `window` and no errors occur when creating `new Highlight()`.
- [ ] **DOM Structure Audit:** Inspect the DOM tree using DevTools while highlights are active. Verify that NO `<mark>` or `<span>` wrapper tags were inserted into the markup.
- [ ] **Paint Flashing & Layout Shift Check:** Enable "Paint Flashing" and "Layout Shift Regions" in Chrome DevTools Rendering tab. Trigger search highlighting and confirm ZERO layout shifts occur.
- [ ] **Active Match Differentiating:** Verify that `active-match` visually updates when stepping forward and backward through search results.
- [ ] **Teardown & Cleanup Check:** Clear search input and verify `CSS.highlights.has('search-match')` returns `false` or references an empty highlight set.
- [ ] **Screen Reader Accessibility Test:** Confirm that search query entry updates an `aria-live` region stating "X matches found, match Y active".

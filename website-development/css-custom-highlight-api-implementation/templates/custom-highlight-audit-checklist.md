# CSS Custom Highlight API Implementation Audit Checklist

Use this audit checklist to verify that your implementation of the W3C CSS Custom Highlight API adheres to performance, accessibility, rendering pipeline, and progressive enhancement standards.

---

## 1. Feature Detection & Progressive Enhancement

- [ ] **Feature Detection Guard:** The implementation checks `'highlights' in CSS && typeof Highlight === 'function'` before executing native highlight logic.
- [ ] **Fallback Strategy:** A graceful fallback is provided for legacy browsers (e.g., Firefox < 127, Safari < 17.2, Chrome < 105, or internet explorer) without throwing JavaScript runtime exceptions.
- [ ] **No Polyfill Layout Thrashing:** If a JS fallback polyfill is used, verify it does not trigger synchronous layout loops or block the main thread during typing.

---

## 2. CSS Styling & Rendering Rules

- [ ] **Paint-Only CSS Properties:** CSS rules using `::highlight(<name>)` ONLY use permitted paint properties:
  - `color` and `-webkit-text-fill-color`
  - `background-color`
  - `text-decoration` (`line`, `color`, `style`, `thickness`)
  - `text-shadow`
  - SVG text stroke / fill
- [ ] **No Layout Property Violations:** Confirmed that NO layout properties (`margin`, `padding`, `display`, `border`, `font-size`) are used in `::highlight()` rules.
- [ ] **Color Contrast Verification:** Contrast ratio between `color` and `background-color` inside `::highlight()` meets WCAG AA standard (at least 4.5:1 for normal text).
- [ ] **Dark Mode & Forced Colors:** Dark mode (`@media (prefers-color-scheme: dark)`) and Forced Colors / High Contrast mode (`@media (forced-colors: active)`) styles are declared.

---

## 3. DOM & State Integrity Audit

- [ ] **Zero DOM Mutation:** Inspected the DOM tree in DevTools while searching. Confirmed that NO `<mark>`, `<span>`, or wrapper HTML tags were inserted into the markup.
- [ ] **Virtual DOM & Framework Compatibility:** Verified that client-side framework components (React, Vue, Svelte) retain state and do not fail virtual DOM reconciliation when highlights update.
- [ ] **Selection Preservation:** Confirmed that active user text selections are NOT destroyed or reset when search term highlights are updated.
- [ ] **Form Input Focus:** Typing into a search input field does NOT lose input focus or cursor caret placement while highlights are rendered in real time.

---

## 4. Range Traversal & Performance Heuristics

- [ ] **Text Node Isolation:** Range start and end points are set strictly on `Text` nodes (`nodeType === 3`), NOT element container nodes.
- [ ] **TreeWalker Efficiency:** Text node discovery uses `document.createTreeWalker` with `NodeFilter.SHOW_TEXT` instead of recursive `querySelectorAll` loops.
- [ ] **Debounced Keyboard Input:** Rapid user keyboard input in the search input field is debounced (e.g. 150ms-250ms) to avoid unnecessary Range creation on every keystroke.
- [ ] **Main Thread Yielding for Large Documents:** Large documents (> 10,000 words) yield execution during traversal using `scheduler.yield()` or `requestAnimationFrame`.

---

## 5. Accessibility & Screen Reader Compliance

- [ ] **Live Region Announcements:** An `aria-live="polite"` region updates search results status (e.g., "5 matches found. Match 1 active").
- [ ] **Keyboard Navigation:** Keyboard shortcuts (e.g., `Enter`, `Shift+Enter`, or `ArrowUp`/`ArrowDown`) allow stepping forward and backward through search results.
- [ ] **Screen Reader Text Clarity:** Confirmed that visual highlights do not alter the plain-text readout order or pronunciation of text by screen readers.

---

## 6. Lifecycle & Cleanup Verification

- [ ] **DOM Mutation Resiliency:** A `MutationObserver` or framework lifecycle hook re-indexes and regenerates Range objects when document text content changes dynamically.
- [ ] **Component Teardown:** Unmounting the search component or navigating away calls `CSS.highlights.delete(<name>)` or `CSS.highlights.clear()` to prevent memory leaks.
- [ ] **Empty State Handling:** Clearing the search input removes all entries from `CSS.highlights` and resets status counters to zero.

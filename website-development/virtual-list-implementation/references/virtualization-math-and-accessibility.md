# Virtualization Mathematics, Rendering Performance, and Accessibility

This reference document outlines the core browser behavior, mathematical foundations, and accessibility specifications required to build production-grade virtual lists.

---

## 1. Browser Rendering & Compositing Performance

Rendering thousands of DOM elements degrades performance due to several critical pipeline bottlenecks:
- **Style Recalculation & Layout (Reflow):** When elements are added, removed, or resized, the browser must traverse the DOM tree to calculate geometric coordinates. This is a CPU-bound, single-threaded operation.
- **Paint & Composite:** Newly positioned elements must be painted onto bitmap layers and composite-assembled by the GPU. High DOM node counts swell the memory footprint of these layers, leading to laggy scrolling.

### Optimizing Compositor Layer Creation
To ensure scrolling is handled entirely by the GPU compositor thread without forcing main-thread repaint cycles:
1. **Translate Over Top/Left:** Never position virtual list elements using `top` or `left` properties. Mutating these values triggers a full layout and paint. Instead, use `transform: translateY(Ypx)` or `transform: translate3d(0, Ypx, 0)`.
2. **Promote Elements using `will-change`:** Apply `will-change: transform` to the visible virtual items. This signals the browser to promote the items to their own GPU compositor layers in advance.
3. **Assert Layout Containment:** Apply CSS layout containment to the Viewport Container:
   ```css
   .virtual-viewport {
     contain: layout size style;
   }
   ```
   This guarantees that changes inside the virtual list container cannot affect the layout or styling of elements elsewhere on the parent page.

### Scroll-Thrashing and Event Handling
By default, scroll events block page rendering because the browser must wait to see if a handler intercepts the scroll via `.preventDefault()`.
1. **Enable Passive Event Listeners:** Register the scroll handler with `{ passive: true }`. This tells the browser's thread that the scroll listener will not block scrolling, keeping the frame rate at a stable 60fps or 120fps.
   ```javascript
   viewport.addEventListener('scroll', onScroll, { passive: true });
   ```
2. **Coalesce Updates with `requestAnimationFrame`:** Do not execute DOM writes immediately inside the scroll event. Coalesce them to execute right before the browser's next paint.

---

## 2. Virtualization Mathematics & Algorithms

### A. Fixed-Height Calculations
For a list of $N$ items with a fixed item height $h$ and a viewport scroll position $S$, the visual and index calculations are fast $O(1)$ operations:

- **Total Runway Height ($H_{\text{runway}}$):**
  $$H_{\text{runway}} = N \times h$$
- **First Visible Index ($i_{\text{first}}$):**
  $$i_{\text{first}} = \lfloor S / h \rfloor$$
- **Last Visible Index ($i_{\text{last}}$):**
  $$i_{\text{last}} = \lfloor (S + V) / h \rfloor$$
  where $V$ is the visible viewport height.
- **Buffered Start ($i_{\text{start}}$) and End ($i_{\text{end}}$):**
  $$i_{\text{start}} = \max(0, i_{\text{first}} - B)$$
  $$i_{\text{end}} = \min(N - 1, i_{\text{last}} + B)$$
  where $B$ is the buffer count.
- **Content Container Offset ($Y_{\text{offset}}$):**
  $$Y_{\text{offset}} = i_{\text{start}} \times h$$

---

### B. Dynamic-Height Cache Lookup Algorithm (Binary Search)
When item heights vary, we cannot calculate indices with simple division. We must maintain an array of cached heights and cumulative offsets:

| Index | Height | Cumulative Offset | Description |
|---|---|---|---|
| `0` | `45` | `0` | Starts at `0`, ends at `45` |
| `1` | `80` | `45` | Starts at `45`, ends at `125` |
| `2` | `60` | `125` | Starts at `125`, ends at `185` |
| `i` | $h_i$ | $O_i = \sum_{k=0}^{i-1} h_k$ | Starts at $O_i$, ends at $O_i + h_i$ |

#### Finding `firstVisibleIndex` with Binary Search ($O(\log N)$)
Because the cumulative offset array is monotonically increasing, we can perform a binary search to locate the index corresponding to the current `scrollTop` ($S$):

```javascript
function findFirstVisibleIndex(scrollTop, cumulativeOffsets) {
  let low = 0;
  let high = cumulativeOffsets.length - 1;
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const offset = cumulativeOffsets[mid];

    if (offset <= scrollTop) {
      result = mid; // Candidate found
      low = mid + 1; // Try to find a tighter match
    } else {
      high = mid - 1; // Search left
    }
  }
  return result;
}
```

---

### C. Scroll Anchoring & Dynamic Correction
When scrolling *upward* in a dynamic virtual list, items above the viewport are measured for the first time. If their actual heights differ from their initial estimates:
- The total scrollable runway height changes.
- The offsets of visible items shift.
- This results in a jarring scroll jump (the layout "bounces" or skips).

#### Scroll Anchoring Algorithm
To maintain a stable scroll anchor, if any measured heights *above* the current visible window change, calculate the discrepancy and adjust the viewport's `scrollTop` dynamically in the same frame:

$$\Delta Y = \sum_{k=0}^{i_{\text{first}}} (h_{\text{actual}, k} - h_{\text{estimated}, k})$$

If $\Delta Y \neq 0$:
$$\text{scrollTop}_{\text{new}} = \text{scrollTop}_{\text{old}} + \Delta Y$$

This adjustment shifts the coordinate grid smoothly, so the content currently under the user's eye remains completely motionless.

---

## 3. ARIA Specifications & Accessibility Standards

Unrendered elements do not exist in the accessibility tree. A naive virtual list is invisible to screen readers, causing assistive technology users to perceive the list as containing only 5-10 visible items rather than its true size of 10,000.

### A. Semantic Accessibility Attributes
Provide the browser with structural metadata using the following specific ARIA attributes:

- **`role="list"` or `role="feed"`:** Identifies the viewport wrapper container as an accessible list structure.
- **`role="listitem"`:** Identifies each rendered virtual item.
- **`aria-setsize`:** Set on every active `role="listitem"`. Tells the screen reader the total size of the list (e.g., `aria-setsize="10000"`), even if only 10 items are in the DOM.
- **`aria-posinset`:** Set on every active `role="listitem"`. Conveys the 1-based index of the item relative to the full list size (e.g., `aria-posinset="415"`), compensating for the fact that only a tiny slice is rendered.

```html
<!-- Example Semantic Assembly -->
<div role="list" aria-label="Catalog items" class="viewport">
  <div class="runway" style="height: 500000px;"></div>
  <div class="content-container" style="transform: translateY(20000px);">
    <div role="listitem" aria-posinset="401" aria-setsize="10000" tabindex="0">
      Product #401
    </div>
    <div role="listitem" aria-posinset="402" aria-setsize="10000" tabindex="0">
      Product #402
    </div>
  </div>
</div>
```

### B. Keyboard Navigation & Focus Management Protocol
When navigating virtualized lists via the keyboard:
1. **Prevent Focus Dropping:** When an active element with physical focus is scrolled out of view and deleted, the page's focus falls back to the `body` element. This forces keyboard users to restart their navigation sequence.
2. **Implement Arrow Key Handlers:** Enable navigation within the virtual list using `ArrowDown` and `ArrowUp`. Intercept these events:
   - Calculate the next index.
   - Programmatically focus the next virtual item.
   - Ensure the item is scrolled into view: `nextElement.scrollIntoView({ block: 'nearest' })`.
3. **Manage `tabindex` Cycles:** Use the **Roving Tabindex** pattern. Only the currently active (or last selected) item in the list should have `tabindex="0"`. All other rendered items must have `tabindex="-1"`. This allows keyboard users to press `Tab` once to enter the list, use arrow keys to navigate thousands of items, and press `Tab` once more to exit, avoiding keyboard-traps.

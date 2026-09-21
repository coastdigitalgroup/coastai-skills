---
name: scroll-restoration-management
description:
  Manage, preserve, and restore window and sub-container scroll positions across
  client-side SPA route transitions, browser history back/forward navigation, and
  asynchronous content hydration while preventing scroll clamping and layout jumps.
---

# Scroll Restoration Management

## Purpose

The Scroll Restoration Management skill provides a robust, framework-agnostic protocol for recording, tracking, and restoring window and sub-container scroll positions during client-side navigation and browser history traversal (back/forward popstate events).

In modern Single Page Applications (SPAs) and dynamic web interfaces, relying on default browser scroll behavior (`history.scrollRestoration = 'auto'`) frequently leads to severe UX defects:
1. **The Scroll Clamping Bug:** When users navigate back to a list view, the browser fires `popstate` immediately and attempts to restore a scroll position (e.g., `Y = 1800px`). However, because the list items are fetched asynchronously or re-rendered dynamically, the document height at that millisecond is only `400px`. The browser clamps the scroll position to `400px` and discards the requested `1800px` target. When data finishes loading 200ms later, the page stays stuck near the top instead of returning the user to their previous position.
2. **Lost Sub-Container Positions:** Browser history mechanisms only record the main window scroll position. Scrollable sub-containers—such as filter sidebars, horizontal product carousels, tabbed panels, or split-screen code viewers—lose their scroll state completely on navigation.
3. **Flash of Wrong Offset:** Restoring scroll prematurely before CSS fonts, responsive images, or accordions settle causes visible layout jumps and content flashes.

This skill establishes a reliable architecture for setting `history.scrollRestoration = 'manual'`, tracking state keys (`history.state.key`), deferring restoration until layout stability is verified, adjusting for sticky header offsets, and handling sub-container state preservation.

---

## Use Cases

- **E-Commerce & Product Catalogs:** Restoring exact scroll positions and filter sidebar scroll positions when shoppers click "Back" from a Product Detail Page (PDP) to a long Product Listing Page (PLP).
- **Infinite Feeds & Search Results:** Returning users to their precise reading position in a paginated or infinite scroll search feed after viewing an item detail view.
- **Multi-Tab Dashboard Views:** Preserving independent scroll states across tab switches or drawer panels without triggering unwanted document-level jumps.
- **Client-Side SPA Routers:** Implementing custom router plugins (React Router, Vue Router, SvelteKit, or Vanilla JS) that require precise scroll control across history transitions.

---

## When NOT to Use

- **Traditional Multi-Page Applications (MPAs):** Standard websites with full server-side page reloads where the browser natively saves and restores window scroll positions reliably.
- **New Page Navigations (Push Navigation):** Navigating *forward* to a completely new route should always reset the viewport to top `(0, 0)` (paired with `focus-management-client-side-navigation`), unless explicitly restoring state.
- **Modal and Overlay Toggles:** Locking or resetting scroll for modal overlays (use `body-scroll-lock-implementation` instead).

---

## Inputs

1. **History Navigation Context:** The navigation type (e.g., `pushState` for new forward navigation vs `popstate` / `replaceState` for back/forward browser traversal).
2. **History State Identifier:** Unique state key attached to `window.history.state` (e.g., `history.state?.key` or a custom generated UUID).
3. **Target Containers:** Selectors or element references for primary window and any nested scrollable elements (`[data-scroll-container]`).
4. **Layout Ready Signals:** Promises or callbacks indicating that dynamic DOM content, image dimensions, or API data fetching have completed (e.g., `ResizeObserver` stabilization or data rehydration completion).
5. **Layout Overlays & Offsets:** Sticky header heights, fixed announcements, or sticky filter bars that affect effective target visibility.

---

## Outputs

1. **Manual Restoration Configuration:** Setting `history.scrollRestoration = 'manual'` to prevent browser timing conflicts.
2. **Scroll Position Cache:** Keyed in-memory or `sessionStorage` map of window `(x, y)` and sub-container `(x, y)` coordinates mapped to history state keys.
3. **Layout Stability Observer:** Mechanized wrapper using `ResizeObserver` or DOM mutation watchers to wait for target document height before restoring coordinates.
4. **Restoration Execution Routine:** Smooth or instant scroll execution with `window.scrollTo()` and `element.scrollTo()`, incorporating `prefers-reduced-motion` detection.

---

## Workflow

### 1. Configure Manual Scroll Restoration
Upon application initialization, explicitly set the browser's scroll restoration mode to manual:
```javascript
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
```
This prevents the browser from making uncoordinated, premature scroll jumps on `popstate`.

### 2. Associate Unique History State Keys
Ensure every entry in `window.history` possesses a unique identifier in `history.state`:
```javascript
function ensureHistoryKey() {
  const state = window.history.state || {};
  if (!state.key) {
    const key = `scroll_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    window.history.replaceState({ ...state, key }, '');
  }
  return window.history.state.key;
}
```

### 3. Record Scroll Positions Before Navigation
Before navigating away from a view (on `beforeunload`, router `beforeEach` hooks, or link click handlers), record both window and sub-container positions:
```javascript
function captureScrollPositions(key) {
  const containerData = {};
  document.querySelectorAll('[data-scroll-container]').forEach((el) => {
    const id = el.getAttribute('data-scroll-id') || el.id;
    if (id) {
      containerData[id] = { x: el.scrollLeft, y: el.scrollTop };
    }
  });

  const scrollMap = {
    window: { x: window.scrollX, y: window.scrollY },
    containers: containerData,
    timestamp: Date.now()
  };

  sessionStorage.setItem(`scroll_pos_${key}`, JSON.stringify(scrollMap));
}
```

### 4. Intercept Popstate History Traversal
Listen for the window `popstate` event to differentiate between forward `push` navigations (which reset to `0, 0`) and `popstate` back/forward navigations (which trigger restoration):
- On `pushState` / new link click: Scroll to `(0, 0)` immediately.
- On `popstate`: Retrieve saved coordinates using `history.state?.key`.

### 5. Wait for Layout Stabilization (Preventing Clamping)
Do NOT invoke `scrollTo` immediately on `popstate` if the view requires asynchronous data or image loading. Instead, use a layout stability polling mechanism or `ResizeObserver`:
```javascript
async function waitForTargetHeight(targetY, timeoutMs = 2000) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    function check() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll >= targetY || (Date.now() - startTime) >= timeoutMs) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    }
    check();
  });
}
```

### 6. Restore Coordinates & Sub-Containers
Once the document height can accommodate `targetY`:
1. Restore the window position: `window.scrollTo({ left: targetX, top: targetY, behavior: 'instant' })`.
2. Restore sub-containers identified by `data-scroll-id`.
3. Check `prefers-reduced-motion` before applying any animated smooth scrolling.
4. Verify the final scroll offset matches the target position within a 2px tolerance.

---

## Decision Rules

| Navigation Type | Scroll Action | Timing / Strategy | Rationale |
| :--- | :--- | :--- | :--- |
| **New Link Click (Push Navigation)** | Reset to `(0, 0)` | Instant on route enter | User expects to start at the top of a new page view. |
| **Back/Forward Button (`popstate`) with Synchronous DOM** | Restore saved `(X, Y)` | Immediately on route enter | DOM is already rendered, no clamping risk. |
| **Back/Forward Button (`popstate`) with Async Data Fetching** | Restore saved `(X, Y)` | Deferred via `waitForTargetHeight()` / Promise | Prevents scroll clamping at reduced intermediate height. |
| **Back Navigation with Infinite Scroll List** | Restore saved `(X, Y)` + Hydrate Feed | Re-fetch pages up to saved offset | Item index or height target requires matching page batch. |
| **Sub-Container Navigation (Tabs/Sidebars)** | Restore container `(scrollLeft, scrollTop)` | After sub-container DOM mount | Window scroll is unaffected, but container context is preserved. |

---

## Constraints

- **Storage Limits:** `sessionStorage` keys should be trimmed to maintain a maximum of 50 history entries to avoid quota exhaustion.
- **Layout Thrashing:** Batch scroll queries (`window.scrollY`, `element.scrollTop`) during scroll recording or use passive scroll handlers to avoid forced reflows.
- **Accessibility Requirements:** Restoring scroll MUST NOT conflict with focus management. When restoring scroll on back-navigation, maintain focus on the main content container or previously clicked element without triggering unexpected page jumps.
- **Viewport Shifts:** Always account for sticky headers (`scroll-margin-top` or CSS variables) if scrolling to anchor elements or specific card targets.

---

## Non-Goals

- Managing client-side routing logic (URL matching, parameter parsing).
- Focus ring or keyboard focus traps (see `focus-management-client-side-navigation` and `focus-trap-implementation`).
- Virtual list rendering item recycling (see `virtual-list-implementation`).

---

## Common Failure Patterns

- **Premature `scrollTo` Execution:** Calling `window.scrollTo(0, 1200)` before the API request completes. The document height is 300px, so scroll clamps to 300px and stays there even when 100 items render.
- **Relying on Default Browser Auto Restoration:** Leaving `history.scrollRestoration = 'auto'`, causing browser native restoration to race against SPA client-side JavaScript rendering.
- **Ignoring Sub-Containers:** Only recording `window.scrollY`, resulting in lost filter bar, sidebar menu, or code editor scroll positions.
- **Using Unstable History Keys:** Using URL pathname as the storage key instead of `history.state.key`. If a user visits the same PLP multiple times in history, pathname keys overwrite each other.
- **Scroll Shift on Image Load:** Restoring scroll before dynamic images without `width`/`height` attributes finish loading, causing content to push down and misalign the restored position.

---

## Validation Steps

### 1. Basic Popstate Restoration Check
- [ ] Navigate from Page A (top) to Page B (long list).
- [ ] Scroll down 1500px on Page B. Click a item to navigate to Page C.
- [ ] Click the browser "Back" button.
- [ ] Confirm the page returns cleanly to `Y = 1500px` without flashing at `Y = 0px` or clamping at top.

### 2. Async Data Fetching Test
- [ ] Simulate a 500ms network delay on Page B's catalog API.
- [ ] Navigate away from Page B at `Y = 2200px` and hit "Back".
- [ ] Confirm that `ScrollRestorationManager` waits for the dynamic catalog to hydrate before applying scroll, successfully reaching `2200px`.

### 3. Sub-Container Restoration Check
- [ ] On a page with a scrollable filter sidebar (`data-scroll-container`), scroll the sidebar down 300px.
- [ ] Navigate to another route and return via "Back".
- [ ] Verify the sidebar is restored to `scrollTop = 300px`.

### 4. Reduced Motion Verification
- [ ] Enable `prefers-reduced-motion: reduce` in browser settings.
- [ ] Perform back-navigation restoration. Verify scrolling completes instantly without animation.

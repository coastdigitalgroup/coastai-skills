# Navigation API Implementation Audit Checklist

Use this checklist to evaluate and verify client-side routing, navigation interception, and history state management implementations built with the W3C Navigation API (`window.navigation`).

---

## 1. Feature Detection & Fallback Readiness

- [ ] **Capability Check:** Code checks `'navigation' in window` before binding `window.navigation` event listeners.
- [ ] **Legacy Browser Graceful Degradation:** Application functions correctly in Safari and Firefox without throwing `ReferenceError: navigation is not defined`.
- [ ] **Fallback Delegation:** Fallback mode uses `document.addEventListener('click', ...)` for internal `<a>` tags and listens to `window.addEventListener('popstate', ...)` for back/forward support.
- [ ] **Polyfill / Progressive Enhancement:** Native page loads fall back seamlessly to server rendering if client-side interception is disabled or fails.

---

## 2. Navigation Interception & Guard Rules

- [ ] **`event.canIntercept` Verification:** `navigate` handler verifies `event.canIntercept === true` before calling `event.intercept()`.
- [ ] **Cross-Origin Exclusion:** Cross-origin link destinations (`destinationUrl.origin !== window.location.origin`) are ignored to allow standard browser HTTP requests.
- [ ] **Download Link Exclusion:** Links with `download` or `target="_blank"` attributes are skipped by the router handler.
- [ ] **Unsaved Changes Guard:** Pre-interception checks execute synchronously within the `navigate` event listener, calling `event.preventDefault()` if the user cancels navigation.
- [ ] **Synchronous Interception:** `event.intercept()` is called synchronously within the `navigate` listener before returning to the event loop.

---

## 3. Form Submission Interception

- [ ] **`event.formData` Inspection:** Form submit navigations (`<form method="GET|POST">`) inspect `event.formData` inside `event.intercept({ handler })`.
- [ ] **Query Parameter Sync:** Search and filter form submissions update the address bar URL query parameters cleanly.
- [ ] **Non-GET Protection:** POST form submissions prevent double-submission or state mutation errors during page reloads or navigations.

---

## 4. Async Execution & View Transitions

- [ ] **Async Handler Option:** Asynchronous view rendering or data fetching logic is properly wrapped inside `event.intercept({ handler: async () => { ... } })`.
- [ ] **View Transitions Integration:** `document.startViewTransition()` wraps DOM mutation calls inside the `handler` when supported.
- [ ] **Scroll Restoration Control:** `scroll: 'after-transition'` or explicit scroll resets ensure the viewport scrolls to top on route change without flashing.
- [ ] **Focus Reset Strategy:** `focusReset: 'after-transition'` or custom focus management sets focus to the main heading (`<main h1>`) on route load.

---

## 5. Accessibility & Focus Management

- [ ] **Focus Placement:** Focus moves cleanly to the new page title (`<h1>`) or main container (`<main tabindex="-1">`) after DOM rendering completes.
- [ ] **Screen Reader Announcement:** Dynamic route changes update an `aria-live="polite"` region with message e.g. `"Navigated to [Page Title]"`.
- [ ] **Keyboard Navigation Continuity:** Focus is not lost to `document.body`, preventing keyboard users from having to tab through header navigation repeatedly.
- [ ] **No Focus Rings on Unclicked Heading:** Heading focus utilizes `focus({ preventScroll: true })` and CSS `:focus:not(:focus-visible)` to avoid ugly focus rings on mouse/touch clicks.

---

## 6. Error Boundaries & Abort Resilience

- [ ] **`navigateerror` Listener:** Global `window.navigation.addEventListener('navigateerror', ...)` is registered to catch rejected promises or aborted navigations.
- [ ] **Loading Bar Synchronization:** Loading indicators or spinners are cleared in `finally` blocks regardless of whether route fetching succeeds or fails.
- [ ] **Rapid Clicking Resilience:** Rapidly clicking multiple links cancels prior in-flight route promises without corrupting DOM state.

---

## 7. History Entry & Stack Introspection

- [ ] **State Inspection:** History entries inspected via `navigation.currentEntry` or `navigation.entries()` return clean, serializable objects from `.getState()`.
- [ ] **Programmatic Navigation:** `navigation.navigate(url, { state, replace })` is used for programmatic transitions instead of manual `history.pushState` when supported.
- [ ] **Traverse Handling:** Back/forward button presses (`event.navigationType === 'traverse'`) cleanly restore cached state or view templates.

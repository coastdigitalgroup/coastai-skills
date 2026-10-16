# Navigation API Management Audit Checklist

This audit checklist verifies that client-side routing, navigation interception, and page state transitions implemented with the W3C Navigation API (`window.navigation`) adhere to performance, accessibility, error resiliency, and browser fallback standards.

---

## 1. Feature Detection & Progressive Enhancement
- [ ] **Native Feature Detection:** The router explicitly checks `'navigation' in window` before binding `navigation.addEventListener('navigate', ...)`.
- [ ] **Legacy Browser Fallback:** A working fallback path (using `history.pushState`, `popstate` events, and delegated link click handling) is active in non-Chromium browsers (Firefox, Safari).
- [ ] **No Destructive Overrides:** Existing native `<a>` behavior is preserved for external domains, file downloads (`download` attribute), `target="_blank"`, and modifier keys (`Ctrl`, `Meta`, `Shift`).

---

## 2. Interception Scope & Eligibility Verification
- [ ] **`canIntercept` Check:** The listener validates `navigateEvent.canIntercept === true` before attempting `navigateEvent.intercept()`.
- [ ] **Anchor Hash Bypass:** Pure hash fragment changes (`navigateEvent.hashChange === true`) are allowed to pass through to native browser hash scroll handling.
- [ ] **Download Request Bypass:** File download actions (`navigateEvent.downloadRequest === true`) bypass route interception.
- [ ] **Same-Origin Constraint:** Destinations are validated against `new URL(event.destination.url).origin === location.origin`.
- [ ] **Form Submission Interception:** Form submissions (`navigateEvent.formData`) are either intentionally handled or explicitly bypassed based on app requirements.

---

## 3. Synchronous Interception & API Rules
- [ ] **Synchronous Intercept Call:** `navigateEvent.intercept()` is invoked **synchronously** inside the `navigate` event listener tick, *before* any asynchronous `await` statements.
- [ ] **Handler Encapsulation:** Async data fetching, DOM updating, and view transition logic are correctly encapsulated inside the `handler` function passed to `intercept()`.

---

## 4. Navigation Guards & Unsaved State
- [ ] **Dirty State Detection:** Unsaved user inputs (form inputs, rich text editors) set a clear "dirty" state flag.
- [ ] **User Confirmation Interception:** When navigating away with unsaved state, the guard prompts the user and executes `navigateEvent.preventDefault()` if cancelled.
- [ ] **Guard Reset on Confirm:** Guard state is properly cleared when the user explicitly confirms navigation or saves the form.

---

## 5. Async Lifecycle & Abort Signal Handling
- [ ] **Abort Controller Integration:** Fetch requests inside `handler` pass `navigateEvent.signal` to `fetch(url, { signal: navigateEvent.signal })`.
- [ ] **Rapid Clicking Protection:** When a user clicks multiple links rapidly, pending requests are cleanly aborted without throwing unhandled rejection errors in the console (`AbortError` is caught and suppressed).
- [ ] **Race Condition Prevention:** The DOM is only updated by the latest, active navigation handler.

---

## 6. Accessibility & Focus Management (WCAG AA)
- [ ] **Document Title Updates:** `document.title` is updated dynamically to reflect the new route context immediately upon render.
- [ ] **Screen Reader Route Announcement:** An `aria-live="polite"` region announces the newly loaded page title/context to assistive technology users upon navigation.
- [ ] **Target Focus Shift:** Focus is shifted explicitly to the main view heading (`<h1 tabindex="-1">`) or focus container using `.focus()`.
- [ ] **Focus Visible Styling:** The target focus element displays clear visual focus indicators when navigated via keyboard.

---

## 7. Scroll Restoration Logic
- [ ] **Explicit Scroll Option:** `navigateEvent.intercept({ scroll: 'manual', ... })` is specified to prevent premature browser scroll shifts before dynamic content finishes rendering.
- [ ] **Scroll Reset on Push:** New page navigations (`push` / `replace`) scroll the viewport to `(0, 0)`.
- [ ] **Back/Forward Position Restoration:** Browser back/forward traversals (`traverse`) restore the previous scroll coordinates accurately after content is rendered.

---

## 8. View Transitions & Visual Feedback
- [ ] **View Transitions Interoperability:** If `document.startViewTransition` is available, the route DOM update action is wrapped inside `document.startViewTransition(async () => { ... })`.
- [ ] **Loading Indicators:** Global progress bar or skeleton loading triggers during long network delays (>150ms).
- [ ] **Error Boundary:** Async render failures display a clean user-facing error message with a recovery link ("Return Home" or "Retry").

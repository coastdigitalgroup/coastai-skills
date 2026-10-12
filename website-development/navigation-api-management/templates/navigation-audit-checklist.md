# Navigation API Implementation Audit Checklist

Use this checklist to audit Single Page Application (SPA) routing, same-document navigations, unsaved form guards, and history state management against the W3C Navigation API standards.

---

## 1. Feature Support & Fallback Strategy
- [ ] **Capability Check:** `typeof window !== 'undefined' && 'navigation' in window` is checked before attaching listeners.
- [ ] **History API Fallback:** Fallback mechanisms using `history.pushState`, `history.replaceState`, and `window.addEventListener('popstate')` are available for legacy browsers (Safari < 17, Firefox < 126).
- [ ] **Feature Flagging:** Feature switches or polyfills degradation path tested across major desktop and mobile browser matrix.

---

## 2. Navigation Interception (`e.intercept()`)
- [ ] **`canIntercept` Validation:** Interceptor verifies `e.canIntercept === true` before processing navigation events.
- [ ] **Origin Verification:** Target URL (`e.destination.url`) is checked to ensure same-origin bounds (`url.origin === location.origin`).
- [ ] **Special Event Filtering:** File downloads (`e.downloadRequest`), hash-only scrolls (`e.hashChange`), and non-GET form posts are ignored or handled explicitly.
- [ ] **Modifier Keys Honored:** Native behavior is preserved for `Ctrl+Click`, `Cmd+Click`, `Shift+Click`, and middle-clicks (`e.canIntercept` handles this automatically, but custom handlers must not override).

---

## 3. Async Transition & AbortSignal Management
- [ ] **`handler` Promise Binding:** Asynchronous data fetches or view rendering functions are returned inside `e.intercept({ handler })`.
- [ ] **`AbortSignal` Integration:** `e.signal` is passed to all `fetch()` calls or async tasks within the route transition.
- [ ] **Superseded Request Handling:** `AbortError` exceptions thrown when rapid successive link clicks cancel prior transitions are caught cleanly without logging errors or broken UI states.
- [ ] **Loading Feedback:** Loading indicators / progress bars update during transition state and clear on completion or failure.

---

## 4. Navigation Guards & Unsaved State Protection
- [ ] **Cancellation via `e.preventDefault()`:** Unsaved form changes or dirty states trigger confirmation prompts; rejecting the prompt invokes `e.preventDefault()` to stop navigation.
- [ ] **Cross-Origin & Page Reload Safeguards:** Native `beforeunload` event listeners complement Navigation API guards to catch hard reloads or cross-origin link clicks.
- [ ] **Form State Reset:** Dirty state flags are cleared cleanly upon successful form submit or confirmed navigation.

---

## 5. History Entry & State Retention
- [ ] **`navigation.currentEntry` Inspection:** Current entry ID, key, index, and state are inspected cleanly without throwing null pointer errors.
- [ ] **State Serialization:** Custom entry state passed via `navigation.navigate(url, { state })` contains only cloneable JavaScript objects (Structured Clone algorithm compatible).
- [ ] **Scroll & View Restoration:** `focusReset` and `scroll` options in `e.intercept()` are configured (`'after-transition'` or `'manual'`).

---

## 6. Accessibility & WCAG AA Compliance
- [ ] **Focus Management:** Keyboard focus is shifted automatically to the main view container (`<main tabindex="-1">`) or primary heading (`<h1>`) after route transition completes.
- [ ] **Screen Reader Announcements:** An `aria-live="polite"` region announces view changes with updated `document.title` information.
- [ ] **Link Semantics:** Navigational triggers maintain proper `<a href="...">` semantic elements rather than non-semantic `<div onclick="...">`.

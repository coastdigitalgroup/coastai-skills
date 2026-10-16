# W3C Navigation API Heuristics & Browser Behavior Reference

This document details the architectural specification, event lifecycle, edge-case behavior, and progressive enhancement strategies for the W3C Navigation API (`window.navigation`).

---

## 1. Architectural Overview: Navigation API vs. Legacy History API

| Feature | Legacy History API (`pushState`/`popstate`) | W3C Navigation API (`window.navigation`) |
| :--- | :--- | :--- |
| **Event Model** | Fragmented (`popstate` fires *only* on back/forward; link clicks require global `click` delegation). | Unified (`navigate` event fires for link clicks, form GET/POST, back/forward, and API calls). |
| **Interception** | Requires calling `e.preventDefault()` on `click` events manually before URL mutation. | Intercepts navigation via `navigateEvent.intercept({ handler })`, preserving URL updates automatically. |
| **Async Handling** | Manual promise tracking and state management. | Native async `handler` promises; built-in `navigateEvent.signal` for automatic request aborts. |
| **History Stack Access** | Inaccessible (only `history.length` is available; stack entries are invisible due to privacy constraints). | Full access to same-origin session entries via `navigation.entries()` and `navigation.currentEntry`. |
| **Navigation Types** | Untyped strings or custom state flags. | Explicit `navigationType` enums: `'push'`, `'replace'`, `'reload'`, `'traverse'`. |

---

## 2. Global `window.navigation` Interface Methods

```typescript
interface Navigation extends EventTarget {
  readonly currentEntry: NavigationHistoryEntry | null;
  readonly transition: NavigationTransition | null;
  readonly canGoBack: boolean;
  readonly canGoForward: boolean;

  entries(): NavigationHistoryEntry[];
  navigate(url: string, options?: NavigationNavigateOptions): NavigationResult;
  back(options?: NavigationOptions): NavigationResult;
  forward(options?: NavigationOptions): NavigationResult;
  traverseTo(key: string, options?: NavigationOptions): NavigationResult;
  updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void;

  addEventListener(type: 'navigate', listener: (event: NavigateEvent) => void): void;
  addEventListener(type: 'navigatesuccess', listener: EventListener): void;
  addEventListener(type: 'navigateerror', listener: EventListener): void;
}
```

### Key API Methods & Return Values

1. **`navigation.navigate(url, { state, history: 'auto' | 'push' | 'replace' })`**:
   - Initiates a programmatic navigation.
   - Returns a `NavigationResult` object containing two promises:
     - `committed`: Resolves when the URL has updated and the history entry is created.
     - `finished`: Resolves when the `intercept({ handler })` async function completes.

2. **`navigation.entries()`**:
   - Returns an array of `NavigationHistoryEntry` objects representing same-origin history entries created in the current browsing context.
   - Each entry contains `.key` (unique persistent identifier across reloads), `.id` (unique instance ID), `.url`, and `.getState()`.

3. **`navigation.updateCurrentEntry({ state })`**:
   - Updates the state payload of `navigation.currentEntry` without modifying history length or triggering a navigation event.

---

## 3. `NavigateEvent` Properties & Behavior

When a user or script triggers a navigation, a `NavigateEvent` is dispatched to `navigation`:

- **`canIntercept` (boolean):** `true` if the navigation can be handled client-side. Returns `false` for cross-origin URLs or document unload reloads.
- **`navigationType` (`'push'` | `'replace'` | `'reload'` | `'traverse'`):** Identifies how history is modified.
- **`destination` (`NavigationDestination`):** Details the target `.url`, `.key`, `.id`, `.index`, and `.getState()`.
- **`userInitiated` (boolean):** `true` if initiated by a direct UI user gesture (clicking link, submitting form, clicking back/forward button).
- **`hashChange` (boolean):** `true` if the navigation is an in-page hash anchor jump (e.g. `href="#section"`).
- **`downloadRequest` (boolean):** `true` if the link has a `download` attribute or header.
- **`formData` (`FormData` | null):** Contains submitted form data if the event resulted from an HTML `<form>` GET or POST submission.
- **`signal` (`AbortSignal`):** An `AbortSignal` that becomes aborted if a newer navigation interrupts the active transition.

---

## 4. `navigateEvent.intercept()` Execution Lifecycle

Calling `navigateEvent.intercept(options)` instructs the browser to handle the transition as a client-side route update.

### Options Signature
```typescript
navigateEvent.intercept({
  scroll?: 'auto' | 'manual', // Defaults to 'auto'
  focusReset?: 'after-transition' | 'manual', // Defaults to 'after-transition'
  handler?: () => Promise<void>
});
```

### Critical Timing Heuristic
> **MUST BE SYNCHRONOUS:** `navigateEvent.intercept()` **must** be called synchronously in the initial tick of the `navigate` event listener. Calling `intercept()` after an `await` statement will throw `InvalidStateError`.

```javascript
// BAD - Throws InvalidStateError!
navigation.addEventListener('navigate', async (event) => {
  const data = await fetch('/api/check');
  event.intercept({ ... }); // TOO LATE!
});

// GOOD - Synchronous interception call
navigation.addEventListener('navigate', (event) => {
  event.intercept({
    async handler() {
      const data = await fetch('/api/check');
      // Update DOM
    }
  });
});
```

---

## 5. Scroll & Focus Synchronization Rules

### Scroll Management (`scroll: 'manual'`)
- By default (`scroll: 'auto'`), the browser attempts scroll restoration immediately when `handler()` resolves.
- For asynchronous SPAs where content takes time to fetch and render, default auto-scroll can trigger prematurely before DOM elements exist.
- **Best Practice:** Set `scroll: 'manual'`. Reset scroll to top `window.scrollTo(0, 0)` for `'push'` / `'replace'` navigations inside the handler after DOM updates complete, or manually restore saved positions for `'traverse'`.

### Focus Management
- Shift keyboard focus to the main container or `<h1 tabindex="-1">` upon completing the route transition.
- Provide screen reader announcements via an `aria-live="polite"` element containing the new `document.title`.

---

## 6. Navigation Guards & Cancellation

To block navigation (e.g. unsaved changes in an active form):

1. Inspect app dirty state inside the `navigate` event listener.
2. Check `navigateEvent.userInitiated` to ensure user actions are guarded.
3. Call `navigateEvent.preventDefault()`.

```javascript
navigation.addEventListener('navigate', (event) => {
  if (isAppDirty && event.userInitiated) {
    if (!confirm('You have unsaved changes. Discard?')) {
      event.preventDefault(); // Prevents URL change and navigation
    }
  }
});
```

---

## 7. Browser Support & Progressive Enhancement

| Browser | Support Status | Notes |
| :--- | :--- | :--- |
| **Chrome / Edge / Opera / Brave** | Supported (v102+) | Native support for `window.navigation`. |
| **Safari (WebKit)** | Under Consideration | Requires fallback to `history.pushState` + delegated click events. |
| **Firefox (Gecko)** | Under Consideration | Requires fallback to `history.pushState` + delegated click events. |

### Progressive Enhancement Pattern
Always feature-detect `window.navigation`. Encapsulate router logic in a unified controller class that routes via `navigation.intercept` when supported, and degrades seamlessly to `history.pushState` and `popstate` listeners when absent.

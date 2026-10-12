# W3C Navigation API Heuristics & Browser Behavior Reference

## Overview

The W3C Navigation API (`window.navigation`) re-architects client-side navigation management on the web platform. Unlike the legacy HTML5 History API, which relied on passive state storage (`history.pushState`) and disconnected window event triggers (`popstate`), the Navigation API introduces an integrated, event-driven navigation pipeline that standardizes link clicks, form submissions, back/forward button history traversal, and programmatic routing.

---

## Navigation Event Lifecycle

Every same-document or cross-document navigation attempt fires a sequence of standard events on `window.navigation`:

```text
[User Interaction / Call]
       │
       ▼
[navigate Event]  ─── (e.canIntercept === false) ──► [Full Page Load / Browser Native]
       │
       ├─► e.preventDefault() ──► [Navigation Cancelled]
       │
       ▼ (e.intercept({ handler }))
[handler() Executing] ─── AbortSignal cancelled ──► [navigateerror Event fired]
       │
       ▼ (Promise Resolves)
[navigatesuccess Event]
       │
       ▼
[DOM Focus / Scroll Restoration Applied]
```

### 1. `navigate` Event
Fired immediately before any navigation takes place (link clicks, form submissions, back/forward buttons, or `navigation.navigate()`).
- Key properties:
  - `e.destination`: Target `NavigationDestination` object containing `url`, `id`, `key`, `index`, and `sameDocument`.
  - `e.navigationType`: Type of navigation (`'push'`, `'replace'`, `'reload'`, `'traverse'`).
  - `e.canIntercept`: Boolean indicating whether client code can intercept this navigation.
  - `e.userInitiated`: Boolean indicating whether user input triggered the action.
  - `e.hashChange`: Boolean indicating whether navigation is only a hash fragment shift.
  - `e.downloadRequest`: Non-null if navigation is a file download.
  - `e.signal`: `AbortSignal` for tracking cancellation or superseded navigations.

### 2. `navigatesuccess` Event
Fired on `window.navigation` after the transition Promise supplied to `e.intercept({ handler })` resolves successfully.

### 3. `navigateerror` Event
Fired on `window.navigation` if the Promise returned by `intercept({ handler })` rejects or if navigation is aborted mid-transition.

---

## Transition Options in `e.intercept()`

When calling `e.intercept()`, developers can pass an options dictionary to configure transition lifecycle behaviors:

```javascript
e.intercept({
  // Async function handling data loading and rendering
  async handler() { ... },

  // Controls focus behavior after transition resolves:
  // - 'after-transition': Automatically focuses body or main target element
  // - 'manual': Disables automatic focus reset
  focusReset: 'after-transition',

  // Controls scroll restoration behavior:
  // - 'after-transition': Automatically restores scroll position
  // - 'manual': Allows custom smooth scroll or manual positioning
  scroll: 'after-transition'
});
```

---

## Navigation History Entries (`NavigationHistoryEntry`)

The Navigation API provides direct inspection of the history entry stack via `navigation.entries()` and `navigation.currentEntry`.

Each `NavigationHistoryEntry` contains:
- `entry.url`: Absolute URL string of the entry.
- `entry.key`: Unique browser-generated string identifier for the history slot (persists across reloads).
- `entry.id`: Unique string identifier for this specific entry instance.
- `entry.index`: Zero-based position in the history entry list.
- `entry.getState()`: Function returning serializable state object associated with this history entry.

---

## Interception Decision Matrix

| Event Condition | Interceptable? | Recommended Action |
| :--- | :--- | :--- |
| **Same-origin GET link click** | Yes (`canIntercept: true`) | Call `e.intercept({ handler })`, fetch data using `e.signal`, update DOM. |
| **Cross-origin link click** | No (`canIntercept: false`) | Let browser perform full cross-document HTTP request. |
| **Same-origin form POST** | Yes (`canIntercept: true`) | Inspect `e.formData`, submit via `fetch()`, render result view or navigate. |
| **`Ctrl+Click` / `Cmd+Click` (New Tab)** | No (`canIntercept: false`) | Automatically bypassed by browser to allow native background tab opening. |
| **Hash-only shift (`#section`)** | Yes (`hashChange: true`) | Allow native scroll or intercept if custom smooth scroll is required. |
| **Download link (`<a download>`)** | No (`downloadRequest: true`) | Allow native browser download handling. |

---

## Fallback Rules for Legacy Browsers

For browsers where `window.navigation` is undefined (Safari < 17, Firefox < 126), apply the following compatibility layer:

1. **Link Click Interception:** Global event delegation listening to `click` on `a[href]`.
2. **History State Updates:** Modern calls to `navigation.navigate()` map to `history.pushState(state, '', url)` or `history.replaceState(state, '', url)`.
3. **Traversal Handling:** `window.addEventListener('popstate')` handles back/forward buttons.
4. **Focus Restoration:** Explicit manual `.focus()` call on main element inside `popstate` or route renderer.

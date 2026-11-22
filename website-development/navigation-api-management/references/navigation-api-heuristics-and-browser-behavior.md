# Navigation API Heuristics and Browser Behavior Reference

This reference provides technical specifications, event lifecycle mechanics, property definitions, and browser compatibility heuristics for the W3C Navigation API (`window.navigation`).

---

## 1. Lifecycle Event Sequence

The Navigation API operates on three core lifecycle events dispatched on the global `window.navigation` object:

```text
[User Action / Call] -> 'navigate' Event -> e.intercept({ handler })
                                               |
                     +-------------------------+-------------------------+
                     | (Handler Resolves)                                | (Handler Rejects / Aborted)
                     v                                                   v
            'navigatesuccess' Event                             'navigateerror' Event
```

### Event Descriptions

1. **`navigate`**: Dispatched synchronously whenever a same-origin navigation is initiated (link click, form submit, back/forward button, location.href assignment, or `navigation.navigate()`). This event can be canceled via `e.preventDefault()` or intercepted via `e.intercept()`.
2. **`navigatesuccess`**: Dispatched after all promises passed to `e.intercept({ handler })` resolve successfully and the URL transition completes.
3. **`navigateerror`**: Dispatched if a promise inside `e.intercept()` rejects or if the navigation is aborted by a newer incoming navigation.

---

## 2. `NavigateEvent` Key Properties and Methods

| Property / Method | Type | Description |
| :--- | :--- | :--- |
| `canIntercept` | `boolean` | `true` if the navigation is same-origin, non-download, and allowed to be handled client-side. |
| `destination` | `NavigationDestination` | Object describing the target location (`url`, `key`, `id`, `index`, `sameDocument`, `getState()`). |
| `navigationType` | `string` | `'push'`, `'replace'`, `'reload'`, or `'traverse'`. |
| `formData` | `FormData \| null` | Contains submitted form data if navigation was triggered by a `<form method="GET|POST">`. |
| `download` | `string \| null` | Non-null if navigation originated from an `a[download]` link. |
| `userInitiated` | `boolean` | `true` if triggered directly by physical user input (e.g. link click, back button). |
| `hashChange` | `boolean` | `true` if navigation only changes the URL fragment hash. |
| `e.intercept(options)` | `function` | Intercepts navigation. Accepts `{ handler: async () => {}, focusReset, scroll }`. |
| `e.preventDefault()` | `function` | Cancels the navigation synchronously, preventing URL address bar updates. |

### Interception Options (`e.intercept(options)`)

- **`handler`**: An asynchronous function returning a Promise. The browser delays completing the navigation until this Promise resolves.
- **`focusReset`**: Controls automatic focus behavior upon navigation completion (`'after-transition'` or `'manual'`). Defaults to `'after-transition'`.
- **`scroll`**: Controls viewport scroll positioning (`'after-transition'` or `'manual'`). Defaults to `'after-transition'`.

---

## 3. NavigationType Taxonomy

The `event.navigationType` string indicates how the navigation was triggered:

- **`push`**: A new history entry is being appended to the stack (e.g. clicking a normal link or calling `navigation.navigate(url, { history: 'push' })`).
- **`replace`**: The current history entry is being replaced in-place (e.g. location redirect or calling `navigation.navigate(url, { history: 'replace' })`).
- **`reload`**: The user refreshed the page or `navigation.reload()` was called.
- **`traverse`**: The user clicked browser Back or Forward buttons, or programmatic traversal occurred (`navigation.back()`, `navigation.forward()`, `navigation.traverseTo(key)`).

---

## 4. Navigation History Entries (`NavigationHistoryEntry`)

The `window.navigation` object maintains a list of history entries representing the current session stack:

```javascript
// Access active entry
const current = window.navigation.currentEntry;
console.log(current.key, current.id, current.url, current.getState());

// Inspect full stack history
const entries = window.navigation.entries();
entries.forEach((entry, index) => {
  console.log(`[${index}] ${entry.url} (Same document: ${entry.sameDocument})`);
});
```

### Entry Properties

- **`key`**: Unique string identifier per history slot that persists across reloads and traverses.
- **`id`**: Unique string identifier per document entry instance.
- **`url`**: Full URL string of the entry.
- **`sameDocument`**: Boolean indicating if the entry belongs to the current document.
- **`getState()`**: Returns the serializable JavaScript state object attached to the entry via `navigation.navigate(url, { state })`.

---

## 5. Browser Compatibility & Fallback Heuristics

| Browser Engine | Support Status | Fallback Strategy |
| :--- | :--- | :--- |
| **Chromium 102+** (Chrome, Edge, Opera, Brave) | **Full Native Support** | Use `window.navigation` natively. |
| **Safari / WebKit** | **Under Development / Unsupported** | Fall back to `document.addEventListener('click')` + `history.pushState()` + `popstate`. |
| **Firefox / Gecko** | **Under Development / Unsupported** | Fall back to `document.addEventListener('click')` + `history.pushState()` + `popstate`. |

### Feature Detection Pattern

```javascript
if ('navigation' in window) {
  // Use W3C Navigation API
} else {
  // Use HTML5 History API fallback
}
```

---

## 6. Integration with View Transitions API

When combining the Navigation API with the View Transitions API (`document.startViewTransition`), wrap the DOM mutation step inside the `handler` callback:

```javascript
window.navigation.addEventListener('navigate', (event) => {
  if (!event.canIntercept) return;

  const url = new URL(event.destination.url);

  event.intercept({
    async handler() {
      const newHtml = await fetchViewHtml(url.pathname);

      if (document.startViewTransition) {
        await document.startViewTransition(() => {
          document.querySelector('main').innerHTML = newHtml;
        }).finished;
      } else {
        document.querySelector('main').innerHTML = newHtml;
      }
    }
  });
});
```

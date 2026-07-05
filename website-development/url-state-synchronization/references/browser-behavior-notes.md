# Browser Behavior Notes: URL State

Managing state in the URL involves several browser APIs and behaviors that have specific nuances.

## 1. The History API

- **`pushState(state, title, url)`**: Adds a new entry to the browser's history stack. The user can click "Back" to return to the previous state.
- **`replaceState(state, title, url)`**: Modifies the current history entry without adding a new one. This is useful for "mid-way" states like typing in a search field or closing a temporary menu.
- **State Object**: The first argument to these methods can be any serializable object. This object is retrieved via `event.state` during a `popstate` event.

## 2. Events

- **`popstate`**: Fired when the active history entry changes while the user navigates the session history (e.g., clicking Back/Forward or calling `history.back()`).
  - *Note:* It is **not** fired by calls to `pushState()` or `replaceState()`.
- **`hashchange`**: Fired when the fragment identifier (the part starting with `#`) changes. While hashes were historically used for state, `URLSearchParams` with the History API is now the standard for modern web applications.

## 3. URLSearchParams API

Modern browsers provide the `URLSearchParams` interface to easily work with query strings.
- **Parsing:** `const params = new URLSearchParams(window.location.search);`
- **Retrieving:** `params.get('key')` (returns string or `null`).
- **Checking:** `params.has('key')`.
- **Iterating:** `for (const [key, value] of params) { ... }`.
- **Automatic Encoding:** `URLSearchParams` automatically handles `encodeURIComponent` for you.

## 4. Constraints and Limits

- **Character Limits:** While the HTML spec doesn't define a limit, most browsers and servers (like Apache or Nginx) start failing beyond **2,048 characters**. Keep serialized state concise.
- **Security:** Data in the URL is visible in browser history, server logs, and `Referer` headers. Never store sensitive tokens or PII.
- **SEO:** Search engines typically index URL parameters. If your state changes the content significantly, ensure you use `pushState` and that your server can render the same content for that URL.

## 5. Mobile Considerations

- **Keyboard Dismissal:** On some mobile browsers, updating the URL via `pushState` might occasionally cause the soft keyboard to lose focus or dismiss if not handled carefully within the event loop.
- **Address Bar Interaction:** Frequent `pushState` calls can cause the address bar to flicker or reveal/hide itself in some mobile OS browsers, which may shift the layout (see `mobile-viewport-implementation`).

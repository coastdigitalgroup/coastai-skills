# Browser Behavior Notes: URL State

Managing state in the URL involves several browser-level APIs and behaviors that
developers must understand to ensure a robust implementation.

## The History API

The `History` interface allows manipulation of the browser *session history*,
that is the pages visited in the tab or frame that the current page is loaded
in.

### `pushState(state, title, url)`
Adds an entry to the browser's session history stack.
- **Use case:** Significant UI changes where the user would expect to click
  "Back" to return to the previous state (e.g., changing a page in a result
  list).
- **Limit:** Most browsers have a limit on the size of the `state` object
  (usually ~640k), but it is best to keep it much smaller.

### `replaceState(state, title, url)`
Updates the current history entry instead of creating a new one.
- **Use case:** Incremental updates like typing in a search field or toggling a
  temporary UI setting where dozens of "Back" clicks would be annoying.

### The `popstate` Event
The `popstate` event is fired on the `window` object when the active history
entry changes between two history entries for the same document.
- **Trigger:** Clicking the Back/Forward button or calling `history.back()`.
- **Note:** `history.pushState()` and `history.replaceState()` **do not** trigger
  the `popstate` event themselves. The event only fires for actual browser
  navigation.

## URLSearchParams API

The `URLSearchParams` interface defines utility methods to work with the query
string of a URL.

- **Automatic Encoding:** It handles `encodeURIComponent` internally. If you set
  a value to `"Fish & Chips"`, it will correctly format it as `Fish+%26+Chips`.
- **Iterable:** You can iterate over keys using `for...of` loops.
- **Array Support:** There is no native "array" type in URLs. Common patterns
  include:
  - Repeated keys: `?tag=js&tag=css` (use `params.getAll('tag')`).
  - Comma-separated: `?tags=js,css` (use `params.get('tags').split(',')`).

## Constraints and Limits

### URL Length
While modern browsers (Chrome, Firefox, Safari) can handle URLs up to 32k or even
64k characters, many servers and proxies (like Nginx, Apache, or AWS ALBs)
truncate URLs at **4k or 8k bytes**.
- **Safe Limit:** Aim for **< 2000 characters** for maximum compatibility
  with all legacy infrastructure and Internet Explorer (if still relevant).

### State Object Serialization
The first argument to `pushState` is a state object. This object is
*serialized* by the browser. It must be a "POJO" (Plain Old JavaScript Object)
and cannot contain functions, DOM elements, or circular references.

### Performance
Frequent URL updates (especially `pushState`) can cause minor performance
overhead. On low-end mobile devices, rapid updates to the address bar during
scrolling or fast typing can cause layout stutters. **Always debounce** updates
that happen more than once every 100ms.

## URL Structure: Query (?) vs. Hash (#)

| Feature | Query Parameters (`?`) | Fragment / Hash (`#`) |
| :--- | :--- | :--- |
| **Server Visibility** | Sent to the server on every request. | Never sent to the server. |
| **SEO** | Crawlers index them as different pages. | Crawlers usually ignore them. |
| **Use Case** | Filters, search, pagination. | UI states, anchor links. |
| **Standard** | Parsed via `URLSearchParams`. | Parsed via `location.hash`. |

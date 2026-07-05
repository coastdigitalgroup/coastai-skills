# Browser Behavior: URLSearchParams and History API

Understanding how browsers handle URL manipulation and history management is
crucial for building reliable state synchronization.

## 1. URLSearchParams Behavior

The `URLSearchParams` interface provides consistent methods to work with query
strings.

-   **Type Stringification:** Everything you set in `URLSearchParams` is
    converted to a string. `params.set('page', 1)` becomes `?page=1`.
-   **Sequence Persistence:** Most browsers preserve the order in which
    parameters were added, but this is not guaranteed by specification for all
    edge cases.
-   **Encoding:** `URLSearchParams` automatically handles URL encoding for
    special characters (e.g., spaces become `%20` or `+`).

## 2. History API Limits

-   **URL Length:** While the spec doesn't define a maximum URL length, most
    browsers and servers start failing or truncating around **2,048
    characters**.
-   **State Object Size:** The `state` object passed to `pushState` or
    `replaceState` is typically limited to **640KB** (in Chrome). However, it is
    best practice to keep it much smaller.
-   **Rate Limiting:** Browsers (especially Safari) may rate-limit calls to
    `pushState` and `replaceState`. If you call these in a tight loop (e.g., on
    every scroll event), the browser may throw a security or performance
    exception. Always debounce or throttle these calls.

## 3. Popstate Event Gotchas

-   **User-Initiated Only:** The `popstate` event is only triggered by user
    actions (clicking the Back/Forward button or calling `history.back()`). It is
    **not** triggered by a call to `history.pushState()` or
    `history.replaceState()`.
-   **Initial Page Load:** Some older browsers used to fire `popstate` on the
    initial page load, but modern browsers do not. You should manually parse the
    URL once on `DOMContentLoaded`.

## 4. Hash vs. Search Parameters

| Feature | `?search=params` | `#hash` |
| :--- | :--- | :--- |
| **Server Visibility** | Sent to server. | Stay on the client. |
| **SEO** | Crawlable and indexable. | Generally ignored by crawlers for indexing content. |
| **Purpose** | Data filtering/state. | Page anchors/Fragment navigation. |
| **Compatibility** | Standard since HTML5. | Legacy-friendly (Hash-routing). |

## 5. Security: URL Manipulation

-   **Open Redirects:** Never use a URL parameter to determine a redirect
    location without strict validation.
-   **XSS (Cross-Site Scripting):** If you take a value from the URL and inject
    it directly into the DOM (e.g., `container.innerHTML = params.get('q')`), you
    are vulnerable to XSS. Always use `textContent` or sanitize the input.

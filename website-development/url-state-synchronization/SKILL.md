---
name: url-state-synchronization
description:
  Synchronize UI state with the browser URL using the History API and
  URLSearchParams to enable shareable, bookmarkable, and refresh-resilient
  web experiences.
---

# URL State Synchronization

## Purpose

The URL State Synchronization skill provides a technical protocol for linking
frontend UI state (e.g., filters, search queries, pagination) to the browser's
URL. This ensures that the user's current view can be bookmarked, shared with
others, and persists through a page refresh, while also maintaining a
predictable behavior for the browser's back and forward buttons.

## Use Cases

- **Search and Filter Results:** Keeping search keywords and active filters
  visible in the URL (e.g., `?q=laptop&brand=apple`).
- **Pagination and Sorting:** Persisting the current page number and sort order
  (e.g., `?page=3&sort=price_desc`).
- **Tab and Panel Management:** Reflecting the active tab or sidebar state
  (e.g., `?tab=specs`).
- **Modal and Dialog State:** Allowing users to share a link that opens a
  specific modal or detail view on load.
- **Multi-Step Processes:** Storing the current step of a wizard or form to
  prevent progress loss on refresh.

## When NOT to Use

- **Sensitive Data:** Never store passwords, tokens, or PII in the URL.
- **Large Data Blobs:** Avoid serializing large objects or long lists into the
  URL, as browsers and servers have character limits (typically ~2000 chars).
- **Transient UI States:** Hover states, temporary focus, or high-frequency
  animation states should not clutter the URL.
- **High-Frequency Updates:** Real-time updates (e.g., dragging a slider) should
  only update the URL after debouncing or on interaction completion.

## Inputs

1.  **State Schema:** A definition of which UI properties should be mirrored in
    the URL.
2.  **Browser Environment:** Access to `window.location`, `window.history`, and
    `URLSearchParams`.
3.  **UI Event Triggers:** User actions that modify the state (e.g., clicking a
    filter, changing a page).

## Outputs

1.  **Updated URL:** A browser URL that reflects the current UI state.
2.  **Initialized UI:** An application state derived from the URL parameters on
    page load.
3.  **Functional History:** Correct behavior for Back/Forward navigation using
    the `popstate` event.

## Workflow

### 1. Define the State Schema

Decide which keys and data types will be stored. Use concise keys to keep the
URL readable (e.g., `p` instead of `page_number`, though readability is often
preferred over extreme brevity).

### 2. Initialize UI from URL (On Load)

On application start, read the URL parameters and use them to set the initial
component state.
- Use `new URLSearchParams(window.location.search)` to parse parameters.
- Provide sensible defaults if parameters are missing or invalid.

### 3. Synchronize UI to URL (On Change)

When a user interacts with the UI, update both the internal state and the URL.
- Construct a new `URLSearchParams` object.
- Use `history.pushState()` for actions that represent a "new" view (e.g.,
  different search results).
- Use `history.replaceState()` for actions that are refinements or high-frequency
  updates (e.g., closing a minor panel).

### 4. Handle Navigation (Popstate)

Listen for the `popstate` event to handle cases where the user clicks the Back
or Forward button.
- Re-read the URL and update the UI state to match.
- **Important:** Ensure that the UI update doesn't trigger a *new* URL update,
  which could cause an infinite loop.

### 5. Sanitize and Validate

Always treat URL parameters as untrusted input.
- Cast values to the correct type (e.g., `parseInt()` for page numbers).
- Validate values against a whitelist (e.g., ensuring `tab=profile` is a valid
  tab).

## Decision Rules

- **pushState vs. replaceState:** Use `pushState` if you want the action to
  create a new entry in the browser history (allowing the user to "go back").
  Use `replaceState` if the change is minor or iterative (e.g., live filtering).
- **Search Params (?) vs. Hashes (#):** Use Search Params for state that affects
  the content of the page (standard for modern SEO and analytics). Use Hashes
  only for internal page anchors or when you cannot control server-side routing.
- **Batching Updates:** If multiple UI elements change at once, perform a single
  URL update to avoid cluttering the history stack.

## Constraints

- **URL Length:** Stay under 2,000 characters for maximum compatibility with
  legacy browsers and proxies.
- **Encoding:** Always use `encodeURIComponent()` or `URLSearchParams` to handle
  special characters.
- **Security:** Guard against Cross-Site Scripting (XSS) if you render URL
  parameter values directly into the DOM.

## Non-Goals

- **Server-Side Routing:** This skill focuses on client-side state management,
  not the server's response to different paths.
- **Global State Management:** This is not a replacement for Redux or Vuex,
  but rather a bridge between them and the browser.
- **Permanent Storage:** Use `localStorage` or a database for data that must
  persist beyond a single session or across different browsers.

## Common Failure Patterns

- **The Infinite Loop:** Updating the state triggers a URL update, which
  triggers a state update, and so on.
- **Missing Popstate Listener:** The URL changes when the back button is
  clicked, but the UI remains on the "old" view.
- **Incorrect Type Casting:** Treat `?page=1` as a string `"1"` instead of a
  number, causing math errors or strict equality (`===`) failures.
- **Stale State:** Forgetting to update the URL when a filter is *removed*,
  leaving orphaned parameters.
- **Excessive PushState:** Creating dozens of history entries for every minor
  interaction, making the back button useless for the user.

## Validation Steps

- [ ] **Refresh Test:** Change a filter, refresh the page, and verify the UI
      returns to the same state.
- [ ] **Back Button Test:** Navigate through several states and click "Back" to
      ensure the UI updates correctly at each step.
- [ ] **Direct Entry Test:** Manually type parameters into the URL and verify
      the UI handles valid, invalid, and missing values gracefully.
- [ ] **Shareability Test:** Copy the URL, open it in a private/incognito
      window, and confirm the view is identical.
- [ ] **Encoding Check:** Use special characters (e.g., `&`, `=`, space) in
      search queries and ensure they are correctly encoded/decoded.

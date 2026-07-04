---
name: url-state-synchronization
description:
  Synchronize frontend UI state (filters, search, pagination, tabs) with the URL
  using the History API and URLSearchParams to enable shareable links and robust
  back-button support.
---

# URL State Synchronization

## Purpose

The URL State Synchronization skill provides a technical protocol for linking the
active state of a frontend interface to the browser's URL. It ensures that
dynamic UI changes—such as applying a filter, switching a tab, or navigating
search results—are reflected in the address bar. This enables "Deep Linking,"
allowing users to bookmark specific views, share configured results with others,
and navigate through their interaction history using the browser's Back and
Forward buttons.

## Use Cases

- **Search & Filtering:** Saving active filters, sort orders, and search queries
  so they persist across page refreshes.
- **Pagination:** Syncing the current page number (e.g., `?page=3`) to allow
  sharing specific result sets.
- **Tabs & Accordions:** Ensuring the correct tab is active when a user lands on
  a page via a shared link.
- **Modal & Detail Views:** Linking the open state of a modal or a selected item
  to the URL for direct access.
- **Multi-step Flows:** Persisting the current step of a wizard or form.

## When NOT to Use

- **Sensitive Information:** Never store passwords, tokens, or PII (Personally
  Identifiable Information) in the URL.
- **Large Data Blobs:** URLs have length limits (typically ~2000 characters). Do
  not store complex objects or large arrays.
- **Transient UI States:** States that don't add value when shared (e.g., "is
  button hovering", "is menu open" in a standard layout).
- **Highly Volatile State:** High-frequency updates like mouse positions or
  real-time scroll offsets (unless for specific creative purposes).

## Inputs

1. **State Schema:** A definition of the UI properties that need to be persisted
   (e.g., `query: string`, `filters: string[]`, `page: number`).
2. **URL Parameters:** The keys to be used in the query string (e.g., `q`, `f`,
   `p`).
3. **Trigger Events:** UI interactions (clicks, inputs) that update the state.
4. **History Strategy:** Whether to create a new history entry (`pushState`) or
   update the current one (`replaceState`).

## Outputs

1. **URL Synchronization Logic:** Code that updates the browser's address bar
   whenever the UI state changes.
2. **State Hydration Logic:** Code that reads the URL parameters on page load to
   initialize the UI state.
3. **History Event Handlers:** Listeners for the `popstate` event to update the
   UI when the user navigates through history.

## Workflow

### 1. Define the State-to-URL Mapping

Map your internal UI state object to URL query parameters. Use short but
meaningful keys (e.g., `sort` instead of `currentSortOrderFromDropdown`).

### 2. Implement Initial Hydration

On page load (or component mount), read the `window.location.search`. Use
`URLSearchParams` to parse the values and apply them to your initial UI state.
Handle type conversion (e.g., strings from URL to numbers or booleans).

### 3. Update the URL on State Change

Whenever the UI state is updated via user interaction:
- Create a new `URLSearchParams` object from the current URL.
- Update or delete keys based on the new state.
- Decide between `history.pushState()` (creates a new back-button step) or
  `history.replaceState()` (updates the URL without adding a step).
- **Recommendation:** Use `replaceState` for frequent updates (like typing in a
  search box) and `pushState` for discrete actions (like applying a final
  filter).

### 4. Handle "Clean" Defaults

To keep URLs tidy, do not include parameters that match the default state. If
the default page is `1`, remove the `page` parameter when the user returns to it.

### 5. Listen for History Navigation

Add a listener for the `popstate` event. When the user clicks "Back," this event
fires. Re-read the URL and update your UI state to match the "old" URL.

### 6. Debounce High-Frequency Updates

If syncing a text input, debounce the URL update (e.g., 300ms) to prevent
cluttering the browser history and impacting performance with every keystroke.

## Decision Rules

- **`pushState` vs. `replaceState`:**
  - Use **`pushState`** when the change represents a "new view" or a significant
    intent (e.g., clicking a category, moving to a new page of results).
  - Use **`replaceState`** when the change is a refinement of the current view
    (e.g., typing in a search bar, toggling a small UI preference) to avoid
    "Back-Button Hell."
- **Query Params vs. Hash:**
  - Use **Query Parameters** (`?key=val`) for most states as they are standard
    and sent to the server (useful for SSR).
  - Use **Hash** (`#key=val`) only for purely client-side states that should
    never reach the server or for "Jump to Section" behavior.

## Constraints

- **URL Length:** Stay well below 2000 characters to ensure compatibility across
  all browsers and proxies.
- **Serialization:** Complex data (arrays/objects) must be serialized to
  strings (e.g., comma-separated values or JSON-encoded).
- **Browser Support:** The History API and `URLSearchParams` are standard in
  modern browsers but may need polyfills for very old environments.

## Non-Goals

- Implementing server-side routing logic.
- Managing complex global state (e.g., Redux/Vuex) beyond the URL interaction.
- Handling navigation between different HTML documents.

## Common Failure Patterns

- **The Infinite Loop:** Updating the state triggers a URL update, which
  re-triggers the state update, and so on.
- **Type Mismatch:** Reading a `?page=2` from the URL as the string `"2"` and
  performing math on it, leading to bugs.
- **Stale State on Back Button:** Forgetting to listen to `popstate`, causing
  the URL to change when "Back" is clicked but the UI to stay on the "New" view.
- **History Bloat:** Using `pushState` for every character typed in a search box,
  requiring the user to click "Back" 50 times to leave the page.
- **Unencoded Characters:** Failing to use `URLSearchParams` or `encodeURIComponent`,
  leading to broken URLs when special characters (like `&` or `#`) are used in
  values.

## Validation Steps

- [ ] **Refresh Test:** Configure the UI (filter, page), refresh the page. Does
      the UI return exactly to its configured state?
- [ ] **Back/Forward Test:** Change the state multiple times. Do the browser's
      Back and Forward buttons correctly restore the UI state at each step?
- [ ] **Share Test:** Copy the URL, open it in a new "Incognito/Private" window.
      Does it load the correct view?
- [ ] **Default State Test:** Return the UI to its default state. Are the
      corresponding parameters removed from the URL?
- [ ] **Character Test:** Use special characters (spaces, symbols) in a search
      input. Does the URL remain valid and the state restore correctly?

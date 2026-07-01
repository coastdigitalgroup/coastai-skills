# Bfcache Eligibility and Debugging Reference

Ensuring a page is eligible for bfcache requires avoiding specific APIs and
header configurations that signal to the browser that the page cannot be safely
frozen and restored.

## Common Bfcache Blockers

The following are the most common reasons a page is excluded from bfcache:

### 1. `unload` Event Listeners
The use of `window.onunload` or `window.addEventListener('unload', ...)` is the
single most common reason for bfcache exclusion. Modern browsers cannot
guarantee that the page is in a stable state to be restored if an `unload`
handler has performed destructive cleanup.

**Solution:** Use `pagehide` instead.

### 2. `Cache-Control: no-store`
The `no-store` directive tells the browser that the response should never be
stored in any cache, including the in-memory bfcache.

**Solution:** Use `Cache-Control: no-cache` or `must-revalidate`. These allow
the page to be kept in bfcache, as the browser will still perform a
re-validation check (or handle it via the `persisted` event) when the user
navigates back.

### 3. Active "Blocking" Connections
Some browsers will exclude a page if it has active connections that it doesn't
know how to "freeze" safely.
- **WebSockets:** Open connections may block caching in some browsers.
- **SSE (Server-Sent Events):** Similarly can block caching.
- **Plugin/Extension Interaction:** Some browser extensions may prevent
  caching if they are actively modifying the DOM or network state.

### 4. `window.open` with `opener`
If a page was opened via `window.open` and still has a reference to its
`window.opener`, it might be ineligible for bfcache to prevent state
inconsistencies between the two windows.

## How to Debug in Chrome

Chrome provides a dedicated panel for auditing bfcache eligibility.

1.  Open **Chrome DevTools**.
2.  Navigate to the **Application** tab.
3.  On the left sidebar, select **Back/forward cache**.
4.  Click the **Test back/forward cache** button.
5.  Chrome will navigate away and then attempt to navigate back.
6.  The panel will display:
    - **Success:** If the page was successfully restored.
    - **Failure Reason:** A detailed breakdown of why the page was excluded
      (e.g., "Page used unload listener", "Response contains no-store").

## Browser Support & Differences

| Feature | Chrome / Edge | Firefox | Safari |
| :--- | :--- | :--- | :--- |
| **Bfcache Support** | Yes | Yes | Yes (First to implement) |
| **`unload` behavior** | Blocks | Blocks | Usually Blocks |
| **`no-store` behavior** | Blocks | Blocks | Blocks |
| **`persisted` property** | Supported | Supported | Supported |

*Note: Safari (WebKit) is often more aggressive with bfcache and may cache
pages even with certain blockers, but following the standards in this skill
ensures compatibility across all three engines.*

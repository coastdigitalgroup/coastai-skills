---
name: bfcache-optimization
description:
  Optimize website navigation speed by ensuring pages are eligible for the
  Back/Forward Cache (bfcache), enabling instant transitions when users
  navigate back and forth.
---

# Back/Forward Cache (bfcache) Optimization

## Purpose

The Back/Forward Cache (bfcache) Optimization skill provides a technical protocol
for making websites eligible for the browser's instant navigation cache. It
solves the "cold reload" problem where navigating back or forward triggers a
full page reload, re-executing all scripts and re-fetching resources, which
degrades user experience and Core Web Vitals (specifically LCP and INP).

## Use Cases

- **E-commerce:** Ensuring users can return to product listings instantly from a
  product detail page without losing scroll position or waiting for a reload.
- **Content Platforms:** Allowing readers to toggle between articles and feeds
  with zero latency.
- **Search Results:** Enabling instant return to search results after viewing a
  specific result.
- **Improving Core Web Vitals:** Reducing the impact of "back-navigation" on
  Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP).

## When NOT to Use

- **High-Security Financial Transactions:** Pages that display extremely
  sensitive, time-bound data (like a one-time transaction code) may need to
  explicitly disable bfcache to ensure stale sensitive data isn't shown.
- **Short-Lived Dynamic Content:** If the page content changes every few seconds
  and showing a 30-second-old version is fundamentally broken for the user.

## Inputs

1. **Navigation Flow:** Identification of common back/forward paths (e.g.,
   List -> Detail).
2. **Current Event Listeners:** Audit of `unload` and `beforeunload` usage.
3. **HTTP Headers:** Check for `Cache-Control` settings.
4. **Active Connections:** Identification of open WebSockets, IndexedDB
   transactions, or long-running fetches.

## Outputs

1. **Bfcache-Safe Lifecycle Logic:** Implementation using `pageshow` and
   `pagehide` instead of `load` and `unload`.
2. **State Restoration Scripts:** Logic to refresh stale or sensitive data when
   a page is restored from cache.
3. **Clean-up Routines:** Logic to close connections (WebSockets, timers) during
   `pagehide`.

## Workflow

### 1. Audit for Blockers

- **Event Listeners:** Remove any `unload` listeners. They are the #1 reason
  for bfcache ineligibility.
- **Cache-Control:** Check for `Cache-Control: no-store`. This header prevents
  browsers from putting the page in bfcache.
- **Connections:** Ensure WebSockets or active IndexedDB transactions are closed
  before the page is cached.

### 2. Transition to Modern Lifecycle Events

- Replace `window.addEventListener('unload', ...)` with
  `window.addEventListener('pagehide', ...)`.
- Replace `window.addEventListener('load', ...)` with
  `window.addEventListener('pageshow', ...)` for logic that needs to run every
  time the page becomes visible, even if restored from cache.

### 3. Handle State Restoration

In your `pageshow` listener, check the `persisted` property:

```javascript
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // This page was restored from bfcache
    // Refresh stale data (e.g., shopping cart count, login status)
  }
});
```

### 4. Manage Resources during Pagehide

Use the `pagehide` event to pause background work or close connections:

```javascript
window.addEventListener('pagehide', (event) => {
  if (event.persisted) {
    // The page is going into bfcache
    // Pause video, clear intervals, close WebSockets
  }
});
```

### 5. Debug Eligibility

- Use **Chrome DevTools -> Application -> Back/forward cache** to run a test on
  any page and see exactly why it was not cached.
- Verify the "Not Restored" reasons and fix them systematically.

## Decision Rules

- **`unload` vs `pagehide`:** Always use `pagehide`. `unload` is unreliable and
  guarantees bfcache failure in many browsers.
- **`no-cache` vs `no-store`:** Use `Cache-Control: no-cache` if you want the
  browser to revalidate with the server but still allow bfcache. Only use
  `no-store` if the data is so sensitive it must never touch the disk or cache.
- **`beforeunload` usage:** Only use `beforeunload` to warn about unsaved
  changes. If you use it, ensure it's added only when changes are pending and
  removed immediately after.

## Constraints

- **Single Page Apps (SPA):** bfcache is a browser-level feature for
  multi-page navigations. For SPA internal navigations, use
  `focus-management-client-side-navigation`.
- **Browser Differences:** Chrome, Firefox, and Safari have slightly different
  eligibility criteria. Always test in multiple engines.
- **Iframes:** If an iframe on your page uses an `unload` handler, it can block
  the entire top-level page from entering bfcache.

## Non-Goals

- Managing client-side routing in SPAs.
- Implementing general HTTP caching (Service Workers).
- Optimizing initial server response time (TTFB).

## Common Failure Patterns

- **The `unload` Trap:** Leaving a legacy `unload` listener for analytics that
  silently kills bfcache for 100% of users.
- **Stale User State:** Navigating back to a page where the user is now logged
  out, but the cached page still shows "Welcome, User" because `pageshow`
  restoration wasn't handled.
- **Open WebSockets:** Keeping a socket open during `pagehide`, which can lead
  to the browser discarding the cached page to save resources.
- **Mismatched UI:** Components that rely on `DOMContentLoaded` to initialize;
  this event does NOT fire when restoring from bfcache.

## Validation Steps

- [ ] **DevTools Audit:** Run the "Back/forward cache" test in Chrome DevTools
      Application panel; ensure "Success" is reported.
- [ ] **State Restoration Test:** Navigate away and back; verify that dynamic
      elements (like cart counts) are updated via `pageshow`.
- [ ] **Console Monitoring:** Verify that no "unload" listeners are active in the
      project.
- [ ] **Network Check:** Confirm `Cache-Control` headers do not include `no-store`
      unless strictly necessary for security.

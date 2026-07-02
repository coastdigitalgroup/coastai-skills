# Bfcache Eligibility and Debugging

A page's ability to be stored in the Back/Forward Cache (bfcache) depends on
a variety of factors across different browser engines.

## 1. Primary Blockers (Common across all browsers)

| Feature | Impact | Recommendation |
|---------|--------|----------------|
| `unload` listener | **High** | Remove entirely. Use `pagehide`. |
| `Cache-Control: no-store` | **High** | Use `no-cache` instead if possible. |
| Open WebSockets | **Medium** | Close in `pagehide` (if `event.persisted`). |
| Active IndexedDB | **Medium** | Finish or abort transactions in `pagehide`. |
| `beforeunload` | **Low** | Only add if there are unsaved changes; remove after. |

## 2. Browser-Specific Behaviors

### Chrome (Chromium)
- **Aggressive Caching:** Chromium-based browsers are very proactive with
  bfcache.
- **Debugging:** Open **DevTools > Application > Back/forward cache**. You can
  click "Test back/forward cache" to see a report.

### Safari (WebKit)
- **Pioneer:** WebKit was the first to implement bfcache (around 2009).
- **Strictness:** Safari is very sensitive to `unload` handlers anywhere in
  the frame tree (including iframes).

### Firefox (Gecko)
- **Variable Support:** Firefox has had bfcache for a long time but its
  eligibility criteria for "large" pages can be more restrictive than Chrome.

## 3. The `Cache-Control` Nuance

- `Cache-Control: no-store`: The browser **will not** put the page in bfcache.
  It must be re-fetched every time.
- `Cache-Control: no-cache`: The browser **can** put the page in bfcache.
  However, it may revalidate the page with the server upon restoration (though
  bfcache usually bypasses the network entirely).

## 4. Debugging Checklist

1.  **Check the Header:** Ensure `no-store` is not present.
2.  **Scan for `window.onunload`:** Look for any scripts (especially analytics)
    using the `unload` event.
3.  **Audit Iframes:** Third-party iframes (ads, social buttons) often inject
    `unload` listeners that block the parent page.
4.  **Simulate Restoration:** In DevTools, use the "Test back/forward cache"
    utility to see real-time failure reasons.

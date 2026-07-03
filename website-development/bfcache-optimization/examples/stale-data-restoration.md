# Handling Stale Data on Bfcache Restoration

When a page is restored from bfcache, it is restored to the exact state it was
in when the user left. This means that data which may have changed in the
meantime (like a user's login status, shopping cart count, or a time-sensitive
price) will be stale.

This example shows how to use the `pageshow` event to refresh critical UI
elements without reloading the entire page.

## Before: Stale UI

In this version, the cart count is only fetched on the initial page load. If
a user adds an item to their cart on a different page and then clicks "Back",
the count will be wrong.

```javascript
// This only runs on the first time the page loads
document.addEventListener('DOMContentLoaded', async () => {
  const cartData = await fetch('/api/cart-summary');
  updateCartUI(cartData.count);
});
```

## After: Fresh UI via `pageshow`

By using the `pageshow` event and checking `event.persisted`, we can detect
when the page has been restored from cache and trigger a targeted update.

```javascript
// Function to refresh sensitive UI components
async function refreshState() {
  try {
    const response = await fetch('/api/cart-summary');
    const data = await response.json();
    updateCartUI(data.count);

    // Also update any user-specific "Welcome" messages or tokens
    updateUserSession(data.user);
  } catch (err) {
    console.error('Failed to refresh stale data:', err);
  }
}

// Handle initial load AND bfcache restoration
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('Page restored from bfcache. Refreshing stale data...');
    refreshState();
  } else {
    // Standard page load: logic is likely already handled by DOMContentLoaded,
    // but you could also consolidate here if preferred.
    console.log('Standard page load.');
  }
});

// For performance, we can also use Visibility API to refresh data
// whenever the user switches back to this tab.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    refreshState();
  }
});
```

## Key Differences

1.  **Event Choice:** We moved from `DOMContentLoaded` (which doesn't fire on
    restoration) to `pageshow`.
2.  **`event.persisted`:** This property is the definitive way to know the
    page came from bfcache rather than a fresh server request.
3.  **Targeted Fetch:** We only fetch the minimal necessary data (`cart-summary`)
    rather than forcing a full `location.reload()`, which would defeat the
    purpose of the instant bfcache navigation.

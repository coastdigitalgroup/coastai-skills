# Handling Stale Data on bfcache Restoration

When a page is restored from bfcache, the browser does not "reload" the page.
It simply restores the entire DOM and JS state as it was when the user
navigated away. This means that data which may have changed (like login
status, shopping cart counts, or notifications) will be stale.

This example shows how to detect a bfcache restoration and refresh critical UI
elements.

## Before: Traditional `load` only

This implementation only runs when the page is first loaded. If the user
navigates back, the cart count will be exactly what it was when they left,
even if they added items on a subsequent page.

```javascript
// main.js
document.addEventListener('DOMContentLoaded', () => {
  const cartCount = document.getElementById('cart-count');

  // Only runs on initial load
  fetch('/api/cart-summary')
    .then(res => res.json())
    .then(data => {
      cartCount.textContent = data.count;
    });
});

// Using unload for analytics (Kills bfcache!)
window.addEventListener('unload', () => {
  navigator.sendBeacon('/analytics', JSON.stringify({ event: 'page_exit' }));
});
```

## After: bfcache-aware Implementation

This implementation uses `pageshow` to handle both initial loads and cache
restorations, and moves exit logic to `pagehide` to preserve bfcache
eligibility.

```javascript
// bfcache-aware.js

/**
 * Updates the UI with the latest user data.
 * Can be called on initial load and on bfcache restoration.
 */
async function refreshUserState() {
  const cartCount = document.getElementById('cart-count');
  try {
    const res = await fetch('/api/cart-summary');
    const data = await res.json();
    cartCount.textContent = data.count;
  } catch (err) {
    console.error('Failed to refresh cart:', err);
  }
}

// Handle both initial load and cache restoration
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('Page restored from bfcache. Refreshing stale data...');
    refreshUserState();
  } else {
    console.log('Page loaded normally.');
    // refreshUserState() is called here or via DOMContentLoaded
  }
});

// Use pagehide instead of unload to keep bfcache eligibility
window.addEventListener('pagehide', (event) => {
  // Log exit analytics
  const data = JSON.stringify({
    event: 'page_exit',
    persisted: event.persisted // Tells us if the page entered bfcache
  });
  navigator.sendBeacon('/analytics', data);

  // Close or pause resources if entering cache
  if (event.persisted) {
    stopVideoPlayback();
    closeWebSockets();
  }
});

function stopVideoPlayback() {
  const videos = document.querySelectorAll('video');
  videos.forEach(v => v.pause());
}

function closeWebSockets() {
  if (window.socket) {
    window.socket.close();
  }
}
```

## Why this works
1. **Removes `unload`:** By switching to `pagehide`, we remove the primary blocker
   that tells the browser "this page is doing something complex during exit,
   don't cache it."
2. **Uses `event.persisted`:** The `pageshow` event fires after `load` on initial
   visit, and *instead* of `load` on back/forward visits. The `persisted`
   boolean is the key to knowing if you need to "fix" a stale UI.
3. **Graceful Degradation:** This pattern works perfectly in browsers that
   don't support bfcache; they simply never see `event.persisted` as `true`.

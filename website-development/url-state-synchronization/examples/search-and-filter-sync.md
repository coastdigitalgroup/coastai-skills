# Example: Search and Filter URL Synchronization

This example demonstrates how to synchronize a product search and filter UI with
the URL using vanilla JavaScript and the History API.

## Implementation Overview

The script handles three main responsibilities:
1.  **Restoration:** Reading the URL on page load to set the initial UI state.
2.  **Synchronization:** Updating the URL when the user interacts with filters.
3.  **Navigation:** Listening for the `popstate` event to keep the UI in sync
    when the user uses the browser's Back/Forward buttons.

### HTML Structure

```html
<div class="product-search">
  <!-- Search Input (Debounced) -->
  <div class="field">
    <label for="search-input">Search Products</label>
    <input type="search" id="search-input" placeholder="e.g., Running shoes...">
  </div>

  <!-- Category Filter (Instant) -->
  <div class="field">
    <label for="category-select">Category</label>
    <select id="category-select">
      <option value="all">All Categories</option>
      <option value="footwear">Footwear</option>
      <option value="apparel">Apparel</option>
      <option value="accessories">Accessories</option>
    </select>
  </div>
</div>
```

### JavaScript Implementation

```javascript
// Configuration: Default values
const DEFAULTS = {
  q: '',
  category: 'all'
};

const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');

/**
 * 1. RESTORATION: Parse URL and update UI
 */
function syncUIToURL() {
  const params = new URLSearchParams(window.location.search);

  // Update Search Input
  searchInput.value = params.get('q') || DEFAULTS.q;

  // Update Category Select
  categorySelect.value = params.get('category') || DEFAULTS.category;

  // Trigger data fetching logic here...
  console.log('Fetching results for:', {
    q: searchInput.value,
    category: categorySelect.value
  });
}

/**
 * 2. SYNCHRONIZATION: Update URL when UI changes
 */
function updateURL(method = 'pushState') {
  const params = new URLSearchParams();

  // Only add to URL if it differs from default
  if (searchInput.value !== DEFAULTS.q) {
    params.set('q', searchInput.value);
  }

  if (categorySelect.value !== DEFAULTS.category) {
    params.set('category', categorySelect.value);
  }

  const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;

  // Use history API to update the URL without a page reload
  window.history[method]({ path: newURL }, '', newURL);
}

// Debounce helper to prevent history bloat on every keystroke
let debounceTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Use replaceState for search input to avoid "back button hell"
    updateURL('replaceState');
    syncUIToURL();
  }, 300);
});

// Use pushState for category changes as they feel like distinct steps
categorySelect.addEventListener('change', () => {
  updateURL('pushState');
  syncUIToURL();
});

/**
 * 3. NAVIGATION: Handle browser back/forward buttons
 */
window.addEventListener('popstate', () => {
  syncUIToURL();
});

// Initial load
syncUIToURL();
```

## Key Benefits

1.  **Deep Linking:** A user can search for "shoes" in the "footwear" category,
    copy the URL (`?q=shoes&category=footwear`), and share it.
2.  **Clean History:** Typing in the search bar uses `replaceState`, so the user
    isn't forced to click "Back" 20 times to leave the page.
3.  **Performance:** Debouncing ensures the URL isn't updated on every single
    character, saving CPU cycles and preventing history stack overflow.
4.  **Minimal URLs:** By only adding non-default values to the URL, it stays
    concise and readable.

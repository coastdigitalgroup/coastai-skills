# Load More vs. Infinite Scroll Patterns

This example demonstrates the transition from a standard "Load More" button to an automated "Infinite Scroll" pattern, focusing on the accessibility requirements for both.

## Scenario: Product Listing Page

We have a product grid that fetches items from a mock API. We want to ensure that screen reader users know when new content is added and that keyboard users don't get "trapped" or lose their place.

### 1. The "Load More" Pattern (Accessible)

This is the safest pattern for accessibility because it is user-initiated.

```html
<!-- The Container -->
<div id="product-grid" class="grid">
  <!-- Items are injected here -->
</div>

<!-- Status Region for Screen Readers -->
<div id="status-region" class="sr-only" aria-live="polite"></div>

<!-- The Trigger -->
<div class="actions">
  <button id="load-more-btn" type="button">Load More Products</button>
  <div id="loading-spinner" class="hidden">Loading...</div>
</div>

<script>
  let page = 1;
  const grid = document.getElementById('product-grid');
  const btn = document.getElementById('load-more-btn');
  const status = document.getElementById('status-region');

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    status.textContent = 'Loading more products...';

    const items = await fetchProducts(++page);

    // Append items
    items.forEach((item, index) => {
      const el = createProductElement(item);
      // Accessibility: Set an ID on the first new item to move focus if needed
      if (index === 0) el.id = `item-new-${page}`;
      grid.appendChild(el);
    });

    status.textContent = `${items.length} new products added. Total: ${grid.children.length}`;
    btn.disabled = false;

    // Optional: Move focus to the first new item for keyboard users
    // document.getElementById(`item-new-${page}`).focus();
  });
</script>
```

### 2. The "Infinite Scroll" Pattern (Intersection Observer)

This automated pattern requires careful handling of the "Unreachable Footer" and ARIA announcements.

```javascript
const sentinel = document.createElement('div');
sentinel.id = 'scroll-sentinel';
document.body.appendChild(sentinel);

const observer = new IntersectionObserver((entries) => {
  const [entry] = entries;
  if (entry.isIntersecting && !isLoading) {
    loadNextPage();
  }
}, {
  rootMargin: '200px', // Start loading before the user reaches the bottom
});

observer.observe(sentinel);

async function loadNextPage() {
  isLoading = true;
  status.textContent = 'Loading more products...';

  const items = await fetchProducts(++page);

  if (items.length === 0) {
    observer.disconnect(); // No more data
    status.textContent = 'No more products to load.';
    return;
  }

  renderItems(items);
  status.textContent = `${items.length} new products added.`;
  isLoading = false;
}
```

## Before vs. After: Fixing an Inaccessible Infinite Scroll

### Before (Common Failures)
- Uses `window.onscroll` (Performance lag).
- No `aria-live` (Screen readers are silent).
- No "End of Content" state (User keeps scrolling into a void).
- No scroll restoration (User loses place after clicking a link).

### After (Optimized)
- Uses `IntersectionObserver` (No main-thread lag).
- Uses `aria-live="polite"` (Users are notified of background updates).
- Includes an `End of Data` message (Clear UI conclusion).
- Implements `history.replaceState` or session storage to save the scroll position and page count.

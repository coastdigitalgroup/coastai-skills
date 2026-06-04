# Example: Refactoring a Blocking Task for Better Interaction

This example demonstrates how a "heavy" interaction—filtering a large list of
products—can be refactored to improve Interaction to Next Paint (INP) by
yielding to the main thread.

## The Problem (Before)

In this version, the filtering logic runs synchronously. If there are thousands
of items, the main thread is blocked for several hundred milliseconds. The
user's click is not acknowledged (the UI stays frozen) until the entire list is
processed.

```javascript
// BEFORE: Blocking Interaction
const filterInput = document.querySelector('#product-filter');
const productList = document.querySelector('#product-list');

filterInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  // This loop is a "Long Task" that blocks the main thread
  const items = Array.from(productList.children);
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    const isMatch = text.includes(query);
    item.style.display = isMatch ? 'block' : 'none';
  });

  // The browser cannot paint the changes until this entire
  // function finishes, leading to high INP.
});
```

## The Solution (After)

In this version, we provide immediate visual feedback (a loading state) and
then use a scheduler utility to process the list in small chunks, yielding
to the browser after each chunk so it can paint the frames.

```javascript
// AFTER: Yielding Interaction
const filterInput = document.querySelector('#product-filter');
const productList = document.querySelector('#product-list');

// A simple yielding utility
const yieldToMain = () => {
  if (window.scheduler && scheduler.yield) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
};

filterInput.addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase();

  // 1. Immediate Feedback: Optional loading state or visual acknowledge
  productList.classList.add('filtering');

  const items = Array.from(productList.children);
  const CHUNK_SIZE = 100;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.textContent.toLowerCase();
    const isMatch = text.includes(query);
    item.style.display = isMatch ? 'block' : 'none';

    // 2. Yield every CHUNK_SIZE items to allow the browser to paint
    if (i > 0 && i % CHUNK_SIZE === 0) {
      await yieldToMain();
    }
  }

  // 3. Cleanup
  productList.classList.remove('filtering');
});
```

## Key Improvements

1.  **Lower Interaction Latency:** The initial event handler finishes almost
    instantly, allowing the browser to acknowledges the user's input.
2.  **Visual Progress:** If the list is very large, the user sees the list
    updating in "waves" rather than waiting for one giant freeze.
3.  **Responsiveness:** The user can interrupt the process (e.g., by typing
    another character) because the main thread isn't locked up.

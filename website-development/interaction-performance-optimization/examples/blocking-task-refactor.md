# Example: Refactoring a Blocking Interaction

This example demonstrates how to refactor a common frontend performance
bottleneck: a search filter that blocks the UI while processing a large dataset.

## The Problem (Before)

When the user types in the search box, the `handleSearch` function runs a heavy
filtering logic synchronously. On a large list (e.g., 5,000 items), this task
can take 300ms+, causing a visible "freeze" where the text they typed doesn't
appear in the input until the calculation is finished.

### Before: Blocking Implementation

```javascript
// A heavy, synchronous task triggered by an input event
const handleSearch = (event) => {
  const query = event.target.value;

  // 1. Immediate UI update (Blocked by the loop below)
  updateSearchInput(query);

  // 2. Heavy processing (Takes 300ms)
  const results = allItems.filter(item => {
    return complexSearchLogic(item, query);
  });

  // 3. Render results
  renderResults(results);
};

// Attached directly to input
searchInput.addEventListener('input', handleSearch);
```

## The Solution (After)

The refactored version uses a **yielding** strategy. It ensures the input
field updates immediately and breaks the heavy filtering into smaller chunks,
allowing the browser to "breathe" (render the input and process new keystrokes)
between chunks.

### After: Optimized Implementation

```javascript
// Utility to yield to the main thread
const yieldToMain = () => {
  if (globalThis.scheduler?.yield) {
    return scheduler.yield();
  }
  return new Promise(resolve => setTimeout(resolve, 0));
};

const handleSearchOptimized = async (event) => {
  const query = event.target.value;

  // 1. UPDATE UI IMMEDIATELY
  // This happens in the current task, before we start heavy work.
  updateSearchInput(query);
  showLoadingSpinner();

  // 2. YIELD
  // Allow the browser to paint the input change and spinner.
  await yieldToMain();

  // 3. CHUNKED PROCESSING
  const CHUNK_SIZE = 500;
  let results = [];

  for (let i = 0; i < allItems.length; i += CHUNK_SIZE) {
    const chunk = allItems.slice(i, i + CHUNK_SIZE);

    // Process a small chunk
    const filteredChunk = chunk.filter(item => complexSearchLogic(item, query));
    results = results.concat(filteredChunk);

    // YIELD after every chunk to keep the UI responsive
    // This allows the browser to process more typing or click events
    await yieldToMain();

    // Optional: Abort if the query has changed since we started
    if (currentSearchQuery !== query) return;
  }

  // 4. FINAL RENDER
  renderResults(results);
  hideLoadingSpinner();
};

searchInput.addEventListener('input', handleSearchOptimized);
```

## Why this improves INP

1.  **Reduced Input Delay:** By yielding immediately after the input update, we
    allow the browser to acknowledge the user's keystroke and render it.
2.  **Shortened Processing Time:** The browser never sees a single 300ms task.
    Instead, it sees six 50ms tasks.
3.  **Presentation Fluidity:** The user sees the loading indicator instantly,
    providing immediate visual feedback that the system has received their
    intent.

# Offloading Large Data Processing to a Web Worker

This example demonstrates how to move a heavy data-sorting and filtering
operation from the main thread to a Web Worker.

## The Problem (Before)

Performing a heavy sort on 50,000 records on the main thread causes the UI to
freeze, preventing animations from running and making the page feel unresponsive.

### Main Thread Code (Slow)

```javascript
// main.js
const data = generateLargeDataset(50000);

button.onclick = () => {
  showSpinner();

  // This block freezes the UI for ~500ms+
  const sortedData = data.sort((a, b) => b.value - a.value);
  const filteredData = sortedData.filter(item => item.active);

  updateUI(filteredData);
  hideSpinner();
};
```

## The Solution (After)

By moving the sorting and filtering logic into a Web Worker, the main thread
remains free to handle the spinner animation and user interactions while the
worker processes the data in the background.

### Worker Script (`data-worker.js`)

```javascript
// data-worker.js
self.onmessage = (event) => {
  const { data, threshold } = event.data;

  // Heavy computation happens here, off the main thread
  const processed = data
    .filter(item => item.value > threshold)
    .sort((a, b) => b.value - a.value);

  self.postMessage(processed);
};
```

### Main Thread Code (Responsive)

```javascript
// main.js
const worker = new Worker('data-worker.js');
const data = generateLargeDataset(50000);

button.onclick = () => {
  showSpinner(); // Spinner will animate smoothly!

  worker.postMessage({ data, threshold: 50 });

  worker.onmessage = (event) => {
    updateUI(event.data);
    hideSpinner();
  };

  worker.onerror = (error) => {
    console.error('Worker error:', error);
    hideSpinner();
    showErrorMessage('Processing failed.');
  };
};
```

## Why this is better

1.  **Non-blocking:** The browser's main thread is not occupied by the `sort()`
    and `filter()` calls.
2.  **Smooth Feedback:** The loading spinner can animate at 60fps because the
    main thread is free.
3.  **Parallelism:** On multi-core systems, the worker runs on a separate
    physical core, truly parallelizing the work.

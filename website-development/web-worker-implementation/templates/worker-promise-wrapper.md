# Web Worker Promise Wrapper Template

This template provides a clean, Promise-based way to interact with a Web Worker,
allowing you to `await` results instead of managing manual event listeners.

## 1. Worker Script (`task.worker.js`)

```javascript
/**
 * Boilerplate for the worker-side logic
 */
self.onmessage = async (event) => {
  try {
    const payload = event.data;

    // PERFORM HEAVY WORK HERE
    const result = await performHeavyTask(payload);

    self.postMessage({ type: 'SUCCESS', result });
  } catch (error) {
    self.postMessage({ type: 'ERROR', message: error.message });
  }
};

async function performHeavyTask(data) {
  // Replace with actual logic
  return data;
}
```

## 2. Main Thread Wrapper (`worker-client.js`)

```javascript
/**
 * A reusable wrapper function to run a task in a worker and get a Promise
 * @param {string} workerPath - The path to the worker script
 * @param {any} data - The data to send to the worker
 * @returns {Promise<any>}
 */
export function runInWorker(workerPath, data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath);

    worker.onmessage = (event) => {
      const { type, result, message } = event.data;
      if (type === 'SUCCESS') {
        resolve(result);
      } else {
        reject(new Error(message));
      }
      worker.terminate(); // Clean up immediately after one-off task
    };

    worker.onerror = (error) => {
      reject(new Error('Worker initialization failed'));
      worker.terminate();
    };

    worker.postMessage(data);
  });
}

// Usage:
// try {
//   const result = await runInWorker('task.worker.js', myLargeData);
//   console.log('Worker finished:', result);
// } catch (err) {
//   console.error(err);
// }
```

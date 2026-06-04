/**
 * Task Scheduler Utility
 *
 * A robust utility for breaking up long-running JavaScript tasks to improve
 * Interaction to Next Paint (INP) and maintain main thread responsiveness.
 */

/**
 * Yields control back to the main thread, allowing the browser to process
 * pending inputs and render updates.
 *
 * @returns {Promise<void>}
 */
export const yieldToMain = async () => {
  // Use the modern Scheduler API if available
  if (globalThis.scheduler?.yield) {
    try {
      return await scheduler.yield();
    } catch (e) {
      // Fallback if yield fails (rare)
    }
  }

  // Standard fallback using a zero-delay timeout
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

/**
 * Runs a collection of tasks (or an array of data) in chunks, yielding
 * to the main thread between every chunk.
 *
 * @param {Array|number} collection - The items to process or the total count.
 * @param {Function} taskFn - The function to run for each item.
 * @param {Object} options - Configuration options.
 * @param {number} options.chunkSize - Items to process before yielding (default: 50).
 * @param {Function} options.shouldAbort - Optional callback to stop processing (e.g., query changed).
 */
export const runChunked = async (collection, taskFn, { chunkSize = 50, shouldAbort = () => false } = {}) => {
  const isArray = Array.isArray(collection);
  const total = isArray ? collection.length : collection;

  for (let i = 0; i < total; i++) {
    // Stop if the abort condition is met
    if (shouldAbort()) break;

    // Run the task
    if (isArray) {
      taskFn(collection[i], i);
    } else {
      taskFn(i);
    }

    // Yield every X items
    if ((i + 1) % chunkSize === 0) {
      await yieldToMain();
    }
  }

  // Final yield to ensure any final processing allows a paint
  await yieldToMain();
};

/**
 * Executes a function with a lower priority to prevent blocking user input.
 *
 * @param {Function} fn - The function to execute.
 * @param {string} priority - Priority level ('background', 'user-visible').
 */
export const scheduleTask = (fn, priority = 'user-visible') => {
  if (globalThis.scheduler?.postTask) {
    return scheduler.postTask(fn, { priority });
  }

  // Fallback to requestIdleCallback or setTimeout
  if (globalThis.requestIdleCallback) {
    return requestIdleCallback(() => fn());
  }

  return setTimeout(fn, 0);
};

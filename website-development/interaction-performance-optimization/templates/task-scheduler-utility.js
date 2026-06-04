/**
 * Task Scheduler Utility
 *
 * A lightweight utility to help break up long-running JavaScript tasks
 * and yield control back to the main thread, improving INP.
 */

/**
 * Yields control to the main thread.
 * Uses the modern scheduler.yield() API if available,
 * otherwise falls back to setTimeout.
 *
 * @returns {Promise<void>}
 */
export async function yieldToMain() {
  if (window.scheduler && typeof window.scheduler.yield === 'function') {
    return await window.scheduler.yield();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/**
 * Executes a heavy loop in chunks to avoid blocking the main thread.
 *
 * @param {Array} items - The items to process.
 * @param {Function} callback - The function to run for each item.
 * @param {number} chunkSize - How many items to process before yielding.
 */
export async function chunkedTask(items, callback, chunkSize = 50) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i], i);

    if (i > 0 && i % chunkSize === 0) {
      await yieldToMain();
    }
  }
}

/**
 * High-priority UI update wrapper.
 * Updates the UI immediately, then yields before doing secondary work.
 *
 * @param {Function} criticalUpdate - Logic that must happen for the next frame.
 * @param {Function} nonCriticalWork - Logic that can happen after the frame.
 */
export async function priorityUpdate(criticalUpdate, nonCriticalWork) {
  // 1. Perform the visual update immediately
  criticalUpdate();

  // 2. Yield to let the browser paint the update
  await yieldToMain();

  // 3. Perform the heavier, non-visual work
  if (nonCriticalWork) {
    nonCriticalWork();
  }
}

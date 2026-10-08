/**
 * Prioritized Task Scheduler Utility
 * Production-grade wrapper around W3C Prioritized Task Scheduling API (scheduler.postTask & scheduler.yield)
 * with robust fallbacks (MessageChannel, requestIdleCallback, setTimeout) and TaskController cancellation.
 */

export class PrioritizedScheduler {
  constructor(options = {}) {
    this.timeSliceMs = options.timeSliceMs || 10;
    this.hasPostTask = typeof window !== 'undefined' && 'scheduler' in window && 'postTask' in window.scheduler;
    this.hasYield = typeof window !== 'undefined' && 'scheduler' in window && 'yield' in window.scheduler;

    // Fallback queue infrastructure
    this._messageChannel = null;
    this._channelCallbacks = [];

    if (typeof window !== 'undefined' && 'MessageChannel' in window) {
      this._messageChannel = new MessageChannel();
      this._messageChannel.port1.onmessage = () => {
        const cb = this._channelCallbacks.shift();
        if (cb) cb();
      };
    }
  }

  /**
   * Schedule a prioritized task
   * @param {Function} task - The callback function to execute
   * @param {Object} options - Task options
   * @param {'user-blocking'|'user-visible'|'background'} [options.priority='user-visible']
   * @param {number} [options.delay=0] - Delay in ms before execution
   * @param {AbortSignal} [options.signal] - Signal to abort task execution
   * @returns {Promise<any>}
   */
  async schedule(task, options = {}) {
    const priority = options.priority || 'user-visible';
    const delay = options.delay || 0;
    const signal = options.signal;

    if (signal?.aborted) {
      return Promise.reject(new DOMException('Task aborted before execution', 'AbortError'));
    }

    if (this.hasPostTask) {
      try {
        return await window.scheduler.postTask(task, { priority, delay, signal });
      } catch (err) {
        if (err.name === 'AbortError') throw err;
        // Fall back if native postTask unexpectedly fails
      }
    }

    // Fallback execution logic
    return this._scheduleFallback(task, { priority, delay, signal });
  }

  /**
   * Yield control back to browser render loop within a long task loop
   * @param {'user-blocking'|'user-visible'|'background'} [priority='user-visible']
   * @returns {Promise<void>}
   */
  async yield(priority = 'user-visible') {
    if (this.hasYield) {
      return window.scheduler.yield();
    }

    if (this.hasPostTask) {
      return window.scheduler.postTask(() => {}, { priority });
    }

    // Yield via MessageChannel (macrotask without 4ms clamp)
    if (this._messageChannel) {
      return new Promise((resolve) => {
        this._channelCallbacks.push(resolve);
        this._messageChannel.port2.postMessage(null);
      });
    }

    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  /**
   * Chunk-process an array of items with dynamic yielding based on time budget
   * @template T, R
   * @param {T[]} items - Array of data items to process
   * @param {(item: T, index: number) => R} processor - Item processing function
   * @param {Object} [options]
   * @param {'user-blocking'|'user-visible'|'background'} [options.priority='user-visible']
   * @param {AbortSignal} [options.signal]
   * @param {(progress: number) => void} [options.onProgress]
   * @returns {Promise<R[]>}
   */
  async processChunked(items, processor, options = {}) {
    const priority = options.priority || 'user-visible';
    const signal = options.signal;
    const results = [];
    let lastYieldTime = performance.now();

    for (let i = 0; i < items.length; i++) {
      if (signal?.aborted) {
        throw new DOMException('Chunked processing aborted', 'AbortError');
      }

      results.push(processor(items[i], i));

      if (options.onProgress && i % 50 === 0) {
        options.onProgress((i + 1) / items.length);
      }

      // Check time slice budget
      if (performance.now() - lastYieldTime > this.timeSliceMs) {
        await this.yield(priority);
        lastYieldTime = performance.now();
      }
    }

    if (options.onProgress) {
      options.onProgress(1);
    }

    return results;
  }

  /**
   * Create a cancellable TaskController wrapper
   * @param {'user-blocking'|'user-visible'|'background'} [initialPriority='user-visible']
   * @returns {{ controller: TaskController|AbortController, setPriority: (p: string) => void, abort: (reason?: any) => void }}
   */
  createController(initialPriority = 'user-visible') {
    if (typeof window !== 'undefined' && 'TaskController' in window) {
      const controller = new window.TaskController({ priority: initialPriority });
      return {
        controller,
        signal: controller.signal,
        setPriority: (p) => controller.setPriority(p),
        abort: (reason) => controller.abort(reason)
      };
    }

    // AbortController fallback
    const controller = new AbortController();
    return {
      controller,
      signal: controller.signal,
      setPriority: () => {}, // No-op in fallback
      abort: (reason) => controller.abort(reason)
    };
  }

  /**
   * Internal fallback handler for environments without native scheduler
   * @private
   */
  _scheduleFallback(task, { priority, delay, signal }) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(new DOMException('Task aborted', 'AbortError'));
      }

      const onAbort = () => {
        reject(new DOMException('Task aborted', 'AbortError'));
      };

      if (signal) {
        signal.addEventListener('abort', onAbort, { once: true });
      }

      const execute = async () => {
        try {
          if (signal?.aborted) return;
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          if (signal) {
            signal.removeEventListener('abort', onAbort);
          }
        }
      };

      if (delay > 0) {
        setTimeout(execute, delay);
      } else if (priority === 'background' && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(() => execute());
      } else if (this._messageChannel) {
        this._channelCallbacks.push(execute);
        this._messageChannel.port2.postMessage(null);
      } else {
        setTimeout(execute, 0);
      }
    });
  }
}

export const globalScheduler = new PrioritizedScheduler();

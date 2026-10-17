/**
 * Network Connectivity Manager & Offline Queue Controller
 *
 * Portable Vanilla JS module for detecting network changes, verifying actual
 * internet reachability (preventing "Lie-Fi"), retrying network requests with
 * exponential backoff + full jitter, and queueing offline user mutations.
 */

export class NetworkConnectivityManager {
  /**
   * @param {Object} options
   * @param {string} [options.pingUrl='/api/ping'] URL endpoint to probe for reachability.
   * @param {number} [options.pingInterval=30000] Interval in ms for periodic ping probes.
   * @param {number} [options.timeout=4000] Probe timeout in ms.
   */
  constructor(options = {}) {
    this.pingUrl = options.pingUrl || '/api/ping';
    this.pingInterval = options.pingInterval || 30000;
    this.timeout = options.timeout || 4000;

    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.listeners = new Set();
    this.timerId = null;

    this.handleOnline = this.handleOnline.bind(this);
    this.handleOffline = this.handleOffline.bind(this);

    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  /**
   * Subscribe to network connectivity state changes.
   * @param {Function} callback Function invoked with (isOnline) state.
   * @returns {Function} Unsubscribe function.
   */
  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isOnline);
    return () => this.listeners.delete(callback);
  }

  /**
   * Start periodic reachability ping probing.
   */
  startProbing() {
    this.stopProbing();
    this.timerId = setInterval(() => {
      if (this.isOnline) {
        this.verifyReachability();
      }
    }, this.pingInterval);
  }

  /**
   * Stop periodic reachability ping probing.
   */
  stopProbing() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Actively probe internet reachability using a lightweight HEAD request.
   * Prevents false positives caused by "Lie-Fi" or captive portals.
   * @returns {Promise<boolean>} Resolves to true if reachable.
   */
  async verifyReachability() {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.updateState(false);
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.pingUrl}?_=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const reachable = response.ok || response.status === 204;
      this.updateState(reachable);
      return reachable;
    } catch {
      this.updateState(false);
      return false;
    }
  }

  handleOnline() {
    this.verifyReachability();
  }

  handleOffline() {
    this.updateState(false);
  }

  updateState(onlineState) {
    if (this.isOnline !== onlineState) {
      this.isOnline = onlineState;
      this.listeners.forEach((cb) => cb(this.isOnline));
    }
  }

  destroy() {
    this.stopProbing();
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
    }
    this.listeners.clear();
  }
}

/**
 * Executes a fetch request with Exponential Backoff and Full Jitter retries.
 * @param {string} url
 * @param {RequestInit} [options={}]
 * @param {Object} [retryConfig={}]
 * @returns {Promise<Response>}
 */
export async function fetchWithBackoff(url, options = {}, retryConfig = {}) {
  const {
    maxRetries = 4,
    baseDelay = 1000,
    maxDelay = 16000,
    retryableStatuses = [408, 429, 502, 503, 504],
  } = retryConfig;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok || (!retryableStatuses.includes(response.status) && attempt === maxRetries)) {
        return response;
      }

      if (!retryableStatuses.includes(response.status)) {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (err) {
      if (attempt === maxRetries) throw err;
    }

    // Exponential Backoff with Full Jitter
    const exponentialDelay = Math.min(maxDelay, baseDelay * Math.pow(2, attempt));
    const jitteredDelay = Math.floor(Math.random() * exponentialDelay);

    await new Promise((resolve) => setTimeout(resolve, jitteredDelay));
  }
}

/**
 * Offline Mutation Queue Manager using LocalStorage/IndexedDB fallback.
 */
export class OfflineQueue {
  constructor(storageKey = 'app_offline_queue') {
    this.storageKey = storageKey;
  }

  enqueue(action) {
    const queue = this.getQueue();
    const item = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      attempts: 0,
      ...action,
    };
    queue.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
    return item;
  }

  getQueue() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  remove(id) {
    const queue = this.getQueue().filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

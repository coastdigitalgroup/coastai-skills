/**
 * ScrollRestorationManager
 * Production-grade, framework-agnostic scroll restoration manager for Single Page Applications (SPAs).
 * Solves the scroll clamping bug, sub-container scroll loss, and async content hydration jumps.
 */
export class ScrollRestorationManager {
  /**
   * @param {Object} options
   * @param {boolean} [options.enabled=true] - Enable manual scroll restoration.
   * @param {number} [options.asyncTimeoutMs=3000] - Max time to wait for target document height.
   * @param {string} [options.storagePrefix='spa_scroll_'] - Storage key prefix.
   * @param {number} [options.maxHistoryEntries=50] - Max stored history entries to retain in sessionStorage.
   * @param {Function} [options.onLog] - Optional logger callback.
   */
  constructor(options = {}) {
    this.enabled = options.enabled ?? true;
    this.asyncTimeoutMs = options.asyncTimeoutMs || 3000;
    this.storagePrefix = options.storagePrefix || 'spa_scroll_';
    this.maxHistoryEntries = options.maxHistoryEntries || 50;
    this.onLog = options.onLog || null;

    this._isRestoring = false;
    this.init();
  }

  /**
   * Initialize browser settings and event listeners.
   */
  init() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = this.enabled ? 'manual' : 'auto';
    }

    this.ensureHistoryKey();
    this.bindEvents();
    this.pruneOldEntries();
  }

  /**
   * Ensure the current history state has a unique state key.
   * @returns {string} Unique history key
   */
  ensureHistoryKey() {
    const state = window.history.state || {};
    if (!state.key) {
      const key = `key_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      window.history.replaceState({ ...state, key }, '');
    }
    return window.history.state.key;
  }

  /**
   * Log messages if logger callback is provided.
   * @param {string} message
   */
  log(message) {
    if (typeof this.onLog === 'function') {
      this.onLog(`[ScrollRestorationManager] ${message}`);
    }
  }

  /**
   * Bind global event listeners for scroll state recording.
   */
  bindEvents() {
    window.addEventListener('beforeunload', () => this.saveCurrentState());
  }

  /**
   * Capture and persist current scroll positions for window and sub-containers.
   * Call this before routing away from a view.
   */
  saveCurrentState() {
    if (!this.enabled) return;

    const key = this.ensureHistoryKey();
    const containers = {};

    // Scan for elements with data-scroll-container attribute
    document.querySelectorAll('[data-scroll-container]').forEach((el) => {
      const id = el.getAttribute('data-scroll-id') || el.id;
      if (id) {
        containers[id] = { x: el.scrollLeft, y: el.scrollTop };
      }
    });

    const payload = {
      window: { x: window.scrollX, y: window.scrollY },
      containers,
      docHeight: document.documentElement.scrollHeight,
      timestamp: Date.now()
    };

    try {
      sessionStorage.setItem(`${this.storagePrefix}${key}`, JSON.stringify(payload));
      this.log(`Saved position for key "${key}": window Y=${payload.window.y}px`);
    } catch (err) {
      console.warn('[ScrollRestorationManager] Storage save failed:', err);
    }
  }

  /**
   * Restore scroll positions for the current history state.
   * @param {Object} [options]
   * @param {boolean} [options.smooth=false] - Use smooth scrolling if preferred.
   * @returns {Promise<boolean>} Resolves true when restoration completes.
   */
  async restoreForCurrentState(options = {}) {
    if (!this.enabled) return false;

    const key = window.history.state?.key;
    if (!key) {
      this.log('No history key found on state. Defaulting to top.');
      window.scrollTo(0, 0);
      return false;
    }

    const raw = sessionStorage.getItem(`${this.storagePrefix}${key}`);
    if (!raw) {
      this.log(`No saved scroll record for key "${key}". Scrolling to top.`);
      window.scrollTo(0, 0);
      return false;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error('[ScrollRestorationManager] Invalid JSON in stored position:', e);
      return false;
    }

    this._isRestoring = true;
    const targetY = data.window.y;
    const targetX = data.window.x;

    this.log(`Waiting for document height to accommodate Y=${targetY}px...`);
    await this.waitForTargetHeight(targetY);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = (options.smooth && !prefersReducedMotion) ? 'smooth' : 'instant';

    window.scrollTo({
      left: targetX,
      top: targetY,
      behavior
    });

    // Restore sub-containers
    if (data.containers) {
      Object.entries(data.containers).forEach(([id, pos]) => {
        const el = document.querySelector(`[data-scroll-id="${id}"]`) || document.getElementById(id);
        if (el) {
          el.scrollTop = pos.y;
          el.scrollLeft = pos.x;
          this.log(`Restored container "${id}" to scrollTop=${pos.y}`);
        }
      });
    }

    this._isRestoring = false;
    this.log(`Restoration complete for key "${key}". Final Y=${window.scrollY}px`);
    return true;
  }

  /**
   * Wait until document height is sufficient to avoid scroll clamping.
   * @param {number} targetY
   * @returns {Promise<void>}
   */
  waitForTargetHeight(targetY) {
    const startTime = Date.now();
    return new Promise((resolve) => {
      const check = () => {
        const maxScrollableY = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScrollableY >= targetY || (Date.now() - startTime) >= this.asyncTimeoutMs) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      check();
    });
  }

  /**
   * Prune excess history entries from sessionStorage to respect storage quotas.
   */
  pruneOldEntries() {
    try {
      const keys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          const raw = sessionStorage.getItem(key);
          if (raw) {
            const data = JSON.parse(raw);
            keys.push({ key, timestamp: data.timestamp || 0 });
          }
        }
      }

      if (keys.length > this.maxHistoryEntries) {
        keys.sort((a, b) => a.timestamp - b.timestamp);
        const toDelete = keys.slice(0, keys.length - this.maxHistoryEntries);
        toDelete.forEach((item) => sessionStorage.removeItem(item.key));
        this.log(`Pruned ${toDelete.length} stale scroll entries.`);
      }
    } catch (e) {
      // Ignore storage read/write errors
    }
  }

  /**
   * Clean up event listeners and restore native auto restoration.
   */
  destroy() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
    window.removeEventListener('beforeunload', () => this.saveCurrentState());
  }
}

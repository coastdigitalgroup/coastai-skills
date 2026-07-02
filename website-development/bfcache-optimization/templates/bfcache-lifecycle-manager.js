/**
 * Bfcache Lifecycle Manager Template
 *
 * A reusable boilerplate to manage bfcache eligibility, state restoration,
 * and resource cleanup.
 */

const BfcacheManager = {
  /**
   * Initialize lifecycle listeners.
   * @param {Object} options
   * @param {Function} options.onRestore - Callback when page is restored from bfcache.
   * @param {Function} options.onCleanup - Callback when page is entering bfcache.
   */
  init({ onRestore, onCleanup } = {}) {
    this.setupPageShow(onRestore);
    this.setupPageHide(onCleanup);
    this.auditUnloadListeners();
  },

  /**
   * Handles the 'pageshow' event.
   */
  setupPageShow(onRestore) {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        console.debug('[BfcacheManager] Page restored from cache.');
        if (typeof onRestore === 'function') {
          onRestore(event);
        }
      } else {
        console.debug('[BfcacheManager] Standard page load.');
      }
    });
  },

  /**
   * Handles the 'pagehide' event.
   */
  setupPageHide(onCleanup) {
    window.addEventListener('pagehide', (event) => {
      if (event.persisted) {
        console.debug('[BfcacheManager] Page entering cache.');
        if (typeof onCleanup === 'function') {
          onCleanup(event);
        }
      } else {
        console.debug('[BfcacheManager] Page being destroyed (no cache).');
      }
    });
  },

  /**
   * Audits the page for 'unload' listeners which block bfcache.
   * Run this in development to find offending scripts.
   */
  auditUnloadListeners() {
    const isDev = (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') ||
                  window.location.hostname === 'localhost';

    if (isDev) {
      // Note: There is no programmatic way to list all listeners on 'window',
      // so we rely on DevTools or manual inspection of third-party scripts.
      console.warn(
        '[BfcacheManager] Reminder: Ensure no "unload" listeners are added by third-party scripts.'
      );
    }
  }
};

// --- Usage Example ---
/*
BfcacheManager.init({
  onRestore: (event) => {
    // Refresh API data, restart animations, or check auth status
    refreshAppState();
  },
  onCleanup: (event) => {
    // Stop timers, disconnect sockets, or pause video
    clearAllIntervals();
    socket.disconnect();
  }
});
*/

export default BfcacheManager;

/**
 * Bfcache Lifecycle Manager Template
 *
 * This template provides a robust structure for managing the complete
 * lifecycle of a page in a way that is compatible with the Back/Forward Cache.
 * It replaces the deprecated 'unload' event with 'pagehide' and 'visibilitychange'.
 */

const BfcacheLifecycleManager = {
  // Configuration
  config: {
    refreshInterval: 60000, // 1 minute
  },

  // State
  state: {
    activeConnections: [],
    timers: [],
  },

  /**
   * Initialize the manager
   */
  init() {
    this.setupListeners();
    this.onInitialLoad();
  },

  /**
   * Setup event listeners for the complete lifecycle
   */
  setupListeners() {
    // 1. Handle Restoration and Initial Load
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        this.onRestoredFromCache();
      } else {
        // Initial load is already handled byDOMContentLoaded/load
        // but can be unified here if needed.
      }
    });

    // 2. Handle Cleanup when Navigating Away
    // Replaces 'unload' - ensures bfcache eligibility
    window.addEventListener('pagehide', (event) => {
      this.onNavigateAway(event.persisted);
    });

    // 3. Handle Visibility Changes (Tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.onTabHidden();
      } else {
        this.onTabVisible();
      }
    });
  },

  /**
   * Logic for when the page first loads
   */
  onInitialLoad() {
    console.log('Manager initialized: Initial load');
    this.startActiveProcesses();
  },

  /**
   * Logic for when the page is restored from bfcache
   */
  onRestoredFromCache() {
    console.log('Manager: Page restored from bfcache');
    // 1. Re-establish connections (WebSockets, etc.)
    this.startActiveProcesses();

    // 2. Refresh stale data
    this.refreshStaleContent();

    // 3. Optional: Sync analytics for the back/forward navigation
    this.trackNavigation('back-forward');
  },

  /**
   * Logic for when the user is leaving the page
   * @param {boolean} isCaching - true if the page is entering bfcache
   */
  onNavigateAway(isCaching) {
    console.log(`Manager: Navigating away. Entering cache: ${isCaching}`);

    // 1. Close active connections to save server resources
    this.stopActiveProcesses();

    // 2. Perform any final state saves
    this.saveUserProgress();

    // Note: If isCaching is false, the page is being destroyed.
  },

  /**
   * Logic for backgrounding the tab
   */
  onTabHidden() {
    // Pause non-essential animations or intervals
    this.pauseTimers();
  },

  /**
   * Logic for foregrounding the tab
   */
  onTabVisible() {
    this.resumeTimers();
  },

  // Helper Methods (Implementation Specific)

  startActiveProcesses() {
    // Example: Initialize a WebSocket
    // const socket = new WebSocket('ws://example.com');
    // this.state.activeConnections.push(socket);
  },

  stopActiveProcesses() {
    // Example: Clean up connections
    this.state.activeConnections.forEach(conn => conn.close());
    this.state.activeConnections = [];
  },

  refreshStaleContent() {
    // Perform fetch() calls for critical UI state
  },

  trackNavigation(type) {
    // Custom analytics logic
  },

  saveUserProgress() {
    // Use navigator.sendBeacon for final small pings
    // navigator.sendBeacon('/api/save-state', JSON.stringify({ ... }));
  }
};

// Start the manager
BfcacheLifecycleManager.init();

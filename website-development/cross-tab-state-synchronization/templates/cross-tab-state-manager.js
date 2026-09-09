/**
 * CrossTabStateManager
 *
 * Production-grade framework-agnostic cross-tab state manager providing:
 * - High-performance BroadcastChannel communication with automatic StorageEvent fallback.
 * - Single-tab Leader Election using Web Locks API with fallback heartbeat mechanism.
 * - Message deduplication, sequencing, and self-echo prevention.
 * - Structured lifecycle cleanup on window unload/pagehide.
 */

export class CrossTabStateManager {
  /**
   * @param {Object} options
   * @param {string} [options.channelName='app_cross_tab_channel'] - Unique channel identifier
   * @param {boolean} [options.enableLeaderElection=true] - Whether to attempt leader election
   * @param {number} [options.heartbeatIntervalMs=3000] - Heartbeat frequency for legacy election
   * @param {number} [options.heartbeatTimeoutMs=8000] - Timeout after which a leader is considered dead
   * @param {boolean} [options.debug=false] - Console debug logging
   */
  constructor(options = {}) {
    this.channelName = options.channelName || 'app_cross_tab_channel';
    this.enableLeaderElection = options.enableLeaderElection !== false;
    this.heartbeatIntervalMs = options.heartbeatIntervalMs || 3000;
    this.heartbeatTimeoutMs = options.heartbeatTimeoutMs || 8000;
    this.debug = Boolean(options.debug);

    // Unique identifier for this specific tab instance
    this.tabId = `tab_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;

    this.isLeader = false;
    this.sequenceNumber = 0;
    this.eventListeners = new Map(); // eventType -> Set<function>
    this.leaderChangeCallbacks = new Set();
    this.lastProcessedSeqByTab = new Map(); // tabId -> lastSeenSeq

    // Storage fallback key
    this.storageMsgKey = `__xtab_msg_${this.channelName}__`;
    this.storageLeaderKey = `__xtab_leader_${this.channelName}__`;

    // Detect browser feature capabilities
    this.hasBroadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window;
    this.hasWebLocks = typeof navigator !== 'undefined' && 'locks' in navigator && typeof navigator.locks.request === 'function';

    this._boundHandleStorageEvent = this._handleStorageEvent.bind(this);
    this._boundHandlePageHide = this._destroy.bind(this);

    this._initTransport();

    if (this.enableLeaderElection) {
      this._initLeaderElection();
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', this._boundHandlePageHide);
      window.addEventListener('beforeunload', this._boundHandlePageHide);
    }

    this._log(`Initialized tab [${this.tabId}]. Transport: ${this.hasBroadcastChannel ? 'BroadcastChannel' : 'StorageEvent'}`);
  }

  /**
   * Initialize communication transport layer.
   * @private
   */
  _initTransport() {
    if (this.hasBroadcastChannel) {
      try {
        this.channel = new BroadcastChannel(this.channelName);
        this.channel.onmessage = (event) => this._handleIncomingMessage(event.data);
      } catch (err) {
        console.warn('[CrossTabStateManager] BroadcastChannel failed, falling back to StorageEvent:', err);
        this.hasBroadcastChannel = false;
      }
    }

    if (!this.hasBroadcastChannel && typeof window !== 'undefined') {
      window.addEventListener('storage', this._boundHandleStorageEvent);
    }
  }

  /**
   * Broadcast an event to all other open same-origin tabs.
   * @param {string} eventType - Category or name of event (e.g. 'AUTH_LOGOUT', 'CART_UPDATED')
   * @param {any} payload - Data payload (must be structured cloneable / JSON serializable)
   */
  postMessage(eventType, payload = {}) {
    if (!eventType || typeof eventType !== 'string') {
      throw new Error('[CrossTabStateManager] postMessage requires a valid eventType string');
    }

    const message = {
      channel: this.channelName,
      senderId: this.tabId,
      eventType,
      payload,
      timestamp: Date.now(),
      seq: ++this.sequenceNumber
    };

    this._log(`Posting message: ${eventType}`, message);

    if (this.hasBroadcastChannel && this.channel) {
      try {
        this.channel.postMessage(message);
      } catch (err) {
        console.error('[CrossTabStateManager] Failed to postMessage via BroadcastChannel:', err);
      }
    } else if (typeof localStorage !== 'undefined') {
      try {
        // Force storage event by appending high-precision timestamp to bypass identical key deduplication
        localStorage.setItem(this.storageMsgKey, JSON.stringify(message));
      } catch (err) {
        console.error('[CrossTabStateManager] Failed to write message to localStorage:', err);
      }
    }
  }

  /**
   * Subscribe to incoming cross-tab messages of a specific event type, or all events if eventType is '*'.
   * @param {string} eventType - Event type to listen for, or '*' for all
   * @param {function(payload: any, metadata: Object): void} callback
   * @returns {function(): void} Unsubscribe function
   */
  on(eventType, callback) {
    if (typeof callback !== 'function') return () => {};

    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType).add(callback);

    return () => this.off(eventType, callback);
  }

  /**
   * Unsubscribe from cross-tab messages.
   * @param {string} eventType
   * @param {function} callback
   */
  off(eventType, callback) {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType).delete(callback);
    }
  }

  /**
   * Subscribe to Leader Status changes for this tab.
   * @param {function(isLeader: boolean): void} callback
   * @returns {function(): void} Unsubscribe callback
   */
  onLeaderChange(callback) {
    if (typeof callback !== 'function') return () => {};
    this.leaderChangeCallbacks.add(callback);
    // Trigger immediately with current status
    callback(this.isLeader);

    return () => {
      this.leaderChangeCallbacks.delete(callback);
    };
  }

  /**
   * Internal incoming message parser & router.
   * @private
   */
  _handleIncomingMessage(message) {
    if (!message || typeof message !== 'object') return;

    // 1. Self-echo prevention
    if (message.senderId === this.tabId) return;

    // 2. Out-of-order & duplicate message filter
    const lastSeq = this.lastProcessedSeqByTab.get(message.senderId) || 0;
    if (message.seq && message.seq <= lastSeq) {
      this._log(`Discarding duplicate/stale message seq ${message.seq} from tab ${message.senderId}`);
      return;
    }
    if (message.seq) {
      this.lastProcessedSeqByTab.set(message.senderId, message.seq);
    }

    this._log(`Received message [${message.eventType}] from [${message.senderId}]`, message);

    const metadata = {
      senderId: message.senderId,
      timestamp: message.timestamp,
      seq: message.seq
    };

    // Notify specific event listeners
    if (this.eventListeners.has(message.eventType)) {
      this.eventListeners.get(message.eventType).forEach((cb) => {
        try {
          cb(message.payload, metadata);
        } catch (err) {
          console.error(`[CrossTabStateManager] Error in event listener for ${message.eventType}:`, err);
        }
      });
    }

    // Notify wildcard '*' listeners
    if (this.eventListeners.has('*')) {
      this.eventListeners.get('*').forEach((cb) => {
        try {
          cb(message.eventType, message.payload, metadata);
        } catch (err) {
          console.error(`[CrossTabStateManager] Error in wildcard event listener:`, err);
        }
      });
    }
  }

  /**
   * Handle legacy StorageEvent fallback.
   * @private
   */
  _handleStorageEvent(event) {
    if (event.key !== this.storageMsgKey || !event.newValue) return;
    try {
      const message = JSON.parse(event.newValue);
      this._handleIncomingMessage(message);
    } catch (err) {
      // Ignore JSON parse errors from invalid storage writes
    }
  }

  /**
   * Initialize Leader Election using Web Locks API or Heartbeat fallback.
   * @private
   */
  _initLeaderElection() {
    if (this.hasWebLocks) {
      this._acquireWebLockLeader();
    } else {
      this._startHeartbeatLeaderElection();
    }
  }

  /**
   * Web Locks API Leader Election Strategy.
   * Holds a non-releasing lock as long as this tab is active.
   * @private
   */
  async _acquireWebLockLeader() {
    const lockName = `lock_${this.channelName}_leader`;

    try {
      await navigator.locks.request(lockName, async (lock) => {
        if (!lock) return;
        this._setLeaderStatus(true);

        // Keep lock held indefinitely until tab closes
        await new Promise((resolve) => {
          this._releaseLockResolver = resolve;
        });

        this._setLeaderStatus(false);
      });
    } catch (err) {
      this._log('Web Locks leader request failed/released:', err);
      this._setLeaderStatus(false);
    }
  }

  /**
   * Heartbeat Leader Election Strategy (Fallback for environments without Web Locks API).
   * @private
   */
  _startHeartbeatLeaderElection() {
    const checkAndClaimLeader = () => {
      if (typeof localStorage === 'undefined') return;

      const now = Date.now();
      let leaderInfo = null;

      try {
        const raw = localStorage.getItem(this.storageLeaderKey);
        if (raw) leaderInfo = JSON.parse(raw);
      } catch (e) {}

      const isLeaderDead = !leaderInfo || (now - leaderInfo.lastSeen > this.heartbeatTimeoutMs);

      if (this.isLeader) {
        // Renew heartbeat
        const updated = { leaderId: this.tabId, lastSeen: now };
        localStorage.setItem(this.storageLeaderKey, JSON.stringify(updated));
      } else if (isLeaderDead || leaderInfo.leaderId === this.tabId) {
        // Claim leadership
        const claimed = { leaderId: this.tabId, lastSeen: now };
        localStorage.setItem(this.storageLeaderKey, JSON.stringify(claimed));
        this._setLeaderStatus(true);
      }
    };

    checkAndClaimLeader();
    this.heartbeatTimer = setInterval(checkAndClaimLeader, this.heartbeatIntervalMs);
  }

  /**
   * Update internal leader status and dispatch callbacks.
   * @private
   */
  _setLeaderStatus(status) {
    if (this.isLeader === status) return;
    this.isLeader = status;
    this._log(`Leader status changed: ${this.isLeader ? 'LEADER' : 'FOLLOWER'}`);

    this.leaderChangeCallbacks.forEach((cb) => {
      try {
        cb(this.isLeader);
      } catch (err) {
        console.error('[CrossTabStateManager] Error in leader change callback:', err);
      }
    });
  }

  /**
   * Debug logger helper.
   * @private
   */
  _log(...args) {
    if (this.debug) {
      console.log(`[CrossTabStateManager:${this.tabId}]`, ...args);
    }
  }

  /**
   * Destroy instance, release locks, and close open channels.
   * @private
   */
  _destroy() {
    this._log('Destroying CrossTabStateManager instance...');

    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.isLeader && !this.hasWebLocks && typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(this.storageLeaderKey);
      } catch (e) {}
    }

    if (this._releaseLockResolver) {
      this._releaseLockResolver();
      this._releaseLockResolver = null;
    }

    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this._boundHandleStorageEvent);
      window.removeEventListener('pagehide', this._boundHandlePageHide);
      window.removeEventListener('beforeunload', this._boundHandlePageHide);
    }

    this._setLeaderStatus(false);
    this.eventListeners.clear();
    this.leaderChangeCallbacks.clear();
  }

  /**
   * Explicitly destroy the state manager from application code.
   */
  destroy() {
    this._destroy();
  }
}

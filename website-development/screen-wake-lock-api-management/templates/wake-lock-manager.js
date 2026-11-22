/**
 * ScreenWakeLockManager
 * Production-grade controller for W3C Screen Wake Lock API (navigator.wakeLock).
 * Handles visibility lifecycle, auto-reacquisition, battery protection, and state callbacks.
 */

export class ScreenWakeLockManager {
  /**
   * @param {Object} options
   * @param {Function} [options.onStateChange] - Callback invoked when wake lock state changes (isActive: boolean)
   * @param {Function} [options.onError] - Callback invoked when an error occurs (error: Error)
   * @param {number} [options.lowBatteryThreshold=0.15] - Battery percentage (0.0 to 1.0) below which wake lock auto-releases when unplugged
   * @param {boolean} [options.autoReacquireOnVisible=true] - Whether to re-acquire wake lock automatically when tab returns to visible
   */
  constructor(options = {}) {
    this.onStateChange = options.onStateChange || (() => {});
    this.onError = options.onError || (() => {});
    this.lowBatteryThreshold = options.lowBatteryThreshold ?? 0.15;
    this.autoReacquireOnVisible = options.autoReacquireOnVisible ?? true;

    this.sentinel = null;
    this.userWantsLock = false;
    this.isSupported = false;
    this.battery = null;

    this._boundOnVisibilityChange = this._handleVisibilityChange.bind(this);
    this._boundOnPageHide = this.release.bind(this);
    this._boundOnBatteryChange = this._checkBattery.bind(this);

    this._init();
  }

  /**
   * Check browser support and initialize event bindings
   * @private
   */
  async _init() {
    this.isSupported = typeof window !== 'undefined' &&
                       window.isSecureContext &&
                       'wakeLock' in navigator;

    if (!this.isSupported) {
      return;
    }

    // Attach document visibility listener
    document.addEventListener('visibilitychange', this._boundOnVisibilityChange);

    // Attach pagehide/unload cleanup
    window.addEventListener('pagehide', this._boundOnPageHide);

    // Initialize Battery Status monitoring if available
    await this._initBatteryMonitoring();
  }

  /**
   * Request a Screen Wake Lock
   * @returns {Promise<boolean>} True if lock was acquired successfully, false otherwise
   */
  async request() {
    if (!this.isSupported) {
      this.onError(new Error('Screen Wake Lock API is not supported in this environment or context is insecure.'));
      return false;
    }

    // Mark user intent
    this.userWantsLock = true;

    // Do not attempt request if document is hidden
    if (document.visibilityState !== 'visible') {
      return false;
    }

    // Check battery threshold before acquiring
    if (this._isBatteryTooLow()) {
      this.onError(new Error('Cannot acquire Screen Wake Lock: Battery level is too low.'));
      this.userWantsLock = false;
      return false;
    }

    // Release existing sentinel if any
    if (this.sentinel !== null) {
      await this.release(false); // don't reset userWantsLock
    }

    try {
      this.sentinel = await navigator.wakeLock.request('screen');

      // Bind sentinel release listener
      this.sentinel.addEventListener('release', () => {
        this.sentinel = null;
        this.onStateChange(false);
      });

      this.onStateChange(true);
      return true;
    } catch (err) {
      this.sentinel = null;
      this.onError(err);
      this.onStateChange(false);
      return false;
    }
  }

  /**
   * Explicitly release the active Screen Wake Lock
   * @param {boolean} [resetUserIntent=true] - Whether to clear the user's intent to keep screen awake
   * @returns {Promise<boolean>}
   */
  async release(resetUserIntent = true) {
    if (resetUserIntent) {
      this.userWantsLock = false;
    }

    if (this.sentinel !== null) {
      try {
        await this.sentinel.release();
        this.sentinel = null;
        this.onStateChange(false);
        return true;
      } catch (err) {
        this.onError(err);
        return false;
      }
    }
    return true;
  }

  /**
   * Toggle the Screen Wake Lock state based on user action
   * @returns {Promise<boolean>} The new active state
   */
  async toggle() {
    if (this.isActive()) {
      await this.release(true);
      return false;
    } else {
      return await this.request();
    }
  }

  /**
   * Check if Screen Wake Lock is currently active
   * @returns {boolean}
   */
  isActive() {
    return this.sentinel !== null && !this.sentinel.released;
  }

  /**
   * Check if user explicitly requested wake lock to remain active
   * @returns {boolean}
   */
  isRequested() {
    return this.userWantsLock;
  }

  /**
   * Clean up all event listeners and release active wake lock
   */
  async destroy() {
    await this.release(true);

    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this._boundOnVisibilityChange);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', this._boundOnPageHide);
    }
    if (this.battery) {
      this.battery.removeEventListener('levelchange', this._boundOnBatteryChange);
      this.battery.removeEventListener('chargingchange', this._boundOnBatteryChange);
    }
  }

  /**
   * Handle document visibilitychange event
   * @private
   */
  async _handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
      if (this.userWantsLock && this.autoReacquireOnVisible && !this.isActive()) {
        await this.request();
      }
    }
    // Note: When visibility becomes 'hidden', the browser automatically releases sentinel
  }

  /**
   * Initialize Battery API monitoring
   * @private
   */
  async _initBatteryMonitoring() {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      try {
        this.battery = await navigator.getBattery();
        this.battery.addEventListener('levelchange', this._boundOnBatteryChange);
        this.battery.addEventListener('chargingchange', this._boundOnBatteryChange);
      } catch (e) {
        // Battery API blocked or restricted by policy
      }
    }
  }

  /**
   * Check if device battery level is below threshold and not charging
   * @private
   * @returns {boolean}
   */
  _isBatteryTooLow() {
    if (!this.battery) return false;
    return this.battery.level <= this.lowBatteryThreshold && !this.battery.charging;
  }

  /**
   * Event handler for battery level/charging changes
   * @private
   */
  async _checkBattery() {
    if (this._isBatteryTooLow() && this.isActive()) {
      this.onError(new Error(`Screen Wake Lock released automatically to preserve battery (${Math.round(this.battery.level * 100)}%).`));
      await this.release(true);
    }
  }
}

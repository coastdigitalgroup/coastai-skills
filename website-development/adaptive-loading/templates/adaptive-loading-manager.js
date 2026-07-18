/**
 * AdaptiveLoadingManager
 * A robust, framework-agnostic utility for querying hardware constraints,
 * network states, and user preferences, mapping them to actionable device tiers.
 *
 * Handles browser incompatibilities gracefully (falling back on Firefox/Safari).
 */
export class AdaptiveLoadingManager {
  /**
   * Initialize the manager with custom options.
   * @param {Object} options Configuration parameters.
   * @param {number} [options.lowMemoryThreshold=2] Device memory in GB considered "low-end".
   * @param {number} [options.lowCoresThreshold=2] Logical processors considered "low-end".
   * @param {Array<string>} [options.slowNetworkTypes=['slow-2g', '2g', '3g']] Network types classified as slow.
   */
  constructor(options = {}) {
    this.options = {
      lowMemoryThreshold: options.lowMemoryThreshold || 2,
      lowCoresThreshold: options.lowCoresThreshold || 2,
      slowNetworkTypes: options.slowNetworkTypes || ['slow-2g', '2g', '3g']
    };

    this.listeners = new Set();
    this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    this._setupNetworkListener();
  }

  /**
   * Returns current network information.
   * Handles Safari/Firefox where NetworkInformation API is absent.
   * @returns {Object} Network status object.
   */
  getNetworkStatus() {
    if (!this.connection) {
      return {
        supported: false,
        effectiveType: '4g',
        saveData: false,
        rtt: 50,
        downlink: 10
      };
    }

    return {
      supported: true,
      effectiveType: this.connection.effectiveType || '4g',
      saveData: this.connection.saveData || false,
      rtt: this.connection.rtt || 50,
      downlink: this.connection.downlink || 10
    };
  }

  /**
   * Returns device hardware information.
   * Handles Safari/Firefox where deviceMemory is absent.
   * @returns {Object} Hardware capability object.
   */
  getHardwareCapability() {
    return {
      // navigator.deviceMemory is standard in Chromium, returns GB (e.g. 0.5, 1, 2, 4, 8)
      memory: navigator.deviceMemory || null,
      // navigator.hardwareConcurrency is standard across all modern browsers
      cores: navigator.hardwareConcurrency || null
    };
  }

  /**
   * Returns current user-defined system preferences.
   * @returns {Object} System preference choices.
   */
  getUserPreferences() {
    const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      prefersReducedData,
      prefersReducedMotion
    };
  }

  /**
   * Evaluates all capabilities and preferences, returning a concrete capability tier.
   * @returns {Object} Device capability analysis and target tier.
   */
  getCapabilities() {
    const network = this.getNetworkStatus();
    const hardware = this.getHardwareCapability();
    const prefs = this.getUserPreferences();

    const isDataSaver = network.saveData || prefs.prefersReducedData;

    let tier = 'high';
    let reason = 'unrestricted';

    // Tier Evaluation Sequence
    if (isDataSaver) {
      tier = 'low';
      reason = 'data-saver-active';
    } else if (this.options.slowNetworkTypes.includes(network.effectiveType)) {
      tier = 'low';
      reason = 'slow-network-connection';
    } else if (hardware.memory !== null && hardware.memory <= this.options.lowMemoryThreshold) {
      tier = 'low';
      reason = 'constrained-device-memory';
    } else if (hardware.cores !== null && hardware.cores <= this.options.lowCoresThreshold) {
      tier = 'low';
      reason = 'constrained-processor-cores';
    } else if (hardware.memory !== null && hardware.memory <= 4) {
      // 4GB devices or below treated as mid-tier
      tier = 'medium';
      reason = 'mid-tier-hardware';
    } else if (hardware.cores !== null && hardware.cores <= 4) {
      // 4 core devices or below treated as mid-tier
      tier = 'medium';
      reason = 'mid-tier-processor';
    }

    return {
      tier,
      reason,
      prefersReducedMotion: prefs.prefersReducedMotion,
      isDataSaver,
      raw: { network, hardware, prefs }
    };
  }

  /**
   * Register a callback to fire when the user's network connection type shifts.
   * @param {Function} callback Callback receiving the new capabilities state.
   * @returns {Function} Unsubscribe function.
   */
  onConnectionChange(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Private network change listener.
   * @private
   */
  _setupNetworkListener() {
    if (!this.connection) return;

    this.connection.addEventListener('change', () => {
      const currentCapabilities = this.getCapabilities();
      this.listeners.forEach((callback) => {
        try {
          callback(currentCapabilities);
        } catch (err) {
          console.error('Error executing AdaptiveLoadingManager subscriber:', err);
        }
      });
    });
  }
}

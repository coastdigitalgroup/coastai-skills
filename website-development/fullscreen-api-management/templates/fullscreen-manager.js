/**
 * FullscreenManager.js
 *
 * Production-grade, zero-dependency controller for managing W3C Fullscreen API interactions,
 * top-layer promotions, vendor prefixes, iOS Safari video fallbacks, keyboard shortcuts,
 * and WCAG AA accessibility states.
 */

export class FullscreenManager {
  /**
   * @param {Object} config Configuration settings for the FullscreenManager instance.
   * @param {HTMLElement} config.container The target element to promote to fullscreen mode.
   * @param {HTMLButtonElement} [config.toggleButton] Optional trigger button to bind and synchronize UI state.
   * @param {HTMLElement} [config.liveRegion] Optional aria-live element for screen reader announcements.
   * @param {HTMLVideoElement} [config.videoElement] Optional HTML5 video element for iOS Safari fallback.
   * @param {Function} [config.onStateChange] Optional callback triggered on fullscreen state change `(isFullscreen, element) => void`.
   * @param {Function} [config.onError] Optional callback triggered on fullscreen request error `(error) => void`.
   */
  constructor(config = {}) {
    if (!config.container || !(config.container instanceof HTMLElement)) {
      throw new Error('FullscreenManager requires a valid DOM HTMLElement as container.');
    }

    this.container = config.container;
    this.toggleButton = config.toggleButton || null;
    this.liveRegion = config.liveRegion || null;
    this.videoElement = config.videoElement || null;
    this.onStateChange = config.onStateChange || null;
    this.onError = config.onError || null;

    this.boundHandleFullscreenChange = this._handleFullscreenChange.bind(this);
    this.boundHandleFullscreenError = this._handleFullscreenError.bind(this);
    this.boundHandleKeyDown = this._handleKeyDown.bind(this);

    this.init();
  }

  /**
   * Check if Fullscreen API is supported by the browser on standard elements.
   * @returns {boolean}
   */
  static isSupported() {
    const doc = document;
    return Boolean(
      doc.fullscreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.msFullscreenEnabled
    );
  }

  /**
   * Get the currently active fullscreen element across vendor prefixes.
   * @returns {Element|null}
   */
  static getFullscreenElement() {
    const doc = document;
    return (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      null
    );
  }

  /**
   * Initialize event bindings and ARIA defaults.
   */
  init() {
    // Bind fullscreen change events
    const changeEvents = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];
    changeEvents.forEach(evt => {
      document.addEventListener(evt, this.boundHandleFullscreenChange);
    });

    // Bind fullscreen error events
    const errorEvents = [
      'fullscreenerror',
      'webkitfullscreenerror',
      'mozfullscreenerror',
      'MSFullscreenError'
    ];
    errorEvents.forEach(evt => {
      document.addEventListener(evt, this.boundHandleFullscreenError);
    });

    // Bind button trigger if provided
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggle());
      this._updateButtonUI(this.isFullscreen());
    }

    // Bind container keyboard shortcuts ('F' key to toggle)
    this.container.addEventListener('keydown', this.boundHandleKeyDown);
  }

  /**
   * Check if the managed container is currently in fullscreen mode.
   * @returns {boolean}
   */
  isFullscreen() {
    const activeEl = FullscreenManager.getFullscreenElement();
    return activeEl === this.container;
  }

  /**
   * Request promotion of the container element into fullscreen mode.
   * @param {FullscreenOptions} [options={ navigationUI: 'auto' }]
   * @returns {Promise<boolean>}
   */
  async request(options = { navigationUI: 'auto' }) {
    if (this.isFullscreen()) return true;

    try {
      if (this.container.requestFullscreen) {
        await this.container.requestFullscreen(options);
      } else if (this.container.webkitRequestFullscreen) {
        await this.container.webkitRequestFullscreen();
      } else if (this.container.mozRequestFullScreen) {
        await this.container.mozRequestFullScreen();
      } else if (this.container.msRequestFullscreen) {
        await this.container.msRequestFullscreen();
      } else if (this.videoElement) {
        // Fallback for iOS iPhone Safari video element
        return this._requestIOSVideoFullscreen();
      } else {
        throw new Error('Fullscreen API is not supported on this DOM element.');
      }
      return true;
    } catch (err) {
      this._handleFullscreenError(err);
      return false;
    }
  }

  /**
   * Exit fullscreen mode.
   * @returns {Promise<boolean>}
   */
  async exit() {
    if (!FullscreenManager.getFullscreenElement() && !this._isIOSVideoFullscreen()) {
      return true;
    }

    try {
      const doc = document;
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        await doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      } else if (this.videoElement && this._isIOSVideoFullscreen()) {
        this.videoElement.webkitSetPresentationMode('inline');
      }
      return true;
    } catch (err) {
      this._handleFullscreenError(err);
      return false;
    }
  }

  /**
   * Toggle between entering and exiting fullscreen mode.
   * @returns {Promise<boolean>}
   */
  async toggle() {
    if (this.isFullscreen() || this._isIOSVideoFullscreen()) {
      return this.exit();
    } else {
      return this.request();
    }
  }

  /**
   * Clean up event listeners and references.
   */
  destroy() {
    const changeEvents = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];
    changeEvents.forEach(evt => {
      document.removeEventListener(evt, this.boundHandleFullscreenChange);
    });

    const errorEvents = [
      'fullscreenerror',
      'webkitfullscreenerror',
      'mozfullscreenerror',
      'MSFullscreenError'
    ];
    errorEvents.forEach(evt => {
      document.removeEventListener(evt, this.boundHandleFullscreenError);
    });

    this.container.removeEventListener('keydown', this.boundHandleKeyDown);
  }

  // --- Private Helper Methods ---

  _handleFullscreenChange() {
    const isFullscreenNow = this.isFullscreen();
    this._updateButtonUI(isFullscreenNow);
    this._announceStateChange(isFullscreenNow);

    if (typeof this.onStateChange === 'function') {
      this.onStateChange(isFullscreenNow, FullscreenManager.getFullscreenElement());
    }
  }

  _handleFullscreenError(err) {
    console.error('FullscreenManager Error:', err);
    this._announce('Unable to toggle full-screen mode.');

    if (typeof this.onError === 'function') {
      this.onError(err);
    }
  }

  _handleKeyDown(event) {
    if (event.key === 'f' || event.key === 'F') {
      // Prevent key repeat or typing conflict when focused on input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      event.preventDefault();
      this.toggle();
    }
  }

  _updateButtonUI(isFullscreen) {
    if (!this.toggleButton) return;

    this.toggleButton.setAttribute('aria-pressed', isFullscreen ? 'true' : 'false');
    this.toggleButton.setAttribute(
      'aria-label',
      isFullscreen ? 'Exit full-screen mode' : 'Enter full-screen mode'
    );
  }

  _announceStateChange(isFullscreen) {
    const message = isFullscreen
      ? 'Entered full-screen mode.'
      : 'Exited full-screen mode.';
    this._announce(message);
  }

  _announce(message) {
    if (!this.liveRegion) return;
    this.liveRegion.textContent = '';
    setTimeout(() => {
      this.liveRegion.textContent = message;
    }, 50);
  }

  _requestIOSVideoFullscreen() {
    if (!this.videoElement) return false;

    if (
      this.videoElement.webkitSupportsPresentationMode &&
      typeof this.videoElement.webkitSetPresentationMode === 'function'
    ) {
      this.videoElement.webkitSetPresentationMode('fullscreen');
      return true;
    } else if (typeof this.videoElement.webkitEnterFullscreen === 'function') {
      this.videoElement.webkitEnterFullscreen();
      return true;
    }
    return false;
  }

  _isIOSVideoFullscreen() {
    if (!this.videoElement) return false;
    return this.videoElement.webkitPresentationMode === 'fullscreen';
  }
}

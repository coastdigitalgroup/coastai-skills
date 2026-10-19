/**
 * PictureInPictureManager
 * A framework-agnostic lifecycle controller for HTMLVideoElement PiP
 * and Document Picture-in-Picture API with fallback management,
 * stylesheet migration, and DOM restoration.
 */
export class PictureInPictureManager {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.container - Container DOM element to migrate in Document PiP.
   * @param {HTMLVideoElement} [options.videoElement] - Target video element for Video PiP fallback.
   * @param {number} [options.width=480] - Floating window initial width.
   * @param {number} [options.height=270] - Floating window initial height.
   * @param {HTMLElement} [options.liveRegion] - Accessibility ARIA live region for screen reader updates.
   * @param {Function} [options.onEnter] - Callback when entering PiP mode (mode: 'document' | 'video').
   * @param {Function} [options.onExit] - Callback when exiting PiP mode.
   * @param {Function} [options.onError] - Callback on PiP errors.
   */
  constructor(options = {}) {
    this.container = options.container;
    this.videoElement = options.videoElement || (this.container ? this.container.querySelector('video') : null);
    this.width = options.width || 480;
    this.height = options.height || 270;
    this.liveRegion = options.liveRegion || null;
    this.onEnter = options.onEnter || (() => {});
    this.onExit = options.onExit || (() => {});
    this.onError = options.onError || (() => {});

    this.pipWindow = null;
    this.placeholder = null;
    this.activeMode = 'inline'; // 'inline' | 'document' | 'video'

    this._bindNativeEvents();
  }

  /**
   * Detect available Picture-in-Picture capability
   * @returns {'document' | 'video' | 'none'}
   */
  static getCapability() {
    if ('documentPictureInPicture' in window) {
      return 'document';
    }
    if ('pictureInPictureEnabled' in document && document.pictureInPictureEnabled) {
      return 'video';
    }
    return 'none';
  }

  /**
   * Returns true if currently in any Picture-in-Picture mode
   * @returns {boolean}
   */
  get isActive() {
    return this.activeMode !== 'inline';
  }

  /**
   * Toggle Picture-in-Picture session
   * Must be called in response to a user gesture
   */
  async toggle() {
    if (this.isActive) {
      await this.exit();
    } else {
      await this.enter();
    }
  }

  /**
   * Enter Picture-in-Picture mode
   * Prefers Document PiP, falls back to Video PiP
   */
  async enter() {
    const capability = PictureInPictureManager.getCapability();

    if (capability === 'document' && this.container) {
      try {
        await this._enterDocumentPiP();
        return;
      } catch (err) {
        console.warn('Document Picture-in-Picture failed, attempting video fallback:', err);
      }
    }

    if ((capability === 'video' || capability === 'document') && this.videoElement) {
      try {
        await this.videoElement.requestPictureInPicture();
        return;
      } catch (err) {
        this.onError(err);
        throw err;
      }
    }

    const unsupportedErr = new Error('Picture-in-Picture is not supported or permitted in this browser.');
    this.onError(unsupportedErr);
    throw unsupportedErr;
  }

  /**
   * Exit active Picture-in-Picture mode
   */
  async exit() {
    if (this.activeMode === 'document' && this.pipWindow) {
      this.pipWindow.close();
      this._restoreFromDocumentPiP();
    } else if (this.activeMode === 'video' && document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    }
  }

  /**
   * Internal method to request Document PiP window and migrate DOM
   * @private
   */
  async _enterDocumentPiP() {
    this.pipWindow = await window.documentPictureInPicture.requestWindow({
      width: this.width,
      height: this.height,
    });

    // 1. Copy active stylesheets
    this._copyStylesheets(this.pipWindow.document);

    // 2. Create placeholder in parent document
    this.placeholder = document.createElement('div');
    this.placeholder.className = 'pip-manager-placeholder';
    this.placeholder.setAttribute('data-pip-placeholder', 'true');
    this.container.parentNode.insertBefore(this.placeholder, this.container);

    // 3. Move container to floating window body
    this.pipWindow.document.body.appendChild(this.container);

    // 4. Handle window closing
    this.pipWindow.addEventListener('pagehide', () => {
      this._restoreFromDocumentPiP();
    });

    this.activeMode = 'document';
    this._announce('Entered interactive Picture-in-Picture mode.');
    this.onEnter('document');
  }

  /**
   * Restore container DOM node back to original location
   * @private
   */
  _restoreFromDocumentPiP() {
    if (this.activeMode !== 'document') return;

    if (this.placeholder && this.placeholder.parentNode && this.container) {
      this.placeholder.parentNode.insertBefore(this.container, this.placeholder);
      this.placeholder.remove();
      this.placeholder = null;
    }

    this.pipWindow = null;
    this.activeMode = 'inline';

    this._announce('Exited Picture-in-Picture mode.');
    this.onExit();
  }

  /**
   * Copy styles from parent document to target document
   * @private
   */
  _copyStylesheets(targetDoc) {
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          const newStyle = targetDoc.createElement('style');
          Array.from(styleSheet.cssRules).forEach((rule) => {
            newStyle.appendChild(targetDoc.createTextNode(rule.cssText));
          });
          targetDoc.head.appendChild(newStyle);
        } else if (styleSheet.href) {
          const link = targetDoc.createElement('link');
          link.rel = 'stylesheet';
          link.href = styleSheet.href;
          targetDoc.head.appendChild(link);
        }
      } catch (e) {
        if (styleSheet.href) {
          const link = targetDoc.createElement('link');
          link.rel = 'stylesheet';
          link.href = styleSheet.href;
          targetDoc.head.appendChild(link);
        }
      }
    });
  }

  /**
   * Bind native video element events for Video PiP fallback
   * @private
   */
  _bindNativeEvents() {
    if (!this.videoElement) return;

    this.videoElement.addEventListener('enterpictureinpicture', () => {
      if (this.activeMode !== 'document') {
        this.activeMode = 'video';
        this._announce('Entered video Picture-in-Picture.');
        this.onEnter('video');
      }
    });

    this.videoElement.addEventListener('leavepictureinpicture', () => {
      if (this.activeMode === 'video') {
        this.activeMode = 'inline';
        this._announce('Exited Picture-in-Picture.');
        this.onExit();
      }
    });
  }

  /**
   * Announce state updates to screen readers
   * @private
   */
  _announce(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
    }
  }

  /**
   * Destroy instance and release listeners
   */
  destroy() {
    if (this.isActive) {
      this.exit();
    }
  }
}

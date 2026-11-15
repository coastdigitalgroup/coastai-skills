/**
 * FontLoadingManager.js
 *
 * Reusable, framework-agnostic controller for dynamic web font instantiation,
 * timeout-enforced loading, layout shift prevention, and canvas readiness checks.
 */

export class FontLoadingManager {
  /**
   * @param {Object} options Configuration options
   * @param {number} [options.timeoutMs=2500] Default load timeout in milliseconds
   * @param {string} [options.rootClassPrefix='fonts'] Prefix for root DOM state classes
   * @param {boolean} [options.enableLogs=true] Enable console diagnostic warnings
   */
  constructor(options = {}) {
    this.timeoutMs = options.timeoutMs || 2500;
    this.rootClassPrefix = options.rootClassPrefix || 'fonts';
    this.enableLogs = options.enableLogs !== false;
    this.registeredFonts = new Map();

    this.isSupported = typeof window !== 'undefined' && 'fonts' in document && 'FontFace' in window;

    if (!this.isSupported && this.enableLogs) {
      console.warn('FontLoadingManager: CSS Font Loading API not natively supported in this browser.');
    }
  }

  /**
   * Register a dynamic custom font with FontFace and add it to document.fonts
   *
   * @param {string} family Font family name
   * @param {string} source URL (e.g. "url(/path/font.woff2)") or binary ArrayBuffer
   * @param {Object} [descriptors={}] FontFace descriptors (weight, style, display, unicodeRange)
   * @returns {FontFace|null}
   */
  registerFont(family, source, descriptors = {}) {
    if (!this.isSupported) return null;

    try {
      const font = new FontFace(family, source, {
        display: 'swap',
        ...descriptors
      });

      document.fonts.add(font);
      this.registeredFonts.set(family, font);

      return font;
    } catch (error) {
      if (this.enableLogs) {
        console.error(`FontLoadingManager: Error instantiating FontFace for "${family}":`, error);
      }
      return null;
    }
  }

  /**
   * Load a specific registered font family with an enforced timeout
   *
   * @param {string} family Font family name to load
   * @param {number} [overrideTimeout] Optional custom timeout in ms
   * @returns {Promise<boolean>} Resolves true if loaded successfully, false on failure or timeout
   */
  async loadFont(family, overrideTimeout) {
    if (!this.isSupported) return false;

    const font = this.registeredFonts.get(family);
    if (!font) {
      if (this.enableLogs) {
        console.warn(`FontLoadingManager: Font family "${family}" has not been registered.`);
      }
      return false;
    }

    const timeoutDuration = overrideTimeout || this.timeoutMs;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Font load timeout (${timeoutDuration}ms) for ${family}`)), timeoutDuration)
    );

    try {
      await Promise.race([font.load(), timeoutPromise]);
      return font.status === 'loaded';
    } catch (error) {
      if (this.enableLogs) {
        console.warn(`FontLoadingManager: ${error.message}`);
      }
      return false;
    }
  }

  /**
   * Load all registered critical fonts concurrently and update root DOM state classes
   *
   * @param {Array<string>} families Array of registered font family names
   * @returns {Promise<boolean>} True if all critical fonts loaded cleanly
   */
  async loadCriticalFonts(families = []) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add(`${this.rootClassPrefix}-loading`);
    }

    if (!this.isSupported) {
      this._applyFallbackState();
      return false;
    }

    const loadPromises = families.map((fam) => this.loadFont(fam));
    const results = await Promise.all(loadPromises);

    const allLoaded = results.length > 0 && results.every(Boolean);

    if (allLoaded && typeof document !== 'undefined') {
      document.documentElement.classList.remove(`${this.rootClassPrefix}-loading`);
      document.documentElement.classList.add(`${this.rootClassPrefix}-loaded`);
    } else {
      this._applyFallbackState();
    }

    return allLoaded;
  }

  /**
   * Check if a specific font is active and rendered using CSS Font shorthand string
   *
   * @param {string} fontSpec Standard CSS font shorthand (e.g., '16px "SpaceGrotesk"' or 'bold 20px "HeaderFont"')
   * @returns {boolean}
   */
  checkFont(fontSpec) {
    if (!this.isSupported) return false;
    try {
      return document.fonts.check(fontSpec);
    } catch (error) {
      if (this.enableLogs) {
        console.error(`FontLoadingManager: Invalid font spec passed to checkFont(): "${fontSpec}". Size required.`, error);
      }
      return false;
    }
  }

  /**
   * Await document.fonts.ready promise with timeout safety
   * Useful for canvas or WebGL text initialization
   *
   * @param {number} [timeoutMs] Optional timeout in ms
   * @returns {Promise<boolean>}
   */
  async awaitFontSetReady(timeoutMs) {
    if (!this.isSupported) return false;

    const timeoutDuration = timeoutMs || this.timeoutMs;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('FontFaceSet ready timeout')), timeoutDuration)
    );

    try {
      await Promise.race([document.fonts.ready, timeoutPromise]);
      return document.fonts.status === 'loaded';
    } catch (error) {
      if (this.enableLogs) {
        console.warn('FontLoadingManager: document.fonts.ready timed out or failed:', error);
      }
      return false;
    }
  }

  /**
   * Unregister and delete a font from document.fonts (prevent memory leaks in SPAs)
   *
   * @param {string} family Font family to delete
   */
  unregisterFont(family) {
    if (!this.isSupported) return;
    const font = this.registeredFonts.get(family);
    if (font) {
      document.fonts.delete(font);
      this.registeredFonts.delete(family);
    }
  }

  _applyFallbackState() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove(`${this.rootClassPrefix}-loading`);
      document.documentElement.classList.add(`${this.rootClassPrefix}-failed`);
    }
  }
}

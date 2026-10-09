/**
 * ShareManager
 * Standardized client-side class for managing native Web Share API execution
 * (navigator.share / navigator.canShare) with transient gesture validation,
 * error handling (AbortError suppression), and fallback execution.
 */
export class ShareManager {
  /**
   * @param {Object} options
   * @param {Function} [options.onSuccess] - Callback fired when native share succeeds
   * @param {Function} [options.onCancel] - Callback fired when user closes share sheet (AbortError)
   * @param {Function} [options.onError] - Callback fired when share fails unexpectedly
   * @param {Function} [options.onFallback] - Callback fired when native share is unsupported/unavailable
   */
  constructor(options = {}) {
    this.onSuccess = options.onSuccess || (() => {});
    this.onCancel = options.onCancel || (() => {});
    this.onError = options.onError || (() => {});
    this.onFallback = options.onFallback || (() => {});
  }

  /**
   * Evaluates whether the native Web Share API is available and can handle the given payload.
   * @param {Object} shareData - ShareData object ({ title, text, url, files })
   * @returns {boolean}
   */
  canShare(shareData) {
    // 1. Validate Secure Context (HTTPS or localhost)
    if (!window.isSecureContext) {
      console.warn('ShareManager: Web Share API requires a secure context (HTTPS).');
      return false;
    }

    // 2. Check API support
    if (!('share' in navigator) || typeof navigator.canShare !== 'function') {
      return false;
    }

    // 3. Validate specific payload
    try {
      return navigator.canShare(shareData);
    } catch (err) {
      console.warn('ShareManager: Error during navigator.canShare validation:', err);
      return false;
    }
  }

  /**
   * Invokes native sharing or triggers the registered fallback handler.
   * MUST be called directly within a user gesture (click/keydown event handler).
   * @param {Object} shareData - ShareData object ({ title, text, url, files })
   * @returns {Promise<boolean>} Resolves true if shared natively, false if fallback/cancel
   */
  async share(shareData) {
    // Normalize URL if relative
    if (shareData.url && typeof shareData.url === 'string') {
      try {
        shareData.url = new URL(shareData.url, window.location.href).href;
      } catch (e) {
        console.warn('ShareManager: Invalid URL provided to shareData:', shareData.url);
      }
    }

    // If native share is supported for this payload
    if (this.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        this.onSuccess(shareData);
        return true;
      } catch (err) {
        if (err.name === 'AbortError') {
          // User closed/dismissed the OS share dialog
          this.onCancel(shareData);
          return false;
        }

        if (err.name === 'NotAllowedError') {
          console.warn('ShareManager: User gesture missing or permission blocked:', err);
        } else {
          console.error('ShareManager: Native share failed unexpectedly:', err);
        }

        this.onError(err, shareData);
        // Trigger fallback on non-abort execution failures
        this.onFallback(shareData, err);
        return false;
      }
    }

    // Fallback path when native share is unavailable
    this.onFallback(shareData);
    return false;
  }

  /**
   * Helper utility to copy text/URL to clipboard as an accessible fallback action.
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>}
   */
  static async copyToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('ShareManager: Clipboard API failed, falling back:', err);
      }
    }

    // Fallback for legacy clipboard copy
    try {
      const input = document.createElement('textarea');
      input.value = text;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.focus();
      input.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(input);
      return successful;
    } catch (e) {
      console.error('ShareManager: Clipboard copy failed:', e);
      return false;
    }
  }
}

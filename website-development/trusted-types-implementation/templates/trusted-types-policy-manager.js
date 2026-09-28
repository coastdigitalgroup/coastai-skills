/**
 * TrustedTypesPolicyManager
 * Enterprise-grade client-side controller for registering, wrapping, and enforcing
 * W3C Trusted Types policies with fallback support for non-supporting browsers.
 */

export class TrustedTypesPolicyManager {
  /**
   * @param {Object} options
   * @param {string} [options.policyName='app-policy'] - Name of the primary policy
   * @param {boolean} [options.enableDefaultPolicy=false] - Whether to register a fallback 'default' policy
   * @param {Array<string>} [options.allowedScriptOrigins=[]] - Whitelisted origin origins for script URLs
   * @param {Function} [options.sanitizerFn] - Custom HTML sanitizer function (e.g., DOMPurify.sanitize)
   */
  constructor(options = {}) {
    this.policyName = options.policyName || 'app-policy';
    this.enableDefaultPolicy = options.enableDefaultPolicy || false;
    this.allowedScriptOrigins = options.allowedScriptOrigins || [window.location.origin];
    this.sanitizerFn = options.sanitizerFn || this._defaultSanitizer;
    this.policy = null;

    this._init();
  }

  /**
   * Check if native Trusted Types API is supported by current browser engine
   * @returns {boolean}
   */
  static isSupported() {
    return typeof window !== 'undefined' &&
           'trustedTypes' in window &&
           typeof window.trustedTypes.createPolicy === 'function';
  }

  /**
   * Initialize native policy or build legacy fallback object
   * @private
   */
  _init() {
    if (TrustedTypesPolicyManager.isSupported()) {
      try {
        // Register main named policy
        this.policy = window.trustedTypes.createPolicy(this.policyName, {
          createHTML: (input) => this._sanitizeHTML(input),
          createScriptURL: (input) => this._validateScriptURL(input),
          createScript: (input) => this._validateScript(input)
        });

        // Register default policy if explicitly configured
        if (this.enableDefaultPolicy && !window.trustedTypes.defaultPolicy) {
          window.trustedTypes.createPolicy('default', {
            createHTML: (input) => {
              console.warn(`[TrustedTypes] Default policy caught unhandled string assignment to HTML sink.`);
              return this._sanitizeHTML(input);
            },
            createScriptURL: (input) => {
              console.warn(`[TrustedTypes] Default policy caught unhandled string assignment to ScriptURL sink.`);
              return this._validateScriptURL(input);
            },
            createScript: (input) => {
              console.error(`[TrustedTypes] Default policy blocked dynamic script string execution.`);
              throw new TypeError('TrustedTypes default policy prohibits eval/Script string execution.');
            }
          });
        }
      } catch (err) {
        console.error(`[TrustedTypes] Failed to register policy '${this.policyName}':`, err);
        this._createFallbackPolicy();
      }
    } else {
      this._createFallbackPolicy();
    }
  }

  /**
   * Fallback implementation for browsers without native Trusted Types support
   * @private
   */
  _createFallbackPolicy() {
    this.policy = {
      createHTML: (input) => this._sanitizeHTML(input),
      createScriptURL: (input) => this._validateScriptURL(input),
      createScript: (input) => this._validateScript(input)
    };
  }

  /**
   * Sanitize raw HTML string
   * @private
   * @param {string} input
   * @returns {string}
   */
  _sanitizeHTML(input) {
    if (typeof input !== 'string') return '';
    return this.sanitizerFn(input);
  }

  /**
   * Validate script URL origin against whitelist
   * @private
   * @param {string} input
   * @returns {string}
   */
  _validateScriptURL(input) {
    try {
      const parsedURL = new URL(input, window.location.href);
      const isAllowed = this.allowedScriptOrigins.some(origin => {
        return parsedURL.origin === origin || parsedURL.href.startsWith(origin);
      });

      if (isAllowed) {
        return parsedURL.href;
      }
      throw new TypeError(`Origin '${parsedURL.origin}' not permitted for script URL loading.`);
    } catch (err) {
      throw new TypeError(`[TrustedTypes] Disallowed script URL source '${input}': ${err.message}`);
    }
  }

  /**
   * Validate dynamic script code string
   * @private
   * @param {string} input
   * @returns {string}
   */
  _validateScript(input) {
    // Default security stance: strictly disallow dynamic string execution in script sinks
    throw new TypeError('[TrustedTypes] Dynamic script string execution is disabled by policy.');
  }

  /**
   * Default rudimentary HTML escaping sanitizer if DOMPurify is not provided
   * @private
   * @param {string} str
   * @returns {string}
   */
  _defaultSanitizer(str) {
    if (typeof window !== 'undefined' && window.DOMPurify) {
      return window.DOMPurify.sanitize(str, { RETURN_TRUSTED_TYPE: false });
    }
    // Basic entity escaping fallback
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Helper: Safely generate TrustedHTML value
   * @param {string} htmlString
   * @returns {TrustedHTML|string}
   */
  createHTML(htmlString) {
    return this.policy.createHTML(htmlString);
  }

  /**
   * Helper: Safely generate TrustedScriptURL value
   * @param {string} urlString
   * @returns {TrustedScriptURL|string}
   */
  createScriptURL(urlString) {
    return this.policy.createScriptURL(urlString);
  }

  /**
   * Helper: Safely assign HTML content to an element sink
   * @param {HTMLElement} element
   * @param {string} htmlContent
   */
  setInnerHTML(element, htmlContent) {
    if (!element) return;
    element.innerHTML = this.createHTML(htmlContent);
  }

  /**
   * Helper: Safely assign script URL to a script element sink
   * @param {HTMLScriptElement} scriptElement
   * @param {string} scriptURL
   */
  setScriptSrc(scriptElement, scriptURL) {
    if (!scriptElement) return;
    scriptElement.src = this.createScriptURL(scriptURL);
  }
}

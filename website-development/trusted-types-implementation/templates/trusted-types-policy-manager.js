/**
 * Trusted Types Policy Manager Module
 *
 * Provides a standardized client-side controller for registering Trusted Types
 * policies, polyfilling unsupported browser environments, sanitizing HTML via DOMPurify,
 * and safely wrapping assignments to DOM injection sinks.
 *
 * @module TrustedTypesManager
 */

import DOMPurify from 'dompurify';

class TrustedTypesManager {
  /**
   * @param {Object} options Configuration options
   * @param {boolean} [options.enableDefaultPolicy=true] Whether to register a fallback 'default' policy
   * @param {Array<string>} [options.allowedScriptOrigins=[]] Additional allowed origins for script URLs
   */
  constructor(options = {}) {
    this.options = {
      enableDefaultPolicy: true,
      allowedScriptOrigins: [],
      ...options,
    };

    /** @type {TrustedTypePolicyFactory|null} */
    this.ttFactory = typeof window !== 'undefined' && window.trustedTypes
      ? window.trustedTypes
      : null;

    /** @type {Map<string, TrustedTypePolicy>} */
    this.policies = new Map();

    this.init();
  }

  /**
   * Initialize default policy and core sanitization policies
   */
  init() {
    if (!this.isSupported()) {
      console.warn(
        '[TrustedTypesManager] W3C Trusted Types is not natively supported in this browser environment. Operating in progressive enhancement fallback mode.'
      );
    }

    // Register primary application sanitization policy
    this.registerPolicy('dompurify-sanitizer', {
      createHTML: (input, config) => this.sanitizeHTML(input, config),
      createScriptURL: (url) => this.validateScriptURL(url),
      createScript: (script) => this.validateScriptCode(script),
    });

    // Register optional fallback default policy
    if (this.options.enableDefaultPolicy && this.isSupported() && !this.ttFactory.defaultPolicy) {
      try {
        this.ttFactory.createPolicy('default', {
          createHTML: (input) => {
            console.warn('[TrustedTypes Default Policy] Raw string intercepted at sink. Sanitizing HTML:', input);
            return DOMPurify.sanitize(input);
          },
          createScriptURL: (url) => {
            console.warn('[TrustedTypes Default Policy] Raw script URL intercepted at sink. Validating URL:', url);
            return this.validateScriptURL(url);
          },
          createScript: (script) => {
            console.error('[TrustedTypes Default Policy] Blocked raw string code evaluation at sink:', script);
            throw new Error('[TrustedTypes] Dynamic inline script generation is forbidden.');
          },
        });
      } catch (err) {
        console.error('[TrustedTypesManager] Failed to register default policy:', err);
      }
    }
  }

  /**
   * Check if native Trusted Types API is available
   * @returns {boolean}
   */
  isSupported() {
    return this.ttFactory !== null;
  }

  /**
   * Register a new named policy
   * @param {string} name Policy name (must match CSP trusted-types header if configured)
   * @param {Object} rules Policy rule functions {createHTML, createScriptURL, createScript}
   * @returns {TrustedTypePolicy|null}
   */
  registerPolicy(name, rules) {
    if (this.policies.has(name)) {
      return this.policies.get(name);
    }

    if (!this.isSupported()) {
      // Create a shim policy object for unsupported browsers
      const shimPolicy = {
        name,
        createHTML: (input, ...args) => rules.createHTML ? rules.createHTML(input, ...args) : input,
        createScriptURL: (url, ...args) => rules.createScriptURL ? rules.createScriptURL(url, ...args) : url,
        createScript: (script, ...args) => rules.createScript ? rules.createScript(script, ...args) : script,
      };
      this.policies.set(name, shimPolicy);
      return shimPolicy;
    }

    try {
      const policy = this.ttFactory.createPolicy(name, rules);
      this.policies.set(name, policy);
      return policy;
    } catch (err) {
      console.error(`[TrustedTypesManager] Failed to create policy "${name}":`, err);
      return null;
    }
  }

  /**
   * Core HTML sanitization logic using DOMPurify
   * @param {string} untrustedHTML
   * @param {Object} [config] DOMPurify configuration overrides
   * @returns {string}
   */
  sanitizeHTML(untrustedHTML, config = {}) {
    if (typeof untrustedHTML !== 'string') {
      return '';
    }
    return DOMPurify.sanitize(untrustedHTML, {
      RETURN_TRUSTED_TYPE: false,
      ...config,
    });
  }

  /**
   * Script URL origin validation logic
   * @param {string} untrustedURL
   * @returns {string} Validated URL string
   */
  validateScriptURL(untrustedURL) {
    const originWhitelist = new Set([
      window.location.origin,
      ...this.options.allowedScriptOrigins,
    ]);

    try {
      const parsed = new URL(untrustedURL, window.location.href);
      if (parsed.protocol === 'https:' && originWhitelist.has(parsed.origin)) {
        return parsed.href;
      }
    } catch (err) {
      throw new TypeError(`[TrustedTypesManager] Invalid URL string provided: ${untrustedURL}`);
    }

    throw new TypeError(
      `[TrustedTypesManager] Disallowed script URL origin "${untrustedURL}". Origin must be one of: ${Array.from(originWhitelist).join(', ')}`
    );
  }

  /**
   * Inline script validation logic
   * @param {string} scriptCode
   * @returns {string}
   */
  validateScriptCode(scriptCode) {
    throw new Error('[TrustedTypesManager] Executable code creation via createScript is explicitly forbidden.');
  }

  /**
   * Safely inject HTML into a DOM element sink
   * @param {HTMLElement} element Target DOM element
   * @param {string} untrustedHTML Raw HTML string
   * @param {string} [policyName='dompurify-sanitizer'] Policy to use
   */
  setInnerHTML(element, untrustedHTML, policyName = 'dompurify-sanitizer') {
    if (!element || !(element instanceof HTMLElement)) {
      throw new Error('[TrustedTypesManager] Target element must be a valid HTMLElement.');
    }

    const policy = this.policies.get(policyName) || this.policies.get('dompurify-sanitizer');
    const trustedHTML = policy.createHTML(untrustedHTML);
    element.innerHTML = trustedHTML;
  }

  /**
   * Safely load an external script via script.src sink
   * @param {string} url External script URL
   * @param {Object} [attributes={}] Additional HTMLScriptElement attributes
   * @returns {Promise<HTMLScriptElement>}
   */
  loadScript(url, attributes = {}) {
    return new Promise((resolve, reject) => {
      const policy = this.policies.get('dompurify-sanitizer');
      const scriptEl = document.createElement('script');

      try {
        const trustedURL = policy.createScriptURL(url);
        scriptEl.src = trustedURL;
      } catch (err) {
        return reject(err);
      }

      Object.assign(scriptEl, attributes);
      scriptEl.onload = () => resolve(scriptEl);
      scriptEl.onerror = (err) => reject(new Error(`Failed to load script: ${url}`));

      document.head.appendChild(scriptEl);
    });
  }
}

// Export singleton instance and class definition
export const ttManager = new TrustedTypesManager();
export default TrustedTypesManager;

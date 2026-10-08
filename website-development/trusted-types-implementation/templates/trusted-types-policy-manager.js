/**
 * Trusted Types Policy Manager Template
 * Production-ready utility for defining, registering, and safely invoking
 * W3C Trusted Types policies with cross-browser fallback handling.
 */

class TrustedTypesPolicyManager {
  /**
   * Initialize Policy Manager
   * @param {Object} config Configuration options
   * @param {Function} [config.sanitizer] External sanitizer function (e.g., DOMPurify.sanitize)
   * @param {Array<string>} [config.allowedScriptDomains] Whitelisted hostnames for script URLs
   * @param {boolean} [config.enableDefaultPolicy] Whether to auto-register a safety-net default policy
   */
  constructor(config = {}) {
    this.sanitizer = config.sanitizer || this._fallbackSanitizer;
    this.allowedScriptDomains = config.allowedScriptDomains || [window.location.hostname];
    this.enableDefaultPolicy = config.enableDefaultPolicy !== false;

    this.policies = new Map();
    this.hasNativeSupport = typeof window !== 'undefined' && typeof window.trustedTypes !== 'undefined';

    this._initPolyfillIfNeeded();
    if (this.enableDefaultPolicy) {
      this._registerDefaultPolicy();
    }
  }

  /**
   * Internal Polyfill / Fallback Wrapper
   */
  _initPolyfillIfNeeded() {
    if (!this.hasNativeSupport && typeof window !== 'undefined') {
      window.trustedTypes = {
        createPolicy: (name, rules) => {
          const mockPolicy = {
            name,
            createHTML: (input) => rules.createHTML ? rules.createHTML(input) : input,
            createScript: (input) => rules.createScript ? rules.createScript(input) : input,
            createScriptURL: (url) => rules.createScriptURL ? rules.createScriptURL(url) : url
          };
          return mockPolicy;
        },
        getAttributeType: () => null,
        getPropertyType: () => null,
        isHTML: (obj) => false,
        isScript: (obj) => false,
        isScriptURL: (obj) => false
      };
    }
  }

  /**
   * Default Safety-Net Policy Registration
   */
  _registerDefaultPolicy() {
    if (this.hasNativeSupport && window.trustedTypes.defaultPolicy) {
      return;
    }

    try {
      const defaultPolicy = window.trustedTypes.createPolicy('default', {
        createHTML: (input) => {
          console.warn('[TrustedTypesManager] Default policy intercepted un-wrapped HTML sink mutation.');
          return this.sanitizer(input);
        },
        createScript: (input) => {
          console.error('[TrustedTypesManager] Default policy blocked execution of un-wrapped string script.');
          throw new TypeError('Dynamic script string execution blocked by Trusted Types policy.');
        },
        createScriptURL: (url) => {
          console.warn('[TrustedTypesManager] Default policy intercepted script URL creation:', url);
          return this.sanitizeScriptURL(url, 'default-policy');
        }
      });
      this.policies.set('default', defaultPolicy);
    } catch (err) {
      console.info('[TrustedTypesManager] Default policy skipped or already exists:', err.message);
    }
  }

  /**
   * Fallback String Sanitizer
   */
  _fallbackSanitizer(input) {
    if (typeof input !== 'string') return '';
    // Strip scripts and dangerous inline event handlers
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, 'data-blocked-event=""')
      .replace(/javascript:/gi, 'blocked-scheme:');
  }

  /**
   * Create or Retrieve Named HTML Policy
   * @param {string} policyName Unique policy identifier registered in CSP
   * @returns {Object} TrustedTypes Policy Object
   */
  getHTMLPolicy(policyName = 'app-html-policy') {
    if (this.policies.has(policyName)) {
      return this.policies.get(policyName);
    }

    try {
      const policy = window.trustedTypes.createPolicy(policyName, {
        createHTML: (input) => this.sanitizer(input)
      });
      this.policies.set(policyName, policy);
      return policy;
    } catch (err) {
      console.error(`[TrustedTypesManager] Failed to create policy '${policyName}':`, err);
      throw err;
    }
  }

  /**
   * Sanitize and Wrap String for HTML Sink Assignment
   * @param {string} rawHTML Input string containing untrusted markup
   * @param {string} [policyName] Registered policy name
   * @returns {TrustedHTML|string} Safe TrustedHTML instance or polyfill object
   */
  sanitizeHTML(rawHTML, policyName = 'app-html-policy') {
    const policy = this.getHTMLPolicy(policyName);
    return policy.createHTML(rawHTML);
  }

  /**
   * Validate and Wrap Script URL for Dynamic Script Loading
   * @param {string} url Candidate script URL
   * @param {string} [policyName] Registered policy name
   * @returns {TrustedScriptURL|string} Safe TrustedScriptURL instance
   */
  sanitizeScriptURL(url, policyName = 'app-script-policy') {
    let policy = this.policies.get(policyName);

    if (!policy) {
      try {
        policy = window.trustedTypes.createPolicy(policyName, {
          createScriptURL: (inputUrl) => {
            const parsed = new URL(inputUrl, window.location.href);
            const isAllowedDomain = this.allowedScriptDomains.some(domain =>
              parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
            );

            if (isAllowedDomain || parsed.origin === window.location.origin) {
              return parsed.href;
            }
            throw new TypeError(`[TrustedTypesManager] Blocked script load from unauthorized host: ${parsed.hostname}`);
          }
        });
        this.policies.set(policyName, policy);
      } catch (err) {
        console.error(`[TrustedTypesManager] Failed to create ScriptURL policy '${policyName}':`, err);
        throw err;
      }
    }

    return policy.createScriptURL(url);
  }
}

// Export for ES modules or global window attachment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TrustedTypesPolicyManager };
} else {
  window.TrustedTypesPolicyManager = TrustedTypesPolicyManager;
}

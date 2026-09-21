/**
 * HTMLSanitizerManager
 * Progressive Enhancement Client-Side HTML Sanitizer
 *
 * Provides zero-trust rendering of untrusted HTML strings using native W3C Sanitizer API
 * when available, with an automated fallback to DOMPurify DOM fragment parsing.
 */
class HTMLSanitizerManager {
  /**
   * @param {Object} options Configuration options
   * @param {Array<string>} [options.allowedTags] List of allowed HTML tag names
   * @param {Array<string>} [options.allowedAttributes] List of allowed HTML attributes
   * @param {RegExp} [options.allowedUriScheme] Regular expression matching safe URI schemes
   * @param {Function} [options.onSanitizeViolation] Telemetry hook called when dangerous tags are stripped
   */
  constructor(options = {}) {
    this.allowedTags = options.allowedTags || [
      'p', 'br', 'b', 'i', 'strong', 'em', 'u', 's', 'sub', 'sup',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
      'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'div'
    ];

    this.allowedAttributes = options.allowedAttributes || [
      'href', 'src', 'alt', 'title', 'target', 'class', 'id', 'width', 'height'
    ];

    this.allowedUriScheme = options.allowedUriScheme || /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i;
    this.onSanitizeViolation = options.onSanitizeViolation || null;

    this._hasNativeSetHTML = typeof Element !== 'undefined' && typeof Element.prototype.setHTML === 'function';
    this._hasDOMPurify = typeof window !== 'undefined' && typeof window.DOMPurify !== 'undefined';

    this._initHooks();
  }

  /**
   * Initialize DOMPurify hook extensions for tabnabbing protection
   * @private
   */
  _initHooks() {
    if (this._hasDOMPurify && window.DOMPurify.addHook) {
      window.DOMPurify.addHook('afterSanitizeAttributes', (node) => {
        // Enforce rel="noopener noreferrer" on target="_blank" links
        if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
          node.setAttribute('rel', 'noopener noreferrer');
        }

        // Neutralize dangerous protocols on href/src
        ['href', 'src'].forEach((attr) => {
          if (node.hasAttribute(attr)) {
            const value = node.getAttribute(attr);
            if (value && !this.allowedUriScheme.test(value.trim())) {
              if (this.onSanitizeViolation) {
                this.onSanitizeViolation({ type: 'DISALLOWED_URI_PROTOCOL', tag: node.tagName, attr, value });
              }
              node.removeAttribute(attr);
            }
          }
        });
      });
    }
  }

  /**
   * Check whether native setHTML is available
   * @returns {boolean}
   */
  isNativeSupported() {
    return this._hasNativeSetHTML;
  }

  /**
   * Safely render an untrusted HTML string directly into a container DOM element
   * @param {HTMLElement} containerTarget Destination DOM element
   * @param {string} untrustedHTML Input HTML string
   * @returns {boolean} True if rendering succeeded
   */
  renderIntoContainer(containerTarget, untrustedHTML) {
    if (!containerTarget || !(containerTarget instanceof HTMLElement)) {
      throw new Error('HTMLSanitizerManager: Invalid target container element provided.');
    }

    if (!untrustedHTML || typeof untrustedHTML !== 'string') {
      containerTarget.replaceChildren();
      return true;
    }

    // Method 1: Native W3C setHTML API
    if (this._hasNativeSetHTML) {
      try {
        if (typeof Sanitizer !== 'undefined') {
          const sanitizer = new Sanitizer({
            allowElements: this.allowedTags,
            allowAttributes: this.allowedAttributes
          });
          containerTarget.setHTML(untrustedHTML, { sanitizer });
        } else {
          containerTarget.setHTML(untrustedHTML);
        }
        return true;
      } catch (err) {
        console.warn('HTMLSanitizerManager: Native setHTML execution failed, dropping to fallback.', err);
      }
    }

    // Method 2: DOMPurify DocumentFragment Parsing Fallback
    if (this._hasDOMPurify) {
      const cleanFragment = window.DOMPurify.sanitize(untrustedHTML, {
        ALLOWED_TAGS: this.allowedTags,
        ALLOWED_ATTR: this.allowedAttributes,
        ALLOWED_URI_REGEXP: this.allowedUriScheme,
        RETURN_DOM_FRAGMENT: true,
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'base', 'meta'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style', 'srcdoc']
      });

      // Clear existing children and insert safe DOM nodes without innerHTML string re-parsing
      containerTarget.replaceChildren(cleanFragment);
      return true;
    }

    // Method 3: Emergency Safe Fallback (Text Node Only if no sanitizer available)
    console.error('HTMLSanitizerManager: No sanitizer engine available. Falling back to plain text escape.');
    containerTarget.textContent = untrustedHTML;
    return false;
  }

  /**
   * Return a sanitized HTML string (use with caution, avoid string-to-innerHTML roundtrips)
   * @param {string} untrustedHTML
   * @returns {string} Clean HTML string
   */
  sanitizeToString(untrustedHTML) {
    if (!untrustedHTML || typeof untrustedHTML !== 'string') return '';

    if (this._hasDOMPurify) {
      return window.DOMPurify.sanitize(untrustedHTML, {
        ALLOWED_TAGS: this.allowedTags,
        ALLOWED_ATTR: this.allowedAttributes,
        ALLOWED_URI_REGEXP: this.allowedUriScheme,
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'base', 'meta'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style', 'srcdoc']
      });
    }

    // Fallback using DOMParser if DOMPurify is not available
    const parser = new DOMParser();
    const doc = parser.parseFromString(untrustedHTML, 'text/html');
    return doc.body.textContent || '';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HTMLSanitizerManager };
}

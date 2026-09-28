---
name: trusted-types-implementation
description: Secure client-side DOM XSS prevention using W3C Trusted Types API, CSP rules, policy sanitization wrappers, and default policy fallbacks across web applications.
---

# Trusted Types Implementation

## Purpose

The Trusted Types Implementation skill provides a standardized security framework, client-side controller pattern, and audit methodology for securing web applications against DOM-based Cross-Site Scripting (DOM XSS) using the W3C Trusted Types API (`window.trustedTypes`), Content Security Policy (CSP) rules, policy sanitization wrappers, and default policy fallbacks.

DOM XSS occurs when untrusted user input flows into sensitive JavaScript execution sinks (such as `element.innerHTML`, `element.outerHTML`, `document.write()`, `script.src`, or `eval()`). Traditional sanitization approaches rely on developers remembering to manually sanitize strings before passing them to sink APIs. However, in large codebases or modern multi-developer frontend applications, a single missing sanitization call introduces a critical security vulnerability.

The W3C Trusted Types API locks down these injection sinks at the browser engine level. When enforced via CSP (`Content-Security-Policy: require-trusted-types-for 'script'`), the browser rejects raw string assignments to injection sinks, throwing a TypeError. To pass data to a sink, developers must pass strongly-typed `TrustedHTML`, `TrustedScript`, or `TrustedScriptURL` objects generated through explicitly registered policies.

---

## Use Cases

- **DOM XSS Elimination in High-Risk Applications:** Hardening enterprise web applications, customer portals, and financial dashboards against client-side script injection.
- **Third-Party Script & Library Hardening:** Enforcing strict string-to-code rules across third-party analytics, chat widgets, and CMS content injectors.
- **Dynamic Content & Template Rendering:** Securing dynamic HTML rendering pipelines that parse user-generated Markdown, rich-text WYSIWYG output, or template strings.
- **Dynamic Module and Worker Loading:** Restricting script URL injection (`script.src`, `importScripts()`, `Worker()`) to verified origin-whitelisted sources.
- **Compliance & Security Audits:** Meeting stringent web security compliance standards (such as OWASP ASVS Level 3, FedRAMP, PCI-DSS) requiring sink-level script execution constraints.

---

## When NOT to Use

- **Static Pure-HTML Pages:** Web applications with no dynamic JavaScript DOM mutations, sink assignments, or dynamic script loading.
- **Server-Only Security Controls:** Applications where security is handled purely server-side and client-side JavaScript execution is not present.
- **Applications Operating Under Unconfigurable CSP Constraints:** Environments where CSP HTTP headers cannot be modified or polyfills are strictly prohibited by runtime policies.

---

## Inputs

1. **CSP Directives:** HTTP Response Headers or `<meta>` tags configuring Trusted Types rules:
   - `Content-Security-Policy: require-trusted-types-for 'script'; trusted-types default app-policy;`
2. **Policy Configuration Rules:** Sanitization logic mapping untrusted string inputs to typed outputs (e.g., integrating DOMPurify for HTML sanitization).
3. **Target Injection Sinks:** JavaScript DOM assignment sites requiring `TrustedHTML`, `TrustedScriptURL`, or `TrustedScript` values.
4. **Fallback / Polyfill Module:** Client-side fallback handler (`trustedtypes.build.js` polyfill or custom feature detection wrapper) for legacy browsers lacking native `window.trustedTypes` support.

---

## Outputs

1. **Trusted Types Policy Manager:** A centralized JavaScript module registering, wrapping, and enforcing application policies (`window.trustedTypes.createPolicy()`).
2. **Typed Sink Assignment Wrappers:** Utility methods producing `TrustedHTML`, `TrustedScriptURL`, and `TrustedScript` instances.
3. **Default Policy Fallback Handler:** A safe global default policy (`trustedTypes.createPolicy('default', ...)` or custom polyfill fallback) to prevent unexpected runtime breaks during migration.
4. **Trusted Types Audit Checklist:** Verification documentation for auditing CSP HTTP headers, DOM XSS sink usage, and policy compliance.

---

## Workflow

### 1. Configure CSP Header or Meta Tag

Enable Trusted Types enforcement at the browser level by adding the `require-trusted-types-for` and `trusted-types` directives to your Content Security Policy HTTP header (or `<meta>` element during development).

```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types app-policy default;
```

*Note: Use `Content-Security-Policy-Report-Only` during initial integration to log violations without breaking application functionality.*

---

### 2. Feature Detect and Initialize Policy Manager

Create a policy manager module that detects native support for `window.trustedTypes` and registers named policies.

```javascript
// trusted-policy.js
let policy = null;

export function getAppPolicy() {
  if (policy) return policy;

  if (window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function') {
    policy = window.trustedTypes.createPolicy('app-policy', {
      createHTML(input) {
        // Sanitize untrusted HTML strings using a trusted library like DOMPurify
        return DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: false });
      },
      createScriptURL(input) {
        // Enforce strict URL origin matching for script sources
        const url = new URL(input, window.location.href);
        if (url.origin === window.location.origin || url.hostname === 'cdn.trusted.com') {
          return url.href;
        }
        throw new TypeError(`TrustedTypes: Disallowed script URL source '${input}'`);
      },
      createScript(input) {
        // Generally disallow dynamic script string creation unless strictly audited
        throw new TypeError('TrustedTypes: Dynamic TrustedScript creation is prohibited.');
      }
    });
  } else {
    // Fallback object for unsupported browsers providing identical interface
    policy = {
      createHTML: (input) => DOMPurify.sanitize(input),
      createScriptURL: (input) => {
        const url = new URL(input, window.location.href);
        if (url.origin === window.location.origin || url.hostname === 'cdn.trusted.com') {
          return url.href;
        }
        throw new TypeError(`Disallowed script URL source '${input}'`);
      },
      createScript: () => {
        throw new TypeError('Dynamic script creation is prohibited.');
      }
    };
  }

  return policy;
}
```

---

### 3. Replace Direct Sink String Assignments

Refactor raw string assignments to DOM injection sinks across your codebase to use the policy outputs.

```javascript
import { getAppPolicy } from './trusted-policy.js';

const policy = getAppPolicy();

// ❌ VULNERABLE TO DOM XSS (Will be blocked by CSP in supporting browsers):
// element.innerHTML = userInput;

// ✅ SECURE TRUSTED TYPES ASSIGNMENT:
const safeHTML = policy.createHTML(userInput);
element.innerHTML = safeHTML;

// ❌ VULNERABLE SCRIPT URL INJECTION:
// scriptElement.src = externalUrl;

// ✅ SECURE TRUSTED SCRIPT URL ASSIGNMENT:
const safeScriptURL = policy.createScriptURL(externalUrl);
scriptElement.src = safeScriptURL;
```

---

### 4. Implement Default Policy for Legacy Third-Party Libraries

If third-party scripts or legacy codebase modules perform string assignments to injection sinks without explicit policy calls, register a `default` policy to catch and sanitize un-wrapped assignments.

```javascript
if (window.trustedTypes && !window.trustedTypes.defaultPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML(input) {
      console.warn('TrustedTypes: Default policy invoked for HTML sink string assignment');
      return DOMPurify.sanitize(input);
    },
    createScriptURL(input) {
      console.warn('TrustedTypes: Default policy invoked for ScriptURL sink string assignment');
      const url = new URL(input, window.location.href);
      if (url.origin === window.location.origin) {
        return url.href;
      }
      throw new TypeError(`TrustedTypes default policy rejected ScriptURL: ${input}`);
    },
    createScript(input) {
      console.error('TrustedTypes: Blocked unhandled string execution in script sink');
      throw new TypeError('TrustedTypes default policy disallows eval/Script string execution');
    }
  });
}
```

---

## Decision Rules

### Policy Registration Strategy

| Scenario / Requirement | Recommended Approach | Mechanism |
| :--- | :--- | :--- |
| **Strict Application Hardening** | Named Policy + Disallowed `default` policy | `trusted-types app-policy;` (no `default` policy allowed in CSP) |
| **Legacy Codebase Migration** | Named Policy + Permissive `default` policy with logging | `trusted-types app-policy default;` with `DOMPurify.sanitize()` fallback |
| **Third-Party Script Integration** | Report-Only Mode initially + Script URL whitelist | `Content-Security-Policy-Report-Only` + `createScriptURL` validation |
| **Un-polyfilled Legacy Browsers** | Feature detection wrapper | Check `window.trustedTypes` and fallback to standard sanitized strings |

---

## Constraints

- **Browser Baseline:** Native support available in Chromium browsers (Chrome 83+, Edge 83+, Opera 69+). Safari and Firefox require polyfills (`w3c-trusted-types` or `trusted-types` npm package) or feature detection wrappers.
- **CSP Directive Scope:** The `require-trusted-types-for 'script'` directive applies to DOM sinks within the standard execution context. Web Workers and Service Workers require separate CSP configuration.
- **Performance:** Policy invocation (`createHTML`, `createScriptURL`) adds minimal execution overhead (< 0.1ms per call). Ensure heavy sanitizers like DOMPurify are tuned or cached for high-frequency DOM operations.
- **No `eval()` Bypass:** Enabling Trusted Types does NOT make `eval()` inherently safe unless a `createScript` policy explicitly validates inputs. Prefer disabling `eval()` entirely via CSP `script-src 'self'`.

---

## Non-Goals

- Replacing server-side HTML escaping or SQL injection prevention.
- Replacing Content Security Policy `script-src` nonce/hash directives (Trusted Types complements CSP `script-src`, but does not replace it).
- Handling network-level CORS or Transport Layer Security (TLS) controls.

---

## Common Failure Patterns

- **Allowing `trusted-types *` in Production:** Using wildcards in CSP (`trusted-types *`), allowing any script to create un-audited policies and bypassing security guarantees.
- **Unsanitized Pass-Through in `createHTML`:** Registering a policy that returns raw input strings without sanitization (e.g., `createHTML: (s) => s`), rendering Trusted Types ineffective.
- **Ignoring `createScriptURL` Validation:** Returning string inputs blindly in `createScriptURL`, allowing malicious external origins to be loaded into `<script src="...">` or `Worker()`.
- **Forgetting `report-only` Phase:** Deploying strict CSP `require-trusted-types-for 'script'` directly to production without testing, causing script crashes when legacy libraries attempt string assignments.
- **Relying on Native Types in Unsupported Browsers:** Calling `window.trustedTypes.createPolicy()` without checking feature availability or wrapping in fallback logic, throwing runtime errors in Safari or Firefox.

---

## Validation Steps

- [ ] **CSP Header Verification:** Confirm `Content-Security-Policy` header includes `require-trusted-types-for 'script'` and limits policy names via `trusted-types`.
- [ ] **Sink Violation Rejection Test:** Open DevTools console and execute `document.body.innerHTML = '<b>test</b>'`. Confirm browser throws a `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.`
- [ ] **Policy Assignment Test:** Execute `element.innerHTML = policy.createHTML('<b>test</b>')` and verify successful DOM update without errors.
- [ ] **Script URL Origin Enforcement:** Test passing an untrusted external origin to `policy.createScriptURL('https://attacker.com/malicious.js')` and confirm a TypeError is thrown.
- [ ] **Cross-Browser Fallback Verification:** Test application in non-Chromium browser (or disable `window.trustedTypes`) and confirm graceful execution using sanitization fallback wrappers.

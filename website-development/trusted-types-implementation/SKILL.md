---
name: trusted-types-implementation
description: Secure web applications against DOM-based Cross-Site Scripting (DOM XSS) using W3C Trusted Types API, Content Security Policy (CSP) rules, policy sanitization wrappers, and fallback polyfills.
---

# Trusted Types Implementation

## Purpose

The Trusted Types Implementation skill provides a technical protocol, client-side controller pattern, and audit methodology for securing web applications against DOM-based Cross-Site Scripting (DOM XSS).

DOM XSS occurs when user-controlled data reaches dangerous DOM "sinks" (such as `element.innerHTML`, `element.outerHTML`, `document.write()`, `script.src`, or `eval()`) without proper sanitization. The W3C Trusted Types API locks down these injection sinks at the browser engine level, requiring strings to be wrapped in typed objects (`TrustedHTML`, `TrustedScript`, `TrustedScriptURL`) created through explicit, auditable security policies.

This skill enables frontend developers to enforce Trusted Types policies, configure Content Security Policy (CSP) response headers, integrate sanitization libraries like DOMPurify, handle legacy third-party script sinks, and implement polyfills for cross-browser resilience.

---

## Use Cases

- **DOM XSS Lockdown:** Preventing client-side script injection vulnerabilities across dynamic single-page applications (SPAs) and server-rendered HTML applications.
- **Content Security Policy (CSP) Hardening:** Enforcing `require-trusted-types-for 'script'` and restricting policy creation via `trusted-types myPolicy default` directives in HTTP response headers.
- **Third-Party Script & Analytics Sanitization:** Wrapping dynamically injected script sources (`HTMLScriptElement.src`) or JSON-P responses in `TrustedScriptURL` policies.
- **Rich Text & Dynamic HTML Injection:** Sanitizing untrusted user markdown, rich-text WYSIWYG input, or template strings before injecting them into `element.innerHTML`.
- **Security Audit & Codebase Remediation:** Systematically replacing raw string assignments to DOM sinks with typed policy invocations.

---

## When NOT to Use

- **Server-Side Injection (Reflected / Stored XSS in HTTP Responses):** Trusted Types operate purely within the client-side DOM runtime. Server-side output encoding and HTTP header sanitization are still required for raw HTTP responses.
- **Non-DOM Data Processing:** Internal state operations, array manipulations, or calculations that do not touch DOM injection sinks do not require Trusted Types wrapping.
- **Static HTML Pages Without Dynamic Injection:** Static HTML pages without client-side script execution or dynamic DOM mutation sinks do not benefit from runtime Trusted Types enforcement.

---

## Inputs

1. **DOM Sink Inventory:** An audit of all assignments to sensitive DOM properties (`innerHTML`, `outerHTML`, `src`, `href`, `insertAdjacentHTML`).
2. **CSP Header Configuration:** HTTP response headers controlling policy execution, such as `Content-Security-Policy: require-trusted-types-for 'script'; trusted-types default app-policy;`.
3. **Sanitization Engine:** A trusted client-side sanitization library (e.g., DOMPurify) or custom policy rules.
4. **Browser Runtime Context:** Window context supporting `window.trustedTypes` or a polyfill runtime (`trusted-types/dist/es6/index.js`).

---

## Outputs

1. **Trusted Types Policy Registry:** Modular JavaScript policy manager registering policies (`trustedTypes.createPolicy(...)`) for HTML, Script, and ScriptURL sanitization.
2. **Typed DOM Sink Assignments:** Safe DOM mutations replacing raw strings with `policy.createHTML()`, `policy.createScript()`, or `policy.createScriptURL()`.
3. **Default Policy Fallback:** A safety net `default` policy for catching un-migrated third-party DOM sink mutations or legacy code.
4. **Polyfilled Browser Fallback:** Cross-browser support layer ensuring non-supporting browsers fall back smoothly without breaking functionality.

---

## Workflow

### 1. Identify and Categorize DOM Injection Sinks
Map all codebase locations where string values are passed into DOM sinks:
- **`TrustedHTML` Sinks:** `element.innerHTML`, `element.outerHTML`, `element.insertAdjacentHTML`, `document.write()`, `document.writeln()`, `shadowRoot.innerHTML`.
- **`TrustedScript` Sinks:** `<script>` element text, `eval()`, `setTimeout(string)`, `setInterval(string)`, `new Function(string)`.
- **`TrustedScriptURL` Sinks:** `HTMLScriptElement.src`, `Worker.src`, `SharedWorker.src`, `ServiceWorkerContainer.register()`.

### 2. Configure Content Security Policy (CSP)
Enable Trusted Types enforcement at the HTTP response header level:
```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types app-html-policy app-script-policy default;
```
For testing without breaking production, use report-only mode:
```http
Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; trusted-types app-html-policy default; report-uri /api/csp-report;
```

### 3. Build and Register Trusted Types Policies
Use `window.trustedTypes.createPolicy` to define rules for string sanitization.

```javascript
// Register a policy for HTML sanitization using DOMPurify
const htmlPolicy = window.trustedTypes?.createPolicy('app-html-policy', {
  createHTML: (input) => {
    // Sanitize input string using DOMPurify
    return DOMPurify.sanitize(input, { RETURN_TRUSTED_TYPE: false });
  }
});

// Register a policy for script URLs (e.g., dynamic chunk loading)
const scriptUrlPolicy = window.trustedTypes?.createPolicy('app-script-policy', {
  createScriptURL: (url) => {
    const parsed = new URL(url, window.location.href);
    const allowedDomains = ['cdn.example.com', 'assets.example.com'];
    if (allowedDomains.includes(parsed.hostname) || parsed.origin === window.location.origin) {
      return parsed.href;
    }
    throw new TypeError(`Blocked unapproved script origin: ${parsed.hostname}`);
  }
});
```

### 4. Replace Direct String Assignments with Typed Invocations
Refactor raw string assignments to use the registered policies:

```javascript
// BEFORE (Vulnerable to DOM XSS)
container.innerHTML = userInput;

// AFTER (Secure with Trusted Types)
const safeHTML = htmlPolicy.createHTML(userInput);
container.innerHTML = safeHTML;
```

### 5. Establish a `default` Policy Fallback
Create a `default` policy to handle legacy scripts or vendor libraries that perform un-wrapped string assignments.

```javascript
if (window.trustedTypes && !window.trustedTypes.defaultPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: (input) => DOMPurify.sanitize(input),
    createScript: (input) => {
      console.warn('[Trusted Types] Default policy intercepted raw script creation:', input);
      throw new Error('Executing raw script string is prohibited by CSP');
    },
    createScriptURL: (url) => {
      console.warn('[Trusted Types] Default policy intercepted script URL creation:', url);
      throw new Error('Loading unvalidated script URL is prohibited by CSP');
    }
  });
}
```

---

## Decision Rules

| Sink Type | Trusted Type | Recommended Policy Action |
| :--- | :--- | :--- |
| `element.innerHTML` / `insertAdjacentHTML` | `TrustedHTML` | Pass input through `DOMPurify.sanitize()` with strict attribute and tag allowlists. |
| `scriptElement.src` / `Worker()` | `TrustedScriptURL` | Validate URL origin against strict allowlist of authorized CDNs or relative paths. |
| Dynamic `eval()` / `new Function()` | `TrustedScript` | Eliminate usage entirely; if unavoidable, parse against static JSON or pre-compiled AST. |
| Third-party libraries mutating DOM | `default` Policy | Catch via `default` policy, log violation, and sanitize through `DOMPurify`. |

---

## Constraints

- **Browser Support:** Native support in Chromium browsers (Chrome, Edge, Opera 83+). Safari and Firefox require a lightweight polyfill (e.g., `trusted-types` npm package) to prevent `TypeError` when accessing `window.trustedTypes`.
- **Policy Creation Limits:** CSP `trusted-types` directives limit which policy names can be created. Attempting to create an unlisted policy throws a `TypeError`.
- **Performance Overhead:** Ensure policy callbacks (especially `DOMPurify.sanitize`) execute in under 1ms for frequent DOM updates. Avoid re-sanitizing static HTML strings.

---

## Non-Goals

- Replacing backend input validation or database query parameterization (SQL injection defense).
- Handling network transport security (TLS/HTTPS configuration).
- Standard CSRF token handling.

---

## Common Failure Patterns

- **Over-Permissive `default` Policy:** Implementing a `default` policy that returns raw un-sanitized strings (`createHTML: (s) => s`), rendering Trusted Types protection useless.
- **Ignoring Script URL Sinks:** Securing `innerHTML` while leaving `script.src` unvalidated, permitting dynamic script execution from rogue CDNs.
- **Duplicate Policy Names:** Attempting to register the same policy name twice using `trustedTypes.createPolicy()`, which throws a runtime `TypeError`.
- **Bypassing Sanitization for Trusted Users:** Assuming admin or internal user inputs do not require sanitization.

---

## Validation Steps

### 1. Runtime Violation Inspection
- Open Chrome DevTools -> **Console**.
- Attempt to assign a raw string to an `innerHTML` sink in a page with CSP `require-trusted-types-for 'script'`.
- Verify the browser throws a `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.`

### 2. Policy Enforcement Test
- Inject untrusted HTML containing `<img src=x onerror=alert(1)>` into `policy.createHTML()`.
- Verify that `DOMPurify` strips the malicious attribute and output is safe `TrustedHTML`.

### 3. Script URL Origin Restriction Test
- Pass an unauthorized external domain URL to `scriptUrlPolicy.createScriptURL('https://evil.com/payload.js')`.
- Verify the policy throws a `TypeError` and prevents script element creation.

### 4. Polyfill Verification
- Test in Firefox or Safari with the Trusted Types polyfill loaded.
- Verify `window.trustedTypes` exists, policies build properly, and DOM assignments operate seamlessly without exceptions.

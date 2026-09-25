---
name: trusted-types-implementation
description: Systematically lock down DOM XSS injection sinks (innerHTML, insertAdjacentHTML, script.src) using the W3C Trusted Types API, CSP header enforcement, policy sanitization wrappers, and default policy fallbacks.
---

# Trusted Types Implementation

## Purpose

The Trusted Types Implementation skill provides a standardized security framework, client-side controller pattern, and audit methodology for securing web applications against DOM-based Cross-Site Scripting (DOM XSS). By enforcing the W3C Trusted Types API via Content Security Policy (CSP), applications lock down sensitive DOM "injection sinks" (such as `Element.innerHTML`, `Element.outerHTML`, `Range.createContextualFragment()`, `HTMLScriptElement.src`, and `eval()`).

Instead of accepting raw, unvalidated strings, browser engines configured with Trusted Types require strongly-typed, policy-sanitized objects (`TrustedHTML`, `TrustedScriptURL`, and `TrustedScript`). This shifts DOM XSS vulnerability prevention from reactive code-auditing of thousands of dynamic string assignments to programmatic type enforcement at the browser rendering engine boundary.

---

## Use Cases

- **Hardening Dynamic Content Injection:** Applications rendering user-generated content, rich text markup, dynamic templates, or localized HTML snippets via `element.innerHTML` or `element.insertAdjacentHTML()`.
- **Securing Dynamic Script Tag Loading:** Single-page applications, analytics engines, or third-party tag managers dynamically injecting external scripts using `scriptElement.src = url` or `document.createElement('script')`.
- **Enforcing CSP Sink Hardening:** Organizations configuring Content Security Policy (`Content-Security-Policy: require-trusted-types-for 'script';`) to satisfy enterprise compliance, FedRAMP, or ISO security auditing standards.
- **Micro-Frontend & Legacy Code Migration:** Legacy web applications containing hundreds of legacy `innerHTML` assignments where central default policy fallbacks or modular DOMPurify policies prevent runtime breakage while migrating to typed assignments.
- **Preventing Third-Party Dependency XSS:** Shielding application execution environments against rogue or compromised npm UI libraries that manipulate DOM injection sinks internally without sanitization.

---

## When NOT to Use

- **Static HTML Pages:** Pages without any dynamic JavaScript DOM manipulation, dynamic script injection, or client-side HTML templating.
- **Server-Side Rendered (SSR) HTML Output:** Protecting server-generated HTML responses (use HTTP Response Encoding, CSP nonces/hashes, and server-side XSS sanitizers instead).
- **Browsers Without Polyfill Fallbacks in Legacy Environments:** Operating in restricted legacy browser environments where neither native Trusted Types nor JavaScript polyfills can be deployed (though modern polyfills work in all ES6 browsers).
- **Backend Node.js Application Logic:** Server-side database queries, filesystem access, or OS process execution (use parametrized SQL queries and command-line sanitization instead).

---

## Inputs

1. **Content Security Policy (CSP) Directives:** The HTTP response header or HTML `<meta>` tag specifying Trusted Types requirements (e.g., `Content-Security-Policy: require-trusted-types-for 'script'; trusted-types dompurify default;`).
2. **Untrusted Data Strings:** Raw user input, API JSON payloads, URL search parameters, or dynamic template strings destined for DOM injection sinks.
3. **Sanitization Engine:** Client-side sanitization libraries such as DOMPurify or custom validator rules for stripping unsafe tags (`<script>`, `<iframe>`, `onload=`).
4. **Target DOM Sinks:** Specific properties or methods where strings are injected (`element.innerHTML`, `document.write()`, `script.src`, `Worker()`).

---

## Outputs

1. **Registered Trusted Types Policies:** JavaScript policies created via `window.trustedTypes.createPolicy()` that return typed `TrustedHTML`, `TrustedScriptURL`, or `TrustedScript` instances.
2. **Type-Safe DOM Injection Code:** Frontend code explicitly passing `TrustedHTML` or `TrustedScriptURL` objects to DOM sinks, preventing browser `TypeError` exceptions.
3. **Default Fallback Policy:** A global policy named `'default'` that safely intercepts legacy or third-party string assignments to sinks, sanitizing or logging them automatically.
4. **CSP Violation Telemetry:** Reports sent to the server when untrusted strings attempt to enter DOM sinks without policy transformation.

---

## Workflow

### 1. Configure the Content Security Policy Header

Deploy the `require-trusted-types-for` HTTP response header to instruct the browser to reject raw string assignments to DOM script sinks. Specify allowed policy names via the `trusted-types` directive.

```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types app-sanitizer default;
```

*Note: For testing without breaking production, use `Content-Security-Policy-Report-Only`.*

### 2. Feature-Detect and Initialize Polyfill (If Required)

Ensure cross-browser compatibility for browsers lacking native support (e.g., Safari or Firefox without default flags) by loading the lightweight Trusted Types polyfill before any application code executes.

```javascript
import { trustedTypes } from 'trusted-types'; // Or native window.trustedTypes

const ttFactory = window.trustedTypes || trustedTypes;
```

### 3. Create Application Trusted Types Policies

Define specific, named policies using `createPolicy()`. Implement sanitization logic using DOMPurify for HTML, and strict domain/protocol validation for script URLs.

```javascript
import DOMPurify from 'dompurify';

// Policy 1: HTML Sanitization Policy using DOMPurify
const htmlPolicy = window.trustedTypes.createPolicy('app-sanitizer', {
  createHTML(untrustedInput, config = {}) {
    // Sanitize untrusted input using DOMPurify
    const cleanHTML = DOMPurify.sanitize(untrustedInput, {
      RETURN_TRUSTED_TYPE: false,
      ...config,
    });
    return cleanHTML; // Browser automatically wraps returned string in TrustedHTML
  },

  createScriptURL(untrustedURL) {
    // Strict URL validation for dynamic script imports
    const parsed = new URL(untrustedURL, window.location.href);
    const allowedOrigins = ['https://cdn.example.com', 'https://assets.example.com'];

    if (parsed.protocol === 'https:' && allowedOrigins.includes(parsed.origin)) {
      return parsed.href; // Browser wraps in TrustedScriptURL
    }
    throw new TypeError(`[TrustedTypes] Disallowed script URL origin: ${untrustedURL}`);
  },

  createScript(untrustedScript) {
    // Explicitly reject dynamic code evaluation unless strictly validated
    throw new Error('[TrustedTypes] Dynamic inline script generation is prohibited.');
  }
});
```

### 4. Update DOM Sink Assignments to Use Typed Objects

Replace direct raw string assignments to DOM sinks with policy-generated typed objects.

```javascript
// BEFORE (Vulnerable to DOM XSS under CSP Trusted Types enforcement):
// element.innerHTML = userInput; // Throws TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.

// AFTER (Secure and compliant):
const trustedHTML = htmlPolicy.createHTML(userInput);
element.innerHTML = trustedHTML; // Accepts TrustedHTML object without error
```

### 5. Establish a Secure Default Policy (Migration & Legacy Defense)

For third-party dependencies or legacy code bases where updating every `innerHTML` call is not immediately feasible, define a `'default'` policy. The browser automatically passes string assignments through `'default'` before injecting into sinks.

```javascript
if (window.trustedTypes && !window.trustedTypes.defaultPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML(string) {
      console.warn('[TrustedTypes] Raw string passed to sink. Intercepted by default policy.');
      return DOMPurify.sanitize(string);
    },
    createScriptURL(url) {
      console.warn('[TrustedTypes] Raw script URL passed to sink. Intercepted by default policy.');
      const parsed = new URL(url, window.location.href);
      if (parsed.origin === window.location.origin) {
        return parsed.href;
      }
      throw new TypeError(`[TrustedTypes Default Policy] Disallowed external script URL: ${url}`);
    },
    createScript(script) {
      throw new Error('[TrustedTypes Default Policy] Blocked dynamic script evaluation.');
    }
  });
}
```

---

## Decision Rules

### Policy Structure Selection Matrix

| Injection Sink Type | Primary Sink Example | Required Policy Method | Recommended Sanitization / Validation Strategy |
| :--- | :--- | :--- | :--- |
| **HTML Markup** | `element.innerHTML`<br>`element.outerHTML`<br>`insertAdjacentHTML()` | `createHTML(input)` | **DOMPurify.sanitize(input)** with strict tag whitelisting. |
| **Script Location** | `script.src`<br>`HTMLScriptElement.src`<br>`Worker()` | `createScriptURL(url)` | **Origin Whitelist + HTTPS Check** via `new URL()`. Reject arbitrary user queries. |
| **Executable Code** | `eval()`<br>`setTimeout(string)`<br>`new Function()` | `createScript(code)` | **Default to Throw Error**. Refactor code to pass functions instead of strings. |
| **Shadow DOM / Template** | `shadowRoot.innerHTML`<br>`template.innerHTML` | `createHTML(input)` | Pass through same `app-sanitizer` policy as standard DOM HTML. |

---

## Constraints

- **Policy Name Uniqueness:** `trustedTypes.createPolicy(name, rules)` throws a `TypeError` if a policy with the specified `name` already exists, unless `allowDuplicates: true` was set or policy names are unique.
- **CSP Directive Syntax:** The directive `require-trusted-types-for 'script'` must be present in the CSP header. The single quotes around `'script'` are mandatory.
- **Default Policy Risks:** Using a default policy that blindly returns `string` without sanitization (`createHTML: s => s`) completely bypasses DOM XSS protection. Default policies MUST perform robust sanitization.
- **Duplicate Policy Controls:** Setting `trusted-types 'none'` in CSP forbids creating any policies at runtime, while specifying policy names (`trusted-types app-sanitizer default`) restricts policy creation exclusively to those names.

---

## Non-Goals

- Protecting against Reflected or Stored XSS that originates on the server side prior to response transmission (use server HTML entity encoding).
- Replacing HTTP Strict-Transport-Security (HSTS) or standard CSP directives (`script-src`, `connect-src`).
- Validating or sanitizing non-sink DOM properties (e.g., `element.className`, `element.id`, `element.setAttribute('data-user', text)`).

---

## Common Failure Patterns

- **Unsanitized Default Policy:** Defining a default policy as `createHTML: (s) => s` to prevent runtime console errors. This satisfies the engine requirement without mitigating DOM XSS.
- **Missing `allow-discrete` or Script URL Validation in Policy:** Allowing user-controlled query parameters or arbitrary protocol handles (`javascript:`, `data:`) inside `createScriptURL()`.
- **Duplicate Policy Name Crashing:** Attempting to call `createPolicy('my-policy', ...)` in multiple bundled JS modules or route components without checking existing policy registry or exporting a single policy module instance.
- **Forgetting Third-Party iFrames or Web Workers:** Applying Trusted Types to the main document but omitting worker context scripts or child iframe CSP headers.
- **Incomplete Sink Coverage:** Securing `element.innerHTML` while neglecting `element.outerHTML`, `document.write()`, or `Range.createContextualFragment()`.

---

## Validation Steps

### 1. Browser Console & TypeError Audit
- [ ] Enable `require-trusted-types-for 'script'` in CSP response header.
- [ ] Trigger raw string assignment to `element.innerHTML = '<b>test</b>'`.
- [ ] Confirm browser throws: `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.`

### 2. Policy Sanitization & Sink Execution Check
- [ ] Pass an XSS payload (`<img src=x onerror=alert(1)>`) through `htmlPolicy.createHTML(payload)`.
- [ ] Assign the returned `TrustedHTML` object to `element.innerHTML`.
- [ ] Verify element renders safely without executing `onerror` JavaScript handlers.

### 3. Script URL Origin Restriction Check
- [ ] Attempt to load a script from an untrusted domain using `scriptPolicy.createScriptURL('https://attacker.com/malicious.js')`.
- [ ] Confirm `createScriptURL` throws a validation error and prevents the script tag from fetching/executing.

### 4. CSP Violation Reporting Test
- [ ] Trigger an untrusted assignment under `Content-Security-Policy-Report-Only`.
- [ ] Verify `SecurityPolicyVIolationEvent` fires and POST payload is transmitted to the configured `report-uri` / `report-to` endpoint.

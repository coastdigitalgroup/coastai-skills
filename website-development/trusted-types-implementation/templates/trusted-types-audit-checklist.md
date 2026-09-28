# Trusted Types Implementation Audit Checklist

Use this checklist when auditing web applications for Content Security Policy (CSP) Trusted Types compliance, DOM XSS injection sink protection, policy registration, and legacy browser fallback support.

---

## 1. CSP Header & Directive Configuration

- [ ] **`require-trusted-types-for` Directive Present:** The HTTP response header or meta tag contains `Content-Security-Policy: require-trusted-types-for 'script';`.
- [ ] **Policy Whitelist Specified:** The `trusted-types` directive explicitly lists allowed policy names (e.g., `trusted-types app-policy default;`).
- [ ] **No Wildcard Policies in Production:** The `trusted-types *` directive is **NOT** used in production environments.
- [ ] **Report-Only Verification Complete:** Initial deployment tested using `Content-Security-Policy-Report-Only` without unhandled DOM XSS sink exceptions logged to CSP reporting endpoints.

---

## 2. DOM XSS Injection Sink Audit

### HTML Sinks
- [ ] `Element.innerHTML`: Replaced direct string assignments with `TrustedHTML` objects or `textContent`.
- [ ] `Element.outerHTML`: Verified assignments use `TrustedHTML` objects.
- [ ] `document.write()` / `document.writeln()`: Audited and refactored away or wrapped with `TrustedHTML`.
- [ ] `DOMParser.parseFromString()`: Wrapped raw string arguments with policy `createHTML`.
- [ ] `Range.createContextualFragment()`: Converted string inputs to `TrustedHTML`.

### Script URL Sinks
- [ ] `HTMLScriptElement.src`: Verified assignments use `TrustedScriptURL` objects with strict origin checks.
- [ ] `SVGScriptElement.href`: Wrapped script URL assignments with `createScriptURL`.
- [ ] `Worker()` / `SharedWorker()` constructor: Verified worker URL instantiation passes `TrustedScriptURL`.
- [ ] `ServiceWorkerContainer.register()`: Verified ServiceWorker scope and URL pass `TrustedScriptURL`.
- [ ] `importScripts()`: Ensured Worker script imports pass validated `TrustedScriptURL`.

### Script Execution Sinks
- [ ] `eval()`: Replaced dynamic code evaluation with structured JSON parsing or static functions.
- [ ] `setTimeout(string)` / `setInterval(string)`: Converted string arguments to anonymous closure functions.
- [ ] `new Function(string)`: Audited and removed string-based function instantiation.

---

## 3. Policy & Sanitization Implementation

- [ ] **Vetted HTML Sanitizer Used:** The `createHTML` policy function utilizes a robust, industry-standard sanitizer (e.g., DOMPurify) rather than custom regular expressions.
- [ ] **Script URL Origin Enforcement:** The `createScriptURL` function parses URLs using `new URL()` and strictly matches hostnames/origins against an explicit whitelist.
- [ ] **Dynamic Script Execution Disabled:** The `createScript` function explicitly throws a `TypeError` unless dynamic script string generation is required and security-audited.
- [ ] **Fallback Feature Detection:** Code checks `window.trustedTypes && typeof window.trustedTypes.createPolicy === 'function'` before invoking policy registration APIs.
- [ ] **Default Policy Handled:** If third-party scripts cause unhandled string assignments, a default policy (`trustedTypes.createPolicy('default', ...)` is defined and logs warnings or sanitizes inputs.

---

## 4. Cross-Browser & Verification Testing

- [ ] **DevTools Rejection Test:** In DevTools console, executing `document.body.innerHTML = '<b>test</b>'` throws a `TypeError: Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.`.
- [ ] **Policy Assignment Verification:** Executing `document.body.innerHTML = policy.createHTML('<b>test</b>')` successfully updates the DOM without console errors.
- [ ] **Non-Chromium Browser Test:** App loaded in Safari or Firefox executes gracefully using fallback sanitization wrappers without breaking page rendering.
- [ ] **CI Automated Checking:** Static analysis or ESLint rules (e.g., `eslint-plugin-no-unsanitized` or `@microsoft/eslint-plugin-sdl`) are integrated into build pipelines to catch raw sink assignments.

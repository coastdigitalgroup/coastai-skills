# Trusted Types Implementation Audit Checklist

Use this operational checklist to audit, configure, deploy, and verify W3C Trusted Types sink hardening across your web application frontend.

---

## 1. Content Security Policy (CSP) Header Configuration

- [ ] **Specify `require-trusted-types-for` Directive:** Ensure HTTP Response Header includes `require-trusted-types-for 'script';` (note single quotes around `'script'`).
- [ ] **Define Allowed Policy Names (`trusted-types`):** Explicitly enumerate all valid policy names created by your application (e.g. `trusted-types dompurify-sanitizer script-loader default;`).
- [ ] **Block Unauthorized Policy Creation:** Avoid using `trusted-types *;` in production unless in early report-only phase. Use `trusted-types 'none'` if no dynamic policy creation is needed.
- [ ] **Configure Violation Reporting:** Verify `report-uri` or `report-to` directives are active to capture client-side sink assignment errors.
- [ ] **Report-Only Deployment Testing:** Deploy header as `Content-Security-Policy-Report-Only` first to identify legacy string sink assignments without breaking user experience.

---

## 2. DOM Sink Identification & Codebase Audit

Audit codebase for assignments to all W3C Trusted Types DOM sinks:

### HTML Injection Sinks
- [ ] `Element.innerHTML`
- [ ] `Element.outerHTML`
- [ ] `Element.insertAdjacentHTML()`
- [ ] `Range.createContextualFragment()`
- [ ] `HTMLIFrameElement.srcdoc`
- [ ] `document.write()` / `document.writeln()`

### Script Injection Sinks
- [ ] `HTMLScriptElement.src`
- [ ] `HTMLScriptElement.text` / `.innerText` / `.textContent`
- [ ] `SVGScriptElement.href`
- [ ] `Worker(url)` / `SharedWorker(url)`
- [ ] `ServiceWorkerContainer.register(url)`
- [ ] `eval(code)` / `setTimeout(string)` / `setInterval(string)` / `new Function(code)`

---

## 3. Policy Architecture & Sanitization Rules

- [ ] **Single Policy Registry:** Centralize policy creation in a single module to prevent `TypeError: Policy with name "x" already exists`.
- [ ] **Sanitizer Integration (DOMPurify):** Verify `createHTML(input)` passes all un-trusted markup through `DOMPurify.sanitize(input)` before returning.
- [ ] **Script URL Domain Whitelisting:** Ensure `createScriptURL(url)` validates origin using `new URL()` and explicitly checks allowed domains/protocols (`https:`).
- [ ] **Strict `createScript` Handling:** Ensure `createScript(code)` throws an error by default to block string-based code execution.
- [ ] **Default Policy Implementation:** Define a `'default'` policy to safely catch legacy third-party library sink calls, while logging console warnings to identify remediation targets.

---

## 4. Testing & Verification

- [ ] **Browser Console Verification:** Trigger a raw string assignment (e.g., `element.innerHTML = '<p>test</p>'`) in Chrome/Edge and confirm a `TypeError` is raised.
- [ ] **XSS Payload Testing:** Inject `<img src=x onerror=alert(1)>` through `policy.createHTML()`. Confirm element renders without executing script handler.
- [ ] **Script Tag Origin Restriction Test:** Attempt loading a script from an unauthorized third-party CDN using `script.src = policy.createScriptURL('https://untrusted.com/a.js')`. Confirm validation error is thrown.
- [ ] **Cross-Browser Fallback Verification:** Test in Firefox and Safari (where native Trusted Types may not be enabled by default) to ensure polyfill/shim fallback mode executes without throwing runtime errors.
- [ ] **Automated CI Integration:** Add static analysis tools (e.g. ESLint plugin `eslint-plugin-no-unsanitized` or `eslint-plugin-security`) to flag un-wrapped sink assignments during code review.

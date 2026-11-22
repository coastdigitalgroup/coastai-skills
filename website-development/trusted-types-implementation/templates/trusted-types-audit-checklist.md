# Trusted Types Implementation & Audit Checklist

Use this checklist when implementing W3C Trusted Types or auditing a frontend application for DOM-based Cross-Site Scripting (DOM XSS) injection vulnerabilities.

---

## 1. Content Security Policy (CSP) Response Header Audit

- [ ] **HTTP Response Header Configuration:**
  - [ ] Enforce `Content-Security-Policy: require-trusted-types-for 'script';` in production response headers.
  - [ ] Restrict policy creation using `trusted-types <policy-name-1> <policy-name-2> default;`.
  - [ ] Test header rollout using `Content-Security-Policy-Report-Only` with a `report-uri` or `report-to` telemetry collector.

- [ ] **Directive Verification:**
  - [ ] Ensure `allow-duplicates` is **NOT** present in `trusted-types` directive unless explicitly required for legacy module loading.
  - [ ] Confirm no wildcard `trusted-types *` is allowed in production policies.

---

## 2. DOM Sink Audit & Codebase Search Patterns

Run codebase searches (`grep` or AST static analysis) for assignments to dangerous DOM sinks:

### A. HTML Sinks (`TrustedHTML`)
- [ ] `element.innerHTML = ...`
- [ ] `element.outerHTML = ...`
- [ ] `element.insertAdjacentHTML('beforeend', ...)`
- [ ] `document.write(...)` / `document.writeln(...)`
- [ ] `shadowRoot.innerHTML = ...`
- [ ] DOMParser `.parseFromString(..., 'text/html')`

### B. Script Sinks (`TrustedScript`)
- [ ] `eval(...)`
- [ ] `setTimeout("string", ...)` / `setInterval("string", ...)`
- [ ] `new Function("string")`
- [ ] `scriptElement.text = ...` / `scriptElement.textContent = ...`

### C. Script URL Sinks (`TrustedScriptURL`)
- [ ] `scriptElement.src = ...`
- [ ] `worker = new Worker(...)`
- [ ] `serviceWorkerContainer.register(...)`
- [ ] `embedElement.src = ...` / `objectElement.data = ...`

---

## 3. Trusted Types Policy Design & Sanitization

- [ ] **Policy Registration:**
  - [ ] Policy names registered in JavaScript (`trustedTypes.createPolicy('my-policy', ...)`) match those declared in HTTP CSP headers.
  - [ ] All `createHTML` callbacks pass untrusted strings through a robust HTML sanitizer (e.g., `DOMPurify.sanitize`).
  - [ ] All `createScriptURL` callbacks validate candidate hostnames against a strict domain allowlist.

- [ ] **`default` Policy Fallback:**
  - [ ] A `default` policy is registered to catch legacy 3rd-party vendor script mutations.
  - [ ] The `default` policy logs violation telemetry rather than silently returning un-sanitized raw strings.

---

## 4. Cross-Browser Resilience & Polyfill Verification

- [ ] **Browser Support Coverage:**
  - [ ] Test application in Chromium browsers (Chrome/Edge) with native Trusted Types enabled.
  - [ ] Test application in Firefox & Safari with `trusted-types` polyfill wrapper loaded.
  - [ ] Confirm no uncaught `TypeError` exceptions occur on page load in non-supporting browsers.

---

## 5. Automated Verification & Testing

- [ ] **Automated E2E Tests:**
  - [ ] Playwright / Cypress security suite checks browser console for `[Report Only]` or unhandled Trusted Types violations.
  - [ ] Unit tests verify that `sanitizeHTML()` strips `<script>` tags and malicious `onerror`/`onload` attributes.

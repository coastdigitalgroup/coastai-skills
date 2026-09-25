# Trusted Types Heuristics and Browser Behavior Reference

## 1. W3C Trusted Types Sink Classification

When `Content-Security-Policy: require-trusted-types-for 'script';` is active, the browser DOM engine rejects raw string assignments to the following injection sinks and requires instances of `TrustedHTML`, `TrustedScriptURL`, or `TrustedScript`.

### Script Execution Sinks (Require `TrustedHTML` or `TrustedScriptURL` or `TrustedScript`)

| Sink Property / Method | Required Trusted Type | Vulnerability Risk |
| :--- | :--- | :--- |
| `Element.innerHTML` | `TrustedHTML` | DOM XSS via `<img onerror>`, `<script>`, SVG handlers |
| `Element.outerHTML` | `TrustedHTML` | DOM XSS via element replacement |
| `Element.insertAdjacentHTML()` | `TrustedHTML` | DOM XSS via sibling/child injection |
| `Range.createContextualFragment()` | `TrustedHTML` | DOM XSS via dynamic fragment parsing |
| `HTMLIFrameElement.srcdoc` | `TrustedHTML` | Frame isolation bypass / XSS inside frame |
| `document.write()` / `document.writeln()` | `TrustedHTML` | Document overwrite XSS |
| `HTMLScriptElement.src` | `TrustedScriptURL` | Remote script execution / JSONP injection |
| `HTMLScriptElement.text` / `.innerText` | `TrustedScript` | Inline script injection |
| `SVGScriptElement.href` | `TrustedScriptURL` | SVG-embedded script execution |
| `Worker(url)` / `SharedWorker(url)` | `TrustedScriptURL` | Web Worker code injection |
| `ServiceWorkerContainer.register(url)` | `TrustedScriptURL` | Malicious Service Worker registration |
| `eval(code)` / `new Function(code)` | `TrustedScript` | Direct arbitrary code execution |

---

## 2. Content Security Policy Header Syntax

### Enforcing Mode
```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types app-policy dompurify-policy default;
```

### Report-Only Mode (Gradual Migration)
```http
Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; trusted-types app-policy default; report-uri /api/csp-violations;
```

### Directives Explanation
- **`require-trusted-types-for 'script'`**: Tells the engine to require Trusted Types for all script-execution DOM sinks.
- **`trusted-types <policy-names>`**: Specifies which policy names JavaScript code is permitted to create via `trustedTypes.createPolicy()`.
- **`trusted-types 'none'`**: Forbids creating ANY Trusted Types policies at runtime (useful for completely static sites).
- **`trusted-types *`**: Allows creating policies with any name (disables policy name lock down; use only in early development).

---

## 3. Browser Processing Engine Sequence

When a string assignment occurs on an element property (e.g. `element.innerHTML = input`):

```text
[ JavaScript String Assignment ]
               │
               ▼
   Is Trusted Types Enforced? (require-trusted-types-for 'script')
        │                       │
       NO                      YES
        │                       │
        ▼                       ▼
 [ Standard Injection ]   Is input a TrustedHTML / TrustedScriptURL object?
        │                       │
        │              ┌────────┴────────┐
        │             YES                NO
        │              │                 │
        │              ▼                 ▼
        │     [ Execute Sink ]    Is 'default' policy registered?
        │                                │
        │                       ┌────────┴────────┐
        │                      YES                NO
        │                       │                 │
        │                       ▼                 ▼
        │               Pass string to     [ Throw TypeError ]
        │               default policy            │
        │                       │                 ▼
        │                       ▼        [ Fire Violation Event ]
        └──────────────> [ Execute Sink ]
```

---

## 4. Default Policy Design Pattern & Heuristics

The `'default'` policy acts as an automatic fallback when raw strings are passed directly to sinks without explicit policy wrapping (frequently occurring in legacy libraries like jQuery or third-party widgets).

### Secure Default Policy Implementation Rules
1. **Never return un-sanitized string:** Returning string `s => s` completely nullifies DOM XSS protection.
2. **Always integrate DOMPurify for HTML:** Ensure HTML strings pass through `DOMPurify.sanitize(s)`.
3. **Restrict Script URLs to Same-Origin / CDN Whitelist:** Validate script URLs using `new URL()` and reject unknown domains.
4. **Log Telemetry Warnings:** Log console warnings or dispatch analytics events when default policy is triggered so developers can locate and refactor legacy string assignments.

---

## 5. Browser Compatibility Matrix & Polyfill Strategy

| Browser Engine | Native Support Version | Notes |
| :--- | :--- | :--- |
| **Chromium (Chrome, Edge, Opera, Brave)** | Chrome 83+ | Full native support |
| **Firefox** | Firefox 130+ | Supported / Flag behind `dom.security.trusted_types.enabled` in older |
| **Safari (WebKit)** | Under Consideration | Requires JS Polyfill shim in production |

### Polyfill Strategy
To support browsers without native `window.trustedTypes`:
1. Include W3C Trusted Types polyfill (`npm install trusted-types`).
2. Export a unified manager module that checks `window.trustedTypes` and falls back gracefully.
3. In non-supporting browsers without polyfill, policy functions act as plain string sanitization wrappers (`DOMPurify.sanitize(input)`), preserving XSS security even if engine-level `TypeError` enforcement is absent.

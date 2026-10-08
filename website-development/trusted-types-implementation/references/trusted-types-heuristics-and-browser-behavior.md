# Trusted Types Heuristics & Browser Behavior Reference

This reference guide provides technical specifications, browser engine behaviors, CSP directive syntax, and security heuristics for implementing W3C Trusted Types.

---

## 1. DOM Sink Classification Matrix

The browser engine enforces Trusted Types by overriding string setter descriptors on DOM prototypes. When `require-trusted-types-for 'script'` is active, assigning a primitive string to any of the following sinks throws a `TypeError`.

| Sink Property / Method | Required Type | Typical Attack Vector | Remediation Strategy |
| :--- | :--- | :--- | :--- |
| `Element.innerHTML` | `TrustedHTML` | Malicious `<img src=x onerror=...>` or `<script>` tags in user comment/bio | Wrap in policy using `DOMPurify.sanitize()` |
| `Element.outerHTML` | `TrustedHTML` | Replacing DOM node with malicious markup | Wrap in policy using `DOMPurify.sanitize()` |
| `Element.insertAdjacentHTML()` | `TrustedHTML` | Injecting un-sanitized DOM nodes relative to element | Wrap in policy using `DOMPurify.sanitize()` |
| `Document.write()` / `writeln()` | `TrustedHTML` | Legacy synchronous document stream injection | Refactor away from `document.write`; or wrap in policy |
| `Range.createContextualFragment()` | `TrustedHTML` | Parsing string into executable DOM fragment | Wrap input in policy `createHTML` |
| `HTMLScriptElement.src` | `TrustedScriptURL` | Dynamic script execution from unauthorized third-party CDN | Validate URL origin against strict hostname allowlist |
| `Worker()` / `SharedWorker()` | `TrustedScriptURL` | Loading unapproved Web Worker background scripts | Validate worker script URL against allowlist |
| `ServiceWorkerContainer.register()`| `TrustedScriptURL` | Registering malicious Service Worker interceptor | Restrict to relative domain script paths |
| `HTMLScriptElement.text` / `textContent`| `TrustedScript` | Direct execution of inline script strings | Avoid inline dynamic JS execution; use JSON config |
| `eval()` / `new Function()` | `TrustedScript` | Arbitrary string execution as JavaScript code | Eliminate `eval`; parse structured JSON instead |

---

## 2. Content Security Policy (CSP) Directives

To enable and enforce Trusted Types, server response headers or `<meta>` tags must include the following CSP directives:

### Enforcing Header Directive
```http
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types app-policy script-loader default;
```

### Directives Breakdown
1. **`require-trusted-types-for 'script'`**
   - Enables browser engine type checks for all DOM script sinks.
   - Any string assignment to a sink without a `TrustedHTML`, `TrustedScript`, or `TrustedScriptURL` object triggers a DOMException / TypeError.

2. **`trusted-types <policy-name-1> <policy-name-2> ...`**
   - White-lists allowable policy names that JavaScript can create via `trustedTypes.createPolicy(name, ...)`.
   - Attempting to call `trustedTypes.createPolicy('unauthorized-name')` will throw a runtime `TypeError`.

3. **`trusted-types 'allow-duplicates'` (Optional - Use with Caution)**
   - Allows multiple calls to `trustedTypes.createPolicy()` with the same policy name.
   - Useful in complex micro-frontend architectures, but reduces strictness.

---

## 3. Browser Support & Polyfill Behavior

| Browser | Native Support Version | Notes |
| :--- | :--- | :--- |
| **Google Chrome / Chromium** | Chrome 83+ (May 2020) | Full native enforcement for HTML, Script, and ScriptURL sinks. |
| **Microsoft Edge** | Edge 83+ | Full native support matching Chromium engine. |
| **Opera** | Opera 69+ | Native support. |
| **Mozilla Firefox** | Under Development (Nightly flag) | Requires `trusted-types` npm polyfill. Polyfill mimics API surface for cross-browser safety. |
| **Apple Safari (WebKit)** | Under Development | Requires `trusted-types` npm polyfill. |

### Loading Polyfill Strategy
To maintain identical code paths across browsers, import the official W3C polyfill when `window.trustedTypes` is missing:

```html
<script src="https://cdn.jsdelivr.net/npm/trusted-types@2.0.7/dist/es6/index.umd.min.js"></script>
```

---

## 4. Performance & Security Heuristics

1. **Avoid Repeated Policy Creation in Loops:**
   - Policy creation (`trustedTypes.createPolicy`) involves internal browser registration overhead. Create policies once during application initialization and reuse the policy reference.

2. **Do Not Rely on `default` Policy as Primary Protection:**
   - The `default` policy is designed as an emergency fallback or legacy migration bridge. Primary application code should explicitly invoke named policies (`appHTMLPolicy.createHTML(...)`).

3. **Validate URLs, Don't Just Strip Parameters:**
   - When constructing `createScriptURL`, parse strings using `new URL(input, window.location.href)` and evaluate `parsed.hostname` against an exact match or domain suffix check (`endsWith('.cdn.example.com')`). Never rely on loose string `includes()`.

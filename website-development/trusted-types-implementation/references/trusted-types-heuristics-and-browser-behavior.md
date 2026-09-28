# Trusted Types Heuristics and Browser Behavior Reference

## Overview

The W3C Trusted Types API changes how browser rendering engines handle DOM injection sinks. By enforcing structural type checking at runtime, browsers block DOM XSS vulnerabilities before malicious payload strings reach executable script contexts.

---

## Content Security Policy (CSP) Directives

Trusted Types enforcement is governed by two dedicated Content Security Policy directives.

### 1. `require-trusted-types-for`
Specifies which execution contexts require Trusted Types objects instead of raw strings. Currently, the specification defines `'script'` as the target context.

```http
Content-Security-Policy: require-trusted-types-for 'script';
```

When this directive is active:
- Standard string assignments to DOM sinks throw a native JavaScript `TypeError`.
- Sink APIs accept only instances of `TrustedHTML`, `TrustedScript`, or `TrustedScriptURL`.

### 2. `trusted-types`
Restricts which policy names can be registered in the document via `window.trustedTypes.createPolicy()`.

```http
Content-Security-Policy: trusted-types app-policy cdn-policy default;
```

Special keyword directives:
- `'none'`: Prohibits creating any policies in JS (useful if policies are registered before application code runs).
- `'allow-duplicates'`: Allows multiple `createPolicy()` calls with the same name (not recommended for production).
- `'star'` (`*`): Allows any policy name to be created (use only during development/debugging).

---

## Comprehensive DOM Injection Sink Matrix

The browser engine enforces Trusted Types across three categories of injection sinks:

| Category | Targeted Sink API | Required Type | Risk Factor |
| :--- | :--- | :--- | :--- |
| **HTML Sinks** | `Element.innerHTML` | `TrustedHTML` | High (DOM XSS) |
| | `Element.outerHTML` | `TrustedHTML` | High (DOM XSS) |
| | `document.write()` / `document.writeln()` | `TrustedHTML` | Critical (Full Page Overwrite) |
| | `DOMParser.parseFromString(str, 'text/html')` | `TrustedHTML` | Medium (Parsed XSS) |
| | `Range.createContextualFragment(str)` | `TrustedHTML` | High (Fragment Injection) |
| | `HTMLTemplateElement.innerHTML` | `TrustedHTML` | Medium (Template Poisoning) |
| **ScriptURL Sinks** | `HTMLScriptElement.src` | `TrustedScriptURL` | Critical (Remote Script Exec) |
| | `SVGScriptElement.href` / `xlink:href` | `TrustedScriptURL` | Critical (Remote SVG Script) |
| | `Worker(url)` / `SharedWorker(url)` | `TrustedScriptURL` | High (Worker Hijacking) |
| | `ServiceWorkerContainer.register(url)` | `TrustedScriptURL` | Critical (Persistent ServiceWorker) |
| | `importScripts(url)` (inside Workers) | `TrustedScriptURL` | High (Worker Script Exec) |
| | `HTMLIFrameElement.src` (when rendering JS) | `TrustedScriptURL` | Medium (Frame Injection) |
| **Script Sinks** | `eval(str)` | `TrustedScript` | Critical (Arbitrary Code Exec) |
| | `setTimeout(str)` / `setInterval(str)` | `TrustedScript` | High (String Execution) |
| | `new Function(str)` | `TrustedScript` | Critical (Code Construction) |

---

## Browser Behavior & Compatibility Matrix

| Browser Engine | Native `window.trustedTypes` Support | Version Supported | Polyfill Required? |
| :--- | :--- | :--- | :--- |
| **Chromium** (Chrome, Edge, Opera, Brave) | **Full Native Support** | Chrome 83+ / Edge 83+ | No |
| **WebKit** (Safari, iOS Safari) | In Development / Intent to Ship | Not Native | **Yes** (`w3c-trusted-types`) |
| **Gecko** (Firefox, Firefox Android) | Under Standards Position Review | Not Native | **Yes** (`w3c-trusted-types`) |

### Polyfilling Strategy for Non-Chromium Browsers
For browsers without native `window.trustedTypes` support, loading the official W3C Trusted Types polyfill creates `window.trustedTypes` and patches DOM prototypes (`Element.prototype.innerHTML`, `HTMLScriptElement.prototype.src`, etc.) to enforce policy checks and return wrapped typed objects client-side.

```html
<script src="https://cdn.jsdelivr.net/npm/w3c-trusted-types@2.0.7/dist/es5/trustedtypes.build.js"></script>
```

---

## Performance & Optimization Heuristics

1. **Policy Reuse:** Create and cache policy instances globally upon module initialization rather than creating new policies inside render loops.
2. **Sanitization Cost:** `createHTML` delegates string parsing to DOMPurify or custom sanitizers. For high-frequency DOM renders (e.g., Virtual Lists or real-time autocomplete results), sanitize inputs prior to loop iterations or memoize output `TrustedHTML` objects.
3. **Type Inspection:** To test if an object is already a valid Trusted Type, use `window.trustedTypes.isHTML(obj)`, `window.trustedTypes.isScript(obj)`, or `window.trustedTypes.isScriptURL(obj)`.

```javascript
if (window.trustedTypes.isHTML(input)) {
  element.innerHTML = input; // Already typed, assign directly
} else {
  element.innerHTML = policy.createHTML(input); // Convert raw string
}
```

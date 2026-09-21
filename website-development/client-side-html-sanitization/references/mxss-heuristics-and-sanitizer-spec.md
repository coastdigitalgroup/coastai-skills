# Mutation XSS (mXSS) Heuristics and Sanitizer Spec Reference

## Overview & Core Mechanics

Mutation XSS (mXSS) is a class of client-side vulnerabilities where seemingly safe, non-executable HTML markup is transformed into executable JavaScript during browser DOM parsing and innerHTML re-serialization.

Unlike traditional XSS (where an unescaped `<script>` tag is rendered directly), mXSS relies on differences between:
1. **The String Parser State:** How the browser parses an HTML string into a Document Fragment.
2. **The Serialization State:** How `element.innerHTML` serializes the DOM tree back into an HTML string.
3. **The Re-parsing State:** How the browser re-parses that serialized string when assigned back to `innerHTML`.

---

## The Danger of `element.innerHTML = DOMPurify.sanitize(str)`

A widespread anti-pattern in web development is sanitizing an HTML string and then assigning the result back via string re-parsing:

```javascript
// DANGEROUS ANTI-PATTERN (Exposes application to mXSS)
const cleanHTMLString = DOMPurify.sanitize(untrustedInput); // Returns clean string
container.innerHTML = cleanHTMLString; // Browser re-parses string, mutating DOM state!
```

### Why This Fails:

When `innerHTML` receives a string, the browser's HTML parser runs again. If the initial string contained complex or nested elements (`<math>`, `<svg>`, `<noscript>`, `<template>`, or custom elements), the HTML parser's state machine may re-interpret attribute values or text nodes as HTML tags during the second pass.

### Safe Alternative: DOM Node / Fragment Insertion

```javascript
// SAFE PATTERN: Direct DOM Fragment Insertion (No string re-parsing)
const cleanFragment = DOMPurify.sanitize(untrustedInput, { RETURN_DOM_FRAGMENT: true });
container.replaceChildren(cleanFragment); // Appends live DOM nodes directly!
```

---

## Known mXSS Attack Vectors & Parsing Edge Cases

### 1. MathML & SVG Namespace Switching

HTML5 allows embedding MathML (`<math>`) and SVG (`<svg>`) inside HTML documents. These namespaces follow distinct parsing rules. Attackers exploit namespace transitions to trick sanitizers:

```html
<!-- Input String -->
<math><template><a id="</div><script>alert(1)</script>"></a></template></math>
```

- **Pass 1 (Sanitizer String Parse):** The sanitizer sees `id` attribute inside `<template>` inside MathML. It considers the string safe because `<script>` is inside an attribute string value.
- **Pass 2 (`innerHTML` Re-serialization):** The browser serializes the DOM. It closes the `<template>` prematurely and emits raw `</div><script>alert(1)</script>`.
- **Pass 3 (Re-parsing):** The browser parses the emitted string as standard HTML. The `<script>` tag escapes the attribute context and executes!

---

### 2. Nesting Restrictions & Auto-Closing Tags

HTML rules dictate that certain tags automatically close preceding tags (e.g., `<p>` tags cannot contain `<div>` or `<table>` tags).

```html
<!-- Input -->
<p><div><script>alert(1)</script></div></p>
```

When parsed into DOM, the browser auto-corrects the tree to:
```html
<p></p>
<div><script>alert(1)</script></div>
<p></p>
```
If a custom sanitizer validates tags assuming strict `<p>` hierarchy, the browser's auto-correction moves the `<div>` and `<script>` outside the `<p>`, bypassing container-level scoping rules.

---

### 3. Backtick and Unquoted Attribute Context Shift

In legacy layout engines or quirks mode, backticks (`` ` ``) or unquoted attribute values inside `data-*` attributes can shift context from attribute value to tag name:

```html
<img src=`x`onerror=alert(1)>
```

---

## Native W3C Sanitizer API Heuristics

The W3C Sanitizer API (`Element.prototype.setHTML()` / `Sanitizer`) eliminates mXSS by design because it operates directly on DOM nodes within the browser's C++ rendering pipeline, bypassing JavaScript string serialization entirely.

### Key API Signatures:

```javascript
// 1. Element.prototype.setHTML()
element.setHTML(untrustedString, { sanitizer: customSanitizer });

// 2. Sanitizer Constructor Configuration
const sanitizer = new Sanitizer({
  allowElements: ['p', 'b', 'i', 'a'],
  blockElements: ['script', 'style'],
  dropElements: ['iframe'],
  allowAttributes: { 'href': ['a'], 'class': ['*'] },
  dropAttributes: { 'onerror': ['*'], 'onload': ['*'] }
});
```

### Operational Differences:

| Feature | Legacy `innerHTML` | Native `setHTML()` | DOMPurify Fragment |
| :--- | :--- | :--- | :--- |
| **Parsing Mechanism** | JS String -> HTML Parser | Native C++ DOM Pipeline | JS DOMParser -> Fragment |
| **mXSS Risk** | High | Zero | Low (When returning Fragment) |
| **Performance** | Triggers full layout reflow | Optimized C++ pass | Fast JS DOM construction |
| **Script Execution** | Executes inline handlers | Guaranteed script-free | Guaranteed script-free |

---

## Baseline Element & Attribute Allowlist Rules

To maintain high security without breaking standard rich-text formatting, enforce the following baseline allowlist rules across all web applications:

### Allowed Tags (Safe Formatting):
`p`, `br`, `b`, `i`, `strong`, `em`, `u`, `s`, `sub`, `sup`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ul`, `ol`, `li`, `blockquote`, `pre`, `code`, `a`, `img`, `table`, `thead`, `tbody`, `tr`, `th`, `td`, `span`, `div`

### Forbidden Tags (Always Strip):
`script`, `style`, `iframe`, `object`, `embed`, `form`, `input`, `button`, `select`, `textarea`, `base`, `meta`, `link`, `head`, `applet`, `frame`, `frameset`

### Forbidden Attributes (Always Strip):
- All event handlers: `onload`, `onerror`, `onclick`, `onmouseover`, `onfocus`, `onblur`, `onkeydown`, `onsubmit`, `onchange`.
- Direct frame attributes: `srcdoc`.
- Form actions: `formaction`, `action`.

### Allowed URI Schemes:
- `http:`
- `https:`
- `mailto:`
- `tel:`

*Reject all `javascript:`, `vbscript:`, and `data:` URIs (except `data:image/png;base64,...` if inline images are explicitly required by business rules).*

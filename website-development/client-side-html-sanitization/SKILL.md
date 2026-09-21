---
name: client-side-html-sanitization
description: Safe rendering of untrusted rich-text user HTML using native Sanitizer API and DOMPurify progressive enhancement to eliminate XSS, mXSS, and unsafe innerHTML injection.
---

# Client-Side HTML Sanitization

## Purpose

Client-side HTML sanitization solves the fundamental security problem of safely injecting untrusted markup (user comments, CMS rich text, third-party product reviews, or Markdown outputs) into the Document Object Model (DOM) without exposing application users to Cross-Site Scripting (XSS), Mutation XSS (mXSS), session hijacking, or DOM cloaking vulnerabilities.

Directly assigning untrusted strings to element properties such as `innerHTML`, `outerHTML`, or `insertAdjacentHTML()` is one of the leading sources of web vulnerabilities. Naive regex replacement or string manipulation fails to prevent obfuscated payload execution, context-switching exploits, broken nesting re-parsing (mXSS), or dangerous URI schemes (`javascript:`, `data:`).

This skill provides a standardized client-side architecture using the native W3C Sanitizer API (`setHTML()` / `Element.prototype.setHTML()`) progressively enhanced with DOMPurify to strip executable scripts, dangerous attributes, and invalid element trees before node insertion—delivering zero-trust HTML rendering at native browser speeds.

---

## Use Cases

- **User-Generated Content (UGC) Rendering:** Displaying blog comments, forum posts, chat messages, or support tickets containing formatted rich text (`<b>`, `<i>`, `<a>`, `<ul>`, `<blockquote>`).
- **Headless CMS & Markdown Rendering:** Parsing and displaying HTML generated from client-side Markdown parsers (e.g., Marked, Remark) or remote CMS APIs.
- **WYSIWYG Editor Live Previews:** Safely rendering real-time previews from rich-text editors (Quill, Tiptap, ProseMirror, TinyMCE) without running embedded script payloads during keystrokes.
- **Third-Party Product Reviews & Ratings:** Inserting customer reviews, Q&A sections, or user feedback imported from external APIs into ecommerce pages.
- **Dynamic Email / Template Previews:** Displaying formatted customer emails or marketing webhooks inside web dashboards.

---

## When NOT to Use

- **Plain Text Content:** When content requires no HTML tags or inline formatting, use text-only properties (`element.textContent = data` or `element.innerText = data`). `textContent` is immune to XSS and bypasses all parsing overhead.
- **Fully Trusted First-Party Static Markup:** Static templates bundled directly within authenticated build artifacts where no user inputs, URL search parameters, or third-party data participate in construction.
- **Non-HTML Formats (SVG/Canvas/PDF):** Sanitizing raw SVG documents, Canvas pixels, or PDF binaries requires specialized format-specific security parsers. SVG embedded within HTML requires strict attribute allowlisting (`xmlns`, `viewBox`, `fill`, `path`) and removal of `<script>`, `<foreignObject>`, and event handlers.
- **Server-Only Security Boundaries:** Client-side sanitization must NOT replace server-side input validation and storage sanitization. Always sanitize data before storing it in backend databases to prevent API pollution across multiple client platforms (iOS, Android, emails).

---

## Inputs

1. **Untrusted HTML String:** The raw HTML string received from a user input, URL parameter, API payload, or Markdown parser.
2. **Target DOM Element:** The destination container node (e.g., `<div id="comment-body">`) where sanitized elements will be rendered.
3. **Configuration / Allowlist Rules (Optional):** Custom lists of allowed or prohibited HTML elements, attributes, and URI schemes according to business requirements (e.g., allowing `<iframe>` for embedded videos or stripping `<img>` tags).
4. **Context Mode:** Operational mode distinguishing standard document rendering from inline rich text or sandbox preview contexts.

---

## Outputs

1. **Safe DOM Tree Insertion:** Secure, non-executable DOM nodes appended to the target element without invoking scripts or inline handlers.
2. **Sanitized HTML String:** An escaped/cleaned string produced via `Sanitizer` or `DOMPurify.sanitize()` suitable for secure client storage or state updates.
3. **Sanitization Audit Event / Telemetry:** Optional reporting metadata logging stripped malicious tags (`<script>`, `onload`, `javascript:`) for security monitoring.

---

## Workflow

### 1. Feature Detection & Fallback Strategy Setup

Check for native W3C Sanitizer API support (`Element.prototype.setHTML` or `Sanitizer`). If unavailable, fall back seamlessly to DOMPurify.

```javascript
function supportsNativeSanitizer() {
  return typeof Element !== 'undefined' && typeof Element.prototype.setHTML === 'function';
}
```

### 2. Define Strict Element & Attribute Allowlist

Establish baseline rules. By default, strip all execution vectors:
- **Forbidden Elements:** `<script>`, `<style>`, `<iframe`, `<object>`, `<embed>`, `<base>`, `<form>`, `<input>`, `<link>`, `<meta>`, `<applet>`.
- **Forbidden Attributes:** All `on*` event handlers (`onload`, `onerror`, `onclick`, `onmouseover`), `srcdoc`, `action`, `formaction`.
- **Restricted Protocols:** URIs in `href`, `src`, or `action` must match `http:`, `https:`, `mailto:`, or `tel:`. Reject `javascript:`, `vbscript:`, and `data:` (unless explicitly required for raster images).

### 3. Execute Sanitization & Node Insertion

Use `setHTML()` for native rendering or `DOMPurify.sanitize()` with DOM fragment parsing.

#### Option A: Native Sanitizer API (Modern Browser)
```javascript
function renderSanitizedNative(targetElement, untrustedString, customConfig = {}) {
  if (typeof targetElement.setHTML === 'function') {
    const sanitizer = new Sanitizer(customConfig);
    targetElement.setHTML(untrustedString, { sanitizer });
    return true;
  }
  return false;
}
```

#### Option B: Progressive DOMPurify Fallback
```javascript
function renderSanitizedFallback(targetElement, untrustedString, customConfig = {}) {
  const defaultConfig = {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'class', 'rel'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
    ADD_ATTR: ['target', 'rel'],
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'base'],
    FORBID_ATTR: ['style', 'onerror', 'onload'],
    RETURN_DOM_FRAGMENT: true
  };

  const finalConfig = { ...defaultConfig, ...customConfig };
  const cleanFragment = DOMPurify.sanitize(untrustedString, finalConfig);

  targetElement.replaceChildren(cleanFragment);
}
```

### 4. Enforce Contextual Post-Processing

- Force all external hyperlinks (`<a href="...">`) to include `rel="noopener noreferrer"` and `target="_blank"` to prevent reverse tabnabbing attacks.
- Neutralize untrusted images by adding `loading="lazy"` and `decoding="async"`.

### 5. Monitor and Log Security Boundary Violations

Catch sanitized anomalies or attempted XSS payloads using DOMPurify hooks or custom inspection wrappers to report potential attacks to application monitoring endpoints.

---

## Decision Rules

| Requirement / Scenario | Recommended Strategy | Primary Mechanism |
| :--- | :--- | :--- |
| **Plain text output (names, handles, titles)** | `textContent` / `innerText` | `node.textContent = rawInput` |
| **Rich text markup in modern browsers (Chrome 105+)** | Native `Element.prototype.setHTML()` | `element.setHTML(untrustedHTML)` |
| **Universal cross-browser support requirement** | DOMPurify + DOM Fragment Insertion | `element.replaceChildren(DOMPurify.sanitize(..., { RETURN_DOM_FRAGMENT: true }))` |
| **Markdown / CMS output with user links** | DOMPurify with strict URI regex + Link Hook | `ALLOWED_URI_REGEXP` + `rel="noopener noreferrer"` enforcing |
| **User-uploaded SVG logos or diagrams** | DOMPurify with `USE_PROFILES: { svg: true }` | Explicit SVG attribute allowlisting (`viewBox`, `path`) |

---

## Constraints

- **Mutation XSS (mXSS) Prevention:** Never perform string operations on sanitized HTML before injecting it into the DOM. Inserting string output via `innerHTML` allows the browser HTML parser to re-parse and mutate invalid markup into executable scripts. Always parse directly into DOM Fragments or use `setHTML()`.
- **Link Safety Requirements:** All user-controlled `<a>` tags targeting external URLs (`target="_blank"`) MUST carry `rel="noopener noreferrer"` to prevent the target page from accessing `window.opener`.
- **CSS `style` Attribute Risks:** Do NOT allow raw `style` attributes unless strictly filtered. CSS properties like `background-image: url("javascript:...")` or CSS expression rules can trigger script execution in older layout engines and leak data via background asset fetches.
- **Performance Threshold:** Sanitization must process rich text in < 5ms for standard paragraphs (< 100KB) to ensure high-frame-rate UI responsiveness.

---

## Non-Goals

- Replacing backend input validation, SQL injection prevention, or server-side XSS filters.
- Implementing client-side Content Security Policy (CSP) header generation (CSP headers must be served by HTTP response headers).
- Sanitizing binary file payloads (e.g., checking EXIF data or embedded malware in uploaded ZIPs/PDFs).

---

## Common Failure Patterns

- **The String Injection Anti-Pattern (`innerHTML = DOMPurify.sanitize(str)`):** Converting sanitized fragments back into strings and assigning them to `innerHTML`. This re-invokes the HTML parser and creates mXSS vulnerabilities. Always insert nodes using `replaceChildren(fragment)` or `setHTML()`.
- **The Loose `javascript:` Protocol Leak:** Allowing custom `href` attributes without strict protocol checking. Attackers use obfuscated `javaScript:alert(1)`, `java&#x09;script:`, or `data:text/html;base64,...` to bypass simple string match filters.
- **Unsanitized Template Literals:** Constructing HTML via template strings like `container.innerHTML = '<div>' + userComment + '</div>'` before attempting sanitization on the parent element.
- **Overly Permissive SVG Allowlists:** Enabling SVG tags without stripping `<foreignObject>` or `xlink:href`, allowing attackers to embed executable HTML inside vector graphics.
- **Missing `rel="noopener"` on User Links:** Allowing target `_blank` links without `rel="noopener noreferrer"`, enabling opened malicious sites to navigate the parent window (`window.opener.location`).

---

## Validation Steps

- [ ] **Script Payload Elimination:** Attempt injecting `<script>alert('xss')</script>` and `<img src="x" onerror="alert('xss')">`. Confirm no script executes and alert boxes never trigger.
- [ ] **mXSS Neutralization Test:** Supply broken nested markup (e.g., `<math><template><a id="</div><script>alert(1)</script>">`). Confirm the parser cleans the node structure safely without executing script tags.
- [ ] **Protocol Filtering Verification:** Attempt links with `href="javascript:alert(1)"` and `href="data:text/html;base64,..."`. Confirm protocols are stripped or replaced with `#`.
- [ ] **External Link Security Check:** Inspect sanitized `<a>` tags with `target="_blank"`. Confirm `rel="noopener noreferrer"` is automatically appended.
- [ ] **Fallback Verification:** Disable native `Sanitizer` in browser flags and verify that DOMPurify fallback executes cleanly without throwing runtime errors.

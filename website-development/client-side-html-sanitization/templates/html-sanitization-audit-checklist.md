# Client-Side HTML Sanitization Audit Checklist

Use this checklist during code reviews, security audits, and frontend architecture assessments to ensure client-side HTML sanitization prevents Cross-Site Scripting (XSS), Mutation XSS (mXSS), and DOM cloaking vulnerabilities.

---

## 1. Direct Assignment & Property Verification

- [ ] **No Unsanitized `innerHTML` Usage:** Ensure no untrusted variables, API payloads, or user inputs are directly assigned to `element.innerHTML`, `element.outerHTML`, or `element.insertAdjacentHTML()`.
- [ ] **Prefer `textContent` for Plain Text:** Confirm that plain text values (usernames, titles, timestamps) use `element.textContent` or `element.innerText` instead of HTML sanitization pipelines.
- [ ] **No String-to-`innerHTML` Roundtripping:** Verify that sanitized outputs are inserted as DOM DocumentFragments or via `Element.prototype.setHTML()`, NOT converted to strings and re-assigned to `innerHTML` (which causes mXSS parsing bugs).

---

## 2. Sanitizer API & DOMPurify Configuration

- [ ] **Feature Detection:** Verify the codebase detects native W3C `Element.prototype.setHTML()` before falling back to DOMPurify.
- [ ] **Forbidden Execution Tags:** Confirm the sanitizer config explicitly forbids/strips execution tags:
  - `<script>`
  - `<style>`
  - `<iframe>`
  - `<object>`
  - `<embed>`
  - `<form>`
  - `<base>`
  - `<meta>`
- [ ] **Forbidden Attribute Handlers:** Confirm all `on*` event handlers (`onload`, `onerror`, `onclick`, `onmouseover`, `onfocus`) and `srcdoc` attributes are stripped.
- [ ] **Protocol Filtering:** Ensure `href` and `src` attributes are validated against allowed URI schemes (`http:`, `https:`, `mailto:`, `tel:`). Ensure `javascript:`, `vbscript:`, and `data:` URIs are rejected.

---

## 3. Link Security & Reverse Tabnabbing

- [ ] **Automatic `rel="noopener noreferrer"`:** Verify that all sanitized `<a>` tags with `target="_blank"` automatically receive `rel="noopener noreferrer"` to prevent opened windows from referencing `window.opener`.
- [ ] **User-Controlled Links Handling:** Ensure external links are clearly identified and cannot masquerade as internal navigation or auth endpoints.

---

## 4. SVG & Complex Markup Handling

- [ ] **SVG Attribute Allowlisting:** If SVG rendering is enabled, confirm `<foreignObject>` tags are explicitly stripped and SVG attributes are limited to geometric paths (`d`, `viewBox`, `fill`, `stroke`).
- [ ] **CSS `style` Attribute Restriction:** Verify inline `style` attributes are disabled or strictly parsed to prevent `background-image: url("javascript:...")` or CSS expression execution.

---

## 5. Testing & Validation

- [ ] **XSS Payload Test:** Pass known XSS payloads (`<img src=x onerror=alert(1)>`, `<script>alert(1)</script>`) into the sanitizer and confirm zero code execution.
- [ ] **mXSS Mutation Test:** Pass nested broken markup (`<math><template><a id="</div><script>alert(1)</script>">`) and confirm the browser DOM parser does not mutate strings into executable script nodes.
- [ ] **Fallback Verification:** Disable native `setHTML` support in browser tests and confirm the DOMPurify fallback executes cleanly without throwing runtime errors.

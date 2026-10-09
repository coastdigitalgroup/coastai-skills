# Web Share API Audit Checklist

Use this checklist to verify that native device sharing (`navigator.share`, `navigator.canShare`) is implemented correctly, securely, and accessibly across all target platforms.

---

## 1. Security Context & Feature Detection

- [ ] **Secure Context Check:** Page is delivered over `https://` or running on `http://localhost`. (Web Share API is disabled on unencrypted `http://`).
- [ ] **Feature Detection:** Implementation checks `'share' in navigator` and tests `typeof navigator.canShare === 'function'`.
- [ ] **Payload Validation (`navigator.canShare`):** Implementation evaluates `navigator.canShare(shareData)` **before** calling `navigator.share(shareData)`.
- [ ] **Absolute URLs:** All shared `url` properties are absolute URLs (e.g. `https://example.com/page`, not `/page`).
- [ ] **`iframe` Permissions Policy:** If embedded in an `iframe`, the `<iframe>` element explicitly declares `allow="web-share"`.

---

## 2. User Gesture Activation & Performance

- [ ] **Transient Activation:** `navigator.share()` is called directly inside a synchronous user interaction event handler (`click`, `pointerup`, or `keydown`).
- [ ] **Zero Async Network Lag:** Network calls (e.g. shortening URLs or fetching file blobs) are executed *before* user click or pre-warmed, ensuring transient gesture activation does not expire before calling `navigator.share()`.

---

## 3. File Sharing Requirements (If Applicable)

- [ ] **`File` Array Input:** Files are passed as an array of valid `File` objects (`{ files: [fileObj] }`).
- [ ] **File Type Support Check:** Executed `navigator.canShare({ files: [file] })` to confirm host OS support for the specific MIME type (e.g., `image/png`, `application/pdf`).
- [ ] **Direct Download Fallback:** If `navigator.canShare({ files })` returns `false`, application falls back cleanly to trigger standard direct file download (`<a download>`).

---

## 4. Error & Promise Rejection Handling

- [ ] **`AbortError` Suppression:** Dismissing or canceling the native OS share sheet rejects with `AbortError`. The implementation catches this cleanly without logging errors, showing alerts, or triggering fallback UIs.
- [ ] **`NotAllowedError` Handling:** Catches permission/gesture expiration errors (`NotAllowedError`) and routes user gracefully to the fallback UI.
- [ ] **Unexpected Errors:** Non-abort errors are caught and trigger the accessible fallback share modal.

---

## 5. Accessible Fallback UI (WCAG AA)

- [ ] **Seamless Fallback Activation:** When `navigator.canShare()` returns `false`, clicking the share button seamlessly opens the fallback modal.
- [ ] **Copy to Clipboard Option:** Fallback UI includes a single-click "Copy Link" button using `navigator.clipboard.writeText`.
- [ ] **Screen Reader Announcement:** Link copy action status is announced to screen readers via an `aria-live="polite"` region.
- [ ] **Modal Accessibility:** Fallback dialog includes:
  - `role="dialog"` and `aria-modal="true"`.
  - Linked heading via `aria-labelledby`.
  - Keyboard focus trapping inside the modal.
  - `Escape` key handler to close modal.
  - Focus restoration to the triggering share button on close.

---
name: web-share-api-implementation
description: Implement, style, and debug native device sharing for text, URLs, and files using the W3C Web Share API (navigator.share, navigator.canShare) with transient user gesture activation, iframe permissions, and graceful accessible fallback UI.
---

# Web Share API Implementation

## Purpose

The Web Share API Implementation skill provides a standardized engineering methodology, client-side controller architecture, and audit framework for integrating native OS sharing capabilities (`navigator.share`, `navigator.canShare`) into web applications.

Integrating the native Web Share API provides users with direct access to their system's installed applications, contacts, and share targets (e.g., AirDrop, Messages, Mail, WhatsApp, Slack, Files) without requiring heavy custom share dialogs or third-party tracking scripts. However, improper implementation leads to silent failures due to missing secure contexts (HTTPS), unhandled promise rejections when users dismiss share sheets (`AbortError`), missing transient user gesture activation, lack of file MIME type verification, or cross-origin `iframe` permission blocks.

This skill equips frontend developers to reliably invoke native share capabilities across supported desktop and mobile platforms while delivering seamless, accessible fallback UIs (custom modal dialogs, clipboard copy fallbacks, custom social links) when native sharing is unavailable or restricted.

---

## Use Cases

- **Product & Article Content Sharing:** Allowing users to share blog posts, news articles, product pages, or referral codes directly to system apps via a single "Share" button.
- **Media & File Export Sharing:** Sharing generated or uploaded files (PDF invoices, exported images, ticket QR codes, audio clips) directly from browser memory or blobs to messaging/file storage apps without requiring a two-step download-and-upload workflow.
- **Progressive Web App (PWA) System Integration:** Providing native desktop/mobile OS integration for installed web applications to feel identical to platform-native software.
- **Privacy-Preserving Social Sharing:** Eliminating third-party social share SDKs and tracking pixels by relying on native system share targets, improving privacy, page performance, and Core Web Vitals.

---

## When NOT to Use

- **Automated / Background Sharing:** Attempting to trigger share sheets automatically on page load, timer intervals, or scroll events. The Web Share API **requires** a transient user activation (e.g., `pointerup`, `click`, `keydown`).
- **Web Receive Targets (Sharing into the app):** Registering your PWA as a target to receive shared data from other system apps. Use the **Web Share Target API** (`manifest.json` `share_target`) instead.
- **Unsupported File Types or Batch Uploads:** Sharing large videos, multi-gigabyte archives, or custom non-standard binary formats not supported by OS share handlers. Use traditional file downloads (`<a download>`) or cloud upload links instead.
- **Cross-Origin Unpermitted `iframe` Embeds:** Invoking sharing inside third-party `iframe` containers where the parent document has not explicitly declared `allow="web-share"`.

---

## Inputs

1. **Share Data Payload (`ShareData` object):**
   - `title` *(string, optional)*: Document or item title.
   - `text` *(string, optional)*: Plaintext description, summary, or body snippet.
   - `url` *(string, optional)*: Fully qualified URL to be shared (must be absolute, valid URI).
   - `files` *(Array<File>, optional)*: Array of `File` objects (images, PDFs, audio) to be shared.
2. **User Interaction Context:** Active pointer or keyboard event providing transient user activation.
3. **Container Context:** Main window frame or `iframe` element context with proper Permissions Policy header (`allow="web-share"`).
4. **Fallback Handlers:** Callback functions or DOM templates to trigger when `navigator.canShare()` returns `false` or when native API is unsupported.

---

## Outputs

1. **Production-Grade Native Share Controller (`ShareManager`):** JavaScript class or module handling capabilities detection, payload validation, transient gesture invocation, and error catching.
2. **Robust Fallback Modal / Drawer UI:** WCAG AA compliant custom dialog fallback presenting copy-to-clipboard, email, and social platform share options when native sharing is unavailable.
3. **Telemetry & Event Feedback:** Clean lifecycle events reporting share completion, user cancellations (`AbortError`), or capability restrictions without throwing uncaught promise rejections.

---

## Workflow

### 1. Capability & Payload Validation (`navigator.canShare`)

Before calling `navigator.share()`, always check capability and validate the exact payload using `navigator.canShare(data)`. Checking `if (navigator.share)` alone is insufficient because `navigator.share` may exist while specific payloads (e.g., sharing files) are unsupported on the current OS or browser version.

```javascript
function isShareSupported(data) {
  // Check basic API existence
  if (!('share' in navigator) || typeof navigator.canShare !== 'function') {
    return false;
  }

  // Validate specific data payload (URLs, text, files)
  try {
    return navigator.canShare(data);
  } catch (err) {
    console.warn('Share payload validation error:', err);
    return false;
  }
}
```

### 2. Ensure Transient User Activation & Secure Context

The Web Share API requires two non-negotiable browser security constraints:
1. **Secure Context:** Must be served over `https://` or `http://localhost`.
2. **Transient User Activation:** `navigator.share()` MUST be invoked directly within an active event listener for user interaction (click, tap, keyboard event). Synchronous delay (e.g., waiting for asynchronous network fetches) before calling `navigator.share()` can consume user activation and cause `NotAllowedError`.

```javascript
async function handleShareButtonClick(event) {
  event.preventDefault();

  const shareData = {
    title: 'Design System Guidelines',
    text: 'Check out the new Web Accessibility rules:',
    url: window.location.href
  };

  // If payload requires async file preparation, prepare data BEFORE user click,
  // or fetch file instantly using pre-warmed Blobs.
  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      showNotification('Successfully shared!');
    } catch (err) {
      if (err.name === 'AbortError') {
        // User closed or canceled the OS share sheet - expected behavior, do not treat as fatal error
        console.info('User canceled native share sheet.');
      } else {
        console.error('Web Share failed:', err);
        fallbackToCustomShareModal(shareData);
      }
    }
  } else {
    // Fallback UI for unsupported browsers or disallowed payloads
    fallbackToCustomShareModal(shareData);
  }
}
```

### 3. File Sharing & MIME Type Verification

To share files via `navigator.share()`, ensure:
- Files are supplied as an array of valid JavaScript `File` objects (e.g., from `<input type="file">` or created via `new File([blob], filename, { type })`).
- `navigator.canShare({ files: [file] })` returns `true`.
- The file MIME types are supported by the host OS (e.g., `image/png`, `image/jpeg`, `application/pdf`, `text/plain`).

```javascript
async function shareGeneratedPDF(pdfBlob, filename = 'document.pdf') {
  const file = new File([pdfBlob], filename, { type: 'application/pdf' });
  const shareData = {
    title: 'Exported Document',
    files: [file]
  };

  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        fallbackDownloadFile(pdfBlob, filename);
      }
    }
  } else {
    // Fallback to direct file download
    fallbackDownloadFile(pdfBlob, filename);
  }
}
```

### 4. Implement Accessible Fallback UI

When native sharing is unavailable (e.g., Linux desktop Firefox, non-HTTPS environments, or strict policy contexts), seamlessly fallback to an accessible custom modal drawer that offers:
- Copy-to-clipboard functionality (`navigator.clipboard.writeText`) with live feedback (`aria-live="polite"`).
- Fallback web links (e.g., Twitter/X, LinkedIn, Facebook, Email `mailto:`).
- WCAG AA compliant focus management, focus trap, escape key closing, and dialog semantics (`role="dialog"`, `aria-modal="true"`).

---

## Decision Rules

### Native vs. Fallback Execution Flow

```
                  ┌───────────────────────────────┐
                  │ User Clicks "Share" Button    │
                  └───────────────┬───────────────┘
                                  │
                       Is HTTPS / Secure Context?
                                 / \
                                /   \
                              No     Yes
                              /       \
                             v         v
                 ┌───────────────┐  Is navigator.share &
                 │ Show Fallback │  canShare(data) supported?
                 │  Modal / UI   │            / \
                 └───────────────┘           /   \
                                           No     Yes
                                           /       \
                                          v         v
                             ┌───────────────┐  Execute await
                             │ Show Fallback │  navigator.share(data)
                             │  Modal / UI   │          │
                             └───────────────┘          v
                                                   Did Promise
                                                    Resolve?
                                                      / \
                                                     /   \
                                                   No     Yes
                                                   /       \
                                                  v         v
                                        Is err.name ===  ┌─────────────────┐
                                          'AbortError'?  │ Share Completed │
                                              / \        └─────────────────┘
                                             /   \
                                           Yes    No
                                           /       \
                                          v         v
                               ┌───────────────┐  ┌───────────────┐
                               │ User Canceled │  │ Log Error &   │
                               │  (No action)  │  │ Trigger UI    │
                               └───────────────┘  │ Fallback      │
                                                  └───────────────┘
```

---

## Constraints

- **Secure Context Mandatory:** `navigator.share` is unavailable in unencrypted HTTP contexts (except `http://localhost`).
- **User Gesture Lifetime:** `navigator.share()` MUST be triggered synchronously or within the same microtask tick of user activation. If an async API call (e.g. `await fetch()`) takes longer than browser transient activation timeouts (~1-5 seconds), `navigator.share()` will fail with `NotAllowedError`.
- **`iframe` Permissions Policy:** Embedded frames must explicitly declare permission attribute: `<iframe src="..." allow="web-share"></iframe>`. Without this attribute, `navigator.share` in cross-origin iframes throws `NotAllowedError`.
- **OS Dependency for Files:** OS targets determine supported file types. Android/iOS allow sharing images and PDFs; desktop OS implementations may restrict binary file targets.
- **Handling `AbortError`:** Dismissing or closing the OS share sheet rejects the returned Promise with an `DOMException` named `'AbortError'`. This is standard user behavior and MUST NOT be treated as a network or system failure.

---

## Non-Goals

- Creating custom social media OAuth authorization or background posting integrations.
- Handling incoming share targets from other OS applications into your PWA (use Web Share Target API).
- Polyfilling native OS share dialog rendering in legacy browsers (must use accessible web fallback instead).

---

## Common Failure Patterns

1. **Ignoring `AbortError` Rejections:** Treating user cancellation as an unhandled promise rejection or error log, leading to annoying error popups ("Sharing failed!") when the user simply closed the sheet.
2. **Missing `navigator.canShare()` Payload Check:** Calling `navigator.share({ files })` checking only `if (navigator.share)`. On desktop browsers where `navigator.share` exists for URLs but not files, this throws `TypeError` or `NotAllowedError`.
3. **Async Network Fetch Delay before Share:** Fetching a file or short URL from a server inside the share button click handler before calling `navigator.share()`. The network delay expires transient user activation, causing `NotAllowedError: Must be handling a user gesture`.
4. **Omission of `allow="web-share"` on `iframe`:** Attempting to invoke native share inside an iframe widget without declaring `allow="web-share"` on the iframe DOM element.
5. **No Native Fallback Provided:** Providing a share button that does nothing or fails silently in browsers where `navigator.share` is unsupported (e.g. Firefox Desktop, Chrome Linux).

---

## Validation Steps

### 1. Capability & Secure Context Audit
- [ ] Test page on HTTPS origin or localhost.
- [ ] Confirm `navigator.canShare(data)` is evaluated before invoking `navigator.share()`.

### 2. Transient Gesture & Error Handling Test
- [ ] Trigger share action via user click / keypress.
- [ ] Open native OS share sheet and deliberately cancel/close it. Confirm `err.name === 'AbortError'` is caught cleanly with no console errors or failure UI.
- [ ] Attempt calling `navigator.share()` on a `setTimeout` delay without user gesture; verify `NotAllowedError` is safely handled by triggering fallback UI.

### 3. Cross-Origin `iframe` Test
- [ ] Embed share widget in an `iframe`.
- [ ] Confirm share works when `allow="web-share"` is present.
- [ ] Confirm clean fallback execution when `allow="web-share"` is omitted.

### 4. Fallback Modal Accessibility Check
- [ ] Test share button in unsupported browser (or via DevTools flag/emulation).
- [ ] Verify fallback modal opens, sets `role="dialog"`, traps keyboard focus, closes on `Escape` key, and announces copied link status to screen readers via `aria-live`.

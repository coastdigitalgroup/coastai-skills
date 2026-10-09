# Web Share API Heuristics and Browser Behavior Reference

## 1. Security & Context Requirements

### Secure Context Restriction
The Web Share API (`navigator.share`, `navigator.canShare`) is governed by the W3C Secure Contexts specification. It is **disabled** on unencrypted HTTP connections.
- **Allowed:** `https://` origins, `http://localhost`, `http://127.0.0.1`.
- **Forbidden:** Plain `http://` domain origins. In insecure contexts, `navigator.share` is `undefined`.

### Permissions Policy in `iframe` Embeds
By default, cross-origin `iframe` containers are restricted from invoking the Web Share API.
- To allow an embedded document to share content, the parent document MUST specify the `allow="web-share"` attribute on the `<iframe>` tag:
```html
<iframe src="https://widget.example.com/share" allow="web-share"></iframe>
```
- If `allow="web-share"` is omitted, calling `navigator.share()` inside the iframe throws a `DOMException` named `NotAllowedError`.

---

## 2. Transient User Activation (User Gestures)

The Web Share API requires **Transient User Activation** (a user gesture).
- Valid gestures include: `pointerup`, `click`, `touchend`, `keydown`.
- **Expiration Gotcha:** Browsers enforce a strict timeout (~1 to 5 seconds) on user gestures. If an asynchronous operation (such as `await fetch('/api/get-share-url')` or a slow database query) takes too long inside a click listener before `navigator.share()` is invoked, the transient user gesture expires, resulting in:
  `DOMException: Failed to execute 'share' on 'Navigator': Must be handling a user gesture to show a share sheet.`
- **Best Practice:** Pre-calculate or pre-fetch share URLs/blobs before the user clicks the share button, or construct `File` objects synchronously in memory when possible.

---

## 3. Platform & Browser Compatibility Matrix

| Browser / OS Environment | `navigator.share` (URLs/Text) | File Sharing (`files`) | Notes |
| :--- | :--- | :--- | :--- |
| **iOS Safari (12.2+)** | ✅ Full Support | ✅ Images, Audio, PDF, Text | Excellent native iOS share sheet integration |
| **Android Chrome (61+)** | ✅ Full Support | ✅ Images, Audio, Video, PDF | Triggers Android system intent chooser |
| **macOS Safari (12.1+)** | ✅ Full Support | ✅ Supported file types | Opens macOS native share menu / AirDrop |
| **Windows Chrome/Edge (89+)** | ✅ Full Support | ✅ Supported file types | Opens Windows Share flyout |
| **Linux Chrome/Firefox** | ❌ Unsupported / Partial | ❌ Unsupported | Native OS share sheet not available; triggers fallback |
| **Desktop Firefox (All OS)** | ❌ Disabled by default | ❌ Disabled | Requires custom web fallback |

---

## 4. File Sharing & MIME Type Rules

When sharing files via `navigator.share({ files: [file1, file2] })`:
1. All items in the `files` array must be valid `File` instances (`new File([blob], filename, { type })`).
2. `navigator.canShare({ files: [...] })` MUST be queried to verify that the specific OS supports those file types.
3. Common supported MIME types across mobile platforms:
   - Images: `image/png`, `image/jpeg`, `image/gif`, `image/webp`
   - Audio: `audio/mp3`, `audio/wav`, `audio/ogg`
   - Video: `video/mp4`, `video/webm`
   - Documents: `application/pdf`, `text/plain`, `text/csv`
4. Sharing custom binary extensions (e.g. `.exe`, `.dmg`, `.zip`) is generally blocked for security reasons and will cause `navigator.canShare()` to return `false`.

---

## 5. DOMException Taxonomy & Handling

| Error Name | Cause | Recommended Action |
| :--- | :--- | :--- |
| **`AbortError`** | User closed, dismissed, or canceled the OS share sheet. | **Ignore cleanly.** Do not log as error or show failure alerts. |
| **`NotAllowedError`** | Missing user gesture, expired gesture timeout, or blocked by `iframe` policy. | Fallback to custom web share modal. |
| **`TypeError`** | Invalid `shareData` object (e.g. invalid URL format, non-File object in `files`). | Validate inputs with `navigator.canShare()`. |
| **`DataError`** | OS share target failed to process the payload. | Show user notification and fallback. |

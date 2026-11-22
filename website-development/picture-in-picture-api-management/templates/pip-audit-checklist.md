# Picture-in-Picture API Management - Production Audit Checklist

Use this audit checklist to evaluate, debug, and verify Picture-in-Picture (PiP) implementations across desktop and mobile web browsers.

---

## 1. Feature Capability & Browser Context Audit

- [ ] **Secure Context Check:** Is the application executing over `https://` or `localhost`? (PiP APIs are disabled in non-secure HTTP contexts).
- [ ] **Feature Detection:** Is support gracefully detected before rendering or enabling PiP triggers?
  - `documentPictureInPicture` in `window` (Document Picture-in-Picture API)
  - `pictureInPictureEnabled` in `document` (HTMLVideoElement PiP API)
- [ ] **Permissions Policy Verification:** Are HTTP headers and iframe attributes set to allow PiP?
  - HTTP Header: `Permissions-Policy: picture-in-picture=*`
  - Iframe Attribute: `<iframe src="..." allow="picture-in-picture"></iframe>`
- [ ] **Fallback Mechanism:** Does the application degrade gracefully to standard HTMLVideoElement PiP or sticky in-page positioning if Document PiP is unavailable?

---

## 2. User Gesture & Interaction Audit

- [ ] **Explicit User Trigger:** Is `requestPictureInPicture()` or `requestWindow()` initiated directly inside a synchronous user event handler (`click` or `keydown`)?
- [ ] **No Unsolicited Auto-Launch:** Does the system refrain from requesting PiP on page load, DOM Content Loaded, or inside asynchronous callbacks without active user gestures?
- [ ] **Single Session Management:** Does initiating a new PiP window safely terminate or replace existing active PiP sessions without throwing unhandled exceptions?

---

## 3. Document PiP DOM Migration & Lifecycle Audit

- [ ] **Placeholder Anchor Preservation:** Is a placeholder element inserted at the original DOM location before migrating the target container node?
- [ ] **Stylesheet Cloning:** Are all parent document CSS rules, link tags, and custom CSS properties copied to the floating window's `<head>`?
- [ ] **Cross-Origin Stylesheet Handling:** Are external cross-origin stylesheets handled safely with `<link rel="stylesheet">` fallback in case `styleSheet.cssRules` throws a `SecurityError`?
- [ ] **DOM Restoration on Close:** Is a `pagehide` or `unload` listener attached to the floating window to guarantee the migrated DOM tree is cleanly returned to the parent document upon closing?
- [ ] **Memory & Listener Cleanup:** Are event listeners and timers detached when the PiP window is destroyed?

---

## 4. Media State & Controls Synchronization Audit

- [ ] **Bi-Directional State Sync:** Do play/pause, seek, volume, and mute states stay synchronized between the main document and floating window controls?
- [ ] **Media Session API Integration:** Are Media Session action handlers (`navigator.mediaSession.setActionHandler()`) registered for OS-level media controls?
- [ ] **Resize Resilience:** Do controls scale and reflow cleanly when the user resizes the floating Picture-in-Picture window?
- [ ] **Canvas / WebGL Streams:** If streaming canvas or dynamic overlays, is `canvas.captureStream()` active and attached to a hidden or backing `<video>` element?

---

## 5. Accessibility (WCAG AA) Audit

- [ ] **Accessible Button States:** Do PiP toggle buttons include explicit `aria-pressed="true|false"` attributes?
- [ ] **Accessible Descriptions:** Do buttons use `aria-describedby` pointing to status indicators or live regions?
- [ ] **Screen Reader Live Announcements:** Is an `aria-live="polite"` region updated with state announcements ("Entered Picture-in-Picture window", "Returned to page view")?
- [ ] **Keyboard Navigability:** Can users navigate to and activate PiP controls using keyboard (`Tab`, `Space`, `Enter`)?
- [ ] **Focus Management:** When exiting PiP mode, does focus return safely to the originating trigger button on the main page?

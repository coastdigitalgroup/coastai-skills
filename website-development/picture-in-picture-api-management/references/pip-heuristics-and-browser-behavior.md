# Picture-in-Picture APIs - Technical Reference & Browser Heuristics

This reference guide details technical specifications, browser implementation variations, permission constraints, and architectural heuristics for Picture-in-Picture (PiP) web APIs.

---

## 1. Comparison: Video PiP vs Document PiP

| Technical Parameter | HTMLVideoElement PiP API | Document Picture-in-Picture API |
| :--- | :--- | :--- |
| **W3C Standard** | Picture-in-Picture Specification | Document Picture-in-Picture API |
| **API Entry Point** | `videoElement.requestPictureInPicture()` | `window.documentPictureInPicture.requestWindow()` |
| **Content Type** | Single `<video>` stream frames only | Full interactive HTML Document (DOM tree) |
| **Interactive Controls** | Native OS play/pause/mute buttons only | Full custom HTML/CSS controls, buttons, forms, canvas |
| **Window DOM Scope** | Restricted OS media overlay frame | Separate top-level `Window` and `Document` context |
| **DOM Node Location** | Video element remains in main document | Target DOM element physically moves to floating window |
| **Styling Capabilities** | User-agent shadow DOM default controls | Custom CSS, CSS custom properties, web fonts, themes |
| **Browser Support** | Chrome, Edge, Safari, Firefox, iOS, Android | Chrome 116+, Edge 116+, Opera 102+ |

---

## 2. Browser Matrix & Capability Support

### Chromium Browsers (Chrome, Edge, Opera, Brave)
- **HTMLVideoElement PiP:** Fully supported (Chrome 70+).
- **Document PiP API:** Fully supported in secure contexts starting with Chrome 116.
- **Auto Picture-in-Picture:** Supports `autoPictureInPicture` hint attribute on `<video>` for automatic pop-out when switching tabs during active media playback.

### Apple Safari (macOS & iOS)
- **HTMLVideoElement PiP (macOS):** Fully supported via standard W3C API (`video.requestPictureInPicture()`).
- **HTMLVideoElement PiP (iOS Safari):** Supported natively via `webkitPresentationMode` or standard video PiP in full-screen/inline video player triggers.
- **Document PiP API:** Not currently supported in Safari (under webkit exploration).

### Mozilla Firefox
- **HTMLVideoElement PiP:** Supported via Firefox native Picture-in-Picture toggle overlays and standard JS API.
- **Document PiP API:** Under development / standards discussion.

---

## 3. User Gesture & Security Rules

### Transient User Gesture
Both Picture-in-Picture APIs require an active **transient user activation** (e.g., `click`, `pointerdown`, or `keydown` event).

```javascript
// ✅ VALID: Direct response to user gesture
button.addEventListener('click', async () => {
  await videoElement.requestPictureInPicture();
});

// ❌ INVALID: Will throw NotAllowedError (user gesture expired)
button.addEventListener('click', () => {
  setTimeout(async () => {
    await videoElement.requestPictureInPicture(); // FAILS
  }, 1000);
});

// ❌ INVALID: Asynchronous network call boundary breaks user gesture context
button.addEventListener('click', async () => {
  await fetch('/api/video-data');
  await videoElement.requestPictureInPicture(); // FAILS
});
```

### Single Window Restriction
Operating systems and browsers limit web applications to **one active Picture-in-Picture window at a time**.
- Requesting a new Picture-in-Picture window while one is active will automatically close the existing PiP window.

---

## 4. Document PiP DOM Relocation & Style Rules

### DOM Tree Migration Protocol
When opening a Document Picture-in-Picture window, elements are **physically moved** from the parent `document` to the floating window's `document`:

1. Store an insertion anchor (`<div>` placeholder) in the parent document.
2. Move the target wrapper element to `pipWindow.document.body.appendChild(targetElement)`.
3. Listen for `pagehide` on `pipWindow` to restore `targetElement` back to the parent placeholder position.

### Stylesheet Duplication
Because the floating window has its own `Document` instance, styles from the main page do **not** automatically apply unless explicitly copied into `pipWindow.document.head`:

```javascript
function copyStyles(targetDoc) {
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        const newStyle = targetDoc.createElement('style');
        Array.from(sheet.cssRules).forEach((rule) => {
          newStyle.appendChild(targetDoc.createTextNode(rule.cssText));
        });
        targetDoc.head.appendChild(newStyle);
      } else if (sheet.href) {
        const link = targetDoc.createElement('link');
        link.rel = 'stylesheet';
        link.href = sheet.href;
        targetDoc.head.appendChild(link);
      }
    } catch (err) {
      // Cross-Origin CORS protection fallback
      if (sheet.href) {
        const link = targetDoc.createElement('link');
        link.rel = 'stylesheet';
        link.href = sheet.href;
        targetDoc.head.appendChild(link);
      }
    }
  });
}
```

---

## 5. Canvas & WebGL Stream Technique

For non-video visual content (e.g., live telemetry charts, WebGL animations, active cameras), use `<canvas>.captureStream()` linked to a hidden `<video>` element for standard Video PiP compatibility:

```javascript
const canvas = document.getElementById('myCanvas');
const stream = canvas.captureStream(30); // 30 FPS stream

const hiddenVideo = document.createElement('video');
hiddenVideo.srcObject = stream;
hiddenVideo.muted = true;
hiddenVideo.playsInline = true;
await hiddenVideo.play();

// Trigger Video PiP on the canvas stream
await hiddenVideo.requestPictureInPicture();
```

---

## 6. Permissions Policy & Iframe Delegation

When embedding media players inside `<iframe>` containers across different origins, the parent page must explicitly grant Picture-in-Picture permissions:

```html
<iframe
  src="https://player.example.com/embed/123"
  allow="picture-in-picture; autoplay"
  width="640"
  height="360"
></iframe>
```

HTTP Headers on the embedding page:
```http
Permissions-Policy: picture-in-picture=(self "https://player.example.com")
```

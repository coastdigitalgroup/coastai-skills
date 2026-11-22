# Fullscreen API Heuristics and Browser Behavior Reference

This reference document details core W3C specification behaviors, browser rendering pipeline mechanics, top-layer stacking rules, iOS Safari WebKit quirks, permissions policies, and accessibility heuristics for the Fullscreen API.

---

## 1. W3C Fullscreen API Specifications & Top-Layer Architecture

When an element transitions into full-screen mode via `Element.requestFullscreen()`, the browser engine alters its layout pipeline in two fundamental ways:

1. **Promotion to Top-Layer:** The element is removed from normal document stacking contexts (ignoring standard `z-index` values on `body`) and placed in a browser-managed rendering layer called the **Top Layer**.
2. **Backdrop Generation (`::backdrop`):** A pseudo-element backdrop (`::backdrop`) is inserted immediately behind the promoted element in the top-layer stack, covering the rest of the document tree and operating system desktop.

### Top-Layer Stacking Hierarchy

```text
[ Browser Chrome & OS Window Frame ]
   │
   ├── Top-Layer Stack (Highest Z-Order)
   │     ├── <dialog open> (if active)
   │     ├── [Popover API] (if active)
   │     └── [Element:fullscreen]  <-- Promoted Element
   │           └── ::backdrop      <-- Backdrop pseudo-element (black overlay)
   │
   └── Document Stacking Contexts (Standard DOM)
         ├── <body>
         ├── <header> (z-index: 1000)
         └── <main>
```

### Critical Top-Layer Rules:
- **`z-index` Isolation:** Standard `z-index` CSS properties defined on DOM elements outside the full-screen container have no effect on the top layer. An element with `z-index: 999999` attached to `document.body` will NOT appear on top of a full-screen container.
- **Containing Floating Overlays:** All custom dropdown menus, modal popups, tooltips, video control toolbars, and notification toasts must be descendants of the promoted full-screen container or use top-layer native APIs (e.g. Popover API or `<dialog>`).

---

## 2. Transient Activation and User Gesture Rules

To prevent malicious websites from spoofing desktop environments or locking users into unwanted full-screen modes, modern browsers enforce strict **Transient User Activation** security policies.

### Activation Requirements:
- `requestFullscreen()` MUST be called in response to an active, transient user interaction event, such as `click`, `pointerup`, `touchend`, or `keydown`.
- Executing `requestFullscreen()` inside `onload`, `DOMContentLoaded`, scroll handlers, or asynchronous callbacks (e.g. `setTimeout()`, `setInterval()`, or unlinked `fetch().then()`) will throw an unhandled `NotAllowedError` or `TypeError`.

```javascript
// ❌ FAILS: User gesture lost across asynchronous macrotask boundary
button.addEventListener('click', () => {
  setTimeout(() => {
    container.requestFullscreen(); // Throws NotAllowedError!
  }, 500);
});

// ✅ SUCCEEDS: Direct synchronous execution within user gesture callback
button.addEventListener('click', async () => {
  try {
    await container.requestFullscreen();
  } catch (err) {
    console.error(err);
  }
});
```

---

## 3. iOS Safari (iPhone vs. iPad) Browser Quirks

Apple's WebKit engine handles full-screen requests differently across iOS device form factors:

| Environment | Standard `<div>` / `<canvas>` Fullscreen | Native `<video>` Presentation Mode | Notes / Strategy |
| :--- | :--- | :--- | :--- |
| **Desktop Safari (macOS)** | ✅ Full Support | ✅ Full Support | Standard W3C `requestFullscreen()` support. |
| **iPadOS Safari** | ✅ Full Support (Safari 16.4+) | ✅ Full Support | Standard W3C `requestFullscreen()` supported on iPads. |
| **iOS iPhone Safari** | ❌ Unsupported on `<div>` / `<canvas>` | ✅ `webkitSetPresentationMode('fullscreen')` | iPhone WebKit restricts full-screen exclusively to `<video>` elements via WebKit presentation modes or `webkitEnterFullscreen()`. |

### Handling iOS iPhone Video Presentation Fallback:

```javascript
function requestVideoFullscreen(videoEl, containerEl) {
  if (containerEl.requestFullscreen) {
    // Standard W3C path (Desktop, Android, iPad)
    containerEl.requestFullscreen();
  } else if (videoEl.webkitSupportsPresentationMode && typeof videoEl.webkitSetPresentationMode === 'function') {
    // iOS iPhone Safari Video Presentation path
    videoEl.webkitSetPresentationMode('fullscreen');
  } else if (typeof videoEl.webkitEnterFullscreen === 'function') {
    // Legacy WebKit iOS path
    videoEl.webkitEnterFullscreen();
  }
}
```

---

## 4. Permissions Policy and Cross-Origin Iframe Delegation

When embedding media players, games, or interactive graphics inside `<iframe>` elements, full-screen privileges are disabled by default unless explicitly granted by the parent document.

### Required Iframe Attributes:

```html
<!-- Standard Fullscreen Permission Delegation -->
<iframe
  src="https://example.com/interactive-player"
  allowfullscreen="true"
  allow="fullscreen *"
  width="800"
  height="450"
  title="Interactive Media Player Frame">
</iframe>
```

- **`allowfullscreen` Attribute:** Required for legacy browser support.
- **`allow="fullscreen *"` Directive:** Standard Permissions Policy header controlling iframe cross-origin access to the Fullscreen API.

---

## 5. CSS `:fullscreen` Styling Heuristics

When an element enters full-screen mode, browsers apply user-agent default styles (`:fullscreen { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100% !important; height: 100% !important; }`).

### Best Practices for Full-Screen Layouts:

1. **Explicit Viewport Dimensions:** Set `width: 100vw; height: 100vh;` on `:fullscreen` containers to prevent collapsing in legacy WebKit engines.
2. **Object Fit for Aspect Ratio Preservation:** Use `object-fit: contain;` on child `<video>` or `<canvas>` elements to maintain original aspect ratios without stretching or squishing graphics.
3. **Control Bar Positioning:** Position control bars using `position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);` inside the promoted container to keep them pinned nicely over the media backdrop.

```css
/* Container rules in fullscreen mode */
.media-wrapper:fullscreen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

/* Canvas/Video sizing inside container */
.media-wrapper:fullscreen canvas,
.media-wrapper:fullscreen video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
```

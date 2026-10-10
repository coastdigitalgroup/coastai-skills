---
name: fullscreen-api-management
description: Enter, exit, monitor, and handle cross-browser Fullscreen API interactions (Element.requestFullscreen, Document.exitFullscreen, document.fullscreenElement, fullscreenchange) with top-layer styling (:fullscreen), aspect ratio preservation, iOS Safari webkitPresentationMode fallbacks, iframe delegation, and WCAG AA accessibility.
---

# Fullscreen API Management

## Purpose

The Fullscreen API Management skill provides a standardized engineering methodology, lifecycle controller architecture, styling patterns (`:fullscreen` pseudo-class and top-layer backdrop handling), and auditing guidelines for managing web full-screen presentation using the W3C Fullscreen API (`Element.requestFullscreen()`, `Document.exitFullscreen()`, `document.fullscreenElement`, `fullscreenchange`, `fullscreenerror`).

Modern web experiences—such as custom HTML5 video and audio players, interactive web canvas games, image and gallery lightboxes, presentation deck viewers, complex data dashboards, and GIS map viewers—benefit significantly from immersing the user in a full-screen canvas free from browser chroming, address bars, and peripheral operating system distractions.

However, improperly implementing full-screen mode causes severe user experience, cross-browser, and accessibility issues:
- **Transient Activation Blockers:** Calling `requestFullscreen()` without an active user gesture (`click`, `keydown`, `pointerup`) throws an unhandled `TypeError` or `NotAllowedError`.
- **iOS Safari Limitations:** iOS iPhone Safari does not support the standard W3C Fullscreen API on arbitrary HTML elements (e.g. `<div>` or `<canvas>`), only supporting native video full-screen via non-standard `webkitEnterFullscreen()` or `webkitPresentationMode` APIs.
- **Top-Layer Stacking and Fixed Element Glitches:** Elements promoted to full-screen enter the browser's top-layer stacking context. Standard `z-index` hierarchies break, fixed overlays positioned relative to `body` disappear or break position, and drop-down menus or custom toolbars fail to render unless contained inside the full-screen container or rendered in top-layer popovers.
- **Aspect Ratio Distortion and Sizing Spikes:** Canvas surfaces or video displays stretch unnaturally or shift layout when entering full-screen mode without explicit CSS aspect-ratio or flex/grid flexbox container rules.
- **Inaccessible Keyboard Focus & Esc Traps:** Screen reader users and keyboard navigators can become trapped or lose focus indicators when entering or exiting full-screen mode without active focus management and `aria-label` / `aria-pressed` synchronization.

This skill equips frontend developers to reliably request, toggle, monitor, style, and gracefully fall back full-screen views across desktop and mobile devices while upholding WCAG AA accessibility and top-layer rendering rules.

---

## Use Cases

- **Custom HTML5 Video & Audio Players:** Expanding video player canvases to occupy the entire screen, promoting custom playback control docks, captions, and scrubbers into full-screen view.
- **Interactive Web Canvas Games & Simulation Engines:** Immersing users in 2D/3D WebGL scenes, HTML5 games, or interactive graphics displays while hiding OS borders and browser chrome.
- **Data Dashboards & Operations Wall-Monitors:** Expanding rich data visualizations, real-time metrics dashboards, or network topology graphs for full-screen display on monitors or wall displays.
- **Presentation Slideshows & Document Viewers:** Entering full-screen slide presentation mode with keyboard hotkey controls (e.g. `F`, `Escape`, Arrow keys) and presenter view notes.
- **Image Lightboxes & Interactive Map Viewers:** Enlarging high-resolution photographs, CAD drawings, or GIS map containers to full screen for detailed spatial exploration.

---

## When NOT to Use

- **CSS Visual Pseudo-Fullscreen Overlays:** If the goal is simply to make a modal dialog or lightbox cover the browser window viewport (`width: 100vw; height: 100vh; position: fixed; top: 0; left: 0`) without hiding the browser address bar or OS dock, do NOT use the Fullscreen API. Use standard CSS overlay techniques or the HTML `<dialog>` element / Popover API instead.
- **Mobile Web App PWA Display Modes:** To make an entire installed Web App open without browser chrome upon app launch, use the Web App Manifest `display: "fullscreen"` or `display: "standalone"` property instead of programmatically triggering the Fullscreen API on page load.
- **Automatic Page Load Full-Screen Promotion:** Attempting to force the user's screen into full-screen on page load or scrolling without direct user interaction. Browsers reject these requests automatically to prevent malware and phishers from spoofing desktop environments.

---

## Inputs

1. **Target Element (`element`):** The DOM container element (`<div>`, `<section>`, `<video>`, or `<canvas>`) to be promoted to full-screen mode.
2. **User Gesture Event:** A transient user interaction (`click`, `pointerup`, or `keydown`) triggering the full-screen request.
3. **Configuration Options:** Optional `FullscreenOptions` dictionary specifying `navigationUI: "auto" | "hide" | "show"`.
4. **Iframe Context (if applicable):** Presence of `allowfullscreen` attribute or `allow="fullscreen"` Permissions Policy directive on container `<iframe>` elements.

---

## Outputs

1. **`FullscreenManager` Class Instance:** A robust, zero-dependency controller handling cross-browser full-screen requests, exits, toggles, and state listeners.
2. **Top-Layer CSS Rules (`:fullscreen`):** Production-grade CSS styling rules ensuring aspect ratio preservation, background color backdrops, custom control bar positioning, and responsive scaling in full-screen mode.
3. **Synchronized Accessible UI:** Dynamic updating of toggle buttons (`aria-pressed="true|false"`, `aria-label="Enter fullscreen" | "Exit fullscreen"`) and screen reader status updates via `aria-live="polite"`.

---

## Workflow

### 1. Detect Fullscreen API Support and Vendor Prefixes

Modern browsers (Chrome, Edge, Firefox, Safari 16.4+) support `Element.requestFullscreen()`. Legacy or specific mobile browsers may require vendor-prefixed methods (`webkitRequestFullscreen`, `webkitEnterFullscreen`).

```javascript
function isFullscreenSupported() {
  const doc = document;
  return Boolean(
    doc.fullscreenEnabled ||
    doc.webkitFullscreenEnabled ||
    doc.mozFullScreenEnabled ||
    doc.msFullscreenEnabled
  );
}

function getFullscreenElement() {
  const doc = document;
  return (
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}
```

### 2. Implement Safe Fullscreen Request and Exit Logic

Wrap full-screen request and exit calls in `try...catch` blocks or Promise handlers. Verify that requests stem directly from an active user gesture to prevent `NotAllowedError` exceptions.

```javascript
async function requestFullscreen(element, options = { navigationUI: 'auto' }) {
  if (!element) return false;

  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen(options);
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    } else {
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Fullscreen request failed: ${err.name} - ${err.message}`);
    return false;
  }
}

async function exitFullscreen() {
  const doc = document;
  if (!getFullscreenElement()) return true;

  try {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      await doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
    }
    return true;
  } catch (err) {
    console.error(`Exit fullscreen failed: ${err.name} - ${err.message}`);
    return false;
  }
}
```

### 3. Handle Special Mobile Safari (iOS) Video Fallbacks

iOS Safari on iPhones does not permit arbitrary `<div>` elements to enter full-screen mode via `requestFullscreen()`. However, standard `<video>` elements can enter video full-screen mode using `webkitEnterFullscreen()` or `webkitSetPresentationMode()`.

```javascript
function toggleVideoFullscreen(videoElement) {
  if (!videoElement) return;

  // Standard Fullscreen API check first
  if (isFullscreenSupported() && videoElement.parentElement.requestFullscreen) {
    if (getFullscreenElement()) {
      exitFullscreen();
    } else {
      requestFullscreen(videoElement.parentElement);
    }
    return;
  }

  // iOS Safari iPhone Video Fallback
  if (videoElement.webkitSupportsPresentationMode && typeof videoElement.webkitSetPresentationMode === 'function') {
    const currentMode = videoElement.webkitPresentationMode;
    const targetMode = currentMode === 'fullscreen' ? 'inline' : 'fullscreen';
    videoElement.webkitSetPresentationMode(targetMode);
  } else if (typeof videoElement.webkitEnterFullscreen === 'function') {
    videoElement.webkitEnterFullscreen();
  } else {
    alert('Fullscreen mode is not supported on this device.');
  }
}
```

### 4. Bind Unified `fullscreenchange` and `fullscreenerror` Listeners

Bind event listeners to handle full-screen state transitions, keyboard focus restoration, and accessibility updates. Always listen at the `document` level.

```javascript
class FullscreenController {
  constructor(containerElement, toggleButton, liveRegion) {
    this.container = containerElement;
    this.button = toggleButton;
    this.liveRegion = liveRegion;

    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    this.onFullscreenError = this.onFullscreenError.bind(this);

    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange);

    document.addEventListener('fullscreenerror', this.onFullscreenError);
    document.addEventListener('webkitfullscreenerror', this.onFullscreenError);
  }

  onFullscreenChange() {
    const activeElement = getFullscreenElement();
    const isContainerFullscreen = activeElement === this.container;

    // Update UI state
    if (this.button) {
      this.button.setAttribute('aria-pressed', isContainerFullscreen ? 'true' : 'false');
      this.button.setAttribute(
        'aria-label',
        isContainerFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
      );
    }

    // Announce to screen reader
    if (this.liveRegion) {
      this.liveRegion.textContent = isContainerFullscreen
        ? 'Entered full-screen mode.'
        : 'Exited full-screen mode.';
    }

    // Dispatch custom module event
    this.container.dispatchEvent(
      new CustomEvent('app:fullscreenchange', {
        detail: { isFullscreen: isContainerFullscreen, element: activeElement }
      })
    );
  }

  onFullscreenError(event) {
    console.error('Fullscreen API Error encountered:', event);
    if (this.liveRegion) {
      this.liveRegion.textContent = 'Unable to toggle full-screen mode.';
    }
  }
}
```

### 5. Apply Core Top-Layer and Aspect-Ratio CSS Rules

When an element enters full-screen mode, the browser centers it inside the top-layer view and applies a default black backdrop (`::backdrop`). Ensure the container fills available space and manages layout cleanly.

```css
/* Container entering fullscreen mode */
.media-container:fullscreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  overflow: hidden;
}

/* Vendor prefix fallbacks for legacy browsers */
.media-container:-webkit-full-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

/* Style the top-layer backdrop */
.media-container::backdrop {
  background-color: rgba(0, 0, 0, 0.95);
}

/* Ensure child media (video/canvas) maintains aspect ratio */
.media-container:fullscreen .fullscreen-content {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: auto;
  height: auto;
}

/* Floating custom controls dock in fullscreen mode */
.media-container:fullscreen .controls-dock {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: calc(100% - 3rem);
  max-width: 900px;
  background-color: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
```

---

## Decision Rules

| Operating Environment / Goal | Recommended Strategy | Action / API Pattern |
| :--- | :--- | :--- |
| **Desktop / Android / iPadOS (Safari 16.4+)** | Standard W3C Fullscreen API | Call `element.requestFullscreen()` on the parent wrapper `<div>` containing video/canvas and UI controls. |
| **iOS iPhone Safari (`<div>` Container)** | Native Video Fallback / CSS Viewport Overlay | Detect lack of `requestFullscreen` on `<div>`. If containing `<video>`, call `video.webkitSetPresentationMode('fullscreen')`. Otherwise, apply CSS standard viewport overlay. |
| **Embedded inside Cross-Origin `<iframe>`** | Explicit Permission Delegation | Add `allowfullscreen="true"` AND `allow="fullscreen *"` attributes to the `<iframe>` element. |
| **Canvas / WebGL Game Fullscreen** | Resolution Scaling + Canvas Lock | Promote game container `<div>` to fullscreen; adjust `<canvas>` width/height attributes or CSS scale to prevent blurred raster stretched artifacts. |
| **Full-Screen Keyboard Traps** | Native Esc + Custom Key Shortcuts | Ensure `Escape` key exits fullscreen naturally (browser native). Bind `F` key shortcut to toggle fullscreen when focused inside container. |

---

## Constraints

- **Transient User Gesture Requirement:** `Element.requestFullscreen()` MUST be triggered directly within a short window after a user interaction (e.g. `click`, `touchend`, `keydown`). Asynchronous callbacks executing after network fetches or timers (e.g. `setTimeout`) will fail with `NotAllowedError`.
- **Top-Layer Stacking Context:** Promoted elements are hoisted into the browser's top-layer. Standard elements outside the promoted DOM node (such as page headers, fixed modals, or external tooltips) will be hidden behind the top-layer backdrop.
- **Iframe Permissions Policy:** Calling `requestFullscreen()` inside an `<iframe>` without `allow="fullscreen"` or `allowfullscreen` will reject immediately with a security exception.
- **iOS iPhone Limitations:** iOS on iPhone does not support full-screen for generic DOM elements (`<div>`, `<canvas>`), restricting full-screen exclusively to standard `<video>` elements via WebKit presentation modes.

---

## Non-Goals

- **Screen Orientation Lock API:** Managing automatic landscape/portrait rotation lock (`screen.orientation.lock()`). While frequently paired with full-screen video, orientation locking is a separate API with distinct browser permissions.
- **Picture-in-Picture (PiP) API:** Floating a video element in an OS-level corner window (`video.requestPictureInPicture()`).
- **Browser Window Maximization:** Resizing the browser window frame itself on the desktop OS.

---

## Common Failure Patterns

- **Promoting the `<video>` or `<canvas>` Element Directly Instead of the Container Wrapper:** Calling `videoElement.requestFullscreen()` instead of `containerDiv.requestFullscreen()`. In full-screen mode, custom overlay controls, toolbars, captions, and close buttons inside the container `<div>` disappear, leaving only the raw media element.
- **Ignoring Top-Layer Stacking Rules:** Attempting to render popups, dropdown menus, or notifications positioned on `document.body` while a sub-container is in full-screen mode. Because the sub-container is in the top-layer, elements attached to `body` are rendered behind the backdrop.
- **Missing Vendor Prefixes / iOS Safari Crash:** Failing to check for `webkitPresentationMode` or `webkitEnterFullscreen` on iOS devices, causing full-screen buttons on iPhones to be completely unresponsive.
- **Loss of Aspect Ratio on Canvas Scaling:** Promoting a `<canvas>` element without setting `object-fit: contain` or updating canvas logical dimensions (`canvas.width`, `canvas.height`), resulting in blurry or squished graphics.
- **Missing Accessibility Announcements:** Toggling full-screen state without updating `aria-pressed` or `aria-live` status regions, leaving screen reader users without feedback when the screen context shifts abruptly.

---

## Validation Steps

### 1. Functional Full-Screen Toggle Test
- Click the Fullscreen Toggle button on a container holding media/canvas and controls.
- Verify that the container fills 100% of the display viewport without browser chroming.
- Verify that custom control docks, captions, and toolbars remain visible and interactive above the backdrop.

### 2. User Gesture and Transient Activation Test
- Attempt to invoke `requestFullscreen()` inside a delayed `setTimeout(..., 2000)` without active user interaction.
- Verify that the error handler captures the rejection (`NotAllowedError`) gracefully without breaking the UI.

### 3. iOS Safari & Mobile Responsiveness Test
- Load the application on an iOS iPhone Safari device.
- Verify that clicking the full-screen button invokes native video presentation mode (`webkitSetPresentationMode`) or graceful fallback mode without throwing JavaScript exceptions.

### 4. Keyboard Navigation & Accessibility Audit
- Use `Tab` key to navigate focus to the full-screen toggle button. Press `Space` or `Enter` to enter full-screen.
- Verify that focus remains on or returns to the toggle button.
- Press `Escape` key. Verify that the browser exits full-screen mode cleanly and `aria-pressed` updates to `"false"`.
- Verify that screen readers announce "Entered full-screen mode" / "Exited full-screen mode" via the `aria-live` polite region.

---
name: picture-in-picture-api-management
description: Manage HTMLVideoElement Picture-in-Picture and Document Picture-in-Picture APIs with fallback handling, floating custom UI controls, DOM element migration, cross-window messaging, and WCAG AA accessibility.
---

# Picture-in-Picture API Management

## Purpose

The Picture-in-Picture API Management skill provides a standardized engineering methodology, lifecycle controller architecture, element migration protocol, and accessibility framework for displaying video content and interactive web UI elements in floating, always-on-top picture-in-picture (PiP) windows.

Modern web application users frequently multitask across browser tabs, software applications, or desktop monitors while consuming video content, participating in video calls, monitoring live video feeds, or using floating productivity utilities (such as media player controllers, timer dashboards, or teleprompters). Standard inline web media streams are hidden whenever users scroll away or switch tabs, interrupting playback viewing and user engagement.

Browsers provide two distinct standards for floating windows:
1. **HTMLVideoElement Picture-in-Picture API (`video.requestPictureInPicture()`):** Standardized video frame floating supported across all major desktop and mobile web browsers.
2. **Document Picture-in-Picture API (`window.documentPictureInPicture.requestWindow()`):** Modern HTML document floating allowing arbitrary DOM trees (custom video player controls, chat widgets, canvas animations, and interactive controls) inside a detached floating OS window.

Managing floating picture-in-picture windows safely requires resolving critical browser constraints: explicit transient user gesture requirements, same-origin style copying, DOM element node relocation and restoration, aspect ratio lock, window resize events, page visibility sync, auto-pip triggers, and screen reader status updates.

This skill equips frontend developers to reliably request, manage, sync, and destroy floating PiP sessions with fallbacks between Document PiP and HTMLVideoElement PiP, maintaining active UI state, keyboard focus, and WCAG AA accessibility.

---

## Use Cases

- **Custom HTML5 Video & Media Players:** Floating video streams in fixed-aspect ratio OS overlays while allowing users to browse remaining site content, read article comments, or navigate across tabs.
- **Video Conferencing & Telehealth Portals:** Keeping active participant cameras or screen share feeds pinned in floating windows while users review medical records, take notes, or browse shared documents.
- **Interactive Live Streams & E-Commerce Video:** Maintaining live video streams with embedded interactive buy buttons, live chat widgets, or product showcase panels inside floating Document PiP windows.
- **Floating Timers & Productivity Widgets:** Pinning pomodoro timers, meeting countdowns, sports scoreboards, stock tickers, or teleprompter cards in floating windows over desktop apps.
- **Webcam & Security Feed Monitors:** Floating live security camera feeds, baby monitor feeds, or WebRTC canvas renderings in dedicated floating desktop windows.

---

## When NOT to Use

- **In-Page Sticky Docking (CSS `position: fixed` or `sticky`):** When the floating element only needs to remain visible inside the current browser viewport as the user scrolls down the page, use standard sticky CSS positioning or Intersection Observer docking rather than launching an OS-level window.
- **Standard Fullscreen Media Playback:** When the intent is to maximize content across the entire display monitor, use the W3C Fullscreen API (`element.requestFullscreen()`) instead of Picture-in-Picture.
- **Background Audio or Data Workers:** If the task involves playing background audio without visual UI or running network data polling, do not launch a PiP window.
- **Unsolicited Floating Windows on Page Load:** Never attempt to launch PiP automatically on page load without direct, explicit user interaction, as modern browser security policies will block unprompted requests.

---

## Inputs

1. **Target Media or DOM Element:** An `<video>` HTML element for Video PiP, or a wrapper `<div>` / container element containing arbitrary DOM controls for Document PiP.
2. **Transient User Gesture:** An explicit user action (`click` or `keydown` event on an interactive control) triggering the PiP request.
3. **Window Dimensions Configuration:** Width, height, and aspect ratio configuration parameters (e.g., `width: 480`, `height: 270`, `disallowReturnToOpener: false`).
4. **Style Sheets & Token Rules:** CSS stylesheets, style tags, or custom property tokens from the parent document that must be duplicated into the Document PiP window.
5. **Permissions Policy:** HTTP response headers (`Permissions-Policy: picture-in-picture=*`) and iframe attributes (`allow="picture-in-picture"`).

---

## Outputs

1. **`PictureInPictureWindow` or `Window` Handle:** Active handle to the floating Picture-in-Picture window object.
2. **Synchronized UI Controls:** Bi-directional event synchronization between parent document and floating window (play/pause, mute, volume, scrub, closes).
3. **Restored DOM Tree:** Clean restoration of migrated DOM elements back to their original container location in the parent document when PiP closes.
4. **Accessible ARIA Status & Live Region Updates:** Real-time accessible feedback announcing PiP activation, minimization, and closure to assistive technology.
5. **Feature Capability Flag:** Precise detection of Document PiP (`'documentPictureInPicture' in window`) vs Video PiP (`document.pictureInPictureEnabled`).

---

## Workflow

### 1. Feature Detection and Fallback Identification
Determine whether the environment supports Document Picture-in-Picture API, classic HTMLVideoElement Picture-in-Picture API, or no PiP capability.

```javascript
function getPiPSupport() {
  const hasDocumentPiP = 'documentPictureInPicture' in window;
  const hasVideoPiP = 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;

  if (hasDocumentPiP) return 'document';
  if (hasVideoPiP) return 'video';
  return 'none';
}
```

### 2. Standard HTMLVideoElement Picture-in-Picture Implementation
Request PiP on a `<video>` element using standard async/await with error boundary handling.

```javascript
async function toggleVideoPiP(videoElement) {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
      return false;
    } else {
      const pipWindow = await videoElement.requestPictureInPicture();

      pipWindow.addEventListener('resize', () => {
        console.log(`PiP resized: ${pipWindow.width}x${pipWindow.height}`);
      });
      return true;
    }
  } catch (error) {
    console.error('Video PiP request failed:', error);
    throw error;
  }
}
```

### 3. Document Picture-in-Picture Implementation with DOM Migration
When enhanced interactive controls or custom video elements are needed, launch a Document PiP window, migrate the target DOM tree into the detached window, and clone parent document stylesheets.

```javascript
let pipWindowInstance = null;

async function enterDocumentPiP(containerElement, options = { width: 480, height: 270 }) {
  if (!('documentPictureInPicture' in window)) {
    throw new Error('Document Picture-in-Picture API is not supported in this browser.');
  }

  // 1. Open the floating document PiP window
  pipWindowInstance = await window.documentPictureInPicture.requestWindow({
    width: options.width,
    height: options.height,
    disallowReturnToOpener: options.disallowReturnToOpener || false,
  });

  // 2. Copy active style sheets and style tags to the floating window
  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      if (styleSheet.cssRules) {
        const newStyle = document.createElement('style');
        Array.from(styleSheet.cssRules).forEach((rule) => {
          newStyle.appendChild(document.createTextNode(rule.cssText));
        });
        pipWindowInstance.document.head.appendChild(newStyle);
      } else if (styleSheet.href) {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = styleSheet.href;
        pipWindowInstance.document.head.appendChild(newLink);
      }
    } catch (e) {
      // Handle cross-origin stylesheet access restrictions
      if (styleSheet.href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSheet.href;
        pipWindowInstance.document.head.appendChild(link);
      }
    }
  });

  // 3. Store reference to parent anchor location
  const placeholder = document.createElement('div');
  placeholder.id = 'pip-placeholder';
  containerElement.parentNode.insertBefore(placeholder, containerElement);

  // 4. Move container DOM element to the floating window
  pipWindowInstance.document.body.appendChild(containerElement);

  // 5. Setup close event listener to restore DOM back to parent
  pipWindowInstance.addEventListener('pagehide', () => {
    const parentContainer = placeholder.parentNode;
    if (parentContainer && containerElement) {
      parentContainer.insertBefore(containerElement, placeholder);
      placeholder.remove();
    }
    pipWindowInstance = null;
    updateUIState(false);
    announceToScreenReader('Picture-in-Picture window closed.');
  });

  updateUIState(true);
  announceToScreenReader('Entered Picture-in-Picture window.');
  return pipWindowInstance;
}
```

### 4. Media Session API Synchronization
Integrate with `navigator.mediaSession` to provide OS-level hardware button and notification tray controls (play, pause, seek, previous, next) when floating windows are active.

```javascript
function setupMediaSessionControls(videoElement) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => videoElement.play());
    navigator.mediaSession.setActionHandler('pause', () => videoElement.pause());
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.fastSeek && 'fastSeek' in videoElement) {
        videoElement.fastSeek(details.seekTime);
      } else {
        videoElement.currentTime = details.seekTime;
      }
    });
  }
}
```

### 5. Accessible User Controls & ARIA Live Announcements
Ensure Picture-in-Picture toggle buttons use explicit `aria-pressed` states and announce status updates to screen readers.

```html
<button
  id="pipToggleBtn"
  type="button"
  class="btn-pip"
  aria-pressed="false"
  aria-describedby="pipStatus"
>
  <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><!-- PiP Icon --></svg>
  <span>Picture-in-Picture</span>
</button>

<div id="pipStatus" class="sr-only" aria-live="polite">
  Picture-in-Picture is currently inactive.
</div>
```

---

## Decision Rules

| Requirement | Recommended Strategy | API / Technique |
| :--- | :--- | :--- |
| **Standard Video Only (Wide Support)** | HTMLVideoElement PiP | `videoElement.requestPictureInPicture()` |
| **Custom HTML Controls / Chat / Interactive UI** | Document Picture-in-Picture API | `window.documentPictureInPicture.requestWindow()` |
| **Document PiP Unsupported Browser** | Progressive Fallback | Fallback to HTMLVideoElement PiP or sticky in-page CSS docking. |
| **Iframe / Embedded Player** | Permission Delegation | Add `allow="picture-in-picture"` attribute to parent `<iframe>`. |
| **Canvas / WebGL / Live Stream** | Canvas Capture Stream | `canvas.captureStream()` attached to background `<video>` element. |
| **OS Hardware Control Integration** | Media Session API | `navigator.mediaSession.setActionHandler()` |

---

## Constraints

- **User Gesture Mandate:** Calling `requestPictureInPicture()` or `documentPictureInPicture.requestWindow()` requires a synchronous user gesture (`click` or `keydown`). Asynchronous calls after network requests will fail with `NotAllowedError`.
- **Single Active Window:** Modern browsers allow only one active Picture-in-Picture window at a time. Opening a new PiP window automatically closes any existing active PiP window.
- **Cross-Origin Style Access:** `document.styleSheets` access may throw `SecurityError` for external cross-origin CSS links unless served with CORS headers or linked via `<link rel="stylesheet">`.
- **Mobile Browser Variations:** iOS Safari supports native video PiP via `webkitPresentationMode` or standard video PiP, but does not yet support Document PiP API. Android Chrome supports Video PiP and Document PiP behind flags/recent releases.
- **Permissions-Policy Header:** If HTTP response headers set `Permissions-Policy: picture-in-picture=()`, PiP requests will fail.

---

## Non-Goals

- **Creating Desktop Operating System Applications:** Picture-in-Picture windows operate within browser security sandboxes and cannot bypass OS window manager rules or spawn arbitrary multi-monitor popups.
- **Overriding Hardware Protected Media (DRM):** PiP cannot bypass Encrypted Media Extensions (EME) or DRM hardware protection rules.
- **Background Video Execution on Battery Saver:** Browsers may freeze frame rendering in PiP if system resources drop significantly.

---

## Common Failure Patterns

- **Attempting PiP Without User Gesture:** Calling `requestPictureInPicture()` inside a `setTimeout`, `fetch()` response promise, or `DOMContentLoaded` without user gesture context, resulting in `NotAllowedError`.
- **Orphaned DOM Nodes:** Moving DOM nodes to Document PiP window without hooking `pagehide` or `unload` listeners, causing elements to disappear permanently when the PiP window is closed.
- **Missing Styles in Document PiP:** Failing to copy parent document stylesheets into the floating window, resulting in unstyled, broken controls.
- **Broken Media State Sync:** Forgetting to synchronize video event listeners (`play`, `pause`, `timeupdate`, `volumechange`) between main tab and PiP window controls.
- **Ignoring Iframe Permission Policy:** Embedding a video player inside an iframe without `allow="picture-in-picture"`, causing PiP requests inside the frame to fail silently or throw security errors.

---

## Validation Steps

### 1. Capability & Permission Test
- Load application in secure context (`https://` or `localhost`).
- Verify feature support using `getPiPSupport()`.
- Confirm `allow="picture-in-picture"` is present on iframe containers if applicable.

### 2. Video Picture-in-Picture Functional Test
- Click PiP button on standard video element.
- Confirm video pops out into OS floating overlay window.
- Interact with controls (play/pause/close) and verify state syncs with main video.
- Exit PiP and verify inline video resumes seamlessly.

### 3. Document Picture-in-Picture Functional Test
- Click PiP button on interactive video card.
- Verify custom floating window opens with all CSS styles applied.
- Confirm interactive elements (custom buttons, mute toggle, progress bar) function properly inside floating window.
- Close PiP window and verify DOM elements are cleanly restored to original parent location.

### 4. Accessibility & Focus Test
- Tab through controls using keyboard only and trigger PiP via `Enter` or `Space`.
- Verify screen reader announces "Entered Picture-in-Picture window" via `aria-live` region.
- Verify focus returns safely to trigger button upon exiting PiP.

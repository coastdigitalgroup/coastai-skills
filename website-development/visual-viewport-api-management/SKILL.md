---
name: visual-viewport-api-management
description:
  Manage, synchronize, and adapt mobile Web UIs to soft keyboards, visual viewport scrolling, and pinch-zoom scales using window.visualViewport, CSS custom variables, and requestAnimationFrame event batching.
---

# Visual Viewport API Management

## Purpose

The Visual Viewport API Management skill provides a production-grade protocol, JavaScript controller architecture, CSS variable synchronization system, and cross-platform debugging framework for managing mobile soft keyboards, pinch-zoom levels, and visual viewport offsets using `window.visualViewport`.

It solves high-friction mobile layout failures where `position: fixed` or `position: sticky` elements (such as chat input bars, checkout action docks, floating search headers, and bottom tab bars) become covered by soft keyboards, break alignment during pinch-zoom interactions, cause page jumping, or leave blank whitespace gaps at the bottom of the screen on iOS Safari and Android Chrome.

---

## Use Cases

- **Mobile Chat & Messaging Interfaces:** Keeping a bottom-docked text input bar pinned directly above the virtual keyboard when focus enters an `<input>` or `<textarea>` without obscuring recent message history.
- **Mobile Checkout & Sticky Action Docks:** Ensuring primary CTA buttons ("Pay Now", "Complete Order", "Apply Coupon") stay anchored above the soft keyboard when typing payment or shipping details.
- **Pinch-Zoom Canvas & Document Viewers:** Adjusting floating toolbars, overlays, and pagination controls so they remain visually stable and accessible when users pinch-zoom into maps, PDFs, or images.
- **Full-Height Modal Overlays & Drawers:** Preventing background document scrolling and positioning form modals accurately inside the actual visible portion of the screen when the soft keyboard reduces visible height.
- **Virtual Keyboard Detection & Custom Inset Calculation:** Measuring precise virtual keyboard height (`window.innerHeight - window.visualViewport.height`) to dynamically recalculate scrollable container heights.

---

## When NOT to Use

- **Standard Document Flow & Static Layouts:** Long scrolling articles, blogs, or marketing pages where standard document flow and native scrolling are sufficient and no fixed/sticky bottom UI elements are present.
- **Declarative Full-Screen Containers Without Inputs:** Full-screen hero cards or splash overlays that do not contain text inputs or pinch-zoom requirements. Use CSS dynamic viewport units (`dvh`, `svh`, `lvh`) and safe area insets instead (see `mobile-viewport-implementation`).
- **Desktop Viewport Resizing:** Standard window browser resizing on desktop screens where `window.innerWidth` and `window.innerHeight` match `window.visualViewport.width` and `window.visualViewport.height` (unless testing pinch-zoom trackpad gestures).
- **Pure Element Dimension Tracking:** Observing the box-model dimension changes of individual DOM elements (like card containers or sidebars). Use `ResizeObserver` instead (see `resize-observer-implementation`).

---

## Inputs

1. **Target Fixed / Sticky Elements:** The DOM elements (e.g. `.chat-input-bar`, `.bottom-action-dock`, `.floating-toolbar`) that must stay pinned within the visible visual viewport.
2. **Scrollable Container:** The main content wrapper (e.g. `.chat-messages`, `.form-body`) whose height or padding must adjust when the visual viewport resizes.
3. **Visual Viewport State Properties:**
   - `window.visualViewport.height`: Current height of the visual viewport in CSS pixels.
   - `window.visualViewport.width`: Current width of the visual viewport in CSS pixels.
   - `window.visualViewport.offsetTop`: Vertical offset of the visual viewport relative to the layout viewport.
   - `window.visualViewport.offsetLeft`: Horizontal offset of the visual viewport relative to the layout viewport.
   - `window.visualViewport.scale`: Current pinch-zoom scale factor (e.g. `1.0` for unzoomed, `2.5` for zoomed).
4. **Lifecycle Options & Callbacks:** Signal triggers (`AbortSignal`) or subscribe callbacks for reactive layout updates.

---

## Outputs

1. **Synced CSS Custom Variables:** Global CSS variables updated in real-time via `requestAnimationFrame`:
   - `--vv-height`: Visual viewport height in pixels (`${height}px`).
   - `--vv-width`: Visual viewport width in pixels (`${width}px`).
   - `--vv-offset-top`: Visual viewport top offset in pixels (`${offsetTop}px`).
   - `--vv-offset-bottom`: Inset distance from layout viewport bottom to visual viewport bottom (`${keyboardHeight}px`).
   - `--vv-scale`: Active pinch-zoom scale factor (`${scale}`).
2. **Visual Viewport Controller Instance:** A JavaScript singleton class (`VisualViewportController`) managing listener lifecycles, event debouncing/batching, and platform workarounds.
3. **Virtual Keyboard State Events:** Dispatched custom events (`keyboardshow`, `keyboardhide`, `viewportresize`) with keyboard height payload.

---

## Workflow

### 1. Feature Detection and Container Initialization

Detect `window.visualViewport` support before attaching listeners. Provide graceful fallbacks using `window.innerHeight` and standard viewport events for unsupported environments.

```javascript
const hasVisualViewport = typeof window !== 'undefined' && 'visualViewport' in window;

if (!hasVisualViewport) {
  // Fallback for legacy environments
  document.documentElement.style.setProperty('--vv-height', `${window.innerHeight}px`);
  document.documentElement.style.setProperty('--vv-offset-bottom', '0px');
  document.documentElement.style.setProperty('--vv-scale', '1');
}
```

### 2. Implement Real-Time CSS Variable Synchronization with `requestAnimationFrame`

Both `resize` and `scroll` events fire on `window.visualViewport` during soft keyboard transitions and pinch-zooming. To prevent layout thrashing and forced reflows, batch DOM reads and CSS variable updates in a `requestAnimationFrame` callback.

```javascript
let rafId = null;

function updateVisualViewportCSS() {
  if (rafId) return;

  rafId = requestAnimationFrame(() => {
    rafId = null;

    const vv = window.visualViewport;
    const layoutHeight = window.innerHeight;
    const layoutWidth = window.innerWidth;

    // Calculate keyboard height / bottom offset
    // Layout bottom minus visual viewport bottom boundary
    const vvBottom = vv.height + vv.offsetTop;
    const offsetBottom = Math.max(0, layoutHeight - vvBottom);

    const doc = document.documentElement;
    doc.style.setProperty('--vv-height', `${vv.height}px`);
    doc.style.setProperty('--vv-width', `${vv.width}px`);
    doc.style.setProperty('--vv-offset-top', `${vv.offsetTop}px`);
    doc.style.setProperty('--vv-offset-bottom', `${offsetBottom}px`);
    doc.style.setProperty('--vv-scale', `${vv.scale}`);
  });
}

if (hasVisualViewport) {
  window.visualViewport.addEventListener('resize', updateVisualViewportCSS);
  window.visualViewport.addEventListener('scroll', updateVisualViewportCSS);
  updateVisualViewportCSS();
}
```

### 3. Bind Fixed Layout Components to CSS Viewport Variables

In CSS, replace hardcoded `bottom: 0` or `100vh` rules on fixed elements with dynamic calculations derived from `--vv-offset-bottom` and `--vv-offset-top`.

```css
/* Bottom-docked container (e.g. Chat Input or Action Bar) */
.fixed-bottom-dock {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* Elevate dock by the keyboard offset */
  transform: translateY(calc(-1 * var(--vv-offset-bottom, 0px)));

  /* Ensure smooth transition during keyboard toggle */
  transition: transform 0.1s cubic-bezier(0, 0, 0.2, 1);
  will-change: transform;
}

/* Scrollable message panel that contracts when keyboard opens */
.chat-messages-container {
  height: calc(var(--vv-height, 100vh) - var(--header-height, 60px) - var(--input-bar-height, 70px));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

### 4. Handle iOS Safari Virtual Keyboard Scroll Jump

On iOS Safari, focusing an input element shifts the layout viewport scroll (`window.scrollY`), which can push header elements off-screen or create blank whitespace at the page bottom.

- Intercept input focus and reset window scroll position to `0` when necessary.
- Programmatically scroll active input into the visual viewport if obscured.

```javascript
function handleInputFocus(event) {
  const target = event.target;
  if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

  // Small delay to allow iOS virtual keyboard animation to finish
  setTimeout(() => {
    // Reset layout viewport scroll drift caused by iOS focus
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Scroll container to keep active input in visual viewport if needed
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, 300);
}

document.addEventListener('focusin', handleInputFocus);
```

### 5. Detect Keyboard Visibility States and Dispatch Custom Events

Track visual viewport height changes relative to layout height to declare `keyboardshow` and `keyboardhide` states. A threshold of `150px` reliably distinguishes keyboard expansion from browser address bar collapse.

```javascript
let isKeyboardVisible = false;

function detectKeyboardState() {
  const vv = window.visualViewport;
  const keyboardHeight = window.innerHeight - (vv.height + vv.offsetTop);
  const isVisibleNow = keyboardHeight > 150;

  if (isVisibleNow !== isKeyboardVisible) {
    isKeyboardVisible = isVisibleNow;
    const eventName = isVisibleNow ? 'keyboardshow' : 'keyboardhide';

    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          keyboardHeight: isVisibleNow ? keyboardHeight : 0,
          visualViewportHeight: vv.height,
          scale: vv.scale
        }
      })
    );
  }
}

if (hasVisualViewport) {
  window.visualViewport.addEventListener('resize', detectKeyboardState);
}
```

---

## Decision Rules

### Visual Viewport Strategy Selection Matrix

| Scenario / Goal | Recommended Strategy | CSS Target / Rule | Performance / Caveat |
| :--- | :--- | :--- | :--- |
| **Fixed Bottom Action Dock (Chat / Checkout)** | `translateY(- var(--vv-offset-bottom))` | `position: fixed; transform: translateY(calc(-1 * var(--vv-offset-bottom)));` | GPU hardware-accelerated. Smooth on iOS/Android. |
| **Full-Height Modal Container** | `--vv-height` and `--vv-offset-top` | `height: var(--vv-height); top: var(--vv-offset-top); position: fixed;` | Prevents modal from clipping under soft keyboard. |
| **Pinch-Zoom Fixed Header/Toolbar** | Transform Scale Inversion | `transform: scale(calc(1 / var(--vv-scale))) translate(...)` | Keeps toolbars optically crisp during zoom. |
| **Scrollable Message History** | Dynamic Container Height | `height: calc(var(--vv-height) - topDockHeight - bottomDockHeight)` | Recalculates scroll boundary cleanly. |
| **Simple Hero / Full Page Layout** | Pure CSS `100dvh` or `100svh` | `height: 100dvh;` | Do NOT use JavaScript `visualViewport` for basic hero sections. |

---

## Constraints

- **Frame Batching Mandatory:** Always batch `window.visualViewport` handler reads and style writes with `requestAnimationFrame`. Unbatched handlers cause severe frame drops and keyboard animation stuttering on mobile.
- **iOS Safari Layout Viewport Drift:** iOS Safari moves `window.scrollY` when focusing inputs near screen edges. `window.visualViewport.offsetTop` measures this drift, but setting `window.scrollTo(0, 0)` on input focus is frequently required to keep fixed headers visible.
- **Android Chrome `interactive-widget` Meta Tag:** Chrome 108+ supports `<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-visual">`. Ensure this attribute aligns with JavaScript logic to avoid double-padding adjustments.
- **Pinch-Zoom Sub-Pixel Offsets:** When `window.visualViewport.scale !== 1`, `offsetTop` and `offsetLeft` return sub-pixel floating-point values. Always use `Math.round()` or CSS pixel unit strings when setting positions.

---

## Non-Goals

- Declarative viewport height units (`100dvh`, `100svh`) for static layout pages (use `mobile-viewport-implementation`).
- Virtual keyboard content input masking or auto-formatting (use `input-masking-and-formatting`).
- Native keyboard software development or native WebView wrapper bridging (Capacitor/Cordova plugins).

---

## Common Failure Patterns

- **Using `bottom: 0` with `position: fixed` Alone:** Expecting `position: fixed; bottom: 0;` to automatically stay above the soft keyboard on iOS. iOS Safari positions fixed elements relative to the layout viewport, causing the keyboard to overlay and hide the element.
- **Relying on `window.onresize` for Keyboard Height:** Using `window.innerHeight` inside a `window.onresize` listener to detect keyboards. On iOS Safari, `window.innerHeight` does NOT change when the soft keyboard appears—only `window.visualViewport.height` changes.
- **Unbatched `scroll` and `resize` Handlers:** Updating DOM styles directly inside `visualViewport.addEventListener('scroll', ...)` without `requestAnimationFrame`. Pinch-zooming or panning fires dozens of scroll events per second, causing severe frame drops.
- **Ignoring Pinch-Zoom Scale Factors:** Positioning floating overlays using absolute pixel calculations without dividing by `window.visualViewport.scale`, causing overlays to scale off-screen or balloon in size during zoom.
- **Blank Bottom Gap Artifacts:** Applying padding to body or containers during keyboard show, but failing to reset padding on `keyboardhide` or `blur`, leaving persistent white space at the bottom of the page.

---

## Validation Steps

### 1. Mobile Soft Keyboard Verification (iOS Safari & Android Chrome)
- [ ] Open page on physical iOS Safari device or Xcode Simulator.
- [ ] Focus a bottom input field. Verify that the bottom dock stays pinned cleanly directly above the soft keyboard without gap or clipping.
- [ ] Dismiss soft keyboard. Confirm bottom dock smoothly returns to screen bottom without leaving blank white space.
- [ ] Verify message history or scrollable body shrinks cleanly so top message remains reachable.

### 2. Pinch-Zoom & Scale Verification
- [ ] Pinch-zoom into the page to 200% (`scale = 2.0`).
- [ ] Pan around the zoomed viewport. Confirm fixed headers or toolbars remain anchored in the visible visual viewport.
- [ ] Inspect CSS custom variable `--vv-scale` in DevTools to confirm value reflects active zoom level.

### 3. Automated & Lifecycle Inspection
- [ ] Test in desktop browser DevTools with simulated mobile device mode and soft keyboard toggle.
- [ ] Confirm no `forced synchronous reflow` or performance warnings occur in Console during keyboard animation.
- [ ] Unmount or tear down page components and verify `visualViewport` event listeners are cleanly removed without memory leaks.

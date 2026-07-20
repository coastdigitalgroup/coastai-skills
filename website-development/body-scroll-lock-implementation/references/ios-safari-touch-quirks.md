# iOS Safari Touch & Scrolling Quirks

When developing modal dialogs, drawers, or slide-out overlays, managing scrolling on mobile devices—particularly iOS Safari—presents several browser-specific quirks. This reference document details why standard desktop solutions fail and how to programmatically bypass WebKit's unique constraints.

---

## 1. Why iOS Safari Ignores `overflow: hidden`

On desktop browsers (Chrome, Firefox, Edge, Safari) and mobile Android Chrome, applying `overflow: hidden` to the `<body>` or `<html>` element is sufficient to freeze the viewport scroll.

However, **iOS Safari (WebKit)** ignores this CSS directive. This design choice is rooted in historical viewport behaviors:
- WebKit treats the root element (`html`/`body`) as an elastic canvas rather than a rigid frame.
- Dragging/swiping gestures anywhere on the screen are mapped directly to viewport panning (canvas offset shift), regardless of the overflow rules applied to elements in the document flow.
- As a result, users can still swipe and scroll the background content through a dark modal backdrop overlay.

---

## 2. Rubber-Banding and Scroll Leakage

When a scrollable element inside an overlay (like a text panel or a dropdown list) reaches its scroll boundary (top or bottom):
- Further swipe gestures trigger a **rubber-banding** (elastic bounce) animation.
- In WebKit, once an element bounces and cannot scroll any further in that direction, the scroll event is bubbled up or "chained" directly to the parent viewport.
- This results in a **scroll leak**, where dragging your finger downwards at the top of a scrollable modal container unexpectedly scrolls the background homepage upwards.

---

## 3. Passive Event Listeners & `{ passive: false }`

Historically, developers cancelled background scrolling simply by listening to `touchmove` events and calling `event.preventDefault()`.

In modern browsers (Chrome 56+, iOS Safari 11.3+):
- Touch listeners registered on the document or window default to `passive: true`.
- **Why?** Passive listeners tell the browser's compositor thread that the event handler will *never* call `preventDefault()`. This allows the browser to scroll the page immediately without waiting for JavaScript execution, yielding a buttery-smooth 60fps scroll.
- **The Catch:** If you call `preventDefault()` inside a passive listener, the browser ignores it and throws a console error:
  `[Intervention] Ignored attempt to cancel a touchmove event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.`
- **The Fix:** When registering touch event handlers to lock scrolling, you **must** pass `{ passive: false }` as the third parameter to `addEventListener()` to allow WebKit to block the gesture.

---

## 4. Architectural Tradeoffs: Event Interception vs. Position Fixed

There are two main technical workarounds to resolve the iOS background scroll leak. The table below compares these approaches:

| Metric / Aspect | Approach A: Touchmove Interception (Touch Coordinates) | Approach B: Position-Fixed Hack (`position: fixed` Body) |
| :--- | :--- | :--- |
| **How it Works** | Hooks `touchmove` with `{ passive: false }` and blocks events unless they are within scrollable coordinates. | Saves `scrollY` on open, applies `position: fixed; top: -scrollYpx; width: 100%` to body, and restores on close. |
| **Pros** | - Keeps the underlying page layout intact.<br>- Keeps form inputs, sticky headers, and layout elements visually stationary.<br>- Excellent UX for overlay panels and partial menus. | - 100% reliable across all browsers and versions without touch coordinate math.<br>- Handles scroll-keys (space, arrows) natively on desktop. |
| **Cons** | - Requires JavaScript coordinate tracking.<br>- Requires identifying and passing explicit scrollable elements.<br>- Slight JS overhead on touch movements. | - Mutates the document layout, causing absolute or fixed elements on the background to "jump" or shift.<br>- Forces the window scroll position to 0 during open, which can break dynamic layout calculations inside third-party trackers. |
| **Best Used For** | Elegant overlays, slideouts, bottom drawers, and modal sheets with complex nested scroll needs. | Heavy full-screen takeovers, age gates, cookie overlays, and frameworks where tracking individual elements is too complex. |

---

## 5. Viewport and Styling Optimizations

In addition to programmatic JavaScript locking, apply the following CSS properties to your modals and containers:

### `overscroll-behavior: contain`
```css
.modal-body {
  overscroll-behavior: contain;
}
```
- This CSS property tells the browser to isolate scroll boundaries. When the element hits its limits, the scroll does not chain to the parent.
- **Note:** It is supported in modern Safari (Safari 16+), but still fails if the user touches a non-scrollable part of the modal (like a header or background overlay) and drags. Programmatic locking is still needed for absolute security.

### `-webkit-overflow-scrolling: touch`
```css
.modal-body {
  -webkit-overflow-scrolling: touch;
}
```
- This enables inertia-driven (momentum) scrolling inside WebKit scrollable div boxes. Without it, scroll panels on older iOS versions feel rigid and heavy. Modern iOS Safari enables this by default, but keeping it in your stylesheets ensures backward compatibility.

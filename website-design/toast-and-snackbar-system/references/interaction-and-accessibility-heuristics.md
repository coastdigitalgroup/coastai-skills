# Reference: Interaction and Accessibility Heuristics for Toasts & Snackbars

This document provides technical reference guidelines for implementing highly interactive, accessible, and user-friendly toast notification systems. It covers time-to-live algorithms, ARIA live-region standards, hover-pause interaction patterns, swipe gestures, and Windows Forced Colors Mode compliance.

---

## 1. Dynamic Expiration (TTL) Algorithms

Never use a hardcoded 3-second or 4-second timeout for all notifications. Users read at different speeds, and screen readers require time to synthesize and announce new content.

### The Reading Calculation Formula
To ensure that everyone can read the toast before it vanishes, use the following algorithm to calculate the Time-to-Live (TTL):

$$\text{TTL (ms)} = \max\left( \text{Base Time (ms)}, \ \text{Word Count} \times \text{Reading Rate Limit (ms/word)} \right) + \text{Action Buffer (ms)}$$

Where:
- **Base Time:** `5000ms` (the absolute minimum duration any toast should persist).
- **Reading Rate Limit:** `350ms per word` (based on accessible reading standards for diverse cognitive abilities).
- **Action Buffer:** `3000ms` (additional margin added if the toast contains an interactive control like "Undo" or "View" to allow keyboard navigation).

### Pre-Calculated Thresholds

| Word Count | Action Present? | Estimated Reading Time | Recommended Timeout (TTL) |
| :--- | :--- | :--- | :--- |
| **1 – 7 words** | No | 1.5 – 2.5 seconds | **5,000ms** (Base) |
| **1 – 7 words** | Yes | 1.5 – 2.5 seconds | **8,000ms** (Base + Action Buffer) |
| **8 – 15 words** | No | 3.0 – 5.5 seconds | **6,000ms** |
| **8 – 15 words** | Yes | 3.0 – 5.5 seconds | **9,000ms** |
| **16 – 25 words** | No | 6.0 – 8.5 seconds | **9,000ms** |
| **16 – 25 words** | Yes | 6.0 – 8.5 seconds | **12,000ms** |

---

## 2. ARIA Live-Region Protocols (Screen Readers)

Toasts are appended dynamically to the DOM, meaning screen readers must be informed of their appearance immediately without losing current context.

```html
<!-- CORRECT: The live-region container must be present in the static DOM on initial page load -->
<div id="toast-root" aria-live="polite" aria-atomic="true">
  <!-- Dynamic child toasts injected here are announced correctly -->
</div>

<!-- INCORRECT: Injecting the live-region dynamically alongside the toast content -->
<!-- This causes many screen readers to ignore the announcement entirely -->
```

### Deciding ARIA Roles & Assertiveness

- **`role="status"` / `aria-live="polite"` (Recommended for 95% of use cases):**
  - Synthesizes and queued announcement. The screen reader finishes speaking its current sentence, then announces the toast content.
  - Use for success messages, background saves, files finishing uploading, or non-critical info.
- **`role="alert"` / `aria-live="assertive"` (Use with extreme caution):**
  - Immediately interrupts whatever the screen reader is currently announcing, potentially clearing the user's focus memory.
  - Use **only** for system failures or destructive state events that require immediate awareness (e.g., "Network connection lost. Offline mode active," "Critical data sync failed").

---

## 3. Hover and Keyboard Focus Pause Heuristics

A self-dismissing toast is a major accessibility barrier for users with motor difficulties, low vision, or cognitive differences. Active focus and hover events must freeze the timer.

### Interaction Rules
1. **Mouse Hover:** When the cursor enters the boundaries of any toast item (`mouseenter`), freeze the timers of **all** toasts in the active queue. Resume timers only when the mouse leaves (`mouseleave`).
2. **Keyboard Focus:** When keyboard focus enters any interactive button inside a toast (e.g., the "Undo" button gets focused), clear the timeout interval completely. Keep the toast visible indefinitely until focus is explicitly moved away or the user dismisses it manually.
3. **Esc Key Dismissal:** Pressing the `Escape` key while focus is inside any toast must immediately close that specific toast and return focus safely to the button that triggered the original action.

---

## 4. Touch Swipe-to-Dismiss Gesture Specification

On touch devices, dragging a transient toast off the screen is an intuitive physical interaction. Follow these structural constraints for swipe gestures:

- **Trigger Gesture:** Horizontal swipe (X-axis translation) on the touch surface.
- **Visual Feedback:**
  - As the finger drags, translate the toast's horizontal position 1:1 with the touch coordinates.
  - Scale down the toast opacity linearly based on distance:
    $$\text{Opacity} = 1.0 - \left( \frac{\text{Current Swipe Distance}}{\text{Dismiss Threshold (px)}} \right)$$
- **Dismiss Threshold:** `30%` of the screen's viewport width.
  - If the swipe is released *before* hitting the 30% threshold, slide the toast smoothly back to `transform: translateX(0)` with an elastic transition.
  - If the swipe exceeds 30%, animate the toast completely off-screen (`transform: translateX(100% / -100%)`) at a high velocity and remove the node from the DOM.

---

## 5. Windows Forced Colors Mode (High Contrast Mode)

Users with low vision frequently use operating system high-contrast modes. Standard CSS backgrounds, drop shadows, and subtle borders disappear in these modes.

Ensure your toast stylesheets include system-color overrides to maintain legibility:

```css
@media (forced-colors: active) {
  .toast-item {
    /* Ensure the toast container has a visible high-contrast border outline */
    border: 2px solid ButtonText !important;
    background-color: Canvas !important;
    color: CanvasText !important;
  }

  .toast-icon {
    /* Force system color matching on icons to prevent them from becoming invisible */
    stroke: ButtonText !important;
    fill: none !important;
  }

  .toast-action-btn {
    /* Make interactive buttons look distinct */
    border: 1px solid ButtonText !important;
    color: LinkText !important;
  }

  .toast-close-btn {
    border: 1px solid transparent !important;
  }

  .toast-close-btn:focus-visible {
    border-color: Highlight !important;
  }
}
```

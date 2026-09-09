# Bottom Sheet Detent Math, Gestures & WCAG AA Reference

This reference provides technical rules, math formulas, gesture thresholds, and WCAG 2.1 AA accessibility guidelines for implementing the **Bottom Sheet Design System**.

---

## 1. Detent Geometry & Snap Mechanics

Detents define the resting height states of a bottom sheet relative to the visual viewport height (`vh`).

### Standard Detent Height Ratios

```text
+-------------------------------------------------------------+
| Viewport Top (100vh)                                        |
|                                                             |
| - - - - - - - Full Detent (90vh - 92vh) - - - - - - - - - - |
|                                                             |
|                                                             |
| - - - - - - - Half/Partial Detent (50vh - 65vh) - - - - - - |
|                                                             |
|                                                             |
| - - - - - - - Peek Detent (15vh - 25vh) - - - - - - - - - - |
|                                                             |
+-------------------------------------------------------------+
| Viewport Bottom (0vh)                                       |
+-------------------------------------------------------------+
```

| Detent State | Percent Viewport Height | Formula / Calculation | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Collapsed / Closed** | `0%` | `translateY(100%)` | Hidden off-screen |
| **Peek Detent** | `15% – 25%` | `clamp(120px, 20vh, 200px)` | Map preview, audio player bar, persistent order summary |
| **Half / Partial Detent** | `50% – 65%` | `clamp(320px, 60vh, 560px)` | Action sheets, short filters, option selection menus |
| **Full Detent** | `90% – 92%` | `calc(100vh - 3rem)` | Deep option lists, scrollable filter grids, detail forms |

### Drag Gesture Threshold Math

When a user drags the drag handle or sheet surface, calculate the flick velocity and distance delta ($\Delta y$) to determine the target snap state:

$$\text{Flick Velocity } v = \frac{\Delta y}{\Delta t} \quad (\text{px/ms})$$

- **Dismiss Threshold ($\Delta y > 0$):**
  - If downward drag distance exceeds **25% of current sheet height**, OR downward velocity $v > 0.5\text{ px/ms}$, snap to **Collapsed/Closed**.
- **Expansion Threshold ($\Delta y < 0$):**
  - If upward drag distance exceeds **20% of current sheet height**, OR upward velocity $v < -0.5\text{ px/ms}$, snap to next higher detent state (Partial $\rightarrow$ Full).

---

## 2. Safe Area Inset & Visual Viewport Handling

Mobile browsers introduce dynamic UI elements (iOS Safari address bar, home gesture bar, Android navigation controls, soft keyboards) that alter the available visual viewport.

### Safe Area CSS Formula

For bottom CTA buttons and sticky footers, never hardcode `bottom: 0`. Use CSS `env()` with fallbacks:

```css
/* Sticky Footer Padding Formula */
.sheet-footer {
  padding-bottom: max(16px, env(safe-area-inset-bottom, 16px));
  padding-left: max(16px, env(safe-area-inset-left, 16px));
  padding-right: max(16px, env(safe-area-inset-right, 16px));
}
```

### Soft Keyboard Visual Viewport Offset

When an `<input>` or `<textarea>` inside a bottom sheet gains focus, the visual viewport shrinks. Use `window.visualViewport` to recalculate available space:

```javascript
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    const sheet = document.querySelector('.sheet-container');
    const viewportHeight = window.visualViewport.height;
    // Lock sheet height to active visual viewport height
    sheet.style.maxHeight = `${viewportHeight - 16}px`;
  });
}
```

---

## 3. WCAG 2.1 AA Accessibility Guidelines

### ARIA Attributes Table

| Element | ARIA Attribute | Value | Description |
| :--- | :--- | :--- | :--- |
| Sheet Container | `role` | `"dialog"` | Defines container as an overlay dialog surface |
| Sheet Container | `aria-modal` | `"true"` | Signals to screen reader that background content is inert |
| Sheet Container | `aria-labelledby` | `"sheet-title-id"` | Points to the `<h2>` heading element |
| Sheet Container | `aria-describedby` | `"sheet-desc-id"` | Points to introductory descriptive text |
| Close Button | `aria-label` | `"Close sheet"` | Explicit accessible label for icon-only close trigger |
| Drag Handle | `aria-hidden` | `"true"` | Hides decorative drag handle pill from screen readers |

### Keyboard Focus Management Protocol

1. **Opening Trigger:**
   - Record `document.activeElement` before opening sheet.
   - Set `aria-expanded="true"` on trigger button.
2. **Initial Focus:**
   - Move focus to close button or first input field within 50ms of transition complete.
3. **Focus Trapping:**
   - Intercept `Tab` and `Shift+Tab` key presses to wrap focus within sheet focusable elements.
4. **Dismissal (`Escape` Key & Backdrop):**
   - Pressing `Escape` or tapping backdrop closes sheet.
   - Restore focus immediately to recorded trigger element.

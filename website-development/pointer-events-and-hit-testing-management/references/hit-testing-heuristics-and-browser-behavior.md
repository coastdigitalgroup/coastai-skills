# Hit-Testing Heuristics and Browser Behavior Reference

## 1. Browser Hit-Testing Mechanics & Target Trees

Hit-testing is the browser rendering engine's pipeline process for mapping screen coordinates $(X, Y)$ from mouse, touch, or pen input devices to a specific target DOM `Element` node.

```
                  [Pointer Input Event at (X, Y)]
                                 │
                                 ▼
                     [Top-Layer Overlay Query]
                    (Native Dialogs / Popovers)
                                 │
                                 ▼
                    [Stacking Context Traversal]
                    (Highest z-index / DOM order)
                                 │
                                 ▼
                    [Check CSS pointer-events]
             ┌───────────────────┴───────────────────┐
   pointer-events: none                     pointer-events: auto
             │                                       │
             ▼                                       ▼
    [Pass Through Layer]                 [Target Element Identified]
  (Check Next Element Down)                          │
                                                     ▼
                                           [Dispatch Pointer Event]
                                         (pointerdown / pointermove)
```

### Stacking Context & DOM Order Traversal
1. The browser queries elements in reverse paint order (top-most visual layer first).
2. Elements in top-layer overlays (such as native `<dialog showModal()>` or `[popover]`) take precedence over standard document flow regardless of `z-index`.
3. Within the same stacking context, elements rendered later in DOM order evaluate above earlier siblings.
4. If an element has `pointer-events: none`, the browser bypasses it and evaluates the next element immediately underneath at $(X, Y)$.

---

## 2. W3C Pointer Events API vs Legacy Mouse/Touch Events

Modern web applications should standardize on **W3C Pointer Events** (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) rather than mixing `mousedown`/`touchstart` listeners.

| Feature / Behavior | Legacy Mouse Events | Legacy Touch Events | W3C Pointer Events |
| :--- | :--- | :--- | :--- |
| **Device Parity** | Mouse only | Touch only | Universal (Mouse, Touch, Pen) |
| **Continuous Capture** | Non-standard (`setCapture` obsolete) | Automatic during touch drag | Standardized (`setPointerCapture`) |
| **Multi-Touch Support** | Single coordinate | `touches[]` array | Individual `pointerId` per touch |
| **Pressure / Contact Geometry** | None | `force`, `radiusX`, `radiusY` | `pressure`, `width`, `height`, `tiltX` |
| **Default Scroll Prevention** | `e.preventDefault()` in `touchstart` | `e.preventDefault()` | CSS `touch-action: none` |

---

## 3. The `setPointerCapture(pointerId)` Lifecycle

`setPointerCapture` reassigns the target for all subsequent pointer events for a specific `pointerId` to the capturing element, regardless of cursor location on screen.

```javascript
// Example: Universal continuous drag handle
function attachPointerTracker(handleElement, onMoveCallback) {
  handleElement.addEventListener('pointerdown', (event) => {
    // 1. Claim continuous pointer event stream
    handleElement.setPointerCapture(event.pointerId);
    handleElement.classList.add('is-active');
  });

  handleElement.addEventListener('pointermove', (event) => {
    // 2. Process move events even if cursor leaves handle bounds
    if (handleElement.hasPointerCapture(event.pointerId)) {
      onMoveCallback(event.clientX, event.clientY);
    }
  });

  const releaseCapture = (event) => {
    // 3. Clean up capture state
    if (handleElement.hasPointerCapture(event.pointerId)) {
      handleElement.releasePointerCapture(event.pointerId);
    }
    handleElement.classList.remove('is-active');
  };

  handleElement.addEventListener('pointerup', releaseCapture);
  handleElement.addEventListener('pointercancel', releaseCapture);
}
```

### Key Pointer Capture Rules
- **Automatic Release:** Pointer capture is automatically released when a `pointerup` or `pointercancel` event fires, or when the capturing element is removed from the DOM.
- **`gotpointercapture` and `lostpointercapture` Events:** Fired on the element when capture status changes, providing a clean hook for UI state toggles.

---

## 4. `document.elementFromPoint()` & Shadow DOM Boundaries

When inspecting hit targets programmatically:

```javascript
// Query single top-most element
const topEl = document.elementFromPoint(x, y);

// Query entire array of stacked elements at coordinates
const stack = document.elementsFromPoint(x, y);
```

### Shadow DOM Penetration
`document.elementFromPoint(x, y)` retargets to the **Shadow Host** if the hit target resides inside a Closed or Open Shadow Root. To inspect nodes inside a Web Component shadow tree:

```javascript
function getDeepElementFromPoint(root, x, y) {
  let element = root.elementFromPoint(x, y);

  while (element && element.shadowRoot && element.shadowRoot.elementFromPoint) {
    const shadowElement = element.shadowRoot.elementFromPoint(x, y);
    if (!shadowElement || shadowElement === element) break;
    element = shadowElement;
  }

  return element;
}
```

---

## 5. Accessibility & Touch Target Heuristics

### WCAG 2.2 Target Size Requirements
- **WCAG 2.2 Criterion 2.5.8 Target Size (Minimum) (Level AA):** The size of the target for pointer inputs is at least **24×24 CSS pixels**, except where undersized targets have sufficient spacing or are inline text.
- **Level AAA / Mobile Guidelines:**
  - **Apple iOS Human Interface Guidelines:** Minimum **44×44 pt** touch target.
  - **Google Material Design Guidelines:** Minimum **48×48 dp** touch target.

### Hit-Box Expansion via Pseudo-Elements
Expanding hit-boxes using `::before` pseudo-elements increases the hit-testing surface without introducing layout shifts or extra container divs:

```css
/* Small 16px checkbox expand to 44px touch area */
.custom-checkbox {
  position: relative;
  width: 16px;
  height: 16px;
}

.custom-checkbox::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  transform: translate(-50%, -50%);
  /* Invisible pseudo-element receives pointer events */
}
```

---

## 6. Performance Considerations

- **Avoid Calling `elementFromPoint` in Scroll or Mousemove Handlers:** Synchronously calling `document.elementFromPoint()` or `document.elementsFromPoint()` during layout-invalidated states forces synchronous geometry reflow (layout thrashing).
- **CSS `touch-action` over Passive Listeners:** Using `touch-action: none` in CSS informs the browser compositor thread prior to event dispatch that scrolling is disabled, eliminating scroll jank without requiring blocking non-passive `touchstart` listeners.

# Scrollbar Styling Specifications & Accessibility Heuristics

Technical reference covering W3C CSS Scrollbars Level 1 standards, legacy WebKit vendor pseudo-elements, WCAG accessibility compliance rules, OS overlay vs classic scrollbars, and forced-colors system behavior.

---

## 1. W3C Standard CSS Scrollbars vs Legacy WebKit

| Capability | W3C Standard (`scrollbar-*`) | Legacy WebKit (`::-webkit-scrollbar-*`) |
| :--- | :--- | :--- |
| **Specification** | CSS Scrollbars Module Level 1 | Non-standard Vendor Pseudo-Elements |
| **Browser Support** | Firefox, Chrome 121+, Safari 17.4+, Edge 121+ | Chrome <121, Safari <17.4, Edge <121, Legacy WebKit |
| **Width Control** | `scrollbar-width: auto \| thin \| none` | `::-webkit-scrollbar { width: <length>; height: <length>; }` |
| **Color Control** | `scrollbar-color: <thumb-color> <track-color>` | `::-webkit-scrollbar-thumb`, `::-webkit-scrollbar-track` |
| **Border Radius / Padding** | Not supported (engine defaults) | Supported via CSS `border-radius`, `border` |
| **Hover / Active States** | Engine handles internally | Custom `:hover`, `:active` state styling supported |

---

## 2. Applicable WCAG 2.1 Guidelines & Success Criteria

### SC 1.4.11 Non-text Contrast (Level AA)
- **Requirement:** Visual information used to indicate states and user interface components must maintain a contrast ratio of at least **3:1** against adjacent colors.
- **Scrollbar Rule:** The scrollbar thumb color must have a **3:1 minimum contrast ratio** against the scrollbar track color AND the surrounding container background color.

### SC 2.1.1 Keyboard (Level A)
- **Requirement:** All functionality of the content must be operable through a keyboard interface without requiring specific timings for individual keystrokes.
- **Scrollbar Rule:** Overflow scroll containers (`overflow: auto` / `scroll`) must be focusable via keyboard (`tabindex="0"`) so keyboard users can navigate and scroll through overflow content using directional arrow keys or PageUp/PageDown.

### SC 2.4.7 Focus Visible (Level AA)
- **Requirement:** Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
- **Scrollbar Rule:** Scrollable containers must present a prominent `:focus-visible` outline or ring when focused via keyboard navigation.

---

## 3. OS Scrollbar Types: Classic vs Overlay

### Classic Scrollbars (Windows, Linux, macOS with Mouse)
- Occupy physical layout width (typically 12px - 17px).
- Permanently visible when content overflows.
- Direct interaction targets for mouse drag operations.
- Require careful contrast management so users can easily distinguish thumb position.

### Overlay Scrollbars (iOS, Android, macOS with Trackpad)
- Float above content without consuming layout width (`0px` scrollbar width).
- Transient visibility: appearing during scrolling gestures and fading out when idle.
- Managed by OS compositors; custom CSS width declarations are often suppressed or rendered as thin floating pill indicators.

---

## 4. Forced Colors & System Accessibility Modes

When users activate Windows High Contrast Mode or `forced-colors: active`:

1. **Color Overrides:** All custom CSS `background-color`, `color`, and `border-color` declarations on scrollbars are suppressed by the browser engine.
2. **System Palette Tokens:** Custom scrollbars must map to system tokens to remain visible:
   - `ButtonText`: Standard text / scroll thumb high-contrast color.
   - `Canvas`: Background high-contrast canvas color.
   - `Highlight`: Active focus or selection color.
3. **High Contrast CSS Guard:**
   ```css
   @media (forced-colors: active) {
     .accessible-scroll-region {
       scrollbar-color: ButtonText Canvas;
     }
     .accessible-scroll-region::-webkit-scrollbar-thumb {
       background: ButtonText;
       border: 1px solid Canvas;
     }
     .accessible-scroll-region::-webkit-scrollbar-track {
       background: Canvas;
     }
   }
   ```

# Reference: Accessibility and Styling

This reference covers the design tokens, accessibility constraints, keyboard navigation protocols, and responsive layout scaling logic required to design and build fully WCAG AA (and AAA) compliant **Segmented Controls**.

---

## 1. Accessibility Spec (Keyboard & Focus Mechanics)

Segmented Controls are highly interactive, and keyboard navigation must behave identically to standard OS inputs. Depending on the semantic role chosen (Radio Group vs. Tablist), follow the exact keyboard mapped below.

### Radio Group Pattern (`role="radiogroup"`)
- **Focus Transition:** Pressing `Tab` focuses the **active/checked** radio segment. Pressing `Tab` again immediately exits the group and focuses the next interactive element on the page.
- **Cycling Options:** Pressing `Left Arrow` or `Up Arrow` moves focus and checked state immediately to the preceding segment. If on the first item, focus wraps to the last item.
- **Cycling Options (Forward):** Pressing `Right Arrow` or `Down Arrow` moves focus and checked state immediately to the succeeding segment. If on the last item, focus wraps to the first item.
- **Selection Behavior:** Moving focus via arrow keys **immediately activates** the segment, updating the view or value without requiring `Space` or `Enter` keys.

### Tablist Pattern (`role="tablist"`)
- **Focus Transition:** Pressing `Tab` focuses the currently active Tab segment. Pressing `Tab` again moves focus to the associated active `tabpanel`, rather than skipping it.
- **Roving Focus:** Pressing `Left Arrow` or `Right Arrow` moves keyboard focus to the preceding or succeeding tab segment, but does **not** change the active view.
- **Selection Activation:** Keyboard users must press `Space` or `Enter` to confirm their selection and swap the active panel view. Once activated, the newly selected tab's `aria-selected` attribute becomes `true`, and all other tabs become `false`.

---

## 2. Design Tokens and Spacing Specifications

Segmented controls must remain spatially compact to be distinguishable from large site navigation or tab panels.

| Attribute | Small Segmented Control | Medium (Default) Control | Large Control |
| :--- | :--- | :--- | :--- |
| **Track Max Width** | `240px` – `320px` | `320px` – `480px` | `480px` – `640px` |
| **Track Height** | `32px` | `40px` | `48px` |
| **Track Padding** | `2px` | `4px` | `4px` |
| **Segment Corner Radius**| `4px` or Pill (`999px`) | `8px` or Pill (`999px`) | `12px` or Pill (`999px`) |
| **Font Size (Fluid)** | `12px` (`0.75rem`) | `14px` (`0.875rem`) | `16px` (`1rem`) |
| **Icon Sizing** | `12px` | `14px` | `16px` |
| **Internal Gap (Icon/Text)**| `4px` | `8px` | `8px` |

---

## 3. Responsive Scaling & Mobile Adaptation

### Rule 1: Fixed Container Limit
To ensure optimal readability and touch reachability, a horizontal segmented control should not exceed a maximum layout width of **640px**. Above this width, empty track space dilutes visual connectivity, and labels become too far apart for comfortable eye-tracking.

### Rule 2: Grid/Flex Justification (Mobile Reflow)
On desktop, Segmented Controls are usually positioned inline next to associated content or floated to the right side of page headers.
On mobile screens (below `600px` breakpoint):
1. **Full-width fluid stretch:** Change the CSS layout to `width: 100%` and allow buttons to stretch equally (`flex: 1 1 0%`).
2. **Icon Hide Fallback:** If there are 3 or more segments with icons, use media queries to hide the icons (`display: none`) on small screens, ensuring the critical text labels remain fully visible without truncation.

```css
@media (max-width: 480px) {
  .segmented-control__icon {
    display: none; /* Safely preserve horizontal layout space */
  }
}
```

### Rule 3: The Native Dropdown Swapping (`<select>`)
If the control contains 4 or 5 options with long text labels, a horizontal segmented control will break on viewports narrower than `360px`. Implement a clean layout swap to a native HTML `<select>` element.

```html
<!-- Visible on Desktop, Hidden on Mobile -->
<div class="segmented-control d-none d-md-flex" role="radiogroup" aria-label="Cycles">
  <!-- buttons -->
</div>

<!-- Hidden on Desktop, Visible on Mobile -->
<div class="select-wrapper d-flex d-md-none">
  <label for="mobile-cycle-select" class="sr-only">Choose cycle</label>
  <select id="mobile-cycle-select" class="native-dropdown">
    <option value="monthly">Monthly</option>
    <option value="annual" selected>Annual (Save 20%)</option>
    <option value="lifetime">Lifetime</option>
  </select>
</div>
```

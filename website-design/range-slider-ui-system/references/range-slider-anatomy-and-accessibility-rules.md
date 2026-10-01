# Range Slider Anatomy & Accessibility Reference

This reference guide establishes strict spatial metrics, WCAG AA contrast standards, keyboard interaction rules, and WAI-ARIA APG patterns for designing accessible range sliders across desktop and touch viewports.

---

## 1. Spatial Anatomy & Token Specifications

| Visual Layer | Desktop Dimension | Touch/Mobile Dimension | Token Constraint / Spec |
| :--- | :--- | :--- | :--- |
| **Track Rail Thickness** | `4px` to `6px` | `6px` to `8px` | `border-radius: 9999px` |
| **Visible Thumb Diameter** | `20px` to `24px` | `24px` to `28px` | `border: 2px solid var(--color-primary-main)` |
| **Touch Hit Target Size** | `24x24px` min (WCAG 2.2) | `44x44px` preferred | Expanded via transparent pseudo-element (`::before`) |
| **Focus Ring Offset** | `3px` offset | `4px` offset | `outline: 2px solid var(--color-focus-ring)` |
| **Floating Value Badge Offset** | `28px` above thumb | `36px` above thumb | Sit clearly above user's thumb during touch drag |

```text
       +------------------------------------+
       |  $250 USD                          |  <-- Floating Value Badge (min 4.5:1 contrast)
       +-----------------+------------------+
                         |  (Pointer)
                         v
                +-----------------+
                |   Touch Target  |
                |   (44x44px)     |
                |     +-----+     |
 ==============[=====]| (O) |[====]===================  <-- Active Track Fill vs Unselected Rail
                |     +-----+     |                         (min 3:1 graphical contrast)
                |   Visible Thumb |
                +-----------------+
```

---

## 2. WCAG AA Contrast Requirements

Range sliders contain both textual and non-text graphical UI components. All layers must meet WCAG 2.1 / 2.2 AA contrast standards:

1. **Active Track Fill vs. Unselected Rail (SC 1.4.11 Non-Text Contrast - 3:1):**
   - The boundary between the active filled track segment and the unselected rail background must have at least a **3.1:1** contrast ratio.
   - Example: Active Fill (`#2563EB` Royal Blue) vs. Unselected Rail (`#E5E7EB` Light Gray) = **4.6:1 ratio** (Pass).

2. **Thumb Handle Boundary vs. Page Background (SC 1.4.11 - 3:1):**
   - The outer border or body of the draggable thumb handle must have at least a **3:1** contrast ratio against the adjacent track and page background.
   - Example: White thumb with `#2563EB` border against `#FFFFFF` page background = **4.6:1 ratio** (Pass).

3. **Value Tooltips & Text Labels (SC 1.4.3 Contrast Minimum - 4.5:1):**
   - Dynamic floating badges, direct input numbers, legend milestone text, and helper labels must achieve a minimum **4.5:1** contrast ratio against their immediate background.
   - Example: Dark badge (`#111827`) with white text (`#FFFFFF`) = **14.5:1 ratio** (Pass).

4. **Focus Indicator Visibility (SC 2.4.13 Focus Appearance):**
   - When focused via keyboard `Tab`, the handle must render a prominent focus ring (e.g., `#3B82F6` blue outline) that contrasts at least **3:1** against the background and handle body.

---

## 3. Keyboard Navigation & WAI-ARIA APG Pattern

To satisfy WCAG 2.1 SC 2.1.1 (Keyboard Accessibility), range slider thumbs must be fully operable using keyboard standard keys according to the WAI-ARIA Authoring Practices Guide (APG).

### Keyboard Mapping Table

| Key Command | Action | Value Delta |
| :--- | :--- | :--- |
| `Tab` | Move keyboard focus to the slider thumb (or next thumb in dual sliders). | N/A |
| `Shift + Tab` | Move keyboard focus to previous interactive element. | N/A |
| `Arrow Right` / `Arrow Up` | Increase the slider value by 1 step increment. | `+step` (e.g., +$10) |
| `Arrow Left` / `Arrow Down` | Decrease the slider value by 1 step increment. | `-step` (e.g., -$10) |
| `Page Up` | Increase value by a larger step jump (e.g., 10% of total range). | `+10 * step` |
| `Page Down` | Decrease value by a larger step jump (e.g., 10% of total range). | `-10 * step` |
| `Home` | Jump slider thumb directly to minimum value (`aria-valuemin`). | Snap to `min` |
| `End` | Jump slider thumb directly to maximum value (`aria-valuemax`). | Snap to `max` |

---

## 4. WAI-ARIA State & Attribute Definitions

Each interactive thumb element must be assigned the following ARIA roles and properties:

- `role="slider"`: Informs screen readers that the element is an adjustable range control.
- `aria-label` or `aria-labelledby`:
  - Single-thumb slider: `aria-label="Cloud storage capacity"` or `aria-labelledby="storage-heading"`.
  - Dual-thumb slider: Distinct labels for each thumb: `aria-label="Minimum price bound"` on lower thumb, `aria-label="Maximum price bound"` on upper thumb.
- `aria-valuemin`: Numeric minimum bound (e.g., `aria-valuemin="0"`).
- `aria-valuemax`: Numeric maximum bound (e.g., `aria-valuemax="1000"`).
- `aria-valuenow`: Current numeric value (e.g., `aria-valuenow="250"`). Must update dynamically on drag or key press.
- `aria-valuetext`: Human-readable text string for screen readers when numeric values represent complex units (e.g., `aria-valuetext="$250 USD per month"` or `aria-valuetext="2 Hours 30 Minutes"`).
- `aria-orientation`: Explicitly set `aria-orientation="horizontal"` (default) or `aria-orientation="vertical"` for vertical slider tracks.

---

## 5. Touch Target Sizing & Hit Area Expansion (WCAG 2.2 SC 2.5.8)

On touch-first devices (mobile phones, tablets, kiosks), finger taps lack the pinpoint accuracy of mouse cursors:

- **Target Size Requirement:** WCAG 2.2 SC 2.5.8 requires a minimum target size of `24x24px` with sufficient spacing, while mobile platform guidelines (Apple HIG and Android Material Design) recommend `44x44px` to `48x48px`.
- **CSS Pseudo Hit-Area Expansion:** Keep the visual thumb sleek (`22px` circle) while expanding the interactive hit area to `44x44px` using transparent CSS pseudo-elements:

```css
.range-native-input::-webkit-slider-thumb {
  width: 22px;
  height: 22px;
  position: relative;
}

/* Invisible Touch Target Expansion */
.range-native-input::-webkit-slider-thumb::before {
  content: "";
  position: absolute;
  top: -11px;
  bottom: -11px;
  left: -11px;
  right: -11px;
  min-width: 44px;
  min-height: 44px;
}
```

---

## 6. Debouncing Screen Reader Announcements

When users rapidly drag a range slider thumb with mouse or touch, `aria-valuenow` updates dozens of times per second. Unfiltered live updates can cause screen reader speech engines to stutter or crash.

- **Debounce Strategy:** Throttle live `aria-valuetext` updates during active pointer drag events using `requestAnimationFrame` or a 100ms debounce timer.
- **Completion Announcement:** Always announce the final committed value immediately upon `pointerup` or `touchend`.

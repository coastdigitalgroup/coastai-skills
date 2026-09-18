# Interaction Media Features & Input Device Heuristics Reference

This reference outlines browser rendering behavior, operating system device mapping, feature definitions, and accessibility heuristics for CSS Level 4 Interaction Media Features (`pointer`, `hover`, `any-pointer`, `any-hover`).

---

## 1. Feature Definitions & Value Specification

### `pointer` (Primary Pointing Device Accuracy)
Evaluates the accuracy of the primary input pointing mechanism configured in the operating system.

| Value | Description | Typical Hardware |
| :--- | :--- | :--- |
| `fine` | Highly accurate pointing device. Small targets can be targeted easily. | Mouse, trackpad, graphics tablet stylus, trackball. |
| `coarse` | Limited accuracy pointing device. Targeting small hitboxes is difficult. | Touchscreen (finger), Wii remote, Kinect / motion controller. |
| `none` | The primary input device includes no pointing mechanism. | Keyboard-only setup, basic screen reader, voice navigation device. |

---

### `hover` (Primary Pointing Device Hover Capability)
Evaluates whether the primary pointing mechanism can conveniently hover over page elements without triggering a primary click/tap action.

| Value | Description | Typical Hardware |
| :--- | :--- | :--- |
| `hover` | Primary input mechanism can easily hover over elements. | Mouse, laptop trackpad, digital pen with hover distance detection. |
| `none` | Primary input mechanism cannot hover or hovering requires unnatural emulation (e.g., long-press). | Smartphone touchscreen, tablet touchscreen. |

---

### `any-pointer` & `any-hover` (All Connected Pointing Devices)
While `pointer` and `hover` evaluate only the **primary** pointing device (as determined by the OS), `any-pointer` and `any-hover` test if **at least one** connected input peripheral matches the specified capability.

#### Use Case Example:
An iPad Pro with a paired Bluetooth Apple Magic Trackpad:
- `pointer` = `coarse` (OS defaults primary pointer to finger touch).
- `hover` = `none` (Primary touch lacks hover capability).
- `any-pointer` = `fine` (Connected trackpad provides precision pointing!).
- `any-hover` = `hover` (Connected trackpad supports real hovering!).

---

## 2. Common Device & Hardware Matrix

| Device / Hardware Combination | `pointer` | `hover` | `any-pointer` | `any-hover` |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop / Laptop (Mouse & Trackpad)** | `fine` | `hover` | `fine` | `hover` |
| **Smartphone (iPhone / Android Phone)** | `coarse` | `none` | `coarse` | `none` |
| **Tablet (iPad / Galaxy Tab - Touch Only)** | `coarse` | `none` | `coarse` | `none` |
| **Tablet + Bluetooth Mouse / Magic Keyboard** | `coarse` / `fine`* | `none` / `hover`* | `fine` | `hover` |
| **Touchscreen Laptop (e.g., Surface Laptop + Trackpad)** | `fine` | `hover` | `coarse`, `fine` | `hover` |
| **Stylus Tablet (Wacom / Apple Pencil with Hover)** | `fine` | `hover` | `fine` | `hover` |
| **Smart TV / Gaming Console (Remote / D-Pad)** | `none` | `none` | `none` | `none` |

*\*Note: OS heuristics vary when switching dynamically between touch and trackpad input.*

---

## 3. WCAG 2.2 Target Size Requirements

| WCAG Success Criterion | Level | Minimum Dimensions | Rule & Exception Details |
| :--- | :--- | :--- | :--- |
| **SC 2.5.8 Target Size (Minimum)** | AA | **24px x 24px** | Target must be at least 24x24 CSS pixels unless undersized target has at least 24px offset circle from adjacent targets, or target is inline within text sentence. |
| **SC 2.5.5 Target Size (Enhanced)** | AAA | **44px x 44px** | Target size for touch inputs should be at least 44x44 CSS pixels. |

### Best Practice Protocol for `@media (pointer: coarse)`
When `pointer: coarse` is active (finger navigation):
1. **Button & Input Minimum Dimensions:** Set `min-height: 44px` and `min-width: 44px`.
2. **Hitbox Expansion via Pseudo-Elements:** If visual element must remain small (e.g., a 16px close icon), expand the click region using `::before` or `::after`:
```css
.close-icon-btn {
  position: relative;
  width: 16px;
  height: 16px;
}

@media (pointer: coarse) {
  .close-icon-btn::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 44px;
    min-height: 44px;
  }
}
```

---

## 4. Modern JavaScript Evaluation (`window.matchMedia`)

Do NOT rely on `'ontouchstart' in window` or user-agent strings. Instead, use `window.matchMedia`:

```javascript
// Synchronous check
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const supportsHover = window.matchMedia('(hover: hover)').matches;

// Dynamic listener for peripheral state changes (e.g., plugging in external mouse)
const pointerQuery = window.matchMedia('(pointer: coarse)');

function handlePointerChange(e) {
  if (e.matches) {
    document.body.classList.add('is-coarse-input');
  } else {
    document.body.classList.remove('is-coarse-input');
  }
}

pointerQuery.addEventListener('change', handlePointerChange);
handlePointerChange(pointerQuery);
```

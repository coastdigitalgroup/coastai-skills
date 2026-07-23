# Range Slider Accessibility & UX Audit Checklist

Use this structured template to audit existing single-thumb and dual-thumb range sliders in a codebase. For each item, evaluate the current state, classify issues, and map necessary remediation steps.

---

## 1. Metadata & Scope of Audit

- **Page URL / Component Name:** ________________________
- **Platform/Framework:** ________________________
- **Slider Type:** [ ] Single-Thumb  |  [ ] Dual-Thumb (Min/Max)
- **Primary Auditor:** ________________________
- **Date:** ________________________

---

## 2. Core Audit Checklist

### Category A: Semantic HTML & Accessibility Foundations
- [ ] **A1: Associated Labels**
  - *Requirement:* Every `<input type="range">` has a visible `<label>` referencing its `id` via `for`, or has a descriptive `aria-label`/`aria-labelledby` property.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **A2: Explicit Grouping (Dual-Thumb only)**
  - *Requirement:* The dual slider wrapper has `role="group"` (or `role="region"`) and an `aria-labelledby` or `aria-label` defining the group's intent (e.g., "Price Range Filter").
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **A3: No Custom DIV-only Sliders (Without Core ARIA)**
  - *Requirement:* If built with `<div>` or `<span>`, it must have explicit `role="slider"`, `tabindex="0"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and full keyboard keydown event handlers. (Note: Converting to native overlapping `<input type="range">` elements is the strongly preferred fix).
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **A4: Dynamic `aria-valuetext` Formatting**
  - *Requirement:* If values represent non-integer formats (e.g., $150, December 1st, 15mph), `aria-valuetext` dynamically maps to formatted strings so screen readers don't announce raw integers.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

---

### Category B: Keyboard & Input Operability
- [ ] **B1: Keyboard Focus Ring**
  - *Requirement:* Active handles display a highly visible focus indicator on keyboard tab navigation. The focus outline is not clipped by parent container overflow or masking rules.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **B2: Keyboard Adjustment keys**
  - *Requirement:* Focused thumbs increment/decrement correctly using:
    - Arrow keys (`ArrowLeft`/`ArrowRight`, `ArrowUp`/`ArrowDown`)
    - Page Up/Page Down keys (larger jumps)
    - Home/End keys (jump exactly to min/max boundaries)
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **B3: Non-Trapping Focus Sequence**
  - *Requirement:* Tab sequence enters the slider (focuses Min handle), moves to the Max handle, and exits cleanly. There are no focus loops or keyboard-trapping states.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **B4: Z-Index Deadlock Mitigation (Dual-Thumb only)**
  - *Requirement:* When min and max thumbs are positioned at the exact same value (or touching), hover, touch, or keyboard focus dynamically shifts the active input's `z-index` to the front. This prevents one handle from becoming unselectable.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

---

### Category C: Styling & Visual Ergonomics
- [ ] **C1: Visual Contrast**
  - *Requirement:* The slider track, active fill range highlight, and thumb handles have at least a 3:1 contrast ratio against the card background (WCAG 2.1 SC 1.4.11).
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **C2: Interactive Touch Target Padding**
  - *Requirement:* The touch target area of each thumb and the scrollable track spans at least 24x24px (WCAG 2.2 SC 2.5.8), preferably 44x44px.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **C3: Device Gesture Interception**
  - *Requirement:* Sliders are draggable on actual touch devices without triggering horizontal/vertical screen scrolling or pinch-to-zoom interference.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

- [ ] **C4: No Grouped CSS Vendor Selectors**
  - *Requirement:* Vendor pseudo-elements (e.g., `::-webkit-slider-thumb` and `::-moz-range-thumb`) are defined in completely separate CSS blocks. They must **not** be comma-separated in a single block, as this causes browsers to throw out the entire rule block.
  - *Pass/Fail:* _____
  - *Notes:* __________________________________________________

---

## 3. Audit Scoring Summary

| Section | Checked Items | Passed Items | Score (%) |
|---|---|---|---|
| **Category A: Accessibility Foundations** | 4 | ___ | ______% |
| **Category B: Operability & Keyboards** | 4 | ___ | ______% |
| **Category C: Styling & Gestures** | 4 | ___ | ______% |
| **TOTAL** | **12** | **___** | **______%** |

---

## 4. Remediation Backlog & Action Items

List all failing items discovered during the audit and prioritize correction tasks:

1. **[High Priority] Item Code: _____**
   - *Issue Description:* __________________________________________________
   - *Recommended Remediation:* ____________________________________________

2. **[Medium Priority] Item Code: _____**
   - *Issue Description:* __________________________________________________
   - *Recommended Remediation:* ____________________________________________

3. **[Low Priority] Item Code: _____**
   - *Issue Description:* __________________________________________________
   - *Recommended Remediation:* ____________________________________________

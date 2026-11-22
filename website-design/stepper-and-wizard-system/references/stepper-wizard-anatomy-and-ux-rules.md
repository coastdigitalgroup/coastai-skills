# Stepper & Wizard System Anatomy, Design Tokens & UX Rules

This document provides technical design specifications, spatial layout rules, color token mappings, and keyboard interaction guidelines for implementing steppers and setup wizards across desktop and mobile web interfaces.

---

## 1. Stepper Node & Connector Geometry

```text
[ COMPLETED NODE ]             [ CURRENT NODE ]              [ PENDING NODE ]
 +--------------+               +--------------+              +--------------+
 |     (✓)      | ===== 2px === |     (2)      | ----- 2px -- |     (3)      |
 |  Check Icon  |  Active Line  | Bold Number  | Neutral Line |  Reg Number  |
 +--------------+               +--------------+              +--------------+
     32x32px                         32x32px                       32x32px
```

### Dimensional Tokens

| Element | Desktop Token | Mobile Token (`< 640px`) | CSS Value / Property |
| :--- | :--- | :--- | :--- |
| **Node Container Diameter** | `32px` (`2.0rem`) | `28px` (`1.75rem`) | `width: 32px; height: 32px;` |
| **Node Border Width** | `2px` | `2px` | `border-width: 2px;` |
| **Connector Line Thickness** | `2px` | `2px` | `height: 2px;` |
| **Numeric Font Size** | `14px` (`0.875rem`) | `12px` (`0.75rem`) | `font-size: 0.875rem; font-weight: 700;` |
| **Checkmark Icon Size** | `16x16px` | `14x14px` | `width: 16px; height: 16px;` |
| **Label Text Size** | `14px` (`0.875rem`) | Hidden / Compact | `font-size: 0.875rem;` |
| **Minimum Touch Target** | `44x44px` | `44x44px` | `padding: 6px;` (via pseudo-element or button container) |

---

## 2. Color Tokens & Contrast Matrix

To meet **WCAG 2.1 / 2.2 AA non-text contrast (3:1)** and **text contrast (4.5:1)** requirements:

| State | Surface Fill Token | Border Stroke Token | Text / Icon Token | Connector Line Token |
| :--- | :--- | :--- | :--- | :--- |
| **Pending / Inactive** | `#F1F5F9` (Slate 100) | `#CBD5E1` (Slate 300) | `#64748B` (Slate 500) | `#E2E8F0` (Slate 200) |
| **Active / Current** | `#FFFFFF` (White) | `#2563EB` (Blue 600 - 2px) | `#2563EB` (Blue 600 - Bold) | `#E2E8F0` ahead / `#2563EB` behind |
| **Completed** | `#2563EB` (Blue 600) | `#2563EB` (Blue 600) | `#FFFFFF` (White Check Icon) | `#2563EB` (Blue 600 - Solid) |
| **Error / Invalid** | `#DC2626` (Red 600) | `#DC2626` (Red 600) | `#FFFFFF` (White Exclamation) | `#CBD5E1` |
| **Focus-Visible Ring**| Offset 2px | `#2563EB` (2px Solid) | N/A | N/A |

---

## 3. ARIA Semantics & Screen Reader Specifications

1. **Progress Nav Container:**
   - `<nav aria-label="Order Checkout Progress">`
2. **Ordered List Wrapper:**
   - `<ol class="stepper">`
3. **Current Step Item:**
   - `<li class="stepper__item" aria-current="step">`
   - Screen reader announcement: *"Step 2 of 4: Delivery Options, current step"*.
4. **Completed Navigable Step:**
   - Enclosed in `<a href="#step-1">` or `<button type="button">`.
   - Hidden text snippet via `.sr-only`: `<span class="sr-only">Step 1: Shipping Address, Completed. Click to edit.</span>`.
5. **Dynamic Branching Live Region:**
   - `<div aria-live="polite" aria-atomic="true" class="sr-only">`
   - When a step is added or removed dynamically: *"Step list updated. 5 total steps now remaining."*

---

## 4. Keyboard Navigation Rules

- **`Tab` Key:** Moves keyboard focus strictly to interactive, clickable step nodes (previously completed steps) and form controls within the current step canvas. Pending/future step nodes are skipped.
- **`Enter` / `Space` Key:** Activates a focused completed step node, navigating back to that step canvas.
- **`Shift + Tab` Key:** Reverses focus back to previous interactive elements.
- **Step Change Focus Reset:** When clicking "Next Step", JavaScript must move keyboard focus to the top heading (`<h2 id="step-title" tabindex="-1">`) of the newly active step panel.

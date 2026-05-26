---
name: rtl-layout-implementation
description:
  Implement and debug Right-to-Left (RTL) layouts using CSS Logical Properties
  to support internationalized websites without duplicating styles.
---

# RTL Layout Implementation

## Purpose

The RTL Layout Implementation skill provides a technical framework for building
websites that support Right-to-Left (RTL) languages (like Arabic, Hebrew, or
Persian) using CSS Logical Properties. It eliminates the need for "overriding"
styles (e.g., `margin-left: 0; margin-right: 20px;`) and ensures that layouts
adapt automatically based on the document's direction.

## Use Cases

- Internationalizing a website to support RTL languages.
- Building a multi-directional UI component library.
- Refactoring legacy "physical" CSS (left/right) to modern "logical" CSS
  (inline-start/inline-end).
- Fixing layout bugs that only appear when the `dir="rtl"` attribute is applied.

## When NOT to Use

- **Fixed-Direction Visuals:** When an element must always point in a specific
  physical direction regardless of language (e.g., a "back" button that
  literally means "physical left" in a specific technical diagram).
- **Media Assets:** Images, videos, and icons that don't need flipping (though
  some icons *do* need flipping, see Decision Rules).
- **Legacy Browser Support:** If the project must support very old browsers
  (e.g., IE11) without a build-time polyfill, as logical properties were
  introduced later.

## Inputs

1. **Target Layout/Component:** The CSS and HTML structure to be internationalized.
2. **Directional Context:** How the direction is toggled (usually `<html dir="rtl">`).
3. **Asset Inventory:** Icons and images that may require mirroring.

## Outputs

1. **Logical CSS:** Styles using `margin-inline`, `padding-block`, `inset-inline-start`, etc.
2. **Direction-Aware Assets:** CSS or logic to flip specific icons (e.g.,
  `transform: scaleX(-1)`).
3. **Typography Adjustments:** Font-family and line-height overrides for specific
  language scripts if necessary.

## Workflow

### 1. Set the Directional Root

Ensure the application's root element (usually `<html>`) has the `dir` attribute
dynamically set based on the active language.

### 2. Audit Physical Properties

Identify all CSS properties that reference "left" or "right":
- `margin-left`, `margin-right`
- `padding-left`, `padding-right`
- `border-left`, `border-right`
- `left`, `right` (for positioning)
- `text-align: left/right`
- `float: left/right`

### 3. Convert to Logical Properties

Replace physical properties with their logical counterparts:
- `margin-left` → `margin-inline-start`
- `padding-right` → `padding-inline-end`
- `border-top-left-radius` → `border-start-start-radius`
- `left: 10px` → `inset-inline-start: 10px`
- `text-align: left` → `text-align: start`

### 4. Handle Bidirectional Icons

- Identify icons that convey direction (e.g., arrows, progress bars, bicycle
  icons).
- Use a CSS selector like `[dir="rtl"] .icon-arrow { transform: scaleX(-1); }`
  or a logical property if applicable.

### 5. Adjust Typography

RTL scripts often require different font pairings or increased line-heights for
readability. Use `:lang()` selectors or `[dir="rtl"]` to apply these.

## Decision Rules

- **Logical over Physical:** Always default to logical properties for new code.
- **To Flip or Not to Flip:**
  - **Flip:** Arrows, directional metaphors (planes, cars), progress bars.
  - **Don't Flip:** Checkmarks, clocks, media player controls (play/pause),
    branding/logos.
- **Shadow Management:** Remember that `box-shadow` offsets are physical. In
  RTL, a positive horizontal offset still goes to the physical right. You may
  need to manually invert the X-offset for RTL.

## Constraints

- **Logical Property Support:** Modern browsers have excellent support, but
  verify against your project's browser list.
- **Scrollbar Placement:** Browsers handle scrollbar placement (left vs. right)
  automatically based on the `dir` attribute; don't try to force this with CSS.

## Non-Goals

- Translating text content.
- Handling date/time/number formatting (handled by JavaScript `Intl` API).
- Managing right-to-left vertical writing modes (e.g., traditional Mongolian).

## Common Failure Patterns

- **Partial Conversion:** Converting `margin-left` but forgetting
  `border-radius`.
- **Mirroring Everything:** Flipping icons that should remain static (like
  clocks or checkmarks), leading to a confusing UX.
- **Hardcoded Left/Right:** Using `!important` or high-specificity physical
  rules that break when the direction changes.
- **Inconsistent Alignment:** Mixing `text-align: start` with `float: left`.

## Validation Steps

- [ ] **Toggle Test:** Change the `dir` attribute from `ltr` to `rtl` and verify
  the layout mirrors correctly.
- [ ] **Icon Audit:** Ensure directional icons are flipped and static icons are
  not.
- [ ] **Interactive Elements:** Check that absolute-positioned elements (tooltips,
  modals) align correctly in both directions.
- [ ] **Input Verification:** Ensure text inputs and textareas behave correctly
  with RTL text (cursor position, alignment).

# RTL Compliance Audit Checklist

Use this checklist to audit a component or page for Right-to-Left (RTL)
compatibility.

## 1. Document Level
- [ ] Root element (`<html>`) has a dynamic `dir` attribute (`ltr` or `rtl`).
- [ ] Root element has a dynamic `lang` attribute (e.g., `ar`, `he`, `fa`).
- [ ] Document title and metadata update to the target language.

## 2. Layout & Spacing
- [ ] All `margin-left` and `margin-right` replaced with `margin-inline-start/end`.
- [ ] All `padding-left` and `padding-right` replaced with `padding-inline-start/end`.
- [ ] All `border-left` and `border-right` replaced with `border-inline-start/end`.
- [ ] Positioning (`left`, `right`) replaced with `inset-inline-start/end`.
- [ ] Flexbox/Grid layouts use `start/end` instead of `left/right`.
- [ ] Horizontal scrolls (if any) behave correctly in RTL.

## 3. Typography
- [ ] `text-align: left/right` replaced with `text-align: start/end`.
- [ ] Font pairings are appropriate for the target script (e.g., avoiding thin
      Latin fonts for heavy Arabic scripts).
- [ ] Line-height provides enough clearance for script-specific ascenders/descenders.

## 4. Components & Interactive Elements
- [ ] Form labels are correctly aligned to the `start` of the input.
- [ ] Input placeholders are aligned to the `start`.
- [ ] Search icons and submit buttons are correctly positioned.
- [ ] Tooltips and dropdowns anchor to the correct side.
- [ ] Modals and drawers slide in from the correct `start/end` side.

## 5. Visuals & Assets
- [ ] Directional icons (arrows, chevrons) are mirrored in RTL.
- [ ] Progress bars and loading indicators fill from `start` to `end`.
- [ ] Non-directional icons (checkmarks, locks, clocks) are **not** mirrored.
- [ ] Shadows with horizontal offsets are checked for directional consistency.
- [ ] Background images with `left/right` positions are converted to logical.

## 6. Functional Verification
- [ ] Tab order remains logical (usually Right-to-Left in RTL).
- [ ] Hover/Active states on `start/end` borders/shadows are correct.
- [ ] Sticky headers/footers maintain correct alignment.

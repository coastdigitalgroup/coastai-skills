# Interaction Media Queries Audit Checklist

Use this checklist to audit interactive frontend components for sticky hover glitches, target size accessibility, and hybrid input capability.

---

## 1. Sticky Hover & Visual State Audit

- [ ] **Check `:hover` Rules in CSS:** Are all non-essential visual hover transformations (`transform`, `scale`, `box-shadow`, `background-color` shifts) enclosed in `@media (hover: hover)` blocks?
- [ ] **Touch Tap Trapping Test:** On an actual iOS/Android device or Chrome DevTools touch emulator, tap interactive buttons/cards. Confirm that the visual hover state clears immediately upon releasing the tap.
- [ ] **`:active` State Presence:** Verify that buttons and links have an explicit `:active` state style to provide instant tactile feedback when tapped on touch screens without relying on `:hover`.
- [ ] **Focus Visible Preservation:** Ensure that keyboard focus rings (`:focus-visible`) function consistently on both `hover: hover` and `hover: none` devices.

---

## 2. Touch Target & Sizing Accessibility Audit (WCAG 2.2 Target Size)

- [ ] **Coarse Target Size Scaling:** Are interactive elements (buttons, form inputs, checkboxes, icon toggles) scaled to at least `44px x 44px` (or `48px x 48px`) when `@media (pointer: coarse)` is active?
- [ ] **Spacing Between Small Targets:** If interactive hitboxes are under `44px`, is there sufficient spacing (`gap: 12px` or padding) around them so adjacent elements do not overlap tap regions?
- [ ] **Form Input Font Size on iOS:** Are `<input>` and `<select>` font sizes set to at least `16px` on `pointer: coarse` screens to prevent iOS Safari from forcing an unwanted layout zoom on focus?

---

## 3. Hover-Dependent Content & Disclosure Audit

- [ ] **Hidden Action Unreachability Check:** Search for secondary controls (e.g., "Delete", "Edit", "Quick View", or tooltip triggers) hidden behind `:hover`.
- [ ] **`hover: none` Fallback Verification:** Verify that components using hover disclosures render those actions permanently visible (inline or in an action menu) when `@media (hover: none)` matches.
- [ ] **Flyout & Submenu Navigation:** Confirm that multi-level dropdown menus or flyout panels can be triggered via click/tap or `:focus-within` on touch devices, rather than depending solely on `:hover`.

---

## 4. Hybrid Device & JavaScript Synchronization Audit

- [ ] **Dynamic Peripherals Test:** If testing on a hybrid laptop (e.g., Microsoft Surface or iPad with trackpad), verify that attaching or detaching a mouse/trackpad seamlessly updates input-dependent UI elements.
- [ ] **`matchMedia` Event Listeners in JS:** If JavaScript evaluates pointer features (`window.matchMedia('(pointer: coarse)')`), confirm that an event listener (`.addEventListener('change', ...)`) is attached to react dynamically to peripheral changes.
- [ ] **No UA or `ontouchstart` Sniffing:** Ensure the codebase contains zero legacy `'ontouchstart' in window` or user-agent string regex checks for touch device detection.

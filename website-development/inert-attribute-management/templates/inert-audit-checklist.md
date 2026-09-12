# Inert Attribute Implementation Audit Checklist

Use this checklist to verify that non-interactive or off-screen DOM subtrees are properly isolated using the native HTML `inert` attribute without focus leaks, screen reader issues, or browser search bugs.

---

## 1. DOM Architecture & Root Containers

- [ ] **Top-Level Separation:** Are modal overlays, side drawers, and toast alerts rendered outside the primary document container (`#page-wrapper` or `<main>`), allowing background content to be marked `inert` as a single unit?
- [ ] **Declarative Inactive States:** Are hidden or off-screen panels (e.g. step 2/3 of a wizard, collapsed tab panels, off-screen slides) initialized with the `inert` attribute in HTML (`<div class="panel" inert>`)?
- [ ] **No Child Un-Inert Attempts:** Confirm that code does not attempt to set `childElement.inert = false` on an element nested inside an inert parent (browser engines enforce recursive tree-level inertia).

---

## 2. Keyboard & Focus Management

- [ ] **Sequential Navigation Containment:** With the overlay active and background `inert`, press `Tab` and `Shift+Tab` 20+ times. Does keyboard focus strictly cycle inside the active component without escaping to the background?
- [ ] **Initial Focus Placement:** When `inert` is applied to the background and the overlay opens, is focus immediately directed to an interactive element or heading inside the active overlay?
- [ ] **Focus Restoration:** When the overlay closes and `inert` is removed from the background, is focus restored to the original trigger element (`document.activeElement`)?
- [ ] **Shortcuts & Access Keys:** Verify that keyboard access keys or global hotkeys bound to background controls do not trigger while the background is `inert`.

---

## 3. Assistive Technology & Screen Readers

- [ ] **Virtual Cursor Isolation:** Using a screen reader (VoiceOver, NVDA, or JAWS), navigate line-by-line using arrow keys or rotor navigation. Is all background content completely skipped by the virtual cursor?
- [ ] **Landmark & Heading Navigation:** Press heading keys (`H`) or landmark keys (`D`) in the screen reader while `inert` is active on background content. Confirm off-screen/background headings and landmarks are omitted.
- [ ] **No `aria-hidden` Mismatches:** Confirm that `inert` is used instead of manual `aria-hidden="true"` loops on background content, avoiding conflicts where child components override `aria-hidden`.

---

## 4. Browser Behavior & Text Search (`Ctrl+F`)

- [ ] **In-Page Search Suppression:** Press `Ctrl+F` (or `Cmd+F`) and search for a unique text snippet present in the inert background subtree. Does the search return **0 results**?
- [ ] **No Unintended Page Scroll:** Confirm that searching or interacting with the active overlay never causes the browser window to auto-scroll to an off-screen inert element.
- [ ] **Autofill & Form Validation Exclusions:** Verify that form inputs inside an inert panel (such as inactive wizard steps) are ignored by browser autofill suggestions and HTML native form validation checks on submit.

---

## 5. Pointer & Touch Interactions

- [ ] **Click & Tap Blocking:** Try clicking or tapping exposed sections of the background container while `inert` is active. Confirm that no click handlers fire and hover states are suppressed.
- [ ] **Visual Feedback (`:inert` Pseudo-Class):** Does the CSS include visual dimming or cursor rules targeting `:inert` / `[inert]` (e.g. `user-select: none; pointer-events: none; opacity: 0.5;`)?

---

## 6. Stacked Overlays & Dynamic Mutations

- [ ] **Reference Counting / Stack Hierarchy:** When Overlay A opens (making page inert) and then Overlay B opens over Overlay A (making Overlay A inert), does closing Overlay B return interactivity to Overlay A while keeping the background page inert?
- [ ] **Dynamic DOM Additions:** Insert a new button or link into the inert background subtree using JavaScript while the overlay is open. Confirm the newly added element is automatically inert without needing manual event re-binding.
- [ ] **Cleanup on Unmount:** If an overlay component is destroyed or unmounted from the DOM, are all corresponding background `inert` attributes safely cleaned up?

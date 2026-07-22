# Focus Trap Audit Checklist

This audit checklist is designed to help frontend developers and accessibility reviewers evaluate interactive overlays (modals, drawers, sliding menus) for correct, robust focus trapping and WCAG compliance.

---

## 1. Keyboard Navigation Verification (Manual Audit)

Perform these tests on a desktop browser using only your keyboard (`Tab`, `Shift + Tab`, `Enter`, `Space`, `Escape`).

- [ ] **Initial Focus Placement:**
  - [ ] When the overlay is activated, does keyboard focus immediately move inside the overlay?
  - [ ] Is focus placed on a logical element? (e.g., the first input field in a form, the close button in a message, or the modal container itself with `tabindex="-1"` if it is informational).
- [ ] **Tab Traversal (Forwards):**
  - [ ] Press `Tab` repeatedly. Does focus cycle through all interactive elements in the overlay?
  - [ ] When you press `Tab` on the **last** focusable element in the overlay, does focus wrap immediately to the **first** focusable element?
  - [ ] Confirm focus *never* escapes to elements on the parent page (such as the header, footer, or side links).
- [ ] **Shift + Tab Traversal (Backwards):**
  - [ ] Press `Shift + Tab` repeatedly. Does focus cycle backwards through elements?
  - [ ] When you press `Shift + Tab` on the **first** focusable element, does focus wrap immediately to the **last** focusable element?
- [ ] **Single Element Isolation:**
  - [ ] If the overlay contains only *one* focusable element (e.g., a simple alert with a single "OK" button), does pressing `Tab` or `Shift + Tab` keep focus locked onto that single element? (It should not leak to the browser address bar or the background document).
- [ ] **Escape Key Behavior:**
  - [ ] Press `Escape` while focus is inside the overlay. Does the overlay immediately close?
  - [ ] Does pressing `Escape` prevent default actions if they conflict?
- [ ] **Focus Restoration:**
  - [ ] Close the overlay (via `Escape`, a "Close" button, or click-outside).
  - [ ] Does keyboard focus immediately return to the exact button or link that triggered the overlay?
  - [ ] Verify focus is *not* lost, dropped onto the top of the body (`<body>`), or reset to the top of the webpage.

---

## 2. Accessibility Tree & Semantics (DOM Audit)

Inspect the page markup inside browser Developer Tools when the overlay is active.

- [ ] **Aria-Hidden / Sibling Isolation:**
  - [ ] When the overlay is active, do all sibling elements and background content containers have `aria-hidden="true"` or `inert` applied? (This prevents screen readers and virtual cursors from exploring background contents).
  - [ ] Are these background isolation attributes removed as soon as the overlay is deactivated?
- [ ] **Hidden Content Check:**
  - [ ] Are off-screen or visually hidden interactive elements (like a closed sliding drawer) excluded from the tab order? (Verify they have `tabindex="-1"`, `display: none`, `visibility: hidden`, or `inert` when inactive).
- [ ] **Visual Focus Indicator:**
  - [ ] Do all interactive elements inside the overlay have a highly visible, high-contrast focus indicator (focus ring) when tabbed to?
  - [ ] Does the visual focus match system styles or branding focus outlines (meeting WCAG 2.1 AA contrast requirements of 3:1 against background colors)?

---

## 3. Dynamic DOM & Complex Interactions

Verify the robustness of your focus trapping against dynamic page changes.

- [ ] **Conditional/Dynamic Content:**
  - [ ] If elements are dynamically shown, hidden, enabled, or disabled inside the overlay (e.g., error messages, accordion sections, tab panels, lazy-loaded components), does the focus trap correctly incorporate them into the loop when active?
  - [ ] Are disabled buttons (`disabled` or `aria-disabled="true"`) excluded from the active tab ring?
- [ ] **No Browser Memory Leaks:**
  - [ ] When the overlay is deactivated, are all event listeners (`keydown`, `mousedown` etc.) bound to the `document` or `window` for the trap fully removed?
- [ ] **Click Outside to Close:**
  - [ ] If "click outside to close" is enabled, does clicking the backdrop overlay correctly trigger deactivation?
  - [ ] Does clicking *inside* the overlay container correctly keep the trap active and ignore the click-outside trigger?

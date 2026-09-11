# HTML `inert` Attribute Audit Checklist

Use this checklist to verify that DOM subtree isolation via the native HTML `inert` attribute is implemented correctly, cleanly handles focus, suppresses keyboard and screen reader interaction, and avoids common architecture pitfalls.

---

## 1. Subtree Architecture & DOM Structure

- [ ] **Sibling Layout Isolation:** Are root page layout regions (e.g., `<header>`, `<main>`, `<footer>`) structured as siblings to overlay elements (modals, drawers, bottom sheets)?
- [ ] **No Inert Ancestor Trap:** Is the active overlay container positioned OUTSIDE any subtree marked `inert`? (Verifies that setting `inert` on background regions does not inadvertently freeze the active overlay).
- [ ] **Target Precision:** Is `inert` applied to top-level structural containers rather than individual buttons/inputs or `document.body` directly?

---

## 2. Keyboard & Focus Management

- [ ] **Tab Trapping Outside Overlay:** When an overlay is active and background regions are `inert`, does pressing `Tab` and `Shift+Tab` strictly cycle focus inside the overlay?
- [ ] **No Focus Leaks:** Verify that no background links, buttons, form inputs, or custom controls receive focus while the overlay is open.
- [ ] **Focus Shift on Open:** When an overlay opens, does focus automatically move into the active overlay container (e.g., first input, close button, or modal dialog wrapper)?
- [ ] **Clean Focus Restoration:** When the overlay closes, is `inert` removed and focus cleanly returned to the element (e.g., trigger button) that initiated the action?

---

## 3. Screen Reader & Accessibility Tree Inspection

- [ ] **Virtual Cursor Exclusion:** Activate VoiceOver, NVDA, or JAWS. Use screen reader arrow key navigation. Confirm background headings, text, lists, and images are completely skipped.
- [ ] **Accessibility Tree Verification:** Inspect the browser DevTools Accessibility tree. Confirm that subtrees marked `inert` are hidden from the accessibility tree or flagged as ignored/inert.
- [ ] **No `aria-hidden` Conflicts:** Confirm `aria-hidden="true"` is not redundantly mixed with `inert` unless required by legacy browser support matrices.

---

## 4. Pointer Events & Mouse/Touch Interaction

- [ ] **Background Click/Tap Suppression:** Attempt to click or tap on buttons or links in the background while an overlay backdrop is transparent or partially visible. Confirm no click events trigger.
- [ ] **No Hover Effects:** Hover mouse over background elements marked `inert`. Confirm CSS `:hover` states and `cursor: pointer` styles are suppressed.
- [ ] **Text Selection Prevention:** Attempt to click and drag to highlight text inside an inert subtree. Confirm text selection is blocked natively.

---

## 5. Browser Find-in-Page (Ctrl+F) Suppression

- [ ] **In-Page Search Suppression:** Press `Ctrl+F` or `Cmd+F` and search for text present exclusively inside an inert subtree. Confirm zero search results are matched or highlighted.

---

## 6. Cascading Overlays & Multi-Step Logic

- [ ] **Reference Count Stack:** If Overlay B opens over Overlay A, does closing Overlay B keep the main page content `inert` until Overlay A also closes?
- [ ] **Inactive Step Isolation:** In multi-step forms or tabbed panels, are inactive off-screen/faded steps marked `inert` to prevent off-screen focus or form submission?

---

## 7. Visual Affordance & `:inert` CSS

- [ ] **Visual Distinction:** Are inert regions visually distinguished (e.g., reduced opacity, grayscale, or backdrop blur) to signal non-interactive state to users?
- [ ] **`:inert` Selector Usage:** Are CSS rules defined using `el:inert` or `[inert]` rather than manual temporary CSS utility classes?

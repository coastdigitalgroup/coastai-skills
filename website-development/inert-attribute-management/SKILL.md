---
name: inert-attribute-management
description:
  Isolate DOM subtrees from focus, user interaction, screen reader virtual navigation,
  and in-page search using the native HTML inert attribute and JavaScript state management.
---

# HTML `inert` Attribute Management

## Purpose

The `inert-attribute-management` skill provides a standardized protocol, JavaScript state manager, and auditing procedure for isolating non-interactive DOM subtrees using the native HTML `inert` attribute.

Without `inert`, disabling background elements during overlay states (modals, slide-out drawers, bottom sheets, mobile menus) or hiding inactive step content (multi-step forms, tabs, carousels) requires brittle combinations of `tabindex="-1"`, `aria-hidden="true"`, `pointer-events: none`, and event listener cancellation. These fragmented workarounds frequently leak focus via Tab key navigation, leave elements reachable by screen reader virtual cursors, allow text selection and browser text search (Ctrl+F), or break keyboard accessibility when overlays open and close.

The `inert` boolean attribute natively disables all user focus, pointer/touch events, text selection, screen reader accessibility tree exposure, and browser find-in-page for an entire HTML element and its descendant tree. This skill covers how to declaratively apply `inert`, imperatively manage stacked overlay states with reference counting, handle focus preservation and restoration, and apply visual `:inert` styling.

---

## Use Cases

- **Modal & Drawer Background Isolation:** Making `#main-content`, headers, and footers completely non-interactive and inaccessible to assistive technology while custom modal dialogs or sliding drawers are open.
- **Stacked & Cascading Overlays:** Managing multiple open layers (e.g., a modal opening a sub-dialog or slide-over drawer) where lower overlays must temporarily become inert without losing their active state configuration.
- **Inactive Multi-Step Form Panels:** Disabling inactive steps in a wizard form so off-screen or faded steps cannot receive focus, keyboard inputs, or screen reader reading focus.
- **Off-Screen Navigation Drawers:** Rendering collapsed mobile navigation menus in the DOM for smooth CSS transform animations while ensuring they remain non-interactive until opened.
- **Disabled UI Subtrees:** Disabling entire form sections (e.g., shipping address forms when "Same as billing" is checked) without iterating over every individual form control.

---

## When NOT to Use

- **Native `<dialog>` with `showModal()`:** Top-layer modal dialogs opened via `dialogElement.showModal()` automatically make document siblings inert natively in modern browsers. Do not manually apply `inert` to siblings unless supporting fallback modal implementations.
- **Single Interactive Form Controls:** Disabling a single `<button>` or `<input>`. Use the native HTML `disabled` attribute instead.
- **Hiding Content Permanently or Conditionally:** Removing elements from layout completely. Use `display: none` or the HTML `hidden` attribute, which removes elements from both render tree and accessibility tree without needing `inert`.
- **Purely Decorative Visual Fading:** Lowering visual opacity without suppressing keyboard focus, pointer events, or screen reader interaction.

---

## Inputs

1. **Target Subtree Container(s):** The DOM elements (e.g., `<main>`, `#app-root`, `.drawer-panel`) to render inert or restore to active status.
2. **UI State Trigger:** State transitions such as overlay open/close events, step navigation changes, or form panel toggles.
3. **Active Focus Container:** The element intended to receive user focus when background subtrees become inert.

---

## Outputs

1. **Inert-Gated DOM Subtrees:** Elements marked with the boolean `inert` attribute (e.g., `<main inert>`), suppressing pointer events, focusability, accessibility tree representation, and search indexing.
2. **Preserved Focus & State Stack:** Reference-counted stack tracking active and inert states across cascading UI layers, ensuring clean focus restoration when overlays close.
3. **Visual Inactive Styling:** CSS rules matching the `:inert` pseudo-class to visually differentiate non-interactive background content (e.g., opacity reduction, blur, non-pointer cursor).

---

## Workflow

### 1. Identify Background Subtrees to Isolate
Group root page layout regions into distinct structural containers (e.g., `<header>`, `<main id="main-content">`, `<footer>`, `<aside id="drawer">`). Avoid applying `inert` to `document.body` directly if overlays are child nodes of `body`.

### 2. Apply Declarative or Imperative Inert Switching
- **Declarative HTML:** For inactive multi-step wizard panels or collapsed tab content, apply `inert` directly in HTML or template state:
  ```html
  <section class="wizard-step" inert>...</section>
  ```
- **Imperative JS for Overlays:** When an overlay opens, set `inert = true` on sibling root containers:
  ```javascript
  const mainContent = document.getElementById('main-content');
  mainContent.inert = true;
  ```

### 3. Maintain Stacked Reference Counting for Cascading Layers
When multiple overlays open sequentially (e.g., Page -> Drawer -> Confirmation Modal):
- Incremental state manager increments an `inertCount` map for background elements.
- An element remains `inert` as long as `inertCount > 0`.
- Only when all parent overlays close (`inertCount === 0`) is the `inert` property set to `false`.

### 4. Manage Focus Shift and Restoration
- **Before marking background inert:** Save `document.activeElement` to a focus restore reference.
- **After marking background inert:** Programmatically move focus to the newly active overlay (e.g., `dialog.focus()` or first focusable control inside the dialog).
- **Upon closing overlay:** Remove `inert` from background subtrees, then restore focus to the saved element reference.

### 5. Pair `:inert` CSS with User Experience Signals
Provide visual affordances that reflect non-interactive state while preventing user pointer confusion:
```css
/* Style background when rendered inert by an active overlay */
main:inert,
aside:inert {
  opacity: 0.5;
  pointer-events: none;
  user-select: none;
  filter: grayscale(40%);
  transition: opacity 0.2s ease;
}
```

---

## Decision Rules

| Use Case | Recommended Strategy | Rationale |
| :--- | :--- | :--- |
| **Custom Drawer / Modal Dialog** | Imperative `element.inert = true` on root siblings (`<main>`, `<header>`) | Completely blocks background keyboard navigation, screen reader speech, and click events without manual `tabindex` / `aria-hidden` toggling. |
| **Native `<dialog>` via `showModal()`** | Native browser handling (No manual `inert` needed) | Browser automatically places top-layer dialog above page and marks backdrop contents inert natively. |
| **Multi-Step Form Panels** | Declarative `inert` attribute on non-active `<fieldset>` or `<section>` steps | Keeps DOM elements mounted for zero layout re-registration while preventing validation or tab focus on hidden steps. |
| **Collapsible Drawer Animation** | `inert` during hidden/animating state, remove `inert` when visible | Keeps off-screen drawer mounted for CSS `transform` transitions while preventing off-screen tabbing. |
| **Single Disabled Form Fieldset** | `fieldset.disabled = true` | Native `<fieldset disabled>` already disables child form controls natively without altering global page interaction. |

---

## Constraints

- **DOM Ancestry Trap:** Setting `inert` on a container renders ALL descendant nodes inert. An active modal or drawer MUST NOT be a child of an element marked `inert`. Structure app layouts with overlay containers placed as siblings to main page content wrappers.
- **Browser Support:** Native `inert` is supported in all modern browsers (Chrome 102+, Safari 15.5+, Firefox 105+, Edge 102+). For legacy environments (IE11 or ancient Safari), load a light WICG `inert` polyfill.
- **Search & Selection Suppression:** Browsers hide `inert` subtrees from Ctrl+F / Cmd+F find-in-page searches. Do not use `inert` on content that users should be able to search or copy while visible.
- **Focus Loss Guard:** If focus is currently inside an element when it becomes `inert`, the browser automatically moves focus to `document.body`. Always capture `document.activeElement` and explicitly shift focus into the active container *before* or *immediately after* setting `inert`.

---

## Non-Goals

- Replacing native `<dialog>` browser semantics where native modals can be used.
- Acting as a complete focus trap library for modal interior navigation (pair `inert` for *outside* isolation with a focus trap or roving tabindex for *inside* isolation).
- Replacing `display: none` or `visibility: hidden` for permanent element removal.

---

## Common Failure Patterns

1. **Placing Modals Inside Inert Parent Containers:**
   - *Problem:* Applying `inert` to `<div id="app">` when the modal dialog is rendered inside `#app`.
   - *Result:* The modal dialog becomes inert too, rendering the entire application frozen and unresponsive.
   - *Fix:* Move overlay portals/containers outside `#app` or apply `inert` selectively to sibling layout regions (`<main>`, `<header>`).

2. **Forgetting Focus Restoration:**
   - *Problem:* Opening a drawer sets `<main inert>`, shifting focus to `body` when the trigger button becomes inert, then restoring `<main>` without focusing back on the trigger.
   - *Result:* Keyboard users lose their position on the page and jump back to the top of the document.
   - *Fix:* Store `document.activeElement` prior to setting `inert` and call `.focus()` on it after clearing `inert`.

3. **Confusing `aria-hidden="true"` with `inert`:**
   - *Problem:* Using `aria-hidden="true"` alone to block background interaction.
   - *Result:* Screen readers ignore the content, but keyboard Tab key navigation and pointer clicks still interact with background links and buttons.
   - *Fix:* Use native `inert`, which handles accessibility tree exclusion, pointer events, AND focusability simultaneously.

4. **Reference Count Race Conditions:**
   - *Problem:* Opening Overlay A (makes Main inert), then opening Overlay B over Overlay A (makes Main inert again). Closing Overlay B immediately sets Main `inert = false` while Overlay A is still open.
   - *Result:* Background content becomes interactable underneath Overlay A.
   - *Fix:* Use a reference-counting manager class (`InertSubtreeManager`) that tracks active overlay depth before removing the `inert` attribute.

---

## Validation Steps

- [ ] **Tab Trapping Check:** Open the overlay/drawer. Press `Tab` and `Shift+Tab` repeatedly. Confirm focus cycles strictly within the overlay and never jumps to background elements.
- [ ] **Screen Reader Virtual Cursor Check:** Turn on VoiceOver (Cmd+F5) or NVDA (Insert+Space). Navigate with arrow keys while an overlay is active. Confirm background heading, text, and link nodes are completely skipped.
- [ ] **Pointer Interaction Check:** Click or tap on background elements visible behind a semi-transparent overlay backdrop. Confirm zero hover effects, cursor changes, or click event execution.
- [ ] **Find-In-Page Check:** Press `Cmd+F` / `Ctrl+F` and search for text present only in the background inert subtree. Confirm zero search matches returned.
- [ ] **Focus Restoration Check:** Open overlay with keyboard (Enter/Space on trigger button), then press `Escape` or click close button. Confirm focus cleanly returns to the exact trigger element.

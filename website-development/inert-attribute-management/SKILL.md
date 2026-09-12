---
name: inert-attribute-management
description:
  Isolate inactive DOM subtrees from keyboard focus, screen readers, text search,
  and pointer interactions using the native HTML inert attribute and stacked state management.
---

# Inert Attribute Management

## Purpose

`inert` is a boolean HTML attribute that instructs browser engines to treat a DOM subtree as completely non-interactive. When applied to an element, all descendant elements are removed from sequential keyboard navigation (`tabindex`), hidden from accessibility trees (screen readers and virtual cursors), excluded from browser text search (`Ctrl+F` / `Cmd+F`), and blocked from pointer or touch interactions.

This skill provides a standardized protocol, JavaScript state manager, and auditing procedure for managing inert subtrees across complex UI components—such as modal overlays, off-canvas drawers, multi-step form wizards, slide-out carts, and collapsed tab/accordion panels—without relying on destructive `tabindex` mutations or fragile `aria-hidden` hacks.

## Use Cases

- **Modal Dialogs & Slide-Out Drawers:** Marking the primary page content (`<main>`, `<header>`, `<footer>`) as `inert` while a modal or slide-over panel is open, ensuring keyboard focus and screen readers cannot escape into the background.
- **Multi-Step Form Wizards:** Isolating inactive step panels in a multi-step form so inputs in hidden steps cannot receive accidental keyboard focus or browser autofill validation errors.
- **Collapsed Menus & Navigation Drawers:** Applying `inert` to closed mobile navigation menus or megamenus that use CSS transforms (`translate3d`) or opacity animations, preventing off-screen links from receiving focus while hidden.
- **Tabbed Interfaces & Carousels:** Marking non-visible tab panels or off-screen slide cards as `inert` so screen readers and keyboard users do not navigate through invisible slides.
- **Nested & Stacked Overlays:** Managing multiple overlapping modals or drawers (e.g., a modal opening a secondary confirmation drawer) using reference counting so background layers stay inert until all active overlays close.

## When NOT to Use

- **Native `<dialog>` with `showModal()`:** When using the native `<dialog>` element opened via `.showModal()`, the browser automatically marks all other document elements as inert. Do not manually toggle `inert` on background elements in this case unless polyfilling or handling custom top-layer structures.
- **Temporarily Disabled Individual Controls:** Do not apply `inert` to a single form field or button when only that control is disabled. Use the standard HTML `disabled` attribute or `aria-disabled="true"` instead.
- **Simple CSS Hiding (`display: none` or `hidden`):** Elements hidden with `display: none` or `visibility: hidden` are already excluded from layout, paint, tab order, and accessibility trees. Use `inert` when elements remain in the DOM tree or maintain layout/paint states (such as animating off-screen or maintaining scroll position) but must lose interactivity.

## Inputs

1. **Target Subtree Container:** The root DOM element(s) to be marked inert or active (e.g., `#main-content`, `.wizard-step:not(.active)`).
2. **Activation Context:** The component triggering the state change (e.g., Modal open/close event, Wizard step transition, Mobile menu toggle).
3. **Stacking Hierarchy:** Information on whether the active component opens over another active component (requiring nested reference counting).
4. **Focus Restoration Element:** The trigger element (`document.activeElement`) that should regain focus when the overlay or temporary state closes.

## Outputs

1. **Declarative DOM State:** Target elements modified with `element.inert = true` or `element.inert = false` (or `element.setAttribute('inert', '')` / `element.removeAttribute('inert')`).
2. **Managed Subtree Instance:** A stack-aware JavaScript manager (`InertSubtreeManager`) that coordinates inert state transitions without clobbering concurrent UI states.
3. **CSS Styling Hooks:** Optional visual styles targeting the `:inert` pseudo-class for dimming, pointer-events, or selection suppression.
4. **Accessible Experience:** Complete keyboard and screen reader isolation of non-active subtrees without focus leaks or `Ctrl+F` ghost matches.

## Workflow

### Step 1: Identify Inactive DOM Subtrees

Identify all root containers outside the active interaction context. In standard single-page or multi-layer web layouts, structure the HTML with distinct top-level section wrappers:

```html
<body>
  <!-- Primary Document Flow -->
  <div id="page-wrapper">
    <header>...</header>
    <main id="main-content">...</main>
    <footer>...</footer>
  </div>

  <!-- Overlay Containers (outside main document flow) -->
  <div id="modal-root" role="region" aria-label="Modals"></div>
</body>
```

### Step 2: Apply the `inert` Attribute on State Activation

When an overlay (e.g., slide-out drawer or modal) opens:

1. Capture the currently focused element (`const previousFocus = document.activeElement`).
2. Apply `inert` to the background document wrapper (`document.getElementById('page-wrapper').inert = true`).
3. Move focus to the first focusable element or heading within the active overlay.

```javascript
function openDrawer(drawerElement) {
  const pageWrapper = document.getElementById('page-wrapper');

  // Mark background page inert
  pageWrapper.inert = true;

  // Show drawer
  drawerElement.classList.add('is-open');
  drawerElement.inert = false;

  // Set focus into drawer
  const focusTarget = drawerElement.querySelector('[autofocus], button, input, [tabindex="0"]');
  if (focusTarget) focusTarget.focus();
}
```

### Step 3: Remove `inert` and Restore Focus on Deactivation

When the overlay closes:

1. Remove `inert` from the background document wrapper (`page-wrapper.inert = false`).
2. Hide or animate out the overlay.
3. Restore focus to the captured trigger element (`previousFocus.focus()`).

```javascript
function closeDrawer(drawerElement, previousFocus) {
  const pageWrapper = document.getElementById('page-wrapper');

  // Restore background page interactivity
  pageWrapper.inert = false;

  // Hide drawer and mark it inert if it remains in DOM
  drawerElement.classList.remove('is-open');
  drawerElement.inert = true;

  // Restore focus
  if (previousFocus && typeof previousFocus.focus === 'function') {
    previousFocus.focus();
  }
}
```

### Step 4: Handle Stacked Overlays with Reference Counting

When opening secondary overlays over primary overlays (e.g., a confirmation dialog over an open drawer):

1. Do NOT blindly remove `inert` from background elements when any overlay closes.
2. Use a reference counting or stack-based state manager (`InertSubtreeManager`) that tracks active isolation requests per element.
3. Keep the element `inert` as long as its isolation count is greater than zero (`refCount > 0`).

### Step 5: Add Progressive Styling with `:inert`

Enhance visual feedback for inert subtrees using the native `:inert` pseudo-class (or attribute selectors for fallback):

```css
/* Dim and disable user text selection on inert subtrees */
:inert,
[inert] {
  user-select: none;
  -webkit-user-select: none;
  pointer-events: none;
}

/* Optional visual indicator for debugging or design specs */
.page-container:inert {
  opacity: 0.6;
  filter: grayscale(20%);
  transition: opacity 0.2s ease, filter 0.2s ease;
}
```

## Decision Rules

- **`inert` vs `aria-hidden="true"` + `tabindex="-1"`:**
  - ALWAYS prefer `inert`. `aria-hidden="true"` only hides elements from screen readers; it does NOT remove keyboard focus from child interactive elements or stop `Ctrl+F` search. Manually toggling `tabindex="-1"` on all children breaks original `tabindex` values and fails on dynamically added child elements.
- **`inert` vs `display: none` / `visibility: hidden`:**
  - Use `display: none` when an element should be completely removed from layout, paint, and accessibility trees.
  - Use `inert` when an element must maintain layout size, participate in CSS transitions/animations (e.g., sliding off-screen), or maintain scroll positions while being completely non-interactive.
- **HTML Attribute vs. JS Property:**
  - In HTML templates, set the boolean attribute declaratively: `<div class="step" inert>`.
  - In JavaScript DOM manipulation, set the boolean property directly: `element.inert = true;`.

## Constraints

- **Browser Support:** Native support is baseline across all modern browsers (Chrome 102+, Edge 102+, Safari 15.5+, Firefox 105+). For legacy browser environments (e.g., Internet Explorer or old WebKit engines), include WICG `wicg-inert` polyfill.
- **DOM Inheritance:** The `inert` attribute applies recursively to all descendants of the target element. You cannot "un-inert" a child element inside an inert parent by setting `childElement.inert = false`.
- **Top Layer Exemption:** Elements rendered in the browser's Native Top Layer (such as `<dialog>.showModal()` or Popover API overlays) escape standard document subtree inertia.

## Non-Goals

- Replacing native HTML form field validation or individual field disabling (`disabled` attribute).
- Building full modal dialog keyboard trapping logic from scratch (use `<dialog>` or dedicated focus trap implementations).
- Managing global application state or routing outside DOM interactivity boundaries.

## Common Failure Patterns

- **The Child Inert Override Trap:** Attempting to make a child element interactive inside an inert parent container (`<parent inert><child inert="false"></child></parent>`). Browser rendering engines strictly enforce tree-level inheritance—child elements inside an inert container are always inert.
- **Fragmented HTML Layouts:** Placing modal overlays *inside* the main page content wrapper (`<main><div class="modal">...</div></main>`). Setting `main.inert = true` will render the modal inside it inert as well! Always place overlays outside the main page container or use Native Top Layer / Portal mechanisms.
- **Blind Property Clobbering:** Setting `element.inert = false` when closing a sub-dialog while a parent modal is still open, exposing the background page to keyboard focus while an overlay is still active.
- **Page Search Leakage (`Ctrl+F`):** Relying on `aria-hidden="true"` or `pointer-events: none` instead of `inert` for off-screen sliding panels. Pressing `Ctrl+F` finds off-screen text, unexpectedly scrolling the container or moving focus off-screen.

## Validation Steps

1. **Sequential Keyboard Navigation Test:** Open the overlay or state transition. Press `Tab` and `Shift+Tab` repeatedly. Confirm focus cycles exclusively within the active element and never lands on background content.
2. **Screen Reader Virtual Cursor Audit:** Enable VoiceOver, NVDA, or JAWS. Navigate through the page using headings (`H`), landmarks (`D`), or swipe gestures. Verify background elements are completely invisible to the screen reader.
3. **Browser Text Search (`Ctrl+F`) Test:** Trigger browser in-page search (`Ctrl+F` / `Cmd+F`) and search for visible text known to exist in the inert background subtree. Confirm zero results are returned and the browser does not scroll to the background.
4. **Pointer Event Verification:** Click or tap on exposed parts of the background wrapper while `inert` is active. Confirm no click handlers trigger and cursor interactions are blocked.
5. **Stacked Overlay Restoration Test:** Open Overlay A (marking page inert), then open Overlay B (marking Overlay A inert). Close Overlay B; verify Overlay A becomes interactive again while page remains inert. Close Overlay A; verify page becomes interactive.

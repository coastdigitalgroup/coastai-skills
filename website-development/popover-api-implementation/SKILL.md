---
name: popover-api-implementation
description:
  Implement and debug non-modal overlays like menus, dropdowns, and tooltips
  using the native HTML Popover API for automatic top-layer management and
  light-dismiss behavior.
---

# Popover API Implementation

## Purpose

The Popover API Implementation skill provides a technical protocol for building
non-modal overlays using native browser capabilities. It eliminates the need for
complex `z-index` management, manual "click-outside" logic, and focus trapping
for non-modal elements by leveraging the browser's built-in "top layer" and
"light dismiss" behaviors.

## Use Cases

- Implementing action menus, dropdowns, and nested submenus.
- Creating "megamenus" that appear on hover or click.
- Building rich-content tooltips and "tours" that don't block the main page.
- Implementing non-modal notifications or status indicators.
- Transitioning from legacy `z-index` hacks to a native stacking model.

## When NOT to Use

- **Modal Dialogs:** If the user *must* interact with the overlay before
  continuing (e.g., a confirmation dialog), use the `<dialog>` element with
  `showModal()` instead. Popovers are non-modal by default.
- **Persistent Sidebars:** If the content is meant to be always visible or part
  of the standard document flow, do not use the Popover API.
- **Legacy Browser Support:** If you must support browsers older than mid-2023
  (e.g., Safari < 17, Chrome < 114) without a polyfill.

## Inputs

1. **Popover Content:** The HTML element to be displayed as an overlay.
2. **Invoker Element:** The button or control that triggers the popover.
3. **Dismissal Logic:** Whether the popover should close when clicking outside
   (auto) or only via specific actions (manual).
4. **Positioning Strategy:** CSS Anchoring, absolute positioning, or dynamic JS
   positioning.

## Outputs

1. **Semantic HTML:** Elements using the `popover` attribute and `popovertarget`.
2. **Top-Layer Styling:** CSS targeting the `:popover-open` pseudo-class and
   `::backdrop`.
3. **Accessibility Metadata:** Programmatic links between the invoker and the
   popover (handled natively but verifiable).
4. **Interaction Logic:** JS listeners for transition events (`beforetoggle`,
   `toggle`) if complex state management is needed.

## Workflow

### 1. Define the Popover Element

Add the `popover` attribute to the element you want to use as an overlay.
Assign it a unique `id`.

```html
<div id="my-popover" popover>
  <p>Popover content goes here.</p>
</div>
```

### 2. Connect the Invoker

Add the `popovertarget` attribute to a `<button>` or `<input type="button">`,
pointing to the popover's `id`.

```html
<button popovertarget="my-popover">Open Popover</button>
```

### 3. Configure Dismissal Behavior

- **Auto (Default):** Use `popover="auto"` for "light-dismiss" behavior (closes
  on `Esc` or clicking outside).
- **Manual:** Use `popover="manual"` if you need full control over closing (e.g.,
  it stays open until a specific close button is clicked).

### 4. Style for the Top Layer

Use the `:popover-open` pseudo-class to style the popover when active. Note that
the element is promoted to the **top layer**, meaning it sits above all other
content regardless of parent `z-index` or `overflow`.

```css
[popover]:popover-open {
  border: 1px solid #ccc;
  padding: 1rem;
}

[popover]::backdrop {
  background-color: rgba(0, 0, 0, 0.1);
}
```

### 5. Handle Positioning

- **Basic:** Use absolute positioning.
- **Advanced:** Use the **CSS Anchor Positioning API** to pin the popover to the
  trigger button without JavaScript. It reached Baseline in 2026 (Chrome 125+,
  Firefox 132+, Safari 18.2+), though `@position-try` edge-flipping needs
  Safari 18.4+.
- **Fallback:** Use a JS library (like Floating UI) to calculate positions if
  Anchor Positioning is not yet supported in the target browsers.

### 6. Manage Transitions

Use the `beforetoggle` event to add entrance/exit animations.

```javascript
popover.addEventListener('beforetoggle', (event) => {
  if (event.newState === 'open') {
    // Start entrance animation
  } else {
    // Start exit animation
  }
});
```

## Decision Rules

- **Popover vs. Dialog:** Use **Popover** for transient, non-blocking UI
  (menus, tooltips). Use **Dialog** (`showModal`) for blocking UI that traps
  focus and requires a response.
- **Auto vs. Manual:** Use `auto` for 90% of cases. Use `manual` only for persistent
  UI like a multi-step tutorial where clicking the background should not close the
  step.
- **CSS vs. JS Invocation:** Prefer `popovertarget` for simple toggling. Use
  `.showPopover()` and `.hidePopover()` in JS only when the trigger logic is
  complex (e.g., conditional opening).

## Constraints

- **Single "Auto" Popover:** Opening a new `popover="auto"` will automatically
  close other active `auto` popovers (unless they are nested).
- **No Focus Trap:** Unlike `showModal()`, the Popover API does not trap focus
  within the element. This is intentional for non-modal UI.
- **Top Layer Isolation:** Styles from the main document apply, but the element
  is physically removed from the parent's layout constraints.

## Non-Goals

- Implementing full modal dialog behavior (use the `<dialog>` skill).
- Managing global state (Redux/Zustand) for multiple popovers.
- Building the Anchor Positioning API polyfill from scratch.

## Common Failure Patterns

- **Z-index Wars:** Attempting to use `z-index` to put things *over* a popover.
  Popovers live in the top layer; nothing in the standard document flow can be
  above them.
- **Accessibility Disconnect:** Using a `<div>` as a trigger instead of a
  `<button>`. `popovertarget` works best on buttons to ensure keyboard
  operability.
- **Broken Transitions:** Forgetting that `display: none` (the default state of
  a popover) cannot be animated directly without using `@starting-style` or
  transitioning `display` (modern browsers).
- **Missing Backdrop Style:** Forgetting to style `::backdrop`, which can make
  the popover blend into the background.

## Validation Criteria

- [ ] **Top Layer Check:** Inspect the element in DevTools; verify it appears in
      the `#top-layer` section.
- [ ] **Light Dismiss Test:** With `popover="auto"`, verify the popover closes
      when pressing `Esc` or clicking the backdrop.
- [ ] **Keyboard Invocation:** Tab to the trigger button and press `Enter` or
      `Space`. Verify the popover opens.
- [ ] **Accessibility Audit:** Use a screen reader to verify that the popover
      is announced as expanded/collapsed when the trigger is used.
- [ ] **Layout Isolation:** Verify that the popover is not clipped by a parent
      with `overflow: hidden`.

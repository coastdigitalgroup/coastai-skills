# Popover Mechanics and Top Layer

Understanding the Popover API requires understanding how it interacts with the browser's rendering engine and the accessibility tree.

## The Top Layer

Elements with the `popover` attribute, when open, are promoted to the **Top Layer**. This is a special layer in the browser that sits above all other content.

- **Stacking Independence:** The popover is rendered outside the standard CSS stacking context of its parents. A parent with `z-index: 1` or `overflow: hidden` will *not* clip or cover a popover.
- **Single Source of Truth:** Only one `popover="auto"` can be at the top of the stack at a time (excluding nested popovers). Opening a new one closes the previous one.
- **Accessibility:** Promotion to the top layer does not change the element's position in the DOM tree, but it does ensure it is visually prominent.

## Light Dismiss vs. Manual

The `popover` attribute accepts two primary values:

| Feature | `popover="auto"` | `popover="manual"` |
|---------|------------------|--------------------|
| **Click Outside** | Closes automatically | Stays open |
| **Escape Key** | Closes automatically | Stays open |
| **New Popover** | Closes when another opens | Stays open |
| **Use Case** | Menus, dropdowns, tooltips | Multi-step tours, persistent alerts |

## Popover vs. Dialog (`<dialog>`)

While they look similar, they serve different semantic and functional purposes:

| Feature | Popover API | `<dialog>.showModal()` |
|---------|-------------|-------------------------|
| **Modality** | Non-modal (page remains interactive) | Modal (rest of page is inert) |
| **Focus Trap** | No focus trapping | Focus is trapped inside |
| **Light Dismiss** | Built-in (auto) | Manual (requires JS or `cancel` event) |
| **Backdrop** | Interactive/Optional | Non-interactive (blocks clicks) |
| **Best For** | Menus, Tooltips, Help text | Confirmations, Forms, Alerts |

## Transitions and Animations

Historically, `display: none` elements could not be animated. The Popover API works with new CSS features to solve this:

- **`allow-discrete`**: Allows transitioning properties like `display` and `overlay`.
- **`@starting-style`**: Defines the "before" state of an element as it is added to the DOM or shown.
- **`overlay` property**: Manages the promotion to the top layer during transitions.

## Browser Support (as of mid-2024)

- **Chrome/Edge:** 114+
- **Safari:** 17+
- **Firefox:** 125+
- **Polyfill:** A robust polyfill exists for older browsers (`@oddbird/popover-polyfill`).

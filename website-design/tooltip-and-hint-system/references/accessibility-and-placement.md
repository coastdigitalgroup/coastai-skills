# Accessibility and Placement References

## WCAG 2.1 Compliance (SC 1.4.13)

When a tooltip is triggered by hover or focus, it must meet three criteria:

1.  **Dismissible:** A mechanism is available to dismiss the content without moving pointer hover or keyboard focus (e.g., the `Escape` key).
2.  **Hoverable:** If pointer hover can trigger the additional content, then the pointer can be moved over the additional content without the content disappearing.
3.  **Persistent:** The additional content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

## ARIA Implementation

```html
<!-- The Anchor -->
<button aria-describedby="tooltip-save">
  <svg>...</svg>
</button>

<!-- The Tooltip -->
<div id="tooltip-save" role="tooltip" hidden>
  Save changes to your profile
</div>
```

## Spatial Hierarchy

1.  **Top (Primary):** The "natural" position. Does not block the cursor or the content immediately below.
2.  **Bottom:** Use when the anchor is at the top of the viewport.
3.  **Right/Left:** Use in sidebars or narrow columns where vertical space is constrained.

## Timing Guidelines

- **Appearance Delay:** 300ms - 500ms. Prevents "visual noise" when the user is simply moving their mouse across the screen to a different target.
- **Disappearance Delay:** 0ms - 200ms. Quick dismissal once the user moves away, but a tiny buffer prevents flickering if they move the mouse back quickly.

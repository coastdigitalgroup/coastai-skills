# Tooltip ARIA and Interaction Reference

## WCAG 2.2 Success Criterion 1.4.13: Content on Hover or Focus

For tooltips to be compliant, they must follow these three rules:

1. **Dismissible:** A mechanism is available to dismiss the additional content
   without moving pointer hover or keyboard focus (e.g., the `Escape` key).
2. **Hoverable:** If pointer hover can trigger the additional content, then the
   pointer can be moved over the additional content without the additional
   content disappearing.
3. **Persistent:** The additional content remains visible until the hover or
   focus trigger is removed, the user dismisses it, or its information is no
   longer valid.

## ARIA Attributes for Tooltips

| Attribute          | Role              | Requirement                                                                              |
| :----------------- | :---------------- | :--------------------------------------------------------------------------------------- |
| `role="tooltip"`   | Tooltip Container | Identifies the element as a tooltip.                                                     |
| `aria-describedby` | Trigger Element   | Links the trigger to the tooltip `id`. Best for supplementary info.                      |
| `aria-labelledby`  | Trigger Element   | Links the trigger to the tooltip `id`. Best if the tooltip is the _name_ of the trigger. |
| `aria-live`        | Status Region     | Usually NOT needed for tooltips unless they update dynamically while open.               |

## Interaction Timing

- **Entrance Delay:** 300ms–500ms. Prevents tooltips from flashing while the
  user moves their mouse across the page.
- **Exit Delay:** 250ms. Allows the user enough time to move the mouse from the
  trigger to the tooltip content (required for SC 1.4.13).

## Mobile Considerations

On touch devices, there is no "hover" state.

- **Option A:** Replace the tooltip with persistent "helper text" below the
  label.
- **Option B:** Toggle the tooltip on a "tap" event, ensuring a second tap or a
  tap elsewhere closes it.
- **Option C:** Use a Modal or Bottom Drawer for the information if it's long.

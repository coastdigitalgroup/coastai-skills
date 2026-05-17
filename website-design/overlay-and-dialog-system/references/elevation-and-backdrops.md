# Elevation and Backdrops

Visual layering is critical for overlays to communicate depth and hierarchy.
Without proper elevation cues, users may not realize they are looking at a
temporary layer.

## 1. The Backdrop (Scrim)

The backdrop serves two purposes: focus and interaction blocking.

- **Modal Backdrop:** Use a semi-transparent dark (or light) color to dim the
  primary interface.
  - _Recommendation:_ `rgba(0, 0, 0, 0.5)` or `blur(4px)`.
- **Drawer Backdrop:** Same as modal. It signals that the parent page is
  temporarily "inactive."
- **Popover Backdrop:** Usually none. Popovers should allow the user to see the
  background clearly, though they may still block clicks elsewhere.

## 2. Elevation (Shadows)

Shadows provide a "lift" from the page.

- **Level 1 (Popover):** Light, tight shadow. Indicates it is just above the
  trigger.
- **Level 2 (Modal/Drawer):** Large, soft shadow. Indicates significant depth
  and separation from the base content.

## 3. Z-Index Strategy

Maintain a consistent stacking order to prevent "Z-Index wars."

| Layer              | Z-Index Range | Description                                             |
| :----------------- | :------------ | :------------------------------------------------------ |
| **Base**           | 0 - 10        | Primary content.                                        |
| **Navigation**     | 100 - 200     | Sticky headers and menus.                               |
| **Backdrop**       | 1000          | The dimming layer.                                      |
| **Drawer / Modal** | 1010 - 1050   | The primary overlay content.                            |
| **Popover**        | 1100          | Sits above modals (e.g., a date picker inside a modal). |
| **Toast**          | 1200          | Sits at the very top of everything.                     |

## 4. Accessibility & Contrast

- **Backdrop Contrast:** Ensure the overlay's border or shadow makes it distinct
  from the backdrop.
- **Click-to-Close:** If the backdrop is visible, users expect clicking it to
  close the overlay (unless it's a destructive modal).
- **Inert Content:** While a Modal or Drawer is open, the background content
  (`aria-hidden="true"`) must not be focusable or clickable.

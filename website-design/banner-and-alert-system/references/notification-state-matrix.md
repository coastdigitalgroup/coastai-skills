# Notification State Matrix

This matrix standardizes the visual and semantic application of notification
levels across the **Banner and Alert System**.

| Level   | Color (Base) | Icon (Standard) | ARIA Role | Use Case Example                     |
| :------ | :----------- | :-------------- | :-------- | :----------------------------------- |
| **Info**    | Blue / Gray  | `info-circle`   | `status`  | Maintenance announcements, new features |
| **Success** | Green        | `check-circle`  | `status`  | "Form submitted," "Payment received" |
| **Warning** | Amber        | `exclamation-!` | `status`  | "Trial ending," "Low storage"        |
| **Error**   | Red          | `x-circle`      | `alert`   | "Payment failed," "Connection lost"  |

---

## Accessibility Guidelines (WCAG AA)

### 1. Contrast Requirements
- **Text Contrast:** Ensure a minimum of **4.5:1** ratio for all alert text
  against the alert background.
- **Icon Contrast:** Ensure icons have at least **3:1** contrast.
- **Action Contrast:** Buttons or links within the alert must be clearly
  distinguishable from the background.

### 2. Semantic Labels
- Use `aria-label="Close"` for the 'X' dismiss button.
- For `role="alert"`, the browser will immediately notify screen readers. Use
  sparingly for only truly critical information.
- Use `aria-labelledby` to link the alert container to its Title/Description.

### 3. Motion & Animation
- If a banner "slides" into view, ensure the animation is short (< 300ms).
- Respect `prefers-reduced-motion` settings.

## Decision Tree: Which pattern to use?

1. **Does the user HAVE to acknowledge this before anything else?**
   - Yes -> **Modal** (Overlay System)
   - No -> *Go to 2*

2. **Is this a reaction to a specific user action (e.g. Save)?**
   - Yes -> **Inline Alert** (placed near the action)
   - No -> *Go to 3*

3. **Does this affect the entire application (e.g. Maintenance)?**
   - Yes -> **Global Banner** (Top of screen)
   - No -> **Page Banner** (Below header)

4. **Is this a temporary, low-priority status update (e.g. Copied)?**
   - Yes -> **Toast** (Overlay System)
   - No -> **Alert/Banner**

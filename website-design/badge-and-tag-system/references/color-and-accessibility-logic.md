# Color and Accessibility Logic

This reference defines the semantic color mapping and accessibility requirements for the Badge and Tag System.

## 1. Semantic Color Mapping

| Meaning | Key Usage | Background (Light) | Text/Icon Color |
| :--- | :--- | :--- | :--- |
| **Success** | Active, Verified, On Sale | Light Green (#E6F4EA) | Dark Green (#137333) |
| **Warning** | Pending, Low Stock | Light Yellow (#FEF7E0) | Dark Orange (#B06000) |
| **Error** | Out of Stock, Failed | Light Red (#FCE8E6) | Dark Red (#C5221F) |
| **Info** | New, Featured, Info | Light Blue (#E8F0FE) | Dark Blue (#174EA6) |
| **Neutral** | Categories, Tags, Metadata | Light Gray (#F1F3F4) | Dark Gray (#3C4043) |

## 2. Contrast Requirements (WCAG 2.1 AA)

- **Text-to-Background:** Must be at least **4.5:1**.
- **Icon-to-Background:** Must be at least **3:1** for decorative icons, but **4.5:1** if the icon is the only indicator of status.
- **UI Component Boundaries:** If the badge has no background (outline only), the border must have at least **3:1** contrast against the page background.

## 3. Accessibility Best Practices

### No Color-Only Meaning
Never use color alone to convey status.
- **Bad:** A plain red circle for "Error."
- **Good:** A red circle with an "X" icon or the word "Error."

### Screen Reader Support
- **Status Badges:** Use `aria-label` or hidden text if the badge is just an icon.
- **Removable Tags:** The "X" button must have an `aria-label="Remove [Tag Name]"` so the user knows what they are deleting.
- **Live Regions:** If a badge updates dynamically (e.g., a notification count), consider using `aria-live="polite"` on the parent container.

### Keyboard Navigation
- Interactive tags must be reachable via `Tab`.
- They must have a visible **focus state** (e.g., a 2px blue ring).
- Users should be able to trigger the "Remove" action using the `Enter` or `Space` key.

## 4. Typography Scale

For badges and tags, typography should be clear but secondary:
- **Desktop:** 12px (0.75rem)
- **Mobile:** 12px (0.75rem) — do not shrink further as it becomes illegible.
- **Letter Spacing:** Optional 0.02em to 0.05em for all-caps variants to improve readability.

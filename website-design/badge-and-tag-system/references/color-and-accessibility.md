# Color and Accessibility Reference

Using color in Badges and Tags is powerful but must be handled with strict
adherence to accessibility (WCAG) standards. Never use color alone to convey
meaning.

## 1. Semantic Color Mapping

| Category    | Background (Light) | Text Color         | Intent / Meaning                      |
| :---------- | :----------------- | :----------------- | :------------------------------------ |
| **Success** | `#DCFCE7` (Green)  | `#166534` (D-Green)| Completed, Paid, Verified, Active.    |
| **Warning** | `#FEF9C3` (Yellow) | `#854D0E` (Brown)  | Pending, Expiring, Low Stock.         |
| **Danger**  | `#FEE2E2` (Red)    | `#991B1B` (D-Red)  | Overdue, Error, Cancelled, Deleted.   |
| **Info**    | `#DBEAFE` (Blue)   | `#1E40AF` (D-Blue) | New, Featured, Processing.            |
| **Neutral** | `#F3F4F6` (Gray)   | `#374151` (D-Gray) | Category, Archived, Metadata.         |

*Note: Hex codes based on Tailwind CSS 100/800 scale for guaranteed 4.5:1 contrast.*

---

## 2. Accessibility Checkpoints

### The "Color Plus" Rule
Color should only reinforce what is already present in text or iconography.
- **Fail:** Using a green circle and a red circle to indicate "Pass" vs "Fail" without text.
- **Pass:** Using the word "Pass" in a green badge and "Fail" in a red badge.

### Contrast Requirements (WCAG 2.1 AA)
1. **Text Contrast:** The text inside a badge/tag must have a **4.5:1** ratio against the component's background.
2. **UI Component Contrast:** The border or background of the badge/tag (if it provides critical info) should ideally have a **3:1** ratio against the page background.
3. **Focus States:** For interactive tags, the focus ring must have a **3:1** contrast ratio against the background.

---

## 3. High-Contrast (Dark) Mode Patterns

When implementing Dark Mode, invert the logic:
- **Style:** Use "Tonal" backgrounds (low opacity of the color) with high-vibrancy text.
- **Example:**
  - Background: `rgba(34, 197, 94, 0.2)` (Subtle Green)
  - Text: `#4ADE80` (Bright Green)

---

## 4. Typography Scale for Small Components

To ensure legibility at small sizes, use the following guidelines:

| Size (rem) | Size (px) | Tracking (Letter Spacing) | Usage                           |
| :--------- | :-------- | :------------------------ | :------------------------------ |
| 0.875rem   | 14px      | Normal                    | Standard Tags                   |
| 0.75rem    | 12px      | `+0.025em` (Wide)         | Standard Badges                 |
| 0.625rem   | 10px      | `+0.05em` (Extra Wide)    | Micro-badges (Use sparingly!)   |

*Wider letter-spacing (tracking) improves legibility for small, all-caps or semibold text.*

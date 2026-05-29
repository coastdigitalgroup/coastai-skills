# Badge and Tag Anatomy Template

This template defines the structural and visual rules for creating consistent
Badge and Tag components.

## 1. Visual Specification (CSS-like tokens)

| Property          | Badge (Pill)         | Tag (Rounded)        | Notes                                     |
| :---------------- | :------------------- | :------------------- | :---------------------------------------- |
| **Font Size**     | 0.75rem (12px)       | 0.8125rem (13px)     | Tags are slightly larger for legibility.  |
| **Font Weight**   | 600 (Semibold)       | 500 (Medium)         |                                           |
| **Border Radius** | 9999px (Pill)        | 4px (Rounded)        | Shape distinction is key.                 |
| **Padding (V)**   | 2px                  | 4px                  |                                           |
| **Padding (H)**   | 8px                  | 10px                 |                                           |
| **Border**        | None (Solid)         | 1px Solid (Outline)  | Default styles to distinguish them.       |

---

## 2. Structural Anatomy

### The Badge (Status)
```text
[ (Icon) TEXT ]
  ^      ^
  |      +-- 1-2 words, Sentence Case
  +--------- Optional, 12px size, 4px gap
```

### The Tag (Category/Interactive)
```text
[ (Icon) TEXT (Close) ]
  ^      ^      ^
  |      |      +-- Dismissible only (20x20px hit area)
  |      +--------- 1-2 words
  +---------------- Optional, decorative
```

---

## 3. Responsive Behavior

- **Desktop:** Display in a horizontal row (`flex-direction: row`).
- **Mobile:**
  - Wrap to multiple lines if they exceed container width (`flex-wrap: wrap`).
  - Increase vertical gap between wrapped rows (min 8px).
  - Dismissible Tags: Ensure the "Close" icon hit area increases to 44x44px if possible, or keep the whole tag as a 44px hit area.

---

## 4. Accessibility Annotations

### Badges (Non-interactive)
- **Role:** None (decorative/text) or `role="status"` if it updates dynamically.
- **Hidden Meaning:** If the color conveys meaning, ensure the text does too.
  - *Bad:* `[ ]` (Red box)
  - *Good:* `[ Error ]` (Red box + Text)

### Tags (Interactive)
- **Role:** `button` (if clickable) or `listitem` (if in a list of categories).
- **Aria-Label:** For dismissible tags, the close button must have a clear label.
  - *Markup:* `<button aria-label="Remove 'Software' tag">Software <span aria-hidden="true">×</span></button>`

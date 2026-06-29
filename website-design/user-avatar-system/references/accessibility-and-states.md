# Accessibility and States Reference

## 1. Accessibility Standards (WCAG 2.1)

### Non-Text Content (1.1.1)
- **Rule:** Every avatar must have a text alternative.
- **Implementation:**
  - If the avatar is the only identifier: `alt="Jane Doe"`.
  - If the avatar is next to the name "Jane Doe": `aria-hidden="true"` on the
    image to prevent redundant announcement.
  - For group overflows: `aria-label="3 others"`.

### Use of Color (1.4.1)
- **Rule:** Color cannot be the only way to convey status.
- **Implementation:**
  - **Online:** Solid circle.
  - **Away:** Ring/Outline circle.
  - **Busy:** Solid circle with a "minus" or "X" symbol inside.
  - **Offline:** Muted gray/dotted outline.

### Contrast (Minimum) (1.4.3)
- **Rule:** Fallback initials must have a contrast ratio of at least 4.5:1.
- **Accessible Color Palette Examples:**
  - Dark Blue (#0044CC) with White text.
  - Deep Purple (#660099) with White text.
  - Forest Green (#006600) with White text.
  - *Avoid:* Yellow, Light Cyan, or Bright Green as backgrounds for white text.

## 2. Interactive States

Apply these visual shifts to interactive avatars:

| State | Visual Treatment | Transition |
| :--- | :--- | :--- |
| **Default** | Base image/color. | N/A |
| **Hover** | Subtle brightness increase (110%) or elevation shadow. | 150ms ease |
| **Focus** | 2px solid brand-colored ring with 2px offset. | Instant |
| **Active/Press** | Subtle scale down (0.95) or brightness decrease (90%). | 100ms ease |
| **Disabled** | 50% opacity, grayscale filter. | 200ms ease |

## 3. Loading (Skeleton) States

When an avatar is in a loading state:
- Use a neutral gray circle (#E0E0E0).
- Apply a "shimmer" animation moving from left to right.
- Maintain the exact dimensions of the intended avatar size to prevent
  Layout Shift (CLS).

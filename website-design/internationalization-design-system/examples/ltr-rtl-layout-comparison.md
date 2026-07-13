# LTR vs RTL Layout Comparison

This example demonstrates how a standard marketing section with a "Split" layout (50/50) and a navigation header adapts from a Left-to-Right (LTR) environment to a Right-to-Left (RTL) environment.

## 1. Global Header

### LTR (English/Latin)
- **Logo:** Top-Left.
- **Nav Links:** Center or Right-aligned.
- **User Actions (Login/CTA):** Top-Right.
- **Breadcrumbs:** `Home > Category > Page` (Separators pointing Right).

### RTL (Arabic/Hebrew)
- **Logo:** Top-Right.
- **Nav Links:** Center or Left-aligned.
- **User Actions (Login/CTA):** Top-Left.
- **Breadcrumbs:** `صفحة < فئة < رئيسية` (Separators pointing Left).

---

## 2. Split Hero Section

### LTR Structure
- **Text Block (6 columns):** Left-aligned.
    - **Headline:** Left-aligned.
    - **Body:** Left-aligned.
    - **CTA Button:** Primary on the left, Secondary on the right.
- **Visual/Image (6 columns):** Right-side.

### RTL Structure
- **Text Block (6 columns):** Right-aligned.
    - **Headline:** Right-aligned.
    - **Body:** Right-aligned.
    - **CTA Button:** Primary on the right, Secondary on the left.
- **Visual/Image (6 columns):** Left-side.

---

## 3. Component Details

### Search Bar
- **LTR:** Icon on the left of the input field. Text cursor starts at the left.
- **RTL:** Icon on the right of the input field. Text cursor starts at the right.

### Progress Bar / Level Indicator
- **LTR:** Fills from Left to Right.
- **RTL:** Fills from Right to Left.

### Media Player (The "Fixed" Exception)
- **Play/Pause/Seek:** Do NOT mirror. The timeline moves Left to Right even in RTL regions for video/audio, as this is a global technical standard.
- **Volume/Next/Prev:** Usually follow the standard layout direction, but "Play" always points Right.

---

## 4. Typography Adjustments

| Script | Adjustment | Reason |
| :--- | :--- | :--- |
| **English** | Base (16px / 1.5 leading) | Standard baseline. |
| **Arabic** | +2px size / 1.7-1.8 leading | Characters are denser and have taller vertical strokes. |
| **Chinese (Simplified)** | +1px size / 1.6 leading | Complex strokes require more "breathing room" to be legible at small sizes. |

---

## 5. Spacing Annotations (Logical Properties)

To ensure this layout works in both directions, the design spec uses logical properties:

- `margin-inline-start: 2rem` (Pushes from the "start" of the line).
- `padding-inline-end: 1rem` (Adds space at the "end" of the line).
- `border-inline-start: 4px solid var(--brand)` (Accent bar on the side).

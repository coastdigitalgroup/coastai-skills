# Icon Sizing and Accessibility Reference

This reference provides technical standards for implementing an accessible and
responsive iconography system.

## Standard Sizing Scale (8pt Grid)

| Size     | Use Case              | Implementation Note                           |
| :------- | :-------------------- | :-------------------------------------------- |
| **12px** | Contextual help icons | Use 1px stroke only; avoid complex icons.     |
| **16px** | Inline text links     | Align to the x-height of the font.            |
| **20px** | Small buttons         | Good for dense interfaces (dashboards).       |
| **24px** | Default UI            | The industry standard for most actions.       |
| **32px** | List items            | Provides enough detail for descriptive icons. |
| **48px** | Marketing sections    | Icons become "Graphic elements" here.         |

## Accessibility Patterns

### 1. The Decorative Icon

Used when the icon is purely visual and the text next to it provides all the
information.

```html
<!-- Pattern: aria-hidden -->
<button>
  <svg aria-hidden="true">...</svg>
  Add to Cart
</button>
```

### 2. The Functional (Icon-Only) Button

Used for actions like "Search" or "Menu" where there is no visible text label.

```html
<!-- Pattern: role="img" + aria-label -->
<button aria-label="Search site">
  <svg role="img">...</svg>
</button>
```

### 3. The Informational Icon

Used when the icon itself conveys state (e.g., a "Warning" icon).

```html
<!-- Pattern: title + role -->
<div class="status-error">
  <svg role="img">
    <title>High Priority Alert</title>
    ...
  </svg>
  Server connection failed.
</div>
```

## Optical Centering Guide

Mathematical centering doesn't always equal visual balance. Follow these rules
to avoid "off-center" UI:

- **The Play Button:** The triangle should be shifted slightly to the right to
  balance its mass.
- **The Bell (Notification):** The clapper at the bottom should be centered, but
  the body may need to be adjusted vertically.
- **Asymmetrical Icons:** If an icon has a heavy top or bottom, adjust it within
  its 24px bounding box until it "feels" centered to the eye.

## Contrast Requirements (WCAG 2.1)

- **Standard UI Icons:** Must maintain a **3:1** contrast ratio against the
  background.
- **Critical Semantic Icons:** If an icon is the ONLY way to understand a
  message (e.g., an error icon without the word "Error"), it should ideally
  aim for **4.5:1** to ensure readability.

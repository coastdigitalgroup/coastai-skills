# Rating Scales and Accessibility

This reference provides technical guidance on implementing rating components
that are both usable and compliant with accessibility standards.

## Common Rating Scales

| Scale Type | Use Case | Pattern |
| :--- | :--- | :--- |
| **5-Star** | E-commerce, Services | Standard gold stars (0.5 increments). |
| **Thumbs Up/Down** | Content, Support | Binary positive/negative. |
| **1-10 Scale** | High-precision feedback | Often used in NPS or detailed surveys. |
| **Emoji Reactions** | Social, Community | Contextual (e.g., "Love," "Helpful," "Funny"). |

## Iconography Selection

- **Filled vs. Outlined:** Use filled icons for the rating value and outlined
  icons for the "remaining" capacity.
- **Color Contrast:** Star icons used for reading (static) should have at
  least 3:1 contrast against the background.
- **Half-Stars:** Implement half-stars using CSS masking or SVG fragments
  rather than separate icons to ensure consistent spacing.

## Accessibility (WCAG 2.1) Requirements

### 1. Perception
- **Non-Color Indicators:** Don't rely on color alone (e.g., Red for 1-star,
  Green for 5-star). Ensure the number of icons and the numeric text are
  visible.
- **Labels:** Every rating group must have an `aria-label` describing the
  current value (e.g., `aria-label="4.2 out of 5 stars"`).

### 2. Interaction (The Rating Form)
- **Keyboard Access:** Users must be able to `Tab` to the rating input and use
  `Arrow` keys to adjust the value.
- **Focus States:** Provide a clear focus ring (using `:focus-visible`) around
  the entire rating group or the individual stars.
- **Touch Targets:** Each interactive star must meet the **44x44px** minimum
  touch target requirement.

### 3. Screen Reader Logic
- **Summary:** "Average rating 4.8 out of 5 based on 120 reviews."
- **Review:** "John Doe rated this 5 stars on October 10th. Review title:
  Excellent. Review content..."

## Star Implementation Pattern (HTML/CSS)

For interactive ratings, avoid using 5 separate buttons. Use a single fieldset
with radio buttons:

```html
<fieldset class="rating">
  <legend class="sr-only">Rate your experience</legend>
  <input type="radio" id="star5" name="rating" value="5" />
  <label for="star5" title="5 stars">★</label>
  <input type="radio" id="star4" name="rating" value="4" />
  <label for="star4" title="4 stars">★</label>
  <!-- ... and so on ... -->
</fieldset>
```

*Note: The "Star" character is used here for brevity; in production, use SVG
icons for better control over styling and resolution.*

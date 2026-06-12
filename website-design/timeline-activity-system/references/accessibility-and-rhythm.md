# Reference: Accessibility and Rhythm in Timelines

This document provides best practices for ensuring that chronological data is both visually harmonious and accessible to all users.

## 1. Vertical Rhythm and Spacing

Timelines rely on vertical flow. Consistent spacing is critical for scannability.

- **The "Marker-to-Content" Gap:** Use a consistent horizontal gap (e.g., `1.5rem` or `24px`) between the center of the timeline line and the start of the text content.
- **The "Entry-to-Entry" Gap:**
    - **Dense (Log view):** `1rem` (16px).
    - **Standard (Activity feed):** `2rem` (32px).
    - **Loose (Marketing timeline):** `4rem` (64px).
- **Alignment:** Always align the first line of text (the Event Title) with the top of the Marker (Avatar or Icon).

## 2. Accessible Time Representation

- **Machine Readable:** Always use the `<time>` element with the `datetime` attribute.
  ```html
  <!-- Right -->
  <time datetime="2023-10-25">Oct 25, 2023</time>
  <!-- Wrong -->
  <span>Oct 25, 2023</span>
  ```
- **Relative vs. Absolute:**
    - Screen readers should ideally hear the absolute time even if the visual display is relative.
    - *Example:* "2 hours ago" (Visual) -> "Oct 25, 2023 at 10:30 AM" (ARIA-label or hidden text).
- **Granularity:** Only include seconds if the user needs them for high-precision tasks (e.g., server logs). Otherwise, HH:MM is preferred.

## 3. WCAG AA Checklist for Timelines

| Success Criterion | Application to Timelines |
| :--- | :--- |
| **1.4.1 Use of Color** | If a red dot indicates a "Failed" event, there must also be a "Failed" label or a unique icon (e.g., an 'X'). |
| **1.3.1 Info and Relationships** | Use list markup (`<ul>` or `<ol>`) to programmatically relate timeline items. |
| **1.4.3 Contrast** | Ensure the vertical connection line has at least a 3:1 contrast ratio against the background. Text must be 4.5:1. |
| **2.4.3 Focus Order** | Tabbing through the timeline must follow the chronological order (Top-to-Bottom or Bottom-to-Top). |

## 4. Visual Metaphors

- **The Line:** Represents the "Path of Time."
- **Dots/Nodes:** Represent "Moments in Time."
- **Gaps in the Line:** Can be used to indicate a "Pause" or "Hiatus" in activity (e.g., a multi-day gap in an audit log).
- **Directionality:** In Western cultures, time flows from top to bottom. Avoid horizontal timelines unless the content is extremely minimal or specifically designed for a mobile-swipe experience.

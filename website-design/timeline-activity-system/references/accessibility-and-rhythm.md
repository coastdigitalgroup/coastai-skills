# Accessibility and Rhythm Reference

A timeline is a complex spatial component that requires careful attention to
both visual rhythm and assistive technology support.

## 1. Visual Rhythm & Scanning

To prevent "scanning fatigue" in dense timelines, use these rhythmic principles:

- **The Anchor Point:** Always use a vertical line as a visual anchor. It helps
  the eye follow the chronological flow even when text lengths vary.
- **Micro-Copy Hierarchy:**
    - **Bold:** The Action/Result (e.g., **Completed**).
    - **Regular:** The Context/Subject (e.g., Project Setup).
    - **Muted:** The Metadata (e.g., Oct 14, 2:00 PM).
- **Whitespace as a Divider:** Use larger gaps (e.g., `3rem`) between date
  groups than between items within a group (e.g., `1.5rem`).

## 2. Accessibility Best Practices

### Screen Reader Support
- **Chronological Announcement:** Ensure the DOM order matches the visual
  chronological order (usually newest to oldest).
- **Aria-Labels:**
    - Use `role="list"` for the timeline container.
    - Use `role="listitem"` for each event.
    - If a marker is purely decorative, use `aria-hidden="true"`.
- **Status Updates:** Use `aria-live="polite"` for timelines that update
  dynamically (like a live activity feed).

### Keyboard Navigation
- If an event is interactive (e.g., clicking a "View Changes" button), ensure the
  tab order follows the timeline flow.
- Users should be able to jump between date groups using standard heading
  navigation keys.

## 3. WCAG Contrast Checkpoints

| Element | Requirement | Why? |
| :--- | :--- | :--- |
| **Connecting Line** | 3:1 (Minimum) | Must be visible to indicate the relationship between nodes. |
| **Marker Icon** | 4.5:1 (if semantic) | If the icon conveys status (Success/Fail), it must be high contrast. |
| **Timestamp Text** | 4.5:1 | Metadata is critical for understanding the sequence. |

## 4. Logical Property Mapping

For RTL (Right-to-Left) support, use logical CSS properties:

| Physical Property | Logical Property | RTL Behavior |
| :--- | :--- | :--- |
| `border-left` | `border-inline-start` | Flips to the right. |
| `margin-left` | `margin-inline-start` | Flips to the right. |
| `padding-right` | `padding-inline-end` | Flips to the left. |
| `left: 0` | `inset-inline-start: 0` | Moves to the right edge. |

## 5. Spacing System Integration

Reference values from the `fluid-spacing-system`:

- **Marker Diameter:** `var(--space-m)` (16px - 24px).
- **Content Gutter:** `var(--space-s)` (12px - 16px).
- **Vertical Rhythm:** `var(--space-l)` (24px - 32px) between events.
- **Group Break:** `var(--space-2xl)` (48px - 64px).

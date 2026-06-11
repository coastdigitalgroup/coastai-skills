# References: Accessibility & Rhythm

## Accessibility Guidelines (WCAG 2.1)

### 1. Contrast Requirements
- **Lines and Markers:** Must have at least a **3:1 contrast ratio** against the background.
- **Text Labels:** Must have at least a **4.5:1 contrast ratio**.
- **Status Colors:** Never use color alone. Always include an icon (e.g., checkmark for success, 'X' for error) or text label ("Completed," "Failed").

### 2. Screen Reader Navigation
- Use semantic HTML: `<ol>` for chronological ordered lists.
- Group related items: Use `<section>` or `<article>` for events within a group.
- Provide context: "Event on Oct 24, 2023: Project Launched."

### 3. Keyboard Interaction
- If markers are clickable (e.g., to expand details), ensure they have a visible focus ring (min 3:1 contrast against the marker and background).

---

## Spatial Rhythm & Scaling

### Non-Linear vs. Linear Scales
- **Linear:** The vertical distance between markers is proportional to the time between them. Best for showing gaps in activity.
- **Non-Linear (Standard):** Every event occupies the same amount of vertical space regardless of the time gap. Best for dense logs where screen real estate is limited.

### Recommended Gaps
- **Between Events:** 24px - 40px (depending on content volume).
- **Between Groups:** 48px - 64px (to create a clear visual break).
- **Marker to Content:** 16px - 24px (for optimal eye-tracking).

## Design Pattern Libraries (External Inspiration)
- **Material Design:** "Timeline" components for activity streams.
- **Human Interface Guidelines (Apple):** Chronological log patterns in iOS/macOS.
- **Carbon Design System (IBM):** Data-heavy timeline and progress tracks.

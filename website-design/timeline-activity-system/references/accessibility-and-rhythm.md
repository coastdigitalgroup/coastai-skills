# Accessibility and Rhythm for Timelines

Designing timelines requires a balance between visual storytelling and data accessibility. Follow these guidelines to ensure your system is robust and usable.

## 1. Visual Rhythm and Spacing

A timeline is a map of time. The spatial distance between items can communicate the "tempo" of activity.

- **Proportional Spacing:** If significant time passes between events (e.g., weeks), consider increasing the vertical gap between nodes.
- **Micro-interactions:** Use a small "dot" for automatic system logs and a larger "icon" for human-driven actions. This creates a rhythmic hierarchy.
- **Rhythm Breaking:** Use "Section Breaks" (like a line divider or a horizontal rule across the track) to signify a major phase shift in the project.

## 2. Accessibility Best Practices

### Screen Reader Optimization
- **Logical Flow:** Ensure that even if your nodes are positioned absolutely, the `tabindex` and reading order follow the chronological sequence.
- **Descriptive Labels:** Instead of just "Oct 24," use "October 24th, 2023" in the `aria-label` for clarity.
- **Icon Meaning:** If a node uses an icon (e.g., a "Warning" triangle), ensure it has a hidden label: `<span class="sr-only">Warning: System Error</span>`.

### Focus States
- If nodes are interactive (expandable), they must have a visible focus ring that is distinct from the timeline track.
- The focus area should encompass both the node and the primary text to provide a larger hit target.

## 3. Date and Time Formatting

Consistency is key for scannability.

- **Relative vs. Absolute:**
  - Use **Relative Time** (e.g., "2 mins ago," "Yesterday") for high-frequency activity feeds.
  - Use **Absolute Time** (e.g., "Oct 24, 2023") for historical logs or long-term roadmaps.
- **Alignment:** Right-align timestamps if they sit to the left of the track; this keeps the numbers close to the visual spine for easier scanning.

## 4. Color and Meaning

- **Don't Rely on Color Alone:** A "Red" node for an error should also have a distinct shape (e.g., a square instead of a circle) or an icon (e.g., an 'X').
- **Status Contrast:** Ensure that status labels (e.g., "Pending," "Completed") meet WCAG AA contrast ratios (4.5:1) against their background, even when using brand colors.

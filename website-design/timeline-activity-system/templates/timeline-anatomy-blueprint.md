# Timeline Anatomy Blueprint

Use this template to structure a vertical timeline for activity feeds, logs, or history sections.

## Structural Anatomy

| Element | Description | Visual Property |
| :--- | :--- | :--- |
| **Outer Container** | The wrapping element for the whole timeline | `position: relative` |
| **The Track** | The vertical line connecting all nodes | `width: 2px; position: absolute; left: 12px; height: 100%` |
| **Group Header** | Date or Category label | `margin-bottom: 24px; font-weight: bold` |
| **Event Item** | A single entry in the timeline | `display: flex; gap: 16px; margin-bottom: 32px` |
| **Node Container** | The wrapper for the node/icon | `width: 24px; z-index: 1` |
| **Node** | The circle or icon marking the event | `width: 12px; height: 12px; border-radius: 50%; background: var(--color-neutral)` |
| **Content Area** | The text and metadata for the event | `flex: 1` |

## CSS Variables
```css
:root {
  --timeline-track-width: 2px;
  --timeline-track-color: var(--color-neutral-200);
  --timeline-node-size: 12px;
  --timeline-node-offset: 5px; /* (Track Width / 2) - (Node Size / 2) */
  --timeline-spacing-v: 32px;
  --timeline-spacing-h: 16px;
}
```

## Implementation Checklist

### [ ] Positioning
- Is the track perfectly centered behind the nodes?
- Does the track start at the first node and end at the last node (instead of overflowing)?

### [ ] Metadata Hierarchy
- Is the timestamp visually distinct from the action text?
- Does the "Actor" have a clear link or avatar if applicable?

### [ ] States
- **Completed:** Does the node use a success color?
- **Active/Next:** Is there a "pulse" or high-contrast border on the current step?
- **Pending:** Is the text/node muted (opacity 50%)?

### [ ] Responsive Stacking
- On mobile (width < 600px), is the track still visible?
- Are the timestamps moved to avoid horizontal squashing?

## Accessibility (ARIA)
- Use `<ol>` for the list to communicate order.
- Add `aria-label` to the node if it uses an icon with semantic meaning.
- Ensure the track has at least `3:1` contrast against the background.

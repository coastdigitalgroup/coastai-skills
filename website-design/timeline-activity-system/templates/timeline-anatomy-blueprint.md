# Timeline Anatomy Blueprint

Use this blueprint to document the structural and spatial requirements for a timeline or activity feed component.

## 1. Structural Components

| Element | Description | Requirement |
| :--- | :--- | :--- |
| **Container** | The outer wrapper of the timeline. | `max-width: 800px` for readability. |
| **Group Header** | Title for a chronological group (e.g., "Monday"). | Sticky positioning recommended for long lists. |
| **Marker** | The visual anchor on the line (Icon/Avatar/Dot). | Min size: `24x24px`. Max size: `48x48px`. |
| **Connection Line** | The vertical line connecting markers. | Width: `2px`. Color: Contrast with background. |
| **Entry Wrapper** | The container for a single event's content. | `display: flex` with gap. |
| **Metadata** | Timestamps, Actor names, or ID tags. | Font size: 1 size smaller than body. |

## 2. Spatial Rules (Grid/Flex)

```css
/* Layout Strategy: Left-Aligned Timeline */
.timeline {
  display: grid;
  grid-template-columns: 48px 1fr; /* Marker col + Content col */
  column-gap: 1.5rem;
  row-gap: 2rem;
}

.timeline-entry {
  position: relative; /* For connector positioning */
}

/* The vertical line */
.timeline-entry::before {
  content: "";
  position: absolute;
  left: 23px; /* Center of the 48px marker col (minus 1px width) */
  top: 0;
  bottom: -2rem; /* Matches row-gap */
  width: 2px;
  background: var(--color-border);
}

/* Hide line for the last item if not continuing */
.timeline-entry:last-child::before {
  display: none;
}
```

## 3. Interaction & State Patterns

- **Hover State:** Highlight the entire `timeline-entry` background subtly (`--color-bg-subtle`) to indicate it is a clickable or interactive log entry.
- **Focus State:** Use a high-contrast ring around the *Content* block if the entry leads to a detail view.
- **Loading State:**
    - Placeholder circles for markers.
    - Placeholder bars (Skeletons) for title and metadata.

## 4. Accessibility Checklist

- [ ] **Semantic Markup:** Use `<ol>` (Ordered List) because the sequence (time) is significant.
- [ ] **Time Tag:** `<time datetime="2023-10-25T10:30">10:30 AM</time>`.
- [ ] **Aria-Labels:** If markers use icons without text, provide `aria-label` (e.g., "Success icon").
- [ ] **Keyboard Nav:** Users can Tab through interactive entries in chronological order.

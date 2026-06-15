# Accessibility and Rhythm for Timelines

Timelines are inherently visual, but they must remain functional and clear for
users with vision impairments or those using assistive technology.

## Accessibility Requirements (WCAG AA)

### 1. Semantic Markup
- **Rule:** A timeline is a list of events. Use `<ul>` (unordered) or `<ol>`
  (ordered, if chronological order is critical) to wrap the items.
- **Why:** This allows screen readers to announce the number of items and let
  users skip between them easily.

### 2. Meaningful Markers
- **Rule:** Do not use color alone to distinguish event types (e.g., Red node
  for error).
- **Solution:** Include an icon with a text equivalent (`aria-label`) or include
  the status text within the event title (e.g., "Error: System Update Failed").

### 3. Focus Management
- **Rule:** If the timeline items are interactive (e.g., clickable cards), ensure
  there is a clear focus ring.
- **Tab Order:** Users should be able to tab through events in chronological
  order.

### 4. Contrast
- **Rule:** The connecting "Thread" and the "Nodes" must have a 3:1 contrast
  ratio against the background to ensure they are visible to users with low
  vision.

## Spatial Rhythm Guidelines

### Vertical Spacing (The "Pulse")
The distance between events should communicate their relationship:

- **Tight Rhythm (16px - 24px):** Use for rapid-fire system logs or minor
  actions.
- **Relaxed Rhythm (32px - 64px):** Use for high-level roadmaps or company
  milestones where each event needs "breathing room" to be processed.

### The "End of Time"
The way a timeline ends is a critical visual cue:

- **Arrow Head:** Indicates the timeline is ongoing or moving toward the future.
- **Terminal Node:** A final large dot indicates the sequence is complete.
- **Faded Thread:** Indicates there is more history that is currently hidden.

## Mobile Considerations

- **Left-Align Everything:** Do not attempt alternating layouts on screens
  narrower than 768px.
- **Minimum Tap Targets:** If nodes are clickable, they must be at least
  44x44px, even if the visual "dot" is smaller.

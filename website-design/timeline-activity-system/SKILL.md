---
name: timeline-activity-system
description:
  Design and implement a systematic framework for chronological events and
  activity logs, managing spatial rhythm, event grouping, and status
  visualization.
---

# Timeline Activity System

## Purpose

The Timeline Activity System provides a methodology for designing chronological
sequences of events, history logs, or roadmaps. It ensures that users can
track progress, understand temporal relationships, and scan historical data
efficiently. This system balances information density with spatial rhythm,
ensuring that the narrative of "when" and "what" is clear across all viewports.

## Use Cases

- Designing activity feeds for SaaS dashboards (e.g., project history).
- Structuring product roadmaps or release notes.
- Organizing company history or "About Us" milestones.
- Implementing order tracking or shipment history for e-commerce.
- Managing multi-stage process visualizations (e.g., application status).

## When NOT to Use

- **Linear Step Progress:** For a simple sequence of steps the user must complete
  in real-time, use `step-progress-system`.
- **Purely Tabular Data:** If the primary goal is sorting and filtering by many
  columns (e.g., a full financial audit log), use `data-table-ui-system`.
- **Global Navigation:** For site-wide structure, use `site-navigation-system`.
- **Simple Blog Feeds:** Where standard cards in a grid or list suffice without
  a visual "thread" or temporal markers.

## Inputs

1. **Event Inventory:** The list of events, timestamps, and associated metadata.
2. **Temporal Resolution:** Does the user care about seconds, days, or years?
3. **Event Types:** Categorization of events (e.g., Info, Success, Warning,
   Error, or Milestone vs. Minor Action).
4. **Spatial Constraints:** Will the timeline live in a sidebar, a full-page
   view, or a narrow card?
5. **Brand Tokens:** Colors, typography scales, and spacing tokens.

## Outputs

1. **Timeline Anatomy Spec:** Definition of the "Thread" (the vertical/horizontal
   line), "Nodes" (the markers), and "Content Blocks."
2. **Grouping Strategy:** Rules for clustering events (e.g., "Today,"
   "Yesterday," "October 2023").
3. **State & Status Matrix:** Visual treatments for different event types and
   interactive states.
4. **Responsive Blueprint:** How the timeline adapts from a centered or
   alternating layout to a single-column mobile view.

## Workflow

### 1. Define the Temporal Thread and Orientation

Determine the direction of time:
- **Vertical (Standard):** Best for variable content lengths and long histories.
- **Horizontal:** Best for high-level roadmaps or short processes where
  horizontal space is abundant.

Establish the "Thread" (the line connecting events) and ensure it has consistent
visual weight and color (usually a neutral muted tone).

### 2. Establish Event Nodes and Markers

Design the visual anchors for each event:
- **Simple Nodes:** Small dots or circles for minor actions.
- **Iconic Nodes:** Icons inside circles to indicate event types (e.g., a check
  for "Completed").
- **Date Markers:** Labels that float next to or above the nodes.

### 3. Apply Spatial Rhythm and Grouping

Avoid visual clutter by grouping events by time periods:
- **Relative Grouping:** "Just now," "2 hours ago."
- **Absolute Grouping:** "Monday, Oct 23," "September 2023."

Use the `fluid-spacing-system` to maintain consistent vertical gaps between
events. High-priority milestones should have more whitespace than minor
activity items.

### 4. Organize the Content Block

Apply `visual-hierarchy-system` to the content adjacent to each node:
- **Title:** The core action or event name.
- **Metadata:** Timestamp, actor (user avatar/name), and category.
- **Body/Description:** Optional details or expanded content.
- **Actions:** Contextual buttons (e.g., "View Details," "Undo").

### 5. Plan Responsive Adaptation

- **Alternating Layout (Z-Pattern):** On desktop, events alternate left and
  right of the thread. On mobile, collapse to a single-column (Thread on left,
  Content on right).
- **One-Sided Layout:** Standardize on "Thread-Left, Content-Right" for mobile
  to maximize readability.

## Decision Rules

- **The "Thread" Rule:** The line should never be broken unless there is a
  logical gap in time or a "Load More" action.
- **Grouping Threshold:** If more than 5 events occur within the same day, group
  them under a single date heading to reduce redundant text.
- **The "Node" Hierarchy:** Use larger nodes or brand colors for "Milestones"
  and smaller, neutral nodes for "Activities."
- **Timestamp Position:** For vertical timelines, place timestamps to the left
  of the thread (desktop) or immediately below the title (mobile) for the fastest
  scanning.

## Constraints

- **Accessibility:** Timelines must be navigable as a list (`<ul>` or `<ol>`).
  Nodes containing icons must have `aria-label` or hidden text for screen
  readers.
- **Responsiveness:** Timelines must never overflow the viewport. Horizontal
  timelines must switch to vertical or use a horizontal scroll on mobile.
- **Visual Contrast:** The thread and nodes must meet a 3:1 contrast ratio
  against the background.

## Common Failure Patterns

- **Broken Threads:** The vertical line starts and stops arbitrarily, making
  it hard to follow the sequence.
- **Information Overload:** Including too much body text in every event, turning
  the timeline into a wall of text.
- **Inconsistent Alignment:** Mixing centered and left-aligned text within the
  same timeline without a clear logic.
- **Mobile Cramming:** Trying to keep an alternating (left/right) layout on
  mobile, leaving tiny columns for text.

## Validation Criteria

- [ ] Events follow a clear, consistent chronological order (Ascending or
      Descending).
- [ ] Visual markers (nodes) and the connecting thread are consistently styled.
- [ ] Temporal grouping (e.g., "Today") is used to reduce cognitive load.
- [ ] Responsive behavior (e.g., collapsing to a single column) is defined and
      functional.
- [ ] Accessibility: The timeline is marked up as a semantic list.
- [ ] Primary milestones are visually distinct from secondary activity.

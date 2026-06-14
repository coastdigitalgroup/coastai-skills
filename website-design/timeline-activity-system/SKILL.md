---
name: timeline-activity-system
description:
  Design and implement a systematic framework for chronological events and
  activity logs, managing spatial rhythm, event grouping, and status
  visualization.
---

# Timeline & Activity System

## Purpose

The Timeline & Activity System provides a methodology for designing chronological
sequences of events, history logs, and activity feeds. It ensures that
time-based data is scannable, grouped logically, and provides clear visual
anchors for status changes or significant milestones. This system moves beyond
simple lists to a structured spatial arrangement that communicates the "flow of
time" and the "impact of actions."

## Use Cases

- Designing "Activity Feeds" for collaborative tools (e.g., project updates,
  comment history).
- Creating "Product Roadmaps" or "Release Notes" showing past and future
  milestones.
- Implementing "Order Tracking" flows for e-commerce.
- Visualizing "Audit Logs" or "System Events" for technical dashboards.
- Showcasing "Company History" or "Personal Journeys" on About or Portfolio
  pages.

## When NOT to Use

- **Real-time Chat:** Messaging interfaces have unique bubbling and alignment
  patterns; use a dedicated chat UI system.
- **Static Lists:** If the chronological order isn't the primary way users
  interact with the data (e.g., a simple alphabetical list of items).
- **Complex Data Analysis:** Where users need to filter and sort by multiple
  non-time attributes; use `data-table-ui-system`.
- **Navigation Menus:** Timelines are for content, not for primary site
  wayfinding.

## Inputs

1. **Event Schema:** The data associated with each event (Timestamp, Actor,
   Action, Object, Status).
2. **Time Scale:** Is the data granular (seconds/minutes) or broad
   (months/years)?
3. **Event Priority:** Which events are "Significant" (Milestones) vs.
   "Routine" (System logs).
4. **Directionality:** Should the timeline be Vertical (standard for feeds) or
   Horizontal (standard for roadmaps)?

## Outputs

1. **Timeline Anatomy Spec:** Definition of the "Track" (the line), the
   "Nodes" (the points), and the "Content Blocks."
2. **Grouping Logic:** Rules for how events are bucketed (by Day, Week, or
   Status).
3. **Visual State Matrix:** Treatments for Completed, Current, and Upcoming
   events.
4. **Responsive Strategy:** How the timeline collapses from multi-column or
   horizontal to a single vertical track on mobile.

## Workflow

### 1. Define the Track and Node Style

Establish the visual spine of the timeline:
- **The Track:** A vertical or horizontal line (solid, dashed, or colored) that
  connects events.
- **The Nodes:** Geometric shapes (circles, icons) that sit on the track to
  mark the exact moment of an event.
- **Node Variants:** Use different sizes or colors for Milestones (large) vs.
  Sub-events (small).

### 2. Establish Chronological Direction

- **Reverse-Chronological (Newest First):** Standard for activity feeds and
  logs where the most recent info is highest priority.
- **Chronological (Oldest First):** Standard for storytelling, history, or
  instructional steps.

### 3. Apply Grouping and Rhythm

Avoid a "monotonous line" by grouping events:
- **Date Buckets:** Group events under sticky headers (e.g., "Today," "Yesterday,"
  "Oct 24").
- **Visual Gaps:** Use `fluid-spacing-system` to create larger gaps between
  days than between events within the same day.

### 4. Organize Content Blocks

Structure the information next to each node:
- **Metadata:** Timestamp and Actor (e.g., "Jules updated...")
- **Core Content:** The "What" (e.g., "changed status to 'In Progress'")
- **Supporting Detail:** Thumbnails, snippets, or tags.

### 5. Define Interactive States

Use `interactive-state-system` for clickable events:
- **Hover/Active:** Highlight the entire content block or node.
- **Expansion:** If events have deep details, allow clicking the node/block to
  expand inline.

## Decision Rules

- **Vertical vs. Horizontal:** Use **Vertical** for lists with variable content
  length and infinite scrolling. Use **Horizontal** only for fixed-step
  processes or broad milestones where space is abundant.
- **Alternating vs. Single-Side:** Use **Single-Side** (Track on left, Content on
  right) for readability and scannability. Use **Alternating** (Center Track,
  Content left/right) only for decorative or narrative storytelling.
- **Node Choice:** Use **Icons** inside nodes if the event type is critical to
  distinguish at a glance (e.g., 📝 for edits, ✅ for completions). Use **Dots**
  for high-density logs.
- **Density:** For "Power User" logs, reduce vertical padding and use smaller
  nodes. For "Marketing" timelines, increase whitespace and use larger nodes
  with images.

## Constraints

- **Accessibility:**
  - Timelines must follow a logical DOM order regardless of visual alignment.
  - Nodes should not be the *only* way to understand status; use text labels.
  - Ensure the "Track" has enough contrast against the background.
- **Responsiveness:** Horizontal timelines must convert to vertical on mobile
  to avoid horizontal scrolling.
- **Visual Hierarchy:** The most recent or most significant event should be
  the most visually prominent.

## Common Failure Patterns

- **The "Broken Spine":** A track that doesn't align perfectly with nodes,
  making the system feel unpolished.
- **Text Overcrowding:** Trying to fit too much text into a small horizontal
  segment, leading to truncation or overlap.
- **Lack of Grouping:** A single long list of 50 events without date headers,
  making it impossible to find specific timeframes.
- **Ambiguous Nodes:** Using icons that are too small or abstract to be
  meaningful.
- **Inconsistent Alignment:** Mixing left-aligned and right-aligned text
  without a clear structural reason.

## Validation Criteria

- [ ] Chronological direction is consistent and appropriate for the use case.
- [ ] Track and nodes are visually aligned and connected.
- [ ] Events are grouped logically (e.g., by date) with clear headers.
- [ ] Milestone events are visually distinguished from routine events.
- [ ] Mobile view maintains a clear vertical scan path.
- [ ] Semantic HTML (e.g., `<ol>` or `<ul>`) is used for the list of events.
- [ ] Contrast ratios for tracks and labels meet WCAG AA.

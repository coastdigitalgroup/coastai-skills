---
name: timeline-activity-system
description:
  Design and implement a systematic framework for chronological events and
  activity logs, managing spatial rhythm, grouping, and status visualization.
---

# Timeline and Activity Feed System

## Purpose

The Timeline and Activity Feed System provides a methodology for designing
chronological data structures. It ensures that time-based events—such as
project milestones, audit logs, or shipment tracking—are organized into a
scannable, logical, and visually cohesive interface. This system solves the
problem of "information clutter" in temporal datasets by establishing clear
rules for event grouping, status markers, and vertical/horizontal spatial
rhythm.

## Use Cases

- **SaaS Activity Logs:** Tracking user actions, system changes, or audit trails.
- **Project Milestones:** Visualizing the progress of a task or product roadmap.
- **E-commerce Order Tracking:** Showing the journey of a package from order to
  delivery.
- **Personal Histories:** Displaying resumes, medical histories, or social feeds.
- **Process Documentation:** Illustrating a step-by-step chronological workflow.

## When NOT to Use

- **Static Lists:** If the data has no meaningful temporal relationship or
  sequence, use a standard list or `data-table-ui-system`.
- **Primary Site Navigation:** Use `site-navigation-system` for site structure;
  timelines are for content discovery.
- **Real-time Chat:** While chat is chronological, it requires specific
  conversational patterns (bubbles, alignment) not covered by a standard
  activity feed.
- **Large Data Tables:** If users need to perform heavy sorting and filtering
  on 20+ attributes, use `data-table-ui-system`.

## Inputs

1. **Temporal Schema:** The level of granularity (Date, Time, Relative Time like
   "2 hours ago").
2. **Event Types:** Categorization of actions (e.g., Created, Edited, Deleted,
   Commented).
3. **Actor Data:** Who performed the action (User avatar, System, Bot).
4. **Outcome/Status:** The result of the event (Success, Warning, Error, In
   Progress).
5. **Spatial Constraint:** Does the timeline need to fit in a narrow sidebar or
   a wide page body?

## Outputs

1. **Timeline Anatomy Spec:** Definitions for the "Track" (the line), the
   "Marker" (the point), and the "Content" (the event details).
2. **Grouping Strategy:** Rules for clustering events by day, week, or project
   phase.
3. **Marker Logic:** A visual system for icons, colors, and sizes based on
   event priority.
4. **Responsive Blueprint:** How the layout adapts from multi-column desktop
   views to single-column mobile views.

## Workflow

### 1. Define the Temporal Axis (The Track)

Determine the direction and style of the timeline:
- **Vertical (Recommended):** Best for scannability and varying content lengths.
- **Horizontal:** Only for fixed-width milestones or compact overview summaries.
- **The Track Style:** Solid lines for completed paths, dashed for future/planned
  events, and faded for "archived" history.

### 2. Design the Marker System

Markers anchor the event to the track. Establish a hierarchy:
- **Primary Markers:** Large, often containing icons or avatars. Use for major
  milestones or high-priority actions.
- **Secondary Markers:** Simple dots or small icons. Use for routine system
  updates.
- **Status Indicators:** Use color (Green=Success, Red=Failure) and icons
  consistently across all markers.

### 3. Establish Spatial Rhythm and Grouping

Avoid a "monolithic" list by grouping events:
- **Date Headers:** Use sticky headers or bold labels to group events by
  "Today," "Yesterday," or "October 12."
- **Nesting:** If one action triggers multiple sub-events, indent the
  sub-events to show parent-child relationships.
- **Proximity:** Keep the timestamp close to the marker to ensure the "when"
  is immediately visible.

### 4. Structure the Event Content

Apply `visual-hierarchy-system` to the individual event:
- **The Subject:** Who did it (e.g., "Jane Cooper").
- **The Action:** What happened (e.g., "uploaded a file").
- **The Object:** To what (e.g., "Project_Specs.pdf").
- **Secondary Meta:** Links, snippets of comments, or "View Details" buttons.

### 5. Plan for Growth and Pagination

- **The "Load More" Pattern:** For activity feeds, use infinite scroll or a
  "Load More" button to prevent page bloat.
- **Empty States:** Design a "No activity yet" state that encourages action
  (e.g., "Invite your team to get started").

## Decision Rules

- **The "Relative Time" Rule:** Use relative time (e.g., "5 mins ago") for
  events within the last 24 hours. Use absolute timestamps (e.g., "Oct 15,
  10:30 AM") for older events.
- **Alignment Choice:**
  - **Single-sided:** Marker and content both to the right of the track. Best
    for readability.
  - **Split-sided:** Content alternates left and right. Use only for
    marketing-heavy "Our Story" pages; avoid for functional dashboards.
- **Icon vs. Avatar:** Use avatars if the "Who" is the primary driver; use icons
  if the "What/Type" is more important for the user's task.
- **Connectivity:** Ensure the track line connects all markers unless there is
  a significant gap in time (which can be signaled by a "Break" in the line).

## Constraints

- **Accessibility:** Ensure the reading order is logical for screen readers.
  Markers should have `aria-hidden="true"` if they are purely decorative.
  Timestamps must be machine-readable (using the `<time>` tag).
- **Contrast:** Marker colors must meet WCAG AA (3:1 for graphical objects,
  4.5:1 for text inside markers).
- **Responsiveness:** Horizontal timelines must stack vertically on mobile
  viewports to avoid horizontal scrolling.

## Common Failure Patterns

- **The "Floating Marker":** Markers that don't align perfectly with the track
  line, creating visual "jitter."
- **Information Density Overload:** Trying to show too much metadata in a
  single event card, making the timeline hard to scan.
- **Vague Timing:** Not showing a clear timestamp, leaving users guessing when
  an action occurred.
- **The "Broken Line":** Forgetting to extend the track line between events,
  breaking the visual narrative of "flow."
- **Indistinguishable Events:** Using the same marker for every event type,
  forcing the user to read every word to find what they need.

## Validation Criteria

- [ ] Timeline has a clear "Track" and "Marker" system.
- [ ] Events are logically grouped by time (e.g., by day).
- [ ] Hierarchy is clear: The Action and Actor are more prominent than the Meta
      data.
- [ ] Markers use consistent icons/colors to signal event types/statuses.
- [ ] Timestamps use the `<time>` element and are clearly positioned.
- [ ] Layout is responsive (stacks vertically on mobile).
- [ ] Accessibility: Focus states are defined for interactive timeline items.

---
name: timeline-activity-system
description:
  Design and implement a systematic framework for chronological events and
  activity logs, managing spatial rhythm, event grouping, and status
  visualization.
---

# Timeline & Activity System

## Purpose

The Timeline & Activity System provides a methodology for designing the visual and spatial organization of chronological information. It ensures that event logs, project histories, and roadmaps are scannable, accessible, and provide a clear sense of progression. This system manages the rhythm between time markers, event descriptions, and status indicators to transform raw chronological data into a coherent narrative.

## Use Cases

- **Activity Feeds:** Displaying user actions or system events in a SaaS dashboard.
- **Project Milestones:** Visualizing the history or future roadmap of a project.
- **Order Tracking:** Showing the status of a shipment or service fulfillment.
- **Historical Timelines:** Presenting company history or biographical events on an "About" page.
- **Audit Logs:** Designing dense, technical records of system changes for administrative views.

## When NOT to Use

- **Static Lists:** If the chronological aspect is secondary to the content itself (e.g., a simple list of blog posts), use `card-ui-system` or standard lists.
- **Navigation:** Do not use a timeline for primary site navigation; use `site-navigation-system`.
- **Real-time Chat:** While chat is chronological, it has unique interaction patterns (bubbles, alignment) that differ from a structured timeline.
- **Complex Schedules:** For calendar-based scheduling where multiple parallel tracks exist, use a dedicated calendar or Gantt chart UI.

## Inputs

1. **Event Data:** The timestamp, title, description, and status of each entry.
2. **Temporal Scale:** The duration being covered (minutes vs. years) which dictates marker density.
3. **Actor Information:** Who or what triggered the event (User avatar, system icon).
4. **Action Priority:** Which events are critical milestones vs. minor background updates.

## Outputs

1. **Timeline Anatomy Spec:** Definition of the track (line), markers (nodes), and content containers.
2. **Grouping Logic:** Rules for how events are clustered (e.g., by Day, Month, or Status).
3. **Status Matrix:** Visual treatments for "Completed," "Current," and "Upcoming" events.
4. **Responsive Strategy:** How the layout shifts from multi-column/alternating to single-track mobile views.

## Workflow

### 1. Select the Spatial Orientation

Choose a layout based on the content volume and context:
- **Vertical (Standard):** Best for scannability and long feeds. Content is usually left-aligned or alternating.
- **Horizontal:** Best for high-level roadmaps or process steps within a limited vertical space.
- **Alternating Vertical:** Best for storytelling (About pages) where visual interest is prioritized over high-density scannability.

### 2. Establish the Chronological Track

Define the visual anchor:
- **The Line:** Determine thickness, style (solid vs. dashed), and color.
- **The Markers (Nodes):** Use circles, icons, or dots to indicate event points.
- **The Connection:** Decide how markers connect to the content (e.g., horizontal stems).

### 3. Apply Grouping and Rhythm

Reduce visual noise by clustering related events:
- **Time Headers:** Use sticky or distinct headers (e.g., "Yesterday," "October 2023") to break the sequence.
- **Proximity:** Keep events within a group closer together than the groups themselves.
- **Marker Variation:** Use larger markers for "Milestones" and smaller ones for "Micro-activities."

### 4. Design the Event Anatomy

Apply `visual-hierarchy-system` to the event content:
- **The Stamp:** The time or date, often placed in a muted color or a specific column.
- **The Lead:** A concise title or summary of the action.
- **The Detail:** Optional description, tags, or links.
- **The Actor:** An avatar or icon indicating who triggered the event.

### 5. Define State and Progression

Show the "Now" vs. the "Then":
- **Completed:** Solid line and filled/checked markers.
- **Current:** Highlighted marker (glow/pulsing) or high-contrast color.
- **Upcoming:** Faded/dashed line and hollow markers.

## Decision Rules

- **The Density Rule:** For technical audit logs, use a single-column layout with left-aligned text to maximize data density. For marketing timelines, use alternating layouts.
- **Marker Meaning:** Do not use icons alone for status; always pair with a label or tooltip to ensure accessibility.
- **Time Formatting:** Use relative time (e.g., "2 hours ago") for recent events (< 24h) and absolute dates for older entries.
- **The "Thread" Rule:** If multiple events are related (e.g., a sub-task update), use a nested or branched line to show the relationship.

## Constraints

- **Accessibility:**
  - Every timeline must have a logical heading structure.
  - Interactive nodes must be keyboard navigable and have focus states.
  - Contrast for markers and lines must meet WCAG AA (3:1 for UI components).
- **Responsiveness:**
  - Horizontal timelines must either switch to vertical or allow horizontal scrolling with clear affordances on mobile.
  - Alternating layouts should collapse to a single left-aligned track on mobile.
- **Hierarchy:** The timeline track should never be more visually prominent than the content it carries.

## Common Failure Patterns

- **The "Floating Node":** Markers that don't align with their content, making it unclear which event they represent.
- **Information Overload:** Including too much body text in every event, making the timeline impossible to scan.
- **Broken Track:** Gaps in the timeline line that make the chronological connection feel severed.
- **Lack of "Now":** Failing to visually distinguish the current state or most recent event, forcing the user to hunt for the latest update.
- **Inconsistent Spacing:** Using the same gap for a 5-minute difference as a 5-month difference (unless using a non-linear scale intentionally).

## Validation Criteria

- [ ] Timeline has a clear vertical or horizontal track (line).
- [ ] Events are logically grouped (e.g., by date) with visible headers.
- [ ] Current, past, and future states are visually distinct.
- [ ] Markers align precisely with their corresponding content.
- [ ] Mobile view collapses to a functional single-track layout.
- [ ] Accessibility: Markers and lines meet 3:1 contrast; content follows heading hierarchy.
- [ ] Relative vs. Absolute time is used appropriately for the context.

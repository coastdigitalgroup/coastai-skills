---
name: timeline-activity-system
description:
  Design and document a systematic framework for chronological events and
  activity logs, managing spatial rhythm, event grouping, and status
  visualization.
---

# Timeline and Activity System

## Purpose

The Timeline and Activity System skill provides a methodology for designing
interfaces that display chronological data. Whether it's a project history, an
activity feed, or a package tracking log, this system ensures that time-based
information is scannable, grouped logically, and provides clear visual cues for
different event types and statuses.

## Use Cases

- **Activity Feeds:** Real-time updates in collaborative tools (e.g., "User X
  commented on Task Y").
- **Audit Logs:** Security-focused history of system changes or user actions.
- **Order Tracking:** Progressive status updates for e-commerce or delivery.
- **History/Changelogs:** Version histories for documents or software releases.
- **Personal Journals/Portfolios:** Chronological display of personal milestones
  or project completions.

## When NOT to Use

- **Static Content Lists:** Use `card-ui-system` for non-chronological collections.
- **Complex Data Sets:** Use `data-table-ui-system` if the primary need is
  sorting/filtering across many attributes rather than chronological flow.
- **Process Steps:** Use `step-progress-system` for future-facing, linear
  processes where the user is currently engaged in a flow.

## Inputs

1. **Event Types:** A taxonomy of what can happen (e.g., Creation, Edit, Deletion,
   Comment).
2. **Timestamps:** The granularity of time needed (Absolute date vs. Relative
   time).
3. **Actor Information:** Who or what triggered the event (User, System,
   Integration).
4. **Status Mapping:** Success, Warning, Error, or Neutral states associated
   with events.

## Outputs

1. **Event Anatomy Spec:** Visual definitions for icons, titles, metadata (time),
   and content blocks.
2. **Timeline Rhythm Blueprint:** Rules for vertical connection lines, spacing
   between events, and grouping headers.
3. **State Matrix:** Visual treatments for different event types and priorities.
4. **Responsive Stacking Rules:** How the timeline adapts to narrow viewports.

## Workflow

### 1. Define the Event Anatomy

Each entry in the timeline should have a consistent "bone structure":
- **The Marker:** An icon, dot, or avatar that sits on the timeline line.
- **The Content:** A title describing the event and an optional body for details.
- **Metadata:** A timestamp and/or actor identification.
- **Connectors:** Vertical lines that visually link sequential events.

### 2. Establish Grouping Logic

Reduce cognitive load by grouping events:
- **Date Grouping:** "Today," "Yesterday," "October 12th."
- **Batching:** If a single user performs 10 actions in 1 minute, group them
  under a single header to avoid "log spam."

### 3. Choose the Layout Pattern

- **Left-Aligned (Standard):** The timeline line is on the far left. Best for
  readability and mobile responsiveness.
- **Center-Aligned:** Events alternate left and right of a center line. Best for
  high-level storytelling or marketing (e.g., "Our Company History").
- **Dense vs. Loose:** Determine padding based on the "gravity" of the data.
  Audit logs should be dense; personal journals should be loose.

### 4. Design for Scannability

Use visual levers to help users find what matters:
- **Iconography:** Use specific icons for different event types (e.g., a "plus"
  for creation).
- **Color Coding:** Subtle color accents for high-priority events (e.g., a red
  marker for a "Failed" system event).
- **Typography:** Bold the "Action" or the "Actor" depending on what the user
  searches for most.

### 5. Plan for Scale and States

- **Empty State:** Design how the timeline looks before any events occur.
- **Loading State:** Use `skeleton-state-system` to indicate incoming data.
- **"Load More":** Define how historical data is fetched (Infinite scroll vs.
  Button).

## Decision Rules

- **Relative vs. Absolute Time:** Use relative time (e.g., "2 hours ago") for
  recent events (last 24 hours). Use absolute timestamps (e.g., "Oct 15, 2023,
  10:30 AM") for historical records or audit logs.
- **The Connection Rule:** Always use a vertical connection line if events are
  directly related or part of a continuous history. Break the line if there is a
  significant gap in time or a change in status.
- **Icon vs. Avatar:** Use avatars if the "Who" is most important (Social/Feed).
  Use icons if the "What" is most important (System/Audit).
- **Secondary Actions:** Place actions like "View Details" or "Rollback" within
  the event block, but keep them secondary to the event description.

## Constraints

- **Accessibility:**
    - Use `<ol>` or `<ul>` for the timeline list.
    - Timestamps should be wrapped in a `<time>` tag.
    - If using color to indicate status, ensure there is an icon or text
      supplement to satisfy WCAG AA (Color is not the only signifier).
- **Responsiveness:**
    - Center-aligned timelines should switch to left-aligned on mobile.
    - Connectors must align perfectly with markers regardless of content height.
- **Visual Hierarchy:** Group headers must be more prominent than individual
  event titles.

## Common Failure Patterns

- **The "Disconnected" Timeline:** Markers that don't align with the line or
  lines that don't connect, breaking the "pathway" metaphor.
- **Information Overload:** Including too much technical detail in the top-level
  view, making the feed hard to scan.
- **Inconsistent Spacing:** Varying the gap between the marker and the content,
  creating a jagged visual rhythm.
- **Ambiguous Time:** Using only relative time ("3 days ago") without a way to
  see the exact moment an event occurred.

## Validation Criteria

- [ ] Events follow a consistent internal anatomy (Marker, Content, Metadata).
- [ ] Timeline connection lines are visually continuous and aligned.
- [ ] Grouping logic (e.g., by date) is applied to reduce clutter.
- [ ] Status indicators (if used) are accessible via more than just color.
- [ ] Responsive behavior for mobile is defined (usually left-aligned).
- [ ] Relative vs. Absolute time usage follows a clear logic.

---
name: timeline-activity-system
description:
  Design a systematic framework for chronological events and activity logs,
  managing spatial rhythm, event grouping, and status visualization.
---

# Timeline and Activity System

## Purpose

The Timeline and Activity System provides a methodology for designing chronological
data displays. It ensures that users can easily track the sequence of events,
understand the relationship between time and actions, and scan complex activity
logs without cognitive overload. This system manages the visual markers, spatial
rhythm, and grouping logic required to transform raw logs into a meaningful
narrative.

## Use Cases

- **Activity Feeds:** Showing a live stream of user actions in a collaborative
  app (e.g., "User A edited File B").
- **Project Histories:** Tracking milestones, deadlines, and completed phases
  in a project management tool.
- **Order Tracking:** Visualizing the shipping and delivery stages for
  e-commerce.
- **Company Milestones:** Designing an "About Us" page that highlights key
  historical events.
- **Audit Logs:** Creating dense, scannable records for administrative or
  security reviews.

## When NOT to Use

- **Static Lists:** If the order isn't strictly chronological or the time
  element is irrelevant, use a standard `card-ui-system` or `data-table-ui-system`.
- **Primary Navigation:** Do not use a timeline for site structure; use
  `site-navigation-system`.
- **Real-time Chat:** While chat is chronological, it has unique interaction
  patterns (bubbles, typing indicators) better handled by a dedicated
  conversational UI system.

## Inputs

1. **Event Data:** What happened? (Title, Description).
2. **Timestamps:** When did it happen? (Absolute vs. Relative time).
3. **Actor/Entity:** Who or what triggered the event? (Avatars, System icons).
4. **Status/Type:** Is it a success, failure, warning, or neutral update?
5. **Quantity:** Is this a sparse history (3-5 events) or a dense log (100+
   events)?

## Outputs

1. **Orientation Selection:** Choice between Vertical (standard logs) or
   Horizontal (milestones/processes).
2. **Marker & Line Spec:** Design of the "track" and the nodes (dots, icons,
   avatars).
3. **Grouping Logic:** Rules for clustering events by day, week, or phase.
4. **Responsive Strategy:** How the timeline adapts for mobile (e.g.,
   horizontal to vertical flip).

## Workflow

### 1. Select the Spatial Orientation

- **Vertical (Left-Aligned):** The most common pattern. Content sits to the
  right of the line. Best for infinite feeds and readability.
- **Vertical (Alternating):** Content alternates left and right of the line.
  Best for storytelling or "Company History" pages.
- **Horizontal:** Best for linear processes with a fixed number of steps (e.g.,
  Order Tracking) or high-level milestones.

### 2. Define the Marker Hierarchy

Assign visual weight to events based on their importance:
- **Major Markers:** Icons or avatars. Use for high-level changes (e.g., "Status
  Changed to Live").
- **Minor Markers:** Simple dots. Use for routine updates (e.g., "Comment
  added").
- **Status Indicators:** Use color (Green/Red/Amber) on the marker or the line
  itself to signal success or failure.

### 3. Establish the Temporal Rhythm (Grouping)

Don't repeat the date for every item. Use "Time Buckets":
- **Date Headers:** Group items under "Today," "Yesterday," or "Oct 24, 2023."
- **Connecting Lines:** Use solid lines for continuous activity and dashed
  lines for gaps in time or "future" planned events.
- **Density Control:** For very dense logs, use "compact" markers with
  minimalist descriptions.

### 4. Design the Content Anatomy

Each entry in the timeline should follow a consistent internal hierarchy:
- **Primary Label:** The "What" (e.g., "Invoice Paid").
- **Secondary Meta:** The "Who" and "When" (e.g., "by Sarah J. • 2 mins ago").
- **Supporting Detail:** Optional snippets or attachments (e.g., "View Receipt").

### 5. Plan for Responsive Adaptation

- **Horizontal to Vertical:** On mobile, horizontal timelines almost always
  need to flip to a vertical orientation to avoid horizontal scrolling.
- **Margin Compression:** Reduce the space between the line and the content
  on small screens.
- **Relative Time:** Prioritize relative time (e.g., "3h ago") on mobile to save
  horizontal space.

## Decision Rules

- **The Density Rule:** If you have more than 10 events per view, use a
  **Vertical Left-Aligned** layout. Alternating layouts become too difficult
  to scan at high densities.
- **Relative vs. Absolute:** Use **Relative time** ("2 hours ago") for recent
  activity (last 24 hours). Use **Absolute time** ("Oct 12, 14:30") for older
  records or audit logs where precision is critical.
- **The "Future" Line:** If the timeline includes future steps, use a lighter
  gray or dashed line to distinguish "completed" from "pending."
- **Empty State:** If a timeline is empty, don't just show a blank line. Use
  `empty-state-system` to encourage the first action.

## Constraints

- **Accessibility:** Timelines must be navigable via keyboard. Screen readers
  should announce the date/time header before the events within that group.
- **Visual Contrast:** Connecting lines must have a minimum contrast of 3:1
  against the background to be visible to low-vision users.
- **Stacking:** On mobile, the vertical line should remain visible as an anchor
  point for the eye, even if margins are reduced.

## Common Failure Patterns

- **The Floating Marker:** Markers that don't align perfectly with the text
  baseline, making the timeline feel "broken."
- **Date Overload:** Repeating "October 14th" twenty times in a row instead of
  using a single group header.
- **The Mobile Squish:** Trying to keep a horizontal timeline on mobile,
  resulting in tiny, unreadable text or broken layouts.
- **Broken Threads:** Using different line styles or colors without a clear
  meaning, confusing the user about the process flow.

## Validation Criteria

- [ ] Timeline has a clear "Start" and "End" (or "Present") point.
- [ ] Events are grouped logically by date or phase.
- [ ] Visual markers (icons/dots) distinguish between different event types.
- [ ] Layout switches to a readable vertical stack on mobile viewports.
- [ ] Connecting lines meet accessibility contrast requirements (3:1).
- [ ] Relative vs. Absolute time is used appropriately for the context.

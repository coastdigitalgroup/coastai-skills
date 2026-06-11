# Example: Project Activity Feed

This example demonstrates the Timeline & Activity System applied to a SaaS project management dashboard. It shows how to handle different event types, grouping, and visual hierarchy.

## Scenario
A project manager is reviewing the recent activity on a "Website Redesign" project. The feed includes design updates, task completions, and automated system events.

## Visual Breakdown

### 1. Grouping by Date
- **Today** (Header)
  - *Event:* Task Completed (High Priority)
  - *Event:* Comment Added
- **Yesterday** (Header)
  - *Event:* File Uploaded
  - *Event:* Status Changed

### 2. Event Anatomy (Example: Task Completion)
- **Time:** 10:42 AM
- **Marker:** Filled green circle with a check icon.
- **Actor:** Avatar of "Alex Rivera".
- **Content:**
  - **Title:** Completed "Homepage Wireframes"
  - **Metadata:** Tag: `Design` | Link: `View Task`

### 3. Visual Rhythm (The Track)
- A solid 2px light-gray line connects all markers.
- The marker for "Today" is at the very top.
- The line continues downward into "Yesterday," where it becomes a dashed line to indicate older history.

## Layout Specs

| Element | Style | Spacing |
| :--- | :--- | :--- |
| **Date Header** | Semibold, Muted Text | 24px bottom margin |
| **Track Line** | #E2E8F0 (Light Gray) | 20px from left edge |
| **Milestone Marker** | 16px diameter, Brand Color | Centered on track |
| **Minor Marker** | 8px diameter, Gray | Centered on track |
| **Content Block** | Left-aligned text | 16px from marker |

## Responsive Behavior
- **Desktop:** The timestamp is in a fixed-width column to the left of the track.
- **Mobile:** The timestamp moves above the event title to save horizontal space, and the track shifts closer to the left edge (8px).

---

## Why this works
- **Scannability:** The project manager can quickly see who did what and when.
- **Hierarchy:** Large milestones stand out from minor updates via marker size.
- **Context:** Avatars provide immediate visual recognition of the "actor."

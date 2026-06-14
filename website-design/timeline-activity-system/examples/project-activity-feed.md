# Example: Project Activity Feed

This example demonstrates the **Timeline & Activity System** applied to a collaborative project management tool's activity feed.

## Scenario
A "Project History" view where team members can see updates to a specific task. The design uses a **Vertical Single-Side** layout with **Date Grouping** and **Semantic Nodes**.

## Layout Breakdown

### 1. The Container
- **Alignment:** Left-aligned track with content extending to the right.
- **Spacing:** `80px` left margin to allow for the timestamp, `24px` between the track and the content.

### 2. Date Grouping
- **Header:** "Today" (Sticky Header, Small Caps, Muted Grey).
- **Rhythm:** `40px` space between date groups; `24px` space between events in the same group.

### 3. Event 1: Status Change (Milestone)
- **Node:** Large Green Circle with Checkmark Icon (`✅`).
- **Metadata:** "Jules • 10:15 AM"
- **Content:** "Status changed to **Completed**"
- **Visual Weight:** High (Bold text, colored node).

### 4. Event 2: Comment (Routine)
- **Node:** Small Grey Circle with Speech Bubble Icon (`💬`).
- **Metadata:** "Alex • 9:30 AM"
- **Content:** "Added a comment: 'Final assets are in the Figma file.'"
- **Visual Weight:** Medium (Standard text, muted node).

### 5. Event 3: File Upload (Routine)
- **Node:** Small Grey Circle with Paperclip Icon (`📎`).
- **Metadata:** "Alex • 9:25 AM"
- **Content:** "Uploaded `v2-final-export.zip` (4.2 MB)"
- **Visual Weight:** Medium.

---

## Evolution to Mobile

1. **Timestamp Shift:** On desktop, the timestamp sits to the left of the track. On mobile, it moves *above* the content block to save horizontal space.
2. **Track Thinning:** The track width reduces from `4px` to `2px` to feel less heavy on small screens.
3. **Touch Targets:** The entire content block (Metadata + Content) becomes a tap target if the event is expandable.

## Why this works
- **Scanability:** The use of specific icons for "Status," "Comment," and "Upload" allows users to filter the history visually without reading every line.
- **Hierarchy:** The "Completed" milestone is visually louder than the routine comments, highlighting the project's progress.
- **Context:** Date grouping prevents the feed from feeling like an infinite, unorganized list.

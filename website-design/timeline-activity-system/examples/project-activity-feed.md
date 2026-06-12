# Example: Project Activity Feed

This example demonstrates a standard left-aligned timeline used in a project management SaaS application. It showcases event grouping, actor avatars, and status indicators.

## The Scenario
A project manager needs to see a chronological history of changes made to a "Product Launch" project. The feed includes task completions, comments, and file uploads.

## Layout Breakdown

### 1. Date Grouping (The Rhythm)
Events are grouped by day to provide a clear sense of when "bursts" of activity occurred.
- **Header:** "Today" (Typography: H3, `--font-weight-bold`)
- **Header:** "Yesterday" (Typography: H3, `--font-weight-bold`)

### 2. Event Anatomy (The Structure)
Each event follows a left-aligned pattern:
- **Marker Column (48px):** Contains the vertical connection line and the Actor's Avatar.
- **Content Column:**
    - **Top Row:** Actor Name (`--font-weight-bold`) + Action Description + Timestamp (`--color-text-muted`, `--font-size-sm`).
    - **Body (Optional):** Details of the action, such as the text of a comment or a preview of an uploaded file.

### 3. Visual Cues (The Scannability)
- **Status Indicators:** When a task is "Completed," a small green checkmark icon is overlaid on the actor's avatar or placed next to the timestamp.
- **Connection Line:** A 2px solid line (`--color-border`) runs vertically through the center of the avatars, connecting all events within a date group.

## Annotated Schematic

```text
[ TODAY ] ------------------------------------------- (Date Header)
  |
 (A)  Jane Cooper completed "Define MVP Scope"        (Marker: Avatar)
  |   2 hours ago                                     (Metadata)
  |
 (B)  Guy Hawkins commented on "Design System"        (Marker: Avatar)
  |   4 hours ago                                     (Metadata)
  |   "Looks great! I especially like the new         (Body Content)
  |   spacing tokens."
  |
 (C)  System added 3 new members                      (Marker: System Icon)
      6 hours ago

[ YESTERDAY ] ---------------------------------------- (Date Header)
  |
 (D)  Kristin Watson uploaded "Brand_Guidelines.pdf"  (Marker: Avatar)
      Oct 14, 4:15 PM
```

## Why this works
- **Vertical Alignment:** The consistent left alignment of avatars and text allows the eye to scan down the "Who" and "What" without zig-zagging.
- **Clear Hierarchy:** The date headers break up the long list, making it feel less overwhelming.
- **Information Density:** By using relative time for today and absolute for yesterday, it balances urgency with precision.

# Example: Project Activity Feed

This example demonstrates the Timeline Activity System applied to a complex
B2B SaaS project management dashboard. It shows how to handle different event
types, grouping, and metadata in a vertical layout.

## The Design Problem

A project management tool needs to show the history of a specific task. The
history includes status changes, comments, file uploads, and automated
system updates. Without a systematic approach, this feed becomes a cluttered
list of text that is hard to scan for specific "Milestone" moments.

## Timeline Breakdown

### 1. Temporal Grouping

The feed is grouped by absolute dates to provide clear landmarks:
- **Heading:** "Today"
- **Heading:** "Yesterday"
- **Heading:** "October 24, 2023"

### 2. Node & Marker Strategy

Three types of nodes are used to differentiate event "weight":

- **Milestone Node (Large):** A 12px brand-colored circle with a white center.
  Used for "Task Created" and "Task Completed."
- **Action Node (Standard):** An 8px neutral-colored circle. Used for "Status
  Changed" or "Assigned to User."
- **Comment Node (Iconic):** A 24px avatar of the user who made the comment.

### 3. The Content Block (Layout)

Each event follows a consistent horizontal arrangement:
- **Left Column (40px):** The Node/Marker.
- **Center Column (Flexible):**
    - **Row 1:** Event Title (Bold) + Timestamp (Muted).
    - **Row 2:** Description or Body (e.g., the actual comment text).
    - **Row 3 (Optional):** Attachments or Meta-tags.

### 4. Visual Hierarchy

- **Status Changes:** Use high-contrast badges (e.g., "In Progress" in Blue) to
  make state changes immediately visible.
- **Automated vs. Human:** System actions (e.g., "Auto-saved") use a lighter font
  weight and no avatar to distinguish them from human interventions.

## Visual Representation (Annotation)

```text
[DATE HEADING: TODAY]
|
o--- [TITLE: Status changed to "In Review"] [TIME: 10:45 AM]
|    [META: by Sarah Jenkins]
|
(A)--- [TITLE: Sarah Jenkins commented] [TIME: 9:15 AM]
|      "The final assets are ready for review. See attached."
|      [ATTACHMENT: design_assets_v2.zip]
|
o--- [TITLE: Assigned to Sarah Jenkins] [TIME: 8:00 AM]
|
[DATE HEADING: YESTERDAY]
|
o--- [TITLE: Task Created] [TIME: 4:30 PM]
|    [META: by Alex Rivera]
```

## Why This Works

1.  **Scanning Speed:** The date headings act as anchors, allowing the user to
    skip to a specific day instantly.
2.  **Clarity of Action:** By using different node types, the user can
    distinguish between a "Comment" and a "System Change" without reading the
    text.
    **Responsive Integrity:** On mobile, the thread stays on the far left, and
    the content takes up the remaining 100% of the width, ensuring no text is
    squeezed.
3.  **Logical Flow:** The continuous vertical thread reinforces the "line of
    time," making the history feel like a single narrative.

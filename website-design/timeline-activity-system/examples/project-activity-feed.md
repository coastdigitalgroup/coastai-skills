# Project Management Activity Feed

This example demonstrates how to apply the **Timeline and Activity System** to a
complex, multi-actor project environment. It focuses on scannability, temporal
grouping, and actor attribution.

## Design Scenario

A project manager needs to review the updates on a "Q4 Marketing Campaign" over
 the last 48 hours. The feed includes file uploads, status changes, and
 comments from multiple team members.

## Visual Breakdown

### 1. The Temporal Group (Today)
- **Header:** "Today, Oct 24" (Large, bold, sticky header).
- **Event A (High Priority):**
    - **Marker:** Green checkmark icon (Status Change).
    - **Content:** "Status changed to **Approved**".
    - **Meta:** "by Marcus Aurelius • 10:15 AM".
- **Event B (Medium Priority):**
    - **Marker:** User Avatar (User Action).
    - **Content:** "Uploaded **Campaign_Brief_v2.pdf**".
    - **Meta:** "by Julia Domna • 9:30 AM".
    - **Attachment:** A small thumbnail/icon representing the PDF.

### 2. The Temporal Group (Yesterday)
- **Header:** "Yesterday, Oct 23".
- **Event C (Low Priority):**
    - **Marker:** Simple dot (Routine update).
    - **Content:** "Left a comment: 'Let's ensure the color palette matches the
      new brand guidelines.'"
    - **Meta:** "by Lucius Verus • 4:45 PM".

## Applied Decision Rules

| Rule | Implementation |
| :--- | :--- |
| **Density Rule** | Left-aligned vertical layout used for maximum scannability of multiple updates. |
| **Marker Hierarchy** | Status changes use functional icons; content updates use avatars; routine tasks use dots. |
| **Time Bucketing** | Events are grouped under clear "Date Headers" to avoid redundant timestamping. |
| **Relative Time** | Used in tandem with absolute time (e.g., "10:15 AM (2h ago)") for immediate context. |

## Accessibility Considerations

- **Landmarks:** The entire feed is wrapped in an `<aside>` or `<section>` with
  `aria-label="Activity Feed"`.
- **Headings:** Date headers are `<h3>` tags to allow screen reader users to
  jump between days.
- **Alt Text:** User avatars have alt text (e.g., "Profile photo of Marcus
  Aurelius").
- **Contrast:** The vertical connecting line is `#D1D5DB` (Gray 300) on a white
  background, ensuring it is visible without being distracting.

# Example: Project Activity Feed

This example demonstrates the **Timeline and Activity Feed System** applied to a "Project History" view in a SaaS productivity tool. It showcases event grouping, marker hierarchy, and status visualization.

## Scenario
A project manager needs to audit the last 24 hours of changes on a high-priority "Website Redesign" project. The feed needs to surface who did what, when, and if any actions require attention (errors/warnings).

## Layout Breakdown

### 1. Grouping: By Date
The feed is grouped into "Today" and "Yesterday" to provide immediate temporal context.

### 2. Timeline Components

| Zone | Implementation | Purpose |
| :--- | :--- | :--- |
| **The Track** | A solid 2px light-gray line running vertically. | Provides a visual "thread" connecting all activities. |
| **Markers** | Mixed Avatars and Icons. | Avatars show "Who"; Icons show "System Status". |
| **Content** | Left-aligned text cards. | Displays the narrative of the event. |

---

## Visual Representation (Annotation)

### [Today]
- **(Marker: Avatar - Jane C.)**
  **Action:** Jane Cooper uploaded `Brand_Guidelines_v2.pdf`
  *Meta:* 10:45 AM • 4.2 MB • [View File]

- **(Marker: Icon - Success Checkmark)**
  **Action:** System successfully deployed to `Staging`
  *Meta:* 9:15 AM • Build #452 • [View Logs]

- **(Marker: Icon - Warning Triangle)**
  **Action:** Automated Test Failed: `Lighthouse Performance`
  *Meta:* 8:00 AM • Score: 64/100 • [Review Report]

### [Yesterday]
- **(Marker: Avatar - Alex R.)**
  **Action:** Alex Rivera moved `Navbar Design` to "Done"
  *Meta:* 4:30 PM • [Open Task]

- **(Marker: Icon - Circle Dot)**
  **Action:** Project "Website Redesign" was created by System
  *Meta:* 9:00 AM

---

## Decision Logic Applied

- **Relative vs. Absolute Time:** All events use relative time (e.g., "2h ago") in the UI, but the underlying metadata follows the absolute timestamp rule.
- **Single-sided Layout:** Content is placed to the right of the track for maximum readability and ease of stacking on mobile.
- **Marker Hierarchy:**
  - **Jane/Alex:** Using Avatars because human collaboration is the primary focus.
  - **System/Tests:** Using Icons because the *status* of the action is more important than the "System" entity itself.
- **Color Coding:** The warning triangle is `--color-warning-600` (Amber) and the checkmark is `--color-success-600` (Green) to signal status without requiring the user to read the text.

## Responsive Adaptation
- **Desktop:** The timeline sits in a 600px central column.
- **Mobile:** The track line shifts to the far left (16px margin), and avatars/icons scale down slightly to preserve horizontal space for the text content.

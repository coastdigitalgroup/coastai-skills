# Reference: Threading and Nesting Rules

This reference outlines the logic and best practices for managing threaded
conversations across different screen sizes and community types.

## 1. Nesting Models

### A. Deep Threading (Discovery-First)
- **Best for:** Long-form discussions, debate-heavy communities (e.g., Reddit).
- **Rule:** Maintain parent-child relationships as long as possible.
- **Visuals:** Indentation + Thread lines.
- **Cap:** 5–7 levels on desktop; 2–3 on mobile.

### B. Flat / Hybrid (Action-First)
- **Best for:** Collaborative tools, task management (e.g., Slack, GitHub).
- **Rule:** Newest comments appear at the bottom of the list.
- **Visuals:** "@mention" references instead of indentation.
- **Cap:** 1 level (replies appear directly under the parent but are not further
  indented).

## 2. Managing the "Indent Death"

As threads get deeper, the available width for text shrinks. Use these
strategies to prevent unreadable columns:

| Level | Desktop Strategy | Mobile Strategy |
| :--- | :--- | :--- |
| **0** | Full Width | Full Width |
| **1-3** | Standard Indent (32px) | Narrow Indent (12px) |
| **4-5** | Narrow Indent (16px) | Flatten (0px) + @mention |
| **6+** | "Continue thread" link | New focused view page |

## 3. Thread Line Logic

Thread lines provide a visual "anchor" for the eye.

- **Placement:** Positioned 50% through the avatar of the parent, extending
  vertically to the avatar of the child.
- **Active State:** When hovering over a reply, the entire thread line back
  to the root can be highlighted to show the path of conversation.
- **Termination:** The line should end at the final reply in a branch; do
  not extend it into empty whitespace.

## 4. The "Show More" Pattern

For high-volume threads, do not load every child by default.

- **Collapse Rule:** If a child has >10 replies, show the first 3 and provide
  a "Show 7 more replies" button.
- **Context Preservation:** Clicking "Show more" should expand inline without
  reloading the page.
- **Deep Links:** Provide a "Link to this comment" action so users can share
  specific sub-threads directly.

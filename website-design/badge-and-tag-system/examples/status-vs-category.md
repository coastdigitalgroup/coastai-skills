# Example: Status vs. Category

This example demonstrates how to differentiate between a **Status Badge** (system-driven state) and a **Category Tag** (user-driven or metadata classification) within a SaaS project management interface.

## Scenario: Project List Item

In a list of projects, we need to show:
1.  The project's current status (Active, On Hold, Completed).
2.  The project's category or department (Engineering, Marketing, HR).

### The Implementation

#### 1. Status Badge (The "What is it doing?")
-   **Style:** Pill-shape, subtle background with high-contrast text and a leading icon.
-   **Logic:**
    -   `Active`: Green background, dark green text, checkmark icon.
    -   `On Hold`: Yellow background, dark brown text, clock icon.
    -   `Completed`: Blue background, dark blue text, double-check icon.

#### 2. Category Tag (The "What is it?")
-   **Style:** Rounded-square (4px radius), light grey background, dark grey text, no icon.
-   **Logic:**
    -   Neutral coloring to avoid competing with the high-priority status badges.
    -   Grouped together following the project title.

---

## Visual Breakdown

| Element Type | Visual Style | Purpose | Priority |
| :--- | :--- | :--- | :--- |
| **Status Badge** | High contrast, Semantic color, Icon | Immediate understanding of health/progress | High |
| **Category Tag** | Low contrast, Neutral color, Text-only | Contextual classification/organization | Medium |

### Accessibility Considerations
-   **Icons for Status:** Even if a user cannot distinguish green from yellow, the checkmark vs. clock icon provides the necessary context.
-   **Contrast:** The text colors are chosen to ensure a 4.5:1 ratio against their tinted backgrounds.
-   **Semantic HTML:** Statuses might be wrapped in a `<span role="status">` if updated dynamically.

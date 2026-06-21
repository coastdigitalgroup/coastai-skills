# Button Hierarchy Breakdown

This example demonstrates the application of the **Button and Action System** in a SaaS dashboard environment, showing how multiple levels of hierarchy and gravity are managed in close proximity.

## Scenario: Project Management Dashboard

A user is viewing a "Project Details" page. They need to manage the project status, invite collaborators, and potentially delete the project.

### 1. Page Header Actions (Global Page Level)

In the page header, we have a group of actions that affect the entire project entity.

- **Primary Action (Level 1):** "Update Status"
  - **Style:** Brand Color, Filled.
  - **Logic:** This is the most frequent and important task. It sits on the far right.
- **Secondary Action (Level 2):** "Invite People"
  - **Style:** Neutral Border, No Fill.
  - **Logic:** A supporting action that is important but not the primary goal of this view.
- **Tertiary Action (Level 3):** "More (...)"
  - **Style:** Ghost / Icon-only.
  - **Logic:** Contains destructive or rare actions (e.g., "Delete Project") to prevent accidental triggers.

### 2. Card-Level Actions (Component Level)

Inside a "Task Card," the hierarchy is tighter to avoid visual noise.

- **Action 1 (Ghost):** "Edit"
  - **Style:** Subtle text link with leading icon.
- **Action 2 (Ghost):** "Delete"
  - **Style:** Danger color (Red) on hover/active.
  - **Logic:** Uses `button-and-action-system`'s "Danger" logic but as a ghost variant to maintain the card's clean design until interaction.

### 3. Modal Footer (Task Level)

When "Update Status" is clicked, a modal appears with a focused decision.

- **Confirm (Primary):** "Save Changes"
  - **Style:** High-contrast filled button.
- **Cancel (Secondary):** "Cancel"
  - **Style:** Ghost button.
  - **Logic:** Clearly subordinate to the "Save" action, helping the user make a faster decision.

---

## Visual Summary of Hierarchy

| Priority | Variant | Usage Context | Expected Behavior |
| :--- | :--- | :--- | :--- |
| **High** | Primary | Main CTA, Hero, Modal Confirm | Commands attention, only one per view. |
| **Medium** | Secondary | Supporting actions, Filter toggles | Visible but doesn't compete with Primary. |
| **Low** | Ghost | Inline table actions, "Cancel" buttons | Minimal footprint, becomes visible on hover. |
| **Critical** | Danger | Delete, Discard, Unsubscribe | Uses red to signal permanent consequences. |

## Responsive Adaptation

- **Desktop:** Actions are aligned to the right of the header/modal.
- **Mobile:**
  - The "Primary" and "Secondary" actions stack vertically.
  - The "Primary" action becomes a "Block" button (full width) at the bottom of the screen or modal for thumb reachability.
  - The "Ghost" actions in cards remain small but increase their touch target to 44px.

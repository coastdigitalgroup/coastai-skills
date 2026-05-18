# Pattern Selection Scenarios

This example demonstrates how to choose the correct overlay pattern based on the
user task and context.

## Scenario 1: Deleting a Project

**Problem:** The user clicks "Delete" on a high-value project. This is a
destructive, irreversible action.

| Pattern   | Selection | Why?                                                                                                          |
| :-------- | :-------- | :------------------------------------------------------------------------------------------------------------ |
| **Modal** | **Yes**   | Requires high focus, blocks the interface until a decision is made, and prevents accidental clicks elsewhere. |
| Drawer    | No        | Too much space for a simple confirmation; allows background interaction which is risky here.                  |
| Popover   | No        | Too low in hierarchy; might be missed or dismissed accidentally.                                              |

**Anatomy Notes:**

- **Title:** "Delete 'Project Alpha'?"
- **Body:** "This action cannot be undone. All data, including 15 assets and 2
  collaborators, will be permanently removed."
- **Actions:** [Cancel (Tertiary)] [Delete Project (Destructive Primary)]

---

## Scenario 2: Editing User Profile Details

**Problem:** A user in a dashboard wants to update their bio and social links
without navigating away from the current "Team Overview" page.

| Pattern    | Selection | Why?                                                                                                                 |
| :--------- | :-------- | :------------------------------------------------------------------------------------------------------------------- |
| Modal      | Possible  | Good for focus, but might feel heavy for frequent small edits.                                                       |
| **Drawer** | **Yes**   | Ideal for "Side-tasks." Allows the user to keep the Team Overview in view while editing, providing a sense of place. |
| Popover    | No        | Content (form with multiple fields) is too large for a popover.                                                      |

**Anatomy Notes:**

- **Placement:** Slides in from the Right.
- **Header:** "Edit Profile" + Close Button.
- **Body:** Scrollable form with 5-8 fields.
- **Footer:** Fixed "Save Changes" and "Cancel" buttons.

---

## Scenario 3: Language Selector

**Problem:** A user wants to switch the site language from English to Spanish.

| Pattern     | Selection | Why?                                                                                      |
| :---------- | :-------- | :---------------------------------------------------------------------------------------- |
| Modal       | No        | Overkill for a simple list selection.                                                     |
| Drawer      | No        | Takes up too much screen real estate on desktop.                                          |
| **Popover** | **Yes**   | Contextual to the trigger (usually in the header). Efficient for small, quick selections. |

**Anatomy Notes:**

- **Trigger:** "English (US) ▾"
- **Mobile Adaptation:** Transforms into a **Bottom Drawer** for easier thumb
  interaction on small screens.

---

## Scenario 4: "Changes Saved" Feedback

**Problem:** The user successfully updated their profile.

| Pattern      | Selection | Why?                                                                              |
| :----------- | :-------- | :-------------------------------------------------------------------------------- |
| Modal/Drawer | No        | Too intrusive for a positive, expected outcome.                                   |
| **Toast**    | **Yes**   | Provides confirmation without blocking the user's flow. Automatically disappears. |

**Anatomy Notes:**

- **Location:** Top-right (Desktop) or Bottom-center (Mobile).
- **Duration:** 3 seconds.
- **Content:** "✓ Profile updated successfully."

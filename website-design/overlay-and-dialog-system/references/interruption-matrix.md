# Interruption Matrix

Use this matrix to determine which overlay pattern fits your user's current goal
and the required level of interruption.

| Interruption Level      | User Goal                                                | Pattern     | Description                                                                     |
| :---------------------- | :------------------------------------------------------- | :---------- | :------------------------------------------------------------------------------ |
| **High (Blocking)**     | Confirm a risky action or complete a focused task.       | **Modal**   | Requires the user to act before they can return to the main flow.               |
| **Medium (Contextual)** | Manage details related to the main page without leaving. | **Drawer**  | Allows the user to keep the parent context visible while performing a sub-task. |
| **Low (Informational)** | View settings or extra info for a specific UI element.   | **Popover** | Non-blocking, contextual menu or info box anchored to a trigger.                |
| **Passive (Status)**    | Confirm a background event happened.                     | **Toast**   | Temporary, non-blocking notification that doesn't require action.               |

## Detailed Selection Criteria

### Choose a Modal when:

- The task is a "Dead End" (e.g., Login, Signup).
- The action is destructive (e.g., Delete, Discard).
- The user must focus on a single piece of information to make a critical
  choice.

### Choose a Drawer when:

- The content is vertically long (e.g., a filter list or a settings form).
- The user needs to see the main page to complete the task (e.g., editing a row
  in a table).
- You want to provide a "Sheet" experience on mobile.

### Choose a Popover when:

- The content is a simple menu or a tooltip.
- The interaction is very brief (< 5 seconds).
- The trigger is a specific button or icon that needs to remain visible.

### Choose a Toast when:

- The system needs to confirm success (e.g., "Copied to clipboard").
- An error occurred in the background (e.g., "Auto-save failed").
- You want to notify the user without interrupting their current scroll/type
  position.

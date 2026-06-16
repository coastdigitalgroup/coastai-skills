# Example: Action Hierarchy Breakdown

This example demonstrates how to apply the Button UI System to a common complex
interface: a **Project Management Dashboard Modal** for creating a new task.

## The Design Problem

A "Create Task" modal needs to accommodate several actions:
1.  **Saving the task** (The primary goal).
2.  **Canceling the action** (Closing the modal).
3.  **Deleting a draft** (A destructive action).
4.  **Adding an attachment** (A supporting tool).

Without a clear button system, these actions might compete for attention,
leading to user error or hesitation.

---

## 1. Action Mapping & Priority

| Element | Priority | Button Style | Justification |
| :--- | :--- | :--- | :--- |
| **Save Task** | Level 1 (Primary) | Solid (Brand Blue) | The main conversion goal of the modal. |
| **Add Attachment** | Level 2 (Secondary) | Outlined / Icon-Lead | A common but non-critical supporting task. |
| **Cancel** | Level 3 (Tertiary) | Ghost / Text-Only | A safe exit path that shouldn't distract from Saving. |
| **Delete Draft** | Semantic (Danger) | Outlined Red | A destructive action that needs to look different from standard flow. |

---

## 2. Visual Hierarchy Implementation

### Desktop Layout (Bottom-Right Alignment)
The modal footer organizes actions to guide the eye from left to right, ending
with the most important action.

```text
[ Delete Draft ]              [ Cancel ] [ Add Attachment ] [ Save Task ]
(Red Outlined)                (Ghost)    (Outlined Icon)    (Solid Blue)
```

### Mobile Layout (Stacked Alignment)
On mobile, we prioritize reachability and clear vertical progression.

```text
+----------------------------+
| [       Save Task        ] | <- Solid Blue (Full Width)
+----------------------------+
| [     Add Attachment     ] | <- Outlined (Full Width)
+----------------------------+
| [        Cancel          ] | <- Ghost (Full Width)
+----------------------------+
|                            |
| [ Delete Draft ]           | <- Red Outlined (Left Aligned / Secondary)
+----------------------------+
```

---

## 3. State Definitions applied to "Save Task"

*   **Default:** Bright brand blue background, white text.
*   **Hover:** 10% darker blue, subtle shadow increase.
*   **Focus:** 2px solid white inner ring + 2px brand blue outer ring.
*   **Active:** 5% scale down + 20% darker blue.
*   **Loading:** Text fades to 0% opacity, white spinner appears in center.
*   **Disabled:** Muted gray background, 50% opacity white text, `not-allowed`
    cursor.

---

## 4. Why This Works

1.  **Clear Intent:** The solid blue button acts as a visual anchor, telling the
    user exactly where to click to finish the task.
2.  **Safe Destructive Action:** The "Delete" button is red, signaling danger,
    but it is outlined rather than solid to ensure it doesn't compete with
    "Save."
3.  **Reduced Clutter:** "Cancel" is a ghost button, effectively disappearing
    until the user specifically looks for a way out.
4.  **Accessibility:** The mobile layout uses full-width buttons, creating huge
    tap targets for the thumb while maintaining a clear top-to-bottom
    hierarchy.

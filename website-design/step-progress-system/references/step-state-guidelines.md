# Step State Guidelines

A step-based sequence is only as good as the clarity of its states. Follow these
guidelines to ensure users always know their status.

## 1. Visual Requirements by State

### Pending (Incomplete/Future)
- **Contrast:** Maintain at least 3:1 for the indicator, but keep it visibly
  distinct from the active step.
- **Opacity:** 40-60% of the primary label color is standard.
- **Interactivity:** Non-clickable in strict linear flows.

### Active (Current)
- **Size:** Can be slightly larger (e.g., 32px circle vs 24px for others).
- **Color:** Use the brand's primary action color.
- **Typography:** Bold or Semi-bold.
- **Focus:** If reachable by keyboard, must have a clear focus ring.

### Completed (Past)
- **Indication:** A checkmark (✓) is the universal symbol for completion.
- **Color:** A "Safe" or "Success" color (e.g., Green, Blue-600).
- **Interactivity:** Should be clickable to allow the user to return and edit
  their work.

### Error (Blocking)
- **Trigger:** Failed validation on the current step or a server-side error.
- **Indication:** An exclamation mark (!) or similar warning icon.
- **Color:** High-visibility error color (e.g., Red-600).
- **Persistent:** The error state must remain until the issue is resolved.

## 2. Accessibility Mapping

| User Need | Requirement |
| :--- | :--- |
| **Screen Reader** | Use `aria-current="step"` and hidden text (e.g., "Step 1, Completed: Shipping"). |
| **Keyboard** | Steps that allow navigation back must be focusable (`tabindex="0"`). |
| **Color Blindness** | Never use color alone. Always include an icon (Checkmark, Exclamation) or text label ("Complete"). |
| **Contrast** | Ensure labels meet WCAG AA (4.5:1). |

## 3. Heuristic Checklist

- [ ] Does the indicator update *immediately* upon moving to a new step?
- [ ] Is the "Next" button disabled or does it trigger an error state if the
      step is incomplete?
- [ ] Can a user distinguish the "Completed" vs "Active" states without
      relying on color alone?
- [ ] Is there a clear visual connection (like a line or arrow) between the
      steps?

# State and Focus Management in Wizards

Implementing a multi-step form (wizard) requires careful orchestration of the browser's focus context and the application's internal state. This reference details the technical patterns and browser behaviors essential for a robust implementation.

## 1. Focus Management Patterns

When the UI changes significantly (as in a step transition), keyboard and screen reader users lose their reference point.

### The "Top-Down" Approach (Recommended)
When the "Next" button is clicked:
1. Hide the current step.
2. Show the next step.
3. Move focus to the first focusable element of the new step (e.g., the `<h2>` heading or the first `<input>`).
   - *Note:* If focusing a heading, ensure it has `tabindex="-1"` so it can receive programmatic focus without being in the natural tab order.

### The "Live Region" Fallback
If moving focus is not desirable (e.g., in a "load more" scenario), use an `aria-live="polite"` region to announce: "Step 2 of 3: Profile Details loaded."

## 2. Managing Data State

### Persistence Strategies
- **Component State:** For simple, single-session wizards, keep an object in memory.
- **SessionStorage:** Use `sessionStorage.setItem()` to persist data across accidental page refreshes.
- **History API:** Use `history.pushState()` to allow the browser's "Back" button to navigate between wizard steps instead of leaving the page entirely.

### Per-Step Validation
Leverage the native **Constraint Validation API**.
```javascript
const stepContainer = document.querySelector('#step-1');
const isValid = stepContainer.querySelectorAll('input').every(input => input.reportValidity());
```
Always use `reportValidity()` or `checkValidity()` to ensure the browser's built-in validation logic is respected before allowing progression.

## 3. ARIA Landmarks for Wizards

| Attribute | Applied To | Purpose |
| :--- | :--- | :--- |
| `aria-current="step"` | Progress indicator link/item | Identifies the active step in a sequence. |
| `role="group"` | Step container (`<section>`) | Groups related inputs for screen readers. |
| `aria-labelledby` | Step container | Links the container to the step heading. |
| `aria-live="polite"` | Status announcer | Notifies users of asynchronous step changes. |
| `aria-invalid="true"`| Input fields | Communicates error state to assistive technology. |

## 4. Browser Behavior Gotchas

- **Auto-fill:** Browsers may attempt to auto-fill hidden inputs in other steps. Ensure `autocomplete` attributes are correctly set to prevent unexpected data entry.
- **Enter Key:** In a standard `<form>`, the `Enter` key might trigger a global submit. Ensure that `Enter` on an input inside a step triggers the "Next" logic instead of a full form submission until the final step.
- **Mobile Keyboards:** Moving focus to an input on a new step will trigger the mobile keyboard. Ensure the scroll position accounts for the keyboard height so the focused field is not obscured.

# ARIA Live Regions and WCAG Timing

Implementing toasts requires balancing the need for immediate feedback with the requirements of users who may have difficulty perceiving or interacting with transient content.

## ARIA Live Region Roles

| Attribute / Role | Behavior | Recommended Use |
| :--- | :--- | :--- |
| `role="status"` | `polite` announcement. Wait until the user is idle. | **Standard Toast.** Success, info, and non-critical warnings. |
| `role="alert"` | `assertive` announcement. Interrupts current speech. | **Urgent Warning.** Low battery, loss of connection, or high-risk errors. |
| `aria-atomic="true"`| Announces the entire contents of the region. | Use this to ensure the context of the message is always read. |

## WCAG 2.2 Success Criteria for Toasts

### 2.2.1 Timing Adjustable (Level A)
If a toast auto-dismisses, it must meet one of the following:
- **Turn off:** The user can turn off the time limit before encountering it.
- **Adjust:** The user can adjust the time limit before encountering it over a wide range which is at least ten times the length of the default setting.
- **Extend:** The user is warned before time expires and allowed at least 20 seconds to extend the time limit with a simple action (for example, "press the spacebar").

**Practical Implementation for Toasts:**
Because toasts are typically small and non-blocking, providing a way to **pause the timer on hover and focus** is a common and accepted way to allow users enough time to read the content.

### 1.4.13 Content on Hover or Focus (Level AA)
If a toast appears (or stays visible) due to hover or focus:
- **Dismissible:** A mechanism is available to dismiss the additional content without moving pointer hover or keyboard focus.
- **Hoverable:** If pointer hover can trigger the content, then the pointer can be moved over the content without it disappearing.
- **Persistent:** The content remains visible until the hover or focus trigger is removed, the user dismisses it, or its information is no longer valid.

## Performance and Stacking

### Compositor-Only Animations
To ensure smooth performance (avoiding main-thread jank), always animate using `transform` and `opacity`.

```css
/* Performant */
.toast-enter {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
}

/* Avoid (Triggers Layout/Paint) */
.toast-enter-slow {
  bottom: 0;
  height: 0;
}
```

### Visual Stacking Logic
- **Fixed vs. Relative:** The container should be `position: fixed`, but the individual toasts should be part of the flow (e.g., in a `flex-direction: column` container) so they stack naturally without manual coordinate calculation.
- **Interaction passthrough:** Use `pointer-events: none` on the container and `pointer-events: auto` on the individual toasts to ensure they don't block interaction with the page content beneath them when no toast is present.

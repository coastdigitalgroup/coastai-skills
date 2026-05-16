# Empty State Heuristics & Checklist

Use these heuristics to evaluate the effectiveness of an empty state design.

## The "Value-First" Heuristics

1.  **Contextual Clarity:** Does the user immediately understand _why_ they are
    seeing this? (Avoid "No data available").
2.  **Actionable Path:** Is there a clear "next step" that resolves the empty
    state?
3.  **Benefit Orientation:** Does the copy emphasize what the user _gains_ by
    taking action, rather than what is _missing_?
4.  **Tone Alignment:** Does the tone match the user's emotional state? (e.g.,
    celebratory for finishing a task, helpful for a search failure).
5.  **Visual Balance:** Does the illustration or icon support the message
    without overpowering the call to action?

## Audit Checklist

### Content & Messaging

- [ ] Headline is specific to the container/content (not generic).
- [ ] Body copy explains the value of the missing content.
- [ ] Primary CTA uses a strong, action-oriented verb.
- [ ] Copy is free of "error-speak" or negative framing.

### Layout & Design

- [ ] Component is centered within its parent container.
- [ ] Visual weight is concentrated on the Primary CTA.
- [ ] Illustration is accessible (aria-hidden) and responsive.
- [ ] Spacing follows the `fluid-spacing-system`.

### Interaction & Accessibility

- [ ] Text meets WCAG AA contrast requirements.
- [ ] Primary CTA is reachable and operable via keyboard.
- [ ] State changes are announced to screen readers (`role="status"`).
- [ ] Secondary discovery paths (e.g., "View Samples") are provided for
      non-creation states.

## Decision Matrix: Action Types

| If the state is...    | Use this Primary Action... | Example                     |
| :-------------------- | :------------------------- | :-------------------------- |
| **First-Run**         | Create / Import            | "Create New Invoice"        |
| **Search Failure**    | Reset / Suggest            | "Clear Filters"             |
| **User-Cleared**      | Acknowledge / Reward       | "Great job! All caught up." |
| **Permission-Denied** | Request / Upgrade          | "Request Access"            |
| **Connection Lost**   | Retry / Refresh            | "Try Again"                 |

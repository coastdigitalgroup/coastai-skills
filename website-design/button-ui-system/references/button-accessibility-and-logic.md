# Reference: Button Accessibility & Logic

This reference guide provides deep-dive rules for making technical decisions
about action triggers, ensuring they are both usable and accessible.

---

## 1. The "Button vs. Link" Decision Matrix

A common mistake in web design is using the wrong HTML element for an action,
which confuses screen readers and breaks browser expectations (like "Open in
new tab").

| Trigger Type | Purpose | HTML Element | Styled As |
| :--- | :--- | :--- | :--- |
| **Functional** | Submits a form, opens a modal, toggles a state, or saves data. | `<button>` | Button |
| **Navigational** | Moves the user to a different page or a different URL. | `<a>` | Button or Link |
| **Internal Link** | Jumps to a section on the same page (Anchor). | `<a>` | Link |

**Rule of Thumb:** If pressing the button results in a URL change, it's a Link.
If it results in an on-page action, it's a Button.

---

## 2. Accessibility Checkpoints (WCAG 2.1 AA)

### A. Contrast Requirements
- **Text Labels:** Must have a contrast ratio of at least **4.5:1** against the
  button background.
- **Button Shape (UI Component):** The boundary of the button should have a
  **3:1** contrast against the page background to ensure it is perceivable as a
  target.
- **Focus Indicators:** The focus ring must have a **3:1** contrast against the
  surrounding background.

### B. Target Size (Fitts's Law)
- **Minimum Size:** No interactive element should be smaller than **44px x
  44px**.
- **Spacing:** Avoid placing buttons too close together. Use at least **8px** of
  clearance between distinct actions to prevent accidental taps.

### C. Assistive Technology (ARIA)
- **Icon-Only Buttons:** If a button contains only an icon (e.g., a "Search"
  magnifying glass), you must provide a text alternative using `aria-label` or
  visually-hidden text.
- **Dynamic States:** If a button triggers an action that takes time, use
  `aria-busy="true"` and `aria-live` to inform screen readers of the change.

---

## 3. Labeling Best Practices

Clear labels reduce the "interaction cost" (the mental effort required to
decide whether to click).

- **Benefit-Driven:** Instead of "Submit," use "Get My Free Quote."
- **Task-Driven:** Instead of "Go," use "Continue to Payment."
- **Avoid Vague Terms:** Never use "Click Here," "More," or "Info" as the only
  text on a button.
- **Case Sensitivity:** Avoid `ALL CAPS` for button labels. It can be harder to
  read for users with dyslexia and can be misinterpreted by some screen
  readers as individual letters. Use **Sentence case** or **Title Case**.

---

## 4. Focus Management Logic

- **The "Tab" Sequence:** Buttons must be reachable via the `Tab` key.
- **Visual Persistence:** The focus state must not disappear after a click if
  the button remains on the screen.
- **Restoration:** If a button opens a modal, the focus should return to that
  button when the modal is closed.

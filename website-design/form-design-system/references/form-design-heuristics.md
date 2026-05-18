# References: Form Design Heuristics

A collection of decision-making frameworks and best practices for high-quality
form design.

## 1. The Choice Component Decision Tree

Use this to decide which input component best fits your data requirements:

- **Is it a Binary Choice (Yes/No, On/Off)?**
  - Does it take effect immediately? → **Switch**
  - Does it require a Submit button? → **Checkbox**
- **Is it a Single Choice from multiple options?**
  - 2–5 options? → **Radio Buttons** (Highest scannability)
  - 6+ options? → **Select / Dropdown** (Saves space)
- **Is it a Multiple Choice?**
  - Always use **Checkboxes**.

## 2. Label Alignment Heuristics

| Alignment        | Best For...                 | Cons                    |
| :--------------- | :-------------------------- | :---------------------- |
| **Top-Aligned**  | Speed, Mobile, Scannability | Vertical length         |
| **Left-Aligned** | Reducing vertical space     | Slower, less responsive |
| **In-field**     | Minimalist UI, Mobile       | High cognitive load     |

## 3. Button Placement Patterns

- **Primary Action:** Should be aligned with the left edge of the input fields
  (in a single-column layout) to follow the user's vertical scan path.
- **Progressive Disclosure:** For multi-step forms, place "Next" on the right
  and "Back" on the left to map to the mental model of a timeline.
- **Destructive Actions:** Use high-contrast red or an outline style for
  "Delete" or "Reset" to prevent accidental clicks.

## 4. Error Visualization Heuristics

- **Don't rely on Color alone:** 8% of men have red-green color blindness.
  Always include an **Icon** (e.g., an exclamation mark) and **Descriptive
  Text**.
- **The "Inline First" Rule:** Show errors immediately below the field they
  pertain to. Only use an "Error Summary" at the top for very long, multi-page
  forms.
- **Affirmative Feedback:** Only use "Success" indicators (Green) for
  high-value, competitive, or complex fields like "Username Available" or
  "Strong Password." Too much green can be distracting.

## 5. Accessibility (WCAG 2.1 AA) Checklist

- [ ] **Touch Targets:** Minimum 44x44px (or 48x48px for better usability) for
      all interactive elements.
- [ ] **Contrast:** Text-to-background ratio of at least 4.5:1.
- [ ] **Focus Indicators:** Must be clearly visible and have a 3:1 contrast
      ratio against the background.
- [ ] **Tab Order:** Navigation follows the visual top-to-bottom, left-to-right
      flow.
- [ ] **No Auto-Tab:** Never move focus automatically when a user completes a
      field (it's disorienting for screen reader users).

# Contextual Help Breakdown

This example demonstrates the application of the Tooltip and Hint System to
two common web interfaces: a data-dense dashboard and a complex registration form.

---

## 1. Analytics Dashboard (The "Discovery" Layer)

In a dashboard, space is at a premium. Using tooltips allows for high data
density while still providing clarity on abstract icons and aggregated metrics.

### Scenario: Metric Card
A card showing "Churn Rate: 2.4%".

- **The Problem:** New users might not know exactly how this churn is calculated
  (e.g., Gross vs. Net).
- **The Solution (Infotip):**
  - **Trigger:** A small info icon `(i)` next to the label.
  - **Interaction:** Hover/Focus reveals a bubble.
  - **Content:** "Net Churn Rate: The percentage of lost recurring revenue
    minus expansion revenue. [Learn more about our formulas]."
  - **Design:** Neutral dark background with white text (Contrast 12:1). Arrow
    pointing to the info icon.

### Scenario: Icon-only Toolbar
A sidebar with icons for "Global Search", "System Health", and "User Settings".

- **The Problem:** Abstract icons like a "Pulse" icon might be ambiguous.
- **The Solution (Tooltip):**
  - **Trigger:** The icon button itself.
  - **Interaction:** Hover/Focus after 400ms delay.
  - **Content:** "System Health" (Text-only).
  - **ARIA:** `aria-label="System Health"` on the button.

---

## 2. Advanced Registration Form (The "Confidence" Layer)

Forms often require specific data formats or sensitive information. Hints
reduce friction by providing "Just-in-time" validation logic.

### Scenario: Password Creation
An input field for "New Password".

- **The Problem:** Users don't know the complexity requirements until they fail.
- **The Solution (Inline Hint):**
  - **Trigger:** Always visible.
  - **Placement:** Directly below the input field.
  - **Content:** "Must be 12+ characters with at least one number and one symbol."
  - **Design:** Smaller font size (14px), muted color (Contrast 4.5:1), but
    persistent so users can refer to it as they type.

### Scenario: Tax ID Selection
A dropdown for "Tax Classification" (C-Corp, S-Corp, LLC, etc.).

- **The Problem:** Users are unsure which classification applies to them.
- **The Solution (Infotip):**
  - **Trigger:** Help link "Which one should I choose?" next to the label.
  - **Interaction:** Tap/Click (on mobile) or Hover (on desktop).
  - **Content:** A brief breakdown of the three most common types with a link
    to an external IRS guide.
  - **Design:** Wider bubble (max-width 250px) to accommodate more text.

---

## Summary of Applied Patterns

| Feature | Pattern | Trigger | Visibility |
| :--- | :--- | :--- | :--- |
| **Toolbar Icons** | Tooltip | Button (Hover) | Temporary |
| **Complex Metrics** | Infotip | Icon (Hover/Tap) | Temporary |
| **Password Rules** | Inline Hint | None (Context) | Persistent |
| **Legal Options** | Infotip | Text Link (Click) | Temporary |

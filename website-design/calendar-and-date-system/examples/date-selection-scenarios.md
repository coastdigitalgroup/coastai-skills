# Date Selection Scenarios

This example demonstrates how the Calendar and Date Selection System is applied to two common web design problems: a single-date appointment booking and a dual-date travel range picker.

## Scenario 1: Single-Date Appointment (Healthcare)

In this scenario, a patient needs to book a follow-up appointment. Precision and availability are the primary goals.

### The Breakdown

1.  **Trigger:** A "Select Date" button that opens a centered modal on mobile and a popover on desktop.
2.  **Constraints:** Past dates are disabled (muted gray). Weekends are disabled (low contrast with a "cross" icon on hover).
3.  **Availability:** Specific days with available slots are marked with a small green dot below the date number.
4.  **Interaction:**
    *   **Hover:** A light-blue circle appears around the date.
    *   **Selected:** A solid brand-blue circle with white text.
5.  **Anatomy:**
    *   **Header:** "March 2024" with distinct `<` and `>` buttons.
    *   **Grid:** 7 columns, starting on Monday (regional preference).
    *   **Footer:** A "Today" button to quickly reset the view.

### Why it Works
*   **Contextual Cues:** The green dots reduce "pogo-sticking" (clicking a date only to find no slots).
*   **Clear Constraints:** Disabling weekends prevents users from trying to book when the clinic is closed.
*   *Accessibility:** The selected state uses both color (Blue) and shape (Circle) to distinguish it from "Today" (Outline).

---

## Scenario 2: Date Range Picker (Travel/Hotel)

In this scenario, a traveler is selecting a "Check-in" and "Check-out" date for a vacation rental.

### The Breakdown

1.  **Trigger:** Two adjacent input fields ("Check-in" and "Check-out"). Clicking either opens a dual-month calendar view.
2.  **Dual-Month View:** Displays current month (left) and next month (right) to allow for easy selection across month boundaries.
3.  **Range Logic:**
    *   **First Click:** Sets the "Check-in" date. The date is highlighted with a "Start Cap" (left-rounded background).
    *   **Hovering:** As the user moves the mouse to a second date, all intermediate dates are highlighted with a light-blue background ("The Span").
    *   **Second Click:** Sets the "Check-out" date. The date is highlighted with an "End Cap" (right-rounded background).
4.  **Responsive Adaptation:** On mobile, the dual-month view stacks vertically into a scrollable list.

### Why it Works
*   **Visual Continuity:** The "Span" highlight gives immediate feedback on the length of the stay.
*   **Boundary Management:** Showing two months at once is essential for bookings that span the end of one month and the start of the next.
*   **Error Prevention:** The system automatically ensures "Check-out" cannot be before "Check-in."

---

## Visual Annotation Template

When documenting these for developers, use these labels:

| State | Visual Treatment | ARIA Property |
| :--- | :--- | :--- |
| **Normal** | Default body text color | `role="gridcell"` |
| **Today** | Bold text + Brand color underline | `aria-current="date"` |
| **Hover** | Light gray background circle | N/A |
| **Selected** | Solid brand color background + White text | `aria-selected="true"` |
| **In-Range** | Light brand color background (rectangular) | N/A |
| **Disabled** | Muted gray text + Strike-through | `aria-disabled="true"` |

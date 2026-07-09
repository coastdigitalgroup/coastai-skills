---
name: calendar-and-date-system
description:
  Design a systematic framework for date and time selection, managing calendar
  grids, range pickers, and scheduling interfaces to ensure precision and
  accessibility.
---

# Calendar and Date Selection System

## Purpose

The Calendar and Date Selection System provides a methodology for designing
interfaces that allow users to select single dates, date ranges, or specific
time slots. Selecting dates is a high-friction task that involves complex
mental models (e.g., "next Tuesday," "the last weekend of the month"). This
system ensures that date pickers are visually clear, easy to navigate via
keyboard and touch, and provide immediate feedback on validity and
availability.

## Use Cases

- **Booking & Reservations:** Selecting check-in/check-out dates for hotels or
  flight departures.
- **Scheduling:** Choosing a time slot for a meeting, appointment, or delivery.
- **Analytics & Reporting:** Defining a custom date range (Start Date to End
  Date) for data filtering.
- **Birthdate Entry:** Capturing date-of-birth for age verification or profile
  setup.
- **Event Planning:** Managing deadlines or milestones in a project management
  tool.

## When NOT to Use

- **Simple Dates:** If you only need a single, well-known date (like "Today" or
  "Yesterday"), use a simple button or link.
- **Memorable Dates:** For dates users know by heart (like Birthdays or Credit
  Card Expiry), use standard text inputs with `type="number"` or `type="tel"`
  rather than a calendar grid, as they are faster to type than to navigate on a
  grid.
- **Relative Time:** If the user only needs to select "Last 7 days" or "This
  Month," use a dropdown or button group instead of a full calendar.

## Inputs

1. **Selection Mode:** Single Date, Date Range, or Time Slot.
2. **Constraints:** Minimum/Maximum dates, disabled dates (e.g., past dates,
   fully booked slots).
3. **Context:** Is it a standalone page element or a popover/modal trigger?
4. **Localization:** Regional date formats (MM/DD/YYYY vs DD/MM/YYYY) and
   first day of the week (Sunday vs Monday).

## Outputs

1. **Grid Anatomy Spec:** Visual definition of the month header, weekday labels,
   and day cells.
2. **State Matrix:** Visual treatments for Today, Selected, Range-Start,
   Range-End, In-Range, Hover, and Disabled states.
3. **Input Connection Spec:** How the calendar relates to the text input field
   (trigger icon, formatting, and manual entry support).
4. **Accessibility Plan:** Keyboard shortcuts (Arrows, Enter, Escape) and ARIA
   live regions for status updates.

## Workflow

### 1. Select the Input Pattern

Choose how the user enters the date:
- **Direct Entry:** Masked text input. Best for fast, known-date entry.
- **Picker Trigger:** An input with a calendar icon that opens an overlay.
  Standard for most use cases.
- **Inline/Persistent:** The calendar is always visible on the page. Best for
  scheduling-heavy tasks.

### 2. Design the Calendar Grid

Establish a consistent spatial rhythm for the month view:
- **Header:** Month and Year with "Previous" and "Next" navigation buttons.
- **Weekday Row:** Single-letter or short labels (S, M, T...) for quick
  orientation.
- **The 7-Column Grid:** Ensure each day cell has enough room for the date and
  potential status indicators (e.g., a dot for an event).

### 3. Define the Range Logic (If Applicable)

When selecting a range, the interface must track three states:
- **Start Selection:** The first date clicked.
- **The "Span":** The visual connection between the start and the current
  hover position.
- **End Selection:** The second date clicked, finalizing the range.
- **Visual Feedback:** Use a subtle background fill for "In-Range" dates, with
  distinct shapes or higher contrast for the "Start" and "End" caps.

### 4. Design for Accessibility

- **Keyboard Navigation:** Users must be able to move between days using Arrow
  keys, switch months with PageUp/PageDown, and select with Enter.
- **Focus Management:** When the picker opens, focus should move to the
  currently selected date or "Today."
- **ARIA Roles:** Use `role="grid"` for the calendar, `role="columnheader"` for
  weekdays, and `role="gridcell"` for days. Use `aria-selected="true"` for the
  active selection.

### 5. Plan Responsive Adaptations

- **Mobile View:** On small screens, a single-month view is often best. For
  range picking, consider stacking two months vertically or using a
  full-screen overlay.
- **Touch Targets:** Ensure each day cell is at least 44x44px or provide
  adequate padding to prevent accidental clicks.

## Decision Rules

- **The "Type First" Rule:** Always allow users to type the date manually into
  the input field. Do not force them to use the calendar.
- **Month Limits:** If selecting a date far in the past or future (e.g., 5+
  years), provide a Year/Month dropdown selector instead of forcing the user
  to click "Next" dozens of times.
- **Immediate Feedback:** If a user selects an invalid date (e.g., a Sunday for
  a weekday-only delivery), show a contextual error message immediately rather
  than waiting for form submission.
- **Start of Week:** Default to the user's locale (usually Sunday in US, Monday
  in UK/EU).

## Constraints

- **Accessibility:** Must meet WCAG AA contrast (4.5:1) for all date states.
  Selected dates must be distinguishable by more than just color (e.g., a solid
  background vs. no background).
- **Responsiveness:** Calendars must never overflow the viewport. Popover
  pickers should use "flip" logic to stay visible if there's no room below the
  input.
- **Localization:** Support different date formats and translations for month
  and day names.

## Common Failure Patterns

- **The "Infinite Clicker":** Making users click through 12 months to find a
  date instead of providing a year selector.
- **Hidden Input:** Preventing users from typing the date, which frustrates
  power users and users with motor impairments.
- **Tiny Targets:** Designing a grid with 20px cells that is impossible to use
  on a mobile device.
- **Lack of "Today" Context:** Failing to highlight the current date, making it
  harder for users to orient themselves.
- **Confusing Ranges:** Not clearly distinguishing between the "Start" and
  "End" of a range, or failing to show the "In-Range" span.

## Validation Criteria

- [ ] Users can navigate the calendar and select a date using only the
      keyboard.
- [ ] Manual text entry is supported and validated in the input field.
- [ ] Today's date is visually distinct but doesn't compete with the selection.
- [ ] Range selections have a clear "Start," "End," and "Span" visual
      treatment.
- [ ] Touch targets for day cells meet the 44x44px recommendation (or 24x24px
      minimum with spacing).
- [ ] Contrast ratios for all states (Hover, Selected, Disabled) meet WCAG AA.
- [ ] The calendar adapts its layout (or moves to full-screen) on mobile
      devices.

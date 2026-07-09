# Calendar and Date References

## Standard Date Formats (ISO 8601)
- **International:** `YYYY-MM-DD` (e.g., 2024-03-15)
- **US:** `MM/DD/YYYY` (e.g., 03/15/2024)
- **UK/Europe:** `DD/MM/YYYY` (e.g., 15/03/2024)

*Recommendation: Use ISO 8601 for data storage/attributes and local formats for the UI display.*

## Accessibility Requirements (WCAG 2.2)

### 1. Contrast (Success Criterion 1.4.3)
- Text and images of text must have a contrast ratio of at least **4.5:1**.
- UI components (borders, selection indicators) must have a contrast ratio of at least **3:1** against adjacent colors.

### 2. Target Size (Success Criterion 2.5.8)
- Interactive elements must have a target size of at least **24x24 CSS pixels**.
- *Best Practice: Aim for 44x44 CSS pixels for date cells to accommodate touch users.*

### 3. Keyboard Navigation
- **Tab:** Move into and out of the calendar.
- **Arrows:** Move focus within the grid.
- **Enter/Space:** Select the focused date.
- **Escape:** Close the picker without selecting.

### 4. ARIA Attributes
- `role="grid"`: The container for the calendar.
- `role="row"`: Each week.
- `role="gridcell"`: Each day.
- `aria-selected="true/false"`: Indicates if the date is the current selection.
- `aria-disabled="true"`: For dates that cannot be selected.

## Layout Patterns

### The "Compact Picker"
- Used when space is at a premium (sidebars, dense forms).
- Features a Month-only view.
- Usually triggered by a small icon.

### The "Dual-Month Range"
- Used for travel and booking.
- Shows two consecutive months side-by-side.
- Minimizes the need to click "Next" for 1-2 week stays.

### The "Infinite Scroll"
- Popular in mobile-first apps.
- Months are stacked vertically and can be scrolled smoothly.
- Best for browsing through large ranges of time.

## Scheduling Specifics

### Time Slots
- Usually displayed in a list or grid *after* a date is selected.
- **Morning/Afternoon/Evening** buckets help organize long lists of slots.
- Show "Unavailable" slots as disabled rather than removing them to maintain layout stability.

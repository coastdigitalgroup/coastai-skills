# Calendar Design Specification Template

Use this template to document the behavior, states, and constraints of a calendar or date picker component for hand-off to development.

---

## 1. General Configuration

- **Selection Type:** [Single Date | Date Range | Multi-Select | Time Slot]
- **Default View:** [Month | Week | Day | Year]
- **First Day of Week:** [Sunday | Monday]
- **Localization:** [e.g., US-English (MM/DD/YYYY)]
- **Placement:** [Inline | Popover | Modal]

## 2. Constraints & Logic

- **Min Date:** [e.g., Today]
- **Max Date:** [e.g., Today + 1 Year]
- **Disabled Dates:** [e.g., Weekends, Public Holidays, Past Dates]
- **Specific Rules:** [e.g., "Check-out must be at least 1 day after Check-in"]

## 3. Visual States Matrix

| State | Background Color | Text Color | Border/Shape | Icon |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `transparent` | `--text-main` | None | None |
| **Today** | `transparent` | `--brand-primary` | 2px Bottom Border | None |
| **Hover** | `--bg-subtle` | `--text-main` | Circle | None |
| **Selected** | `--brand-primary` | `#FFFFFF` | Circle | None |
| **Range Start** | `--brand-primary` | `#FFFFFF` | Left-Rounded | None |
| **Range End** | `--brand-primary` | `#FFFFFF` | Right-Rounded | None |
| **In-Range** | `--brand-light` | `--brand-primary` | Square/Rect | None |
| **Disabled** | `transparent` | `--text-muted` | None | Strike-through |

## 4. Interaction & Accessibility

- **Open Trigger:** [e.g., Click on Input, Click on Icon]
- **Close Trigger:** [e.g., Date Selected, Click Outside, Escape Key]
- **Keyboard Shortcuts:**
  - `Arrows`: Navigate grid
  - `Enter/Space`: Select date
  - `PageUp/Down`: Change month
  - `Home/End`: Move to start/end of row
- **Aria Labels:**
  - Grid: "Select a date"
  - Navigation: "Previous Month", "Next Month"
  - Day Cell: "[Date] [Month] [Year], [Status]"

## 5. Mobile Adaptation

- **Pattern:** [e.g., Stacks to single month, switch to bottom-drawer]
- **Touch Target Size:** [e.g., 44px x 44px]
- **Scroll Behavior:** [e.g., Infinite vertical scroll vs. Paginated months]

---

## 6. Development Notes
- Use the native `<input type="date">` for birthdates or where mobile-native pickers are preferred.
- Use `aria-live="polite"` to announce month changes to screen readers.
- Ensure the popover uses a library like Floating UI or Popper.js to handle viewport collisions.

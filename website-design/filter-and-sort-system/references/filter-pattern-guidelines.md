# Filter Pattern Guidelines

These guidelines define the visual and interaction standards for common filter
patterns to ensure consistency and usability.

## 1. Facet Expansion Logic

To prevent "Sidebar Fatigue," follow these expansion rules:

- **Primary Facets (Top 3):** Expanded by default.
- **Secondary Facets:** Collapsed by default; use an accordion chevron to
  indicate interactivity.
- **Internal Overflow:** If a single facet has >10 options, show the first 5 and
  add a "+ See all" link. Do not force the user to scroll the whole page to find
  the second facet.

## 2. Visual State Matrix

| State | Visual Treatment | Accessibility Requirement |
| :--- | :--- | :--- |
| **Unselected** | Empty checkbox / Neutral text | 3:1 contrast for border. |
| **Hover** | Subtle background fill change | `cursor: pointer` |
| **Selected** | Check icon / Bold text / Accent color | Contrast check for accent color. |
| **Disabled** | 40% opacity | `aria-disabled="true"` |
| **Focused** | 2px solid ring | Must be clearly visible via Tab key. |

## 3. Sort Pattern Hierarchies

Choose the right UI for prioritization:

1. **Dropdown (Standard):** Best for 3+ options. Saves space.
2. **Segmented Control (Toggle):** Best for 2 options (e.g., "Grid" vs. "List"
   view or "Price High" vs. "Price Low").
3. **Link List:** Only for very simple interfaces with 1-2 sort options.

## 4. Accessibility Check-list

- [ ] **Tab Order:** Ensure the user tabs through the sidebar filters BEFORE
      reaching the results grid.
- [ ] **Aria-Labels:** Collapsible headers must use `aria-expanded="true/false"`
      and `aria-controls`.
- [ ] **Live Regions:** Use `aria-live="polite"` on the results counter (e.g.,
      "Showing 24 results") so screen readers announce changes.
- [ ] **Touch Targets:** Every clickable area in the filter list must be at
      least 44px tall on mobile.

## 5. Skeleton vs. Spinner

- **Use Skeleton Screens** if the results update takes >300ms. It preserves the
  layout and reduces perceived wait time.
- **Use an Opacity Shift (80%)** if the update is near-instant. It confirms the
  click without jarring the user with a full screen change.

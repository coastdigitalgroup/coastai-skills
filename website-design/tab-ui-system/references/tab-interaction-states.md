# Reference: Tab Interaction & States

Tabs are dynamic components. Their effectiveness depends on how clearly they
communicate their state and how they adapt to different screen constraints.

## Visual State Logic

A tab trigger must clearly communicate its status to the user.

### 1. Active vs. Inactive
The active tab is the "Current Context."
- **Primary Signal:** Use a high-contrast underline or a background color that
  connects the tab to the content panel.
- **Secondary Signal:** Change the text weight to `bold` or `semi-bold`.
- **Constraint:** Do not change the font size on the active state, as this can
  cause the tabs to shift position (layout jitter).

### 2. The Focus State
Critical for accessibility.
- **Pattern:** Use a high-contrast outline (focus ring) that surrounds the
  entire tab trigger.
- **Keyboard Behavior:** Focus should move between tabs using the **Arrow Keys**,
  not the `Tab` key. The `Tab` key should move the user from the `tablist`
  directly into the `tabpanel`.

### 3. Disabled States
Avoid disabled tabs if possible. If a tab has no content, it's often better to:
- Hide the tab entirely.
- Show an "Empty State" within the panel (e.g., "No reviews yet").
- **If mandatory:** Use `opacity: 0.5` and `cursor: not-allowed`.

---

## Responsive Adaptation Patterns

### Pattern A: Horizontal Scroll (Standard)
Best for 3-6 tabs with short labels.
- **UI:** The tablist container has `white-space: nowrap`.
- **Affordance:** Use a shadow or gradient "fade" on the right edge to signal
  that the list continues.
- **Pros:** Maintains the tab metaphor; predictable.

### Pattern B: The Accordion Flip
Best for long-form content or many tabs.
- **UI:** On mobile, the horizontal tablist disappears, and each tab trigger
  becomes a full-width accordion header.
- **Pros:** Better for reading long text; no horizontal scrolling.
- **Cons:** Changes the visual structure significantly.

### Pattern C: The "Select" Dropdown
Best for utility tabs (e.g., "Sort by") or complex dashboards.
- **UI:** The tabs are replaced by a single `<select>` menu or a custom
  dropdown.
- **Pros:** Very compact; native mobile feel.
- **Cons:** Hides the available options from view.

---

## Accessibility (WCAG 2.1 AA)

| Requirement | Implementation |
| :--- | :--- |
| **Contrast** | Text contrast must be 4.5:1 for all states. |
| **Roles** | Use `role="tablist"`, `tab`, `tabpanel`. |
| **Linking** | `aria-controls` on the tab; `aria-labelledby` on the panel. |
| **Selection**| `aria-selected="true"` on the active tab only. |
| **Navigation**| Support `Home`, `End`, and `Arrow` keys. |

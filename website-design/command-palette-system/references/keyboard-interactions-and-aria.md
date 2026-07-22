# Keyboard Interactions, ARIA Combobox Spec, and Spatial Tokens

This reference guide provides implementation-aware specifications for the **Command Palette System**'s keyboard interactions, ARIA APG Combobox markup, screen reader feedback loop, and design tokens.

---

## 1. Keyboard Interaction Matrix

Since command palettes are keyboard-first interfaces, they must adhere to strict key down action standards:

| Key Press | Trigger Context | Expected Behavior |
| :--- | :--- | :--- |
| `Cmd + K` / `Ctrl + K` | Document level | Toggle the Command Palette open or closed. If focus is in a form field, intercept only if it is not a rich editor. |
| `Arrow Down` | Inside active palette | Moves active selection highlight to the next visible option. If on the last item, wraps around to the first item. Updates `aria-activedescendant`. |
| `Arrow Up` | Inside active palette | Moves active selection highlight to the previous visible option. If on the first item, wraps around to the last item. Updates `aria-activedescendant`. |
| `Enter` | Option is active | Executes the command represented by the active option. Closes the palette and moves focus back to the triggering element. |
| `Escape` | Inside active palette | Closes the palette instantly. Prevents data loss and returns focus to the triggering element. |
| `Tab` | Inside active palette | Intercept and disable standard tab navigation, OR trap tab focus to cycle between the search input, category chips, and the close button. *Never let focus leak into the background document.* |
| `Page Down` | Inside active palette | Optional: Jumps selection down 5 options or to the bottom of the current category. |
| `Page Up` | Inside active palette | Optional: Jumps selection up 5 options or to the top of the current category. |

---

## 2. ARIA APG Combobox Pattern Spec

To be accessible to screen reader and keyboard-only users, the command palette must model its structure on the **ARIA 1.2 Combobox** pattern.

### HTML Structure Mapping

1. **Input Container (The Controller):**
   - Must have `role="combobox"` to declare an interactive editable input.
   - Must set `aria-expanded="true"` when the palette dialog is visible, and `aria-expanded="false"` when hidden.
   - Must set `aria-autocomplete="list"` to notify the user that typing filters a list of suggested choices.
   - Must link to the listbox ID via `aria-controls="palette-listbox-id"`.
   - Must update `aria-activedescendant="active-option-id"` dynamically as the user navigates options using the Up and Down arrow keys.

2. **Results List (The Listbox):**
   - Must have `role="listbox"` to declare a grouping of interactive options.
   - Must have an accessible label via `aria-label` (e.g., `aria-label="Command suggestions"`).

3. **Option Rows (The Options):**
   - Must have `role="option"`.
   - Must set `aria-selected="true"` on the actively highlighted row, and `aria-selected="false"` on all others.
   - Must have a unique, programmatically unique `id` (e.g., `id="opt-invite-member"`) to be referenced by the combobox's `aria-activedescendant`.

---

## 3. Screen Reader Live Announcements

Simply updating ARIA attributes is not always enough for screen reader announcements on quick query changes. You must implement a polite live region:

```html
<div
  id="palette-announcement-region"
  class="sr-only"
  aria-live="polite"
  aria-atomic="true">
</div>
```

### Announcement Scripting Rules:
- **No Query (On Open):** Announce the initial state: `"Command palette open. 6 suggested shortcuts found. Use up and down arrow keys to navigate."`
- **Dynamic Queries:** When the user types a query, debounce for 150ms and then update the `announcement-region` text:
  - If matches found: `"[N] results found. Use up and down arrow keys to explore."` (e.g., `"3 results found. Use up and down arrow keys to explore."`)
  - If no matches: `"No results found for '[User query]'."`

---

## 4. Focus Management & Background Inertness

### Native `<dialog>` Element (Recommended)
Using the HTML5 `<dialog>` element simplifies focus trapping tremendously:
- Trigger using `.showModal()` instead of `.show()`. This automatically:
  - Traps focus inside the dialog box.
  - Generates the top-layer stacking context (overcoming `z-index` bugs).
  - Renders background elements un-clickable and un-scannable.
  - Automatically handles the `Escape` key close event.
- Customize the dimming overlay using the `::backdrop` CSS selector.

### Custom Modal Fallbacks (No `<dialog>`)
If you are unable to use native `<dialog>`, you must handle focus manually:
1. **The Focus Trap:** Listen to `keydown` events. If the pressed key is `Tab`, check if focus is about to leave the palette. If so, wrap focus back to the first element (the search input).
2. **Background Inertness:** When the modal is open, apply the `inert` HTML attribute to all sibling container elements of the modal (e.g., `<div id="app-root" inert>...</div>`). This prevents screen readers and tab navigators from escaping the modal box.
3. **Restore Focus:** Store a reference to `document.activeElement` before opening. On close, restore focus to that exact element.

---

## 5. Visual Grid and Spatial Tokens

Ensure visual hierarchy and comfort with these standard spacing tokens:

```css
:root {
  /* Z-Index Stacking Layers */
  --z-index-scrim: 990;
  --z-index-palette: 1000;
  --z-index-toast: 1100;

  /* Dimensions */
  --palette-width-max: 650px;
  --palette-height-max: 480px;

  /* Touch Sizing (WCAG 2.2 SC 2.5.8) */
  --touch-target-desktop: 36px;
  --touch-target-mobile: 48px;

  /* Spacing Scale */
  --spacing-inner-padding: 1rem;     /* 16px */
  --spacing-row-gap: 0.5rem;          /* 8px */
  --spacing-icon-width: 1.75rem;     /* 28px */
}
```

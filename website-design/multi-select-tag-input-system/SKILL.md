---
name: multi-select-tag-input-system
description:
  Design, structure, and optimize multi-select tag input systems—including tokenized chip selection, auto-complete dropdown suggestions, inline query filtering, flexbox chip wrapping, keyboard navigation (Backspace deletion, Arrow navigation), touch target sizing, and WCAG AA accessibility compliance.
---

# Multi-Select Tag Input System

## Purpose

The Multi-Select Tag Input System provides a comprehensive framework for designing, structuring, and styling inline tokenized selection interfaces. Modern web applications frequently require users to pick, enter, or manage multiple discrete items within a single form field—such as assigning categories, adding team members, tagging content, selecting filters, or composing recipient lists.

When implemented without standardized design rules, multi-select tag inputs create severe usability and accessibility failures: inputs clipping or causing horizontal layout shifts, micro-sized removal buttons that fail touch target guidelines (WCAG 2.5.8), awkward text wrapped under hidden dropdown popovers, ambiguous focus states between the container, chips, and text cursor, and lack of screen reader announcements for added or removed tokens (`aria-live`). This skill establishes spatial layout, token anatomy, keyboard interaction standards, popover positioning, dynamic wrapping, and WCAG AA accessibility patterns for multi-select tag inputs.

## Use Cases

- **Email Recipient & Messaging Controls:** To/CC/BCC field inputs where recipient emails convert into dismissible contact chips with auto-complete suggestions.
- **Content Tagging & Categorization:** Article, blog post, or product catalog tagging interfaces where users enter freeform tags or select from a pre-defined tag taxonomy.
- **E-Commerce & SaaS Faceted Filtering:** Search and catalog filter bars where active filter values are represented as clear removable chips inside or adjacent to the filter input.
- **User Permission & Role Assignment:** Admin panels where managers assign multiple security roles, project teams, or feature permissions to user accounts.
- **Attribute & Keyword Search Bars:** Multi-attribute search inputs where search criteria (e.g., `Status: Active`, `Region: US-East`) are rendered as inline tokenized pills.

## When NOT to Use

- **Single Choice Selects:** For picking a single option from a dropdown menu, use `custom-select-and-combobox-system`.
- **Exclusive Binary Toggles:** For toggling between mutually exclusive states (e.g., Monthly vs Annual billing), use `segmented-control-system`.
- **Standalone Filter Chips:** For static or horizontally scrollable filter button lists that do not involve inline text typing or combo-box input, use `badge-and-tag-system` or `filter-and-sort-system`.
- **Stepped Quantity Inputs:** For numeric incremental controls (+ / - buttons), use `numeric-input-and-stepper-system`.

## Inputs

1. **Tag Data Source & Schema:** Freeform user text, static option list, or asynchronous REST/GraphQL API query source with value, label, and metadata (e.g., avatar, icon, badge count).
2. **Container Sizing & Constraining Rules:** Min/max height properties, flex wrapping rules (`flex-wrap: wrap`), maximum allowable selected tokens, and scroll overflow behavior (`max-height` with custom scrollbar).
3. **Selection Mode & Delimiters:** Token creation triggers (e.g., `Enter`, `,` (comma), `Space`, or explicit dropdown item selection) and duplication rules (allow or suppress duplicate tags).
4. **Theme & Surface Tokens:** Token background surface, text contrast ratios, hover/focus rings, and status states (default, active, error, disabled) from `accessible-color-system` and `focus-indicator-design-system`.

## Outputs

1. **Tokenized Container Layout Spec:** Flexbox/Grid CSS architecture defining container alignment, chip spacing (`gap`), inline text input growth (`flex-grow: 1`), and responsive min-heights.
2. **Tag Chip Anatomy & Token Tokens:** Spatial composition specs for chips including leading icons/avatars, text labels, and touch-compliant removal triggers (`min-width/height: 24px` within `44px` touch bounds).
3. **Interactive Combobox & Dropdown Overlay Spec:** Floating suggestion menu positioning (`popover` or absolute positioning), active option highlighting (`aria-activedescendant`), empty/loading states, and z-index layering.
4. **WCAG AA Accessibility Blueprint:** Keyboard navigation model (Arrow keys, Backspace, Delete, Escape), ARIA markup (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`), and screen reader live region messaging (`aria-live="polite"`).

---

## Workflow

### 1. Establish Container & Flex Wrapping Architecture
Structure the main input box as an interactive multi-token container that behaves like a unified form control:
- **Semantic Container:** Use a wrapper `<div>` styled as a form input, containing selected tag chips and an embedded `<input type="text" role="combobox">`.
- **Flexbox Wrapping:** Apply `display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem;` to the container. Selected chips wrap naturally onto subsequent lines as the container fills up, while the text input flexes to fill remaining line space (`flex: 1 1 120px;`).
- **Focus Delegation:** Add a click handler on the container to focus the nested text `<input>` whenever a user clicks whitespace inside the container box.

### 2. Design the Tag Chip Anatomy & Touch Targets
Build robust, readable token chips that satisfy physical touch and visual contrast standards:
- **Visual Anatomy:** A tag chip consists of:
  1. *Leading Visual Element (Optional):* User avatar (`16x16px`), icon, or color dot.
  2. *Label Text:* Truncated text (`max-width: 180px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`).
  3. *Remove Button:* Accessible `<button type="button" aria-label="Remove [Tag Name]">` containing an `×` SVG icon (`14x14px`).
- **Touch Target Sizing:** Ensure the remove button has an internal visual size of `20px–24px` but expands its hit area to at least **44×44px** (or **24×24px CSS pixel minimum** under WCAG 2.5.8) using negative margins or pseudo-elements (`::before`).
- **Chip Contrast:** Contrast between tag background and tag text must exceed **4.5:1** (WCAG AA).

### 3. Implement Auto-Complete Dropdown Menu & Positioning
Integrate an assistive popover listbox for option selection:
- **Combobox Pattern:** Link the input to the suggestion menu:
  - Input: `role="combobox"`, `aria-expanded="true|false"`, `aria-autocomplete="list"`, `aria-controls="tag-suggestions-list"`.
  - Dropdown: `<ul id="tag-suggestions-list" role="listbox">` with `<li role="option" id="opt-1" aria-selected="false">`.
- **Positioning & Max Height:** Position the dropdown directly below the container (`position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;`). Set `max-height: 240px; overflow-y: auto; z-index: 1000;` to prevent obscuring surrounding content.
- **Active Selection Management:** Manage active options via `aria-activedescendant="opt-x"` on the input element while maintaining focus on the `<input>`.

### 4. Implement Keyboard Navigation & Token State Logic
Provide full keyboard parity without requiring mouse interaction:
- **Typing & Delimiters:** Pressing `Enter`, `,` (comma), or `Tab` (if configured) converts current input text into a valid token chip and clears the input value.
- **Backspace Deletion Protocol:**
  - When the text input is empty and the user presses `Backspace`:
    1. First `Backspace`: Focuses and visually highlights the last tag chip in the sequence (`.is-selected` or `:focus`).
    2. Second `Backspace` (or `Delete` while tag focused): Deletes the selected tag chip and returns cursor focus to the text input.
- **Arrow Navigation:** `ArrowLeft` moves selection focus from the text input backward through existing tag chips. `ArrowRight` moves focus forward back to the text input. `ArrowDown` / `ArrowUp` opens and navigates the suggestion listbox options.

### 5. Add Screen Reader Live Region Feedback
Assistive technology users must be informed of dynamic DOM changes without losing focus position:
- **Live Region Container:** Provide an offscreen, polite live region (`<div class="sr-only" aria-live="polite" aria-atomic="true"></div>`).
- **Dynamic Announcements:**
  - On Tag Addition: Announce `"Added [Tag Name]. 4 tags selected."`
  - On Tag Removal: Announce `"Removed [Tag Name]. 3 tags remaining."`
  - On List Filtering: Announce `"5 suggestion results available. Use up and down arrow keys to navigate."`

---

## Decision Rules

### Selection Trigger & Delimiter Matrix

| Use Case | Token Creation Triggers | Suppress Duplicates? | Dropdown Required? | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Email Recipients** | `Enter`, `Comma`, `Space`, `Tab` | Yes | Optional (Recent contacts) | Fast typing speed requires multiple delimiter keys (comma, space). |
| **Freeform Taxonomy** | `Enter`, `Comma` | Yes | Optional (Suggested tags) | Commas allow quick multi-word tag entry (`UI Design, UX Research`). |
| **Strict Category Filter** | `Click`, `Enter` on Option | Yes | **Required** | Restricts tags strictly to valid predefined system taxonomy options. |
| **Attribute Search** | `Enter` on Option | Yes | **Required** | Multi-attribute key:value pairs require structured dropdown selection. |

### Container Height Expansion vs Scroll Strategy

```text
Selected Tag Count <= 4  --> Container auto-expands vertically (min-height: 42px).
Selected Tag Count > 4   --> Container caps at max-height (e.g., 120px) with custom internal overflow-y scroll bar,
                             OR summarizes overflow as "+N more" badge when blurred.
```

---

## Constraints

- **Accessibility (WCAG 2.1 AA):**
  - **SC 1.4.3 Contrast:** Chip text, input text, and remove icons must achieve minimum **4.5:1** contrast ratio against chip/container surfaces.
  - **SC 2.1.1 Keyboard:** Every feature—chip navigation, chip deletion, suggestion selection, dropdown dismissal—must be 100% operable via keyboard.
  - **SC 2.5.8 Target Size:** Tag removal buttons must satisfy target size requirements (minimum 24×24px, recommended 44×44px hit region).
  - **SC 4.1.2 Name, Role, Value:** Input must declare `role="combobox"` with dynamic `aria-expanded` and `aria-controls` properties.
- **Responsive Layout:** On mobile viewports (`< 600px`), tag chips must wrap cleanly without causing horizontal body overflow (`overflow-x: hidden`). Long tag text must truncate with ellipsis.
- **Focus Visibility:** Focus rings on the overall input container when typing, and on individual tag chips when selected via `ArrowLeft`/`Backspace`, must satisfy `focus-indicator-design-system` guidelines (3px outline, high contrast).

---

## Common Failure Patterns

- **Microscopic Remove Buttons:** Tiny 10×10px `×` removal icons with no padding, causing touchscreen users to misclick and trigger focus instead of removing the chip.
- **Focus Loss on Chip Deletion:** Deleting a tag chip via mouse click or Backspace destroying DOM element focus without returning focus to the text input or adjacent tag.
- **Horizontal Scrolling Input Lock:** Forcing tags into a single non-wrapping line with `overflow-x: auto`, causing hidden tags and broken mobile scroll ergonomics.
- **Missing Combobox ARIA:** Using a plain `<div>` and `<input>` without `role="combobox"`, leaving screen reader users unaware that suggestions exist or how many options are present.
- **Comma Input Bug:** Allowing users to type `Design, Development` without stripping the trailing comma from the created tag label (`Design,`).

---

## Validation Criteria

- [ ] Outer container uses flexible wrapping layout (`display: flex; flex-wrap: wrap; gap: 0.375rem;`).
- [ ] Text input flexes appropriately (`flex: 1 1 120px;`) and container focus delegate focuses the input when clicking whitespace.
- [ ] Tag chips include truncated text labels and accessible remove buttons (`aria-label="Remove [Tag Name]"`) with ≥24px touch bounds.
- [ ] Keyboard navigation fully supported: `Backspace` highlights and deletes tags; `ArrowLeft`/`ArrowRight` moves token focus; `Enter`/`Comma` creates tags.
- [ ] Suggestion listbox follows ARIA combobox pattern (`role="combobox"`, `role="listbox"`, `aria-expanded`, `aria-activedescendant`).
- [ ] Screen reader live region (`aria-live="polite"`) announces tag additions, removals, and filtered suggestion counts.
- [ ] Text and chip contrast satisfies WCAG AA (≥4.5:1 ratio).

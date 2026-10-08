---
name: multi-select-tag-input-system
description:
  Design and document a systematic UI framework for tokenized multi-select inputs, chip wrapping containers, typeahead autocomplete dropdowns, and WCAG AA accessible tag management controls across web applications.
---

# Multi-Select Tag Input System

## Purpose

The Multi-Select Tag Input System provides a standardized design methodology for tokenized selection controls (also known as chip inputs, tag selectors, or multi-select comboboxes). Modern web applications frequently require users to pick multiple discrete entities—such as team members, category tags, filter facets, content labels, or email recipients—from a large or open-ended dataset.

Standard native multi-select HTML elements (`<select multiple>`) present severe UX degradation: they are difficult to scan, lack inline removal affordances, require non-standard modifier key combinations (`Ctrl`/`Cmd` + Click) for selection, and offer poor touch usability on mobile devices. This skill defines explicit spatial rules, typography, visual states, keyboard navigation semantics, and WCAG AA accessible patterns for inline multi-select tag inputs.

## Use Cases

- **Content Categorization & Publishing:** Assigning tags, topics, or taxonomy categories to blog posts, CMS articles, or support documentation.
- **E-Commerce & Search Filtering:** Building multi-faceted search filter bars where users combine multiple attributes (e.g., Brand: Nike + Color: Black + Size: 10).
- **User Provisioning & Mentions:** Adding multiple assignees, team members, or collaborators in project management tasks, CRM leads, or email draft inputs (To/CC/BCC fields).
- **Settings & Preference Panels:** Selecting multiple notification channels, region availability, or feature flags in SaaS configuration settings.
- **Data Querying & Analytics:** Selecting multi-dimension grouping factors or metrics in dashboard reporting interfaces.

## When NOT to Use

- **Single Choice Selection:** When only one option can be chosen at a time, use `custom-select-and-combobox-system` or `dropdown-and-menu-system`.
- **Small Binary/Ternary Mutually Exclusive Options (2-5 options):** When selecting among a fixed, tiny set of items visible at all times, use `segmented-control-system` or a standard checkbox group from `form-design-system`.
- **Ordered/Hierarchical Selections:** When selection order or parent-child tree hierarchy is critical (e.g., folder trees), use `tree-view-navigation-system` or a multi-step builder.
- **Freeform Long Text Input:** For multi-line text editing or raw prose, use `form-design-system` or `rich-text-editor-ui-system`.

## Inputs

1. **Option Dataset Type:** Fixed predefined list (closed set), async/remote typeahead list, or user-created custom tags (open-ended tokenization).
2. **Selection Limits:** Minimum required selections (`min`) and maximum allowed selections (`max`).
3. **Container Context & Density:** Standard form layout (loose spacing) vs. compact table toolbar / filter bar (dense spacing).
4. **Chip Visual Token Attributes:** Icon/avatar support, removable flag, custom tag color coding, and disabled/readonly states.
5. **Brand Tokens:** Palette colors for chip background, border, text, hover highlights, focus rings, and dropdown list items.

## Outputs

1. **Tag Input Component Anatomy:** Structural spec defining Container Field, Inline Selected Chips (Tokens), Embedded Text Input, Clear All Button, and Autocomplete Dropdown Popover.
2. **Spatial & Wrapping Layout System:** Flexbox/Grid specifications for inline chip wrapping, vertical field expansion, overflow scrolling, and touch target padding.
3. **Interactive & Visual State Matrix:** Specs for Unfocused Empty, Active Focused, Chip Selected, Chip Focused (for deletion), Dropdown Open, Disabled, and Error states.
4. **Keyboard & Accessibility Blueprint:** Full ARIA 1.2 Combobox mapping (`role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-activedescendant`), keyboard navigation rules, and live region announcement strategies.

---

## Workflow

### 1. Choose the Structural Variant

Determine the appropriate multi-select tag pattern based on the data model and interaction needs:

- **Standard Tokenized Combobox (Filtered Dropdown):** Selected chips wrap inside a single input container alongside an active text filter. Selecting an option from the dropdown converts it into an inline chip. Best for taxonomy, user mentions, and faceted filters.
- **Open-Ended Tag Input (Freeform Entry):** Typing arbitrary text and pressing `Enter`, `,` (comma), or `Space` converts the entry into a new tag without requiring a preset dropdown list. Best for user-generated keywords or blog tags.
- **Read-Only / Display Chip Group with Add Trigger:** Displays existing tags as removable/readonly chips, with an explicit external "+ Add Tag" button that opens an overlay or inline combobox. Best for space-constrained cards and headers.

### 2. Define Spatial Layout and Chip Anatomy

Structure the container and inline tokens for scannability and interaction accuracy:

- **Chip Anatomy:**
  - **Leading Element (Optional):** 16x16px icon, avatar thumbnail, or color dot indicator.
  - **Text Label:** Truncate long chip text using `max-width` (e.g., `max-width: 180px`), `overflow: hidden`, and `text-overflow: ellipsis`.
  - **Trailing Remove Button (`×`):** Dedicated close icon button with distinct hover state. Minimum touch target of 24x24px (WCAG 2.2 SC 2.5.8), expanded to 44x44px hit region on touch devices.
- **Container Flexbox Layout:**
  - Use `display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem (6px); padding: 0.375rem 0.5rem;`.
  - Ensure the internal `<input>` element expands to fill remaining row space using `flex: 1 1 60px; min-width: 60px; border: none; outline: none; background: transparent;`.
  - Container must dynamically expand vertically as chips wrap to new lines, or feature an optional max-height scrollable window for fixed-height form layouts.

### 3. Establish Interactive States and Dropdown Behavior

Define feedback states for smooth interaction:

- **Focused Input State:** Container highlights with a prominent focus ring (`outline: 2px solid var(--primary-focus); outline-offset: 2px;`).
- **Chip Focus / Selection State:** When user presses `Backspace` or `ArrowLeft` from the text cursor, focus moves to the last chip. The chip background changes to a high-contrast active tint, signaling that pressing `Backspace` or `Delete` again will remove this chip.
- **Dropdown List Positioning:** Position the option menu popover directly below the input container using CSS Absolute or Anchor Positioning. Match container width, max-height 240px–300px with `overflow-y: auto`.
- **Selected Item Feedback in Dropdown:** Options already selected as chips should either be hidden from the dropdown list or rendered with a checkmark icon and disabled/grayed styling (`aria-selected="true"`).

### 4. Implement Keyboard Navigation Semantics

Ensure complete accessibility for power users and assistive technologies without requiring mouse pointer usage:

- **Input Typing & Navigation:**
  - `ArrowDown`: Opens dropdown (if closed) and focuses first option in listbox.
  - `ArrowUp`: Opens dropdown and focuses last option, or moves focus up in listbox.
  - `Enter`: Selects the currently highlighted dropdown option, creates chip, clears text input, and keeps focus in input.
  - `Comma` (`,`) / `Tab`: If enabled for open-ended tagging, converts current typed text into a chip.
  - `Backspace` (in empty input): Focuses the last inline chip.
- **Chip Navigation Mode:**
  - `ArrowLeft` / `ArrowRight`: Navigates focus between individual inline chips.
  - `Backspace` / `Delete` (when chip is focused): Removes focused chip and moves focus to adjacent chip or back to input field.
  - `Escape`: Closes dropdown popover without clearing selected chips; restores focus to input.

### 5. Configure Accessibility Semantics and ARIA Attributes

Deliver a WCAG 2.1 / 2.2 AA compliant experience:

- **Container Semantics:**
  - Standard wrapper or input element uses `role="combobox"`, `aria-expanded="true|false"`, `aria-haspopup="listbox"`, `aria-controls="dropdown-listbox-id"`, and `aria-activedescendant="focused-option-id"`.
  - Provide an explicit `<label>` element linked via `for="tag-input-id"` or `aria-labelledby`.
- **Listbox Semantics:**
  - Dropdown container uses `role="listbox"` with `aria-multiselectable="true"`.
  - Options use `role="option"`, `aria-selected="true|false"`.
- **Chip & Live Region Semantics:**
  - Each chip close button must have `aria-label="Remove tag [Tag Name]"` (e.g., `aria-label="Remove tag Frontend"`).
  - Include an invisible `aria-live="polite"` status region to announce removals and additions to screen readers (e.g., "Added tag Frontend. 3 tags selected.").

---

## Decision Rules

### Component Variant Matrix

| Requirement | Recommended Variant | Key Behaviors | Chip Removal Mechanism |
| :--- | :--- | :--- | :--- |
| **Strict Taxonomy Selection** | Tokenized Combobox | Dropdown only, no custom typed text allowed | Inline `×` button or Backspace key |
| **User Keyword Creation** | Freeform Tag Input | Convert on Comma / Enter / Space | Inline `×` button or Backspace key |
| **Team Member Assignment** | Avatar Combobox | Dropdown with avatar + role subtitle | Inline chip with mini-avatar and `×` button |
| **Dense Table Filter Bar** | Compact Pill Trigger | Displays "Tags (3)" pill; opens popover with search & checkboxes | Uncheck in popover or click "Clear All" |

### Max Chip Display Strategy Rule
- **Inline Wrapping (Default):** Allow chips to wrap onto 2–3 rows naturally in standard form layouts.
- **Truncated Summary Pill ("+N More"):** In high-density toolbars or data table cells, display up to 2 chips maximum, followed by a "+3 more" badge that opens a popover on click or hover.

---

## Constraints

- **Accessibility (WCAG 2.1 / 2.2 AA):**
  - Minimum contrast ratio of 4.5:1 for chip text against chip background, and chip background against input container.
  - Touch targets for chip close buttons must be at least 24x24px (with 44x44px touch padding on mobile).
  - Focus indicators must remain visible when chips or options are active.
- **Responsiveness & Fluidity:**
  - Input field must never collapse to 0 width or cause horizontal overflow on small mobile viewports (320px).
  - On viewports < 600px, typeahead dropdown popover should fit within visible viewport bounds or expand to full-width sheet if option list is deep.
- **Performance & DOM Hygiene:**
  - For datasets > 100 options, implement virtual scrolling or limit visible typeahead matches to top 20 items to prevent DOM lag.

---

## Common Failure Patterns

- **Unreachable Close Buttons on Touch:** Tiny 12x12px close `×` icons without padding, causing mobile users to mis-tap and trigger unwanted form focus or keyboard popups.
- **Input Collapsing / Overflow Bugs:** Fixed-width inputs that overflow parent containers when 10+ chips are added, or input shrinking down to 0px so users cannot type new queries.
- **Trapping Keyboard Focus:** Forgetting to handle `Backspace` or `ArrowLeft` keys, forcing keyboard-only users to manually tab through every single chip's close button before reaching the text field.
- **Missing Screen Reader Feedback:** Silently adding/removing chips without updating `aria-live` or `aria-expanded` attributes, leaving screen reader users unaware of selection changes.
- **Poor Contrast on Chips:** Using light-gray text on light-blue chip backgrounds that fail WCAG 4.5:1 contrast requirements.

---

## Validation Criteria

- [ ] Inline chips wrap fluidly without breaking container layout or causing horizontal page scroll.
- [ ] Text input remains accessible and editable even when multiple chips are present.
- [ ] Keyboard navigation allows opening listbox (`ArrowDown`), selecting options (`Enter`), navigating chips (`ArrowLeft`/`ArrowRight`), and removing chips (`Backspace`/`Delete`).
- [ ] Chip close buttons meet minimum 24x24px hit area (WCAG 2.2 SC 2.5.8) with explicit `aria-label` tags.
- [ ] Color contrast for chip background, chip text, hover, and focus rings satisfies WCAG AA (4.5:1).
- [ ] Screen readers announce tag additions and removals via an `aria-live="polite"` region.
- [ ] ARIA combobox and listbox attributes (`role="combobox"`, `role="listbox"`, `aria-expanded`, `aria-multiselectable`) are implemented accurately.

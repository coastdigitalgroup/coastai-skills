---
name: command-palette-system
description:
  Design a systematic framework for global command menus (Cmd+K panels) that
  combines keyboard-driven navigation, command execution, and shortcut
  discovery into an accessible, responsive overlay.
---

# Command Palette System

## Purpose

The Command Palette System provides a design and spatial framework for global, keyboard-triggered overlay menus (typically invoked with `Cmd+K` or `Ctrl+K`). In modern, high-density web applications, developer platforms, and content-rich documentation portals, standard navigation bars become overwhelmed. A command palette acts as a "command center," giving power users direct, friction-free keyboard paths to search, navigate, and execute actions, while serving as an interactive dictionary of keyboard shortcuts.

This skill ensures that command palettes are spatially ergonomic, visually structured to prevent cognitive fatigue, and fully compliant with advanced accessibility specifications (WCAG 2.2 AA).

## Use Cases

- Designing a global shortcut-driven workspace controller for SaaS dashboards.
- Structuring developer-oriented portals and documentation search portals (e.g., API references).
- Implementing rapid-action administrative panels for enterprise CRM or CMS platforms.
- Creating unified command-line interfaces (CLIs) within complex, multi-layered web products.

## When NOT to Use

- **Static Marketing Landing Pages:** Where user intent is purely exploratory and conversion-focused; a global navigation bar and clear call-to-actions (CTAs) are more effective.
- **Shallow Informational Sites (<15 pages):** Where the overhead of implementing and teaching a command palette outweighs any wayfinding benefit.
- **Simple Mobile Consumer Sites:** Where screen estate is minimal, and users rely strictly on touch interactions without external physical keyboards.

## Inputs

1. **Command and Action Inventory:** A comprehensive taxonomy of searchable actions, pages, settings, and documents.
2. **Contextual Mapping rules:** Rules for which commands are global vs. which are context-specific (e.g., "Delete Project" only appearing while viewing a project).
3. **Keyboard Shortcut System:** A mapping of actions to physical keyboard shortcuts (e.g., `G` then `D` for "Go to Dashboard").
4. **Brand Design Tokens:** Typography scales, colors, spacing ratios, and shadow tokens (from `fluid-spacing-system` and `fluid-typography-system`).

## Outputs

1. **Trigger Affordance Specs:** Visual designs for persistent entry points and keyboard shortcut badges.
2. **Palette Layout Architecture:** Grid structures for the overlay modal, grouping results, category navigation, and helper footers.
3. **Command Row Visual Specs:** Hierarchy specifications for icons, command titles, category badges, and shortcut annotations.
4. **Keyboard and Accessibility Spec:** Exact keyboard event mappings and ARIA state specifications matching the ARIA APG Combobox pattern.

---

## Workflow

### 1. Establish the Palette Trigger and Entry Points

Because a command palette is hidden by default, you must design discoverable entry points:

- **The Persistent Header Trigger:** A button mimicking a search bar in the global header, featuring a magnifying glass icon, a text label (e.g., "Search or run a command..."), and a right-aligned physical keyboard shortcut badge (e.g., `⌘K` or `Ctrl+K`).
- **Floating Command Button:** For dashboard-intensive or full-screen viewports, place a subtle trigger button in the bottom-right viewport corner.
- **Invisible Global Listener:** Ensure that pressing `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) anywhere on the document (unless focus is in a text input) immediately opens the palette.

### 2. Design the Modal Overlay and Backdrop (Scrim)

- **Backdrop (Scrim):** Use a high-contrast, semi-transparent backdrop (e.g., `rgba(15, 23, 42, 0.4)`) to dim the background page, focusing attention entirely on the active task.
- **Vertical Placement:** Center the modal horizontally, but anchor it to the **top 10%–15%** of the viewport, rather than absolute vertical centering. This aligns with natural eye level and leaves space for the physical virtual keyboard on touch screens.
- **Sizing Bounds:** Limit the width to a comfortable scanning envelope—ideally between **600px and 680px**. The height should be dynamic, capped at a maximum of **450px to 550px** to ensure it never overflows small laptop screens.

### 3. Structure the Internal Layout Grid

Divide the command palette into four distinct horizontal zones:

1. **The Search and Filter Zone:** A borderless, full-width input field with a prominent search icon (min 20px). Use placeholder text that guides the user (e.g., "Type a command or search...").
2. **The Category Filter Bar (Optional):** A horizontal row of compact chips or segmented controls (e.g., "All", "Actions", "Pages", "Users") to let users filter results before searching.
3. **The Results Feed (Scroll Container):** A scroll-contained listbox with grouped headers (e.g., "Recent", "Navigation", "System Settings").
4. **The Helper Footer:** A low-contrast status bar showing keyboard guides (e.g., `↑↓ to navigate`, `↵ to select`, `esc to close`).

```
+-----------------------------------------------------------+
|  [Search Icon]  Search or type a command...         [ESC] |
+-----------------------------------------------------------+
|  ( All )  ( Actions )  ( Pages )  ( Members )  ( Help )   |
+-----------------------------------------------------------+
|  RECENT SEARCHES                                          |
|  [Icon] Go to Billing                         [ ⌘ G ] [ B ]|
|  [Icon] Create New Invoice                    [ ⌘ N ]     |
|                                                           |
|  NAVIGATION                                               |
|  [Icon] Dashboard                                         |
|  [Icon] Team Settings                         [ ⌘ , ]     |
+-----------------------------------------------------------+
|  ↑↓ Navigate  |  ↵ Select  |  esc Close  |  ? Help Docs   |
+-----------------------------------------------------------+
```

### 4. Create the Command Row Visual Hierarchy

Each item in the results list must be scannable within milliseconds:

- **Left-Aligned Icon:** An explicit, high-contrast icon that indicates the item's type (e.g., a file icon for documents, a settings gear for actions, a user avatar for people).
- **Primary Label:** Semibold, primary-color text of the command itself (e.g., "Invite team member").
- **Secondary Sub-label (Optional):** Muted, smaller description below or beside the primary label to give context (e.g., "Settings > Organization").
- **Right-Aligned Shortcut Badges:** Display the physical keyboard shortcut associated with that command using small, high-contrast keystroke badges (e.g., `⌥I`).

### 5. Define Interactive States and Keyboard Selection

A command palette is driven primarily by the keyboard; therefore, the keyboard selection state takes precedence over mouse hover:

- **Active/Focused Item state:** When an item is navigated using the arrow keys, apply a prominent background fill change (using the primary light token, e.g., `var(--color-primary-light)`), and a left border indicator. The primary text should shift to the brand color.
- **Hover State (Mouse):** Mirror the active keyboard state. Moving the mouse over items should update the keyboard selection to prevent double focus states.
- **Empty State:** When a search returns no results, show a clean, illustrative empty state suggesting alternative actions (e.g., "No commands found. Try searching our help center instead" with a search link).
- **Loading State:** If search query results are fetched asynchronously, display a subtle linear loading indicator at the base of the search input, avoiding skeleton cards that cause layout shifting.

---

## Decision Rules

- **The "Cmd+K vs Persistent Search" Rule:** If the site's primary value is consuming structured content (like an e-commerce catalog), use a persistent search bar. If the value is administrative workflow, command execution, or dense navigation, use a `Cmd+K` command palette.
- **The Grouping Limit Rule:** Never display more than 3–4 categories of commands simultaneously. Keep the maximum visible items in each category to 5, providing a "Show more..." option if more exist.
- **The "Keystroke-Count" Rule:** Physical keyboard shortcuts displayed next to commands must never exceed 3 keys (e.g., `Ctrl+Shift+P` is acceptable; `Ctrl+Alt+Shift+Z` is too complex).
- **The Dynamic Context Rule:** Dynamically filter commands based on the active route. If a user is on the billing page, prioritize "Update Credit Card" or "Download Invoice PDF" at the top of the default (untyped) result list.

---

## Constraints

### 1. Accessibility (WCAG 2.2 AA Minimum)

- **ARIA Combobox Pattern:** You must structure the markup strictly following the ARIA Authoring Practices Guide (APG):
  - The input container must have `role="combobox"`, `aria-expanded="true"`, `aria-autocomplete="list"`, and `aria-controls="command-listbox-id"`.
  - The results list must have `role="listbox"`, and each command row must have `role="option"`.
  - As the user presses arrow keys, the input must update `aria-activedescendant` to point to the active option's ID, and that option must have `aria-selected="true"`.
- **Focus Management:** Opening the palette must trap keyboard focus inside the overlay. Pressing `Tab` should either be intercepted to cycle within the palette or disabled entirely (preferring arrow keys for option navigation). Closing the palette must return focus to the exact trigger element.
- **Screen Reader Announcements:** Place an invisible `div` with `aria-live="polite"` and `aria-atomic="true"` next to the input. On search, dynamically populate this with result status (e.g., "12 results found, use up and down arrow keys to navigate").
- **Contrast Ratios:** All text, shortcut badges, and focus indicators must meet WCAG AA (4.5:1 minimum for normal text, 3:1 for UI borders and selection indicators).
- **The Background Lock:** When the palette is active, the rest of the application must be rendered `inert` and hidden from screen readers. Use `<dialog>.showModal()` to achieve focus trapping, background dimming, and native `Escape` closing natively.

### 2. Responsiveness and Touch Adaptations

- **Touch Viewport Adjustment:** On mobile screens, the command palette must shift to a **full-screen overlay** or a bottom-sliding drawer.
- **Virtual Keyboard Handling:** Auto-focus the search input on open, and use `inputmode="search"` to ensure the mobile device displays the correct "Search" action button on its virtual keyboard.
- **Hiding Physical Hints:** On touch-only devices, hide physical keyboard shortcut badges (e.g., `⌘K` or `⌥I`) as they are irrelevant and create visual clutter.
- **Touch Target Sizing:** Removable tags, category chips, and list rows must have a height of at least **44px** on touch screens to accommodate finger taps, adhering to WCAG 2.2 SC 2.5.8.

---

## Common Failure Patterns

- **The "Infinite Scroll" Trap:** Allowing the results feed to render 100+ matches without a scroll container, overflowing the screen and making footer guides inaccessible.
- **Lack of Backdrop Scroll-Lock:** Allowing the background document to scroll while the user is scroll-navigating the command palette, causing layout disorientation.
- **Losing Input Focus:** Clicking a category chip or result option and losing keyboard focus from the text input, requiring keyboard users to tab back.
- **Incomprehensible Mobile Display:** Retaining a tiny desktop-centered modal on a 320px mobile screen, cutting off primary labels and shortcut badges.
- **Missing Trigger State Mirroring:** The persistent header button not showing the keyboard shortcut, leaving keyboard users unaware that a command palette exists.

---

## Validation Criteria

- [ ] A persistent trigger button is present in the header with a clear `Cmd+K` / `Ctrl+K` visual shortcut badge.
- [ ] Pressing `Cmd+K` or `Ctrl+K` anywhere on the page opens the modal.
- [ ] Keyboard focus is immediately moved to the search input, and the background page scrolling is locked.
- [ ] Navigation of options is driven by the Up and Down arrow keys, with a highly visible focused active state.
- [ ] Option rows feature structured hierarchy: Left icon, Bold action title, Contextual route hierarchy, and Right shortcut badge.
- [ ] The ARIA APG Combobox pattern is fully specified, including `role="combobox"`, `role="listbox"`, `role="option"`, and `aria-activedescendant`.
- [ ] An `aria-live="polite"` region is present to announce search results count changes to screen readers.
- [ ] On mobile viewports, the palette adapts to full-screen or a bottom drawer, hiding physical shortcut badges and sizing rows to a minimum of 44px height.
- [ ] Pressing `Escape` or clicking the backdrop scrim closes the palette and returns focus to the trigger button.

---
name: keyboard-shortcut-implementation
description:
  Implement and debug accessible, cross-platform keyboard shortcuts for web
  applications, handling modifier normalization, context awareness, and
  preventing browser conflicts.
---

# Keyboard Shortcut Implementation

## Purpose

The Keyboard Shortcut Implementation skill provides a technical protocol for
adding keyboard shortcuts to web applications. It ensures shortcuts are
cross-platform (Mac vs. Windows/Linux), accessible to assistive technologies,
and do not interfere with standard browser behavior or user input.

## Use Cases

- Implementing "Command/Control + K" to focus a global search interface.
- Adding single-key shortcuts (e.g., "J/K" for navigation) in productivity apps
  or dashboards.
- Using "Escape" to cancel actions or close custom transient UI elements.
- Implementing "Save" (Ctrl/Cmd + S) or "Undo" (Ctrl/Cmd + Z) behaviors in
  web-based editors.

## When NOT to Use

- **Standard Navigation:** Do not use shortcuts to replace standard link
  navigation; users expect `Tab` and `Enter`.
- **Built-in Browser Shortcuts:** Never override essential browser shortcuts
  like `Cmd+T` (New Tab), `Cmd+W` (Close Tab), or `Cmd+L` (Address Bar).
- **Component-Specific Navigation:** Component-level interactions (like arrow
  keys in a menu or tabs) should follow their specific implementation skills
  (e.g., `accessible-tabs-implementation`).

## Inputs

1. **Shortcut Map:** A list of key combinations and their associated actions.
2. **Platform Requirements:** Knowledge of target OS differences (Mac Meta vs.
   Windows Control).
3. **UI Context:** Identify which elements should be active (or inactive) for
   shortcuts to trigger.

## Outputs

1. **Event Listener Logic:** A robust `keydown` handler that filters for
   modifiers and specific keys.
2. **Platform Normalization Layer:** Logic that maps `Meta` (Mac) and `Control`
   (Windows) to a single "Primary Modifier."
3. **Context Filtering:** Code to prevent shortcuts from triggering while a
   user is typing in an input, textarea, or contenteditable element.
4. **ARIA Metadata:** Use of `aria-keyshortcuts` to announce shortcuts to
   assistive technology.

## Workflow

### 1. Choose the Correct Event

- Use `keydown` for almost all shortcuts. It captures modifier keys and non-printable keys (Escape, F1-F12) reliably.
- Avoid `keypress` (deprecated) and `keyup` (too late for `preventDefault`).

### 2. Normalize Modifier Keys

- On Mac, the primary modifier is usually `Command` (`event.metaKey`).
- On Windows/Linux, the primary modifier is usually `Control` (`event.ctrlKey`).
- Create a helper to detect the platform or check both keys based on the
  intended UX.

### 3. Implement Context Awareness

- **Input Check:** Before executing a shortcut, verify if the focus is inside a
  text entry field. If `document.activeElement` is an `input`, `textarea`, or
  has `contenteditable="true"`, ignore most shortcuts (except those explicitly
  intended for text areas).
- **Visibility Check:** Ensure the target action is relevant to the current UI
  state (e.g., don't trigger "Delete" if the item isn't selected).

### 4. Use `event.key` over `event.code`

- Use `event.key` (e.g., "k", "Enter", "Escape") for layout-independent
  shortcuts.
- Use `event.code` (e.g., "KeyK", "Digit1") only if you need the physical
  position of the key regardless of the keyboard layout (common in games).

### 5. Prevent Default Behavior

- Call `event.preventDefault()` only if your shortcut successfully matches and
  you want to stop the browser's default action.
- Be careful: preventing default on a shared shortcut (like `Cmd+F`) can
  frustrate users.

### 6. Announce to Assistive Technology

- Add the `aria-keyshortcuts` attribute to the element that the shortcut
  activates (e.g., `<button aria-keyshortcuts="Control+K">Search</button>`).
- List multiple shortcuts separated by spaces.

## Decision Rules

- **Global vs. Local:** Listen on `window` or `document` for global app
  shortcuts. Listen on a specific container for shortcuts that only apply to a
  specific component (e.g., a data grid).
- **Single Key vs. Modifiers:** Use single-key shortcuts (like "C" to compose)
  only in "app-like" environments where the user isn't frequently typing in
  inputs. Always allow users to disable single-key shortcuts (WCAG 2.1 Success
  Criterion 2.1.4).
- **Primary Modifier:** If the action is a "system-level" operation (Save,
  Find, Print), follow the OS convention for `Cmd` vs `Ctrl`.

## Constraints

- **Accessibility:** Users must be able to turn off or remap shortcuts that use
  only printable characters (letters, numbers, punctuation).
- **Conflict Management:** Do not override standard screen reader shortcuts
  (e.g., those using `Insert` or `Caps Lock`).
- **Discovery:** Shortcuts must be discoverable (e.g., listed in menus,
  tooltips, or a "Keyboard Shortcuts" help dialog).

## Non-Goals

- Implementing a full-featured "Shortcut Recorder" UI.
- Handling complex MIDI or game controller inputs.
- Managing international keyboard layout remapping automatically.

## Common Failure Patterns

- **Input Hijacking:** Pressing "S" to open a sidebar while the user is typing
  "Search" into a text box.
- **Mac/Windows Confusion:** Forcing Windows users to use `Alt` or Mac users to
  use `Ctrl` for standard primary actions.
- **Missing `preventDefault`:** The shortcut triggers, but the browser also
  performs its default action (e.g., page scrolls down on `Space`).
- **Case Sensitivity Issues:** Checking for `event.key === 'K'` (uppercase)
  which may fail if `Shift` isn't pressed. Use `.toLowerCase()` or check for
  the specific case intended.

## Validation Steps

- [ ] **Platform Test:** Verify the shortcut works on both Mac (Cmd) and
      Windows (Ctrl).
- [ ] **Input Protection Test:** Focus a text input and type the shortcut
      keys; verify the shortcut does NOT trigger.
- [ ] **Discovery Test:** Verify the shortcut is visually documented in the UI
      (e.g., in a tooltip or label).
- [ ] **Screen Reader Test:** Verify that `aria-keyshortcuts` is present on
      the interactive element.
- [ ] **Conflict Check:** Ensure the shortcut doesn't prevent standard browser
      features (like zooming with `Cmd +/-`).
